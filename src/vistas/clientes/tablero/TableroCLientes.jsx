import { useContext, useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { useHistory, Link } from "react-router-dom";
import logoPrincipal from "../../../recursosMultimedia/logo2.png";
import { db, auth, storage } from "../../../firebase/index";
import BdLogo from "../../../components/LogoBd/BdLogo";
import CartContext from "../../../context/CartContext";

import { BiExit } from "react-icons/bi";
import { HiArrowNarrowLeft } from "react-icons/hi";

import { MdOutlineAddAPhoto, MdMoreTime } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { BsYoutube, BsVectorPen } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { BsJournalArrowUp } from "react-icons/bs";
import { MdOutlineCategory, MdContentPaste } from "react-icons/md";
import { IoLogoDesignernews } from "react-icons/io";
import { FaMagic } from "react-icons/fa";
import {
  AiOutlinePartition,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { RiServiceLine } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaCity } from "react-icons/fa";
import { RiUserShared2Line } from "react-icons/ri";

const TableroClientes = ({ user }) => {
 //console.log('llamando a TableroClientes');
 const { contextUsuarioLogueado } = useContext(CartContext);
 const history = useHistory();

 /*if (user === null) {
      history.replace("/");
      //  history.push("/");
      //console.log(user, "no hay usuario");
    } else {
      //console.log(user, "si hay usuario");
    }*/

    const cerrarSesion = () => {
      auth.signOut();
      history.replace("/");
    };

  return (
    <>
      <div className="alineacionVerticalPantallaCompleta">
        <div className="alineacionHorizontal">
              <Link
                to="/"
                className="divIzquierdaColumn100"
                style={{ margin: "20px 0px 0px 15px", textDecoration: "none" }}
              >
                <HiArrowNarrowLeft className="iconoAccion" />
                <span
                  style={{ margin: "0px 0px 0px 0px" }}
                  className="textoCerrarSesion"
                >
                  volver
                </span>
              </Link>
          <div
            className="divIconoCerrarSesion"
            style={{ margin: "20px 15px 0px 0px" }}
            onClick={() => cerrarSesion()}
          >
            <RiUserShared2Line
              className="iconoAccion"
              style={{ margin: "0px 0px 0px 0px" }}
            />
            <span
              style={{ margin: "0px 5px 0px 0px" }}
              className="textoCerrarSesion"
            >
              salir
            </span>
          </div>
        </div>

        <div className="divBienvenidaCuadros">
          <div className="divHola">
            <span className="hola">¡HOLA!</span>
            <span className="esteEs">Este es tu tablero de seguimiento</span>
          </div>
            <div className="contenedorOpcionesVistaCuadros">
              <div className="divOpcionesVistaCuadros">
                <span className="textoVistaCuadrosClick">
                  si necesitas algo no dudes en contactarnos
                </span>
              </div>
            </div>
        </div>

        <div className="alineacionServicios">

          {/* OPCIONES DE SERVICIOS */}

          <Link
            to="/mis-servicios"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <RiServiceLine className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Mis servicios:</span>
                <span className="textoServiciosActivoContexto">
                  continuar agendados
                </span>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdMoreTime className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">
                  Agendar nuevo:
                </span>
                <span className="textoServiciosActivoContexto">
                  agregar otro servicio
                </span>
              </div>
            </div>
          </Link>
          <Link
            to="/mi-perfil"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <AiOutlineUser className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Mi perfil:</span>
                <span className="textoServiciosActivoContexto">
                  ver, editar
                </span>
              </div>
            </div>
          </Link>

          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=59891853283"
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdSupportAgent className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Soporte:</span>
                <span className="textoServiciosActivoContexto">
                  contactar equipo 
                </span>
              </div>
            </div>
          </a>

        </div>

        <div style={{ margin: "auto auto 0px auto" }}>
          <BdLogo altura={70} />
          </div>

      </div>
    </>
  );
};

export default TableroClientes;

