import "./../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

const Buttons = ({ setShowForm }) => {
  return (
    <>
      <div className="alineacionVerticalSinWidth" style={{ margin: "10px" }} >
        <div className="divBotonContinuar" onClick={() => setShowForm(true)}>
          <span className="textoBotonRegistrarCliente">CONFIRMAR</span>
        </div>
      </div>
      <div className="alineacionVerticalSinWidth" style={{ margin: "10px" }} >
        <Link to="/catalogo" style={{ textDecoration: "none" }}>
          <div className="divBotonContinuar">
            <span className="textoBotonRegistrarCliente">VOLVER</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Buttons;
