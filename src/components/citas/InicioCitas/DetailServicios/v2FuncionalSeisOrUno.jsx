import { useContext, useEffect, useState } from "react";
import ItemCount from "../../../itemCount/ItemCount";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import CartContext from "../../../../context/CartContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import "./../../../../cssGeneral/CssGeneral.css";

const DetailServicios = ({ item }) => {
  const { productsAdd, providerDuracionCita } = useContext(CartContext);
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

      <div className="divImagenProducto">
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
        <div className="alineacionHorizontalFlexwrap">
          <div
            style={{ margin: "10px", }} >
            <Link
              to="/seleccion-ciudad-cita"
              style={{ textDecoration: "none" }}
            >
              <div
                onClick={() => handleClickAddToCart(1)}
                variant="contained"
                className="divBotonContinuar"
              >
                <span className="textoBotonRegistrarCliente">
                  Agregar 1 sesión
                </span>
              </div>
            </Link>
          </div>
  
          <div
            style={{ margin: "10px", }} >
            <Link
              to="/seleccion-ciudad-cita"
              style={{ textDecoration: "none" }}
            >
              <div
                onClick={() => handleClickAddToCart(6)}
                variant="contained"
                className="divBotonContinuar"
              >
                <span className="textoBotonRegistrarCliente">
                    Pack 6 sesiones!
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="divDescripcionServicio">
            <p className="parrafoDescripcionServicio">
                {item.descripcion}
            </p>
        </div>    
      </div>
    </div>
  );
};
  

export default DetailServicios;
