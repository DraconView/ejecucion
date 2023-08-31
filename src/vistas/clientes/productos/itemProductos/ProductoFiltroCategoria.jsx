// CONSULTA A LA BASE DATOS PRINCIPAL => ItemPlatillo
// conexion ProductoFiltroCategoria ItemPlatillo
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import ItemPlatillo from './ItemPlatillo'
//import { getFirestore } from '../../firebase'
import { db, auth, storage } from '../../../../firebase'
//import MainImgCategories from './MainImgCategories'
import Spinner from '../../../../components/spinner/Spinner'
import ListProductos from './ListProductos'
import Marcas from '../../../../components/barraCategorias/Marcas'
import CartContext from "../../../../context/CartContext";

const ProductoFiltroCategoria = () => {

    //console.log('ProductoFiltroCategoria');

    const { providerFiltrarProductosPorCategoria } = useContext(CartContext);

    const [list, setlist] = useState([])
    //console.log('list', list);
    const { categoryIdProducto } = useParams()

    useEffect(() => {
        let docRef
        if (categoryIdProducto) {
            //console.log('categoryIdProducto2', categoryIdProducto);
            docRef = db
                .collection('ItemProductos')
                .where('categoryId', '==', categoryIdProducto)
        } else {
            docRef = db
                .collection("ItemProductos")
        }

        docRef.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados')
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
            providerFiltrarProductosPorCategoria(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }, [categoryIdProducto])

    //console.log(categoryIdProducto)
    return (
        <>
            {list.length > 0 ?
                <ListProductos list={list} /> : <Spinner />}
        </>
    )
}

export default ProductoFiltroCategoria

// <MainImgCategories imgCategory={categoryIdProducto} /> imagenes de categorias

