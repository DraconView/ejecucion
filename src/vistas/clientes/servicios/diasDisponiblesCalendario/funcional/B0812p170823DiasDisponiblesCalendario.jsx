import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { db } from "./../../../../firebase";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

function DiasDisponiblesCalendario(proceso) {
  const {
    contextCiudadSeleccionada,
    contextPuntoReferencia,
    providerDiaDinamicoSeleccionado,
    contextUsuarioLogueado,
    contextCelularMovil
  } = useContext(CartContext);

  const [celularMovil, setCelularMovil] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [datosDeConsulta, setDatosDeConsulta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contextUsuarioLogueado) {
      setCiudad(contextUsuarioLogueado.displayName);  
    }
  }, [contextUsuarioLogueado]);

useEffect(() => {
  if (ciudad) {
    const obtenerDiasDisponibles = async () => {
      try {
        const data = await db
          .collection("DiasDisponiblesCalendario")
          .where("ciudad", "==", ciudad)
          .get();
        setDatosDeConsulta(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        //console.error(error);
      } finally {
        setLoading(false);
      }
    };
    obtenerDiasDisponibles().then(() => {
      Promise.resolve().then(() => {
        setLoading(false);
      });
    });
  }
}, [ciudad]);

  const enviarDiaSeleccionadoContexto = (dia) => {
    providerDiaDinamicoSeleccionado(dia); 
  };

  return (
    <div className="alineacionVertical">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/horas-disponibles-calendario">
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
          {ciudad}
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
          {loading ? (
            <div>Cargando...</div>
          ) : datosDeConsulta.length === 0 ? (
            <div>Selecciona un día</div>
          ) : (
            datosDeConsulta.map((dia, index) => (
              <Link to="/horas-disponibles-calendario" key={index} style={{ textDecoration: "none" }}>
                <div
                  key={index}
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