import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import "./../../cssGeneral/CssGeneral.css";

const Contacto2 = ({ name1, categoryId1 }) => {
    const classes = useStyles();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

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

    db.collection("catalogos")
      .add({
        name: name,
        categoryId: categoryId,
      })
      .then(() => {
        setLoader(false);
        alert("datos enviados");
      })
      .catch((error) => {
        alert(error.categoryId);
        setLoader(false);
      });

    setName("");
    setCategoryId("");
  };

var alturaViewport = window.innerHeight;

  return (
    <div style={{
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/recursos%2Fnube-prueba2.svg?alt=media&token=b0fba8b8-40bb-48d9-a84f-bb57cb42d168)', 
        backgroundSize: 'cover', height:`${alturaViewport}px`, 
        alignitems: 'center', display: 'flex', flexdirection:'column'
    }}>

<div 
        style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%' }}>
                <Link to="/contacto"> 
                <img
                src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Fflecha%20volver.svg?alt=media&token=aa449818-6c69-4425-99ac-5e58f51ba6a8"
                alt="imagen-volver"
                style={{ minWidth:'25px', maxWidth:'30px', margin:'25px 0px 0px 25px'}} /></Link>
      </div>

      <div className="alineacionVerticalSinWidth">
                <img
                src="https://firebasestorage.googleapis.com/v0/b/monacoshoestienda.appspot.com/o/logo%2FlogoConRayo.svg?alt=media&token=c6b377ad-b507-4e92-b36e-847903506144"
                alt="imagen-logo"
                style={{ minWidth:'255px', maxWidth:'260px', margin:'45px 0px 7px 0px'}} />
                <span style={{ fontSize:'13px', fontWeight:'bold', margin:'0px 0px 30px 0px' }}> 
                    Vende tus productos fácil y rapidito</span>
      </div>

    <form  
    onSubmit={handleSubmit}
    className="alineacionVerticalSinWidth">
      
      <div className={classes.alineacionHorizontalWrap}>    
      <img alt="imagen-logo" className={classes.iconosText}
        src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Ficonos%20contacto%2Finstagram.svg?alt=media&token=4fb392c1-b234-400c-8921-570991d01658" />
      <input
        placeholder="Tu Perfil de Instagram" value={name} onChange={(e) => setName(e.target.value)}
        className={classes.casillaTexto}
      /></div>
      
      <div className={classes.alineacionHorizontalWrap}>    
      <img alt="imagen-logo" className={classes.iconosText}
        src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Ficonos%20contacto%2Ftiktok.svg?alt=media&token=9d0902a9-bdea-423b-a15c-e31f71db7be3" />
      <input
        placeholder="Tu Tik Tok" value={name} onChange={(e) => setName(e.target.value)}
        className={classes.casillaTexto}
      /></div>
      
      <div className={classes.alineacionHorizontalWrap}>    
      <img alt="imagen-logo" className={classes.iconosText}
        src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Ficonos%20contacto%2Fmaps.svg?alt=media&token=8ee310af-167a-45b3-8042-bf6275438fa1" />
      <input
        placeholder="Dirección de tienda física" value={name} onChange={(e) => setName(e.target.value)}
        className={classes.casillaTexto}
      /></div>

      <div className={classes.alineacionHorizontalWrap}>    
      <img alt="imagen-logo" className={classes.iconosText}
        src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Ficonos%20contacto%2Fenlaces.svg?alt=media&token=cc3dd9db-0882-41be-b073-4d65b0e315ee" />
      <input
        placeholder="Enlace de tu sitio web (si tienes)" value={name} onChange={(e) => setName(e.target.value)}
        className={classes.casillaTexto}
      /></div>

     <div className={classes.alineacionHorizontalWrap}>    
      <img alt="imagen-logo" className={classes.iconosText}
        src="https://firebasestorage.googleapis.com/v0/b/vennditotienda.appspot.com/o/logos%2Ficonos%20contacto%2Femail.svg?alt=media&token=02ac0c72-4b2b-4dba-ab71-bea66ffeaf06" />
      <input
        placeholder="Tu Email" value={name} onChange={(e) => setName(e.target.value)}
        className={classes.casillaTexto}
      /></div>

      <Link to="/procesando">  
      <button
        type="submit"
        style={{ 
            margin:'20px 0px 50px 0px', borderRadius:'15px', fontSize:'15px',
            border:'none', fontWeight:'bold', padding:'10px 25px 10px 25px',
            background: loader ? "#000000" : "#000000" }}
      >
        Continuar
      </button>
      </Link>
    </form>
    </div>
  );
};

const useStyles = makeStyles({
    textoPrincipal: {
        fontSize:'25px', fontWeight:'bold', color:'#000000', 
        maxWidth:'350px', textAlign:'center' 
    },
    casillaTexto: {
        margin:'10px 40px 10px 0px', borderRadius:'20px', width:'300px',
        border:'solid 1px #000000', padding:'10px 20px 10px 45px', fontSize:'15px',
        backgroundColor:'#ffffff'
    },
    alineacionHorizontalWrap: {
        display: 'flex', flexdirection:'row'
    },
    iconosText: {
        width:'30px', position:'relative', left:40, backgroundColor:'transparent' 
    },

  });

export default Contacto2;

