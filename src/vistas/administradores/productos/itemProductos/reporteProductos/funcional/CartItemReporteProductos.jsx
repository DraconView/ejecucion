import "../../../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

const CartItemReporteProductos = ({ arrayProductos }) => {

  if (arrayProductos.length > 0) {
    //console.log("arrayProductos2", arrayProductos);
  } 

  return (
    <div className="alineacionListaProductosDetallados"
    style={{ backgroundColor: "green" }}
    >
      {arrayProductos.map((item) => (
        <div key={item.id}> 
          <div style={{ marginTop: "5px" }}>
            <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }} >
            <div className="divTituloDetallesItem"> 
                <div className="cantValor">
                  <span 
                    className="spanCantDetalleValor" 
                    style={{ backgroundColor: "red" }}
                    > {item.count} </span>
                </div>
                <div className="reciboReferenciaProducto">
                  <span className="spanCantDetalleValor" > {item.name} </span>
                </div>
                <div className="cantValor">
                  <span className="spanCantDetalleValor" > {item.price} </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemReporteProductos;

