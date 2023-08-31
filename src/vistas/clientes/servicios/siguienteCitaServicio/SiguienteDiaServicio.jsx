import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { db } from "../../../../firebase"; // No se están utilizando auth y storage, por lo que se pueden quitar de aquí
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

function SiguienteDiaServicio() {
  const {
    contextPuntoReferencia,
    providerDiaDinamicoSeleccionado,
    contextUsuarioLogueado,
  } = useContext(CartContext);

  //console.log("contextUsuarioLogueado", contextUsuarioLogueado);
  //console.log("contextPuntoReferencia", contextPuntoReferencia);

  // Consultar los días disponibles de la ciudad seleccionada en la base de datos
  const [datosDeConsulta, setDatosDeConsulta] = useState([]);
  const [conteo, setConteo] = useState(0);

  const obtenerDiasDisponibles = async () => {
    //console.log("console3");
    const data = await db
      .collection("DiasDisponiblesCalendario")
      .where("ciudad", "==", contextUsuarioLogueado.displayName)
      .get();
    setDatosDeConsulta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setConteo(1);
  };

  if (conteo === 0) {
    //console.log("console1");
    obtenerDiasDisponibles();
  }

 /* useEffect(() => {
    //console.log("console2");
    obtenerDiasDisponibles();
  }, []);*/

  const enviarDiaSeleccionadoContexto = (dia) => {
    //console.log("console4");
    providerDiaDinamicoSeleccionado(dia);
  };

  return (
    <div className="alineacionVertical">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/login">
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
          {contextUsuarioLogueado.displayName}
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
              <Link
                to="/siguiente-hora-servicio"
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div
                  key={index}
                  className="divFechaDisponible"
                  onClick={() => enviarDiaSeleccionadoContexto(dia)}
                >
                  <span>
                    {dia.diaCalendario?.toDate()?.toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SiguienteDiaServicio;
