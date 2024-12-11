import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/action";
import { Link, NavLink } from "react-router-dom";
import Cards from "./Cards";
import PaginaCatalogo from "./PaginaCatalogo";
import Carousel from "./Carousel";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "En la punta del mapa",
      author: "Comino, Sandra",
      cover: "path/to/cover1.jpg",
      price: "$9,000.00",
    },
    {
      id: 2,
      title: "Yoga para niños",
      author: "Maleh, Mariela",
      cover: "path/to/cover2.jpg",
      price: "$22,900.00",
    },
    {
      id: 3,
      title: "Integrar el círculo",
      author: "Oyhanarte, Rosario",
      cover: "path/to/cover3.jpg",
      price: "$29,000.00",
    },
    {
      id: 4,
      title: "Romper el círculo",
      author: "Hoover, Colleen",
      cover: "path/to/cover4.jpg",
      price: "$18,900.00",
    },
    {
      id: 5,
      title: "La hora azul",
      author: "Hawkins, Paula",
      cover: "path/to/cover5.jpg",
      price: "$32,900.00",
    },
    {
      id: 6,
      title: "Historias inconscientes",
      author: "Rolón, Gabriel",
      cover: "path/to/cover6.jpg",
      price: "$33,800.00",
    },
  ]);
  return (
    <div>
      <h2>Home</h2>
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

        <Link to={`/post-form`}>
          <button>Nuevo Libro</button>
        </Link>
      </div>
      <Cards></Cards>
    </div>
  );
}

export default Home;
