import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../../../cssGeneral/CssGeneral.css";
import ItemPlatillo from "./ItemPlatillo";

import { HiArrowNarrowLeft } from "react-icons/hi";

const ListProductos = ({ list }) => {

    //console.log('list30', list);

    return (
        <div className='alineacionListProductos'>
            <Link
                to="/categorias-productos"
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
            <div className='divPrincipalItemDetail' >
                {list.map((product) => (

                    <ItemPlatillo key={product.id} item={product} />
                ))}
            </div>
        </div>
    )
}

export default ListProductos
