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

const EditarItemServicios = ({ criterioBusqueda }) => {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [busquedaProductos, setbusquedaProductos] = useState([]);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [task, setTask] = useState(""); 
  const [bdProductos, setbdProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

// categoryId descripcion name price relevancia visibilidad zonaDepilacion
const [categoryId, setcategoryId] = useState("");
const [price, setprice] = useState("");
const [descripcion, setdescripcion] = useState("");
const [name, setname] = useState("");
const [relevancia, setrelevancia] = useState("");
const [visibilidad, setvisibilidad] = useState("");
const [zonaDepilacion, setzonaDepilacion] = useState("");

  useEffect(() => {// consulta a la base de datos
    if (criterioBusqueda.length > 0) {
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("ItemServicios");
        referenciasDb
          //.where("name", "==", `${criterioBusqueda}`) // BUSQUEDA EXACTA
          .where("name", ">=", `${criterioBusqueda}`) // BUSQUEDA QUE CONTENGAN
          .where("name", "<", `${criterioBusqueda}z`) // BUSQUEDA QUE CONTENGAN
          // .orderBy("timestamp", "asc") cambia a desc
          //.orderBy("timestamp", "desc")
          .get()
          .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setbusquedaProductos(referenciasSnap);
          })
          .catch((error) => {
            //console.error("Error al obtener los productos:", error);
          });
      };
      obtenerRegistrosFirestore();
    }
  }, [criterioBusqueda, busquedaProductos]);

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("ItemServicios").doc(id).update({
      categoryId: categoryId,
      price: price,
      descripcion: descripcion,
      name: name,
      relevancia: relevancia,
      visibilidad: visibilidad,
      zonaDepilacion: zonaDepilacion,
    });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

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

    const result = await addDocument("ItemServicios", { name: name }); //> adicionando publicacion a la coleccion de bdProductos
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

    const result = await updateDocument("ItemServicios", id, {
      descripcion: descripcion,
      categoryId: categoryId,
      price: price,
      name: name,
      relevancia: relevancia,
      visibilidad: visibilidad,
      zonaDepilacion: zonaDepilacion,
    });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedTasks = bdProductos.map((item) =>
      item.id === id
        ? {
            id,
            categoryId: categoryId,
            price: price,
            descripcion: descripcion,
            name: name,
            relevancia: relevancia,
            visibilidad: visibilidad,
            zonaDepilacion: zonaDepilacion,
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
    const result = await deleteDocument("ItemServicios", id);
    if (!result.statusResponse) {
      setError(result.error); //
      return;
    }

    const filteredTasks = bdProductos.filter((task) => task.id !== id);
    setbdProductos(filteredTasks);
  };

  const editTask = (theTask) => {
    setvistaPublicaciones("none");
    setvistaEditor("flex");
    setId(theTask.id);
    setEditMode(true);

    setcategoryId(theTask.categoryId);
    setprice(theTask.price);
    setdescripcion(theTask.descripcion);
    setname(theTask.name);
    setrelevancia(theTask.relevancia);
    setvisibilidad(theTask.visibilidad);
    setzonaDepilacion(theTask.zonaDepilacion);
      };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setdescripcion("");
    setname("");
    setcategoryId("");
    setprice("");
    setrelevancia("");
    setvisibilidad("");
    setzonaDepilacion("");
    setId("");
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
              ingresa el nombre del servicio
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
                          {task.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="divEstatus" style={{ margin: '10px 0px 5px 0px' }}>
                    <div className="casillaEstatusServicos" style={{margin: "7px 0px 7px 0px"}}>
                      <BsCalendarDate className="iconosServicios" />
                      <span className="textoEstatusPago">
                      visibilidad: {task.visibilidad}
                      </span>
                    </div>
                    <div className="casillaEstatusServicos" style={{margin: "7px 0px 7px 0px"}}>
                      <MdPayment className="iconosServicios" />
                      <span className="textoEstatusPago">
                      indiceJerarquia: {task.indiceJerarquia}
                      </span>
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
                  value={categoryId}
                  onChange={(categoryId) =>
                    setcategoryId(categoryId.target.value.toUpperCase())
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
                  placeholder="Precio"
                  value={price}
                  onChange={(price) => setprice(price.target.value) }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <BsCalendarDate className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setname(e.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <BsCalendarDate className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="Fecha"
                  value={relevancia}
                  onChange={(relevancia) =>
                    setrelevancia(
                      relevancia.target.value.toUpperCase()
                    )
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <BsCalendarDate className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="Visibilidad"
                  value={visibilidad}
                  onChange={(visibilidad) => setvisibilidad(visibilidad.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <BsCalendarDate className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  
                  className="casillaFormulario"
                  placeholder="Zona de pilacion"
                  value={zonaDepilacion}
                  onChange={(zonaDepilacion) => setzonaDepilacion(zonaDepilacion.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                DESCRIPCION DEL SERVICIO
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                cols="35"
                rows="5"
                
                className="casillaDescripcionServicio"
                placeholder="Descripción"
                value={descripcion}
                onChange={(descripcion) =>
                  setdescripcion(descripcion.target.value)
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

export default EditarItemServicios;
