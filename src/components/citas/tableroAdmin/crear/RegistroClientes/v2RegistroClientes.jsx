import { useState } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import "../../../../../cssGeneral/CssGeneral.css"

import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";


const RegistroClientes = () => {
  const [nombreMasApellido, setnombreMasApellido] = useState("");
  const [documento, setdocumento] = useState("");
  const [ciudad, setciudad] = useState("");
  const [celularMovil, setcelularMovil] = useState("");
  const [telefonoFijo, settelefonoFijo] = useState("");
  const [email, setemail] = useState("");
  const [observacionesDeCuidado, setobservacionesDeCuidado] = useState("");
  const [loader, setLoader] = useState(false);

  const [vistaRegistro, setvistaRegistro] = useState("flex");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("RegistroClientes")
      .add({
        nombreMasApellido: nombreMasApellido,
        documento: documento,
        ciudad: ciudad,
        celularMovil: celularMovil,
        telefonoFijo: telefonoFijo,
        email: email,
        observacionesDeCuidado: observacionesDeCuidado,
        timestamp: new Date(),
      })
      .then(() => {
        setLoader(false);
        //alert("datos enviados");
      })
      .catch((error) => {
        alert(error.nombreMasApellido);
        alert(error.ciudad);
        alert(error.celularMovil);
        alert(error.email);
        alert(error.documento);
        alert(error.telefonoFijo);
        alert(error.observacionesDeCuidado);
        setLoader(false);
      });
    setnombreMasApellido("");
    setdocumento("");
    setciudad("");
    setcelularMovil("");
    settelefonoFijo("");
    setemail("");
    setobservacionesDeCuidado("");
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
        <div className="divBarraTituloRegistroClientes">
          <span className="textoCategorias">registro clientes</span>
        </div>
        <div className="p">
          <span className="p">* Todos los campos son opcionales</span>
        </div>
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el documento"
            style={{ margin: "5px 0px 5px 0px" }}
            value={documento}
            onChange={(e) => setdocumento(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el primer nombre"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={nombreMasApellido}
            onChange={(e) => setnombreMasApellido(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese la ciudad"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={ciudad}
            onChange={(e) => setciudad(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el email"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el celular movil"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={celularMovil}
            onChange={(e) => setcelularMovil(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el teléfono fijo"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={telefonoFijo}
            onChange={(e) => settelefonoFijo(e.target.value)}
          />
          <textarea
            type="text"
            cols="35"
            rows="5"
            placeholder="Observaciones de cuidado"
            className="camposText"
            style={{ margin: "5px 0px 5px 0px" }}
            value={observacionesDeCuidado}
            onChange={(e) => setobservacionesDeCuidado(e.target.value)}
          />
          <button className="boton2" onClick={accionRegistro}>
            <span className="textoBotonRegistrarCliente">registrar</span>
          </button>
        </form>
      </div>

      <div
        className="divTextoRegistroExitoso"
        style={{ display: `${vistaDatoRecibido}` }}
      >
        <span className="textoRegistroExitoso">¡registro exitoso!</span>
        <button
          className="boton2"
          onClick={accionDatosEnviados}
        >
          <span className="textoBotonRegistrarCliente">aceptar</span>
        </button>
      </div>
    </div>
  );
};

export default RegistroClientes;
