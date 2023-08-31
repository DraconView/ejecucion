import { MdLocalPhone } from "react-icons/md";
export default function TelefonoDeal() {
    const link = `tel:+59891853283`

    return (
        <a href= {link} >
        <div style={{color:'#2979ff'}}>            
           <MdLocalPhone />
        </div>  
        </a>
    );
}
