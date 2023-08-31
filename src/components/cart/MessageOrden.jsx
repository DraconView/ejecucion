// PROPORCIONA EL ID DE ORDEN 
import Alert from '../alert/Alert'
import EnvWhaIdBoton from '../buttons/EnvWhaIdBoton'
import ReciboVenta from '../../components/reciboVenta/ReciboVenta'

const MessageOrden = ({ orderId }) => {

    return (
        <div > 
            <ReciboVenta orderId={orderId} />
        </div>
    )
}

export default MessageOrden


