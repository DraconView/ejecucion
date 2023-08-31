import { useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import logoPrincipal from "../../../recursosMultimedia/logo2.png";
import { db, auth, storage } from "../../../../firebase/index";

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

//         <TableroAdministrador username={user.displayName} userId={userId} />

const TableroAdministrador = () => {

/*useEffect(() => {
  if (props.userId === undefined) {
    props.history.push("/login-tablero"); // esta linea es para que si no esta logueado lo redireccione al login
  } else {
   //console.log( props.userId , "props.userId");
  }
}, [props.userId]);*/


  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  return (
    <>
      <div className="alineacionVertical">
        <div className="alineacionHorizontal">
          <Link to="/"
            className="divIzquierdaColumn100"
            style={{ margin: "20px 0px 0px 30px" }}>
            <HiArrowNarrowLeft className="iconoAccion" />
          </Link>
          <div 
            className="divIconoCerrarSesion"
            style={{ margin: "20px 30px 0px 0px" }}
            onClick={() => auth.signOut()}>
            <BiExit className="iconoAccion" />
          </div>
        </div>

        <div className="divBienvenidaCuadros">
          <div className="divHola">
            <span className="hola">¡HOLA!</span>
            <span className="esteEs">Este es tu panel de control</span>
          </div>
          <Link to="/tablero-cuadros" style={{ textDecoration: "none" }}>
            <div className="contenedorOpcionesVistaCuadros">
              <div className="divOpcionesVistaCuadros">
                <span className="textoVistaCuadrosClick">
                  volver a las opciones resumidas clic
                </span>
                <span className="textoVistaCuadrosAqui">Aquí</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="alineacionServicios">

        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdStorefront className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Catalogo:</span>
                <span className="textoServiciosActivoContexto">
                  volver a tu catalogo
                </span>
              </div>
            </div>
          </Link>

{/* OPCIONES DE SERVICIOS */}

          <Link
            to="/opciones-usuarios"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <AiOutlineUser className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Clientes:</span>
                <span className="textoServiciosActivoContexto">
                  agregar, buscar, editar
                </span>
              </div>
            </div>
          </Link>
          <Link
            to="/opciones-servicios"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <RiServiceLine className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Servicios:</span>
                <span className="textoServiciosActivoContexto">
                  Crear, editar, desactivar
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/opciones-de-horarios"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdMoreTime className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Horarios citas:</span>
                <span className="textoServiciosActivoContexto">
                  Crear, editar, desactivar
                </span>
              </div>
            </div>
          </Link>

          <Link
            to="/crear-ciudad-citas"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <FaCity className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Crear ciudad:</span>
                <span className="textoServiciosActivoContexto">
                  Crear, editar, desactivar
                </span>
              </div>
            </div>
          </Link>

{/* OPCIONES DE PRODUCTOS */}

          <Link
            to="/opciones-productos"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdOutlineAddAPhoto className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Productos:</span>
                <span className="textoServiciosActivoContexto">
                  agregar, editar, eliminar
                </span>
              </div>
            </div>
          </Link>
          <Link
            to="/opciones-categorias"
            style={{ textDecoration: "none" }}
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <AiOutlinePartition className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Categorías:</span>
                <span className="textoServiciosActivoContexto">
                  agregar, editar, eliminar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/deposito" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdContentPaste className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Deposito:</span>
                <span className="textoServiciosActivoContexto">
                  verifica tus inventarios
                </span>
              </div>
            </div>
          </Link>

          <Link to="/edicion-recibo-ventas" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdOutlineMonetizationOn className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Ventas:</span>
                <span className="textoServiciosActivoContexto   ">
                  revisar ordenes de compra
                </span>
              </div>
            </div>
          </Link>

{/* OPCIONES DE PERSONALIZACION */}

          <Link to="/opciones-logo" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <IoLogoDesignernews className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Logo:</span>
                <span className="textoServiciosActivoContexto">
                  agregar o eliminar
                </span>
              </div>
            </div>
          </Link>

          <a
            style={{ textDecoration: "none" }}
            href="https://draconprojects.web.app/"
          >
            <div className="cuadrosServiciosInactivo">
              <div className="divIcocnoTableroLista">
                <FaMagic className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Magic:</span>
                <span className="textoServiciosActivoContexto">
                elimina los fondos en imágenes
                </span>
              </div>
            </div>
          </a>

{/* OPCIONES DE SOPORTE */}

<a
            style={{ textDecoration: "none" }}
            href="https://www.youtube.com/playlist?list=PLJh5y3y9P5-qjSkrY8sUo7H6vymPdsskY"
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <BsYoutube className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Manual:</span>
                <span className="textoServiciosActivoContexto">
                información de funciones
                </span>
              </div>
            </div>
          </a>

          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdSupportAgent className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Soporte:</span>
                <span className="textoServiciosActivoContexto">
                  contactar equipo soporte
                </span>
              </div>
            </div>
          </a>

{/* SERVICOS EXTRAS */}

          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <BsVectorPen className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Creativos:</span>
                <span className="textoServiciosActivoContexto">
                  logos, flyer, edicion video
                </span>
              </div>
            </div>
          </a>
          <a
            style={{ textDecoration: "none" }}
            href="https://api.whatsapp.com/send?phone=573163782780"
          >
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdOutlineCampaign className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Marketing:</span>
                <span className="textoServiciosActivoContexto">
                  activar campañas pagas
                </span>
              </div>
            </div>
          </a>

{/* PROXIMAS FUNCIONES */}

          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivo">
              <div className="divIcocnoTableroLista">
                <MdOutlineConnectWithoutContact className="estiloIconosTableroInactivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosInactivo">Equipo:</span>
                <span className="textoServiciosInactivoContexto">
                  contactos de personal
                </span>
              </div>
            </div>
          </Link>
          <Link to="/tabltablero-listaero" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivo">
              <div className="divIcocnoTableroLista">
                <BsJournalArrowUp className="estiloIconosTableroInactivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosInactivo">Agenda:</span>
                <span className="textoServiciosInactivoContexto">
                  preparar lista de tareas
                </span>
              </div>
            </div>
          </Link>
          <Link to="/tablero-administrador" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosInactivo">
              <div className="divIcocnoTableroLista">
                <MdOutlineLocalShipping className="estiloIconosTableroInactivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosInactivo">Envios:</span>
                <span className="textoServiciosInactivoContexto">
                  seguimiento de ordenes
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TableroAdministrador;

/* todas las funciones de los botones 

Catalogo: volver a tu catalogo

servicios:
Clientes: agregar, buscar, editar
Servicios: agregar, buscar, editar
Horarios: agregar, buscar, editar
Crear ciudad: agregar, buscar, editar

Productos
Productos: agregar, buscar, editar
Categorias: agregar, buscar, editar
Deposito: agregar, buscar, editar

Ventas: agregar, buscar, editar

personaliazacion: 
Logo: agregar o eliminar
Magic: elimina los fondos en imagenes

soporte:
Manual: informacion de funciones
Soporte: contactar equipo dracon

Creativos:
logos, flyer, edicion video
Marketing: activar campañas pagas

Equipo: contactos de personal
Agenda: preparar lista de tareas
Envios: seguimiento de ordenes

-- las funciones que faltan son:
Equipo: contactos de personal
Agenda: preparar lista de tareas
Envios: seguimiento de ordenes
-- a futuro se deben crear funciones como:
Cotizaciones: agregar, buscar, editar
Facturas: agregar, buscar, editar
reportes: agregar, buscar, editar
informes: agregar, buscar, editar
opciones de pago: agregar, buscar, editar
seguridad: agregar, buscar, editar
jornada laboral: agregar, buscar, editar
notificaciones: agregar, buscar, editar
mensajes: agregar, buscar, editar
*/

/* el creador de esta plataforma es un joven emprendedor 
que busca ayudar a los demas a crecer 
en el mundo de los negocios */
