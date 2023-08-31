import ItemInicioCategorias from './ItemInicioCategorias'
import "./../../cssGeneral/CssGeneral.css";

const ListInicioCategorias = ({ list }) => {
    return (
        <div>
            <div className='divTextoSeleccioneCategoria'> 
                <span className='textoSeleccioneCategoria' > 
                    seleccione la categoría 
                </span>
            </div>
            <div className='alineacionCategoriasProductos'>
                {list.map((product) => (
                    <ItemInicioCategorias key={product.id} item={product} />
                ))}
            </div>
        </div>
    )
}

export default ListInicioCategorias
