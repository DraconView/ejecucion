import { useContext, useEffect, useState } from "react";
import { db, auth, storage } from "./../../../firebase/index";
import CartContext from "./../../../context/CartContext";
import { useParams } from "react-router-dom";
import "./../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";
import ContextCiudadesAsincrono from "../../../context/contextCiudades/ContextCiudadesAsincrono";
import ContextServiciosAsincrono from "../../../context/contextServicios/ContextServiciosAsincrono";
import BdLogo from "../../../components/LogoBd/BdLogo";

const presentacionNumeroDinamico = () => {
  //console.log("llamando a presentacionNumeroDinamico");
  const { phone } = useParams();

  const {
    providerNumeroWhatsapp,
    providerBdOrdenes,
    contextCiudades,
    contextHorariosCalendario,
    contextServicios,
  } = useContext(CartContext);

  const [vistaDivBotonServicios, setvistaDivBotonServicios] = useState("none");

  const [asistente, setasistente] = useState([]);

  useEffect(() => {
    if (contextCiudades.length > 0 && contextHorariosCalendario.length > 0 && contextServicios.length > 0) {
      setvistaDivBotonServicios("flex");
    }
  }, [contextCiudades, contextHorariosCalendario , contextServicios]);

  useEffect(() => {
    let docRef = db.collection("Rol").where("celularMovil", "==", phone);
    docRef.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados')
        providerNumeroWhatsapp("59891853283");
      } else {
        providerNumeroWhatsapp(phone);
        setasistente(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    });

    const localRol = localStorage.getItem("localRol");
  }, [phone]);

  if (contextCiudades.length === 0 || contextServicios.length === 0) {
    return (
      <>
        <ContextCiudadesAsincrono />
        <ContextServiciosAsincrono />
      </>
    );
  }

  return (
    <div className="divPrincipalpresentacionNumeroDinamico">
      <div className="divLogopresentacionNumeroDinamico">
        <BdLogo altura={100}/>
      </div>

      <div style={{ display: `${vistaDivBotonServicios}` }}>
        <div className="divOpcionesServiciosProductos">
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
    </div>
  );
};

export default presentacionNumeroDinamico;

/*

//import InstagramEmbed from "react-instagram-embed";

        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B7f8GYPh1d-/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
*/
