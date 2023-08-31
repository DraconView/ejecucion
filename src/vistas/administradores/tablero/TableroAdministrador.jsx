import { useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { useHistory, Link } from "react-router-dom";
import logoPrincipal from "../../../recursosMultimedia/logo2.png";
import { db, auth, storage } from "./../../../firebase/index";

import { BiExit } from "react-icons/bi";
import { HiArrowNarrowLeft } from "react-icons/hi";

import { MdOutlineAddAPhoto, MdMoreTime } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { BsYoutube, BsVectorPen, BsJournalArrowUp } from "react-icons/bs";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { MdOutlineCategory, MdContentPaste } from "react-icons/md";
import { IoLogoDesignernews } from "react-icons/io";
import { AiOutlinePartition, AiOutlineUserAdd, AiOutlineUser, } from "react-icons/ai";
import { RiServiceLine } from "react-icons/ri";
import { SiOneplus } from "react-icons/si";
import { FaCity, FaUserCog, FaMagic, FaUsers } from "react-icons/fa";
import { RiUserShared2Line } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";

const TableroAdministrador = ({ user }) => {
  //console.log('llamando a TableroAdministrador');
  const history = useHistory();

  /*useEffect(() => {
    if (user === null) {
      history.replace("/");
      //history.push("/");
    } else {
      //console.log(user, "user");
    }
  }, [user, history]);*/

  const cerrarSesion = () => {
    auth.signOut();
    history.replace("/");
  };

  const [numeroCreativos, setnumeroCreativos] = useState("");

  let nombreSoftware = "restaurantes";

  useEffect(() => {
    if (nombreSoftware === "skinlaser") {
      setnumeroCreativos("https://api.whatsapp.com/send?phone=573225293685");
    } else (
      setnumeroCreativos("https://api.whatsapp.com/send?phone=573163782780")
    )
  }, [nombreSoftware]);

  return (
    <>
      <div className="alineacionVertical">
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
            <span className="esteEs">
              Este es el panel de control para administradores
            </span>
          </div>
          <div className="contenedorOpcionesVistaCuadros">
            <div className="divOpcionesVistaCuadros">
              <span className="textoVistaCuadrosClick">
                cualquier servicio necesario coméntanos
              </span>
              <span className="textoVistaCuadrosAqui">Aquí</span>
            </div>
          </div>
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
          <Link to="/opciones-servicios" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <RiServiceLine className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Servicios:</span>
                <span className="textoServiciosActivoContexto">
                  crear, editar, desactivar
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
                <span className="textoServiciosActivoLista">
                  Horarios citas:
                </span>
                <span className="textoServiciosActivoContexto">
                  crear, editar, eliminar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/opciones-de-ciudades" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <FaCity className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Ciudades:</span>
                <span className="textoServiciosActivoContexto">
                  crear, editar, eliminar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/opciones-de-ciudades" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <FaUsers className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Asistentes:</span>
                <span className="textoServiciosActivoContexto">
                  crear, editar, eliminar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/registro-rol" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <FaUserCog className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Crear rol:</span>
                <span className="textoServiciosActivoContexto">
                  crear, editar, desactivar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/opciones-productos" style={{ textDecoration: "none" }}>
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

          <Link to="/opciones-categorias" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <AiOutlinePartition className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Categorias:</span>
                <span className="textoServiciosActivoContexto">
                  agregar, editar, eliminar
                </span>
              </div>
            </div>
          </Link>

          <Link to="/opciones-de-mercadopago" style={{ textDecoration: "none" }}>
            <div className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <MdOutlineMonetizationOn className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Elaces pagos:</span>
                <span className="textoServiciosActivoContexto   ">
                  crear, editar, eliminar
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

          <Link to="/analitica" style={{ textDecoration: "none" }}>
            <div /*aqui*/ className="cuadrosServiciosActivoLista">
              <div className="divIcocnoTableroLista">
                <IoAnalyticsOutline className="estiloIconosTableroActivo" />
              </div>
              <div className="divTextoServiciosActivoLista">
                <span className="textoServiciosActivoLista">Analiticas:</span>
                <span className="textoServiciosActivoContexto">
                  analiza tus ventas
                </span>
              </div>
            </div>
          </Link>

          {/* OPCIONES DE PERSONALIZACION */}

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
                  contactar equipo de soporte
                </span>
              </div>
            </div>
          </a>

          {/* SERVICOS EXTRAS */}

          <a
            style={{ textDecoration: "none" }}
            href={numeroCreativos}
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

/*
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
                remover fondo en imágenes
                </span>
              </div>
            </div>
          </a>

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
          
          */

export default TableroAdministrador;
