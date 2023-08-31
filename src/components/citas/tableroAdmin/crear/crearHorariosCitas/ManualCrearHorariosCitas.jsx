import { useState, useEffect } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "../../../../../cssGeneral/CssGeneral.css";

import { FaCity } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";

const CrearHorariosCitas = () => {
  //console.log('llamando a CrearHorariosCitas');
  const [loader, setLoader] = useState(false);

  const [vistaRegistro, setvistaRegistro] = useState("flex");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");
  const [vistaListaReplegada, setvistaListaReplegada] = useState("flex");
  const [vistaListaDesplegada, setvistaListaDesplegada] = useState("none");

  const [ciudades, setciudades] = useState([]);
  const [ciudad, setciudad] = useState("");
  const [diaSeleccionado, setdiaSeleccionado] = useState([]);

  const onChangeDos = (date) => {
    setdiaSeleccionado(date);
  };

  useEffect(() => {
    db.collection("Ciudades")
      .orderBy("ciudad", "asc")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setciudades(docs);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("HorariosDisponiblesCitas")
      .add({
        ciudad: ciudad,
        timestamp: convertirDatosATimestamp(
          dia,
          mes,
          año,
          hora24,
          minuto,
        ),
        fechaLegible: funcionFechaLegible(dia, mes, año),
        horaLegible: funcionHoraLegible(hora24, minuto),
        fechaNavegacion: funcionFechaNavegacion(dia, mes, año),
        fechaHoraMilisegundos: funcionFechaHoraMilisegundos(
          dia,
          mes,
          año,
          hora24,
          minuto,
        ),
        fechaMasHoraLegible: funcionFechaMasHoraLegible(
          dia,
          mes,
          año,
          hora24,
          minuto,
        ),
        fechaMesEscrito: funcionFechaMesEscritoLegible(dia, mes, año),
        visibilidad: "ACTIVO",
        stock: 1,
      })
      .then(() => {
        setLoader(false);
      })
      .catch((error) => {
        alert(error.ciudad);
        setLoader(false);
      });
    //setciudad("");
  };

  const [dia, setdia] = useState("");
  const [mes, setmes] = useState("");
  const [año, setaño] = useState("");
  const [hora24, sethora24] = useState("");
  const [minuto, setminuto] = useState("");

  function convertirDatosATimestamp(dia, mes, año, hora24, minuto) {
    let fechaHora = `${mes}/${dia}/${año} ${hora24}:${minuto}`;
    let fecha = new Date(fechaHora);
    const timestamp = firebase.firestore.Timestamp.fromMillis(fecha.getTime());
    return timestamp;
  }

  function funcionFechaMasHoraLegible(
    dia,
    mes,
    año,
    hora24,
    minuto,
  ) {
    let fechaMasHoraLegible = `${dia}/${mes}/${año} ${hora24}:${minuto}`;
    return fechaMasHoraLegible;
  }

  function funcionFechaNavegacion(dia, mes, año) {
    let fechaNavegacion = `${dia}${mes}${año}`;
    return fechaNavegacion;
  }

  function funcionFechaHoraMilisegundos(
    dia,
    mes,
    año,
    hora24,
    minuto,
      ) {
    let fechaHora = `${mes}/${dia}/${año} ${hora24}:${minuto} `;
    let fecha = new Date(fechaHora);
    let fechaHoraMilisegundos = fecha.getTime();
    return fechaHoraMilisegundos;
  }

  function funcionFechaLegible(dia, mes, año) {
    let fechaLegible = `${dia}/${mes}/${año}`;
    return fechaLegible;
  }

  function funcionFechaMesEscritoLegible(dia, mes, año) {
    let fechaEvaluada = "";
    if (mes === "01") {
      fechaEvaluada = `${dia} de enero de ${año}`;
    } else if (mes === "02") {
      fechaEvaluada = `${dia} de febrero de ${año}`;
    } else if (mes === "03") {
      fechaEvaluada = `${dia} de marzo de ${año}`;
    } else if (mes === "04") {
      fechaEvaluada = `${dia} de abril de ${año}`;
    } else if (mes === "05") {
      fechaEvaluada = `${dia} de mayo de ${año}`;
    } else if (mes === "06") {
      fechaEvaluada = `${dia} de junio de ${año}`;
    } else if (mes === "07") {
      fechaEvaluada = `${dia} de julio de ${año}`;
    } else if (mes === "08") {
      fechaEvaluada = `${dia} de agosto de ${año}`;
    } else if (mes === "09") {
      fechaEvaluada = `${dia} de septiembre de ${año}`;
    } else if (mes === "10") {
      fechaEvaluada = `${dia} de octubre de ${año}`;
    } else if (mes === "11") {
      fechaEvaluada = `${dia} de noviembre de ${año}`;
    } else if (mes === "12") {
      fechaEvaluada = `${dia} de diciembre de ${año}`;
    }
    return fechaEvaluada;
  }

  function funcionHoraLegible(hora24, minuto) {
    let horaLegible = `${hora24}:${minuto} `;
    return horaLegible;
  }

  const accionRegistro = () => {
    setvistaRegistro("none");
    setvistaDatoRecibido("flex");
  };

  const accionDatosEnviados = () => {
    setvistaRegistro("flex");
    setvistaDatoRecibido("none");
  };

  const accionListaReplegada = () => {
    setvistaListaReplegada("none");
    setvistaListaDesplegada("flex");
  };

  const accionListaDesplegada = () => {
    setvistaListaReplegada("flex");
    setvistaListaDesplegada("none");
  };

  return (
    <div className="divPrincipalRegistroClientes">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div
        style={{ display: `${vistaRegistro}` }}
        className="divPrincipalformularioRegistroClientes"
      >
        <div className="divBarraTituloRegistroClientes">
          <span className="textoTitulosFormularios">
            registro de horarios
          </span>
        </div>

        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
          {/*seleccion en lista desplegable de ciudades*/}
          <div
            className="listaDesplegableHorarios"
            style={{ display: `${vistaListaReplegada}` }}
            onClick={accionListaReplegada}
          >
            <div className="alineacionIconoSeleccion">
              <span className="textoListaDesplegableHorarios">
                Selecciona una ciudad
              </span>
              <IoMdArrowDropdown className="iconoListaDesplegableHorarios" />
            </div>
          </div>
          <div
            className="listaDesplegableHorarios"
            style={{ display: `${vistaListaDesplegada}` }}
            onClick={accionListaDesplegada}
          >
            <div className="alineacionIconoSeleccion">
              <span className="textoListaDesplegableHorarios">
                Selecciona una ciudad
              </span>
              <IoMdArrowDropup className="iconoListaDesplegableHorarios" />
            </div>
            {ciudades.map((ciudad) => (
              <div
                key={ciudad.id}
                className="divOpcionDesplegableHorarios"
                onClick={() => {
                  setciudad(ciudad.ciudad);
                }}
              >
                <span className="textoListaDesplegableHorarios">
                  {ciudad.ciudad}
                </span>
              </div>
            ))}
          </div>

          <div className="alineacionHorizontalJustificada">
            <FaCity className="iconoFormulario" />
            <textarea
              type="text"
              cols="35"
              rows="1"
              
              className="casillaFormulario"
              placeholder="Ciudad"
              value={ciudad}
              onChange={(e) => setciudad(e.target.value)}
            />
          </div>
          <div className="divDividerFormulario" />

          <div>
            <Calendar />
          </div>

          <div className="alineacionCasillasFecha">
            <textarea
              type="text"
              className="casillasFecha"
              placeholder="Dia"
              value={dia}
              onChange={(e) => setdia(e.target.value)}
            />
            <textarea
              type="text"
              className="casillasFecha"
              placeholder="Mes"
              value={mes}
              onChange={(e) => setmes(e.target.value)}
            />
            <textarea
              type="text"
              className="casillasFecha"
              placeholder="Año"
              value={año}
              onChange={(e) => setaño(e.target.value)}
            />
          </div>
          <div className="alineacionCasillasFecha">
            <textarea
              type="text"
              className="casillasFecha"
              placeholder="Hora"
              value={hora24}
              onChange={(e) => sethora24(e.target.value)}
            />
            <textarea
              type="text"
              className="casillasFecha"
              placeholder="Minuto"
              value={minuto}
              onChange={(e) => setminuto(e.target.value)}
            />
          </div>
          <button className="boton3" onClick={accionRegistro}>
            <span className="textoBotonRegistrarCliente">registrar</span>
          </button>
        </form>
      </div>

      <div
        className="divTextoRegistroExitoso"
        style={{ display: `${vistaDatoRecibido}` }}
      >
        <span className="textoRegistroExitoso">¡registro exitoso!</span>

        <button className="boton2" onClick={accionDatosEnviados}>
          <span className="textoBotonRegistrarCliente">aceptar</span>
        </button>
      </div>
    </div>
  );
};

export default CrearHorariosCitas;
