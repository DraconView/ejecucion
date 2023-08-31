import { useContext, useState, useEffect } from "react";
import ItemCount from "../../../itemCount/ItemCount";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import CartContext from "../../../../context/CartContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import "./../../../../cssGeneral/CssGeneral.css";

const DetailServicios = ({ item }) => {
  const { productsAdd } = useContext(CartContext);
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

  const handleAddToCart = (sessionsCount) => {
    productsAdd({
      id: item.id,
      name: item.name,
      img: item.img,
      idTienda: 1,
      count: sessionsCount,
      price: item.price,
      stock: item.stock,
      codeRef: item.name,
    });
  };

  const handleClickAddToCart = (sessionsCount) => {
    productsAdd({
      id: item.id,
      name: item.name,
      price: item.price,
      count: sessionsCount, 
    });
  };

  return (
    <div className="divPrincipalItemDetail">
      {/* ... */}
      <div className="divDatosOpcionesProducto">
        <div className="divIndiqueLasSesiones">
          <span className="textoSeleccioneCategoria">Indique las sesiones</span>
        </div>
  
        <div className="divCantidadMasCarro">
          <div className="alineacionVerticalSinWidth"
            style={{ marginTop: "10px" }} >
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
  
          <div className="alineacionVerticalSinWidth"
            style={{ marginTop: "10px" }}>
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
                  Agregar 6 sesiones
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
  

export default DetailServicios;
