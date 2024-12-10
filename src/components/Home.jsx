import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/action";
import { Link, NavLink } from "react-router-dom";
import Cards from "./Cards";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Home</h2>

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
