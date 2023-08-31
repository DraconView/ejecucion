import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../../context/CartContext";

import { url2file } from "../../../../utils/utils";

const ItemHoraDisponibles = ({ item: { stock, horaLegible, id, name }}) => {

  const { RecibirIdDiaHoraSeleccionado } = useContext(CartContext);

  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDragStart = (e) => e.preventDefault();

  const [vistaTextoCategoria, setvistaTextoCategoria] = useState("flex");
  const [vistaSubCategorias, setvistaSubCategorias] = useState("none");
  const [arraysubCategorias, setarraysubCategorias] = useState([]);

  const handleShare = async () => {
    const filesArray = [];
    for (const url of imagesArray) {
      const file = await url2file(url);
      filesArray.push(file);
    }
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator
        .share({
          files: filesArray,
          title: name,
          text: name,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("No se puede compartir en este navegador.");
      //console.log(`No se puede compartir en este navegador.`);
    }
  };

  function accionAbrirMenu() {
    setvistaTextoCategoria("none");
    setvistaSubCategorias("flex");
  }

  return (
    <>
      {stock === 1 ? (
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="divFechaDisponible"
          onClick={() => {
            RecibirIdDiaHoraSeleccionado(id)
          }}
          >
            <span>{horaLegible}</span>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default ItemHoraDisponibles;
