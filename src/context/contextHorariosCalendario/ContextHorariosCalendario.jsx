import { useState, useEffect, useContext } from 'react' 
import { db, auth, storage } from './../../firebase'
import CartContext from "../CartContext";

const ContextHorariosCalendario = () => {
  //console.log('llamando a ContextHorariosCalendario');
    const { providerHorariosCalendario, contextHorariosCalendario } = useContext(CartContext);

    const [contadorLlamadas, setContadorLlamadas] = useState(0)

      useEffect(() => {
        if (contadorLlamadas === 0) {
        setContadorLlamadas(contadorLlamadas + 1)
        //console.log('ContextHorariosCalendario: ', contadorLlamadas)
        const obtenerCiudades = async () => {
          const data = await db.collection("DiasDisponiblesCalendario").get();
          providerHorariosCalendario(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        obtenerCiudades(); 
      }
      }, [contextHorariosCalendario]);

    return null;
}

export default ContextHorariosCalendario;