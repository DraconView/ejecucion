import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import MapHoraDisponibles from './MapHoraDisponibles'
import { db, auth, storage } from '../../../../firebase'
import CartContext from "../../../../context/CartContext";
import Spinner from '../../../spinner/Spinner'

const BdHoraDisponibles = () => {
    //console.log('llamando a BdHoraDisponibles')
    const { contextCiudadSeleccionada } = useContext(CartContext);
    const { fechaNavegacion } = useParams()

    const [list, setlist] = useState([])

    useEffect(() => {

        let docRef;
        if (fechaNavegacion) {
            docRef = db.collection("HorariosDisponiblesCitas")
            .where('ciudad', '==', contextCiudadSeleccionada)
            .where('fechaNavegacion', '==', fechaNavegacion)
            .where('stock', '==', 1)
            .orderBy("timestamp", "asc");
        } else {
            docRef = db.collection("HorariosDisponiblesCitas")
            .where('ciudad', '==', contextCiudadSeleccionada)
            .where('fechaNavegacion', '==', fechaNavegacion)
            .where('stock', '==', 1)
            .orderBy("timestamp", "asc");
        }

        docRef.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados')
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        })
    }, [fechaNavegacion])

    return (
        <>  
            
            {list.length > 0 ? 
            
            <MapHoraDisponibles list={list} /> : <Spinner />}
        </>
    )
}

export default BdHoraDisponibles


