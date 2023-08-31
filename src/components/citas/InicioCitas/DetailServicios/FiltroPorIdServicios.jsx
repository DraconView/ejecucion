import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import DetailServicios from './DetailServicios'
import Spinner from '../../../spinner/Spinner'
import CartContext from "../../../../context/CartContext";
import ContextServiciosAsincrono from "../../../../context/contextServicios/ContextServiciosAsincrono";

const FiltroPorIdServicios = () => {
  const { contextServicios } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    const filteredItem = contextServicios.find(item => item.id === productId);

    if (filteredItem) {
      setItem(filteredItem);
      //console.log('filteredItem', filteredItem);
      setLoading(false);
    } else {
      // Si el producto no se encuentra en el objeto serviciosPureba
      setLoading(false);
      setItem(null);
    }
  }, [productId, contextServicios]);

  if (contextServicios.length === 0) {
    return (
      <>
        <ContextServiciosAsincrono />
      </>
    );
  } else {
    //console.log('contextServicios', contextServicios);
  }

    return (
        <Box minHeight="87vh">
            {item ? <DetailServicios item={item} /> : <Spinner />}
        </Box>
    )
}

export default FiltroPorIdServicios;