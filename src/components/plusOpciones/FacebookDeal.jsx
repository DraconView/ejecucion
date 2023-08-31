import { BsFacebook } from "react-icons/bs";

export default function FacebookDeal() {
    const link =`https://www.facebook.com/Monaco-shoes-100503349210729/`

    return (
        <a href= {link} >
        <div style={{color:'#2979ff'}}>
           <BsFacebook /> 
        </div>   
        </a>
    );
}
