import { useState } from 'react'
import './../../../cssGeneral/CssGeneral.css'
import { Link } from 'react-router-dom'
//import logoPrincipal from "../../../recursosMultimedia/logo2.png";

import { HiArrowNarrowLeft} from "react-icons/hi";


const UnionTableroEdicionProductos = () => {
   //console.log('llamando a UnionTableroEdicionProductos');
  return (
    <>              
      <div 
         style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
          <Link to="/tablero-administrador"> 
          <HiArrowNarrowLeft
          style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>
      <div className='divContenedorEdiciones' >
         <div className='divBarraTitulos'>
            <span className='textoBarraTitulos'>
               crea o edita productos
            </span>
         </div>
         <Link to="/crear-item-produtos" style={{textDecoration: 'none'}}>
         <div style={{marginTop:'120px'}}/>
            <div className='divOpcionesEditar' >
               <span className='textoGris15700'>
                  crear producto
               </span>
            </div>
         </Link>
         <Link to="/edicion-productos" style={{textDecoration: 'none'}}>
            <div className='divOpcionesEditar' >
               <span className='textoGris15700'>
                  editar producto
               </span>
            </div>
         </Link>
      </div>
    </>
  )
}

export default UnionTableroEdicionProductos 