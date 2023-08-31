import ItemHoraDisponibles from "./ItemHoraDisponibles";
import { Link } from "react-router-dom";
import "./../../../../cssGeneral/CssGeneral.css";

import { HiArrowNarrowLeft } from "react-icons/hi";

const MapHoraDisponibles = ({ list }) => {
  return (
    <div className="divListItemServicios">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/dias-disponibles-estaticos">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div className="divClienteSeleccioneEldia">
        <span className="textoSeleccioneCategoria">selecciona la hora</span>
      </div>
      <div className="divClienteSeleccioneEldia">
        {list.map((product) => (
          <ItemHoraDisponibles key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default MapHoraDisponibles;
