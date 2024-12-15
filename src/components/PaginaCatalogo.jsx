import React, { useState } from "react";
import Products from "./Products"; // Importación corregida
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function PaginaCatalogo() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres((prevGenres) =>
      checked
        ? [...prevGenres, value]
        : prevGenres.filter((genre) => genre !== value)
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="col-12 container-fluid bg-light w-100 rounded">
      <div className="row d-flex justify-content-center bg-dark border border-secondary rounded p-2 ">
        <div className="col-3 d-flex justify-content-center rounded-5"></div>
        <div className="col-9 d-flex justify-content-center card-header rounded">
          <form className="form-inline my-lg-0 w-75">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Ingrese título o autor"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
      <div className="row d-flex justify-content-center  ">
        <div className="col-3 text-left  ">
          <div className="rounded border border-2 m-2 pb-2 ">
            <div className="card-header  rounded p-2 bg-light text-dark text-center">
              <h5>Géneros</h5>
              <hr />
            </div>
            <div className="card-body d-flex align-items-start flex-column m-3 mt-0 ">
              {[
                "Novela",
                "Cuentos",
                "CienciaFiccion",
                "Fantasía",
                "Romance",
                "MisterioThriller",
                "Terror",
                "Drama",
                "Historica",
              ].map((genre) => (
                <div className="form-check" key={genre}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={genre}
                    id={`checkbox-${genre}`}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`checkbox-${genre}`}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`rounded border border-2 m-2 pb-2 ${
              !isAuthenticated || isAdmin ? "disabled opacity-100" : ""
            }`}
          >
            <div className="card-header rounded bg-light text-dark text-center">
              <h5>Carrito 🛒 </h5>
            </div>
            <div className="card-body justify-content-center w-30">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>~</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí se agregarán los productos del carrito */}
                  <tr>
                    <td>Producto</td>
                    <td>$100</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        disabled={!isAuthenticated || isAdmin}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5>Total: $100</h5>
              <button
                className="btn btn-primary btn-sm"
                disabled={!isAuthenticated || isAdmin}
              >
                Pagar
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={!isAuthenticated || isAdmin}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>

        <div className="col-9 ">
          {isAdmin ? (
            <Link to="/post-form">
              <button className="btn btn-light border-dark m-3 p-2 position-absolute end-0">
                Agregar libro
              </button>
            </Link>
          ) : (
            ""
          )}

          <Products selectedGenres={selectedGenres} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default PaginaCatalogo;
