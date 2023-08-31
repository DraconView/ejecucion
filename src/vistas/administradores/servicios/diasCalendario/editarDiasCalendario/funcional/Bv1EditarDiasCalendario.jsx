
import { useContext, useEffect, useState } from "react";
import { db, auth, storage } from "./../../../../../firebase";
import CartContext from "./../../../../../context/CartContext";
import "./../../../../../cssGeneral/CssGeneral.css";

import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

const objetoEjemploHorarios = [
  {
    "fiJo": [
      17,
      30,
      0,
      0
    ],
    "ciudad": "MINAS",
    "diaCalendario": {
      "seconds": 1690761600,
      "nanoseconds": 0
    },
    "horariosBloqueados": [],
    "inJo": [
      8,
      0,
      0,
      0
    ],
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "id": "00A06WWJ2tUxjMTlJA5k"
  },
  {
    "diaCalendario": {
      "seconds": 1690588800,
      "nanoseconds": 0
    },
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "fiJo": [
      21,
      0,
      0,
      0
    ],
    "inJo": [
      9,
      0,
      0,
      0
    ],
    "ciudad": "MINAS",
    "horariosBloqueados": [
      {
        "finBloqueo": [
          12,
          0,
          0,
          0
        ],
        "inicioBloqueo": [
          8,
          0,
          0,
          0
        ]
      }
    ],
    "id": "MAUHAkGjxaearYa7bNjc"
  },
  {
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "fiJo": [
      18,
      0,
      0,
      0
    ],
    "horariosBloqueados": [],
    "diaCalendario": {
      "seconds": 1689483600,
      "nanoseconds": 0
    },
    "inJo": [
      8,
      0,
      0,
      0
    ],
    "ciudad": "MINAS",
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "id": "UggA0mSvHo4XE4udQxpN"
  },
  {
    "fiJo": [
      17,
      30,
      0,
      0
    ],
    "ciudad": "MINAS",
    "horariosBloqueados": [],
    "inJo": [
      8,
      0,
      0,
      0
    ],
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "diaCalendario": {
      "seconds": 1685336400,
      "nanoseconds": 0
    },
    "id": "W48E0yyeYDZ0KpmnDxK4"
  },
  {
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "diaCalendario": {
      "seconds": 1685682000,
      "nanoseconds": 0
    },
    "inDe": [
      12,
      14,
      0,
      0
    ],
    "horariosBloqueados": [],
    "ciudad": "MINAS",
    "fiJo": [
      17,
      30,
      0,
      0
    ],
    "inJo": [
      8,
      0,
      0,
      0
    ],
    "id": "WKuzcjzxprgoTCp48mgB"
  },
  {
    "fiJo": [
      17,
      30,
      0,
      0
    ],
    "horariosBloqueados": [],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "inJo": [
      8,
      0,
      0,
      0
    ],
    "diaCalendario": {
      "seconds": 1684818000,
      "nanoseconds": 0
    },
    "ciudad": "MINAS",
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "id": "pL9vTOdFXBoN753InJE3"
  }
]

