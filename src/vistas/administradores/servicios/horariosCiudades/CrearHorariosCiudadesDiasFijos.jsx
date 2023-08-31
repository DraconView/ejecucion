import { useState, useEffect } from "react";
import { db, auth, storage } from "./../../../../firebase/index";

import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsCloudArrowUp } from "react-icons/bs";

/* ejemplo objeto 
const reglas = [
    {
      ciudad: ciudad,
      //diasDisponibles: "mi, jueves, viernes",
      //inJo: [8, 0, 0, 0],
      //fiJo: [17, 0, 0, 0],
      //inDe: [12, 0, 0, 0],
      //fiDe: [14, 0, 0, 0],
      diasFestivos: "ninguno",
      duracionCita: 30,
      rangoDias: 15,
    },
  ];
*/

function CrearHorariosCiudades({}) {
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  const [name, setname] = useState("");
  const [zonaDepilacion, setzonaDepilacion] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState();

  const [diasDisponibles, setdiasDisponibles] = useState("");
  const [ciudad, setciudad] = useState("");
  const [inJoHora, setinJoHora] = useState();
  const [inJoMinutos, setinJoMinutos] = useState(0);
  const [fiJoHora, setfiJoHora] = useState("");
  const [fiJoMinutos, setfiJoMinutos] = useState("");
  const [inDeHora, setinDeHora] = useState("");
  const [inDeMinutos, setinDeMinutos] = useState("");
  const [fiDeHora, setfiDeHora] = useState("");
  const [fiDeMinutos, setfiDeMinutos] = useState("");

  const [vistaFormulario, setvistaFormulario] = useState("flex");
  const [vistaEnviandoDatos, setvistaEnviandoDatos] = useState("none");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

        db.collection("ReglasHorariosCitas").add({
          inJo: [Number(inJoHora), Number(inJoMinutos), 0, 0],
          fiJo: [Number(fiJoHora), Number(fiJoMinutos), 0, 0],
          inDe: [Number(inDeHora), Number(inDeMinutos), 0, 0],
          fiDe: [Number(fiDeHora), Number(fiDeMinutos), 0, 0],
          diasFestivos: "ninguno",
          timestamp: new Date(),
          //indiceJerarquia: 0,
          //username: username,
          //ciudad: ciudad,
          //name: name,
          //zonaDepilacion: zonaDepilacion,
          //diasDisponibles: diasDisponibles,
          //price: price,
          stock: Number(100000),
          //`${mtCategorias}`: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setLoader(false);
          //alert("datos enviados");
        })
        .catch((error) => {
          setLoader(false);
          alert(error.ciudad);
        });
        setciudad("");
        setname("");
        setzonaDepilacion("");
        setdiasDisponibles("");
        setprice("");
      };

  useEffect(() => {
    if (progress > 1) {
      setvistaFormulario("none");
      setvistaEnviandoDatos("flex");
    } else {
      setvistaFormulario("flex");
      setvistaEnviandoDatos("none");
    }
  }, [progress]);

  useEffect(() => {
    // vistaDatoRecibido none luego de 3 segundos
    if (progress > 99) {
      //if (progress === 0) {
      setvistaDatoRecibido("flex");
      setTimeout(() => {
        setvistaDatoRecibido("none");
      }, 3000);
    }
  }, [progress]);

  return (
    <div className="alineacionVertical">
      <div
        className="alineacionVerticalFlexEspera"
        style={{ display: `${vistaFormulario}` }}
      >
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
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

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              placeholder=" Ingrese el nombre"
              className="casillaFormulario"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              placeholder=" Ingrese la zona de depilacion"
              className="casillaFormulario"
              onChange={(e) => setzonaDepilacion(e.target.value)}
              value={zonaDepilacion}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              placeholder=" Ingrese el precio"
              className="casillaFormulario"
              onChange={(e) => setprice(e.target.value)}
              value={price}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="divCasillaEstatusServicosDescripcion">
            <span className="tituloObservacionTratamiento">
              Días de la semana separados por ( , )
            </span>
          </div>
          <div className="divCasillaDescripcionServicio">
            <textarea
              type="text"
              rows="5"
              cols="35"
              placeholder=" Ingrese los dias disponibles"
              className="casillaDescripcionServicio"
              onChange={(e) =>
                setdiasDisponibles(
                  e.target.value
                    .replace(/miercoles/gi, "miércoles")
                    .replace(/sabado/gi, "sábado")
                    .toLowerCase()
                )
              }
              value={diasDisponibles}
            />
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
      </div>

      {/* vista registrando datos */}
      <div
        className="alineacionVerticalFlexEspera"
        style={{ display: `${vistaEnviandoDatos}` }}
      >
        <div className="divRegistro">
          <div className="divTextoRegistro">
            <span className="textoRegistrando">registrando...</span>
          </div>
          <progress
            className="imageupload__progress"
            value={progress}
            max="100"
          />
        </div>
      </div>

      {/* mensaje por tres segundos de registro exitoso */}
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

export default CrearHorariosCiudades;
