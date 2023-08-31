import { BsInstagram } from "react-icons/bs";

export default function InstagramDeal() {
    const link =`https://www.instagram.com/restaurantes.col`

    return (
        <a href= {link} >
        <div style={{color:'#2979ff'}}>
           <BsInstagram /> 
        </div>   
        </a>

    );
}
