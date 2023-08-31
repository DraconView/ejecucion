import { useContext, useState, useEffect } from "react";
import CartContext from "../../../../context/CartContext";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

import "../../../../cssGeneral/CssGeneral.css";

import CrearItemProductos from "./crearItemProductos/CrearItemProductos";
import EditarItemProductos from "./editarItemProductos/EditarItemProductos";

const OpcionesCategoriasProductos = () => {
  const { contextUidCliente } = useContext(CartContext);

  const [criterioBusqueda, setcriterioBusqueda] = useState("");

  const [vistaOpcionUno, setvistaOpcionUno] = useState("flex");
  const [vistaOpcionDos, setvistaOpcionDos] = useState("none");
  const [vistaOpcionTres, setvistaOpcionTres] = useState("none");

  function functionRegistroClientes() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
  }

  function functionFichaClientes() {
    setvistaOpcionUno("flex");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
  }

  function functionServiciosClientes() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("flex");
    setvistaOpcionTres("none");
  }

  function functionVentasPorClientes() {
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
          placeholder="Nombre, categoria, codigo"
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
              functionFichaClientes();
            }}
          >
            Editar
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
              functionServiciosClientes();
            }}
          >
            Crear
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
              functionVentasPorClientes();
            }}
          >
            Estadisticas
          </button>
          <div
            style={{ display: `${vistaOpcionTres}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>
        <div className="contenedorVistasAccionesFiltroServicios">
          <div style={{ display: `${vistaOpcionUno}` }}>
            <EditarItemProductos
              criterioBusqueda={criterioBusqueda}
            />
          </div>
          <div style={{ display: `${vistaOpcionDos}` }}>
            <CrearItemProductos
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

export default OpcionesCategoriasProductos;
