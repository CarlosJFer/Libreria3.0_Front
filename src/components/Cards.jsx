import { useSelector } from "react-redux";
import Card1 from "./Card1";

function Cards() {
  const users = useSelector((state) => state.users.userData);
  console.log(users);

  if (!Array.isArray(users)) {
    return <p>No hay usuarios disponibles.</p>; // Verifica que `users` sea un array
  }

  return (
    <div className="cards">
      {users.map((user) => {
        return (
          <Card1
            key={user._id}
            id={user.id}
            name={user.name}
            avatar={user.avatar}
          />
        );
      })}
    </div>
  );
}

export default Cards;
