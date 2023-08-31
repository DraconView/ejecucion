import { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "./../../../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

import CrearDiasCalendario from "../crearDiasCalendario/CrearDiasCalendario";
import EditarDiasCalendario from "../editarDiasCalendario/EditarDiasCalendario";
import ConsultaCiudades from "../consultaCiudades/ConsultaCiudades";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const OpcionesDeHorarios = () => {
  //console.log('llamando a OpcionesDeHorarios');

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
        <span className="textoTitulosFormularios">Opciones de horarios</span>
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

      {/* renderizado de datos */}

      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaOpcionUno}` }}>
          <ConsultaCiudades />
        </div>
        <div style={{ display: `${vistaOpcionDos}` }}>
          <CrearDiasCalendario />
        </div>
      </div>
    </>
  );
};

export default OpcionesDeHorarios;
