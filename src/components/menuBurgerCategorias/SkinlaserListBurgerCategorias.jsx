import { useEffect, useState } from 'react';
import "./../../cssGeneral/CssGeneral.css";
import { Link } from 'react-router-dom';

import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";

const SkinlaserListBurgerCategorias = ({ list }) => {

  const [categoriaServicios, setCategoriaServicios] = useState([]);
  const [categoriaPromociones, setCategoriaPromociones] = useState([]);

  const [vistaMenu, setvistaMenu] = useState("none");

  const [vistaExpandidaServicios, setvistaExpandidaServicios] = useState("none");
  const [vistaContraidaServicios, setvistaContraidaServicios] = useState("flex");
  const [vistaExpandidaPromociones, setvistaExpandidaPromociones] = useState("none");
  const [vistaContraidaPromociones, setvistaContraidaPromociones] = useState("flex");

  useEffect(() => {
    // Filtrar las categorias existentes
    if (list) {
      const categoriasServicios = list.filter((item) => item.categoryId === "SERVICIOS");
      const categoriasPromociones = list.filter((item) => item.categoryId === "PROMOCIONES");

      setCategoriaServicios(categoriasServicios);
      setCategoriaPromociones(categoriasPromociones);
    }
  }, [list]);

  /* ejemplo de renderizado de categorias con subcategorias
  return (
    <div>
      <div className="alineacionVerticalSinWidth" style={{ margin: '20px 0px 20px 0px' }}>
        <span className="textoBurgerCategorias">SERVICIOS</span>
        {categoriaServicios.map((product) => (
          <div className="divBurgerCategorias" key={product.id}>
            <Link to={`/categories/${product.categoryId}-${product.subCategorias}`} style={{ textDecoration: 'none' }}>
              <div className="divTextosburgerCategorias" >
                <span>{product.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
  */

  const accionAbrirVistaServicios = () => {
    setvistaExpandidaServicios("flex");
    setvistaContraidaServicios("none");
  };
  const accionCerrarVistaServicios = () => {
    setvistaExpandidaServicios("none");
    setvistaContraidaServicios("flex");
  };
  const accionAbrirVistaPromociones = () => {
    setvistaExpandidaPromociones("flex");
    setvistaContraidaPromociones("none");
  };
  const accionCerrarVistaPromociones = () => {
    setvistaExpandidaPromociones("none");
    setvistaContraidaPromociones("flex");
  };

  const accionCerrarMenu = () => {
    setvistaMenu("none");
  };

  const accionAbrirMenu = () => {
    setvistaMenu("flex");
  };

  return (
    <>
      {vistaMenu === "flex" ? (
      <div className="menuCategorias" >
        <div>

          <div
            className="alineacionVerticalDerecha"
            style={{ display: `${vistaContraidaServicios}` }}
            onClick={accionAbrirVistaServicios}
          >
            <div className="alineacionHorizontaljustificaconsSpaceBetween" >
              <span
                className="textoBurgerCategorias"
                style={{ margin: '0px 0px 0px 15px' }}
              >
                SERVICIOS
              </span>
              <MdExpandMore
                style={{
                  fontSize: "25px",
                  color: "#585858",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
          </div>
          <div
            className="alineacionVerticalDerecha"
            style={{ display: `${vistaExpandidaServicios}` }}
            onClick={accionCerrarVistaServicios}
          >
            <div className="alineacionHorizontaljustificaconsSpaceBetween" >
              <span
                className="textoBurgerCategorias"
                style={{ margin: '0px 0px 0px 15px' }}
              >
                SERVICIOS
              </span>
              <MdExpandLess
                style={{
                  fontSize: "25px",
                  color: "#585858",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
            <div
              className="divIzquierdaColumn100"
              style={{ margin: '0px auto 0px auto' }}>
              {categoriaServicios.map((product) => (
                <div 
                  className="divBurgerCategorias" 
                  key={product.id}
                  onClick={accionCerrarMenu}
                  >
                  <Link to={`/detalles-servicios/${product.id}`} style={{ textDecoration: 'none' }}>
                    <div className="divTextosburgerCategorias" >
                      <span>{product.name}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div
            className="alineacionVerticalDerecha"
            style={{ display: `${vistaContraidaPromociones}` }}
            onClick={accionAbrirVistaPromociones}
          >
            <div className="alineacionHorizontaljustificaconsSpaceBetween" >
              <span
                className="textoBurgerCategorias"
                style={{ margin: '0px 0px 0px 15px' }}
              >
                PROMOCIONES
              </span>
              <MdExpandMore
                style={{
                  fontSize: "25px",
                  color: "#585858",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
          </div>
          <div
            className="alineacionVerticalDerecha"
            style={{ display: `${vistaExpandidaPromociones}` }}
            onClick={accionCerrarVistaPromociones}
          >
            <div className="alineacionHorizontaljustificaconsSpaceBetween" >
              <span
                className="textoBurgerCategorias"
                style={{ margin: '0px 0px 0px 15px' }}
              >
                PROMOCIONES
              </span>
              <MdExpandLess
                style={{
                  fontSize: "25px",
                  color: "#585858",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
            <div
              className="divIzquierdaColumn100"
              style={{ margin: '0px auto 0px auto' }}>
              {categoriaPromociones.map((product) => (
                <div 
                className="divBurgerCategorias" 
                key={product.id}
                onClick={accionCerrarMenu}
                >
                  <Link to={`/detalles-servicios/${product.id}`} style={{ textDecoration: 'none' }}>
                    <div className="divTextosburgerCategorias" >
                      <span>{product.name}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
      
      ) : (
      <div>
        <AiOutlineMenu className="iconoMenu" onClick={accionAbrirMenu} />
      </div>
      )}
    </>
  )
};

export default SkinlaserListBurgerCategorias;

/*
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
*/
