import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ListItemServicios from './ListItemServicios'
import { db, auth, storage } from '../../../../firebase'
import Spinner from '../../../../components/spinner/Spinner'

const BdItemServicios = () => {
    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    useEffect(() => {

        let docRef
        if (categoryId) {
            docRef = db
                .collection("ItemServicios")
                .where('categoryId', '==', categoryId)
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
            
            <ListItemServicios list={list} /> : <Spinner />}
        </>
    )
}

export default BdItemServicios


