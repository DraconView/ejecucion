import { useState, useEffect } from "react"; //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from "lodash";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "../../../helpers/AccionesbdFire"; //>aqui se importan los metodos del archivo actions  //ANT import shortid from 'shortid'
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Button, Modal, makeStyles } from "@material-ui/core";

const EdicionCategorias = () => {
  //console.log('llamando a EdicionCategorias');
  const classes = useStyles();

  const [task, setTask] = useState(""); //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)
  const [BdItemServicios, setcategoriasInicio] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);
  const [visibilidad, setvisibilidad] = useState("");

  const [categoryId, setcategoryId] = useState("");
  const [name, setname] = useState("");
  const [relevancia, setrelevancia] = useState();
  const [subCategorias, setsubCategorias] = useState("");

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  useEffect(() => {
    //useEffect es un metodo asincrono
    (async () => {
      // aqui se llama una accion para que traiga la data
      const result = await getCollection("ItemServicios"); //se guardar el resultado en una variable const ,se llama al metodo getCollection del archivo actions.js que se encarga de pintar la data, que recibe como parametro ("ItemServicios") el nombre de la coleccion en firebase
      if (result.statusResponse) {
        setcategoriasInicio(result.data); //=> las publicacion vaser igual al resultado que alla obtenido //ATN para probar que resuelve el resultado
      }
    })(); //el doble parentesis es un metodo asincrono auto ejecutable
  }, [vistaEditor]);

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

    const result = await addDocument("ItemServicios", { name: name }); //> adicionando publicacion a la coleccion de ItemServicios
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setcategoriasInicio([
      ...BdItemServicios,
      { id: result.data.id, name: task },
    ]); //> se llama a base de datos y se almacena en memoria
    setname("");
  };

  const saveTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await updateDocument("ItemServicios", id, {
      //name: task,
      name: name,
      categoryId: categoryId,
      visibilidad: visibilidad,
      relevancia: Number(relevancia),
      subCategorias: subCategorias,
    });
    window.location.reload();
    if (!result.statusResponse) {
      //> !result niega la condicion
      setError(result.error); //> entonce pinta el error que devuelva el api
      return;
    }

    const editedTasks = BdItemServicios.map((item) =>
      item.id === id
        ? {
            id,
            //name: task,
            name: categoryId,
            categoryId: categoryId,
            relevancia: Number(relevancia),
            subCategorias: subCategorias,
            visibilidad: visibilidad,
          }
        : item
    );
    setcategoriasInicio(editedTasks);
    setEditMode(false);
    //setTask("")
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

  const deleteTask = async (id) => {
    const result = await deleteDocument("ItemServicios", id); //> ItemServicios indica de cual coleccion va eliminar con el ID que se le pase por parametro
    if (!result.statusResponse) {
      //> sino lo pudo borrar
      setError(result.error); //> entonces pintar el error que esta en result.error
      return;
    }

    const filteredTasks = BdItemServicios.filter((task) => task.id !== id);
    setcategoriasInicio(filteredTasks);
  };

  const editTask = (theTask) => {
    //setTask(theTask.name)
    setname(theTask.name);
    setcategoryId(theTask.categoryId);
    setEditMode(true);
    setId(theTask.id);
    setrelevancia(theTask.relevancia);
    setsubCategorias(theTask.subCategorias);
    setvistaPublicaciones("none");
    setvistaEditor("flex");
    setvisibilidad(theTask.visibilidad);
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    //setTask("")
    setname("");
    setcategoryId("");
    setrelevancia("");
    setvisibilidad("");
    setsubCategorias("");
  };

  return (
    <div className="divPricipalEdicion">
      <div
        style={{
          alignitems: "left",
          display: `${vistaPublicaciones}`,
          backgroundColor: "#ffffff",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Link to="/union-edicion-categorias">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "15px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
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
        {size(BdItemServicios) === 0 ? (
          <div className="cargandoEdiciones">
            <span className="textoCargandoEdiciones">Cargando...</span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div className="divBarraTitulos">
              <span className="textoBarraTitulos">Edición</span>
            </div>
            <div style={{ marginTop: "30px" }} />
            <div className="estiloListaEdicion">
              {BdItemServicios.map((task) => (
                <div className="alineacionHorizontalEdicion" key={task.id}>
                  <img className="imagenEdicion" src={task.img[0]} />
                  <div className="alineacionVertical">
                    <span className="textoReferenciaEdicion">
                      {task.categoryId}
                    </span>
                    <span className="textoReferenciaEdicion">
                      {task.visibilidad}
                    </span>
                    <div className="alineacionEditarEliminar">
                      <button
                        className="botonesEdicionEdicion"
                        onClick={() => editTask(task)}
                      >
                        Editar
                      </button>
                      <button
                        className="botonesEdicionEdicion"
                        onClick={() => deleteTask(task.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="alineacionVertical" style={{ display: `${vistaEditor}` }}>
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
                placeholder="Ingrese la categoría..."
                onChange={(categoryId) =>
                  setcategoryId(categoryId.target.value.toUpperCase())
                }
                value={categoryId.toUpperCase()}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>relevancia :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Ingrese la relevancia..."
                onChange={(relevancia) =>
                  setrelevancia(relevancia.target.value.toUpperCase())
                }
                value={relevancia}
              />
            </div>
            <div className="divCasillaEdicionEdicion">
              <span>visibilidad :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Ingrese la visibilidad..."
                onChange={(visibilidad) =>
                  setvisibilidad(
                    visibilidad.target.value.replace(" ", "").toUpperCase()
                  )
                }
                value={visibilidad}
              />
            </div>
            <div className="divCasillaEdicionEdicionSubcategorias">
              <span> subcategorías :</span>
              <textarea
                type="text"
                rows="5"
                cols="35"
                className={classes.camposTextParrafo}
                placeholder="Ingrese las subCategorias..."
                onChange={(subCategorias) =>
                  setsubCategorias(
                    subCategorias.target.value.replace(" ", "").toLowerCase()
                  )
                }
                value={subCategorias}
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
  camposTextParrafo: {
    border: "none",
    width: "250px",
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

export default EdicionCategorias;
