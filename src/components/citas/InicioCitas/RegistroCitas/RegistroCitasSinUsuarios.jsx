import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./../../../../cssGeneral/CssGeneral.css";

import RegistroClientes from "../../crear/RegistroClientes/RegistroClientes";
import FichaClientes from "../FichaClientes/FichaClientes";
import FiltroServiciosClientes from "../FiltroServiciosClientes/FiltroServiciosClientes";
import FiltroVentasPorClientes from "../FiltroVentasPorClientes/FiltroVentasPorClientes";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const RegistroCitasSinUsuarios = () => {
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

  const classes = useStyles();

  return (
    <>
      <div
        style={{
          alignitems: "left",
          display: "flex",
          backgroundColor: "#ffffff",
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
      <div className="alineacionVerticalSinWidth" style={{ margin: "0px 0px 5px 0px"}}>
        <AiOutlineSearch className={classes.iconosText} />
        <input
          placeholder="Buscar cliente"
          value={criterioBusqueda}
          onChange={(e) => setcriterioBusqueda(e.target.value.toUpperCase())}
          className={classes.casillaTexto}
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

const useStyles = makeStyles({
  casillaTexto: {
    margin: "10px 30px 10px 0px",
    borderRadius: "20px",
    width: "300px",
    border: "solid 2px #FEBA20",
    padding: "10px 20px 10px 50px",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    outline: "none",
  },
  iconosText: {
    width: "28px",
    position: "relative",
    fontSize: "22px",
    left: 35,
    top: 18,
    backgroundColor: "transparent",
    color: "#FEBA20",
  },
});

export default RegistroCitasSinUsuarios;
