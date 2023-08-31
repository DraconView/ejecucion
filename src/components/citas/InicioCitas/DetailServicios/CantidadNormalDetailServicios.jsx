import { useContext, useEffect, useState } from "react";
import ItemCount from "../../../itemCount/ItemCount";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import CartContext from "../../../../context/CartContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import "./../../../../cssGeneral/CssGeneral.css";

const ItemDetail = ({ item }) => {
  const { productsAdd } = useContext(CartContext);

  const [count, setCount] = useState(1);
  const [selectCount, setSelectCount] = useState(true);
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

  const handleClickComprar = () => {
    if (count > 0) {
      setSelectCount(true);
      productsAdd({
        id: item.id,
        name: item.name,
        img: item.img,
        idTienda: 1,
        count,
        price: item.price,
        stock: item.stock,
        codeRef: item.name,
        // volumen: item.volumen
      });
    }
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

      <div className="divDatosOpcionesProducto">
        <div className="divIndiqueLasSesiones">
          <span className="textoSeleccioneCategoria">Indique las sesiones</span>
        </div>

        <div className="n">
          <ItemCount
            setCount={setCount}
            count={count}
            min={1}
            stock={item.stock}
          />
        </div>

        <div className="divCantidadMasCarro">
          {selectCount ? (
            <>
              <div className="alineacionVerticalSinWidth"
                style={{ marginTop: "10px" }}>
                <Link
                  to="/seleccion-ciudad-cita"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    onClick={handleClickComprar}
                    variant="contained"
                    className="divBotonContinuar"
                  >
                    <span className="textoBotonRegistrarCliente">
                      confirmar
                    </span>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="alineacionVerticalSinWidth"
              style={{ height: "40px" }}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <button
                  variant="contained"
                  onClick={handleClickComprar}
                  disabled={item.stock === 0}
                  style={{
                    backgroundColor: "#000",
                    color: "#ffffff",
                    width: "185px",
                  }}
                >
                  confirmar cantidad
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
