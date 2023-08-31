import { useState, useEffect, useContext } from 'react' 
import { db, auth, storage } from './../../firebase'
import CartContext from "../CartContext";

const ContextHorariosCalendario = () => {

    const { providerHorariosCalendario } = useContext(CartContext);

      useEffect(() => {
        const obtenerCiudades = async () => {
          const data = await db.collection("DiasDisponiblesCalendario").get();
          providerHorariosCalendario(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        obtenerCiudades(); 
      }, []);

    return null;
}

export default ContextHorariosCalendario;