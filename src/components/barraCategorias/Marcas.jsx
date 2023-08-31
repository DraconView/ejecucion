import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from 'react'
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarouselCirculosInicio = ({ list }) => {

  const classes = useStyles();

  useEffect(() => {
    function funcionCriterioBusqueda() {

    }
    funcionCriterioBusqueda()
}, [])

  const items = list.map((list) => {

    return (
      <>
      {list.visibilidad==='ACTIVO' ?
        <Link to={`/producto-filtro-categoria/${list.categoryId}`} style={{ textDecoration: 'none' }}>
          <span className={classes.textoCarrusel}> 
            {list?.name}
          </span >
        </Link>
      : null}
      </>
    );
  });

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={3000}
        animationDuration={3000}
        disableButtonsControls
        responsive={responsive}
        autoPlayStrategy='action'
        items={items}
        autoPlay={true}
        infinite
        disableDotsControls
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  carousel: {
    maxHeight: "300px",
    display: "flex",
    padding: "10px 5px 10px 5px",
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  carouselItem: {
    display: "flex",
    flexdirection: "column",
    alignitems: "center",
    cursor: "pointer",
    margin: "30px 5px 0px 5px",
    textDecoration:"none",
    backgroundColor: '#ffffff',
  },
  textoCarrusel: {
     fontSize:"15px",
     color: "#000000",
     fontWeight:"600",
     textTransform:"uppercase",
     backgroundColor: '#ffffff',
  }
}));

//src={coin?.image}
//"image": "https://firebasestorage.googleapis.com/v0/b/epadintelligence.appspot.com/o/epad22%2Frecursos%2Fcirculos-inicio%2Finnovacion.svg?alt=media&token=f9cb4774-de00-4f2f-8ea9-2034554ca316",

export default CarouselCirculosInicio;

var infoCarousel = 
[
  { "id": "burger" },
  { "id": "almuerzos" },
  { "id": "parrilla" },
  { "id": "hotdog" },
  { "id": "promos" },
]

/* RENDER CON SUBCATEGORIAS 1203a070223 POSIBLECODIGOFUNCIONAL

import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarouselCirculosInicio = ({ list }) => {

  const classes = useStyles();

  const items = list.map((list) => {

    return (
      <>
      {list.visibilidad==='ACTIVO' ?
        <Link to={`/categories/${list.categoryId}`} style={{ textDecoration: 'none' }}>
          <span className={classes.textoCarrusel}> 
            {list?.categoryId}
          </span >
        </Link>
      : null}
      </>
    );
  });

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={3000}
        animationDuration={3000}
        disableButtonsControls
        responsive={responsive}
        autoPlayStrategy='action'
        items={items}
        autoPlay={true}
        infinite
        disableDotsControls
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  carousel: {
    maxHeight: "300px",
    display: "flex",
    padding: "10px 5px 10px 5px",
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  carouselItem: {
    display: "flex",
    flexdirection: "column",
    alignitems: "center",
    cursor: "pointer",
    margin: "30px 5px 0px 5px",
    textDecoration:"none",
    backgroundColor: '#ffffff',
  },
  textoCarrusel: {
     fontSize:"15px",
     color: "#000000",
     fontWeight:"bold",
     textTransform:"uppercase",
     backgroundColor: '#ffffff',
  }
}));

//src={coin?.image}
//"image": "https://firebasestorage.googleapis.com/v0/b/epadintelligence.appspot.com/o/epad22%2Frecursos%2Fcirculos-inicio%2Finnovacion.svg?alt=media&token=f9cb4774-de00-4f2f-8ea9-2034554ca316",

export default CarouselCirculosInicio;

var infoCarousel = 
[
  { "id": "burger" },
  { "id": "almuerzos" },
  { "id": "parrilla" },
  { "id": "hotdog" },
  { "id": "promos" },
]

*/

