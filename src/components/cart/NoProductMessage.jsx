import Alert from '../alert/Alert'
import "./../../cssGeneral/CssGeneral.css";

    var alturaViewport = window.innerHeight;    

const NoProductMessage = () => {
    return (
        <div className="alineacionVerticalSinWidth"
            style={{ textAlign:'center', minHeight:"77vh" }}>
               <div style={{marginBottom:'100px' }} >
            <Alert text="🙁 Ups, hubo un error por 
            favor comunicate con nosotros!  " />
            </div>
        </div>
    )
}

export default NoProductMessage
