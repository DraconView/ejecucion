import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { db, auth, storage } from "./../../../../firebase";

function HorasDisponiblesCalendario() {

    const {
        contextDiaDinamicoSeleccionado, 
        contextCiudadSeleccionada,
        providerDiaMasHoraDinamicosSeleccionados,
    } = useContext(CartContext);

    const [ciudadMasDia, setciudadMasDia] = useState("");

    useEffect(() => {
        // une la ciudad seleccionada con el dia seleccionado 
        if (contextCiudadSeleccionada && contextDiaDinamicoSeleccionado) {
          function unirCiudadMasDia() {
            let unionCiudadMasDia =
              contextCiudadSeleccionada + "/" + funcionFechaLegible();
            //console.log(unionCiudadMasDia, "unionCiudadMasDia");
            return setciudadMasDia(unionCiudadMasDia);
          }
          unirCiudadMasDia();
         //console.log(ciudadMasDia, "ciudadMasDia"); 
        }
      }, [contextCiudadSeleccionada, contextDiaDinamicoSeleccionado ]);
               
function funcionFechaLegible() {
    // esta funcion convierte la fecha en un string  
  let calculoFecha = contextDiaDinamicoSeleccionado.diaCalendario.toDate();
  let fechaLegible =
    calculoFecha.getDate() +
    "/" + 
    (calculoFecha.getMonth() + 1) +
    "/" +
    calculoFecha.getFullYear();
   //console.log(fechaLegible, "fechaLegible");
  return fechaLegible.toString(); 
}

const [datosOrdenesServicios, setdatosOrdenesServicios] = useState([]);
const [revisionBaseDatos, setrevisionBaseDatos] = useState("");
const [arrayTimeMsConsulta, setarrayTimeMsConsulta] = useState([]);

    useEffect(() => {
        // CONSULTA LA BASE DE DATOS
        if (ciudadMasDia && datosOrdenesServicios.length === 0) {
          const obtenerRegistrosFirestore = () => {
            const referenciasDb = db.collection("OrdenesServicios");
            referenciasDb
              .where("ciudadMasFecha", "==", `${ciudadMasDia}`) // BUSQUEDA EXACTA
              //.where("ciudadMasFecha", ">=", `${ciudadMasDia}`) // BUSQUEDA QUE CONTENGAN
              //.where("ciudadMasFecha", "<", `${ciudadMasDia}z`) // BUSQUEDA QUE CONTENGAN
              // .orderBy("timestamp", "asc") cambia a desc
              //.orderBy("timestamp", "desc")
              .get()
              .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                  return { id: doc.id, ...doc.data() };
                });
                setdatosOrdenesServicios(referenciasSnap);
                //console.log(referenciasSnap, "referenciasSnap");
                setarrayTimeMsConsulta(referenciasSnap.map((dato) => dato.timeMs));
                if (referenciasSnap.length === 0) {
                  setrevisionBaseDatos("no hay datos");
                  //console.log("no hay datos");
                }
              })
              .catch((error) => {
                //console.error("Error al obtener los productos:", error);
              });
          };
          obtenerRegistrosFirestore();
        }
      }, [ciudadMasDia, datosOrdenesServicios]);

      return ;

}

export default HorasDisponiblesCalendario;