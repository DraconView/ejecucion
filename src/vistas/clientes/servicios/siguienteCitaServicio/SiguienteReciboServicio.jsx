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
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";

const SiguienteReciboServicio = ({ orderId }) => {
  const { contextUsuarioLogueado, contextIdParaActualizar } = useContext(
    CartContext
  );

  //console.log(orderId, "orderId a sido recibido");

  const [servicio, setServicio] = useState(null);

  const [vistaExpandida, setvistaExpandida] = useState("flex");
  const [vistaContraida, setvistaContraida] = useState("none");

  const accionAbrirVista = () => {
    setvistaContraida("flex");
    setvistaExpandida("none");
  };
  const accionCerrarVista = () => {
    setvistaContraida("none");
    setvistaExpandida("flex");
  };

  useEffect(() => {
    if (orderId) {
      //console.log("cargo esto");
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

  //console.log(servicio, "servicio");

  return (
    <div 
      className="alineacionVertical"
    >
    <div 
      className="alineacionVertical"
    >
      <div className="alineacionHorizontal">
        <Link
          to="/login"
          className="divIzquierdaColumn100"
          style={{ margin: "20px 0px 0px 15px", textDecoration: "none" }}
        >
          <HiArrowNarrowLeft className="iconoAccion" />
          <span style={{ margin: "0px 0px 0px 0px" }} className="textoCerrarSesion">
            volver
          </span>
        </Link>
      </div>
      {isEmpty(servicio) ? (
          <div className="alineacionVerticalPantallaCompleta">
          <span className="textoRegistroExitoso">se agendo tu nueva cita</span>
          <div className="alineacionVertical" style={{ margin: "15px 0px 0px 0px" }}>
            <Link to="/mis-servicios" style={{ textDecoration: "none" }}>
              <div className="boton2" >
                <span className="textoBoton">volver</span>
              </div>
            </Link>
          </div>
        </div>
        ) : (
        <div className="divFichaServicioCliente" key={servicio.id}>
          {servicio.cartItem.map((item) => (
            <div key={item.id}>
              <div
                className="divServioPorRealizar"
                style={{ margin: "10px 0px 10px 0px" }}
              >
                <span className="textoServioPorRealizar">{item.name}</span>
                <span className="cantidadSesiones">
                  numero de sesiones: {item.count}
                </span>
              </div>
            </div>
          ))}
          <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
            <span className="textoEstatusPago">costo total: {servicio.total}</span>
          </div>
          <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
            <span className="textoEstatusPago">estatus pago: {servicio.estatusPago}</span>
          </div>
          <div className="casillaEstatusServicos" style={{ margin: "7px 0px 0px 0px" }}>
            <span className="textoEstatusPago">HORARIOS AGENDADOS:</span>
          </div>
          <div className="n" style={{ margin: "7px 0px 7px 30px" }}>
            {servicio.timeMs.map((time) => (
              <div className="fechasMisServicios" key={time}>
                {new Date(time).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {","}{" "}
                {new Date(time).toLocaleTimeString("es-ES", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            ))}
          </div>
          <div
            className="alineacionHorizontaljustificaconsSpaceBetween"
            style={{ display: `${vistaExpandida}`, margin: "5px 0px 0px 15px" }}
            onClick={accionAbrirVista}
          >
            <span className="textoEstatusPago">OBSERVACIONES DE TRATAMIENTO</span>
            <MdExpandMore
              style={{
                fontSize: "25px",
                color: "#585858",
                margin: "0px 30px 0px 0px",
              }}
            />
          </div>
          <div className="divInactivoTextoDescripcionProducto" style={{ display: `${vistaContraida}` }} onClick={accionCerrarVista}>
            <div className="alineacionHorizontaljustificaconsSpaceBetween">
              <span className="textoEstatusPago" style={{ margin: "5px 0px 0px 10px" }}>
                OBSERVACIONES DE TRATAMIENTO
              </span>
              <MdExpandLess
                style={{
                  fontSize: "25px",
                  color: "#585858",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                disabled
                className="casillaDescripcionServicio"
                placeholder=""
                value={servicio.observaciones}
              />
            </div>
          </div>
          <div className="alineacionVertical" style={{ margin: "15px 0px 0px 0px" }}>
            <Link to="/mis-servicios" style={{ textDecoration: "none" }}>
              <div className="boton2" >
                <span className="textoBoton">volver</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
          <div style={{ margin: "30px auto 0px auto" }}>
          <BdLogo altura={70} />
        </div>
      </div>
  );
};

export default SiguienteReciboServicio;
