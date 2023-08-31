import { useContext, useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./../../cssGeneral/CssGeneral.css";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";

const CiudadRegistro = () => {
  const { contextCiudades, providerEleccionCiudad , providerPuntoReferencia } = useContext(CartContext);

  const [loader, setLoader] = useState(false);
  const [vistaListaReplegada, setvistaListaReplegada] = useState("none");
  const [vistaListaDesplegada, setvistaListaDesplegada] = useState("flex");

  const [ciudades, setciudades] = useState([]);
  const [ciudad, setciudad] = useState("");

  useEffect(() => {
    if (contextCiudades) {
      setciudades(contextCiudades);
      //console.log('contextCiudades', contextCiudades)
    }
  }, [contextCiudades]);

  const accionListaReplegada = () => {
    setvistaListaReplegada("none");
    setvistaListaDesplegada("flex");
  };

  const accionListaDesplegada = () => {
    setvistaListaReplegada("flex");
    setvistaListaDesplegada("none");
  };

  return (
    <div className="divSeleccionCiudadCita">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/login">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>

      <div className="n">
        <span className="textoSeleccionCiudadCita">Selecciona la ciudad</span>
      </div>
      <div className="contenedorCiudadesCitaClientes">
        {ciudades.map((ciudad) => (
          <Link
            key={ciudad.id}
            to="/registrarse"
            style={{ textDecoration: "none" }}
          >
            <div
              key={ciudad.id}
              className="divCiudadesCitaClientes"
              onClick={() => {
                setciudad(ciudad.ciudad);
                providerEleccionCiudad(ciudad.nombrePublico);
                providerPuntoReferencia(ciudad.puntoReferencia);
              }}
            >
              <span className="textoListaDesplegableHorarios">
                {ciudad.nombrePublico}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// <Link key={ciudad.id} to="/dias-disponibles-estaticos">
// </Link>

export default CiudadRegistro;
