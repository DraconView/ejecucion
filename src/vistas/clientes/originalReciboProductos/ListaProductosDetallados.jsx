import "./../../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

const ListaProductosDetallados = ({ arrayProductos }) => {
  return (
    <div className="alineacionListaProductosDetallados">
      {arrayProductos.map((item) => (
        <div key={item.id}> 
          <div style={{ marginTop: "5px" }}>
            <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }} >
            <div className="divTituloDetallesItem"> 
                <div className="cantValor">
                  <span className="spanCantDetalleValor" > {item.count} </span>
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

export default ListaProductosDetallados;

