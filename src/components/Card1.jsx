function Card1(props) {
  // eslint-disable-next-line react/prop-types
  const { name, avatar } = props;
  return (
    <div className="card">
      <img src={avatar} alt="avatar" width="100px" height="100px" />
      <h2>{name}</h2>
    </div>
  );
}

export default Card1;
