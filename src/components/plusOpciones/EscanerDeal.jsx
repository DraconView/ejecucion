import { MdQrCode2 } from "react-icons/md";

export default function EscanerDeal() {
    const link =`https://scannerqr.netlify.app/`

    return (
        
        <a href= {link} >
        <div style={{color:'#2979ff'}}>
           <MdQrCode2 /> 
        </div>
        </a>
    );
}

