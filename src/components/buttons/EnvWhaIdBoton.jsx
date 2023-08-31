import {useContext} from 'react'
import CartContext from "../../context/CartContext";
import "./../../cssGeneral/CssGeneral.css";

import { BsWhatsapp } from "react-icons/bs";

const EnvWhaIdBoton = ({ orderId }) => {

    const { contextNumeroWhatsapp } = useContext(CartContext);

    const codigoMasText = `Hello my purchase ID is: ${orderId}`
    const link = `https://wa.me/${contextNumeroWhatsapp}?text=${codigoMasText}`

    return (
        <div className="alineacionVerticalSinWidth" style={{ height: '40px' }}>   
            <div 
                variant="contained"
                style={{
                    backgroundColor: '#00bb2d',
                    color: '#ffffff', 
                    width:'185px'
                }}
            >
                <BsWhatsapp />
                confirmar code
            </div>
        </div>
    )
}

export default EnvWhaIdBoton

