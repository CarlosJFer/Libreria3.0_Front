import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";

function Favorites({ favorites = [] }) {
  if (favorites.length === 0) {
    return <p style={{ color: 'white' }}>No tienes libros favoritos aún.</p>;
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <strong>Mis Favoritos</strong>
      </Card.Header>
      <ListGroup variant="flush">
          {favorites.map((item, index) => (
            <ListGroup.Item key={index} className="text-muted">
              {item}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
}

// Agregar validación de props con PropTypes
Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string), // `favorites` debe ser un array de strings
};

// Valores predeterminados de las props (opcional)
Favorites.defaultProps = {
  favorites: [], // Asegura que siempre haya un array predeterminado
};

export default Favorites;
