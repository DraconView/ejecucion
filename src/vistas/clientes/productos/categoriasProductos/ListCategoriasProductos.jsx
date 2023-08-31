import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../../../cssGeneral/CssGeneral.css";
import CategoriasProductos from "./CategoriasProductos";

import { HiArrowNarrowLeft } from "react-icons/hi";

const ListCategoriasProductos = ({ list }) => {

    return (
        <div className='alineacionListProductos'>
            <Link
                to="/"
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
            <div 
                className='divTextoSeleccioneCategoria'
                style={{ margin: "0px 0px 30px 0px"}}
                > 
                <span className='textoSeleccioneCategoria' > 
                Descubre el sabor en cada selección
                </span>
            </div>
            <div className='divPrincipalItemDetail' >
                {list.map((product) => (
                    <CategoriasProductos key={product.id} item={product} />
                ))}
            </div>
        </div>
    )
}

export default ListCategoriasProductos