function EditarDiasCalendario(parametro) {
  const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

  const [contadorLlamadas, setContadorLlamadas] = useState(0)

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [datos, setdatos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [ciudad, setciudad] = useState("");
  const [diaCalendario, setdiaCalendario] = useState("");

  const [inHoraBloqueada, setinHoraBloqueada] = useState("");
  const [inMinutosBloqueada, setinMinutosBloqueada] = useState("");
  const [fiHoraBloqueada, setfiHoraBloqueada] = useState("");
  const [fiMinutosBloqueada, setfiMinutosBloqueada] = useState("");
  const [horariosBloqueados, setHorariosBloqueados] = useState([]);

  const convertirFechaHoraSeleccionadaMilisegundos = () => {
    const fecha = new Date();
    const fechaMilisegundos = fecha.getTime().toString();
    //console.log("fechaMilisegundos", fechaMilisegundos);
    return fechaMilisegundos;
  };

  const actualizarMarcaDeTiempo = () => {
    db.collection("MarcasDeTiempos")
      .doc("bTmLy0pYu08yt87vO4bI")
      .update({
        ciudadesMcFire: convertirFechaHoraSeleccionadaMilisegundos(),
      })
      .then(() => {
        //console.log("Documento actualizado obtenerRegistrosFirestore");
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
  };

  const obtenerRegistrosFirestore = async () => {
    let docRef;
    docRef = db
      .collection("DiasDisponiblesCalendario")
      .where("ciudad", "==", `${parametro.ciudad}`)
    const querySnapshot = await docRef.get();
    if (querySnapshot.size === 0) {
      //console.log('No existen resultados');
    }
    const datosObtenidos = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setdatos(datosObtenidos);
    //console.log(datosObtenidos);
  };

  useEffect(() => {
    if (contadorLlamadas === 0) {
      obtenerRegistrosFirestore();
      setContadorLlamadas(contadorLlamadas + 1)
      //console.log("se llamo obtenerRegistrosFirestore desde useEffect")
    }
  }, []);

  function convertirFecha(dato) {
    if (!dato || !dato.diaCalendario || !dato.diaCalendario.seconds) {
      // Si dato o dato.diaCalendario o dato.diaCalendario.seconds son undefined, retorna un valor por defecto o maneja el error según tu lógica.
      return 'Fecha no válida';
    }
    const seconds = dato.diaCalendario.seconds;
    const fecha = new Date(seconds * 1000); // Multiplicamos por 1000 para obtener milisegundos
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes es base 0, sumamos 1 y agregamos ceros a la izquierda si es necesario
    const day = String(fecha.getDate()).padStart(2, '0'); // Agregamos ceros a la izquierda si es necesario
    return `${year}-${month}-${day}`;
  }

  // convetir timestamp a string
  function convertirTimestampToString(timestamp) { 
    const seconds = timestamp.seconds;
    const fecha = new Date(seconds * 1000); // Multiplicamos por 1000 para obtener milisegundos
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(date) {
    //console.log("date", date);
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
  }

  // convetir string a timestamp 
  function convertirStringToTimestamp(string) {
    const fecha = new Date(string);
    const fechaMasUno = addDays(fecha); 
    //const timestamp = firebase.firestore.Timestamp.fromDate(fecha);
    //console.log("fechaMasUno", fechaMasUno);
    return fechaMasUno;
  }

 //aqui
  const editarRegistros = (esteDato) => {
    setId(esteDato.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");

    setciudad(esteDato.ciudad);
    const fechaConvertida = convertirTimestampToString(esteDato.diaCalendario);
    setdiaCalendario(fechaConvertida);
    setHorariosBloqueados(esteDato.horariosBloqueados);
    setinHoraBloqueada(esteDato.inHoraBloqueada);
    setinMinutosBloqueada(esteDato.inMinutosBloqueada);
    setfiHoraBloqueada(esteDato.fiHoraBloqueada);
    setfiMinutosBloqueada(esteDato.fiMinutosBloqueada);
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("DiasDisponiblesCalendario")
      .doc(id)
      .update({
        ciudad: ciudad,
        diaCalendario: convertirStringToTimestamp(diaCalendario),
        //horariosBloqueados: horariosBloqueados,
        //inHoraBloqueada: inHoraBloqueada,
        //inMinutosBloqueada: inMinutosBloqueada,
        //fiHoraBloqueada: fiHoraBloqueada,
        //fiMinutosBloqueada: fiMinutosBloqueada,
      })
      .then(() => {
        obtenerRegistrosFirestore();
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setciudad("");
    setdiaCalendario("");
    actualizarMarcaDeTiempo();
  };

  const eliminarRegistrosFirestore = (id) => {
    db.collection("DiasDisponiblesCalendario")
      .doc(id)
      .delete()
      .then(() => {
        //console.log("Documento eliminado exitosamente");
      })
      .catch((error) => {
        //console.error("Error al eliminar el documento:", error);
      });
    actualizarMarcaDeTiempo();
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setciudad("");
    setdiaCalendario("");
  };

  const agregarHorarioBloqueado = () => {
    const nuevoHorarioBloqueado = {
      inicioBloqueo: [
        Number(inHoraBloqueada),
        Number(inMinutosBloqueada),
        0,
        0,
      ],
      finBloqueo: [Number(fiHoraBloqueada), Number(fiMinutosBloqueada), 0, 0],
    };
    setHorariosBloqueados([...horariosBloqueados, nuevoHorarioBloqueado]);
    setinHoraBloqueada("");
    setinMinutosBloqueada("");
    setfiHoraBloqueada("");
    setfiMinutosBloqueada("");
  };

  return (
    <div className="alineacionVertical">

      <div
        className="estiloListaEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {datos.map((mapeado, index) => (
          <div
            key={index}
            //key={mapeado.id}
            className="divPrincipalHorarios"
            style={{ margin: "15px 15px 15px 15px" }}
          >
            <div >
              <div className="divCiuadadHorario">
                <div
                  className="textareaEdicion"
                  style={{ margin: "5px auto 5px auto" }}
                >
                  {mapeado.ciudad}
                </div>

              </div>
              <div className="spanCantDetalleValor">
                <span className="textoMostrarMas">
                  {new Date(
                    mapeado.diaCalendario.seconds * 1000
                  ).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div
                className="alineacionVertical"
                style={{ padding: "10px 0px 10px 0px" }}
              >
                <div className="alineacionVertical">
                  <span className="textoGris15700">JORNADA</span>
                  <span className="n">
                    {mapeado.inJo[0] < 10 ? "0" + mapeado.inJo[0] : mapeado.inJo[0]}:
                    {mapeado.inJo[1] < 10 ? "0" + mapeado.inJo[1] : mapeado.inJo[1]} -{" "}
                    {mapeado.fiJo[0] < 10 ? "0" + mapeado.fiJo[0] : mapeado.fiJo[0]}:
                    {mapeado.fiJo[1] < 10 ? "0" + mapeado.fiJo[1] : mapeado.fiJo[1]}
                  </span>
                </div>
                <span className="n">
                  {mapeado.inDe[0] < 10 ? "0" + mapeado.inDe[0] : mapeado.inDe[0]}:
                  {mapeado.inDe[1] < 10 ? "0" + mapeado.inDe[1] : mapeado.inDe[1]} -{" "}
                  {mapeado.fiDe[0] < 10 ? "0" + mapeado.fiDe[0] : mapeado.fiDe[0]}:
                  {mapeado.fiDe[1] < 10 ? "0" + mapeado.fiDe[1] : mapeado.fiDe[1]}
                </span>
              </div>

              <div
                className="alineacionVertical"
                style={{ padding: "0px 0px 20px 0px" }}
              >
                <span className="textoGris15700">HORAS BLOQUEADAS</span>
                {mapeado.horariosBloqueados.length > 0 ? (
                  mapeado.horariosBloqueados.map((horarioBloqueado) => (
                    <div key={horarioBloqueado.id} className="divHorarioBloqueado">
                      <span className="textoHorarioBloqueado">
                        {horarioBloqueado.inicioBloqueo[0] < 10
                          ? "0" + horarioBloqueado.inicioBloqueo[0]
                          : horarioBloqueado.inicioBloqueo[0]}
                        :
                        {horarioBloqueado.inicioBloqueo[1] < 10
                          ? "0" + horarioBloqueado.inicioBloqueo[1]
                          : horarioBloqueado.inicioBloqueo[1]}{" "}
                        -{" "}
                        {horarioBloqueado.finBloqueo[0] < 10
                          ? "0" + horarioBloqueado.finBloqueo[0]
                          : horarioBloqueado.finBloqueo[0]}
                        :
                        {horarioBloqueado.finBloqueo[1] < 10
                          ? "0" + horarioBloqueado.finBloqueo[1]
                          : horarioBloqueado.finBloqueo[1]}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="textoNoHayPublicaciones">
                    No hay horas bloqueadas
                  </span>
                )}
              </div>
            </div>
            <div
              className="divBotonContinuar"
              onClick={() => editarRegistros(mapeado)}
            >
              <span className="textoBotonRegistrarCliente">Editar</span>
            </div>
            <div
              className="divBotonContinuar"
              onClick={() => eliminarRegistrosFirestore(mapeado.id)}
            >
              <span className="textoBotonRegistrarCliente">Eliminar</span>
            </div>
          </div>
        ))}
      </div>

      {/* - - - - - - - - - VISTA EDITOR - - - - - - - - - */}

      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaEditor}` }}
      >
        <form>
          <div className="alineacionVertical">
            <div
              className="alineacionHorizontal"
              style={{ margin: "5px 0px 0px 5px" }}
            >
              <span>Ciudad:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese la ciudad..."
                value={ciudad}
                onChange={(e) => setciudad(e.target.value)}
              />
            </div>
            <div
              className="divIzquierdaRow100"
              style={{ margin: "0px auto 0px 0px" }}
            >
              <span
                className="textareaEdicion3"
              >
                Día:
              </span>
              <input
                type="date"
                id="dateInput"
                value={diaCalendario}
                onChange={(e) => setdiaCalendario(e.target.value)}
              />
              </div>
            <div
              className="alineacionVertical"
              style={{ margin: "20px 0px 20px 0px" }}
            >
              <span className="textoGris15700">HORAS BLOQUEADAS</span>
              {horariosBloqueados.length > 0 ? (
                horariosBloqueados.map((horarioBloqueado) => (
                  <div key={horarioBloqueado.id} className="divHorarioBloqueado">
                    <div className="alineacionVertical">
                      <span
                        className="textoVerRecibo"
                        style={{ margin: "20px 0px 10px 0px" }}
                      >
                        bloqueo de horarios
                      </span>
                      <div className="alineacionHorizontalWrap">
                        <input
                          type="number"
                          placeholder="H"
                          className="casillaFormularioTiempo"
                          onChange={(e) => setinHoraBloqueada(e.target.value)}
                          value={horarioBloqueado.inicioBloqueo[0] < 10
                            ? "0" + horarioBloqueado.inicioBloqueo[0]
                            : horarioBloqueado.inicioBloqueo[0]}
                        />
                        <span className="dosPuntos">:</span>
                        <input
                          type="number"
                          placeholder="M"
                          className="casillaFormularioTiempo"
                          onChange={(e) => setinMinutosBloqueada(e.target.value)}
                          value={horarioBloqueado.inicioBloqueo[1] < 10
                            ? "0" + horarioBloqueado.inicioBloqueo[1]
                            : horarioBloqueado.inicioBloqueo[1]}
                        />
                        <span style={{ margin: "0px 0px 15px 0px" }}>-</span>
                        <input
                          type="number"
                          placeholder="H"
                          className="casillaFormularioTiempo"
                          onChange={(e) => setfiHoraBloqueada(e.target.value)}
                          value={horarioBloqueado.finBloqueo[0] < 10
                            ? "0" + horarioBloqueado.finBloqueo[0]
                            : horarioBloqueado.finBloqueo[0]}
                        />
                        <span className="dosPuntos">:</span>
                        <input
                          type="number"
                          placeholder="M"
                          className="casillaFormularioTiempo"
                          onChange={(e) => setfiMinutosBloqueada(e.target.value)}
                          value={horarioBloqueado.finBloqueo[1] < 10
                            ? "0" + horarioBloqueado.finBloqueo[1]
                            : horarioBloqueado.finBloqueo[1]}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="textoNoHayPublicaciones">
                  No hay horas bloqueadas
                </span>
              )}
            </div>

            <div onClick={volverEdicion} className="divBotonContinuar">
              <span className="textoBotonRegistrarCliente">CANCELAR</span>
            </div>
            <button
              className="divTextoBotonGuardar"
              type="submit"
              onClick={actualizarRegistrosFirestore}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {contextCiudades.length === 0 && <ContextCiudadesAsincrono />}
    </div>
  );
}

export default EditarDiasCalendario;
