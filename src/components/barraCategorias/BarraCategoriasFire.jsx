import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db, auth, storage } from '../../firebase'
//import MainImgCategories from './MainImgCategories'
import Spinner from '../spinner/Spinner'
import Marcas from './Marcas'

const BarraCategoriasFire = () => {
    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    useEffect(() => {
        //const db = getFirestore()

        let docRef
        if (categoryId) {
            docRef = db
                .collection("ItemServicios")
        } else {
            docRef = db
            .collection("ItemServicios")
            .orderBy("relevancia", "asc")
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

    return (
        <>  
            
            {list.length > 0 ? 
                <Marcas list={list} />
             : null}
        </>
    )
}

export default BarraCategoriasFire

// <MainImgCategories imgCategory={categoryId} /> imagenes de categorias

