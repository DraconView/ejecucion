import { useState, useEffect, useContext } from 'react' 
import { useParams } from 'react-router-dom'
import { db, auth, storage } from './../../firebase'
//import Spinner from '../../../../components/spinner/Spinner'
import CartContext from "../CartContext";
import { Link } from "react-router-dom";

const ContextServicios = () => {
    //console.log('llamando a ContextServicios')
    const {
        providerEnviarServicios,
      } = useContext(CartContext);

    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    useEffect(() => {

        let docRef
        if (categoryId) {
            docRef = db
                .collection("ItemServicios")
                .where('categoryId', '==', categoryId)
                //console.log('con categoría')
        } else {
            docRef = db
            .collection("ItemServicios")
            .orderBy("relevancia", "asc")
            //console.log('sin categoría')   
        }

        docRef.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados')
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
        })
    }, [categoryId])

    useEffect(() => {
        if (list) {
            providerEnviarServicios(list)
            //console.log('se enviaron los servicios')
        }
    }, [list])

    return null;
}

export default ContextServicios;
