import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import Sort, { sortList } from '../components/Sort';
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton';
import { fetchPizzas, Status } from '../redux/slices/pizzaSlice';
import React from 'react';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const searchValue = useSelector((state: RootState) => state.filter.searchValue);
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const selectedSort = useSelector((state: RootState) => state.filter.sort);
  const { pizzas, status } = useSelector((state: RootState) => state.pizza);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          searchValue,
          categoryId: Number(params.categoryId),
          sort: sort || sortList[0]
        })
      )
      isSearch.current = true;
    }
  }, []);

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        categoryId,
        searchValue,
        selectedSort
      })
    );
  }

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [searchValue, categoryId, selectedSort]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: selectedSort.sortProperty,
        categoryId: categoryId
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [searchValue, categoryId, selectedSort]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            status === 'error'
              ? <div className="cart cart--empty">
                <h2>Произошла ошибка <span>😕</span></h2>
                <p>
                  К сожалению, не удалось получить пиццы.
                </p>
              </div>
              : status === Status.LOADING
                ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
                : pizzas.map((item) => {
                  return <PizzaItem key={item.id} {...item} />
                })
          }

        </div>
      </div>
    </div>
  )
}

export default Home;