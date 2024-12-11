import React from "react";

function Footer() {
  return (
    <footer className="bg-secondary text-white py-3 w-100 footer">
      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between">
        <p>© 2024 Compañía, Inc. Todos los derechos reservados.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-white" href="#">
              Twitter
            </a>
          </li>
          <li className="ms-3">
            <a className="text-white" href="#">
              Instagram
            </a>
          </li>
          <li className="ms-3">
            <a className="text-white" href="#">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
