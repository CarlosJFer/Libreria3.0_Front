import { Link } from "react-router-dom";

function Card(props) {
  // eslint-disable-next-line react/prop-types
  const { id, name, avatar } = props;
  return (
    <div className="card">
      <Link to={`/detalle/${id}`}>
        <img src={avatar} alt="avatar" width="100px" height="120px" />
        <h2>{name}</h2>
      </Link>
    </div>
  );
}

export default Card;
