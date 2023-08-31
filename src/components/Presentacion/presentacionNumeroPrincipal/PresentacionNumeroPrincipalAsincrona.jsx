import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/CartContext";
import { useParams } from "react-router-dom";
import ContextCiudadesAsincrono from "../../../context/contextCiudades/ContextCiudadesAsincrono";
import ContextServiciosAsincrono from "../../../context/contextServicios/ContextServiciosAsincrono";
import LocalFireCategoriasProductos from "../../../context/localFireCategoriasProductos/LocalFireCategoriasProductos";
import BdLogo from "../../../components/LogoBd/BdLogo";

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
    <div className="divPrincipalPresentacion">
      <div className="divLogoPresentacion">
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

      <div style={{ display: `${vistaDivBotonProductos}` }}>
        <div
          className="divOpcionesServiciosProductos"
          style={{ margin: "20px 0px 0px 0px" }}
        >
          <Link style={{ textDecoration: "none" }} to={`/categorias-productos`}>
            <div
              className="divBotonContinuar"
              onClick={() => providerBdOrdenes("OrdenesProductos")}
            >
              <span className="textoBotonRegistrarCliente">Productos</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
