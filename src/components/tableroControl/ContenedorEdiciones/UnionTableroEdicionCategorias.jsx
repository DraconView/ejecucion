import { useState } from 'react'
import './../../../cssGeneral/CssGeneral.css'
import { Link } from 'react-router-dom'
//import logoPrincipal from "../../../recursosMultimedia/logo2.png";

import { HiArrowNarrowLeft} from "react-icons/hi";


const UnionTableroEdicionCategorias = () => {
   //console.log('llamando a UnionTableroEdicionCategorias');
  return (
    <>              
      <div 
         style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
          <Link to="/tablero-administrador"> 
          <HiArrowNarrowLeft
          style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>
      <div className='divContenedorEdiciones' >
         <div className='divBarraTitulos' >
            <span className='textoBarraTitulos'>
               crea o edita categorías
            </span>
         </div>
         <div style={{marginTop:'120px'}}/>
         <Link to="/crear-categorias-productos" style={{textDecoration: 'none'}}>
            <div className='divOpcionesEditar'  >
               <span className='textoGris15700'>
                  crear categorías
               </span>
            </div>
         </Link>
         <Link to="/edicion-categorias-inicio" style={{textDecoration: 'none'}}>
            <div className='divOpcionesEditar' >
               <span className='textoGris15700'>
                  editar categorías
               </span>
            </div>
         </Link>
      </div>
    </>
  )
}

export default UnionTableroEdicionCategorias 