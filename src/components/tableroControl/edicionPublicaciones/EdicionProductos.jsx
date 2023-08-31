//edicion con busqueda en base
import {useState, useEffect} from 'react'  //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument  } from '../../../helpers/AccionesbdFire' 
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft} from "react-icons/hi";
import { Button, Modal, makeStyles } from '@material-ui/core';
import { BiSearchAlt } from "react-icons/bi";
import { db, auth, storage } from '../../../firebase'

const EdicionProductos = () => {  
  //console.log('llamando a EdicionProductos');
  const [document, setDocument] = useState(null);
  const [criterioBusqueda, setcriterioBusqueda] = useState("");

  useEffect(() => {
    db.collection("ItemProductos").where("name", "==", `${criterioBusqueda}`).get()
      .then(snapshot => {
        if (snapshot.empty) {
          //console.log("No se encontraron documentos");
          return;
        }
        setDocument(snapshot.docs[0].data());
      })
      .catch(error => {
        //console.error("Error al obtener el documento: ", error);
      });
  }, [criterioBusqueda]);

/*
  const [consultaDetallada, setconsultaDetallada] = useState([]);

  useEffect(() => {
    (async () => {
        const result = await getCollection("ItemProductos", `${criterioBusqueda}`)
        if (result.statusResponse) {
          setconsultaDetallada(result.data)
        }
    })()
    //console.log(consultaDetallada)
}, [criterioBusqueda])
*/

 useEffect(() => {
    if (task.img === undefined) {
        //console.log('todavia no hay imagen')
        setLoading(true)
    } else {
        //console.log('ya llego la imagen')
        setImagesArray([task.img]);
    }
}, [])

  const classes = useStyles();

  const [task, setTask] = useState("") //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)  
  const [bdProductos, setbdProductos] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)
  const [visibilidad, setvisibilidad] = useState("")
  const [loading, setLoading] = useState(false)
  const [imagenEdicion, setimagenEdicion] = useState("")
  
  const [loader, setLoader] = useState(false);
  
  const [categoryId, setcategoryId] = useState("")
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [costo, setcosto] = useState("")
  const [descripcion, setdescripcion] = useState("")
  const [dato, setDato] = useState(0)
  const [stock, setstock] = useState();
  const [imagesArray, setImagesArray] = useState([])


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
    let isValid = true
    setError(null)

    if (isEmpty(name)) {
      setError("Debes ingresar una publicacion.")
    isValid = false
    }
  
    return isValid
  }
    
  const addTask = async(e) => {
    e.preventDefault()
    
    if (!validForm()) {
      return
      }

    const result = await addDocument("ItemProductos", { name: name }) //> adicionando publicacion a la coleccion de bdProductos  
    if (!result.statusResponse) {
      setError(result.error)
      return
      }

      setbdProductos([ ...bdProductos, { id: result.data.id, name: task } ]) //> se llama a base de datos y se almacena en memoria
      setname("")
  }

  const saveTask = async(e) => {
    e.preventDefault()
  
    if (!validForm()) {
      return
      }

      const result = 
        await updateDocument(
          "ItemProductos", id, { 
                  //name: task,
                  costo: costo,
                  price: price,
                  descripcion: descripcion,
                  name: name,
                  categoryId: categoryId,
                  visibilidad: visibilidad,
                  stock: Number(stock),
                }) 
      if (!result.statusResponse) { //> !result niega la condicion 
        setError(result.error) //> entonce pinta el error que devuelva el api
        return
      }

    const editedTasks = bdProductos.map(item => item.id === id ? { id, 
      //name: task,
      costo: costo,
      price: price,
      descripcion: descripcion,
      name: name,
      visibilidad: visibilidad,
      categoryId: categoryId,
      stock: Number(stock),
    } : item)
    setbdProductos(editedTasks)
    setEditMode(false)
    //setTask("")
    setId("")
    setvistaPublicaciones("flex")
    setvistaEditor("none")
  }

  const deleteTask = async(id) => {
    const result = await deleteDocument("ItemProductos", id) //> bdProductos indica de cual coleccion va eliminar con el ID que se le pase por parametro 
  if (!result.statusResponse) { //> sino lo pudo borrar 
    setError( result.error) //> entonces pintar el error que esta en result.error
    return
  }

    const filteredTasks = bdProductos.filter(task => task.id !== id)
    setbdProductos(filteredTasks)
    }

    const editTask = (theTask) => {
      //setTask(theTask.name)
      setcosto(theTask.costo)
      setprice(theTask.price)
      setdescripcion(theTask.descripcion)
      setname(theTask.name)
      //setname(theTask.img) error
      setcategoryId(theTask.categoryId)
      setvisibilidad(theTask.visibilidad) 
      setEditMode(true)
      setId(theTask.id)
      setstock(theTask.stock);
      setvistaPublicaciones("none")
      setvistaEditor("flex")
      }

      const volverEdicion = () => { 
        setvistaPublicaciones("flex")
        setvistaEditor("none")
        setvisibilidad("")
        //setTask("")
        setcosto("")
        setprice("")
        settalla("")
        setdescripcion("")
        setname("")
        setcategoryId("")
        setstock(""); 
      } 
      
 return (
    <div className='divPricipalEdicion' >
      <div 
        style={{ alignitems: 'left', display: `${vistaPublicaciones}`, backgroundColor:'#ffffff', width:'100%', cursor:'pointer' }}>
                <Link to="/union-edicion-productos"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>
        <div className="alineacionBarraDeBusquedaEdicionProductos"
             style={{ display: `${vistaPublicaciones}`}}>    
          <BiSearchAlt 
              style={{ position: 'relative', left: 35, top: 18, fontSize:'25px', 
                       color:'#FEBA20'}}/>
          <input
              placeholder="Categoria del producto..." value={criterioBusqueda} 
              onChange={(e) => setcriterioBusqueda(e.target.value.replace(" ", "").toUpperCase())}
              className="casillaBarraDeBusquedaEdicionProductos" />
        </div>
        
      <div 
        style={{ alignitems: 'left', display: `${vistaEditor}`, backgroundColor:'#ffffff', width:'100%', cursor:'pointer' }}>
                <HiArrowNarrowLeft
                onClick={volverEdicion}
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} />
      </div>

        <div className='divPublicacionesEdicion' style={{display: `${vistaPublicaciones}`}}>

      {
        size(bdProductos) === 0 ? (
          <div  className="cargandoEdicionesProductos" > 
          <span className="textoCargandoEdicionesProductos">
            ingresa la categoría en la que este<br/>
            el producto que quieres editar  
          </span>
        </div>
        ) : (
          <div className="alineacionVertical" >
            <div style={{marginTop:'30px'}}/>  
            <div className="estiloListaEdicion" >
           {
              bdProductos.map((task) => ( 
            <div className="alineacionHorizontalEdicion" key={task.id}>
              {task.img ?
                <img 
                className='imagenEdicionProductos'
                src={task.img[0]} />
                  : null}
              <div className="alineacionVertical">
                <span className="textoReferenciaEdicion">{task.categoryId}</span>
                <span className="textoReferenciaEdicion">{task.name}</span>
                <span className="textoReferenciaEdicion">{task.visibilidad}</span>
                <div className='alineacionEditarEliminar'>  
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
                ))
            }
          </div>
          </div>
        )

       }
        </div>
        <div 
          className='alineacionVertical'
          style={{ display: `${vistaEditor}`}} >
          <span className="tituloEditandoEdicion">
          { editMode ? "Modificar publicacion" : "Agregar publicacion" }
          </span>
          <form 
            onSubmit={ editMode ? saveTask : addTask }>
          {
          error && <span className="no">{error}</span>
          }
    <div className="alineacionVertical">  
      <div className='divCasillaEdicionEdicion'>
        <span>categoría :</span>
        <input
          type="text"
          className={classes.camposText}
          placeholder="Editar categoría del producto"
          onChange={(categoryId)=>setcategoryId(categoryId.target.value.replace(" ", "").toUpperCase())}
          value={categoryId.toUpperCase()}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>referencia :</span>  
        <input
          type="text"
          className={classes.camposText}
          placeholder="Editar nombre o referencia"
          onChange={(name)=>setname(name.target.value.toUpperCase())}
          value={name}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>unidades :</span>  
        <input
          type="text"
          className={classes.camposText}
          placeholder="Editar cantidad o unidades"
          onChange={(stock)=>setstock(stock.target.value)}
          value={stock}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>costo :</span>  
        <input
          type="text"
          className={classes.camposText}
          placeholder="Editar costo de compra"
          onChange={(costo)=>setcosto(costo.target.value.replace(".", ""))}
          value={costo}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>precio :</span>  
        <input
          type="text"
          className={classes.camposText}
          placeholder="Editar precio de venta"
          onChange={(price)=>setprice(price.target.value.replace(".", ""))}
          value={price}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>visibilidad :</span>
        <input
          type="text"
          className={classes.camposText}
          placeholder="Cambiar visibilidad"
          onChange={(visibilidad)=>setvisibilidad(visibilidad.target.value.replace(" ", "").toUpperCase())}
          value={visibilidad}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <textarea 
          type="text"
          rows="5"
          cols="35"
          placeholder=' descripción del producto'
          className={classes.camposTextDescripcion}
          onChange={event => setdescripcion(event.target.value)} 
          value={descripcion} 
                  />
      </div>
      <button
        className={classes.botonPublicar}
        type="submit"
      >
        { editMode ? "Guardar" : "Actualizar" }
          </button>
    </div>
        </form>
        </div>
      </div>
  );
}

const useStyles = makeStyles((theme) => ({

  camposText: {
      border:'none', width:'160px',
      padding:'0px 10px 0px 10px', fontSize:'15px',
      color:'#808080'
  },
  botonPublicar: {
      margin: '45px 0px 0px 0px', backgroundColor: '#000000', 
      width: '100px', borderRadius:'15px',
      fontSize:'15px', fontWeight:'bold',
      padding:'10px 0px 10px 0px', color:'#ffffff',
      border: 'none'
  }
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
export default EdicionProductos;

