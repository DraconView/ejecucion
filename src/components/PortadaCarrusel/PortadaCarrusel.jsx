import { makeStyles } from "@material-ui/core";
//import axios from "axios";
//import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "./../../cssGeneral/CssGeneral.css";
import { NavLink, Link } from 'react-router-dom'

var infoCarousel = 
[
  {
      "id": "palma",
      "image": "https://firebasestorage.googleapis.com/v0/b/aceiteixora.appspot.com/o/portada%2Fmercado%20palma%201255p23092022.jpg?alt=media&token=ac0f5f84-b491-4a80-bc5b-5fbd9c0ad7e3",
  },
  {
      "id": "soya",
      "image": "https://firebasestorage.googleapis.com/v0/b/aceiteixora.appspot.com/o/portada%2Fmercado%20soya%201255p23092022.jpg?alt=media&token=98c88e80-e6f2-46d5-8611-8adec928d0dd",
  },
]

const Item = () => {

  const useStyles = makeStyles((theme) => ({
    carousel: {
      display: "flex",
      alignitems: "center",
      height: "100vh",
    },
    carouselItem: {
      display: "flex",
      flexdirection: "column",
      alignitems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "black",
      backgroundColor: "#ffffff",
      margin: "50px 10px 30px 10px",
      
    },
  }));

  const classes = useStyles();

  const items = infoCarousel.map((objetosCarrusel) => {

    return (
      <div style={{maxWidth:'900px', marginBottom: '150px'}}>
        <img
          src={objetosCarrusel?.image}
          width="100%"
        />
      </div>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 1,
    },
  };

  return (
    <div className="divPortadaCarrusel">
      <div className="divTitulo">
         <span className="textoGris15700">
            SELECCIONA LA CATEGORIA
         </span>
      </div> 
      <Link to="/mercadopalma" style={{textDecoration:'none'}} >
      <div className="botonPalma">
         <span className="textoBotonPalma">
            PALMA
         </span>
      </div> 
      </Link>
      <Link to="/mercadosoya" style={{textDecoration:'none'}} >
      <div className="botonSoya">
         <span className="textoBotonSoya">
            SOYA
         </span>
      </div> 
      </Link>
      <AliceCarousel
        mouseTracking
        loading='lazy'
        responsive={responsive}
        items={items}
        swipeDelta={0}
        disableButtonsControls={true}
        disableDotsControls={true}
        touchMoveDefaultEvents={true}
        autoPlay={true}
        autoPlayInterval={3000}
        animationDuration={3000}
        infinite
        autoPlayControls={false}
        autoPlayStrategy='action'
        controlsStrategy='alternate'
      />
    </div>
  );
};

export default Item;


