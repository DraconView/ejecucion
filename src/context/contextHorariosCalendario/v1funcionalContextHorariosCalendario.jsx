import { useState, useEffect, useContext } from 'react';
import { db, auth, storage } from './../../firebase';
import CartContext from "../CartContext";

const ContextHorariosCalendario = () => {
  const { providerHorariosCalendario } = useContext(CartContext);
  const [datosCalendario, setDatosCalendario] = useState([]);

  useEffect(() => {
    const obtenerCiudades = async () => {
      const data = await db.collection("DiasDisponiblesCalendario").get();
      setDatosCalendario(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    obtenerCiudades();
  }, []);

  useEffect(() => {
    providerHorariosCalendario(datosCalendario);
  }, [datosCalendario, providerHorariosCalendario]);

  return null;
}

export default ContextHorariosCalendario;
