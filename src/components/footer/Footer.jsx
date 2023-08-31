import "./CssFooter.css"; // Estilos CSS personalizados
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import BdLogo from "../../components/LogoBd/BdLogo";


function Footer() {
  //console.log('llamando a Footer');
  return (
    <footer className="footer"
      style={{ margin: "40px 0px 0px 0px" }}
    >
      <div className="divDividerLightgrey" />

      <div className="logoMasEnlaces">
        <div className="footer__links">
          <div className="footer__logo">
            <BdLogo altura={50} />
          </div>
          <div className="footer__section">
            <h4 className="footer__section-title">Conócenos</h4>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Trabajar en restaurantes
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Sobre restaurantes
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Inversionistas
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__section-title">productos</h4>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Vende en restaurantes
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Programa de afiliados
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Publica 
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h4 className="footer__section-title">servicios</h4>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  Tarjeta de regalos
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  creditos
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
