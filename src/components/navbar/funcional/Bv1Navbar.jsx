import { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import "./../../cssGeneral/CssGeneral.css";
import CartIcon from "../cart/CartIcon";
import { db, auth, storage } from "../../firebase";
//import BarraDeBusqueda from "../barraDeBusqueda/BarraDeBusqueda";
import Divisor from "./Divisor";
//import logoPrincipal from "../../recursosMultimedia/logo2.png";
import BarraCategoriasFire from "../../components/marcas/BarraCategoriasFire";
import BurgerCategoriasFire from "../../components/menuBurgerItem/BurgerCategoriasFire";
// src\components\menuBurgerCategorias\ConeccionBdBurgerCategorias.jsx
import ConeccionBdBurgerCategorias from "../../components/menuBurgerCategorias/ConeccionBdBurgerCategorias";
import BurgerItemContext from "../menuBurgerItem/BurgerItemContext";
import BdLogo from "../../components/LogoBd/BdLogo";
import { AiOutlineMenu } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  //console.log('llamando a Navbar');
  const [vistaMenu, setvistaMenu] = useState("none");
  const [list, setlist] = useState([])


  const accionAbrirMenu = () => {
    setvistaMenu("flex");
  };
  const accionCerrarMenu = () => {
    setvistaMenu("none");
  };

  return (
    <>
      <div className="divNavbarVanilla">
        <div className="menuCategorias" style={{ display: `${vistaMenu}` }}>
          <div onClick={accionCerrarMenu}>
            <ConeccionBdBurgerCategorias />
          </div>
          <div className="divCerrarMenu">
            <span className="textoCerrarMenu" onClick={accionCerrarMenu}>
              cerrar menú
            </span>
            <CgLogOut
              style={{ fontSize: "17px" }}
              className="iconoCerrarMenu"
            />
          </div>
        </div>
        <AiOutlineMenu className="iconoMenu" onClick={accionAbrirMenu} />
        
        <Link to="/" style={{ textDecoration: "none" }}>
          <BdLogo altura={55} />
        </Link>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <div style={{ margin: "0px 20px 0px 10px" }} >
            <VscAccount className="iconoMenu" />
          </div>
        </NavLink>
      </div>
      <BarraCategoriasFire />
      <Divisor />
    </>
  );
};
//         <NavLink to="/login-tablero" style={{ textDecoration: "none" }}>
export default Navbar;
