import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ListLogo from './ListLogo'
import { db, auth, storage } from '../../firebase'
import Spinner from '../../components/spinner/Spinner'

const BdLogo = (altura) => {
    //console.log('llamando a BdLogo');
    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    useEffect(() => {
        const localLogo = localStorage.getItem("localLogo");
        if (localLogo) {
            setlist(JSON.parse(localLogo));
        } else {
            let docRef
            if (categoryId) {
                docRef = db
                    .collection("BdLogo")
            } else {
                docRef = db
                    .collection("BdLogo")
            }

            docRef.get().then((querySnapshot) => {
                if (querySnapshot.size === 0) {
                    //console.log('Carga el logo')
                }
                const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                localStorage.setItem("localLogo", JSON.stringify(data));
                setlist(data);
            });
        }
    }, [categoryId])

    return (
        <>  
            {list.length > 0 ? 
                <ListLogo list={list} altura={altura} /> : null }
        </>
    )
}

export default BdLogo
