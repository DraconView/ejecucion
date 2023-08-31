import { useContext, useState, useEffect } from "react";
import "./../../../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "../../../../../firebase";

import { FaCity } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";

const FichaClientes = ({ criterioBusqueda, tipoDeCampo }) => {
  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  const [datosObtenidos, setdatosObtenidos] = useState([]);
  const [id, setId] = useState("");

  const [nombreMasApellido, setNombreMasApellido] = useState("");
  const [documento, setdocumento] = useState("");
  const [celularMovil, setcelularMovil] = useState("");
  const [ciudad, setciudad] = useState("");
  const [email, setemail] = useState("");
  const [observacionesDeCuidado, setobservacionesDeCuidado] = useState("");

  useEffect(() => {
    if (criterioBusqueda.length > 0) {
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("RegistroClientes");
        referenciasDb
          .where(tipoDeCampo, "==", `${criterioBusqueda}`)
          .get()
          .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setdatosObtenidos(referenciasSnap);
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
  }, [criterioBusqueda, datosObtenidos]);

  const obtenerTodosLosRegistrosFirestore = () => {
    const referenciasDb = db.collection("RegistroClientes");
    referenciasDb
      .get()
      .then((querySnapshot) => {
        const referenciasSnap = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setdatosObtenidos(referenciasSnap);
      })
      .catch((error) => {
        //console.error("Error al obtener los productos:", error);
      });
  };

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

  /*async function actualizarDocumento(event) {
    event.preventDefault();
    const docRef = db.collection("RegistroClientes").doc(task.id);
    try {
      await docRef.update({
        nombreMasApellido,
        documento,
        celularMovil,
      });
      //console.log("Documento actualizado exitosamente");
    } catch (error) {
      //console.error("Error al actualizar el documento:", error);
    }
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  }*/

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
      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {datosObtenidos.length === 0 ? (
          <div
            className="cargandoEdicionesProductos"
            style={{ cursor: "pointer" }}
            onClick={() => obtenerTodosLosRegistrosFirestore()}
          >
            <div className="textoCargandoEdicionesProductos">
              para obtener todos los usuarios presiona
              <span
                style={{
                  color: "orange",
                  fontWeight: "bold",
                }}>
                {" "}aqui
              </span>
            </div>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div className="estiloListaEdicion" style={{ marginTop: "30px" }}>
              {datosObtenidos.map((task) => (
                  <div 
                    key={task.id}
                    className="Container"
                    style={{ margin: "10px 10px 10px 10px" }}
                    >
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
                    <div
                      className="divBotonContinuar"
                      onClick={() => editTask(task)}
                    >
                      <span className="textoBotonRegistrarCliente">
                        Editar
                      </span>
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
        {datosObtenidos.length === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
              Ingresa el número de teléfono del cliente
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div className="estiloListaEdicion" style={{ marginTop: "30px" }}>
              {datosObtenidos.map((task) => (
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

export default FichaClientes;
