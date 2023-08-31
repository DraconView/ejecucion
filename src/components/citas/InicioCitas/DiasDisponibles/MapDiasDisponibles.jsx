import {useContext, useState, useEffect } from "react";
import ItemDiasDisponibles from "./ItemDiasDisponibles";
import { Link } from "react-router-dom";
import CartContext from "../../../../context/CartContext";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { GrMapLocation } from "react-icons/gr";

const MapDiasDisponibles = ({ list }) => {

  const { contextCiudadSeleccionada , contextPuntoReferencia } = useContext(CartContext);
  
  const [loading, setLoading] = useState(false);

  return (
    <div className="divListItemServicios">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/seleccion-ciudad-cita">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoTituloCiudadSeleccionada">{contextCiudadSeleccionada}</span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoPuntoReferenciaSeleccionado">{contextPuntoReferencia}</span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoSeleccioneCategoria">selecciona el día</span>
      </div>
      <div className="divClienteSeleccioneEldia">
        {list.map((product) => (
          <ItemDiasDisponibles key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default MapDiasDisponibles;
