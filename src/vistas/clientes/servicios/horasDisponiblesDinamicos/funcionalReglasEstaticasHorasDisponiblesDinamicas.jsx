// ruta: /horas-disponibles-dinamicas
// 1 minuto equivale a 60000 milisegundos. ejempplo: * 60000
// contextDiaDinamicoSeleccionado.setHours(0, 0, 0, 0); setea la hora a las 00:00 siendo 0 horas, 0 minutos, 0 segundos y 0 milisegundos
// let inJoDate = new Date(contextDiaDinamicoSeleccionado); crea una instancia de Date con la fecha del contextDiaDinamicoSeleccionado
// toLocaleTimeString es una funcion de Date que devuelve la hora en formato de 24 horas
// toLocaleString es una funcion de Date que devuelve la fecha en formato de fecha local
// hour12: true, hora de 12 horas
import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { db, auth, storage } from "./../../../../firebase";

function HorasDisponiblesDinamicas() {
  const {
    contextDiaDinamicoSeleccionado,
    providerDiaMasHoraDinamicosSeleccionados,
    contextCiudadSeleccionada,
  } = useContext(CartContext);

  const reglas = [
    {
      diasDisponibles: "martes, jueves, viernes",
      inJo: [8, 0, 0, 0],
      fiJo: [17, 0, 0, 0],
      inDe: [12, 0, 0, 0],
      fiDe: [14, 0, 0, 0],
      diasFestivos: "ninguno",
      duracionCita: 30,
      rangoDias: 15,
    },
  ];

/////////////////////////// 2. CONSULTA DE HORAS BASE DE DATOS ///////////////////////////

const [ciudadMasDia, setciudadMasDia] = useState("");

useEffect(() => {
  if (contextCiudadSeleccionada && contextDiaDinamicoSeleccionado) {
    function unirCiudadMasDia() {
      let unionCiudadMasDia =
        contextCiudadSeleccionada + "/" + funcionFechaLegible();
      //console.log(unionCiudadMasDia, "unionCiudadMasDia");
      return setciudadMasDia(unionCiudadMasDia);
    }
    unirCiudadMasDia();
  }
}, [contextCiudadSeleccionada, contextDiaDinamicoSeleccionado ]);

function funcionFechaLegible() {
  let calculoFecha = new Date(contextDiaDinamicoSeleccionado);
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

useEffect(() => {
  // CONSULTA LA BASE DE DATOS
  if (ciudadMasDia) {
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
        })
        .catch((error) => {
          //console.error("Error al obtener los productos:", error);
        });
    };
    obtenerRegistrosFirestore();
  }
}, [ciudadMasDia, datosOrdenesServicios]);

const [arrayTimeMsConsulta, setarrayTimeMsConsulta] = useState([]);

useEffect(() => {
  function obtenerArrayTimeMs() {
    const letarrayTimeMsConsulta = datosOrdenesServicios.map((dato) => dato.timeMs);
    return letarrayTimeMsConsulta;
  }

  const contsarrayTimeMsConsulta = obtenerArrayTimeMs();
  //console.log(arrayTimeMsConsulta);
  setarrayTimeMsConsulta(contsarrayTimeMsConsulta);
}, [datosOrdenesServicios]);


/////////////////////////// 2. GENERACION DE HORAS DINAMICAS ///////////////////////////

const [horasDinamicasMilisegundos, sethorasDinamicasMilisegundos] = useState([]);

useEffect(() => {
  // setea en milisegundos las jornda de trabajo
  let joSet = new Date(contextDiaDinamicoSeleccionado);
  let inJoDate = new Date(joSet);
  inJoDate.setHours(
    reglas[0].inJo[0],
    reglas[0].inJo[1],
    reglas[0].inJo[2],
    reglas[0].inJo[3]
  );
  let fiJoDate = new Date(joSet);
  fiJoDate.setHours(
    reglas[0].fiJo[0],
    reglas[0].fiJo[1],
    reglas[0].fiJo[2],
    reglas[0].fiJo[3]
  );
  let inDeDate = new Date(joSet);
  inDeDate.setHours(
    reglas[0].inDe[0],
    reglas[0].inDe[1],
    reglas[0].inDe[2],
    reglas[0].inDe[3]
  );
  let fiDeDate = new Date(joSet);
  fiDeDate.setHours(
    reglas[0].fiDe[0],
    reglas[0].fiDe[1],
    reglas[0].fiDe[2],
    reglas[0].fiDe[3]
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
  let tiempoCitas = reglas[0].duracionCita * 60000;
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
  //convertirMilisegundosAhoras(listaHorasMilisegundos); solo para pruebas
};

///////////////////////////  3. UNION DE HORARIOS BD Y DINAMICOS  ///////////////////////////

 const [horariosDisponibles, sethorariosDisponibles] = useState([]);

  
  useEffect(() => {
    if (arrayTimeMsConsulta.length > 0 && horasDinamicasMilisegundos.length > 0) { 
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
      convertirMilisegundosAhoras(activacionCompararArrays)
      //console.log(activacionCompararArrays, "activacionCompararArrays");
    }
  }, [datosOrdenesServicios, horasDinamicasMilisegundos]);
  

  const convertirMilisegundosAhoras = (listaHorasMilisegundos) => {
    const listaHoras = [];
    for (let i = 0; i < listaHorasMilisegundos.length; i++) {
      let hora = new Date(listaHorasMilisegundos[i]);
      listaHoras.push(hora);
    }
    sethorariosDisponibles(listaHoras);
  }; 


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
            {contextDiaDinamicoSeleccionado.toLocaleString("es-ES", {
              weekday: "long",
            })}
          </div>
          <div style={{ margin: "0px 5px" }}>
            {contextDiaDinamicoSeleccionado.toLocaleString("es-ES", {
              day: "numeric",
            })}
          </div>
          <div style={{ margin: "0px 5px" }}>
            <span> de </span>
          </div>
          <div style={{ margin: "0px 5px" }}>
            {contextDiaDinamicoSeleccionado.toLocaleString("es-ES", {
              month: "long",
            })}
          </div>
        </div>

        
        
      ) : (
        <div>no hay datos</div>
      )}

{ horariosDisponibles ? (
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
) : ( <div>cargando...</div> ) }

    </div>
  );
}

export default HorasDisponiblesDinamicas;

