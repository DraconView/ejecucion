import { useState, useEffect, useContext } from "react";
import CartContext from "../../../../context/CartContext";
import "./../../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "../../../../firebase";
import { isEmpty, size } from "lodash";
import { Link } from "react-router-dom";
import BdLogo from "../../../../components/LogoBd/BdLogo";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineCaretUp, AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { BiTime } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";

import SiguienteDiaServicio from "../../../../vistas/clientes/servicios/siguienteCitaServicio/SiguienteDiaServicio";

const MisServicios = () => {
  const {
    contextUsuarioLogueado,
    providerIdParaActualizar,
  } = useContext(CartContext);

  useEffect(() => {
    if (contextUsuarioLogueado) {
      //console.log(contextUsuarioLogueado, "contextUsuarioLogueado");
    } else {
      //console.log("No hay usuario logueado");
    }
  }, [contextUsuarioLogueado]);

  const [contadorLlamadas, setContadorLlamadas] = useState(0);
  const [servicios, setservicios] = useState([]);

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

  /*useEffect(() => {
    const localInduccionMisCitas = localInduccionMisCitas.getItem("localInduccionMisCitas");
    if (localInduccionMisCitas === 1) {
       //console.log("Ya se ha mostrado la induccion de Mis Citas");
    } else {
        localStorage.setItem("localInduccionMisCitas", "1");
    }
    }, []);*/

  useEffect(() => {
    if (contextUsuarioLogueado) {
      if (contadorLlamadas === 0) {
        setContadorLlamadas(contadorLlamadas + 1);
        const obtenerRegistrosFirestore = () => {
          const referenciasDb = db.collection("OrdenesServicios");
          referenciasDb
            .where("uid", "==", contextUsuarioLogueado.uid)
            //.orderBy("timestamp", "desc")
            .get()
            .then((querySnapshot) => {
              const referenciasSnap = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
              setservicios(referenciasSnap);
            })
            .catch((error) => {
              //console.error("Error al obtener los productos:", error);
            });
        };
        obtenerRegistrosFirestore();
      }
    }
  }, [contextUsuarioLogueado]);

  // Helper function to check if the date is within the past 7 days
  const isWithinSevenDays = (date) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return new Date(date) > sevenDaysAgo;
  };

  // Helper function to calculate the remaining days from the last date
  const calculateDaysRemaining = (date) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    const remainingTime = sevenDaysAgo.getTime() - new Date(date).getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    return remainingDays;
  };

  return (
    <div className="alineacionVertical">
      <div className="alineacionHorizontal">
        <Link
          to="/tablero-clientes"
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
      <div className="divBarraTituloRegistroClientes">
        <span className="textoNegroS21W700U">Mis Servicios</span>
      </div>
      <div className="n" style={{ margin: "0px 0px 20px 0px" }}>
        {size(servicios) === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
              espere un momento...
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div style={{ marginTop: "30px" }} />
            <div className="estiloListaEdicion">
              {servicios.map((mapeado) => (
                <div className="divFichaServicioCliente" key={mapeado.id}>
                  {mapeado.cartItem.map((item) => (
                    <div key={item.id}>
                      <div
                        className="divServioPorRealizar"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        <span className="textoServioPorRealizar">
                          {item.name}
                        </span>
                        <span className="cantidadSesiones">
                          numero de sesiones: {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="alineacionVertical">
                    <span
                      //aqui
                      className="textoEstatusPago">
                      siguiente cita
                    </span>
                  </div>
                  <div
                    className="casillaEstatusServicos"
                    style={{ margin: "7px 0px 7px 0px" }}
                  >
                    <BsCalendarDate className="iconosServicios" />
                    <span className="textoEstatusPago">
                      fecha:{" "}
                      {new Date(
                        mapeado.timestamp.seconds * 1000
                      ).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div
                    className="casillaEstatusServicos"
                    style={{ margin: "7px 0px 7px 0px" }}
                  >
                    <AiOutlineClockCircle className="iconosServicios" />
                    <span className="textoEstatusPago">
                      hora:{" "}
                      {new Date(
                        mapeado.timestamp.seconds * 1000
                      ).toLocaleTimeString("es-ES", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  </div>
                  <div
                    className="casillaEstatusServicos"
                    style={{ margin: "7px 0px 0px 0px" }}
                  >
                    <span className="textoEstatusPago">
                      HORARIOS AGENDADOS:
                    </span>
                  </div>
                  <div className="n" style={{ margin: "7px 0px 7px 30px" }}>
                    {mapeado.timeMs.map((time) => (
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
                                                className="casillaEstatusServicos"
                                                style={{ margin: "7px 0px 7px 0px" }}
                                            >
                                                <MdPayment className="iconosServicios" />
                                                <span className="textoEstatusPago">
                                                    estatus pago: {mapeado.estatusPago}
                                                </span>
                                            </div>
                                            <div
                                                className="casillaEstatusServicos"
                                                style={{ margin: "7px 0px 7px 0px" }}
                                            >
                                                <ImPriceTag className="iconosServicios" />
                                                <span className="textoEstatusPago">
                                                    N.º sesion: {mapeado.estatusServicio}
                                                </span>
                                            </div>
                  <div
                    className="alineacionHorizontaljustificaconsSpaceBetween"
                    style={{
                      display: `${vistaExpandida}`,
                      margin: "5px 0px 0px 15px",
                    }}
                    onClick={accionAbrirVista}
                  >
                    <span className="textoEstatusPago">
                      OBSERVACIONES DE TRATAMIENTO
                    </span>
                    <MdExpandMore
                      style={{
                        fontSize: "25px",
                        color: "#585858",
                        margin: "0px 30px 0px 0px",
                      }}
                    />
                  </div>
                  <div
                    className="divInactivoTextoDescripcionProducto"
                    style={{ display: `${vistaContraida}` }}
                    onClick={accionCerrarVista}
                  >
                    <div className="alineacionHorizontaljustificaconsSpaceBetween">
                      <span
                        className="textoEstatusPago"
                        style={{ margin: "5px 0px 0px 10px" }}
                      >
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
                        value={mapeado.observaciones}
                      />
                    </div>
                  </div>
                  <div
                    className="alineacionVertical"
                    style={{ margin: "0px 0px 0px 0px" }}
                  >
                    {mapeado.timeMs.length < mapeado.cartItem[0].count ? (
                      <div className="alineacionVertical" style={{ margin: "10px 0px 10px 0px" }}>
                        {isWithinSevenDays(mapeado.timeMs[mapeado.timeMs.length - 1]) ? (
                          <div className="divMensajePorCuidado" >
                            <span className="textoPorCuidado">
                              ¡Por el cuidado de tu piel debes
                              <br />
                              agendar cuando pasen {calculateDaysRemaining(mapeado.timeMs[mapeado.timeMs.length - 1])} días!
                            </span>
                          </div>
                        ) : (
                          <Link to="/siguiente-dia-servicio" style={{ textDecoration: "none" }}>
                            <div className="boton2" onClick={() => { providerIdParaActualizar(mapeado.id) }}>
                              <span className="textoBoton">agendar</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div
                        className="divMensajePorCuidado"
                        style={{ margin: "10px 0px 10px 0px" }}
                      >
                        <span className="textoPorCuidado2">
                          ¡Han culminado tus sesiones
                          <br />
                          pero puedes agendar más!
                        </span>
                      </div>
                    )}
                    <div className="divTotalDatos">
                      <div className="divArrowDropUpPrecio">
                        <div className="divTotalVentaServicio">
                          <AiOutlineCaretUp className="arrowDropUpIcon" />
                          <span className="textoTotalVentaMonto">
                            {mapeado.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default MisServicios;
