import { useEffect, useState } from 'react';
import { db } from "../../../firebase/index";
import "../../../cssGeneral/CssGeneral.css";
import FlechaVolver from "../../../components/flechaVolver/FlechaVolver";

const AnaliticaConDatosFire = () => {

    //console.log("AnaliticaConDatosFire");

    // - - - - - obtenerTodosLosRegistrosFirestore - - - - - //

    const [todosLosRegistrosFirestore, settodosLosRegistrosFirestore] = useState([]);

    const obtenerTodosLosRegistrosFirestore = () => {
        const referenciasDb = db.collection("OrdenesProductos");
        referenciasDb
            .get()
            .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                settodosLosRegistrosFirestore(referenciasSnap);
            })
            .catch((error) => {
                //console.error("Error al obtener los productos:", error);
            });
        //console.log("todosLosRegistrosFirestore", todosLosRegistrosFirestore);
    };

   /* useEffect(() => {
        if (todosLosRegistrosFirestore.length == 0) {
            obtenerTodosLosRegistrosFirestore();
        }
    }, []);*/

    // - - - - - - - - - - - - - - - - - - - - //

    // - - - - - calcula meses transcurridos desde el inicio - - - - - //

    const [timeMsMenor, settimeMsMenor] = useState(0);
    const [timeMsMayor, settimeMsMayor] = useState(0);

    function calcularMesesPasados(data) {
        const timestamps = data.map(item => item.fechaNumero);
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);

        const currentDate = new Date();
        const minDate = new Date(minTimestamp);
        const maxDate = new Date(maxTimestamp);

        const monthsDiff = (currentDate.getFullYear() - minDate.getFullYear()) * 12 +
            currentDate.getMonth() - minDate.getMonth();
        //console.log(monthsDiff, "monthsDiff");
        return monthsDiff;
    }

    /*
    useEffect(() => {
        if (objetoEjemploProductos.length > 0) {
            calcularMesesPasados(objetoEjemploProductos);
        }
    }, [objetoEjemploProductos]);
    */

    // - - - - - - - - - - - - - - - - - - - - //

    // - - - - - ventas de hoy - - - - - //

    const [arrayVentasDeHoy, setarrayVentasDeHoy] = useState([]);
    const [ventasDeHoy, setventasDeHoy] = useState("");

    const obtenerVentasDeHoy = () => {
        let hoy = new Date().setHours(0, 0, 0, 0);
        //console.log(hoy, "hoy");
        const referenciasDb = db.collection("OrdenesProductos");
        referenciasDb
            .where("fechaNumero", ">=", hoy)
            .get()
            .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setarrayVentasDeHoy(referenciasSnap);
            })
            .catch((error) => {
                //console.error("Error al obtener los productos:", error);
            });
    };

    useEffect(() => {
        if (arrayVentasDeHoy.length == 0) {
            obtenerVentasDeHoy();
        }
    }, []);

    useEffect(() => {
        if (arrayVentasDeHoy.length > 0) {
            let ventasDeHoyParaMostar = calcularTotalDeObjeto(arrayVentasDeHoy);
            setventasDeHoy(ventasDeHoyParaMostar);
            //console.log(ventasDeHoyParaMostar, "ventasDeHoyParaMostar");
        }
    }, [arrayVentasDeHoy]);

    // - - - - - - - - - - - - - - - - - - - - //

    // - - - - - ventas del mes - - - - - //

    const [arrayVentasDelMes, setarrayVentasDelMes] = useState([]);
    const [ventasDelMes, setventasDelMes] = useState("");

    const obtenerVentasDelMes = () => {
        let hoy = new Date().setHours(0, 0, 0, 0);
        //let mesPasado = new Date().setMonth(new Date().getMonth() - 1);
        const primerDiaDelMes = primerDiaDelMesMilisegundos();
        const referenciasDb = db.collection("OrdenesProductos");
        referenciasDb
            .where("fechaNumero", ">=", primerDiaDelMes)
            .get()
            .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setarrayVentasDelMes(referenciasSnap);
            })
            .catch((error) => {
                //console.error("Error al obtener los productos:", error);
            });
    };

    useEffect(() => {
        if (arrayVentasDelMes.length == 0) {
            obtenerVentasDelMes();
        }
    }, []);

    useEffect(() => {
        if (arrayVentasDelMes.length > 0) {
            let ventasDelMesParaMostar = calcularTotalDeObjeto(arrayVentasDelMes);
            setventasDelMes(ventasDelMesParaMostar);
            //console.log(ventasDelMesParaMostar, "ventasDelMesParaMostar");
        }
    }, [arrayVentasDelMes]);



    // - - - - - funciones globales - - - - - //

    const calcularTotalDeObjeto = (data) => {
        let total = 0;
        data.map((item) => {
            total = total + parseInt(item.total.replace("$", "").replace(".", ""));
        });
        return total;
    }

    useEffect(() => {
        const convertirMilisegundosAFecha = (milisegundos) => {
            let fecha = new Date(milisegundos);
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            let fechaCompleta = dia + "/" + mes + "/" + anio;
            //console.log(fechaCompleta, "fechaCompleta");
            return fechaCompleta;
        }
        convertirMilisegundosAFecha(1692662267723);
    }, []);

    function primerDiaDelMesMilisegundos() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const primerDiaDelMes = firstDayOfMonth.getTime();
        return primerDiaDelMes;
    }


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    // - - - - - traer datos por rango - - - - - //

    const [inicioRango, setinicioRango] = useState("");
    const [finRango, setfinRango] = useState("");
    const [serviciosPorRango, setserviciosPorRango] = useState([]);

    const funcionTraerRangoSeleccionado = () => {
        //console.log(inicioRango, finRango, "inicioRango, finRango");
        if (inicioRango && finRango) {
            const startTimestamp = new Date(inicioRango).getTime();
            const endTimestamp = new Date(finRango).getTime() + 86399999; // Add a day's worth of milliseconds
            //console.log(startTimestamp, endTimestamp, "startTimestamp, endTimestamp");
            db.collection("OrdenesProductos")
                .where("fechaNumero", ">=", startTimestamp)
                .where("fechaNumero", "<=", endTimestamp)
                .get()
                .then((querySnapshot) => {
                    const servicios = [];
                    querySnapshot.forEach((doc) => {
                        servicios.push(doc.data());
                    });
                    setserviciosPorRango(servicios);
                })
                .catch((error) => {
                    //console.log("Error getting documents: ", error);
                }
                );
        }
    }

    function calcularTotal() {
        let total = 0;
        serviciosPorRango.map((item) => {
            total = total + parseInt(item.total.replace("$", "").replace(".", ""));
        });
        //console.log("total", total);
    }

    useEffect(() => {
        if (serviciosPorRango.length > 0) {
            //console.log(serviciosPorRango, "serviciosPorRango");
        }
    }, [serviciosPorRango]);

     // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    return (
        <div className="alineacionVertical">
            <FlechaVolver ruta={"/login"} />
            <span className="texto25pxFw700TtUpper">analiticas</span>
            <div className="estiloListaEdicion"
                style={{ margin: "20px 0px 10px 0px" }}
            >
                <div
                    className="divVentasHoyCirculo"
                    style={{ margin: "0px 10px 0px 5px" }}
                    >
                    {ventasDeHoy > 0 ? (
                        <>
                            <span className="numeroVentas">{ventasDeHoy}</span>
                            <span className="texto15pxFw700TtUpper">ventas de hoy</span>
                        </>
                    ) : null}
                </div>
                <div
                    className="divVentasHoyCirculo"
                    style={{ margin: "0px 5px 0px 10px" }}
                >
                    {ventasDelMes > 0 ? (
                        <>
                            <span className="numeroVentas">{ventasDelMes}</span>
                            <span className="texto15pxFw700TtUpper">ventas del mes</span>
                        </>
                    ) : null}
                </div>
            </div>
            <div
                className="divIzquierdaRow100"
                style={{ margin: "0px auto 5px 15px" }}
            >
                <span
                    className="textareaEdicion3"
                >
                    inicio de rango:
                </span>
                <input
                    type="date"
                    id="dateInput"
                    className="textareaEdicion3"
                    value={inicioRango}
                    onChange={(e) => setinicioRango(e.target.value)}
                />
            </div>
            <div
                className="divIzquierdaRow100"
                style={{ margin: "0px auto 5px 15px" }}
            >
                <span
                    className="textareaEdicion3"
                >
                    Fin de rango:
                </span>
                <input
                    type="date"
                    id="dateInput"
                    className="textareaEdicion3"
                    value={finRango}
                    onChange={(e) => setfinRango(e.target.value)}
                />
            </div>
            <button
                className="botonGeneral"
                onClick={() => funcionTraerRangoSeleccionado()}
            >
                Traer servicios
            </button>
            <button
                className="botonGeneral"
                onClick={() => calcularTotal(serviciosPorRango)}
            >
                pruebas
            </button>
        </div>
    );
}

