import React from "react";
import Products from "./Products";

function PaginaCatalogo() {
  return (
    <div className=" col-12 w-40 p-4">
      <div className="row d-flex justify-content-center bg-secondary p-2">
        <div className="col-3"></div>
        <div className="col-9 d-flex justify-content-center">
          <form className="form-inline my-lg-0 w-75">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Buscador"
              aria-label="Search"
            />
          </form>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-3 border border-2 text-left p-5">
          <h4>Géneros</h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="novela"
              id="checkboxNovela"
            />
            <label className="form-check-label" htmlFor="checkboxNovela">
              Novela
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="cuentos"
              id="checkboxCuentos"
            />
            <label className="form-check-label" htmlFor="checkboxCuentos">
              Cuentos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="cienciaFiccion"
              id="checkboxCienciaFiccion"
            />
            <label
              className="form-check-label"
              htmlFor="checkboxCienciaFiccion"
            >
              Ciencia Ficción
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="fantasia"
              id="checkboxFantasia"
            />
            <label className="form-check-label" htmlFor="checkboxFantasia">
              Fantasía
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="romance"
              id="checkboxRomance"
            />
            <label className="form-check-label" htmlFor="checkboxRomance">
              Romance
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="misterioThriller"
              id="checkboxMisterioThriller"
            />
            <label
              className="form-check-label"
              htmlFor="checkboxMisterioThriller"
            >
              Misterio/Thriller
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="terror"
              id="checkboxTerror"
            />
            <label className="form-check-label" htmlFor="checkboxTerror">
              Terror
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="drama"
              id="checkboxDrama"
            />
            <label className="form-check-label" htmlFor="checkboxDrama">
              Drama
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="historica"
              id="checkboxHistorica"
            />
            <label className="form-check-label" htmlFor="checkboxHistorica">
              Histórica
            </label>
          </div>
        </div>
        <div className="col-9 border border-2">
          <Products></Products>
        </div>
      </div>
    </div>
  );
}

export default PaginaCatalogo;
