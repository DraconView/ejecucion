import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/CartContext";
import { useParams } from "react-router-dom";
import ContextCiudadesAsincrono from "../../../context/contextCiudades/ContextCiudadesAsincrono";
import ContextServiciosAsincrono from "../../../context/contextServicios/ContextServiciosAsincrono";
import LocalFireCategoriasProductos from "../../../context/localFireCategoriasProductos/LocalFireCategoriasProductos";
import BdLogo from "../../../components/LogoBd/BdLogo";
import "../../../cssGeneral/CssGeneral.css";

export default function PresentacionNumeroPrincipalAsincrona() {
  //console.log("llamando a PresentacionNumeroPrincipalAsincrona");
  const {
    contextServicios,
    providerNumeroWhatsapp,
    providerBdOrdenes,
    contextCiudades,
    contextHorariosCalendario,
    contextItemProductos,
  } =
    useContext(CartContext);

  const [vistaDivBotonServicios, setvistaDivBotonServicios] = useState("none");
  const [vistaDivBotonProductos, setvistaDivBotonProductos] = useState("none");

  useEffect(() => {
    if (contextCiudades.length > 0 && contextHorariosCalendario.length > 0 && contextServicios.length > 0) {
      setvistaDivBotonServicios("flex");
    }
  }, [contextCiudades, contextHorariosCalendario, contextServicios]);

  useEffect(() => {
    if (contextItemProductos.length > 0) {
      setvistaDivBotonProductos("flex");
    }
  }, [contextItemProductos]);

  useEffect(() => {
    providerNumeroWhatsapp("59891853283");

    const localRol = localStorage.getItem("localRol");
    //console.log(localRol, "localRol");
  }, []);

  /* ESTA CAUSANDO PROBLEMAS
  if (contextCiudades.length === 0 || contextServicios.length === 0) {
    //console.log("contextCiudades.length === 0 || contextServicios.length === 0");
    return (
      <>
        <ContextCiudadesAsincrono />
        <ContextServiciosAsincrono />
      </>
    );
  }*/

  if (contextItemProductos.length === 0) {
    //console.log("contextItemProductos.length === 0");
    return (
      <>
        <LocalFireCategoriasProductos />
      </>
    );
  }

  return (
    <div className="divPrincipalPresentacionRestaurantes">
      <div 
        className="divLogoRestaurantes"
        style={{ margin: "100px 0px 0px 0px" }}
        >
        <BdLogo altura={100} />
      </div>

      <div style={{ display: `${vistaDivBotonServicios}` }}>
        <div
          className="divOpcionesServiciosProductos"
          style={{ margin: "100px 0px 0px 0px" }}
        >
          <Link style={{ textDecoration: "none" }} to={`/seleccion-servicios`}>
            <div
              className="divBotonContinuar"
              onClick={() => providerBdOrdenes("OrdenesServicios")}
            >
              <span className="textoBotonRegistrarCliente">Agendar</span>
            </div>
          </Link>
        </div>
      </div>

      <div 
        className="alineacionVertical"
        style={{ margin: "100px 0px 0px 0px" }}
        >
        <span className="textoBienvenidaRestaurantes">
        Delicias que despiertan <br />
         tus sentidos
          </span>
      </div>

      <div style={{ display: `${vistaDivBotonProductos}` }}>
        <div
          className="divOpcionesServiciosProductos"
          style={{ margin: "100px 0px 0px 0px" }}
        >
          <Link style={{ textDecoration: "none" }} to={`/categorias-productos`}>
            <div
              className="divBotonContinuarNaranja"
              onClick={() => providerBdOrdenes("OrdenesProductos")}
            >
              <span className="textoBotonRegistrarCliente">Menu</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
