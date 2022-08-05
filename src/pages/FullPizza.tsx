import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizzaData = async () => {
      try {
        const { data } = await axios.get(`https://${API_KEY}.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Не удалось получить данные о пицце');
        navigate('/')
      }
    }

    fetchPizzaData();

  }, []);

  if (!pizza) {
    return (
      <div className="cart cart--empty">
        <h4>Загрузка...</h4>
      </div>
    )
  }

  return (
    <div className="cart cart--empty">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <p>&nbsp;</p>
      <Link to="/" className="button button--outline button--add">
        <span>Вернуться назад</span>
      </Link>
    </div>

  )
}

export default FullPizza;