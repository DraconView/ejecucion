import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth, storage } from '../../firebase';
//import Spinner from '../../../../components/spinner/Spinner';
import CartContext from "../CartContext";
import { Link } from "react-router-dom";

const ContextServiciosAsincrono = () => {
  const { providerEnviarServicios } = useContext(CartContext);
  const [list, setlist] = useState([]);
  const { categoryId } = useParams();

  const [contadorLlamadas, setContadorLlamadas] = useState(0)

  useEffect(() => {
    const obtenerDatosLocalStorage = () => {
      const localData = localStorage.getItem('LocalServicios');
      if (localData) {
        setlist(JSON.parse(localData));
        //console.log('esta en LocalServicios');
      } else {
        obtenerServiciosFirestore();
      }
    };

    const obtenerServiciosFirestore = async () => {

      setContadorLlamadas(contadorLlamadas + 1)
      //console.log('firebase servicios')

      let docRef;
      if (categoryId) {
        docRef = db
          .collection("ItemServicios")
          .where('categoryId', '==', categoryId);
      } else {
        docRef = db
          .collection("ItemServicios")
          .orderBy("relevancia", "asc");
      }

      const querySnapshot = await docRef.get();
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados');
      }
      const services = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setlist(services);
      localStorage.setItem('LocalServicios', JSON.stringify(services));
    };

    obtenerDatosLocalStorage();
  }, [categoryId]);

  useEffect(() => {
    if (list.length > 0) {
      providerEnviarServicios(list);
      //console.log('se enviaron los servicios');
    }
  }, [list, providerEnviarServicios]);

  return null;
}

export default ContextServiciosAsincrono;
