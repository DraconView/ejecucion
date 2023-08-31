// FUNCIONAL PERO SE REEMPALZO LA SELECCION DE CIUDAD POR NOMBRE PUBLICO DE LA CIUDAD
import { useContext, useEffect, useState } from "react";
import { db } from "./../../../../../firebase";
import CartContext from "./../../../../../context/CartContext";
import "./../../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../../context/contextCiudades/ContextCiudadesAsincrono";

function ConsultaCiudades() {
  const { contextCiudades, contextHorariosCalendario,  providerEleccionCiudad } = useContext(CartContext);

  if (contextCiudades.length === 0) {
    return (
      <>
        <ContextCiudadesAsincrono />
      </>
    );
  }

  const [ciudadesConteo, setCiudadesConteo] = useState([]);
  const [ciudadesMasDias, setCiudadesMasDias] = useState([]);
  const [ciudad, setciudad] = useState("");

  useEffect(() => {
    if (contextHorariosCalendario.length > 0) {
      const ciudadesUnicas = obtenerCiudadesUnicas(contextHorariosCalendario);
      setCiudadesConteo(ciudadesUnicas);
    }
  }, [contextHorariosCalendario]);

  const obtenerCiudadesUnicas = (datos) => {
    const ciudadesUnicas = [];
    datos.forEach((item) => {
      const ciudadExistente = ciudadesUnicas.find(
        (ciudad) => ciudad.ciudad === item.ciudad
      );
      if (!ciudadExistente) {
        ciudadesUnicas.push({
          ciudad: item.ciudad,
          cantidadDias: 1,
        });
      } else {
        ciudadExistente.cantidadDias += 1;
      }
    });
    return ciudadesUnicas;
  };

  const [ciudades, setciudades] = useState([]);

  useEffect(() => {
    if (contextCiudades) {
      setciudades(contextCiudades.map((ciudad) => ciudad.ciudad));
      //console.log("ciudades", ciudades);
    }
  }, [contextCiudades]);

  useEffect(() => {
    if (ciudadesConteo.length > 0 && ciudades.length > 0) {
      const ciudadesActualizadas = ciudades.map((ciudad) => {
        const ciudadConteo = ciudadesConteo.find(
          (ciudadConteo) => ciudadConteo.ciudad === ciudad
        );
        if (ciudadConteo) {
          return {
            ciudad: ciudadConteo.ciudad,
            cantidadDias: ciudadConteo.cantidadDias,
          };
        } else {
          return {
            ciudad: ciudad,
            cantidadDias: 0,
          };
        }
      });
      setCiudadesMasDias(ciudadesActualizadas);
    }
  }, [ciudadesConteo]);

  useEffect(() => {
    if (ciudadesMasDias.length > 0) {
      //console.log(ciudadesMasDias);
    }
  }, [ciudadesMasDias]);

  return (
    <div>
      {ciudad ? (
                  <div className="alineacionVertical">
                  <span 
                    className="textoSeleccionCiudadCita"
                    style={{ margin: "20px 0px 10px 0px" }}
                    >
                    {ciudad}
                  </span>
                </div>
      ) : (
        <div className="alineacionVertical">
          <span 
            className="textoSeleccioneCategoria"
            style={{ margin: "20px 0px 15px 0px" }}
            >
            * selecciona la ciudad
          </span>
                </div>
      )}
      {ciudadesMasDias.map((ciudad, index) => (
        <div key={index} 
        className="divCantidadDiasDisponibles"
        onClick={() => {
          setciudad(ciudad.ciudad);
          providerEleccionCiudad(ciudad.ciudad);
        }}
        >
          {ciudad.ciudad}:
          <span
            style={{
              margin: "0px 5px 0px 5px",
              color:
                ciudad.cantidadDias === 0
                  ? "red"
                  : ciudad.cantidadDias === 2
                  ? "orange"
                  : "green",
            }}
          >
            {ciudad.cantidadDias}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ConsultaCiudades;
