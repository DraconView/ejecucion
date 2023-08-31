import { useContext, useState, useEffect } from "react";
import "../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

// IMPORTACIONES DE COMPONENTES
// ruta de este archivo: src\vistas\administradores\ciudades\OpcionesDeCiudades.jsx
import CrearCiudad from "./crearCiudad/CrearCiudad";
import CiudadesCreadas from "./ciudadesCreadas/CiudadesCreadas";
import EditarCiudades from "./editarCiudades/EditarCiudades";

const OpcionesDeCiudades = () => {
  const [vistaOpcionUno, setvistaOpcionUno] = useState("flex");
  const [vistaOpcionDos, setvistaOpcionDos] = useState("none");
  const [vistaOpcionTres, setvistaOpcionTres] = useState("none");

  function funcionOpcionUno() {
    setvistaOpcionUno("flex");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
  }

  function funcionOpcionDos() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("flex");
    setvistaOpcionTres("none");
  }

  function funcionOpcionTres() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("none");
    setvistaOpcionTres("flex");
  }

  return (
    <>
      <div className="divIzquierdaColumn100">
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            className="iconoAccion"
            style={{ margin: "15px 0px 0px 15px" }}
          />
        </Link>
      </div>
      <div
        className="divBarraTituloRegistroClientes"
        style={{ margin: "20px auto 20px auto" }}
      >
        <span className="textoTitulosFormularios">opciones de ciudades</span>
      </div>
      <div className="contenedorBotonesAccionesFiltroServicios">
        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              funcionOpcionUno();
            }}
          >
            ciudades
          </button>
          <div
            style={{ display: `${vistaOpcionUno}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              funcionOpcionDos();
            }}
          >
            registro
          </button>
          <div
            style={{ display: `${vistaOpcionDos}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaOpcionUno}` }}>
          <EditarCiudades />
        </div>
      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaOpcionDos}` }}>
          <CrearCiudad />
        </div>
      </div>
    </>
  );
};

export default OpcionesDeCiudades;
