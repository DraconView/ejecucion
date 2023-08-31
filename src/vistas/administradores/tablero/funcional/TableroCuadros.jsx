import { useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import logoPrincipal from "../../../recursosMultimedia/logo2.png";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { BsYoutube, BsVectorPen } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import {
  MdOutlineCategory,
  MdContentPaste,
  MdPersonSearch,
} from "react-icons/md";
import { IoLogoDesignernews } from "react-icons/io";
import { FaMagic } from "react-icons/fa";
import { BsJournalArrowUp } from "react-icons/bs";
import {
  AiOutlinePartition,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { RiServiceLine } from "react-icons/ri";

const TableroCuadros = () => {
 //console.log('llamando a TableroCuadros');
  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  return (
    <>
      <div className="alineacionVertical">
        <div className="divBienvenidaCuadros">
          <div className="divHola">
            <span className="hola">¡HOLA!</span>
            <span className="esteEs">Este es tu panel de control</span>
          </div>
          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="contenedorOpcionesVistaCuadros">
              <div className="divOpcionesVistaCuadros">
                <span className="textoVistaCuadrosClick">
                  más explicación de las opciones clic
                </span>
                <span className="textoVistaCuadrosAqui">Aquí</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="contenedorDivider">
          <div className="divDividerTableroUno" />
          <div className="divTextoDividerTablero">
            <span className="textoDividerTablero">servicios</span>
          </div>
          <div className="divDividerTableroDos" />
        </div>

        <div className="alineacionServiciosCuadros">
          <Link
            to="/opciones-usuarios"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoCuadros">
              <AiOutlineUser className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">buscar</span>
            </div>{" "}
          </Link>
          <Link to="/opciones-servicios" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoCuadros">
              <RiServiceLine className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">servicios</span>
            </div>{" "}
          </Link>
        </div>

        <div className="contenedorDivider">
          <div className="divDividerTableroUno" />
          <div className="divTextoDividerTablero">
            <span className="textoDividerTablero">productos</span>
          </div>
          <div className="divDividerTableroDos" />
        </div>

        <div className="alineacionServiciosCuadros">
          <Link
            to="/union-edicion-productos"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoCuadros">
              <MdOutlineAddAPhoto className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">productos</span>
            </div>{" "}
          </Link>
          <Link
            to="/union-edicion-categorias"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoCuadros">
              <AiOutlinePartition className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">categorías</span>
            </div>{" "}
          </Link>

          <Link to="/catalogo" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoCuadros">
              <MdStorefront className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">catalogo</span>
            </div>{" "}
          </Link>
          <a
            style={{ textDecoration: "none" }}
            href="https://draconprojects.web.app/"
          >
            <div className="cuadrosServiciosActivoCuadros">
              <FaMagic className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">magic</span>
            </div>{" "}
          </a>
          <Link to="/deposito" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoCuadros">
              <MdContentPaste className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">deposito</span>
            </div>{" "}
          </Link>

          <Link to="/edicion-recibo-ventas" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoCuadros">
              <MdOutlineMonetizationOn className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">ventas</span>
            </div>{" "}
          </Link>
        </div>

        <div className="contenedorDivider">
          <div className="divDividerTableroUno" />
          <div className="divTextoDividerTablero">
            <span className="textoDividerTablero">soporte</span>
          </div>
          <div className="divDividerTableroDos" />
        </div>

        <div className="alineacionServiciosCuadros">
          <a
            style={{ textDecoration: "none" }}
            href="https://www.youtube.com/playlist?list=PLJh5y3y9P5-qjSkrY8sUo7H6vymPdsskY"
          >
            <div className="cuadrosServiciosActivoCuadros">
              <BsYoutube className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">manual</span>
            </div>{" "}
          </a>
          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoCuadros">
              <MdSupportAgent className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">soporte</span>
            </div>{" "}
          </a>
          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoCuadros">
              <BsVectorPen className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">creativos</span>
            </div>{" "}
          </a>
          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoCuadros">
              <MdOutlineCampaign className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">marketing</span>
            </div>{" "}
          </a>
        </div>

        <div className="contenedorDivider">
          <div className="divDividerTableroUno" />
          <div className="divTextoDividerTablero">
            <span className="textoDividerTablero">personalización</span>
          </div>
          <div className="divDividerTableroDos" />
        </div>

        <div className="alineacionServiciosCuadros">
          <Link to="/union-edicion-logo" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoCuadros">
              <IoLogoDesignernews className="estiloIconosTableroActivo" />
              <span className="textoServiciosActivoCuadros">logo</span>
            </div>{" "}
          </Link>
        </div>

        <div className="contenedorDivider">
          <div className="divDividerTableroUno" />
          <div className="divTextoDividerTablero">
            <span className="textoDividerTablero">futuro</span>
          </div>
          <div className="divDividerTableroDos" />
        </div>

        <div className="alineacionServiciosCuadros">
          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivoCuadros">
              <MdOutlineConnectWithoutContact className="estiloIconosTableroInactivo" />
              <span className="textoServiciosInactivoCuadros">equipo</span>
            </div>{" "}
          </Link>
          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivoCuadros">
              <BsJournalArrowUp className="estiloIconosTableroInactivo" />
              <span className="textoServiciosInactivoCuadros">agenda</span>
            </div>{" "}
          </Link>
          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivoCuadros">
              <MdOutlineLocalShipping className="estiloIconosTableroInactivo" />
              <span className="textoServiciosInactivoCuadros">envíos</span>
            </div>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default TableroCuadros;

/*

        <Link to="/tablero-administrador" style={{textDecoration: 'none'}}>
        <div className='cuadrosServiciosInactivoCuadros'>
            <ReceiptLongOutlinedIcon 
                sx={{ fontSize: 35, color: '#000000' }} />
            <span className='textoServiciosInactivoCuadros'>
                recibos</span> 
        </div> </Link>

    <div className="divLogoLoginTablero" >
            <div style={{ justifyycontent: 'center', alignitems: 'center', display: 'flex'}}>
                <img
                src="https://firebasestorage.googleapis.com/v0/b/catalogodracon.appspot.com/o/tu%20logo%20aqui%20jpg.jpg?alt=media&token=9acea295-b113-4c1c-be22-c1297b3c959b"
                alt="imagen-logo"
                style={{height:'80px'}}
                />
            </div>
          </div>

                  <Link to="/ContenedorEdiciones" style={{textDecoration: 'none'}}>
        <div className='cuadrosServiciosActivoCuadros'>
            <ModeIcon 
                sx={{ fontSize: 32, color: '#000000' }} />
            <span className='textoServiciosActivoCuadros'>
            edición</span> 
        </div> </Link>

        <Link to="/tablero" style={{textDecoration: 'none'}}>
        <div className='cuadrosServiciosInactivoCuadros'>
            <QrCodeScannerIcon 
                sx={{ fontSize: 32, color: '#000000' }} />
            <span className='textoServiciosInactivoCuadros'>
                generador</span> 
        </div> </Link>

                    <CommentOutlinedIcon 
                sx={{ fontSize: 30, color: '#000000' }} />
            <span className='textoServiciosActivoCuadros'>
                comentario</span> 
                
        <Link to="/contacto" style={{textDecoration: 'none'}}>
        <div className='cuadrosServiciosActivoCuadros'>
        <img 
            src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Fintegraciones.svg?alt=media&token=deb7cf71-c7ff-4ec4-b53a-3632b47a5ba2"
            alt="imagen-logo" 
            style={{ height:'26px' , color: '#000000', margin:'2px 0px 0px 0px' }} />
            <span className='textoServiciosActivoCuadros'>
                integrar</span> 
        </div> </Link>

                <Link to="/tablero-administrador" style={{textDecoration: 'none'}}>
        <div className='cuadrosServiciosInactivoCuadros'>
            <ColorLensOutlinedIcon 
                sx={{ fontSize: 40, color: '#000000' }} />
            <span className='textoServiciosInactivoCuadros'>
                color</span> 
        </div> </Link>
        
*/
