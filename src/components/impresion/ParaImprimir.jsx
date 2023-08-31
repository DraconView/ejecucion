import { useContext, useState, useEffect } from 'react'
import Spinner from '../../components/spinner/Spinner'
import { db, auth, storage } from '../../firebase'
import CartContext from "../../context/CartContext";
import { FiPrinter } from "react-icons/fi";
import ListaProductosDetallados from '../../components/reciboVenta/ListaProductosDetallados'
import { BsWhatsapp } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft} from "react-icons/hi";
import "./../../../../cssGeneral/CssGeneral.css";

function ReciboVenta({orderId}) {

    const { contextBdOrdenes, contextNumeroWhatsapp } = useContext(CartContext);

    const [datosDeRespuesta, setdatosDeRespuesta] = useState([])
    const [loading, setLoading] = useState(false)
    const [arrayProductos, setarrayProductos] = useState([])


    let relleno = 'variable'

    useEffect(() => {
        setLoading(true)
        const docRef = db.collection(`${contextBdOrdenes}`).doc(orderId)

        docRef.get().then((querySnapshot) => {
            setLoading(false)
            setdatosDeRespuesta({ id: querySnapshot.id, ...querySnapshot.data() }) 
        })
        //console.log('datosDeRespuesta', datosDeRespuesta)
    }, [orderId])

    useEffect(() => {
        if (datosDeRespuesta.cartItem === undefined || datosDeRespuesta.cartItem === null) {
            //console.log('no hay datos')
        } else {
            setarrayProductos(datosDeRespuesta.cartItem) 
        }
    }, [datosDeRespuesta])

    useEffect(() => {
        function autoFocus() {
            window.scrollTo(0,0);
        }
        autoFocus()
    }, [])

    const imprimirComprobante = () => { // ocultar componentes que no se van imprimir en el recibo
        document.getElementById('idBotonImprimir', 'idFooter', 'idBasicSpeedDial').style.visibility = "hidden";       
       
         window.print();
       
         document.getElementById('idBotonImprimir', 'idFooter', 'idBasicSpeedDial').style.visibility = "visible";   
    }  
    
    const phoneNumber = 59891853283
    const codigoMasText = `Hola mi codigo de compra es: ${orderId}`
    const link = `https://wa.me/${phoneNumber}?text=${codigoMasText}`

    const enviarPorWhatsapp = async () => { 
        const whatsappURL = `https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}&text=${encodeURIComponent('¡Acabo de realizar una compra por la pagina web! a nombre de ' + datoNombre  )}`;
        window.open(whatsappURL, '_blank');
    }
    
    return(
        <> 
            <div 
                style={{ alignitems: 'left', display: 'flex', cursor:'pointer',
                         backgroundColor:'transparent', width:'100%' }}>
                <Link to="/"> 
                <HiArrowNarrowLeft style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
            </div>
        {loading === true ? <Spinner /> :
     <div className='divPrincipalRecibo' >
     <div className='divAlineacionWhatsapp'>
     <div className='divBotonImprimir'
          id="idBotonImprimir"
          onClick={enviarPorWhatsapp}>
         <span className='textoConfirmacionWhatsapp'>
            Confirmar
         </span>
         <BsWhatsapp className='textoConfirmacionWhatsapp'/>
     </div>   
     </div> 
     <div style={{
         backgroundColor:'#ffffff', marginBottom:'50px', marginTop:'10px',
         minWidth:'345px', padding:'15px', boxShadow: '0px 0px 5px 0px #808080',width:'270px'  
     }}  >
     <div style={{textAlign:'center', display:'flex', flexdirection:'column', marginTop:'50px', backgroundColor:'#ffffff'}}>
     <div style={{ he:'100%' , marginTop:'10px', backgroundColor:'black' }}/>
     <span style={{ marginTop:'15px' }}> RECIBO DE VENTA N° {relleno}</span>
        <div className='datosClienteRecibo'>    
            <span className="textoNombreClienteRecibo" style={{ marginTop:'15px' }}> 
                CLIENTE:  {datoNombre}</span>
            <span className="textoNombreClienteRecibo" style={{ marginTop:'5px' }}> 
                TELEFONO:  {datoPhone}</span>
            <span className="textoNombreClienteRecibo" style={{ marginTop:'5px' }}> 
                FECHA:  {datoFecha}</span>    
        </div>  
     <div className='divDivider' style={{ marginTop:'3px' }}/>
   
         <div className='divDivider' style={{marginTop:'10px', marginBottom:'10px', }}/>
         <div className='alineacionHorizontaljustificaconsSpaceAround'/>
                 <div className='cantDetalleValor'>
                     <span>CANT</span>
                 </div>
                 <div className='cantDetalleValor'>
                     <span>DETALLE</span>
                 </div>
                 <div className='cantDetalleValor'>
                     <span>VALOR</span>
                 </div>
             </div>
         <div style={{height:'30px'}}></div>
         <div className='divDivider' style={{ marginTop:'10px', marginBottom:'10px' }}/>
         <div className='alineacionHorizontaljustificaconsSpaceBetween'/>
             <span>IVA: {'0.00'}</span>
             <span>TOTAL: {datosDeRespuesta.total}</span>
             </div>
         <div className='divDivider' style={{ marginTop:'10px', marginBottom:'10px' }}/>
         <span>TERMINOS Y CONDICIONES</span>
         <div className='divDivider' style={{ marginTop:'10px' }}/>
         <div className='divDivider' style={{ marginTop:'3px', marginBottom:'10px' }}/>
         <span style={{ margin:' 20px 0px 20px 0px' }} >GRACIAS POR SU COMPRA</span> 
         <div style={{
              marginBottom:'20px', boxSizing:'border-box', marginTop:'20px',
               }}>
         </div>           
     </div>            
     </div>
     </div>    
        }</>
    )
}

export default ReciboVenta; 





