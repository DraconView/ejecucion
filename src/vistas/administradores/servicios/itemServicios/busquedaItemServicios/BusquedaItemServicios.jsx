// /opciones-servicios
import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./../../../../../cssGeneral/CssGeneral.css";

import CrearItemServicios from "../crearItemServicios/CrearItemServicios";
import EditarItemServicios from "../editarItemServicios/EditarItemServicios";
import ReporteServicios from "../reporteServicios/ReporteServicios";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const BarraBusquedaClientes = () => {
  //console.log('llamando a BarraBusquedaClientes');
  const [criterioBusqueda, setcriterioBusqueda] = useState("");

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
      <div
        style={{
          alignitems: "left",
          display: "flex",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "15px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div
        className="alineacionVertical"
        style={{ margin: "0px auto 15px auto" }}
      >
        <span className="texto25pxFw700TtUpper">servicios</span>
      </div>
      <div className="alineacionHorizontalJustificada">
        <AiOutlineSearch
          className="iconoBarraBusqueda"
          style={{ position: "relative" }}
        />
        <input
          placeholder="Buscar servicio"
          value={criterioBusqueda}
          onChange={(e) => setcriterioBusqueda(e.target.value.toUpperCase())}
          className="casillaBarraBusqueda"
        />
      </div>
      <div className="contenedorBotonesAccionesFiltroServicios">
        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              funcionOpcionUno();
            }}
          >
            ordenes
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
            servicios
          </button>
          <div
            style={{ display: `${vistaOpcionDos}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              funcionOpcionTres();
            }}
          >
            Registro
          </button>
          <div
            style={{ display: `${vistaOpcionTres}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>

      {/* renderizado de datos */}

      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaOpcionUno}` }}>
          <ReporteServicios criterioBusqueda={criterioBusqueda} />
        </div>
        <div style={{ display: `${vistaOpcionDos}` }}>
          <EditarItemServicios criterioBusqueda={criterioBusqueda} />
        </div>
        <div style={{ display: `${vistaOpcionTres}` }}>
          <CrearItemServicios />
        </div>
      </div>
    </>
  );
};

export default BarraBusquedaClientes;
