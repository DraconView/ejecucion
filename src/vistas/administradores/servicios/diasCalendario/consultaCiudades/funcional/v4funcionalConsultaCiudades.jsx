import { useContext, useEffect, useState } from "react";
import { db } from "../../../../../../firebase";
import CartContext from "../../../../../../context/CartContext";
import "./../../../../../cssGeneral/CssGeneral.css";

function ConsultaCiudades() {
  const { contextCiudades } = useContext(CartContext);

  const [datosDeConsulta, setDatosDeConsulta] = useState([]);
  const [ciudadesConteo, setCiudadesConteo] = useState([]);
  const [ciudadesMasDias, setCiudadesMasDias] = useState([]);

  useEffect(() => { 
    const obtenerCiudades = async () => {
      const data = await db.collection("DiasDisponiblesCalendario").get();
      setDatosDeConsulta(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    obtenerCiudades();
  }, []);

  useEffect(() => {
    if (datosDeConsulta.length > 0) {
      const ciudadesUnicas = obtenerCiudadesUnicas(datosDeConsulta);
      setCiudadesConteo(ciudadesUnicas);
    }
  }, [datosDeConsulta]);

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
      //console.log('ciudades', ciudades) 
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
      {ciudadesMasDias.map((ciudad, index) => (
        <div
          key={index}
          style={{
            borderStyle:
              ciudad.cantidadDias === 0
                ? "solid"
                : ciudad.cantidadDias === 2
                ? "solid"
                : "solid",
            borderWidth:
              ciudad.cantidadDias === 0
                ? "2px"
                : ciudad.cantidadDias === 2
                ? "2px"
                : "2px",
            borderColor:
              ciudad.cantidadDias === 0
                ? "red"
                : ciudad.cantidadDias === 2
                ? "green"
                : "orange",
          }}
          className="divCantidadDiasDisponibles"
        >
          {ciudad.ciudad} : 
          <span           style={{
            backgroundColor:
            ciudad.cantidadDias === 0
              ? "red"
              : ciudad.cantidadDias === 2
              ? "orange"
              : "green",
          }}
          >
          {ciudad.cantidadDias} 
          </span> días
        </div>
      ))}
    </div>
  );
}

export default ConsultaCiudades;
