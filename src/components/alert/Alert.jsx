//  BOTON VOLVER AL INICIO
import { Link } from 'react-router-dom'
import BtnVolverHome from '../buttons/BtnVolverHome'
import "./../../cssGeneral/CssGeneral.css";
 
const Alert = ({ text }) => {
    return (
        <>
            <div className="alineacionVerticalSinWidth">
                <div>
                    <h3 style={{ marginBottom: '20px', width: '330px'
                
                }}>{text}</h3>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <BtnVolverHome />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Alert
