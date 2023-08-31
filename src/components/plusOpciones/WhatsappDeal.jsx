import { BsWhatsapp } from "react-icons/bs";

export default function WhatsappDeal() {
   
    const { contextNumeroWhatsapp } = useContext(CartContext);
   
    return (
        <a href= {`https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}`} >
           <div style={{color:'#2979ff'}}>  
           <BsWhatsapp /> 
           </div>
        </a>
    );
}
