import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import "../../cssGeneral/CssGeneral.css";

const FlechaVolver = ({ruta}) => {

    return (
        <div className="divFlechaVolver">
            <Link
                to={ruta}
                className="divIzquierdaColumn100"
                style={{ margin: "20px 0px 0px 15px", textDecoration: "none" }}
            >
                <HiArrowNarrowLeft className="iconoAccion" />
                <span
                    style={{ margin: "0px 0px 0px 0px" }}
                    className="textoCerrarSesion"
                >
                    volver
                </span>
            </Link>
        </div>
    )
}

export default FlechaVolver;