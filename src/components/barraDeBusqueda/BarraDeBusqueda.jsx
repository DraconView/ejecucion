import { useState, useEffect } from 'react'
import { BiSearchAlt } from "react-icons/bi";

const BarraDeBusqueda = () => {
    const [criterioBusqueda, setcriterioBusqueda] = useState("");
    const classes = useStyles();

  return (
    <>
    <div className={classes.alineacionHorizontalWrap}>    
      <BiSearchAlt className={classes.iconosText}/>
      <input
        placeholder="Buscar productos" value={criterioBusqueda} 
        onChange={(e) => setcriterioBusqueda(e.target.value.toUpperCase())}
        className={classes.casillaTexto}
      /></div>
    </>
  )
}

export default BarraDeBusqueda
