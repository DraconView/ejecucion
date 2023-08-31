import {useState, useEffect} from 'react'  //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument  } from '../../../helpers/AccionesbdFire'   
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft} from "react-icons/hi";
import { Button, Modal, makeStyles } from '@material-ui/core';


const EdicionLogo = () => {  
  //console.log('llamando a EdicionLogo');
  const classes = useStyles();

  const [task, setTask] = useState("") //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)  
  const [BdLogo, setBdLogo] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)
  
  const [categoryId, setcategoryId] = useState("")
  const [name, setname] = useState("")

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  useEffect(() => { //useEffect es un metodo asincrono
    (async () => { // aqui se llama una accion para que traiga la data 
    const result = await getCollection("BdLogo")  
    if (result.statusResponse) {
      setBdLogo(result.data) //=> las publicacion vaser igual al resultado que alla obtenido //ATN //console.log(result) para probar que resuelve el resultado 
    }
    })() //el doble parentesis es un metodo asincrono auto ejecutable
  }, [vistaEditor])

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

    const result = await addDocument("BdLogo", { name: name }) //> adicionando publicacion a la coleccion de BdLogo  
    if (!result.statusResponse) {
      setError(result.error)
      return
      }

      setBdLogo([ ...BdLogo, { id: result.data.id, name: task } ]) //> se llama a base de datos y se almacena en memoria
      setname("")
  }

  const saveTask = async(e) => {
    e.preventDefault()
  
    if (!validForm()) {
      return
      }

      const result = 
        await updateDocument(
                "BdLogo", id, { 
                  //name: task,
                  name: name,
                  categoryId: categoryId,
                }) 
      if (!result.statusResponse) { //> !result niega la condicion 
        setError(result.error) //> entonce pinta el error que devuelva el api
        return
      }

    const editedTasks = BdLogo.map(item => item.id === id ? { id, 
      //name: task,
      name: name,
      categoryId: categoryId,
    } : item)
    setBdLogo(editedTasks)
    setEditMode(false)
    //setTask("")
    setId("")
    setvistaPublicaciones("flex")
    setvistaEditor("none")
  }

  const deleteTask = async(id) => {
    const result = await deleteDocument("BdLogo", id) //> BdLogo indica de cual coleccion va eliminar con el ID que se le pase por parametro 
  if (!result.statusResponse) { //> sino lo pudo borrar 
    setError( result.error) //> entonces pintar el error que esta en result.error
    return
  }

    const filteredTasks = BdLogo.filter(task => task.id !== id)
    setBdLogo(filteredTasks)
    }
 
    const editTask = (theTask) => {
      //setTask(theTask.name)
      setname(theTask.name)
      setcategoryId(theTask.categoryId) 
      setEditMode(true)
      setId(theTask.id)
      setvistaPublicaciones("none")
      setvistaEditor("flex")
      }

      const volverEdicion = () => { 
        setvistaPublicaciones("flex")
        setvistaEditor("none")
        //setTask("")
        setname("")
        setcategoryId("") 
      } 
      
 return (
    <div className='divPricipalEdicion' >
      <div 
        style={{ alignitems: 'left', display: `${vistaPublicaciones}`, backgroundColor:'#ffffff', width:'100%', cursor:'pointer' }}>
                <Link to="/union-edicion-logo"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>
      <div 
        style={{ alignitems: 'left', display: `${vistaEditor}`, backgroundColor:'#ffffff', width:'100%', cursor:'pointer' }}>
                <HiArrowNarrowLeft
                onClick={volverEdicion}
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} />
      </div>

        <div className='divPublicacionesEdicion' style={{display: `${vistaPublicaciones}`}}>

      {
        size(BdLogo) === 0 ? (
          <div  className="cargandoEdiciones" > 
          <span className="textoCargandoEdiciones">
            Cargando... 
          </span>
        </div>
        ) : (
          <div className="alineacionVertical" >
              <div className='divBarraTitulos'>
                <span className='textoBarraTitulos'>
                Edición 
                </span> 
              </div>
            <div style={{marginTop:'30px'}}/>  
            <div className="estiloListaEdicion" >

           {
              BdLogo.map((task) => ( 
            <div className="alineacionHorizontalEdicion" key={task.id}>
              <img
                className="imagenEdicion" 
                src={task.img} />
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
          placeholder="Ingrese la categoría..."
          onChange={(categoryId)=>setcategoryId(categoryId.target.value.toLowerCase())}
          value={categoryId.toLowerCase()}
        />
      </div>
      <div className='divCasillaEdicionEdicion'>
        <span>referencia :</span>  
        <input
          type="text"
          className={classes.camposText}
          placeholder="Ingrese la referencia..."
          onChange={(name)=>setname(name.target.value.toUpperCase())}
          value={name}
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
      border: 'none',
      cursor: 'pointer'
  }
}));

// para editar asegurarse que esten los campos creados en la base de datos 

export default EdicionLogo;

