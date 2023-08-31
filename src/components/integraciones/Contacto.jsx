import { useState, useEffect } from "react";
import { db } from "./../../firebase";
import {Link} from 'react-router-dom'
import "./../../cssGeneral/CssGeneral.css";
//import logoPrincipal from "../../../recursosMultimedia/logo2.png";

import { MdLocalPhone } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { GoLocation } from "react-icons/go";import { HiArrowNarrowLeft} from "react-icons/hi";

const Contacto = () => {
  //console.log('llamando a Contacto');
  const [celular, setcelular] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [facebook, setfacebook] = useState("");
  const [instagram, setinstagram] = useState("");
  const [ubicacion, setubicacion] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    function autoFocus() {
        window.scrollTo(0,0);
    }
    autoFocus()
}, []) 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("informacionempresa")
      .add({
        celular: celular,
        whatsapp: whatsapp,
        facebook: facebook,
        instagram: instagram,
        ubicacion: ubicacion,
        registro: new Date(),
      })
      .then(() => {
        setLoader(false);
        alert("datos enviados");
      })
      .catch((error) => {
        alert(error.celular);
        alert(error.whatsapp);
        alert(error.facebook);
        alert(error.instagram);
        alert(error.ubicacion);
        setLoader(false);
      });
    //setcelular("");
  };


  return (
    <div style={{
        backgroundColor: '#ffffff', height:'100vh', 
        alignitems: 'center', display: 'flex', flexdirection:'column'
    }}>

<div 
        style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
                <Link to="/tablero-administrador"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>

      <div className="alineacionVerticalSinWidth">
                <img
                src="https://firebasestorage.googleapis.com/v0/b/monacoshoestienda.appspot.com/o/logo%2Fmonacoshoesacento.svg?alt=media&token=7bb220c1-4575-47bc-bffd-af0446c86e2d"
                alt="imagen-logo"
                style={{ width:'200px', margin:'40px 0px 20px 0px'}} />
      </div>

            <span className="textoPrincipal" >
                Información de contacto
            </span>

    <form  
    onSubmit={handleSubmit}
    className="alineacionVerticalSinWidth">
      <div className="alineacionHorizontalWrap">    
      <MdLocalPhone 
        alt="imagen-logo" style={{ width: '30px' , position: 'relative', left:40, color:'#000000' }}/>
      <input
        placeholder="Tu Teléfono" value={celular} onChange={(e) => setcelular(e.target.value)}
        className="casillaTexto"
      /></div>
      
      <div className="alineacionHorizontalWrap">    
      <BsWhatsapp 
        alt="imagen-logo" style={{ width: '30px' , position: 'relative', left:40, color:'#000000' }}/>
      <input
        placeholder="Tu Whatsapp" value={whatsapp} onChange={(e) => setwhatsapp(e.target.value)}
        className="casillaTexto"
      /></div>
      
      <div className="alineacionHorizontalWrap">    
      <BsFacebook 
        alt="imagen-logo" style={{ width: '30px' , position: 'relative', left:40, color:'#000000' }}/>
      <input
        placeholder="Tu Pagina de Facebook" value={facebook} onChange={(e) => setfacebook(e.target.value)}
        className="casillaTexto"
      /></div>

      <div className="alineacionHorizontalWrap">    
      <BsInstagram 
        alt="imagen-logo" style={{ width: '30px' , position: 'relative', left:40, color:'#000000' }}/>
      <input
        placeholder="Tu Perfil de Instagram" value={instagram} onChange={(e) => setinstagram(e.target.value)}
        className="casillaTexto"
      /></div>

      <div className="alineacionHorizontalWrap">    
      <GoLocation 
        alt="imagen-logo" style={{ width: '30px' , position: 'relative', left:40, color:'#000000' }}/>
      <input
        placeholder="Dirección de tienda física" value={ubicacion} onChange={(e) => setubicacion(e.target.value)}
        className="casillaTexto"
      /></div>
      
      <button
        type="submit"
        style={{ 
            margin:'20px 0px 50px 0px', borderRadius:'15px', fontSize:'15px',
            border:'none', fontWeight:'bold', padding:'10px 25px 10px 25px',
            background: loader ? "#000000" : "#000000" }}
      >
        Continuar
      </button>
    </form>
    </div>
  );
};

export default Contacto;

