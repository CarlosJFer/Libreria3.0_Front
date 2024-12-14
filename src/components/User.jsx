function User({ id, titulo, autor }) {
  return (
    <div className="card">
      <h3>LIBRO</h3>
      <h2>{titulo}</h2>
      <p>{autor}</p>
    </div>
  );
}

export default User;
