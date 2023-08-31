import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapDiasDisponibles from "./MapDiasDisponibles";
import { db, auth, storage } from "../../../../firebase";
import Spinner from "../../../spinner/Spinner";
import CartContext from "../../../../context/CartContext";
import { CompararDatosRepetidos } from "./CompararDatosRepetidos";
import { Link } from "react-router-dom";

import { HiArrowNarrowLeft } from "react-icons/hi";

const BdDiasDisponibles = () => {
  //console.log('llamando a BdDiasDisponibles');
  const { contextCiudadSeleccionada } = useContext(CartContext);
  const { fechaNavegacion } = useParams();

  const [list, setlist] = useState([]);
  const [arrayFiltrado, setarrayFiltrado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aviso, setAviso] = useState(false);

  useEffect(() => {
    let docRef;
    if (fechaNavegacion) {
      docRef = db
        .collection("HorariosDisponiblesCitas")
        .where("ciudad", "==", contextCiudadSeleccionada)
        .where("stock", "==", 1)
        .orderBy("timestamp", "asc");
    } else {
      docRef = db
        .collection("HorariosDisponiblesCitas")
        .where("ciudad", "==", contextCiudadSeleccionada)
        .where("stock", "==", 1)
        .orderBy("timestamp", "asc");
    }

    docRef.get().then(async (querySnapshot) => {
      if (querySnapshot.size === 0) {
        //console.log("No existen resultados", "BdDiasDisponibles");
        setAviso(true);
      }
      setlist(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const result = await CompararDatosRepetidos(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      if (result) {
        setarrayFiltrado(result);
      }
    });
  }, []);

  return (
    <>
      {aviso === true ? (
        <div >
          <div className="divSalirvolverProductosDetallados">
            <Link to="/seleccion-ciudad-cita">
              <HiArrowNarrowLeft
                style={{
                  fontSize: "35px",
                  margin: "20px 0px 0px 15px",
                  color: "#646464",
                }}
              />
            </Link>
          </div>
          <div className="divNoHayDisponibles">
            <span className="textoNoHayDisponibles">
            Informarte de las próximas fechas disponibles
            haciendo clic en el icono de WhatsApp
            </span>
          </div>
        </div>
      ) : (
        <>
          {arrayFiltrado.length > 0 ? (
            <MapDiasDisponibles list={arrayFiltrado} />
          ) : (
            <Spinner />
          )}
        </>
      )}
    </>
  );
};

export default BdDiasDisponibles;
