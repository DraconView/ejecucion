import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { db, auth, storage } from "./../../../../firebase";

function HorasDisponiblesCalendario() {
  //console.log('llamando a HorasDisponiblesCalendario');
  const {
    contextDiaDinamicoSeleccionado,
    contextCiudadSeleccionada,
    providerDiaMasHoraDinamicosSeleccionados,
    contextDuracionCita,
    contextUsuarioLogueado,
  } = useContext(CartContext);

  const [ciudadMasDia, setciudadMasDia] = useState("");

  const [celularMovil, setCelularMovil] = useState("");
  const [ciudad, setCiudad] = useState("");

  useEffect(() => {
    // separar datos de displayName ejemplo: "displayName": "MINAS+3163782780",
    if (contextUsuarioLogueado) {
      const displayName = contextUsuarioLogueado.displayName;
      setCelularMovil(displayName.split("+")[1]);
      setCiudad(displayName.split("+")[0]);
     //console.log(celularMovil, "celularMovil");
     //console.log(ciudad, "ciudad");
    }
  }, [contextUsuarioLogueado]);

  useEffect(() => {
    // une la ciudad seleccionada con el dia seleccionado
    if (ciudad && contextDiaDinamicoSeleccionado) {
      function unirCiudadMasDia() {
        let unionCiudadMasDia =
        ciudad + "/" + funcionFechaLegible();
        //console.log(unionCiudadMasDia, "unionCiudadMasDia");
        return setciudadMasDia(unionCiudadMasDia);
      }
      unirCiudadMasDia();
      //console.log(ciudadMasDia, "ciudadMasDia");
    }
  }, [ciudad, contextDiaDinamicoSeleccionado]);

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

  ///////////////////// 1. CONSULTA LA BASE DE DATOS ///////////////////////

  const [datosOrdenesServicios, setdatosOrdenesServicios] = useState([]);
  const [revisionBaseDatos, setrevisionBaseDatos] = useState("");
  const [arrayTimeMsConsulta, setarrayTimeMsConsulta] = useState([]);

  useEffect(() => {
    // CONSULTA LA BASE DE DATOS
    if (ciudadMasDia && datosOrdenesServicios.length === 0) {
        //console.log(ciudadMasDia, "ciudadMasDiaDesdeConsulta");
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("HorariosOcupados");
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
              setrevisionBaseDatos("no hay horarios ocupados");
                //console.log("no hay horarios ocupados");
            }
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
  }, [ciudadMasDia, datosOrdenesServicios]);

  ///////////////////// 2. LOGICA DINAMICA ///////////////////////

  const [horasDinamicasMilisegundos, sethorasDinamicasMilisegundos] = useState(
    []
  );

  useEffect(() => {
    // esta funcion crea objetos Date seteados con los horarios de la base de datos
    let joSet = new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate());
    // contextDiaDinamicoSeleccionado[0] es el primer objeto del array contextDiaDinamicoSeleccionado
    let inJoDate = new Date(joSet);
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
      // saber se puede instanciar un objeto Date
      joSet instanceof Date &&
      inJoDate instanceof Date &&
      fiJoDate instanceof Date &&
      inDeDate instanceof Date &&
      fiDeDate instanceof Date
    ) {
      // getTime() devuelve milisegundos los horarios de la base de datos
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
    // fCalcularHorarios convierte los horarios de la base de datos en tiempos dinamico
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

 ///////////////////////////  3. HORARIOS BLOQUEADOS  ///////////////////////////

 const [revisionHorariosBloqueados, setrevisionHorariosBloqueados] = useState("");

  useEffect(() => {
    if (contextDiaDinamicoSeleccionado.horariosBloqueados.length > 0) {
      let joSet = new Date(contextDiaDinamicoSeleccionado.diaCalendario.toDate());
      const arrayHorariosBloqueados = contextDiaDinamicoSeleccionado.horariosBloqueados.flatMap((horario) => {
        let inBloqDate = new Date(joSet);
        inBloqDate.setHours(
          horario.inicioBloqueo[0],
          horario.inicioBloqueo[1],
          horario.inicioBloqueo[2],
          horario.inicioBloqueo[3]
        );
        let fiBloqDate = new Date(joSet);
        fiBloqDate.setHours(
          horario.finBloqueo[0],
          horario.finBloqueo[1],  
          horario.finBloqueo[2],
          horario.finBloqueo[3]
        );
        let inBloqMs, fiBloqMs;
        if (
          joSet instanceof Date &&
          inBloqDate instanceof Date &&
          fiBloqDate instanceof Date
        ) {
          inBloqMs = inBloqDate.getTime(); 
          fiBloqMs = fiBloqDate.getTime();
          return fCalcularHorariosBloqueados(inBloqMs, fiBloqMs);
        } else {
          //console.error("El valor de contextDiaDinamicoSeleccionado no es una instancia de Date");
          return [];
        }
      });
    } else {
      setrevisionHorariosBloqueados("no hay horarios bloqueados");
    }
  }, [contextDiaDinamicoSeleccionado.horariosBloqueados]);
  
  const [arrayHorariosBloqueadosTiempos, setArrayHorariosBloqueadosTiempos] = useState([]);
  
  const fCalcularHorariosBloqueados = (inBloqMs, fiBloqMs) => {
    const tiempoCitas = contextDuracionCita * 60000;
    const listaHorasMilisegundos = [];
  
    for (let i = inBloqMs; i < fiBloqMs; i += tiempoCitas) {
      listaHorasMilisegundos.push(i);
    }
    setArrayHorariosBloqueadosTiempos((prevArray) => [...prevArray, ...listaHorasMilisegundos]);
    return listaHorasMilisegundos;
  };
  
  useEffect(() => {
    if (arrayHorariosBloqueadosTiempos.length > 0) {
      const horariosBloqueadosFecha = arrayHorariosBloqueadosTiempos.map((hora) => new Date(hora));
     //console.log(horariosBloqueadosFecha, "horariosBloqueadosFecha");
    }
  }, [arrayHorariosBloqueadosTiempos]);

    ///////////////////////////  4. UNION DE HORARIOS BD Y DINAMICOS  ///////////////////////////

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
      if (arrayHorariosBloqueadosTiempos.length > 0) {
        const horariosDisponiblesFiltrados = activacionCompararArrays.filter((horario) => !arrayHorariosBloqueadosTiempos.includes(horario));
        convertirMilisegundosAhoras(horariosDisponiblesFiltrados);
      } else {
        convertirMilisegundosAhoras(activacionCompararArrays);
      }
      } else if (revisionBaseDatos === "no hay horarios ocupados") {
        if (arrayHorariosBloqueadosTiempos.length > 0) {
          const horariosDisponiblesFiltrados = horasDinamicasMilisegundos.filter((horario) => !arrayHorariosBloqueadosTiempos.includes(horario));
          convertirMilisegundosAhoras(horariosDisponiblesFiltrados);
        } else {
          convertirMilisegundosAhoras(horasDinamicasMilisegundos);
        }
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
        <Link to="/dias-disponibles-calendario">
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
              to="/table-cart"
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
