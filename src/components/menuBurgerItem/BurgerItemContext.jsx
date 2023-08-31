import { useState, useEffect, useContext } from 'react' 
import { useParams } from "react-router-dom";
import CartContext from "../../context/CartContext";
import ListBurgerItem from "./ListBurgerItem";
import Spinner from "../spinner/Spinner";
import ContextServiciosAsincrono from "../../context/contextServicios/ContextServiciosAsincrono";

const BurgerItemContext = () => {
  
    const { contextServicios } = useContext(CartContext);

  const { categoryId } = useParams();
  const [list, setlist] = useState([]);

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
    <>{list.length > 0 ? <ListBurgerItem list={list} /> : <Spinner />}</>
  );
};

export default BurgerItemContext;
