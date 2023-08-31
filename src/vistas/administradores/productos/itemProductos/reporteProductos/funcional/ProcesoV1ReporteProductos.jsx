import { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import { AiOutlineEdit } from "react-icons/ai";

const ReporteProductos = () => {

    const [contadorLlamadas, setcontadorLlamadas] = useState(0)
    const [datosObtenidos, setdatosObtenidos] = useState([]);
    const [id, setid] = useState("");

    const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
    const [vistaEditor, setvistaEditor] = useState("none");

    const [direccion, setdireccion] = useState("");
    const [estatusDespacho, setestatusDespacho] = useState("");
    const [numeroGuia, setnumeroGuia] = useState("");

    const obtenerCantidadRegistrosFirebase = async () => {
        //console.log("console2");
        const data = await db.collection("OrdenesProductos")
            .orderBy("timestamp", "desc")
            .limit(3)
            .get();
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setdatosObtenidos(arrayData);
    };

    const obtenerMasRegistrosFirebase = async () => {
        const ultimo = datosObtenidos[datosObtenidos.length - 1];
        const data = await db.collection("OrdenesProductos")
            .orderBy("timestamp", "desc")
            .startAfter(ultimo.timestamp)
            .limit(3)
            .get();
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setdatosObtenidos([...datosObtenidos, ...arrayData]);
    };

    useEffect(() => {
        if (contadorLlamadas === 0) {
            obtenerCantidadRegistrosFirebase();
            setcontadorLlamadas(1);
        }
    }, [contadorLlamadas]);

    return (
        <>
            <div className="contenedorPrincipal">
                <div className="contenedorSecundario">
                    <div className="contenedorPublicaciones" style={{ display: vistaPublicaciones }}>
                        <div className="contenedorPublicacionesTitulo">
                            <h1 className="tituloPublicaciones">Reporte de Productos</h1>
                        </div>
                        {datosObtenidos.map((item) => (
                                        <div className="recuadroDeRecibo">
                                            <div className="datosClienteRecibo">
                                                <span
                                                    className="textoNombreClienteRecibo"
                                                    style={{ marginTop: "5px" }}
                                                >
                                                    Telefono: {datosDeRespuesta.celularMovil}
                                                </span>
                                                <span
                                                    className="textoNombreClienteRecibo"
                                                    style={{ marginTop: "5px" }}
                                                >
                                                    Fecha: {fecha}
                                                </span>
                                                <span
                                                    className="textoNombreClienteRecibo"
                                                    style={{ marginTop: "5px" }}
                                                >
                                                    Hora: {hora}
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
                                    ))}
                        <div className="contenedorPublicacionesBoton">
                            <button className="botonPublicaciones" onClick={() => { obtenerMasRegistrosFirebase(); }}>
                                <span className="textoBotonPublicaciones">Cargar mas</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReporteProductos;



