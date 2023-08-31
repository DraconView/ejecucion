import ItemServicios from './ItemServicios'
import "./../../../../cssGeneral/CssGeneral.css";
import FlechaVolver from "../../../../components/flechaVolver/FlechaVolver";

const ListItemServicios = ({ list }) => {
    return (
        <div >
            <FlechaVolver ruta={"/"} />
            <div className='divTextoSeleccioneCategoria'> 
                <span className='textoSeleccioneCategoria' > 
                    Reserva tu cita ahora mismo 
                </span>
            </div>
            <div className='alineacionListServicios'>
                {list.map((product) => (
                    <ItemServicios key={product.id} item={product} />
                ))}
            </div>
        </div>
    )
}

export default ListItemServicios
