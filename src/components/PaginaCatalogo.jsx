import React, { useState, useContext } from "react";
import Products from "./Products";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Cart from "./Cart";

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
    <div className="col-12 container-fluid bg-light w-100 rounded ">
      <div className="row d-flex justify-content-center bg-dark border border-secondary rounded p-2 ">
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
        <div className="col-3 d-flex justify-content-left rounded-5"></div>
      </div>
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-2">
          <div className="container-fluid">
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-dark text-white text-center">
                <h4 className="mb-0">Géneros</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <ul className="list-group list-group-flush">
                      {[
                        "Novela",
                        "Cuentos",
                        "Ciencia Ficción",
                        "Fantasía",
                        "Romance",
                        "Misterio Thriller",
                        "Terror",
                        "Drama",
                        "Histórica",
                      ].map((genre) => (
                        <li
                          key={genre}
                          className="list-group-item d-flex align-items-center"
                        >
                          <input
                            className="form-check-input me-3"
                            type="checkbox"
                            value={genre}
                            id={`checkbox-${genre.replace(/\s+/g, "")}`}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label stretched-link"
                            htmlFor={`checkbox-${genre.replace(/\s+/g, "")}`}
                          >
                            {genre}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {isAdmin ? (
            <Link to="/post-form">
              <button className="btn btn-light border-dark position-relative end-0">
                Agregar libro
              </button>
            </Link>
          ) : null}

          <Products selectedGenres={selectedGenres} searchQuery={searchQuery} />
        </div>

        <div
          className={`col-md-4 rounded pb-2 ${
            !isAuthenticated || isAdmin ? "disabled opacity-100" : ""
          }`}
        >
          <Cart isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}

export default PaginaCatalogo;
