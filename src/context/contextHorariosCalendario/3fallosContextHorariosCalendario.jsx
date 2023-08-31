import { useState, useEffect, useContext } from 'react';
import { db, auth, storage } from './../../firebase';
import CartContext from "../CartContext";

const ContextHorariosCalendario = () => {
  const { providerHorariosCalendario } = useContext(CartContext);
  const [datosCalendario, setDatosCalendario] = useState([]);

  useEffect(() => {
    if (datosCalendario.length > 0) {
      const obtenerCiudades = () => { 
        const referenciasDb = db.collection("DiasDisponiblesCalendario");
        referenciasDb
        .get()
        .then((querySnapshot) => {
          const referenciasSnap = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setDatosCalendario(referenciasSnap);
        })
        .catch((error) => {
          //console.log("Error obteniendo documentos: ", error);
        });
      };
      obtenerCiudades();
    }
  }, [datosCalendario]);

  useEffect(() => {
    providerHorariosCalendario(datosCalendario);
  }, [datosCalendario, providerHorariosCalendario]);

  return null;
}

export default ContextHorariosCalendario;
