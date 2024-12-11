import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../redux/usersSlice";
import User from "./User";

function Users() {
  const users = useSelector((state) => state.users);
  console.log(users);
  const dispatch = useDispatch(); // 'dispatch' is assigned a value but never used.
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => dispatch(getUser(res.data)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div>
      <Link to="/">Volver</Link>
      <h2>Users</h2>
      {users.map((user) => (
        <User
          key={user._id}
          id={user._id}
          titulo={user.titulo}
          autor={user.autor}
        />
      ))}
    </div>
  );
}

export default Users;
