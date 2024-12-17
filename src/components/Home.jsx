import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/action";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Cards from "./Cards";
import PaginaCatalogo from "./PaginaCatalogo";
import Carousel from "./Carousel";
import Users from "./Users";
import OrderList from "./OrderList";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios("http://localhost:3000/api/products")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Carousel books={books} />
      <PaginaCatalogo />
    </div>
  );
}

export default Home;