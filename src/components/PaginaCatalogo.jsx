import React, { useState } from "react";
import Products from "./Products"; // Importación corregida
import { Link } from "react-router-dom";

function PaginaCatalogo() {
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
    <div className="col-12 w-40 p-4">
      <div className="row d-flex justify-content-center bg-secondary p-2">
        <div className="col-3"></div>
        <div className="col-9 d-flex justify-content-center">
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
      <div className="row d-flex justify-content-center">
        <div className="col-3 border border-2 text-left p-5">
          <h4>Géneros</h4>
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
              <label className="form-check-label" htmlFor={`checkbox-${genre}`}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <div className="col-9 border border-2">
          <Link to={`/post-form`}>
            <button className="btn btn-primary m-3 p-2 position-absolute end-0">
              Agregar libro
            </button>
          </Link>
          <Products selectedGenres={selectedGenres} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default PaginaCatalogo;
