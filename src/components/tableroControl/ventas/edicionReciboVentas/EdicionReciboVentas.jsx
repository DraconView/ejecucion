import { useState, useEffect } from 'react'  //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument } from '../../../../helpers/AccionesbdFire' 
import './../../../../cssGeneral/CssGeneral.css'
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Button, Modal, makeStyles } from '@material-ui/core';
import { db, auth, storage } from '../../../../firebase'

import { AiOutlineCaretUp } from "react-icons/ai";
import { MdOutlineLocalShipping, MdOutlineMonetizationOn, MdLocalPhone, MdOutlineLibraryAddCheck } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";

const EdicionReciboVentas = () => {
  //console.log('llamando a EdicionReciboVentas');
  const classes = useStyles();

  const [task, setTask] = useState("") //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)  
  const [orders, setorders] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [name, setname] = useState("")
  const [estatusPago, setestatusPago] = useState("")
  const [estatusDespacho, setestatusDespacho] = useState("")
  const [numeroGuia, setnumeroGuia] = useState("")
  const [direccion, setdireccion] = useState("")

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  useEffect(() => {
    (async () => {
      const result = await getCollection("orders")
      if (result.statusResponse) {
        setorders(result.data)
      }
    })()
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

  const addTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await addDocument("orders", { name: name }) //> adicionando publicacion a la coleccion de orders  
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    setorders([...orders, { id: result.data.id, name: task }]) //> se llama a base de datos y se almacena en memoria
    setname("")
  }

  const saveTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result =
      await updateDocument(
        "orders", id, {
        //name: task,
        estatusPago: estatusPago,
        estatusDespacho: estatusDespacho,
        numeroGuia: numeroGuia,
        direccion: direccion,
        name: name,
      })
    window.location.reload();
    if (!result.statusResponse) { //> !result niega la condicion 
      setError(result.error) //> entonce pinta el error que devuelva el api
      return
    }

    const editedTasks = orders.map(item => item.id === id ? {
      id,
      //name: task,
      estatusPago: estatusPago,
      estatusDespacho: estatusDespacho,
      numeroGuia: numeroGuia,
      direccion: direccion,
      name: name,
    } : item)
    setorders(editedTasks)
    setEditMode(false)
    //setTask("")
    setId("")
    setvistaPublicaciones("flex")
    setvistaEditor("none")
  }

  const deleteTask = async (id) => {
    const result = await deleteDocument("orders", id) //> orders indica de cual coleccion va eliminar con el ID que se le pase por parametro 
    if (!result.statusResponse) { //> sino lo pudo borrar 
      setError(result.error) //> entonces pintar el error que esta en result.error
      return
    }

    const filteredTasks = orders.filter(task => task.id !== id)
    setorders(filteredTasks)
  }

  const editTask = (theTask) => {
    //setTask(theTask.name)
    setestatusPago(theTask.estatusPago)
    setestatusDespacho(theTask.estatusDespacho)
    setnumeroGuia(theTask.numeroGuia)
    setdireccion(theTask.direccion)
    setname(theTask.name)
    setEditMode(true)
    setId(theTask.id)
    setvistaPublicaciones("none")
    setvistaEditor("flex")
  }

  const volverEdicion = () => {
    setvistaPublicaciones("flex")
    setvistaEditor("none")
    //setTask("")
    setestatusPago("")
    setestatusDespacho("")
    setnumeroGuia("")
    setdireccion("")
    setname("")
  }

  return (
    <div className='divPricipalEdicion' >
      <div
        style={{ alignitems: 'left', display: `${vistaPublicaciones}`, backgroundColor: '#ffffff', width: '100%', cursor: 'pointer' }}>
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            style={{ fontSize: '35px', margin: '15px 0px 0px 15px', color: '#646464' }} /></Link>
      </div>
      <div
        style={{ alignitems: 'left', display: `${vistaEditor}`, backgroundColor: '#ffffff', width: '100%', cursor: 'pointer' }}>
        <HiArrowNarrowLeft
          onClick={volverEdicion}
          style={{ fontSize: '35px', margin: '15px 0px 0px 15px', color: '#646464' }} />
      </div>

      <div className='divPublicacionesEdicion2' style={{ display: `${vistaPublicaciones}` }}>

        {
          size(orders) === 0 ? (
            <div className="cargandoEdiciones" >
              <span className="textoCargandoEdiciones">
                Cargando...
              </span>
            </div>
          ) : (
            <div className="divEstiloListaEdicion2" >
              <div className='divBarraTitulos'>
                <span className='textoBarraTitulos'>
                  visualiza y edita
                </span>
              </div>
              <div style={{ marginTop: '40px' }} />
              <div className="estiloListaEdicion" >

                {
                  orders.map((task) => (
                    <div className="divPrincipalFuncionesVentas" key={task.id}>
                      <div className="referenciaBotonesEdicion2">
                        <div className="divClienteRecibo">
                        <span   
                            className="c585858fs17fw700u"
                            style={{ margin: "0px 0px 0px 5px" }}
                            >
                            {task.buyer['firstName']}
                          </span>
                        </div>
                        <div
                          className="divEditIcon"
                          onClick={() => editTask(task)}
                        >
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
                          <BsCalendarDate
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                            fecha: {task.fechaLegible}{task.horaLegible}
                          </span>
                        </div>
                        <div className="divEstatusPago">
                          <MdLocalPhone
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                          teléfono: {task.buyer['phone']}
                          </span>
                        </div>
                        <div className="divEstatusPago">
                          <MdOutlineMonetizationOn
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                            pago: {task.estatusPago}
                          </span>
                        </div>
                        <div className="divEstatusPago">
                          <MdOutlineLibraryAddCheck
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                            despacho: {task.estatusDespacho}
                          </span>
                        </div>
                        <div className="divEstatus" style={{ margin: '10px 0px 5px 0px' }}>
                          <MdOutlineLocalShipping
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                            N.º guía: {task.numeroGuia}
                          </span>
                        </div>
                        <div className="divEstatus" style={{ margin: '10px 0px 5px 0px' }}>
                          <GoLocation
                            sx={{ fontSize: 20, color: '#808080' }} />
                          <span className="textoEstatusPago">
                          dirección: {task.direccion}
                          </span>
                        </div>
                      </div>
                      <Link to={`/recibo-tablero/${task.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                        <div className="divVerRecibo">
                          <span className="textoVerRecibo">
                            ver recibo
                          </span>
                        </div>
                      </Link>
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
        style={{ display: `${vistaEditor}` }} >
        <span className="tituloEditandoEdicion">
          {editMode ? "Modificar publicacion" : "Agregar publicacion"}
        </span>
        <form
          onSubmit={editMode ? saveTask : addTask}>
          {
            error && <span className="no">{error}</span>
          }
          <div className="alineacionVertical">
            <div className='divCasillaEdicionEdicion'>
              <span>pago :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Estatus o forma de pago..."
                onChange={(estatusPago) => setestatusPago(estatusPago.target.value.toUpperCase())}
                value={estatusPago}
              />
            </div>
            <div className='divCasillaEdicionEdicion'>
              <span>despacho :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Estatus de despacho"
                onChange={(estatusDespacho) => setestatusDespacho(estatusDespacho.target.value.toUpperCase())}
                value={estatusDespacho}
              />
            </div>
            <div className='divCasillaEdicionEdicion'>
              <span>N.º guia :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Numero de guia"
                onChange={(numeroGuia) => setnumeroGuia(numeroGuia.target.value.toUpperCase())}
                value={numeroGuia}
              />
            </div>
            <div className='divCasillaEdicionEdicion'>
              <span>dirección :</span>
              <input
                type="text"
                className={classes.camposText}
                placeholder="Ingrese la direccion..."
                onChange={(direccion) => setdireccion(direccion.target.value.toUpperCase())}
                value={direccion}
              />
            </div>
            <button
              className={classes.botonPublicar}
              type="submit"
            >
              {editMode ? "Guardar" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({

  camposText: {
    border: 'none', width: '160px',
    padding: '0px 10px 0px 10px', fontSize: '15px',
    color: '#808080'
  },
  botonPublicar: {
    margin: '45px 0px 0px 0px', backgroundColor: '#000000',
    width: '100px', borderRadius: '15px',
    fontSize: '15px', fontWeight: 'bold',
    padding: '10px 0px 10px 0px', color: '#ffffff',
    border: 'none'
  }
}));

// para editar asegurarse que esten los campos creados en la base de datos 
/*
            <input
        type="text"
        className={classes.camposText}
        placeholder="Ingrese el precio"
        onChange={(price)=>setprice(price.target.value)}
        value={'pecio: '+ price}
      />
*/
export default EdicionReciboVentas;

