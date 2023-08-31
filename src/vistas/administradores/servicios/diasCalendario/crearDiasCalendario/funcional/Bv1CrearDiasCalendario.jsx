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
  const [inJoHora, setinJoHora] = useState("0");
  const [inJoMinutos, setinJoMinutos] = useState("0");
  const [fiJoHora, setfiJoHora] = useState("0");
  const [fiJoMinutos, setfiJoMinutos] = useState("0");
  const [inDeHora, setinDeHora] = useState("0");
  const [inDeMinutos, setinDeMinutos] = useState("0");
  const [fiDeHora, setfiDeHora] = useState("0");
  const [fiDeMinutos, setfiDeMinutos] = useState("0");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("DiasDisponiblesCalendario")
      .add({
        ciudad: contextCiudadSeleccionada,
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
              value={inJoHora < 10 ? "0" + inJoHora : inJoHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinJoMinutos(e.target.value)}
              value={inJoMinutos < 10 ? "0" + inJoMinutos : inJoMinutos}
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
              value={inDeHora < 10 ? "0" + inDeHora : inDeHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinDeMinutos(e.target.value)}
              value={inDeMinutos < 10 ? "0" + inDeMinutos : inDeMinutos}
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
              value={fiDeHora < 10 ? "0" + fiDeHora : fiDeHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiDeMinutos(e.target.value)}
              value={fiDeMinutos < 10 ? "0" + fiDeMinutos : fiDeMinutos}
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
              value={fiJoHora < 10 ? "0" + fiJoHora : fiJoHora}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiJoMinutos(e.target.value)}
              value={fiJoMinutos < 10 ? "0" + fiJoMinutos : fiJoMinutos}
            />
          </div>
          <div className="divDividerFormulario" />
        </div>

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
              value={inHoraBloqueada < 10 ? "0" + inHoraBloqueada : inHoraBloqueada}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setinMinutosBloqueada(e.target.value)}
              value={inMinutosBloqueada < 10 ? "0" + inMinutosBloqueada : inMinutosBloqueada}
            />
            <span style={{ margin: "0px 0px 15px 0px" }}>-</span>
            <input
              type="number"
              placeholder="H"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiHoraBloqueada(e.target.value)}
              value={fiHoraBloqueada < 10 ? "0" + fiHoraBloqueada : fiHoraBloqueada}
            />
            <span className="dosPuntos">:</span>
            <input
              type="number"
              placeholder="M"
              className="casillaFormularioTiempo"
              onChange={(e) => setfiMinutosBloqueada(e.target.value)}
              value={fiMinutosBloqueada < 10 ? "0" + fiMinutosBloqueada : fiMinutosBloqueada}
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
