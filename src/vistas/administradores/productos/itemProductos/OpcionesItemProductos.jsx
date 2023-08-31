import { useContext, useState, useEffect } from "react";
import CartContext from "../../../context/CartContext";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

import "../../../cssGeneral/CssGeneral.css";

import CrearItemProductos from "./itemProductos/crearItemProductos/CrearItemProductos";
import EditarItemProductos from "./itemProductos/editarItemProductos/EditarItemProductos";
import ReporteProductos from "./itemProductos/reporteProductos/ReporteProductos";

const OpcionesItemProductos = () => {
  const { contextUidCliente } = useContext(CartContext);

  const [criterioBusqueda, setcriterioBusqueda] = useState("");
  const [textoPlaceholder, settextoPlaceholder] = useState("despacho, pago, fecha");

  const [vistaOpcionUno, setvistaOpcionUno] = useState("flex");
  const [vistaOpcionDos, setvistaOpcionDos] = useState("none");
  const [vistaOpcionTres, setvistaOpcionTres] = useState("none");

  function funcionVistaOpcionUno() {
    setvistaOpcionUno("flex");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
    settextoPlaceholder("despacho, pago, fecha");
  }

  function funcionVistaOpcionDos() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("flex");
    setvistaOpcionTres("none");
  }

  function funcionVistaOpcionTres() {
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
        <span className="texto25pxFw700TtUpper">Productos</span>
      </div>
      <div className="alineacionHorizontalJustificada">
        <AiOutlineSearch
          className="iconoBarraBusqueda"
          style={{ position: "relative" }}
        />
        <input
          placeholder={textoPlaceholder}
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
              funcionVistaOpcionUno();
            }}
          >
            Reportes 
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
              funcionVistaOpcionDos();
            }}
          >
            Inventario 
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
              funcionVistaOpcionTres();
            }}
          >
            Crear
          </button>
          <div
            style={{ display: `${vistaOpcionTres}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>
        <div className="contenedorVistasAccionesFiltroServicios">
          <div style={{ display: `${vistaOpcionUno}` }}>
            <ReporteProductos 
              criterioBusqueda={criterioBusqueda}
            />
          </div>
          <div style={{ display: `${vistaOpcionDos}` }}>
            <EditarItemProductos 
              criterioBusqueda={criterioBusqueda}
            />
          </div>
          <div style={{ display: `${vistaOpcionTres}` }}>
            <CrearItemProductos
              criterioBusqueda={criterioBusqueda}
            />
          </div>
        </div>
    </>
  );
};

export default OpcionesItemProductos;
