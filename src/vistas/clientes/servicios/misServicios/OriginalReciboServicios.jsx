import { useState, useEffect, useContext } from "react";
import CartContext from "../../../../context/CartContext";
import "./../../../../cssGeneral/CssGeneral.css";
import { db } from "../../../../firebase";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import BdLogo from "../../../../components/LogoBd/BdLogo";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineCaretUp } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import { FaCity } from "react-icons/fa";

import logoMercadopago from "./MercadoPago.svg";

const OriginalReciboServicios = ({ orderId }) => {

  const { contextUsuarioLogueado } = useContext(CartContext);
  //console.log("estoy en uso");
  useEffect(() => {
    if (contextUsuarioLogueado) {
      //console.log(contextUsuarioLogueado, "contextUsuarioLogueado");
    } else {
      //console.log("No hay usuario logueado");
    } 
  }, [contextUsuarioLogueado]);

  const [servicio, setServicio] = useState(null);
  const [plataformaPago, setplataformaPago] = useState("mercadopago");
  const [enlacePago, setenlacePago] = useState([]);
  const [consultaEnlacePago, setconsultaEnlacePago] = useState("");

  useEffect(() => {
    if (contextUsuarioLogueado && !isEmpty(orderId)) {
      const obtenerServicio = () => {
        db.collection("OrdenesServicios")
          .doc(orderId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setServicio({ id: doc.id, ...doc.data() });
            } else {
              //console.log("No se encontró el documento");
            }
          })
          .catch((error) => {
            //console.error("Error al obtener el documento:", error);
          });
      };

      obtenerServicio();
    }
  }, [contextUsuarioLogueado, orderId]);

  useEffect(() => {
    if (servicio) {
      //console.log("servicio", servicio);
      setconsultaEnlacePago(servicio.cartItem[0].name + servicio.cartItem[0].count + plataformaPago);
      //console.log("consultaEnlacePago", consultaEnlacePago);
    }
  }, [servicio]);

  useEffect(() => {
    if (consultaEnlacePago) {
      const obtenerEnlacePago = () => {
        db.collection("EnlacesPagos")
          .where("referencia", "==", consultaEnlacePago)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setenlacePago(doc.data());
            });
          })
          .catch((error) => {
            //console.log("Error getting documents: ", error);
          });
      };
      obtenerEnlacePago();
    }

  }, [consultaEnlacePago]);

  return (
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
      </div>
      <div className="alineacionVertical">
        <span className="Label">
          Gestiona tus sesiones en la opción <br />
          mis servicios de tu tablero  
        </span>
      </div>

      <div className="n" style={{ margin: "0px 0px 20px 0px" }}>
        {isEmpty(servicio) ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
              espere un momento...
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div style={{ marginTop: "10px" }} />
            <div className="estiloListaEdicion">
              <div className="divFichaServicioCliente" key={servicio.id}>
                <div className="divTotalDatos">
                  <div className="divArrowDropUpPrecio">
                    <div className="divTotalVentaServicio">
                      <AiOutlineCaretUp className="arrowDropUpIcon" />
                      <span className="textoTotalVentaMonto">
                        {servicio.total}
                      </span>
                    </div>
                  </div>
                </div>
                {servicio.cartItem.map((item) => (
                  <div key={item.id}>
                    <div className="divServioPorRealizar">
                      <span className="textoServioPorRealizar">
                        {item.name}
                      </span>
                      <span className="cantidadSesiones">
                        numero de sesiones: {item.count}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="divEstatus" style={{ margin: '10px 0px 5px 0px' }}>
                  <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                    <FaCity className="iconosServicios" />
                    <span className="textoEstatusPago">
                      ciudad: {servicio.ciudad}
                    </span>
                  </div>
                  <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                    <BsCalendarDate className="iconosServicios" />
                    <span className="textoEstatusPago">
                      fecha:{" "}
                      {servicio.timestamp.toDate().toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                    <BiTime className="iconosServicios" />
                    <span className="textoEstatusPago">
                      hora:{" "}
                      {servicio.timestamp.toDate().toLocaleTimeString("es-ES", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                    <MdPayment className="iconosServicios" />
                    <span className="textoEstatusPago">
                      estatus pago: {servicio.estatusPago}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
              {enlacePago.length > 0 ? ( null ) : (
        <>
        <div
              className="botonesPagos"
              style={{ margin: "10px 0px 0px 10px" }}
            >
              <a
                href={enlacePago.enlace}
                style={{ 
                  textDecoration: "none",
                  margin: "7px 0px 0px 0px"
                   }}>
                <div >
                  <img
                    src={logoMercadopago}
                    alt="logoMercadopago"
                    height="30px"
                  />
                </div>
              </a>
            </div>
        </>
        
        )}
      </div>
    </div>
  );
};

export default OriginalReciboServicios;
