import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { BsWhatsapp } from "react-icons/bs";
import "./CssFlotanteContactoMensaje.css";

const FlotanteContacto = () => {

   const { contextNumeroWhatsapp } = useContext(CartContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible]);

  return (
    <div>
      {isVisible && (
        <a href={`https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}`}>
          <div style={{ position: "fixed", bottom: 25, right: 20 }}>
            <div className="divFlotanteContactoMensaje">
              <BsWhatsapp size={24} color="white" />
              <span className="spanFlotanteContactoMensaje">
                Enviar mensaje
              </span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default FlotanteContacto;
