import { GoLocation } from "react-icons/go";

export default function UbicacionDeal() {
    const link =`https://www.google.com/search?tbs=lf:1,lf_ui:2&tbm=lcl&sxsrf=AOaemvIRLsCuC9KA4FHNm6sJ9lP2TcTtVw:1634607522882&q=Inven-tic+Technology,+Avenida+Guaimaral,+C%C3%BAcuta,+Norte+de+Santander&rflfq=1&num=10&ved=2ahUKEwjojv7Fq9XzAhUnQTABHVclCGAQtgN6BAgKEAQ#rlfi=hd:;si:18359406872650273813,l,CkRJbnZlbi10aWMgVGVjaG5vbG9neSwgQXZlbmlkYSBHdWFpbWFyYWwsIEPDumN1dGEsIE5vcnRlIGRlIFNhbnRhbmRlclpJIkFpbnZlbiB0aWMgdGVjaG5vbG9neSBhdmVuaWRhIGd1YWltYXJhbCBjw7pjdXRhIG5vcnRlIGRlIHNhbnRhbmRlcioECAIQApIBEWVsZWN0cm9uaWNzX3N0b3Jl;mv:[[7.915316999999999,-72.492212],[7.905644199999999,-72.4928722]]`
    return (
        <a href= {link} >
        <div style={{color:'#2979ff'}}>    
           <GoLocation /> 
        </div>   
        </a>
    );
}
