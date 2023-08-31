// NO ESTA EN USO
import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CartContext from "../../../../context/CartContext";
import "../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../context/contextCiudades/ContextCiudadesAsincrono";

function CiudadesCreadas() {
  const { contextCiudades, contextHorariosCalendario, providerEleccionCiudad } =
    useContext(CartContext);

  const [ciudad, setciudad] = useState("");

  const handleCiudadClick = (ciudad) => {
    setciudad(ciudad);
    //console.log("ciudad", ciudad);
    providerEleccionCiudad(ciudad);
  };

  return (
    <div className="alineacionVertical">
      {contextCiudades.map((ciudad, index) => (
        <div
          key={index}
          className="divCantidadDiasDisponibles"
          onClick={() => handleCiudadClick(ciudad.ciudad)}
        >
          {ciudad.ciudad}
        </div>
      ))}
      {contextCiudades.length === 0 && <ContextCiudadesAsincrono />}
    </div>
  );
}

export default CiudadesCreadas;
