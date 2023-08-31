import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

import { AiOutlineCaretUp, AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";

const ReporteServicios = () => {
    const [contadorLlamadas, setcontadorLlamadas] = useState(0);
    const [datosObtenidos, setdatosObtenidos] = useState([]);
    const [id, setid] = useState("");

    const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
    const [vistaEditor, setvistaEditor] = useState("none");
    const [vistaMostrarMas, setvistaMostrarMas] = useState("flex");
    const [vistaVolverInicio, setvistaVolverInicio] = useState("none");

    const [arrayProductos, setarrayProductos] = useState([]);

    const [direccion, setdireccion] = useState("");
    const [estatusDespacho, setestatusDespacho] = useState("");
    const [numeroGuia, setnumeroGuia] = useState("");

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

    const obtenerCantidadRegistrosFirebase = async () => {
        const data = await db
            .collection("OrdenesServicios")
            .orderBy("timestamp", "desc")
            .limit(3)
            .get();
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setdatosObtenidos(arrayData);
    };

    function autoFocus() {
        window.scrollTo(0, 0);
    }

    function vistaMostrarVolver() {
        setvistaMostrarMas("none")
        setvistaVolverInicio("flex")
    }

    const obtenerMasRegistrosFirebase = async () => {
        const ultimo = datosObtenidos[datosObtenidos.length - 1];
        const data = await db
            .collection("OrdenesServicios")
            .orderBy("timestamp", "desc")
            .startAfter(ultimo.timestamp)
            .limit(3)
            .get();
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setdatosObtenidos([...datosObtenidos, ...arrayData]);
        if (arrayData.length === 0) {
            //console.log('No existen resultados')
            vistaMostrarVolver()
        }
    };

    useEffect(() => {
        if (contadorLlamadas === 0) {
            obtenerCantidadRegistrosFirebase();
            setcontadorLlamadas(1);
        }
    }, [contadorLlamadas]);

    useEffect(() => {
        if (datosObtenidos.length > 0) {
            //console.log("datosObtenidos", datosObtenidos);
        }
    }, [datosObtenidos]);

    /*
     // funcion calcular el total de ejemploObjeto
     useEffect(() => {
         function calcularTotal() {
             let total = 0;
             ejemploObjeto.map((item) => {
                 total = total + parseInt(item.total.replace("$", "").replace(".", ""));
             });
             //console.log("total", total);
         }
         calcularTotal();
     }, []);
 */

    const eliminarRegistrosFirestore = (id) => {
        db.collection("OrdenesServicios")
            .doc(id)
            .delete()
            .then(() => {
                obtenerCantidadRegistrosFirebase();
            })
            .catch((error) => {
                //console.error("Error al eliminar el documento:", error);
            });
        //actualizarMarcaDeTiempo();
    };

    return (
        <>
            <div className="contenedorPrincipal">

                <div className="contenedorSecundario">
                    <div
                        className="contenedorPublicaciones"
                        style={{ display: vistaPublicaciones }}
                    >
                        <div className="alineacionHorizontalWrap">
                            <div className="estiloListaEdicion">
                                {datosObtenidos.map((mapeado) => (
                                    <div className="divFichaServicioCliente" key={mapeado.id}>
                                        <div className="divTotalDatos">
                                            <div className="divArrowDropUpPrecio">
                                                <div className="divTotalVentaServicio">
                                                    <span className="textoEstatusPago">
                                                        {mapeado.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {mapeado.cartItem.map((item) => (
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

                                        <div className="alineacionVertical">
                                            <span
                                                //aqui
                                                className="textoEstatusPago">
                                                siguiente cita
                                            </span>
                                        </div>
                                        <div className="divEstatus">
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
                                        </div>
                                        <div
                                            className="divTotalDatos"
                                            style={{ margin: "10px 0px 0px 0px" }}
                                        >
                                            <div className="divArrowDropUpPrecio">
                                                <div className="divTotalVentaServicio">
                                                    <AiOutlineCaretUp className="arrowDropUpIcon" />
                                                    <span className="textoTotalVentaMonto">
                                                        {mapeado.total}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="contenedorBotonEditarServicio"
                                            onClick={() => editmapeado(mapeado)}
                                        >
                                            <div className="divBotonEditarServicio">
                                                <MdDriveFileRenameOutline className="iconoEditarServicio" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <button className='divTextoMostrarMas'
                        style={{ display: `${vistaMostrarMas}` }}
                        onClick={() => obtenerMasRegistrosFirebase()} >
                        <span
                            className='textoMostrarMas' >
                            mostrar mas...
                        </span>
                    </button>
                    <div className='divNoHayMasResultados'
                        style={{ display: `${vistaVolverInicio}` }}>
                        <button className='divTextoMostrarMas'
                            onClick={() => autoFocus()} >
                            <span
                                className='textoMostrarMas' >
                                ir al inicio...
                            </span>
                        </button>
                        <span className='d' >
                            no hay mas resultados
                        </span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ReporteServicios;

const objetoEjemploServicios = [
    {
        "id": "6IgthEp1yD7iFxIn6G3y",
        "citasAsignadas": 1,
        "numeroFecha": 1689516000000,
        "email": "alexander@pruebas.com",
        "ciudad": "MINAS",
        "uid": "VtcZOBq94abfrEZGtK13sOObrIL2",
        "timeMs": [
            1688824800000,
            1691002800000,
            1689516000000
        ],
        "ciudadMasTimeMs": "MINAS1688824800000",
        "observaciones": "",
        "total": "$ 11.700,00",
        "timestamp": {
            "seconds": 1689516000,
            "nanoseconds": 0
        },
        "estatusPago": "PENDIENTE",
        "cartItem": [
            {
                "stock": 99708,
                "count": 6,
                "price": "1950",
                "name": "MEDIAS PIERNAS",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "id": "2Vvi98YQz9CiGwKOvFYh"
            }
        ],
        "estatusServicio": "PENDIENTE"
    },
    {
        "id": "3q7joQ5Pc4wrMMhaOMAT",
        "numeroFecha": 1688828400000,
        "observaciones": "",
        "citasAsignadas": 1,
        "estatusServicio": "PENDIENTE",
        "estatusPago": "PENDIENTE",
        "timeMs": [
            1688828400000
        ],
        "total": "$ 11.700,00",
        "cartItem": [
            {
                "stock": 99708,
                "name": "Medias Piernas",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "count": 6,
                "id": "2Vvi98YQz9CiGwKOvFYh",
                "price": "1950"
            }
        ],
        "uid": "bwTkcuhvqgViW0Orr7YL5EXtUwy1",
        "timestamp": {
            "seconds": 1688828400,
            "nanoseconds": 0
        },
        "email": "1040p150823@p.com",
        "ciudadMasTimeMs": "MINAS1688828400000",
        "ciudad": "MINAS"
    },
    {
        "id": "dYlP7aneR283FGXXj2RK",
        "total": "$ 11.700,00",
        "observaciones": "",
        "email": "alexander@programador.com",
        "ciudadMasTimeMs": "MINAS1688826600000",
        "numeroFecha": 1688826600000,
        "estatusPago": "PENDIENTE",
        "uid": "1mgs8W9OgYgbWNS7aXIQMO1YlD02",
        "estatusServicio": "PENDIENTE",
        "cartItem": [
            {
                "count": 6,
                "stock": 99708,
                "name": "Medias Piernas",
                "price": "1950",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "id": "2Vvi98YQz9CiGwKOvFYh"
            }
        ],
        "timeMs": [
            1688826600000
        ],
        "timestamp": {
            "seconds": 1688826600,
            "nanoseconds": 0
        },
        "ciudad": "MINAS",
        "citasAsignadas": 1
    }
]

/* boton eliminar
                                        <div
                                            className="divBotonContinuar"
                                            onClick={() => eliminarRegistrosFirestore(mapeado.id)}
                                        >
                                            <span className="textoBotonRegistrarCliente">Eliminar</span>
                                        </div>
                                        */
