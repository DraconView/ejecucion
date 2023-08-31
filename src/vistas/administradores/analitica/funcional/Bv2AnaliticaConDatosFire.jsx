import { useEffect, useState } from 'react';
import { db } from "../../../firebase/index";

const AnaliticaConDatosFire = () => {

    //console.log("AnaliticaConDatosFire");
    const [inicioRango, setinicioRango] = useState("");
    const [finRango, setfinRango] = useState("");
    const [serviciosEnRango, setServiciosEnRango] = useState([]);

    const funcionTraerRangoSeleccionado = () => {
        //console.log(inicioRango, finRango, "inicioRango, finRango");
        /*2023-07-07 2023-07-10 inicioRango, finRango*/ // numeroFecha
        if (inicioRango && finRango) {
            const startTimestamp = new Date(inicioRango).getTime();
            const endTimestamp = new Date(finRango).getTime() + 86399999; // Add a day's worth of milliseconds
            //console.log(startTimestamp, endTimestamp, "startTimestamp, endTimestamp");
            db.collection("servicios")
                .where("fecha", ">=", startTimestamp)
                .where("fecha", "<=", endTimestamp)
                .get()
                .then((querySnapshot) => {
                    const servicios = [];
                    querySnapshot.forEach((doc) => {
                        servicios.push(doc.data());
                    });
                    setServiciosEnRango(servicios);
                })
                .catch((error) => {
                    //console.log("Error getting documents: ", error);
                }
                );
        }
    }

    /* useEffect(() => {
         if (serviciosEnRango.length > 0) {
             const serviciosPorTipo = {};
             serviciosEnRango.forEach(servicio => {
                 if (serviciosPorTipo[servicio.tipo]) {
                     serviciosPorTipo[servicio.tipo] += 1;
                 } else {
                     serviciosPorTipo[servicio.tipo] = 1;
                 }
             });
             //console.log(serviciosPorTipo);
         }
     }, [serviciosEnRango]);*/

    useEffect(() => {
        if (serviciosEnRango.length > 0) {
            //console.log(serviciosEnRango);
        }
    }, [serviciosEnRango]);

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
        </div>
    );
}

export default AnaliticaConDatosFire;
