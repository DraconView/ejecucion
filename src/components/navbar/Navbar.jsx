import { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import "./../../cssGeneral/CssGeneral.css";
import CartIcon from "../cart/CartIcon";
import { db, auth, storage } from "../../firebase";
//import BarraDeBusqueda from "../barraDeBusqueda/BarraDeBusqueda";
import Divisor from "./Divisor";
//import logoPrincipal from "../../recursosMultimedia/logo2.png";
import BarraCategoriasFire from "../barraCategorias/BarraCategoriasFire";
import BarraCategoriasContext from "../barraCategorias/BarraCategoriasContext";
import ConeccionBdBurgerCategorias from "../../components/menuBurgerCategorias/ConeccionBdBurgerCategorias";
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

        <ConeccionBdBurgerCategorias />

        <Link to="/" style={{ textDecoration: "none" }}>
          <BdLogo altura={55} />
        </Link>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <div style={{ margin: "0px 20px 0px 10px" }} >
            <VscAccount className="iconoMenu" />
          </div>
        </NavLink>
      </div>
      <BarraCategoriasContext />
      <Divisor />
    </>
  );
};
//         <NavLink to="/login-tablero" style={{ textDecoration: "none" }}>
export default Navbar;
