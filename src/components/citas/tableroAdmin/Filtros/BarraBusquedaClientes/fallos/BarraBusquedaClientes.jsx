/*
parece que no agarra la ruta correcta
*/
import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as tfnlp from "@tensorflow-models/universal-sentence-encoder";

import FichaClientes from "../FichaClientes/FichaClientes";
import FiltroServiciosClientes from "../FiltroServiciosClientes/FiltroServiciosClientes";
import FiltroVentasPorClientes from "../FiltroVentasPorClientes/FiltroVentasPorClientes";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const BarraBusquedaClientes = () => {
  const [criterioBusqueda, setcriterioBusqueda] = useState("");
  const [vistaFichaClientes, setvistaFichaClientes] = useState("flex");
  const [vistaServiciosClientes, setvistaServiciosClientes] = useState("none");
  const [vistaVentasPorClientes, setvistaVentasPorClientes] = useState("none");

  const isCellPhoneNumber = async (text) => {
    // Modelo de TensorFlow.js para clasificación de texto
    const model = await tf.loadLayersModel("path/to/modeloDatos.json");

    // Cargar el modelo de lenguaje de sentencia universal
    const encoderModel = await tfnlp.load();

    // Incrustar el texto utilizando el modelo de lenguaje de sentencia universal
    const embeddedText = await encoderModel.embed([text]);

    // Realizar la predicción utilizando el modelo de clasificación
    const prediction = model.predict(embeddedText);

    // Obtener el índice de la clase predicha
    const predictedClassIndex = tf.argMax(prediction).dataSync()[0];

    // Distinguir si es un número de teléfono celular o no
    return predictedClassIndex === 0;
  };

  const isEmailAddress = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isNameWithLastName = (text) => {
    const nameWithLastNameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    return nameWithLastNameRegex.test(text);
  };

  useEffect(() => {
    const classifyData = async () => {
      const testData = [criterioBusqueda];

      for (const data of testData) {
        if (await isCellPhoneNumber(data)) {
          //console.log(`${data} is a cell phone number`);
        } else if (isEmailAddress(data)) {
          //console.log(`${data} is an email address`);
        } else if (isNameWithLastName(data)) {
          //console.log(`${data} is a name followed by a last name`);
        } else {
          //console.log(`Unable to classify ${data}`);
        }
      }
    };

    if (criterioBusqueda !== "") {
      classifyData();
    }
  }, [criterioBusqueda]);

  function functionRegistroClientes() {
    setvistaFichaClientes("none");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("none");
  }

  function functionFichaClientes() {
    setvistaFichaClientes("flex");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("none");
  }

  function functionServiciosClientes() {
    setvistaFichaClientes("none");
    setvistaServiciosClientes("flex");
    setvistaVentasPorClientes("none");
  }

  function functionVentasPorClientes() {
    setvistaFichaClientes("none");
    setvistaServiciosClientes("none");
    setvistaVentasPorClientes("flex");
  }

  return (
    <>
      <div
        style={{
          alignItems: "left",
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
              functionFichaClientes();
            }}
          >
            Ficha
          </button>
          <div
            style={{ display: `${vistaFichaClientes}` }}
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
            Servicios
          </button>
          <div
            style={{ display: `${vistaServiciosClientes}` }}
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
            Productos
          </button>
          <div
            style={{ display: `${vistaVentasPorClientes}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
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

