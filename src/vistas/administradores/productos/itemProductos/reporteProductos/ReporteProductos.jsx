import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const ejemploObjeto = [
    {
        "id": "vs6SqFthpuS6b28lxRNt",
        "direccion": "PENDIENTE",
        "estatusPago": "PENDIENTE",
        "cartItem": [
            {
                "id": "9TZ6yeGrR6lkMdso9QqG",
                "name": "CREMAS",
                "price": "780",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "idTienda": 1,
                "count": 1,
                "stock": 700,
                "codeRef": "CREMAS"
            }
        ],
        "total": "$ 780,00",
        "estatusDespacho": "PENDIENTE",
        "numeroGuia": "ASIGNAR",
        "timestamp": {
            "seconds": 1691982668,
            "nanoseconds": 619000000
        },
        "timeMs": 1691982668619
    },
    {
        "id": "AWnzkl4h4RxeDEBW3cEP",
        "timeMs": 1691950205497,
        "numeroGuia": "ASIGNAR",
        "estatusPago": "PENDIENTE",
        "estatusDespacho": "PENDIENTE",
        "cartItem": [
            {
                "codeRef": "AGUA MICELAR",
                "name": "AGUA MICELAR",
                "idTienda": 1,
                "stock": 700,
                "id": "YPF4sru2cK6wCIqrI8xL",
                "img": [
                    "https://draconsoftware.com/storage/files/6YAwCY3KZJfGM4CgiK7OIPwS1ocBjfCNIEqkaXpP.jpg"
                ],
                "price": "650",
                "count": 4
            }
        ],
        "direccion": "PENDIENTE",
        "total": "$ 2.600,00",
        "timestamp": {
            "seconds": 1691950205,
            "nanoseconds": 497000000
        }
    },
    {
        "id": "DrJjdscGA7c2fFqc0Mnb",
        "estatusPago": "PENDIENTE",
        "total": "$ 2.340,00",
        "timestamp": {
            "seconds": 1691950194,
            "nanoseconds": 937000000
        },
        "cartItem": [
            {
                "price": "780",
                "count": 3,
                "stock": 700,
                "codeRef": "CREMAS",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "idTienda": 1,
                "name": "CREMAS",
                "id": "9TZ6yeGrR6lkMdso9QqG"
            }
        ],
        "direccion": "PENDIENTE",
        "timeMs": 1691950194937,
        "estatusDespacho": "PENDIENTE",
        "numeroGuia": "ASIGNAR"
    }
]

const ReporteProductos = () => {
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

    const obtenerCantidadRegistrosFirebase = async () => {
        const data = await db
            .collection("OrdenesProductos")
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
            .collection("OrdenesProductos")
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

  /*  // funcion calcular el total de ejemploObjeto
    useEffect(() => {
    function calcularTotal() {
        let total = 0;
        ejemploObjeto.map((item) => {
            total = total + parseInt(item.total.replace("$", "").replace(".", ""));
        });
        //console.log("total", total);
    }
    calcularTotal();
    }, []);*/


    return (
        <>
            <div className="contenedorPrincipal">

                <div className="contenedorSecundario">
                    <div
                        className="contenedorPublicaciones"
                        style={{ display: vistaPublicaciones }}
                    >
                        <div className="alineacionHorizontalWrap">
                            {datosObtenidos.map((mapeado) => (
                                <div
                                    key={mapeado.id}
                                    className="recuadroDeRecibo"
                                    style={{ margin: "10px 10px 10px 10px" }}
                                >
                                    <div className="datosClienteRecibo">
                                        <span
                                            className="textoNombreClienteRecibo"
                                            style={{ marginTop: "5px" }}
                                        >
                                            Telefono: {mapeado.celularMovil}
                                        </span>
                                        <span className="textoNombreClienteRecibo">
                                            fecha:{" "}
                                            {new Date(
                                                mapeado.timestamp.seconds * 1000
                                            ).toLocaleDateString("es-ES", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="textoNombreClienteRecibo">
                                            hora:{" "}
                                            {new Date(
                                                mapeado.timestamp.seconds * 1000
                                            ).toLocaleTimeString("es-ES", {
                                                hour: "numeric",
                                                minute: "numeric",
                                            })}
                                        </span>
                                            <span className="textoNombreClienteRecibo">
                                                direccion:{" "}
                                                {mapeado.direccion}
                                            </span>
                                            <span className="textoNombreClienteRecibo">
                                                despacho:{" "}
                                                {mapeado.estatusDespacho}
                                            </span>

                                    </div>
                                    <div className="divDivider" style={{ marginTop: "3px" }} />

                                    <div
                                        className="divDivider"
                                        style={{ marginTop: "5px", marginBottom: "10px" }}
                                    />
                                    <div className="divTituloDetallesItem">
                                        <div className="cantValor">
                                            <span className="spanCantDetalleValor"> CANT </span>
                                        </div>
                                        <div className="reciboReferenciaProducto">
                                            <span className="spanCantDetalleValor"> DETALLE </span>
                                        </div>
                                        <div className="cantValor">
                                            <span className="spanCantDetalleValor"> VALOR </span>
                                        </div>
                                    </div>
                                    {mapeado.cartItem.map((item) => (
                                        <div key={item.id}>
                                            <div style={{ marginTop: "5px" }}>
                                                <Link
                                                    to={`/item/${item.id}`}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <div className="divTituloDetallesItem">
                                                        <div className="cantValor">
                                                            <span
                                                                className="spanCantDetalleValor"
                                                            >
                                                                {" "}
                                                                {item.count}{" "}
                                                            </span>
                                                        </div>
                                                        <div className="reciboReferenciaProducto">
                                                            <span className="spanCantDetalleValor">
                                                                {" "}
                                                                {item.name}{" "}
                                                            </span>
                                                        </div>
                                                        <div className="cantValor">
                                                            <span className="spanCantDetalleValor">
                                                                {" "}
                                                                {item.price}{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="n">
                                        <span >
                                            total:{" "}
                                        </span>
                                        {mapeado.cartItem.reduce(
                                            (acc, el) => acc + el.price * el.count,
                                            0
                                        )}
                                    </div>
                                </div>
                            ))}

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

export default ReporteProductos;
