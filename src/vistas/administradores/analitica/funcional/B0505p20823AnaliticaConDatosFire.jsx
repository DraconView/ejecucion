import { useEffect, useState } from 'react';
import { db } from "../../../firebase/index";

const AnaliticaConDatosFire = () => {

    //console.log("AnaliticaConDatosFire");
    const [inicioRango, setinicioRango] = useState("");
    const [finRango, setfinRango] = useState("");
    const [serviciosPorRango, setserviciosPorRango] = useState([]);

    const funcionTraerRangoSeleccionado = () => {
        //console.log(inicioRango, finRango, "inicioRango, finRango");
        /*2023-07-07 2023-07-10 inicioRango, finRango*/ // numeroFecha
        if (inicioRango && finRango) {
            const startTimestamp = new Date(inicioRango).getTime();
            const endTimestamp = new Date(finRango).getTime() + 86399999; // Add a day's worth of milliseconds
            //console.log(startTimestamp, endTimestamp, "startTimestamp, endTimestamp");
            db.collection("OrdenesProductos")
                .where("timeMs", ">=", startTimestamp)
                .where("timeMs", "<=", endTimestamp)
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
// aqui
    const traerDatosSeleccionadosEnObjeto = () => {
        if (objetoEjemploServicios.length > 0) {
            const serviciosPorTipo = {};
            objetoEjemploServicios.forEach(servicio => {
                if (serviciosPorTipo[servicio.cartItem[0].name]) {
                    serviciosPorTipo[servicio.cartItem[0].name] += 1;
                } else {
                    serviciosPorTipo[servicio.cartItem[0].name] = 1;
                }
            });
            //console.log(serviciosPorTipo);
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
            //console.log(serviciosPorRango);
        }
    }, [serviciosPorRango]);

    return (
        <div className="alineacionVertical">
            <span className="tituloGeneral">Analítica</span>
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
                onClick={() => calcularTotal()}
            >
                pruebas
            </button>
        </div>
    );
}

export default AnaliticaConDatosFire;

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
