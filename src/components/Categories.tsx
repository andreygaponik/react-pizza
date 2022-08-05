import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from "../redux/slices/filterSlice";
import { useWhyDidYouUpdate } from 'ahooks';
import { RootState } from '../redux/store';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryTitle, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  dispatch(changeCategory(index));
                }}
                className={index === categoryId ? 'active' : ''}
              >
                {categoryTitle}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
})

export default Categories;