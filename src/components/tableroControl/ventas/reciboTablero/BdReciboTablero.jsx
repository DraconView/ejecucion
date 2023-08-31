import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import RenderDetalleReciboTablero from './RenderDetalleReciboTablero'
import { db, auth, storage } from '../../../../firebase'
import Spinner from '../../../../components/spinner/Spinner'
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft} from "react-icons/hi";

const ItemDetailContainer = () => {
    
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState([])
    const { productId } = useParams()

        useEffect(() => {
        setLoading(true)
        const docRef = db.collection("orders").doc(productId)

        docRef.get().then((querySnapshot) => {
            setLoading(false)
            setItem({ id: querySnapshot.id, ...querySnapshot.data() })
        })
    }, [productId])

    return (
        <>                    <div 
        style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
                <Link to="/edicion-recibo-ventas"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
    </div>
        <Box minHeight="87vh">
            {loading === true ? <Spinner /> : <RenderDetalleReciboTablero item={item} />}
        </Box>
        </>    
    )
}

export default ItemDetailContainer
