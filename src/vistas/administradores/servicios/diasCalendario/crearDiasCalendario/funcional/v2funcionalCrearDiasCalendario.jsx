import { useState } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import Calendar from "react-calendar";
import "./../../../../../cssGeneral/CssGeneral.css";

import { BsCloudArrowUp } from "react-icons/bs";

function CrearDiasCalendario() {
  const [loader, setLoader] = useState(false);
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const [ciudad, setciudad] = useState("");
  const [inJoHora, setinJoHora] = useState();
  const [inJoMinutos, setinJoMinutos] = useState("");
  const [fiJoHora, setfiJoHora] = useState("");
  const [fiJoMinutos, setfiJoMinutos] = useState("");
  const [inDeHora, setinDeHora] = useState("");
  const [inDeMinutos, setinDeMinutos] = useState("");
  const [fiDeHora, setfiDeHora] = useState("");
  const [fiDeMinutos, setfiDeMinutos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("DiasDisponiblesCalendario")
      .add({
        ciudad: ciudad,
        diaCalendario: seleccionDias[0],
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
  const [horariosBloqueados, setHorariosBloqueados] = useState([]);

  const agregarHorarioBloqueado = () => {
    const nuevoHorarioBloqueado = {
      inHorBloq: Number(inHoraBloqueada),
      inMinBloq: Number(inMinutosBloqueada),
      fiHorBloq: Number(fiHoraBloqueada),
      fiMinBloq: Number(fiMinutosBloqueada),
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
        <h1 className="h1">CALENDARIO</h1>
        <div className="alineacionHorizontalJustificada">
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese la ciudad"
            className="casillaFormulario"
            onChange={(e) =>
              setciudad(e.target.value.replace(" ", "").toUpperCase())
            }
            value={ciudad}
          />
        </div>
        <div className="divDividerFormulario" />

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
        <div className="divDividerFormulario" />

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
        <div className="divDividerFormulario" />

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
        <div className="divDividerFormulario" />

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
        <div className="divDividerFormulario" />

        <div className="diaSeleccionadoCalendario">
          {seleccionDias.length === 0 ? (
            <div>Selecciona un día</div>
          ) : (
            seleccionDias.map((dia, index) => (
              <div key={index}>
                {new Date(dia).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            ))
          )}
        </div>

        <Calendar
          onChange={onChange}
          value={seleccionDias[seleccionDias.length - 1]}
          calendarType="US"
          tileClassName={({ date, view }) =>
            view === "month" &&
            seleccionDias.some((d) => d.getTime() === date.getTime())
              ? "selected"
              : null
          }
        />
        <div className="contenedorBotonesPublicar">
          <div className="divBotonPublicarVerde" onClick={handleSubmit}>
            <span> Publicar </span>
            <BsCloudArrowUp
              style={{ fontSize: "20px", margin: "0px 0px 0px 5px" }}
            />
          </div>
        </div>

        {/* Renderizar los horarios bloqueados */}
        <div>
          <h3>Horarios bloqueados:</h3>
          {horariosBloqueados.length === 0 ? (
            <div>No se han agregado horarios bloqueados</div>
          ) : (
            <ul>
              {horariosBloqueados.map((horario, index) => (
                <li key={index}>
                  {horario.inHorBloq}:{horario.inMinBloq} - {horario.fiHorBloq}:
                  {horario.fiMinBloq}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Agregar horario bloqueado */}
        <div className="alineacionHorizontalLeft">
          <span className="textoJornadas">Agregar horario bloqueado:</span>
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
          <span>-</span>
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
          <button type="button" onClick={agregarHorarioBloqueado}>
            Agregar
          </button>
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
