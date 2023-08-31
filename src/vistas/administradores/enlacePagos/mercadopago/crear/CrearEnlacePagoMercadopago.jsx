// crearEnFire 220723

import { useState } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import "../../../../../cssGeneral/CssGeneral.css";

const CrearEnlacePagoMercadopago = () => {
  //console.log('llamando a CrearEnlacePagoMercadopago');
  const [servicio, setservicio] = useState("");
  const [sesiones, setsesiones] = useState("");
  const [enlace, setenlace] = useState("");
  const [plataformaPago, setplataformaPago] = useState("");
  const [loader, setLoader] = useState(false);

  const [vistaRegistro, setvistaRegistro] = useState("flex");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("EnlacesPagos")
      .add({
        referencia: servicio+sesiones+plataformaPago,
        servicio: servicio,
        sesiones: sesiones,
        enlace: enlace,
        plataformaPago: plataformaPago,
      })
      .then(() => {
        setLoader(false);
        //alert("datos enviados");
      })
      .catch((error) => {
        alert(error.servicio);
        alert(error.sesiones);
        alert(error.enlace);
        alert(error.plataformaPago);
        setLoader(false);
      });
    setservicio("");
    setsesiones("");
    setenlace("");
    setplataformaPago("");
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
          <span className="textoSubtitulos">Nuevo enlace mercadoPago</span>
        </div>
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              className="casillaFormulario"
              placeholder="Nombre del servicio"
              value={servicio}
              onChange={(e) =>
                setservicio(e.target.value.toUpperCase())
              }
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              
              className="casillaFormulario"
              placeholder="Numero de sesiones"
              value={sesiones}
              onChange={(e) => setsesiones(e.target.value.toUpperCase())}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              className="casillaFormulario"
              placeholder="Enlace de pago"
              value={enlace}
              onChange={(e) => setenlace(e.target.value)}
            />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
            <textarea
              type="text"
              cols="35"
              rows="1"
              className="casillaFormulario"
              placeholder="Plataforma de pago"
              value={plataformaPago}
              onChange={(e) => setplataformaPago(e.target.value.toLowerCase())}
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

export default CrearEnlacePagoMercadopago;
