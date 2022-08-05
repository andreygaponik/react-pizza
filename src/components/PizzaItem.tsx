import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { CartItemType } from "../redux/slices/cartSlice";

const typeNames = ['тонкое', 'традиционное'];

type PizzaItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
}

const PizzaItem: React.FC<PizzaItemProps> = (props) => {
  const dispatch = useDispatch();
  const pizzasCount = useSelector((state: RootState) => state.cart.products.find((obj) => obj.id === props.id));

  const [activeTypePizza, setActiveTypePizza] = useState<number>(0);
  const [activeSizePizza, setActiveSizePizza] = useState<number>(0);

  const handleAddProduct = () => {
    const product: CartItemType = {
      id: props.id,
      title: props.title,
      price: props.price,
      imageUrl: props.imageUrl,
      type: typeNames[activeTypePizza],
      size: props.sizes[activeSizePizza],
      count: 0
    }
    dispatch(addProduct(product))
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${props.id}`}>
        <img
          className="pizza-block__image"
          src={props.imageUrl}
          alt="Pizza"
        />
      </Link>
      <h4 className="pizza-block__title">{props.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {
            props.types.map((type, index) => {
              return (
                <li
                  className={activeTypePizza === index ? 'active' : ''}
                  onClick={() => setActiveTypePizza(index)}
                  key={index}
                >
                  {typeNames[type]}
                </li>
              )
            })
          }
        </ul>
        <ul>
          {
            props.sizes.map((item, index) => {
              return (
                <li
                  className={activeSizePizza === index ? 'active' : ''}
                  onClick={() => setActiveSizePizza(index)}
                  key={index}
                >
                  {item} см.
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {props.price}  ₽</div>
        <button className="button button--outline button--add" onClick={handleAddProduct}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {pizzasCount ? <i>{pizzasCount.count}</i> : ''}
        </button>
      </div>
    </div>
  )
}

export default PizzaItem;