export default AnaliticaConDatosFire;

const objetoEjemploProductos = [
    {
        "id": "9oDJdt5wdvh2AnUIIX8B",
        "cartItem": [
            {
                "name": "CREMAS",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "idTienda": 1,
                "codeRef": "CREMAS",
                "id": "9TZ6yeGrR6lkMdso9QqG",
                "count": 1,
                "stock": 687,
                "price": "780"
            }
        ],
        "estatusPago": "PENDIENTE",
        "total": "$ 780,00",
        "timestamp": {
            "seconds": 1692573948,
            "nanoseconds": 163000000
        },
        "estatusDespacho": "PENDIENTE",
        "numeroGuia": "ASIGNAR",
        "timeMs": 1692573948163,
        "fechaNumero": 1682573948163,
        "direccion": "PENDIENTE"
    },
    {
        "id": "O3dWmrr0shxNNQiW65kl",
        "timestamp": {
            "seconds": 1692573975,
            "nanoseconds": 415000000
        },
        "estatusPago": "PENDIENTE",
        "numeroGuia": "ASIGNAR",
        "direccion": "PENDIENTE",
        "cartItem": [
            {
                "price": "780",
                "id": "9TZ6yeGrR6lkMdso9QqG",
                "idTienda": 1,
                "name": "CREMAS",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "count": 1,
                "codeRef": "CREMAS",
                "stock": 687
            }
        ],
        "estatusDespacho": "PENDIENTE",
        "timeMs": 1692573975415,
        "total": "$ 780,00",
        "fechaNumero": 1690573948163
    },
    {
        "id": "Qu1ut1dcgse23ub2s5xu",
        "estatusDespacho": "PENDIENTE",
        "total": "$ 1.300,00",
        "timestamp": {
            "seconds": 1692573959,
            "nanoseconds": 91000000
        },
        "timeMs": 1692573959091,
        "numeroGuia": "ASIGNAR",
        "fechaNumero": 1691573948163,
        "direccion": "PENDIENTE",
        "estatusPago": "PENDIENTE",
        "cartItem": [
            {
                "img": [
                    "https://draconsoftware.com/storage/files/6YAwCY3KZJfGM4CgiK7OIPwS1ocBjfCNIEqkaXpP.jpg"
                ],
                "codeRef": "AGUA MICELAR",
                "idTienda": 1,
                "stock": 694,
                "count": 2,
                "price": "650",
                "name": "AGUA MICELAR",
                "id": "YPF4sru2cK6wCIqrI8xL"
            }
        ]
    },
    {
        "id": "Wyvv9Xzc108Px2yTmeg3",
        "numeroGuia": "ASIGNAR",
        "estatusDespacho": "PENDIENTE",
        "direccion": "PENDIENTE",
        "fechaNumero": 1693473948163,
        "timeMs": 1692580108878,
        "timestamp": {
            "seconds": 1692580108,
            "nanoseconds": 878000000
        },
        "cartItem": [
            {
                "name": "CREMAS",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "idTienda": 1,
                "codeRef": "CREMAS",
                "stock": 687,
                "id": "9TZ6yeGrR6lkMdso9QqG",
                "price": "780",
                "count": 1
            },
            {
                "id": "YPF4sru2cK6wCIqrI8xL",
                "idTienda": 1,
                "count": 1,
                "price": "650",
                "stock": 694,
                "name": "AGUA MICELAR",
                "codeRef": "AGUA MICELAR",
                "img": [
                    "https://draconsoftware.com/storage/files/6YAwCY3KZJfGM4CgiK7OIPwS1ocBjfCNIEqkaXpP.jpg"
                ]
            }
        ],
        "estatusPago": "PENDIENTE",
        "total": "$ 1.430,00"
    }
]

