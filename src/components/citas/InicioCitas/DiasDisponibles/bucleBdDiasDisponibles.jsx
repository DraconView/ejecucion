import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MapDiasDisponibles from './MapDiasDisponibles'
import { db, auth, storage } from '../../../../firebase'
import Spinner from '../../../../components/spinner/Spinner'

const BdDiasDisponibles = () => {
    const [list, setlist] = useState([])
    const [loading, setLoading] = useState(false)
    const { fechaNavegacion } = useParams()

    useEffect(() => {

        let docRef
        if (fechaNavegacion) {
            docRef = db
                .collection("BdCiuadadAleatoria")
                .orderBy("timestamp", "asc")
        } else {
            docRef = db
            .collection("BdCiuadadAleatoria")
            .orderBy("timestamp", "asc")
        }

        docRef.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados', 'BdDiasDisponibles')
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
 
        })
    }, [list])

   useEffect(() => {
        if (list.length > 0) {
            funcionCiudadesSinRepetir(list);
            //console.log("if")
            setLoading(false);
        } else {
            //console.log("else")
            setLoading(true);
        }   
    }, []);

    const [arrayFiltrado, setArrayFiltrado] = useState([]);

   function funcionCiudadesSinRepetir(fechaNavegacion) {
      let letArrayFiltrado = [];
      fechaNavegacion.forEach((item) => {
        let i = letArrayFiltrado.findIndex((x) => x.fechaNavegacion === item.fechaNavegacion);
        if (i <= -1) {
            letArrayFiltrado.push({ fechaNavegacion: item.fechaNavegacion });
        }  
      });
      return setArrayFiltrado(letArrayFiltrado);
    }

    return (
        <>  
            
            {list.length > 0 ? 
            
            <MapDiasDisponibles list={list} /> : <Spinner />}
        </>
    )
}

export default BdDiasDisponibles


