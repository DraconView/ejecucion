// conexion ItemListContainer ItemList Item
// MAPEA LA COLECCION QUE RECIBA Y POR CADA UNO RENDERIZA UN => Item
import Item from '../item/Item'
import "./../../cssGeneral/CssGeneral.css";

const ItemList = ({ list }) => {
    return (
        <div className='alineacionItemList' >
            {list.map((product) => (
                <Item key={product.id} item={product} />
            ))}
        </div>
    )
}

export default ItemList
