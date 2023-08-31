// consulta desde context
import { useState, useEffect, useContext } from 'react' 
import { useParams } from 'react-router-dom'
import ListItemServicios from './ListItemServicios'
import Spinner from '../../../spinner/Spinner'
import CartContext from "../../../../context/CartContext";
import ContextServiciosAsincrono from "../../../../context/contextServicios/ContextServiciosAsincrono";

const BdItemServicios = () => {
    //console.log('llamando a BdItemServicios')
    const { contextServicios } = useContext(CartContext);
    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    
    useEffect(() => {
        if (contextServicios) {
            setlist(contextServicios)
            //console.log('se enviaron los servicios')
        }
    }, [contextServicios])

    if (contextServicios.length === 0) {
        return (
          <>
            <ContextServiciosAsincrono />
          </>
        );
      }

    return (
        <>  
            {list.length > 0 ? 
            <ListItemServicios list={list} /> : <Spinner />}
        </>
    )
}

export default BdItemServicios


