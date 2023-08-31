import "./../../../cssGeneral/CssGeneral.css";
import { useEffect, useState } from 'react';
import { db, auth, storage } from "../../../firebase/index";

const Analitica = () => {

    const [inicioRango, setinicioRango] = useState("");
    const [finRango, setfinRango] = useState("");

    // funcion calcular el total de ejemploObjetoServicios
    useEffect(() => {
        function calcularTotal() {
            let total = 0;
            ejemploObjetoServicios.map((item) => {
                total = total + parseInt(item.total.replace("$", "").replace(".", ""));
            });
            //console.log("total", total);
        }
        calcularTotal();
    }, []);



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
        </div>
    );
}

export default Analitica;

const ejemploObjetoServicios = [
    {
        "id": "6IgthEp1yD7iFxIn6G3y",
        "cartItem": [
            {
                "id": "2Vvi98YQz9CiGwKOvFYh",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "price": "1950",
                "name": "MEDIAS PIERNAS",
                "stock": 99708,
                "count": 6
            }
        ],
        "timestamp": {
            "seconds": 1689516000,
            "nanoseconds": 0
        },
        "timeMs": [
            1688824800000,
            1691002800000,
            1689516000000
        ],
        "estatusServicio": "PENDIENTE",
        "citasAsignadas": 1,
        "email": "alexander@pruebas.com",
        "estatusPago": "PENDIENTE",
        "ciudad": "MINAS",
        "ciudadMasTimeMs": "MINAS1688824800000",
        "uid": "VtcZOBq94abfrEZGtK13sOObrIL2",
        "observaciones": "",
        "total": "$ 11.700,00"
    },
    {
        "id": "3q7joQ5Pc4wrMMhaOMAT",
        "timestamp": {
            "seconds": 1688828400,
            "nanoseconds": 0
        },
        "timeMs": [
            1688828400000
        ],
        "cartItem": [
            {
                "count": 6,
                "id": "2Vvi98YQz9CiGwKOvFYh",
                "stock": 99708,
                "name": "Medias Piernas",
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "price": "1950"
            }
        ],
        "estatusServicio": "PENDIENTE",
        "total": "$ 11.700,00",
        "uid": "bwTkcuhvqgViW0Orr7YL5EXtUwy1",
        "ciudadMasTimeMs": "MINAS1688828400000",
        "citasAsignadas": 1,
        "email": "1040p150823@p.com",
        "ciudad": "MINAS",
        "observaciones": "",
        "estatusPago": "PENDIENTE"
    },
    {
        "id": "dYlP7aneR283FGXXj2RK",
        "timestamp": {
            "seconds": 1688826600,
            "nanoseconds": 0
        },
        "observaciones": "",
        "total": "$ 11.700,00",
        "ciudad": "MINAS",
        "estatusServicio": "PENDIENTE",
        "uid": "1mgs8W9OgYgbWNS7aXIQMO1YlD02",
        "citasAsignadas": 1,
        "timeMs": [
            1688826600000
        ],
        "email": "alexander@programador.com",
        "estatusPago": "PENDIENTE",
        "cartItem": [
            {
                "count": 6,
                "img": [
                    "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
                ],
                "name": "Medias Piernas",
                "stock": 99708,
                "price": "1950",
                "id": "2Vvi98YQz9CiGwKOvFYh"
            }
        ],
        "ciudadMasTimeMs": "MINAS1688826600000"
    }
]