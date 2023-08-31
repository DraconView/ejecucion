import { useState, useEffect, useContext } from 'react' 
import { useParams } from 'react-router-dom'
import { db, auth, storage } from '../../firebase'
import CartContext from "../CartContext";

const ContextCiudades = () => {
    //console.log('llamando a ContextCiudades')
    const {
        providerEnviarCiudades,
      } = useContext(CartContext);

    const [list, setlist] = useState([])
    const { categoryId } = useParams()

    const [contadorLlamadas, setContadorLlamadas] = useState(0)
    
    useEffect(() => {

        setContadorLlamadas(contadorLlamadas + 1)
        //console.log('ContextCiudades: ', contadorLlamadas)
         
        let docRef
        if (categoryId) {
            docRef = db
                .collection("Ciudades")
                .where('categoryId', '==', categoryId)
                //console.log('con categoría')
        } else {
            docRef = db
            .collection("Ciudades")
            //console.log('sin categoría')   
        }

        docRef.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados')
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
            //console.log(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }, [categoryId])

    useEffect(() => {
        if (list) {
            providerEnviarCiudades(list)
            //console.log('se enviaron las')
        }
    }, [list])

    return null;
}

export default ContextCiudades;
