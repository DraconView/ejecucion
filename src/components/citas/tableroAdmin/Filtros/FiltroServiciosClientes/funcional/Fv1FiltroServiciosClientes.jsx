import { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../../../helpers/AccionesbdFire";
import "./../../../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "../../../../../firebase";
import { AiOutlineCaretUp } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";

const FiltroServiciosClientes = ({ criterioBusqueda, tipoDeCampo }) => {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [busquedaProductos, setbusquedaProductos] = useState([]);
  const [cartItemServicios, setcartItemServicios] = useState([]);

//console.log(typeof criterioBusqueda, "criterioBusqueda");
console.log(criterioBusqueda, "FiltroServiciosClientes");

  useEffect(() => {
    if (criterioBusqueda.length > 0) {
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("OrdenesServicios");
        referenciasDb
          .where(tipoDeCampo, "==", `${criterioBusqueda}`)
          //.where("celularMovil", ">=", `${criterioBusqueda}`) // BUSQUEDA QUE CONTENGAN
          //.where("celularMovil", "<", `${criterioBusqueda}z`) // BUSQUEDA QUE CONTENGAN
          // .orderBy("timestamp", "asc") cambia a desc
          //.orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setbusquedaProductos(referenciasSnap);
            setcartItemServicios(busquedaProductos.cartItem);
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
    //}, [criterioBusqueda]);
  }, [criterioBusqueda, busquedaProductos]);

  const [task, setTask] = useState(""); //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)
  const [bdProductos, setbdProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [name, setname] = useState("");
  const [observaciones, setobservaciones] = useState("");

  const [estatusPago, setestatusPago] = useState("");
  const [estatusServicio, setestatusServicio] = useState("");

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(name)) {
      setError("Debes ingresar una publicacion.");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("OrdenesServicios", { name: name }); //> adicionando publicacion a la coleccion de bdProductos
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setbdProductos([...bdProductos, { id: result.data.id, name: task }]); //> se llama a base de datos y se almacena en memoria
    setname("");
  };

  const saveTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    // parece que no esta en uso
    const result = await updateDocument("OrdenesServicios", id, {
      observaciones: observaciones,
      estatusPago: estatusPago,
      estatusServicio: estatusServicio,
      name: name,
    });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    
    // parece que no esta en uso
    const editedTasks = bdProductos.map((item) =>
      item.id === id
        ? {
            id,
            estatusPago: estatusPago,
            estatusServicio: estatusServicio,
            observaciones: observaciones,
            name: name,
          }
        : item
    );
    setbdProductos(editedTasks);
    setEditMode(false);
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");

  };

  const deleteTask = async (id) => {
    alert("¿Estas seguro de eliminar esta publicacion?");
    const result = await deleteDocument("OrdenesServicios", id);
    if (!result.statusResponse) {
      setError(result.error); //
      return;
    }

    const filteredTasks = bdProductos.filter((task) => task.id !== id);
    setbdProductos(filteredTasks);
  };

  const editTask = (theTask) => {
    setestatusPago(theTask.estatusPago);
    setestatusServicio(theTask.estatusServicio);
    setobservaciones(theTask.observaciones);
    setname(theTask.name);
    setEditMode(true);
    setId(theTask.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("OrdenesServicios").doc(id).update({
      estatusPago: estatusPago,
      estatusServicio: estatusServicio,
      observaciones: observaciones,
    });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setobservaciones("");
    setname("");
    setestatusPago("");
    setestatusServicio("");
  };

  return (
    <div className="contenedorAccionesFiltroClientes">
      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {size(busquedaProductos) === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
            ingresa el numero de teléfono del cliente
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div style={{ marginTop: "30px" }} />
            <div className="estiloListaEdicion">
              {busquedaProductos.map((task) => (
                <div className="divFichaServicioCliente" key={task.id}>
                  <div className="divTotalDatos">
                    <div className="divArrowDropUpPrecio">
                      <div className="divTotalVentaServicio">
                        <AiOutlineCaretUp className="arrowDropUpIcon" />
                        <span className="textoTotalVentaMonto">
                          {task.total}
                        </span>
                      </div>
                    </div>
                  </div>
                  {task.cartItem.map((item) => (
                    <div key={item.id}>
                      <div className="divServioPorRealizar">
                        <span className="textoServioPorRealizar">
                          {item.name}
                        </span>
                        <span className="cantidadSesiones">
                          numero de sesiones: {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="divEstatus">
                    <div className="casillaEstatusServicos" style={{margin: "7px 0px 7px 0px"}}>
                      <BsCalendarDate className="iconosServicios" />
                      <span className="textoEstatusPago">
                        fecha: {task.fechaMasHoraLegible}
                      </span>
                    </div>
                    <div className="casillaEstatusServicos" style={{margin: "7px 0px 7px 0px"}}>
                      <MdPayment className="iconosServicios" />
                      <span className="textoEstatusPago">
                        estatus pago: {task.estatusPago}
                      </span>
                    </div>
                    <div className="casillaEstatusServicos" style={{margin: "7px 0px 7px 0px"}}>
                      <ImPriceTag className="iconosServicios" />
                      <span className="textoEstatusPago">
                      N.º sesion: {task.estatusServicio}
                      </span>
                    </div>

                    <div className="divCasillaEstatusServicosDescripcion">
                      <span className="tituloObservacionTratamiento">
                        OBSERVACIONES DE TRATAMIENTO
                      </span>
                    </div>
                    <div className="divCasillaDescripcionServicio">
                      <textarea
                        type="text"
                        disabled
                        className="casillaDescripcionServicio"
                        placeholder=""
                        value={task.observaciones}
                      />
                    </div>
                  </div>
                  <div
                    className="contenedorBotonEditarServicio"
                    onClick={() => editTask(task)}
                  >
                    <div className="divBotonEditarServicio">
                      <MdDriveFileRenameOutline className="iconoEditarServicio" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* VISTA EDITOR*/}

      <div
        className="alineacionVertical"
        style={{ display: `${vistaEditor}` }}
      >
        <span className="tituloEditandoEdicion">
          {editMode ? "Modificar estado" : "Agregar publicacion"}
        </span>
        <form onSubmit={editMode ? saveTask : addTask}>
          {error && <span className="no">{error}</span>}
          <div className="alineacionVertical">
            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <MdPayment className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="Estatus pago"
                  value={estatusPago}
                  onChange={(estatusPago) =>
                    setestatusPago(estatusPago.target.value.toUpperCase())
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <ImPriceTag className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="N.º sesion"
                  value={estatusServicio}
                  onChange={(estatusServicio) =>
                    setestatusServicio(
                      estatusServicio.target.value.toUpperCase()
                    )
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>
            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                OBSERVACIONES DE TRATAMIENTO
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                cols="35"
                rows="5"
                
                className="casillaDescripcionServicio"
                placeholder="Observaciones"
                value={observaciones}
                onChange={(observaciones) =>
                  setobservaciones(observaciones.target.value)
                }
              />
            </div>

            <div onClick={volverEdicion} className="divBotonContinuar">
              <span className="textoBotonRegistrarCliente">CANCELAR</span>
            </div>
            <button
              className="divTextoBotonGuardar"
              type="submit"
              onClick={actualizarRegistrosFirestore}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FiltroServiciosClientes;
