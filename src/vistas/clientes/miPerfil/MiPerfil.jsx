import { useContext, useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../../firebase/index";
import CartContext from "../../../context/CartContext";
import { useHistory, Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

import { FaCity } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";

const MiPerfil = () => {
  const { contextUsuarioLogueado } = useContext(CartContext);

  useEffect(() => {
    if (contextUsuarioLogueado.uid === null) {
      history.replace("/login");
      //  history.push("/");
    } else {
      //console.log(user, "user");
    }
  }, [contextUsuarioLogueado.uid, history]);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  const [retornoDeBd, setretornoDeBd] = useState([]);
  const [id, setId] = useState("");

  const [nombreMasApellido, setNombreMasApellido] = useState("");
  const [documento, setdocumento] = useState("");
  const [celularMovil, setcelularMovil] = useState("");
  const [ciudad, setciudad] = useState("");
  const [email, setemail] = useState("");
  const [observacionesDeCuidado, setobservacionesDeCuidado] = useState("");

  useEffect(() => {
    if (contextUsuarioLogueado) {
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("RegistroClientes");
        referenciasDb
          .where("uid", "==", contextUsuarioLogueado.uid)
          .get()
          .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setretornoDeBd(referenciasSnap);
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
  }, [contextUsuarioLogueado, retornoDeBd]);

  const editTask = (theTask) => {
    setId(theTask.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");

    setNombreMasApellido(theTask.nombreMasApellido);
    setdocumento(theTask.documento);
    setcelularMovil(theTask.celularMovil);
    setciudad(theTask.ciudad);
    setemail(theTask.email);
    setobservacionesDeCuidado(theTask.observacionesDeCuidado);
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("RegistroClientes").doc(id).update({
      nombreMasApellido,
      documento,
      celularMovil,
      ciudad,
      email,
      observacionesDeCuidado,
    });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setNombreMasApellido("");
    setdocumento("");
    setcelularMovil("");
    setciudad("");
    setemail("");
    setobservacionesDeCuidado("");
  };

  const volverEdicion = () => {
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setNombreMasApellido("");
    setdocumento("");
    setcelularMovil("");
    setciudad("");
    setemail("");
    setobservacionesDeCuidado("");
  };

  return (
    <div className="n">

      <Link
        to="/tablero-clientes"
        className="divIzquierdaColumn100"
        style={{ margin: "20px 0px 0px 15px", textDecoration: "none" }}
      >
        <HiArrowNarrowLeft className="iconoAccion" />
        <span
          style={{ margin: "0px 0px 0px 0px" }}
          className="textoCerrarSesion"
        >
          volver
        </span>
      </Link>

      <div 
        className="divBarraTituloRegistroClientes"
        style={{ margin: "20px auto 20px auto" }}
        >
        <span className="textoNegroS21W700U">Mis Servicios</span>
      </div>

      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {retornoDeBd.length === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
            no encontramos tu perfil comunícate con nosotros
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div className="estiloListaEdicion" style={{ marginTop: "30px" }}>
              {retornoDeBd.map((task) => (
                <div className="inicioBloque" key={task.id}>
                  <div className="alineacionVertical">
                    <div className="Container">
                      <div className="divIconoCliente">
                        <BsFillPersonFill size={55} color="#ffffff" />
                      </div>
                      <span className="textoNombreCliente">
                        {task.nombreMasApellido}
                      </span>
                      <div className="InfoContainer">
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <HiOutlineIdentification className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            placeholder="Documento..."
                            disabled
                            value={task.documento}
                            onChange={(e) => setdocumento(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <BsPhoneFill className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            disabled
                            placeholder="Celular..."
                            value={task.celularMovil}
                            onChange={(e) => setcelularMovil(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <FaCity className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            disabled
                            placeholder="Ingrese la ciudad..."
                            value={task.ciudad}
                            onChange={(e) => setciudad(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <AiOutlineMail className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            disabled
                            placeholder="Ingrese el email..."
                            value={task.email}
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                        <div className="divCasillaEstatusServicosDescripcion">
                          <span className="tituloObservacionTratamiento">
                            OBSERVACIONES DE CUIDADO
                          </span>
                        </div>
                        <div className="divCasillaDescripcionServicio">
                          <textarea
                            type="text"
                            rows="5"
                            disabled
                            className="casillaDescripcionServicio"
                            placeholder="Observaciones de cuidado"
                            value={task.observacionesDeCuidado}
                          />
                        </div>
                      </div>
                      {/* aqui va el boton editar */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* - - - - - - - - - VISTA EDITOR - - - - - - - - - */}
      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaEditor}` }}
      >
        {retornoDeBd.length === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
              Ingresa el número de teléfono del cliente
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div className="estiloListaEdicion" style={{ marginTop: "30px" }}>
              {retornoDeBd.map((task) => (
                <div className="inicioBloque" key={task.id}>
                  <div className="alineacionVertical">
                    <div className="Container">
                      <div className="divIconoCliente">
                        <BsFillPersonFill size={55} color="#ffffff" />
                      </div>
                      <span className="textoNombreCliente">
                        {nombreMasApellido}
                      </span>
                      <div className="InfoContainer">
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <HiOutlineIdentification className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            placeholder="Documento..."
                            value={documento}
                            onChange={(e) => setdocumento(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <BsPhoneFill className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            placeholder="Celular..."
                            value={celularMovil}
                            onChange={(e) => setcelularMovil(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <FaCity className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            placeholder="Ingrese la ciudad..."
                            value={ciudad}
                            onChange={(e) => setciudad(e.target.value)}
                          />
                        </div>
                        <div
                          className="casillaEstatusServicos"
                          style={{ margin: "0px 0px 2px 0px" }}
                        >
                          <AiOutlineMail className="iconoFormulario2" />
                          <textarea
                            type="text"
                            className="textareaEdicion2"
                            placeholder="Ingrese el email..."
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                        <div className="divCasillaEstatusServicosDescripcion">
                          <span className="tituloObservacionTratamiento">
                            OBSERVACIONES DE CUIDADO
                          </span>
                        </div>
                        <div className="divCasillaDescripcionServicio">
                          <textarea
                            type="text"
                            rows="5"
                            className="casillaDescripcionServicio"
                            placeholder="Observaciones de cuidado"
                            value={observacionesDeCuidado}
                            onChange={(e) =>
                              setobservacionesDeCuidado(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div
                        onClick={volverEdicion}
                        className="divBotonContinuar"
                      >
                        <span className="textoBotonRegistrarCliente">
                          CANCELAR
                        </span>
                      </div>
                      <button
                        className="divTextoBotonGuardar"
                        type="submit"
                        onClick={actualizarRegistrosFirestore}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/*
                      <div
                        className="divBotonContinuar"
                        onClick={() => editTask(task)}
                      >
                        <span className="textoBotonRegistrarCliente">
                          Editar
                        </span>
                      </div>
                      */

export default MiPerfil;
