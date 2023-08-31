import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import DetailServicios from './DetailServicios'
import { db, auth, storage } from '../../../../firebase'
import Spinner from '../../../../components/spinner/Spinner'

const BdDetailServicios = () => {
    //console.log('llamando a BdDetailServicios')
    const [loading, setLoading] = useState(false)

    const [item, setItem] = useState([])
    const { productId } = useParams()
    useEffect(() => {
        setLoading(true)
        const docRef = db.collection("ItemServicios").doc(productId)

        docRef.get().then((querySnapshot) => {
            setLoading(false)
            setItem({ id: querySnapshot.id, ...querySnapshot.data() })
        })
    }, [productId])

    return (
        <Box minHeight="87vh">
            {loading === true ? <Spinner /> : <DetailServicios item={item} />}
        </Box>
    )
}

export default BdDetailServicios
