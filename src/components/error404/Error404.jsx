import { Link } from "react-router-dom";
import "./../../cssGeneral/CssGeneral.css";

const Error404 = () => {
    return (
      <div className="divPrincipalErrorVolver" >
        <h3>PAGINA NO ENCONTRADA</h3>
        <Link to="/" style={{ textDecoration: 'none' }} >
        <span className="errorVolver" >
        volver al inicio clic
          <span className="errorAqui">
          aquí
          </span>
        </span>
        </Link>
      </div>
    );
  };
  
  export default Error404;