import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./../../cssGeneral/CssGeneral.css";
import CartIcon from "../cart/CartIcon";
import { db, auth, storage } from "../../firebase";
//import BarraDeBusqueda from "../barraDeBusqueda/BarraDeBusqueda";
import Divisor from "./Divisor";
//import logoPrincipal from "../../recursosMultimedia/logo2.png";
import BarraCategoriasFire from "../../components/marcas/BarraCategoriasFire";
import BdBurgerCategorias from "../../components/menuBurgerItem/BdBurgerCategorias";
import BdLogo from "../../components/LogoBd/BdLogo";
import { AiOutlineMenu } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";

const NavbarVanilla = () => {
  const [vistaMenu, setvistaMenu] = useState("none");

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
            <BdBurgerCategorias />
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
        <NavLink to="/login-tablero" style={{ textDecoration: "none" }}>
          <BdLogo altura={55}/>
        </NavLink>
        <NavLink to="/cart">
          <div className="iconoCarro">
            <CartIcon />
          </div>
        </NavLink>
      </div>
      <BarraCategoriasFire />
      <Divisor />
    </>
  );
};

export default NavbarVanilla;
