import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { db, auth, storage } from "./../../../../firebase";

function HorasDisponiblesCalendario() {
  const {
    contextDiaDinamicoSeleccionado,
    contextCiudadSeleccionada,
    providerDiaMasHoraDinamicosSeleccionados,
    contextDuracionCita,
  } = useContext(CartContext);

  const [ciudadMasDia, setciudadMasDia] = useState("");

  useEffect(() => {
    // une la ciudad seleccionada con el dia seleccionado
    if (contextCiudadSeleccionada && contextDiaDinamicoSeleccionado) {
      function unirCiudadMasDia() {
        let unionCiudadMasDia =
          contextCiudadSeleccionada + "/" + funcionFechaLegible();
        //console.log(unionCiudadMasDia, "unionCiudadMasDia");
        return setciudadMasDia(unionCiudadMasDia);
      }
      unirCiudadMasDia();
     //console.log(ciudadMasDia, "ciudadMasDia");
    }
  }, [contextCiudadSeleccionada, contextDiaDinamicoSeleccionado]);

  function funcionFechaLegible() {
    // esta funcion convierte la fecha en un string
    let calculoFecha = contextDiaDinamicoSeleccionado.diaCalendario.toDate();
    let fechaLegible =
      calculoFecha.getDate() +
      "/" +
      (calculoFecha.getMonth() + 1) +
      "/" +
      calculoFecha.getFullYear();
    //console.log(fechaLegible, "fechaLegible");
    return fechaLegible.toString();
  }

  const [datosOrdenesServicios, setdatosOrdenesServicios] = useState([]);
  const [revisionBaseDatos, setrevisionBaseDatos] = useState("");
  const [arrayTimeMsConsulta, setarrayTimeMsConsulta] = useState([]);

  useEffect(() => {
    // CONSULTA LA BASE DE DATOS
    if (ciudadMasDia && datosOrdenesServicios.length === 0) {
        //console.log(ciudadMasDia, "ciudadMasDiaDesdeConsulta");
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("OrdenesServicios");
        referenciasDb
          .where("ciudadMasFecha", "==", `${ciudadMasDia}`) // BUSQUEDA EXACTA
          //.where("ciudadMasFecha", ">=", `${ciudadMasDia}`) // BUSQUEDA QUE CONTENGAN
          //.where("ciudadMasFecha", "<", `${ciudadMasDia}z`) // BUSQUEDA QUE CONTENGAN
          // .orderBy("timestamp", "asc") cambia a desc
          //.orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setdatosOrdenesServicios(referenciasSnap);
                //console.log(referenciasSnap, "referenciasSnap");
            setarrayTimeMsConsulta(referenciasSnap.map((dato) => dato.timeMs));
            if (referenciasSnap.length === 0) {
              setrevisionBaseDatos("no hay datos");
                //console.log("no hay datos");
            }
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
  }, [ciudadMasDia, datosOrdenesServicios]);

  ///////////////////// LOGICA DINAMICA ///////////////////////

  const [horasDinamicasMilisegundos, sethorasDinamicasMilisegundos] = useState(
    []
  );

  useEffect(() => {
    // setea el horario de la mañana y de la tarde con los datos de la base de datos
    let joSet = new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate());
    let inJoDate = new Date(joSet);
    // contextDiaDinamicoSeleccionado[0] es el primer objeto del array contextDiaDinamicoSeleccionado
    inJoDate.setHours(
      contextDiaDinamicoSeleccionado.inJo[0],
      contextDiaDinamicoSeleccionado.inJo[1],
      contextDiaDinamicoSeleccionado.inJo[2],
      contextDiaDinamicoSeleccionado.inJo[3]
    );
    let fiJoDate = new Date(joSet);
    fiJoDate.setHours(
      contextDiaDinamicoSeleccionado.fiJo[0],
      contextDiaDinamicoSeleccionado.fiJo[1],
      contextDiaDinamicoSeleccionado.fiJo[2],
      contextDiaDinamicoSeleccionado.fiJo[3]
    );
    let inDeDate = new Date(joSet);
    inDeDate.setHours(
      contextDiaDinamicoSeleccionado.inDe[0],
      contextDiaDinamicoSeleccionado.inDe[1],
      contextDiaDinamicoSeleccionado.inDe[2],
      contextDiaDinamicoSeleccionado.inDe[3]
    );
    let fiDeDate = new Date(joSet);
    fiDeDate.setHours(
      contextDiaDinamicoSeleccionado.fiDe[0],
      contextDiaDinamicoSeleccionado.fiDe[1],
      contextDiaDinamicoSeleccionado.fiDe[2],
      contextDiaDinamicoSeleccionado.fiDe[3]
    );
    let inJoMs, fiJoMs, inDeMs, fiDeMs;
    if (
      joSet instanceof Date &&
      inJoDate instanceof Date &&
      fiJoDate instanceof Date &&
      inDeDate instanceof Date &&
      fiDeDate instanceof Date
    ) {
      inJoMs = inJoDate.getTime();
      fiJoMs = fiJoDate.getTime();
      inDeMs = inDeDate.getTime();
      fiDeMs = fiDeDate.getTime();
      fCalcularHorarios(inJoMs, fiJoMs, inDeMs, fiDeMs);
    } else {
      //console.error( "El valor de contextDiaDinamicoSeleccionado no es una instancia de Date" );
    }
  }, [contextDiaDinamicoSeleccionado]);

  const fCalcularHorarios = (inJoMs, fiJoMs, inDeMs, fiDeMs) => {
    // fCalcularHorarios calcula horarios en milisegundos
    let tiempoCitas = contextDuracionCita * 60000;
    const listaHorasMilisegundos = [];
    // horario de la mañana
    for (let i = inJoMs; i < inDeMs; i += tiempoCitas) {
      listaHorasMilisegundos.push(i); // Cambiar nombre de variable para que coincida
    }
    if (inJoMs === inDeMs) {
      for (let i = fiJoMs; i < fiDeMs; i += tiempoCitas) {
        listaHorasMilisegundos.push(i); // Cambiar nombre de variable para que coincida
      }
    }
    // horario de la tarde
    for (let i = fiDeMs; i < fiJoMs; i += tiempoCitas) {
      listaHorasMilisegundos.push(i); // Cambiar nombre de variable para que coincida
    }
    sethorasDinamicasMilisegundos(listaHorasMilisegundos);
    //console.log(listaHorasMilisegundos, "listaHorasMilisegundos");
    //convertirMilisegundosAhoras(listaHorasMilisegundos); solo para pruebas
  };

  ///////////////////////////  3. UNION DE HORARIOS BD Y DINAMICOS  ///////////////////////////

  const [horariosDisponibles, sethorariosDisponibles] = useState([]);

  useEffect(() => {
    // une los horarios de la base de datos con los horarios dinamicos
    if (
      arrayTimeMsConsulta.length > 0 &&
      horasDinamicasMilisegundos.length > 0
    ) {
      function compararArrays() {
        const consthorariosDisponibles = arrayTimeMsConsulta
          .filter((x) => !horasDinamicasMilisegundos.includes(x))
          .concat(
            horasDinamicasMilisegundos.filter(
              (x) => !arrayTimeMsConsulta.includes(x)
            )
          );
        return consthorariosDisponibles;
      }
      const activacionCompararArrays = compararArrays();
      convertirMilisegundosAhoras(activacionCompararArrays);
      //console.log(activacionCompararArrays, "activacionCompararArrays");
    } else if (revisionBaseDatos === "no hay datos") {
      convertirMilisegundosAhoras(horasDinamicasMilisegundos);
    }
  }, [arrayTimeMsConsulta, horasDinamicasMilisegundos]);

  const convertirMilisegundosAhoras = (listaHorasMilisegundos) => {
    const listaHoras = [];
    for (let i = 0; i < listaHorasMilisegundos.length; i++) {
      let hora = new Date(listaHorasMilisegundos[i]);
      listaHoras.push(hora);
    }
    sethorariosDisponibles(listaHoras);
  }

  return (
    <div className="alineacionVertical">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/dias-disponibles-dinamicos">
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
        <span className="textoSeleccioneCategoria">selecciona la hora del</span>
      </div>
      {contextDiaDinamicoSeleccionado ? (
        <div className="avisoDiaseleccionado">
          <div style={{ margin: "0px 5px" }}>
            {new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate()).toLocaleString( "es-ES", {
              weekday: "long",
            })}
          </div>
          <div style={{ margin: "0px 5px" }}>
          {new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate()).toLocaleString( "es-ES", {
              day: "numeric",
            })}
          </div>
          <div style={{ margin: "0px 5px" }}>
            <span> de </span>
          </div>
          <div style={{ margin: "0px 5px" }}>
          {new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate()).toLocaleString( "es-ES", {
              month: "long",
            })}
          </div>
        </div>
      ) : (
        <div>no hay datos</div>
      )}

      {horariosDisponibles ? (
        <div style={{ marginBottom: "20px" }}>
          {horariosDisponibles.map((hora, index) => (
            <Link
              to="/cart"
              key={index}
              style={{ textDecoration: "none" }}
              onClick={() => {
                providerDiaMasHoraDinamicosSeleccionados(hora);
              }}
            >
              <div key={index} className="divFechaDisponible">
                {new Date(hora).toLocaleTimeString("es-ES", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>cargando...</div>
      )}
    </div>
  );
}

export default HorasDisponiblesCalendario;
