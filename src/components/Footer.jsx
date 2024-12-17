import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white p-1 w-100 text-center">
      <div className="container-fluid">
        <p>© 2024 Compañía, Inc. Todos los derechos reservados.</p>
        <p>Contacto: holalibreria3.0@gmail.com</p>
        <ul className="list-unstyled d-flex justify-content-center mb-0">
          <li className="ms-3">
            <Link className="text-white" to="/Acercade">Acerca de</Link>
          </li>
          <li className="ms-3">
            <Link className="text-white" to="/PoliticaDePrivacidad">Políticas de Privacidad</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
