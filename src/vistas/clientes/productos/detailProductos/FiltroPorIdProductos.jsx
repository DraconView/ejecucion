import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import DetailProductos from './DetailProductos'
import Spinner from '../../../../components/spinner/Spinner'
import CartContext from "../../../../context/CartContext";
import LocalFireItemProductos from "../../../../context/localFireItemProductos/LocalFireItemProductos";

const FiltroPorIdProductos = () => {
  //console.log('llamando a FiltroPorIdProductos25');
  const { contextFiltrarProductosPorCategoria } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { productId } = useParams();
  //console.log('productId', productId);

  useEffect(() => {
    setLoading(true);
    // filtrar el id desde el contexto
    const filteredItem = contextFiltrarProductosPorCategoria.find(item => item.id === productId); 

    if (filteredItem) {
      setItem(filteredItem);
      //console.log('filteredItem', filteredItem);
      setLoading(false);
    } else {
      // Si el producto no se encuentra en el objeto serviciosPureba
      setLoading(false);
      setItem(null);
    }
  }, [productId, contextFiltrarProductosPorCategoria]);

    return (
        <Box minHeight="87vh">
            {item ? <DetailProductos item={item} /> : <Spinner />}
        </Box>
    )
}

export default FiltroPorIdProductos;