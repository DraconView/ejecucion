import { useContext, useEffect, useState } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import Calendar from "react-calendar";
import "./../../../../../cssGeneral/CssGeneral.css";
import CartContext from "./../../../../../context/CartContext";

import { BsCloudArrowUp } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

function CrearDiasCalendario() {
  //console.log('llamando a CrearDiasCalendario')
  const { contextCiudadSeleccionada, providerHorariosCalendario } = useContext(CartContext);

  const [loader, setLoader] = useState(false);
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const [ciudad, setciudad] = useState("");
  const [inJoHora, setinJoHora] = useState("");
  const [inJoMinutos, setinJoMinutos] = useState("");
  const [fiJoHora, setfiJoHora] = useState("");
  const [fiJoMinutos, setfiJoMinutos] = useState("");
  const [inDeHora, setinDeHora] = useState("");
  const [inDeMinutos, setinDeMinutos] = useState("");
  const [fiDeHora, setfiDeHora] = useState("");
  const [fiDeMinutos, setfiDeMinutos] = useState("");

  function addDays(date) {
    //console.log("date", date);
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
  }

  function convertirStringToTimestamp(string) {
    const fecha = new Date(string);
    const fechaMasUno = addDays(fecha);
    //const timestamp = firebase.firestore.Timestamp.fromDate(fecha);
    //console.log("fechaMasUno", fechaMasUno);
    return fechaMasUno;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("DiasDisponiblesCalendario")
      .add({
        ciudad: contextCiudadSeleccionada,
        diaCalendario: convertirStringToTimestamp(diaCalendario),
        inJo: [Number(inJoHora), Number(inJoMinutos), 0, 0],
        fiJo: [Number(fiJoHora), Number(fiJoMinutos), 0, 0],
        inDe: [Number(inDeHora), Number(inDeMinutos), 0, 0],
        fiDe: [Number(fiDeHora), Number(fiDeMinutos), 0, 0],
        horariosBloqueados: horariosBloqueados,
      })
      .then(() => {
        setLoader(false);
        funcioRegistroExitoso();
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
    setseleccionDias([]);
  };

  function funcioRegistroExitoso() {
    setvistaDatoRecibido("flex");
    setTimeout(() => {
      setvistaDatoRecibido("none");
    }, 3000);
  }

  const [seleccionDias, setseleccionDias] = useState([]);

  const onChange = (date) => {
    if (isNaN(date.getTime())) {
      let timestamp = date.getTime();
      return timestamp;
    }
    setseleccionDias([date]);
  };

  const [inHoraBloqueada, setinHoraBloqueada] = useState("");
  const [inMinutosBloqueada, setinMinutosBloqueada] = useState("");
  const [fiHoraBloqueada, setfiHoraBloqueada] = useState("");
  const [fiMinutosBloqueada, setfiMinutosBloqueada] = useState("");
  const [diaCalendario, setdiaCalendario] = useState("");
  const [horariosBloqueados, setHorariosBloqueados] = useState([]);

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
      <form onSubmit={handleSubmit} className="formularioRegistroClientes">
        {contextCiudadSeleccionada ? (
          <div className="alineacionVertical">
            <span
              className="textoSeleccionCiudadCita"
              style={{ margin: "0px 0px 20px 0px" }}
            >
              {contextCiudadSeleccionada}
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <span
              className="textoSeleccioneCategoria"
              style={{ margin: "0px 0px 15px 0px" }}
            >
              * selecciona la ciudad
            </span>
          </div>
        )}

        <div className="alineacionVertical">
          <div className="alineacionHorizontalLeft">
            <span className="textoJornadas">Inicio Jornada</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setinJoHora(e.target.value)}
              value={inJoHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinJoMinutos(e.target.value)}
              value={inJoMinutos}
            />
          </div>
          

          <div className="alineacionHorizontalLeft">
            <span className="textoJornadas">Inicio Descanso</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setinDeHora(e.target.value)}
              value={inDeHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinDeMinutos(e.target.value)}
              value={inDeMinutos}
            />
          </div>
          

          <div className="alineacionHorizontalLeft">
            <span className="textoJornadas">Fin Descanso</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiDeHora(e.target.value)}
              value={fiDeHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiDeMinutos(e.target.value)}
              value={fiDeMinutos}
            />
          </div>
          

          <div className="alineacionHorizontalLeft">
            <span className="textoJornadas">Fin Jornada</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiJoHora(e.target.value)}
              value={fiJoHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiJoMinutos(e.target.value)}
              value={fiJoMinutos}
            />
          </div>
          
        </div>

        <div
              className="divIzquierdaRow100"
              style={{ margin: "0px auto 5px 15px" }}
            >
              <span
                className="textareaEdicion3"
              >
                Día:
              </span>
              <input
                type="date"
                id="dateInput"
                className="textareaEdicion3"
                value={diaCalendario}
                onChange={(e) => setdiaCalendario(e.target.value)}
              />
            </div>

        {/* Agregar horario bloqueado */}
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
              value={inHoraBloqueada}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinMinutosBloqueada(e.target.value)}
              value={inMinutosBloqueada}
            />
            <span style={{ margin: "0px 0px 15px 0px" }}>-</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiHoraBloqueada(e.target.value)}
              value={fiHoraBloqueada}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiMinutosBloqueada(e.target.value)}
              value={fiMinutosBloqueada}
            />
            <AiOutlinePlus
              className="iconosExpandirContraerDescripcionItem"
              style={{ margin: "0px 0px 10px 0px" }}
              onClick={agregarHorarioBloqueado} />
          </div>
        </div>
        {/* Renderizar los horarios bloqueados */}
        <div className="alineacionVertical">
          <span
            className="textoGris17700Upper"
            style={{ margin: "0px 0px 10px 0px" }}
          >
            Horas bloqueadas:</span>
          {horariosBloqueados.length === 0 ? (
            <div>No se han agregado horarios</div>
          ) : (
            <div>
              {horariosBloqueados.map((horarioBloqueado, index) => (
                <div
                  key={index}
                  className="Label"
                >
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="contenedorBotonesPublicar">
          <div className="divBotonPublicarVerde" onClick={handleSubmit}>
            <span> Publicar </span>
            <BsCloudArrowUp
              style={{ fontSize: "20px", margin: "0px 0px 0px 5px" }}
            />
          </div>
        </div>
      </form>

      <div
        className="divFlotanteRegistroExitoso"
        style={{
          display: `${vistaDatoRecibido}`,
          position: "absolute",
          top: "115px",
          //right: "80px",
          alignitems: "center",
        }}
      >
        <span className="textoRegistroExitosoAlert">!registro exitoso!</span>
      </div>
    </div>
  );
}

export default CrearDiasCalendario;

/* 
este componente es para crear los dias disponibles en el calendario basandose en la ciudad,
la hora de inicio y fin de la jornada y el tiempo de descanso que se tendra en el dia, 
tambien compara los horios con la base de datos para que no se repitan los horarios

para comparar los horarios disponibles con una nueva funcion horasBloqueadas() ,
sebe recibir un objeto con la siguiente estructura
*/

/*
este componente se conecta con otro componente que es para crear los dias disponibles en el 
calendario basandose en la ciudad, la hora de inicio y fin de la jornada y el tiempo de descanso
 que se tendra en el dia, tambien compara los horarios con la base de datos para que no se
  repitan los horarios. ahora el cliente necesita funcion para asignar multiples horarios bloqueados 
  ejemplo para laborar media jornada o extender la duracion de las citas como debe ser la estructura del 
  objeto que va contener los horarios bloqueados
  */
