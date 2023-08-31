import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { db } from "./../../../../firebase"; // No se están utilizando auth y storage, por lo que se pueden quitar de aquí
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

function DiasDisponiblesCalendario() {
  const {
    contextCiudadSeleccionada,
    contextPuntoReferencia,
    providerDiaDinamicoSeleccionado,
  } = useContext(CartContext);

  // Consultar los días disponibles de la ciudad seleccionada en la base de datos
  const [datosDeConsulta, setDatosDeConsulta] = useState([]);

  useEffect(() => {
    const obtenerDiasDisponibles = async () => {
      const data = await db
        .collection("DiasDisponiblesCalendario")
        .where("ciudad", "==", contextCiudadSeleccionada)
        .get();
      setDatosDeConsulta(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    obtenerDiasDisponibles();
  }, [contextCiudadSeleccionada]);

  const enviarDiaSeleccionadoContexto = (dia) => {
    providerDiaDinamicoSeleccionado(dia);
  };

  return (
    <div className="alineacionVertical">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/seleccion-ciudad-cita">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoTituloCiudadSeleccionada">
          {contextCiudadSeleccionada}
        </span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoPuntoReferenciaSeleccionado">
          {contextPuntoReferencia}
        </span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoSeleccioneCategoria">Selecciona el día</span>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <div className="n">
          {datosDeConsulta.length === 0 ? (
            <div>Selecciona un día</div>
          ) : (
            datosDeConsulta.map((dia, index) => (
              <Link to="/horas-disponibles-calendario" key={index} style={{ textDecoration: "none" }}>
              <div key={index}
                className="divFechaDisponible"
                onClick={() => enviarDiaSeleccionadoContexto(dia)} 
                >
                <span>{dia.diaCalendario
                  .toDate()
                  .toLocaleDateString( "es-ES", { 
                    weekday: "long" , 
                    day: "numeric", 
                    month: "long" , 
                    year: "numeric" }
                )}</span>
              </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DiasDisponiblesCalendario;
