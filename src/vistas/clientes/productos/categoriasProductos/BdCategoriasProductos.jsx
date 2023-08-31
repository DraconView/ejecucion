import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ListCategoriasProductos from './ListCategoriasProductos'
import Spinner from '../../../../components/spinner/Spinner'
import CartContext from "../../../../context/CartContext";
import ContextServiciosAsincrono from "../../../../context/contextServicios/ContextServiciosAsincrono";
import LocalFireCategoriasProductos from "../../../../context/localFireCategoriasProductos/LocalFireCategoriasProductos";

const BdItemProductos = () => {
    //console.log('llamando a BdItemProductos');

    const { contextItemProductos, providerBdOrdenes } = useContext(CartContext);
    const [list, setlist] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
        if (contextItemProductos) {
            setlist(contextItemProductos)
            //console.log('se enviaron los servicios')
        }
    }, [contextItemProductos])

    useEffect(() => {
        providerBdOrdenes("OrdenesProductos")
    }, [])

    if (contextItemProductos.length === 0) {
        return (
            <>
                <LocalFireCategoriasProductos />
            </>
        );
    }

    return (
        <>
            {list.length > 0 ?
                <ListCategoriasProductos list={list} /> : <Spinner />}
        </>
    )
}

export default BdItemProductos