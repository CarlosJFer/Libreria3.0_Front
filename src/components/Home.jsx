import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/action";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Cards from "./Cards";
import PaginaCatalogo from "./PaginaCatalogo";
import Carousel from "./Carousel";

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

      <div>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to="/products">
          <button>Post</button>
        </Link>

        {/* Si tuviesemos parametros
        <Link to={`/post-form/${product._id}`}>
          <button>Nuevo Libro</button>
        </Link> */}
      </div>
      <Cards></Cards>
    </div>
  );
}

export default Home;