const objetoEjemploServicios = [
    {
        "id": "6IgthEp1yD7iFxIn6G3y",
        "citasAsignadas": 1,
        "numeroFecha": 1689516000000,
        "email": "alexander@pruebas.com",
        "fechaNumero": 1682573948163,
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
        "fechaNumero": 1682573948163,
        "ciudadMasTimeMs": "MINAS1688828400000",
        "ciudad": "MINAS"
    },
    {
        "id": "dYlP7aneR283FGXXj2RK",
        "total": "$ 11.700,00",
        "observaciones": "",
        "email": "alexander@programador.com",
        "fechaNumero": 1682573948163,
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

// 1692573948163 es 2023-07-07
// 1672573940163 es 2022-07-07
// 1692573940000 es 2023-07-07 00:00:00
// 1692500000000 es 2023-07-06 00:00:00
// 1692473948163 es 2023-07-06 16:59:08
// 1691573948163 es 2023-06-27 16:59:08
// 1690573948163 es 2023-06-18 16:59:08
// 1682573948163 es 2023-04-30 16:59:08
// 1692649763319 es 2023-07-07 16:56:03
// 1690416000000 es 2023-05-25 00:00:00
// 2023-04-30 es 1682573948163
// 2023-05-30 es 1690573948163
// 2023-06-30 es 1691573948163
// 2023-07-30 es 1692573948163
// 2023-08-20 es 1693473948163
// 2023-08-15 es 1693423948163

// 1684368000000 es 2023-04-15 00:00:00
// 1692575999999 es 2023-07-07 23:59:59
// 1692489600000 es 2023-07-06 00:00:00