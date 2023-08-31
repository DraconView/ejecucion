import { useState } from "react";
import { db, auth, storage } from "../../../../firebase/index";
import "../../../../cssGeneral/CssGeneral.css";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaCity } from "react-icons/fa";

const CrearCiudad = () => {
  //console.log('llamando a CrearCiudad');
  const [ciudad, setciudad] = useState("");
  const [nombrePublico, setnombrePublico] = useState("");
  const [puntoReferencia, setpuntoReferencia] = useState("");
  const [loader, setLoader] = useState(false);

  const [vistaRegistro, setvistaRegistro] = useState("flex");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

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
        //console.log("Documento actualizado obtenerCiudadesFirestore");
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Ciudades")
      .add({
        ciudad: ciudad,
        nombrePublico: nombrePublico,
        puntoReferencia: puntoReferencia,
        timestamp: new Date(),
        //visibilidad: "ACTIVO",
        //stock: 1,
        //indiceJerarquia: 0,
      })
      .then(() => {
        setLoader(false);
        //alert("datos enviados");
      })
      .catch((error) => {
        alert(error.ciudad);
        alert(error.nombrePublico);
        alert(error.puntoReferencia);
        setLoader(false);
      });
    setciudad("");
    setnombrePublico("");
    setpuntoReferencia("");
    actualizarMarcaDeTiempo();
  };

  const accionRegistro = () => {
    setvistaRegistro("none");
    setvistaDatoRecibido("flex");
  };

  const accionDatosEnviados = () => {
    setvistaRegistro("flex");
    setvistaDatoRecibido("none");
  };

  return (
    <div className="divPrincipalRegistroClientes">
      <div
        style={{ display: `${vistaRegistro}` }}
        className="divPrincipalformularioRegistroClientes"
      >
        <div style={{ margin: "20px auto 20px auto" }}>
          <span className="textoSubtitulos">Nueva ciudad</span>
        </div>
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
          <div className="alineacionHorizontalJustificada">
            <FaCity className="iconoFormulario" />
            <textarea
              type="text"
              cols="35"
              rows="1"
              
              className="casillaFormulario"
              placeholder="Ciudad"
              value={ciudad}
              onChange={(e) =>
                setciudad(e.target.value.toUpperCase().replace(" ", ""))
              }
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <MdDriveFileRenameOutline className="iconoFormulario" />
            <textarea
              type="text"
              cols="35"
              rows="1"
              
              className="casillaFormulario"
              placeholder="Nombre para el público"
              value={nombrePublico}
              onChange={(e) => setnombrePublico(e.target.value.toUpperCase())}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="divCasillaEstatusServicosDescripcion">
            <span className="tituloObservacionTratamiento">
              PUNTO DE REFERENCIA
            </span>
          </div>
          <div className="divCasillaDescripcionServicio">
          <textarea
            type="text"
            cols="35"
            rows="5"
            
            className="casillaDescripcionServicio"
            value={puntoReferencia}
            onChange={(e) => setpuntoReferencia(e.target.value)}
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

export default CrearCiudad;
