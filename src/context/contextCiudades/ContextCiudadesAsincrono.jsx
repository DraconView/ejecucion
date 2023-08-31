import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth, storage } from '../../firebase';
import CartContext from "../CartContext";

const ContextCiudadesAsincrono = () => {
  const { providerEnviarCiudades } = useContext(CartContext);
  const [list, setlist] = useState([]);
  const { categoryId } = useParams();

  const [contadorLlamadas, setContadorLlamadas] = useState(0)
  const [marcaDeTiempo, setMarcaDeTiempo] = useState("")


useEffect(() => {
  const comprobarMarcaDeTiempo = () => {
    db.collection("MarcasDeTiempos")
      .doc("bTmLy0pYu08yt87vO4bI")
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          setMarcaDeTiempo(doc.data().ciudadesMcFire);
        } else {
          //console.log("No such document!");
        }
      })
      .catch((error) => {
        //console.log("Error getting document:", error);
      });
      //console.log('marcaDeTiempo', marcaDeTiempo)
  };
  comprobarMarcaDeTiempo(); 
}, []);


useEffect(() => {
  if (marcaDeTiempo ) {
    //console.log('marcaDeTiempo', marcaDeTiempo)
  }
}, [marcaDeTiempo]);
     

  useEffect(() => {
    const obtenerDatosLocalStorage = () => {
      const localData = localStorage.getItem('LocalCiudades');
      if (localData) {
        setlist(JSON.parse(localData));
        //console.log('esta en LocalCiudades');
      } else {
        obtenerRegistrosFirestore();
        //console.log('esta en firestore');
      }
    };

    const obtenerRegistrosFirestore = async () => {
      //console.log('firebase ciudades')
        setContadorLlamadas(contadorLlamadas + 1)
        //console.log('obtenerRegistrosFirestore: ', contadorLlamadas)
      let docRef;
      if (categoryId) {
        docRef = db
          .collection("Ciudades")
          .where('categoryId', '==', categoryId);
      } else {
        docRef = db
          .collection("Ciudades");
      }

      const querySnapshot = await docRef.get();
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados');
      }
      const cities = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setlist(cities);
      localStorage.setItem('LocalCiudades', JSON.stringify(cities));
    };

    obtenerDatosLocalStorage();
  }, [categoryId]);

  useEffect(() => {
    if (list.length > 0) {
        //console.log('providerEnviarCiudades(list);');
      providerEnviarCiudades(list);
    }
  }, [list, providerEnviarCiudades]);

  return null;
}

export default ContextCiudadesAsincrono;
