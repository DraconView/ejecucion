import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth, storage } from '../../firebase';
//import Spinner from '../../../../components/spinner/Spinner';
import CartContext from "../CartContext";
import { Link } from "react-router-dom";

const LocalFireCategoriasProductos = () => {
  //console.log('llamando a LocalFireCategoriasProductos5');
  const { providerItemProductos } = useContext(CartContext);
  const [list, setlist] = useState([]);
  const { categoryId } = useParams();

  const [contadorLlamadas, setContadorLlamadas] = useState(0)

  useEffect(() => {
    const obtenerDatosLocalStorage = () => {
      const localData = localStorage.getItem('LocalCategoriasProductos');
      if (localData) {
        setlist(JSON.parse(localData));
        //console.log('esta en LocalCategoriasProductos');
      } else {
        obtenerRegistrosFirestore();
        //console.log('esta en firestore');
      }
    };

    const obtenerRegistrosFirestore = async () => {
      setContadorLlamadas(contadorLlamadas + 1)
      //console.log('obtenerRegistrosFirestore: ', contadorLlamadas)
      let docRef;
      if (categoryId) {
        docRef = db
          .collection("CategoriasProductos")
          .where('categoryId', '==', categoryId);
      } else {
        docRef = db
          .collection("CategoriasProductos")
          .orderBy("relevancia", "asc");
      }
      const querySnapshot = await docRef.get();
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados');
      }
      const services = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setlist(services);
      localStorage.setItem('LocalCategoriasProductos', JSON.stringify(services));
    };
    obtenerDatosLocalStorage();
  }, [categoryId]);

  useEffect(() => {
    if (list.length > 0) {
      providerItemProductos(list);
      //console.log(list, 'providerItemProductos(list);');
    }
  }, [list, providerItemProductos]);

  return null;
}

export default LocalFireCategoriasProductos;
