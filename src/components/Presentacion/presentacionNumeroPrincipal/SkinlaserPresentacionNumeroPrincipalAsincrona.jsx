import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/CartContext";
import { useParams } from "react-router-dom";
import ContextCiudadesAsincrono from "../../../context/contextCiudades/ContextCiudadesAsincrono";
import ContextServiciosAsincrono from "../../../context/contextServicios/ContextServiciosAsincrono";
import BdLogo from "../../../components/LogoBd/BdLogo";

export default function PresentacionNumeroPrincipalAsincrona() {
  //console.log("llamando a PresentacionNumeroPrincipalAsincrona");
  const { contextServicios, providerNumeroWhatsapp, providerBdOrdenes, contextCiudades, contextHorariosCalendario } =
    useContext(CartContext);

  const [vistaDivBotonServicios, setvistaDivBotonServicios] = useState("none");

  useEffect(() => {
    if (contextCiudades.length > 0 && contextHorariosCalendario.length > 0 && contextServicios.length > 0) {
      setvistaDivBotonServicios("flex");
    }
  }, [contextCiudades, contextHorariosCalendario, contextServicios]);

  useEffect(() => {
    providerNumeroWhatsapp("59891853283");

    const localRol = localStorage.getItem("localRol");
    //console.log(localRol, "localRol");
  }, []);

  if (contextCiudades.length === 0 || contextServicios.length === 0) {
    return (
      <>
        <ContextCiudadesAsincrono />
        <ContextServiciosAsincrono />
      </>
    );
  }

  return (
    <div className="divPrincipalPresentacion">
      <div className="divLogoPresentacion">
        <BdLogo altura={100}/>
      </div>

      <div style={{ display: `${vistaDivBotonServicios}` }}>
        <div className="divOpcionesServiciosProductos">
          <Link style={{ textDecoration: "none" }} to={`/seleccion-servicios`}>
            <div
              className="divBotonContinuar"
              style={{ margin: "200px 0px 0px 0px" }} 
              onClick={() => providerBdOrdenes("OrdenesServicios")}
            >
              <span className="textoBotonRegistrarCliente">Agendar</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
