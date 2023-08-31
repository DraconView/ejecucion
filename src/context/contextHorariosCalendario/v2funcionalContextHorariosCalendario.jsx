import { useState, useEffect, useContext } from 'react';
import { db, auth, storage } from './../../firebase';
import CartContext from "../CartContext";

const ContextHorariosCalendario = () => {
  const { providerHorariosCalendario } = useContext(CartContext);
  const [datosCalendario, setDatosCalendario] = useState([]);

  useEffect(() => {
    const obtenerCiudades = async () => {
      const snapshot = await db.collection("DiasDisponiblesCalendario").get();
      setDatosCalendario(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    obtenerCiudades(); // Obtener los datos iniciales

    const unsubscribe = db.collection("DiasDisponiblesCalendario").onSnapshot((snapshot) => {
      setDatosCalendario(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // Limpiar el listener al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    providerHorariosCalendario(datosCalendario);
  }, [datosCalendario, providerHorariosCalendario]);

  return null;
}

export default ContextHorariosCalendario;
