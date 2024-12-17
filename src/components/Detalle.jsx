import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Detalle() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === parseInt(id));
  console.log(user);
  return (
    <div>
      {/* <img src={user.avatar} alt="avatar" width="200px" height="240px" />
      <h2>{user.name}</h2>
      <h3>{user.role}</h3>
      <h3>{user.email}</h3> */}
    </div>
  );
}

export default Detalle;