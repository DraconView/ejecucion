import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import CartContext from "../../context/CartContext";
import ListBurgerCategorias from "./ListBurgerCategoriasContext";
import Spinner from "../spinner/Spinner";
import ContextServiciosAsincrono from "../../context/contextServicios/ContextServiciosAsincrono";

const ConeccionBdBurgerCategorias = () => {
//console.log("ConeccionBdBurgerCategorias25");
  const { contextItemProductos } = useContext(CartContext);

  const { categoryId } = useParams();
  const [list, setlist] = useState([]);
//console.log("list",list);

  useEffect(() => {
    if (contextItemProductos) {
      setlist(contextItemProductos)
    }
  }, [contextItemProductos])

  if (contextItemProductos.length === 0) {
    return (
      <>
        <ContextServiciosAsincrono />
      </>
    );
  }

  return (
    <>{list.length > 0 ?
      <ListBurgerCategorias list={list} />
      : <Spinner />}</>
  );
};

export default ConeccionBdBurgerCategorias;
