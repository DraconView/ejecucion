import {useContext} from 'react';
import CartContext from "../../context/CartContext";
import "./../../cssGeneral/CssGeneral.css";
import { MdLocalPhone } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
 
const FlotanteContacto = () => {
   //console.log('llamando a FlotanteContacto')
   const { contextNumeroWhatsapp } = useContext(CartContext);

  return (
     <>
    <div style={{ 
            position: 'fixed', bottom:42, left:15, 
            display: 'flex', flexdirection: 'column' 
      }} >
   <a href={`https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}`} >        
   <img
      src="https://firebasestorage.googleapis.com/v0/b/angystores.appspot.com/o/iconos%2Fboton-whatsapp.svg?alt=media&token=c3d4226e-c7ac-48c0-9144-d6c39f045d74"
      alt="imagen-logo"
      style={{ 
            width:'55px', 
            }} 
      /> </a> 
   </div>
       <div style={{ 
         position: 'fixed', bottom:17, left:80, 
         display: 'flex', flexdirection: 'column' 
   }} >
      <a href='https://www.instagram.com/' >
         <img
      src="https://firebasestorage.googleapis.com/v0/b/angystores.appspot.com/o/iconos%2Fboton-instagram.svg?alt=media&token=32b10973-233c-4632-a9b4-b5c2b3aefd9f"
      alt="imagen-logo"
      style={{ 
            width:'55px', 
            }} 
      /> </a>
         </div>
         </>
  );
}

export default FlotanteContacto 

/*
import { useState } from 'react'

const ComprobarRuta = () => {

  return (
    <>
    <div style={{ backgroundColor: '#808080', height: '100vh' }}> 
    ruta comprobada
    </div>
    </>
  )
}

export default ComprobarRuta 
*/

