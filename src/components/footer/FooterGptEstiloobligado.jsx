import "./Footer.css"; // Estilos CSS personalizados

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img
          src="https://www.amazon.com.mx/gp/corp-headquarters/images/amazon-logo-white.svg"
          alt="Logo de Amazon"
        />
      </div>
      <div className="footer__links">
        <div className="footer__section">
          <h4>Conócenos</h4>
          <ul>
            <li><a href="#">Trabajar en Amazon</a></li>
            <li><a href="#">Sobre Amazon.mx</a></li>
            <li><a href="#">Inversionistas</a></li>
            <li><a href="#">Noticias</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Gana dinero con nosotros</h4>
          <ul>
            <li><a href="#">Vende en Amazon</a></li>
            <li><a href="#">Programa de afiliados</a></li>
            <li><a href="#">Publica tu libro en Kindle</a></li>
            <li><a href="#">Advertise Your Products</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Paga con nosotros</h4>
          <ul>
            <li><a href="#">Tarjeta de crédito y débito</a></li>
            <li><a href="#">Meses sin intereses</a></li>
            <li><a href="#">Amazon Cash</a></li>
            <li><a href="#">Recarga tu cuenta</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Amazon y COVID-19</a></li>
            <li><a href="#">Centro de ayuda</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
