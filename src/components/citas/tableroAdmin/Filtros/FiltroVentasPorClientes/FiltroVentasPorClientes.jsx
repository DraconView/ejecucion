//edicion con busqueda en base
import { useState, useEffect } from "react"; //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from "lodash";
import {
  addDocument,
  deleteDocument,
  getCollection,
  getDocument,
  updateDocument,
  getDocumentName,
} from "../../../../../helpers/AccionesbdFire"; //>aqui se importan los metodos del archivo actions  //ANT import shortid from 'shortid'
import "./../../../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Button, Modal, makeStyles } from "@material-ui/core";
import { BiSearchAlt } from "react-icons/bi";
import { db, auth, storage } from "../../../../../firebase";
import { AiOutlineCaretUp } from "react-icons/ai";
import {
  MdOutlineLocalShipping,
  MdOutlineMonetizationOn,
  MdLocalPhone,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";

const FiltroVentasPorClientes = ({ criterioBusqueda, tipoDeCampo }) => {
  const [busquedaProductos, setbusquedaProductos] = useState([]);
  const [cartItemServicios, setcartItemServicios] = useState([]);
  //const [criterioBusqueda, setcriterioBusqueda] = useState("");

  /* FUNCIONAL 0952p160223 BUSQUEDA EXACTA
  useEffect(() => { 
  const obtenerReferenciasExacta = () => { // funcional
    const referenciasDb = db.collection("OrdenesProductos");
    referenciasDb
      //.where("name", "==", `${criterioBusqueda}`)
      .where("celularMovil", "==", "OrdenesProductos")
      .get()
      .then((querySnapshot) => {
        const referenciasSnap = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setbusquedaProductos(referenciasSnap);
      })
      .catch((error) => {
        //console.error('Error al obtener las referenciasSnap:', error);
      });
  };
  obtenerReferenciasExacta()
}, [criterioBusqueda]);
*/

  ///* FUNCIONAL 0952p160223 BUSQUEDA QUE CONTENGAN
  useEffect(() => {
    if (criterioBusqueda) {
      const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("OrdenesProductos");
        referenciasDb
          .where("uid", ">=", `${criterioBusqueda}`)
          .where("uid", "<", `${criterioBusqueda}z`)
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
  }, [criterioBusqueda]);
  //*/

  /*
  const [consultaDetallada, setconsultaDetallada] = useState([]);

  useEffect(() => {
    (async () => {
        const result = await getCollection("ItemProductos", `${criterioBusqueda}`)
        if (result.statusResponse) {
          setconsultaDetallada(result.data)
        }
    })()
}, [criterioBusqueda])
*/

  const classes = useStyles();

  const [task, setTask] = useState(""); //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)
  const [bdProductos, setbdProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [visibilidad, setvisibilidad] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagenEdicion, setimagenEdicion] = useState("");

  const [loader, setLoader] = useState(false);

  const [categoryId, setcategoryId] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [dato, setDato] = useState(0);
  const [stock, setstock] = useState();
  const [imagesArray, setImagesArray] = useState([]);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  /*/*
  useEffect(() => {
    (async () => {
        const result = await getCollection("ItemProductos")
        if (result.statusResponse) {
            setbdProductos(result.data)
        }
    })()
}, [])
*/
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

    const result = await addDocument("OrdenesProductos", { name: name }); //> adicionando publicacion a la coleccion de bdProductos
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

    const result = await updateDocument("OrdenesProductos", id, {
      //name: task,
      price: price,
      descripcion: descripcion,
      name: name,
      categoryId: categoryId,
      visibilidad: visibilidad,
      stock: Number(stock),
    });
    if (!result.statusResponse) {
      //> !result niega la condicion
      setError(result.error); //> entonce pinta el error que devuelva el api
      return;
    }

    const editedTasks = bdProductos.map((item) =>
      item.id === id
        ? {
            id,
            //name: task,
            price: price,
            descripcion: descripcion,
            name: name,
            visibilidad: visibilidad,
            categoryId: categoryId,
            stock: Number(stock),
          }
        : item
    );
    setbdProductos(editedTasks);
    setEditMode(false);
    //setTask("")
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

  const deleteTask = async (id) => {
    alert("¿Estas seguro de eliminar esta publicacion?");
    const result = await deleteDocument("OrdenesProductos", id); //> bdProductos indica de cual coleccion va eliminar con el ID que se le pase por parametro
    if (!result.statusResponse) {
      // esta condicion es para que si no se elimina no se ejecute el codigo de abajo
      setError(result.error); //
      return;
    }

    const filteredTasks = bdProductos.filter((task) => task.id !== id);
    setbdProductos(filteredTasks);
  };

  const editTask = (theTask) => {
    //setTask(theTask.name)
    setprice(theTask.price);
    setdescripcion(theTask.descripcion);
    setname(theTask.name);
    //setname(theTask.img) error
    setcategoryId(theTask.categoryId);
    setvisibilidad(theTask.visibilidad);
    setEditMode(true);
    setId(theTask.id);
    setstock(theTask.stock);
    setvistaPublicaciones("none");
    setvistaEditor("flex");
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setvisibilidad("");
    //setTask("")
    setprice("");
    settalla("");
    setdescripcion("");
    setname("");
    setcategoryId("");
    setstock("");
  };

  return (
    <div className="contenedorAccionesFiltroClientes">
      <div
        style={{
          alignitems: "left",
          display: `${vistaEditor}`,
          backgroundColor: "#ffffff",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <HiArrowNarrowLeft
          onClick={volverEdicion}
          style={{
            fontSize: "35px",
            margin: "15px 0px 0px 15px",
            color: "#646464",
          }}
        />
      </div>
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
                <div className="divPrincipalFuncionesVentas" key={task.id}>
                                    <div className="referenciaBotonesEdicion2">

<div className="divEditIcon" onClick={() => editTask(task)}>
  <AiTwotoneEdit className="editIcon" />
</div>
</div>
                  <div className="divTotalDatos">
                    <div className="divArrowDropUpPrecio">
                      <div className="divTextoTotalVentaDescripcion">
                        <AiOutlineCaretUp className="arrowDropUpIcon" />
                        <span className="textoTotalVentaMonto">
                          {task.total}
                        </span>
                      </div>
                      <span className="textoTotalVentaDescripcion">
                        venta total
                      </span>
                    </div>
                  </div>
                  <div className="divEstatus">
                    <div className="divEstatusPago">
                      <BsCalendarDate sx={{ fontSize: 20, color: "#808080" }} />
                      <span className="textoEstatusPago">
                        fecha: {task.fechaLegible}
                        {task.horaLegible}
                      </span>
                    </div>
                    <div className="divEstatusPago">
                      <MdOutlineMonetizationOn
                        sx={{ fontSize: 20, color: "#808080" }}
                      />
                      <span className="textoEstatusPago">
                        pago: {task.estatusPago}
                      </span>
                    </div>
                  </div>
                  <div className="divDivider"/>
                  {task.cartItem.map((item) => (
                      <div key={item.id}>
                        <p>Nombre: {item.name}</p>
                        <p>Precio: {item.price}</p>
                        <p>Cantidad: {item.count}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className="alineacionVertical"
        style={{ display: `${vistaEditor}` }}
      >
        <span className="tituloEditandoEdicion">
          {editMode ? "Modificar publicacion" : "Agregar publicacion"}
        </span>
        <form onSubmit={editMode ? saveTask : addTask}>
          {error && <span className="no">{error}</span>}
          <div className="alineacionVertical">
            <div className="divCasillaEdicionEdicion">
              <span>categoría :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Editar categoría del producto"
                onChange={(categoryId) =>
                  setcategoryId(
                    categoryId.target.value.replace(" ", "").toUpperCase()
                  )
                }
                value={categoryId}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>referencia :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Editar nombre o referencia"
                onChange={(name) => setname(name.target.value.toUpperCase())}
                value={name}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>unidades :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Editar cantidad o unidades"
                onChange={(stock) => setstock(stock.target.value)}
                value={stock}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>precio :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Editar precio de venta"
                onChange={(price) =>
                  setprice(price.target.value.replace(".", ""))
                }
                value={price}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>visibilidad :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Cambiar visibilidad"
                onChange={(visibilidad) =>
                  setvisibilidad(
                    visibilidad.target.value.replace(" ", "").toUpperCase()
                  )
                }
                value={visibilidad}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <textarea
                type="text"
                rows="5"
                cols="40"
                placeholder=" descripción del producto"
                className={classes.camposTextDescripcion}
                onChange={(event) => setdescripcion(event.target.value)}
                value={descripcion}
              />
            </div>
            <button className={classes.botonPublicar} type="submit">
              {editMode ? "Guardar" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  camposText: {
    border: "none",
    width: "160px",
    padding: "0px 10px 0px 10px",
    fontSize: "15px",
    color: "#808080",
  },
  botonPublicar: {
    margin: "45px 0px 0px 0px",
    backgroundColor: "#000000",
    width: "100px",
    borderRadius: "15px",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "10px 0px 10px 0px",
    color: "#ffffff",
    border: "none",
  },
}));

// para editar asegurarse que esten los campos creados en la base de datos
/*

      <div className='divBarraTitulos'>
            <span className='textoBarraTitulos'>
                Edicion de productos
            </span> 
        </div>

            <input
        type="text"
        className={classes.camposText}
        placeholder="Ingrese el precio"
        onChange={(price)=>setprice(price.target.value)}
        value={'pecio: '+ price}
      />
*/
export default FiltroVentasPorClientes;
