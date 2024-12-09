import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/action";
import Cards from "./Cards";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Home</h2>
      <Cards></Cards>
    </div>
  );
}

export default Home;
