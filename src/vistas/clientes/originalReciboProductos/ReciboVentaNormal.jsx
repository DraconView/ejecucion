import { useContext, useState, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import { db, auth, storage } from "../../firebase";
import CartContext from "../../context/CartContext";
import { FiPrinter } from "react-icons/fi";
import ListaProductosDetallados from "../../components/reciboVenta/ListaProductosDetallados";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import "./../../cssGeneral/CssGeneral.css";

/* preparar las diferentes rutas que van a utilizar este componente
puedes ver las fotografias de los productos
del recibo al hacer click en su referencia
*/

function ReciboVenta({ orderId }) {
  const { contextBdOrdenes, contextNumeroWhatsapp } = useContext(CartContext);

  const [datosDeRespuesta, setdatosDeRespuesta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrayProductos, setarrayProductos] = useState([]);
  const [fecha, setfecha] = useState("");
  const [hora, sethora] = useState("");

  let relleno = "variable";

  useEffect(() => {
    setLoading(true);
    const docRef = db.collection(`${contextBdOrdenes}`).doc(orderId);
    docRef.get().then((querySnapshot) => {
      setLoading(false);
      setdatosDeRespuesta({ id: querySnapshot.id, ...querySnapshot.data() });
    });
  }, [orderId]);

  useEffect(() => {
    if (
      datosDeRespuesta.cartItem === undefined ||
      datosDeRespuesta.cartItem === null
    ) {
      //console.log("no hay datos");
    } else {
      setarrayProductos(datosDeRespuesta.cartItem);
      const datosFecha = { weekday: 'long', month: 'long', day: 'numeric' };
      const objetoFecha = new Date(datosDeRespuesta.timestamp.toDate());
      setfecha(objetoFecha.toLocaleDateString(undefined, datosFecha));
      const datosHora = { hour12: false, hour: '2-digit', minute: '2-digit' };
      const objetoHora = new Date(datosDeRespuesta.timestamp.toDate());
      sethora(objetoHora.toLocaleTimeString([], datosHora));
    }
  }, [datosDeRespuesta]);

  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  /* monacoshoes
  const enviarPorWhatsapp = async () => {
    const whatsappURL = `https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}&text=${encodeURIComponent(
      "¡Acabo de realizar una compra por la pagina web! a nombre de " +
        datoNombre + "Id de orden es: " + datosDeRespuesta.id
    )}`;
    window.open(whatsappURL, "_blank");
  }; */

  const enviarPorWhatsapp = async () => {
    const whatsappURL = `https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}&text=${encodeURIComponent(
      "¡Acabo de realizar una compra por la pagina web! " + "Id de orden : " + datosDeRespuesta.id )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <div className="divSalirvolverProductosDetallados">
        <Link to="/">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "15px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      {loading === true ? (
        <Spinner />
      ) : (
        <div className="divPrincipalRecibo">
          <div className="divAlineacionWhatsapp">
            <div
              className="divBotonImprimir"
              id="idBotonImprimir"
              onClick={enviarPorWhatsapp}
            >
              <span className="textoConfirmacionWhatsapp">Confirmar</span>
              <BsWhatsapp className="textoConfirmacionWhatsapp" />
            </div>
          </div>

            <div className="recuadroDeRecibo">
              <div className="datosClienteRecibo">
                <span
                  className="textoNombreClienteRecibo"
                  style={{ marginTop: "15px" }}
                >
                  CLIENTE: {relleno}
                </span>
                <span
                  className="textoNombreClienteRecibo"
                  style={{ marginTop: "5px" }}
                >
                  TELEFONO: {datosDeRespuesta.celularMovil}
                </span>
                <span
                  className="textoNombreClienteRecibo"
                  style={{ marginTop: "5px" }}
                >
                  CITA: {fecha}
                </span>
                <span
                  className="textoNombreClienteRecibo"
                  style={{ marginTop: "5px" }}
                >
                  HORA: {hora}
                </span>
              </div>
              <div className="divDivider" style={{ marginTop: "3px" }} />

              <div className="divDivider" style={{ marginTop: "5px", marginBottom: "10px" }} />
              <div className="divTituloDetallesItem"> 
                <div className="cantValor">
                  <span className="spanCantDetalleValor" > CANT </span>
                </div>
                <div className="reciboReferenciaProducto">
                  <span className="spanCantDetalleValor" > DETALLE </span>
                </div>
                <div className="cantValor">
                  <span className="spanCantDetalleValor" > VALOR </span>
                </div>
              </div>
              <ListaProductosDetallados arrayProductos={arrayProductos} />
              <div style={{ height: "30px" }}></div>
              <div
                className="divDivider"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
              <div className="alineacionHorizontalReciboVenta">
                <span>IVA: {"0.00"}</span>
                <span>TOTAL: {datosDeRespuesta.total}</span>
              </div>
              <div
                className="divDivider"
                style={{ marginTop: "50px", marginBottom: "10px" }}
              />
              <span>TERMINOS Y CONDICIONES</span>
              <div className="divDivider" style={{ marginTop: "10px" }} />
              <div
                className="divDivider"
                style={{ marginTop: "3px", marginBottom: "10px" }}
              />
              <span style={{ margin: " 0px 0px 0px 0px" }}>
                GRACIAS POR SU COMPRA
              </span>
              <div
                style={{
                  marginBottom: "20px",
                  boxSizing: "border-box",
                  marginTop: "20px",
                }}
              ></div>
            </div>
        </div>
      )}
    </>
  );
}

export default ReciboVenta;
