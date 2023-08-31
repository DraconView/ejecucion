import { useState } from "react";
import { db, auth, storage } from "../../../firebase/index";
//import "./cssGeneral/CssBotones.css"
//import '../cssGeneral/CssFormularios.css'

import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { FaCity, FaUserCog } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";

const RegistroRol = () => {
  //console.log('llamando a RegistroRol')
  const [nombreMasApellido, setnombreMasApellido] = useState("");
  const [documento, setdocumento] = useState("");
  const [ciudad, setciudad] = useState("");
  const [celularMovil, setcelularMovil] = useState("");
  const [telefonoFijo, settelefonoFijo] = useState("");
  const [email, setemail] = useState("");
  const [observaciones, setobservaciones] = useState("");
  const [rol, setrol] = useState(""); 
  const [uid, setuid] = useState("");
  const [loader, setLoader] = useState(false);

  const [vistaRegistro, setvistaRegistro] = useState("flex");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Rol")
      .add({
        nombreMasApellido: nombreMasApellido,
        documento: documento,
        ciudad: ciudad,
        celularMovil: celularMovil,
        telefonoFijo: telefonoFijo,
        email: email,
        observaciones: observaciones,
        rol: rol,
        uid: uid,
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
        alert(error.observaciones);
        alert(error.rol);
        alert(error.uid);
        setLoader(false);
      });
    setnombreMasApellido("");
    setdocumento("");
    setciudad("");
    setcelularMovil("");
    settelefonoFijo("");
    setemail("");
    setobservaciones("");
    setrol("");
    setuid("");
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
          <span className="textoTitulosFormularios">registro de clientes</span>
        </div>
        <div className="divTextoIndicacionesFormulario">
          <span className="textoGris15700">Todos los campos son opcionales</span>
        </div>
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
          
          <div className="alineacionHorizontalJustificada">
          <HiOutlineIdentification className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Documento de identidad"
            value={documento}
            onChange={(e) => setdocumento(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <MdDriveFileRenameOutline className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Nombre"
            value={nombreMasApellido}
            onChange={(e) => setnombreMasApellido(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <FaCity className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setciudad(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <AiOutlineMail className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <BsPhoneFill className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Celular"
            value={celularMovil}
            onChange={(e) => setcelularMovil(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <BsFillTelephoneFill className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Teléfono"
            value={telefonoFijo}
            onChange={(e) => settelefonoFijo(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <FaUserCog className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Rol"
            value={rol}
            onChange={(e) => setrol(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <div className="alineacionHorizontalJustificada">
          <FaUserCog className="iconoFormulario"/>
          <textarea
            type="text"
            cols="35"
            rows="1"
            
            className='casillaFormulario'
            placeholder="Uid"
            value={uid}
            onChange={(e) => setuid(e.target.value)}
          />
          </div>
          <div className="divDividerFormulario"/>

          <textarea
            type="text"
            cols="35"
            rows="5"
            
            className='casillaFormularioDescripcion'
            placeholder="Observaciones de cuidado"
            value={observaciones}
            onChange={(e) => setobservaciones(e.target.value)}
          />
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

export default RegistroRol;
