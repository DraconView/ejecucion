import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { db, auth, storage } from '../../firebase'
import CartContext from "../../context/CartContext";
//import MainImgCategories from './MainImgCategories'
import Spinner from '../spinner/Spinner'
import Marcas from './Marcas'

const BarraCategoriasContext = () => {
    //console.log('BarraCategoriasContext');

    const { contextItemProductos } = useContext(CartContext);
    const { categoryId } = useParams()

    const [list, setlist] = useState([])

    useEffect(() => {
        if (contextItemProductos.length > 0) {
            setlist(contextItemProductos)
            //console.log('barra')
        }
    }, [contextItemProductos])

    if (contextItemProductos.length === 0) {
        //console.log('no hay categorias');
        return (
            <>
                <LocalFireCategoriasProductos />
            </>
        );
    }

    return (
        <>

            {list.length > 0 ?
                <Marcas list={list} />
                : null}
        </>
    )
}

export default BarraCategoriasContext

// <MainImgCategories imgCategory={categoryId} /> imagenes de categorias

