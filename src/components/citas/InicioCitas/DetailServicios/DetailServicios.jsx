import { useContext, useEffect, useState } from "react";
import ItemCount from "../../../itemCount/ItemCount";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import CartContext from "../../../../context/CartContext";
import "./../../../../cssGeneral/CssGeneral.css";

import botonSeisSesiones from "./seisSesionesPng.png";
import veintePorciento from "./veintePorciento.svg";
import botonUnaSesion from "./unaSesionPng.png";

import { db, auth, storage } from "../../../../firebase/index";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";


const DetailServicios = ({ item }) => {
  //console.log(item, 'llamando a DetailServicios')
  const { productsAdd, providerDuracionCita, resetCantCart, providerUsuarioLogueado } = useContext(CartContext);

  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");

  const [vistaSeisSesiones, setvistaSeisSesiones] = useState("none");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
        setuserId(authUser.uid);
        providerUsuarioLogueado(authUser);
        //console.log("hay usuario");
      } else {
        setuser(null);
        setuserId("");
        //console.log("no hay usuario");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [descuento, setdescuento] = useState("");

  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  useEffect(() => {
    if (item.img === undefined) {
      setLoading(true);
    } else {
      setImagesArray([item.img]);
    }
  }, [item]);

  const handleClickAddToCart = (sessionsCount) => {
    resetCantCart();
    productsAdd({
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      count: sessionsCount,
      stock: item.stock,
    });
    providerDuracionCita(item.duracionCita);
  };

  const [vistaExpandida, setvistaExpandida] = useState("flex");
  const [vistaContraida, setvistaContraida] = useState("none");

  const accionAbrirVista = () => {
    setvistaContraida("flex");
    setvistaExpandida("none");
  };
  const accionCerrarVista = () => {
    setvistaContraida("none");
    setvistaExpandida("flex");
  };

  useEffect(() => {
    if (item.categoryId === "SERVICIOS") {
      setvistaSeisSesiones("flex");
    }
  }, [item]);

  return (
    <div className="divPrincipalItemDetail">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/seleccion-servicios">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "15px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>

      <div className="alineacionVertical">
        <div className="divIndiqueLasSesiones">
          <span className="textoSeleccioneCategoria">Indique las sesiones</span>
        </div>

        <div 
          className="divImagenProducto"
          style={{
            margin: "0px 0px 20px 0px" }}
          >
          {imagesArray.length ? (
            <AliceCarousel
              loading="lazy"
              mouseTracking
              items={imagesArray.map((img) => (
                <img src={img[0]} className="post__image" role="presentation" />
              ))}
              disableButtonsControls={true}
              disableDotsControls={false}
              touchMoveDefaultEvents={true}
              //autoPlay={true}
              autoPlayInterval={3000}
              animationDuration={1000}
              responsive="responsive"
              infinite
              autoPlayControls={true}
              autoPlayStrategy="action"
              controlsStrategy="alternate"
            />
          ) : null}
        </div>
      </div>
      <div className="divDatosOpcionesProducto">
        {user ? (
          <div className="alineacionVertical">

            <div
              style={{
                margin: "0px 0px 0px 0px",
                display: `${vistaSeisSesiones}`,
              }}
            >
              <Link
                to="/dias-disponibles-calendario"
                style={{ textDecoration: "none" }}>
                <div
                  onClick={() => handleClickAddToCart(6)}
                >
                  <img
                    src={botonSeisSesiones}
                    alt="botonSeisSesiones"
                    height="57px"
                  />
                </div>
              </Link>
            </div>

            <div
              style={{ margin: "5px 0px 15px 0px" }} >
              <Link
                to="/dias-disponibles-calendario"
                style={{ textDecoration: "none" }}
              >
                <div
                  onClick={() => handleClickAddToCart(1)}
                >
                  <img
                    src={botonUnaSesion}
                    alt="botonUnaSesion"
                    height="57px"
                  />
                </div>
              </Link>
            </div>

          </div>
        ) : (
          <div className="alineacionVertical">

            <div
              style={{
                margin: "0px 0px 0px 0px",
                display: `${vistaSeisSesiones}`,
              }}
            >
              <Link
                to="/seleccion-ciudad-cita"
                style={{ textDecoration: "none" }}>
                <div
                  onClick={() => handleClickAddToCart(6)}
                >
                  <img
                    src={botonSeisSesiones}
                    alt="botonSeisSesiones"
                    height="57px"
                  />
                </div>
              </Link>
            </div>

            <div
              style={{ margin: "5px 0px 15px 0px" }} >
              <Link
                to="/seleccion-ciudad-cita"
                style={{ textDecoration: "none" }}>
                <div
                  onClick={() => handleClickAddToCart(1)}
                >
                  <img
                    src={botonUnaSesion}
                    alt="botonUnaSesion"
                    height="57px"
                  />
                </div>
              </Link>
            </div>

          </div>
        )}

        <div
          className="alineacionHorizontaljustificaconsSpaceBetween"
          style={{
            display: `${vistaExpandida}`,
            width: "310px",
            margin: "0px auto 0px auto",
          }}
          onClick={accionAbrirVista}
        >
          <span className="textoEstatusPago">
            Ver más detalles
          </span>
          <MdExpandMore
            style={{
              fontSize: "25px",
              color: "#585858",
              margin: "0px 5px 100px 0px",
            }}
          />
        </div>

        <div
          className="divInactivoTextoDescripcionProducto"
          style={{
            display: `${vistaContraida}`,
            width: "300px",
            margin: "0px auto 25px auto",
          }}
          onClick={accionCerrarVista}
        >
          <div className="alineacionHorizontaljustificaconsSpaceBetween">
            <span
              className="textoEstatusPago"
              style={{ margin: "0px 0px 0px 0px" }}
            >
              Ver más detalles
            </span>
            <MdExpandLess
              style={{
                fontSize: "25px",
                color: "#585858",
                margin: "0px 0px 0px 0px",
              }}
            />
          </div>
          <div className="divCasillaDescripcionServicio2">
            <span>
              {item.descripcion}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};


export default DetailServicios;
