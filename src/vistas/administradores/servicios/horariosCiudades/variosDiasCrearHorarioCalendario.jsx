import { useState } from "react";
import { db, auth, storage } from "../../../../firebase/index";
import Calendar from "react-calendar";
import "./../../../../cssGeneral/CssGeneral.css";
import "./CssOriginalCalendario.css";

import { BsCloudArrowUp } from "react-icons/bs";

function CrearHorarioCalendario() {
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
    db.collection("ReglasHorariosCitas")
      .add({
        ciudad: ciudad,
        arrayDiasTimestamp: seleccionDias,
        inJo: [Number(inJoHora), Number(inJoMinutos), 0, 0],
        fiJo: [Number(fiJoHora), Number(fiJoMinutos), 0, 0],
        inDe: [Number(inDeHora), Number(inDeMinutos), 0, 0],
        fiDe: [Number(fiDeHora), Number(fiDeMinutos), 0, 0],
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
      // La fecha es inválida, no hagas nada
      return;
    }
    const index = seleccionDias.findIndex(
      (dia) => dia.getTime() === date.getTime()
    );
    if (index < 0) {
      setseleccionDias([...seleccionDias, date]);
    } else {
      const nuevaSeleccionDias = [...seleccionDias];
      nuevaSeleccionDias.splice(index, 1);
      setseleccionDias(nuevaSeleccionDias);
    }
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
        <div className="">
          {seleccionDias.map((dia, index) => (
            <div key={index}>
              {new Date(dia).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          ))}
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

export default CrearHorarioCalendario;
