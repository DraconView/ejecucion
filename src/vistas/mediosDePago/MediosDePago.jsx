import { useState, useEffect, useContext } from "react";
import CartContext from "../../context/CartContext";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";

// analizar si se requiere conectar con la base de datos
// pedir el usuario registrado
// crear en la base de datos pago seleccionado y usuario para llevarle seguimiento

const MediosDePago = () => {
  return (
    <div>
      <h1>Medios de pago</h1>
    </div>
  );
};

export default MediosDePago;
