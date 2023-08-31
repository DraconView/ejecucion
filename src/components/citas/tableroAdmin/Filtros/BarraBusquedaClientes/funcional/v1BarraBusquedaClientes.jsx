/* NOTA: se reepalza este codigo por el mismo pero sin la opcion de registrar clientes
debido a que se necesita UID
*/
import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import './../../../../../cssGeneral/CssGeneral.css'

import RegistroClientes from "../../crear/RegistroClientes/RegistroClientes";
import FichaClientes from "../FichaClientes/FichaClientes";
import FiltroServiciosClientes from "../FiltroServiciosClientes/FiltroServiciosClientes";
import FiltroVentasPorClientes from "../FiltroVentasPorClientes/FiltroVentasPorClientes";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const BarraBusquedaClientes = () => {
  //console.log('llamando a BarraBusquedaClientes');
  const [criterioBusqueda, setcriterioBusqueda] = useState("");

  const [vistaRegistroClientes, setvistaRegistroClientes] = useState("none");
  const [vistaFichaClientes, setvistaFichaClientes] = useState("flex");
  const [vistaServiciosClientes, setvistaServiciosClientes] = useState("none");
  const [vistaVentasPorClientes, setvistaVentasPorClientes] = useState("none");

  function functionRegistroClientes() {
    setvistaRegistroClientes("flex");
    setvistaFichaClientes("none");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("none");
  }

  function functionFichaClientes() {
    setvistaRegistroClientes("none");
    setvistaFichaClientes("flex");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("none");
  }

  function functionServiciosClientes() {
    setvistaRegistroClientes("none");
    setvistaFichaClientes("none");
    setvistaServiciosClientes("flex");
    setvistaVentasPorClientes("none");
  }

  function functionVentasPorClientes() {
    setvistaRegistroClientes("none");
    setvistaFichaClientes("none");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("flex");
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
      <div className="alineacionHorizontalJustificada">
        <AiOutlineSearch
          className="iconoBarraBusqueda"
          style={{ position: "relative" }}
        />
        <input
          placeholder="Buscar cliente"
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
              functionRegistroClientes();
            }}
          >
            Registro
          </button>
          <div style={{ display: `${vistaRegistroClientes}` }} 
          className="lineaInferiorAccionesClientes"/>
        </div>

        <div className="alineacionBotonBarraInferior">  
      <button
          className="botonAccionesFiltroClientes"
          onClick={() => {
            functionFichaClientes();
          }}
        >
          Ficha
        </button>
        <div style={{ display: `${vistaFichaClientes}` }} 
        className="lineaInferiorAccionesClientes"/>
        </div>

        <div className="alineacionBotonBarraInferior">
        <button
        className="botonAccionesFiltroClientes"
          onClick={() => {
            functionServiciosClientes();
          }}
        >
          Servicios
        </button>
        <div style={{ display: `${vistaServiciosClientes}` }}
        className="lineaInferiorAccionesClientes"/>
        </div>

        <div className="alineacionBotonBarraInferior">
        <button
        className="botonAccionesFiltroClientes"
          onClick={() => {
            functionVentasPorClientes();
          }}
        >
          productos
        </button>
        <div style={{ display: `${vistaVentasPorClientes}` }}
        className="lineaInferiorAccionesClientes"/>
        </div>
      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
      <div style={{ display: `${vistaRegistroClientes}` }}>
        <RegistroClientes />
      </div>
      <div style={{ display: `${vistaFichaClientes}` }}>
        <FichaClientes criterioBusqueda={criterioBusqueda} />
      </div>
      <div style={{ display: `${vistaServiciosClientes}` }}>
        <FiltroServiciosClientes criterioBusqueda={criterioBusqueda} />
      </div>
      <div style={{ display: `${vistaVentasPorClientes}` }}>
        <FiltroVentasPorClientes criterioBusqueda={criterioBusqueda} />
      </div>
      </div>
    </>
  );
};

export default BarraBusquedaClientes;
