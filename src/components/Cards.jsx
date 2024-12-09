import { useSelector } from "react-redux";
import Card1 from "./Card1";

function Cards() {
  const users = useSelector((state) => state.users);
  console.log(users);

  return (
    <div className="cards">
      {users.map((user) => {
        return <Card1 key={user.id} name={user.name} avatar={user.avatar} />;
      })}
    </div>
  );
}

export default Cards;
