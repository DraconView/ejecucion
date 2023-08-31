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
    const [observaciones, setobservaciones] = useState("");
    const [estatusPago, setestatusPago] = useState("");


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
        const estatusTimeMsArray = datosObtenidos.map(mapeado => mapeado.estatusTimeMs);
        setEditedEstatus(estatusTimeMsArray);
    }
}, [datosObtenidos]);


    const editarRegistros = (esteDato) => {
        setid(esteDato.id);
        setvistaPublicaciones("none");
        setvistaEditor("flex");

        // campos para editar
        setestatusPago(esteDato.estatusPago);
        setobservaciones(esteDato.observaciones);
    };

    const actualizarRegistrosFirestore = (event) => {
        event.preventDefault();
        db.collection("OrdenesServicios")
            .doc(id)
            .update({
                estatusPago: estatusPago,
                observaciones: observaciones,
            })
            .then(() => {
                obtenerCantidadRegistrosFirebase();
            })
            .catch((error) => {
                //console.error("Error al actualizar el documento:", error);
            });
        setid("");
        setvistaPublicaciones("flex");
        setvistaEditor("none");

        // campos para editar    
        setestatusPago("");
        setobservaciones("");

        //actualizarMarcaDeTiempo();
    };

    const volverEdicion = () => {
        setvistaPublicaciones("flex");
        setvistaEditor("none");

        // campos para editar
        setestatusPago("");
        setobservaciones("");
    };

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

    // Dentro de tu componente
const [editedEstatus, setEditedEstatus] = useState([]);

const handleEstatusChange = (index, newValue) => {
    const updatedEstatus = [...editedEstatus];
    updatedEstatus[index].statusSesion = newValue;
    setEditedEstatus(updatedEstatus);
};

const handleTimeChange = (index, newValue) => {
    const updatedEstatus = [...editedEstatus];
    updatedEstatus[index].timeMsSesion = new Date(newValue).getTime();
    setEditedEstatus(updatedEstatus);
};

const formatDatetimeInput = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16);
};

const guardarCambios = () => {
    const updatedData = [...mapeado];
    updatedData.estatusTimeMs = editedEstatus;
    // Aquí puedes realizar la actualización en Firebase
    //console.log("Datos actualizados:", updatedData);
    obtenerCantidadRegistrosFirebase();
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
                                            {/* objetoEjemploServicios lectura de estatusTimeMs*/}
                                            <div className="n" style={{ margin: "7px 0px 7px 20px" }}>
                                                {mapeado.estatusTimeMs.map((estatusItem, index) => (
                                                    <div className="fechasMisServicios" key={index}>
                                                        <span className="N">
                                                            {estatusItem.statusSesion} -{" "}
                                                            {new Date(estatusItem.timeMsSesion).toLocaleDateString("es-ES", {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            })}
                                                            {" "}
                                                            {new Date(estatusItem.timeMsSesion).toLocaleTimeString("es-ES", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: false, // Use 24-hour format
                                                            })}
                                                        </span>
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
                                            onClick={() => editarRegistros(mapeado)}
                                        >
                                            <div className="divBotonEditarServicio">
                                                <MdDriveFileRenameOutline className="iconoEditarServicio" />
                                            </div>
                                        </div>
                                        
<div className="n" style={{ margin: "7px 0px 7px 20px" }}>
    {mapeado.estatusTimeMs.map((estatusItem, index) => (
        <div className="fechasMisServicios" key={index}>
            <input
                type="text"
                value={estatusItem.statusSesion}
                onChange={(e) => handleEstatusChange(index, e.target.value)}
            />
            <input
                type="datetime-local"
                value={formatDatetimeInput(estatusItem.timeMsSesion)}
                onChange={(e) => handleTimeChange(index, e.target.value)}
            />
        </div>
    ))}
</div>

                                        <div className="guardarCambios">
                                            <button onClick={guardarCambios}>Guardar cambios</button>
                                            </div>

                                        
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* - - - - - - - - - VISTA EDITOR - - - - - - - - - */}

                    <div
                        className="divPublicacionesEdicion"
                        style={{ display: `${vistaEditor}` }}
                    >
                        <form>
                            <div className="alineacionVertical">
                                <div
                                    className="alineacionHorizontalLeft"
                                    style={{ margin: "5px 0px 0px 0px" }}
                                >
                                    <span>Pago:</span>
                                    <textarea
                                        type="text"
                                        className="textareaEdicion3"
                                        placeholder="Nombre..."
                                        value={estatusPago}
                                        onChange={(e) => setestatusPago(e.target.value.toLowerCase())}
                                    />
                                </div>

                                <div className="divCasillaEstatusServicosDescripcion">
                                    <span className="tituloObservacionTratamiento">
                                        observaciones de cuidado
                                    </span>
                                </div>
                                <div className="divCasillaDescripcionServicio">
                                    <textarea
                                        type="text"
                                        rows="5"
                                        className="casillaDescripcionServicio2"
                                        placeholder="observaciones de cuidado"
                                        value={observaciones}
                                        onChange={(e) => setobservaciones(e.target.value)}
                                    />
                                </div>
                                <div onClick={volverEdicion} className="divBotonContinuar">
                                    <span className="textoBotonRegistrarCliente">CANCELAR</span>
                                </div>
                                <button
                                    className="divTextoBotonGuardar"
                                    type="submit"
                                    onClick={actualizarRegistrosFirestore}
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
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
        "id": "CWrDc391ynei5KXkNUer",
        "estatusServicio": "PENDIENTE",
        "timeMs": [
            1688821200000,
            1691002800000
        ],
        "cartItem": [
            {
                "price": "1950",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "name": "Medias Piernas",
                "count": 6,
                "stock": 99708,
                "id": "2Vvi98YQz9CiGwKOvFYh"
            }
        ],
        "timestamp": {
            "seconds": 1691002800,
            "nanoseconds": 0
        },
        "estatusTimeMs": [
            {
                "timeMsSesion": 1688821200000,
                "statusSesion": "PENDIENTE"
            },
            {
                "statusSesion": "PENDIENTE",
                "timeMsSesion": 1691002800000
            }
        ],
        "observaciones": "",
        "estatusPago": "PENDIENTE",
        "uid": "5fHvIrofMUdgBy2NpNWNOYnHacl2",
        "ciudad": "MINAS",
        "email": "0907p180823@p.com",
        "total": "$ 11.700,00",
        "citasAsignadas": 1,
        "ciudadMasTimeMs": "MINAS1688821200000"
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
