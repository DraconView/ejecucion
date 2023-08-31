import { useContext, useState, useEffect } from "react";
import CartContext from "../../../context/CartContext";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

import "../../../cssGeneral/CssGeneral.css";

import UsuariosServiciosAdquiridos from "./usuariosServiciosAdquiridos/UsuariosServiciosAdquiridos";
import EditarUsuarios from "./editarUsuarios/EditarUsuarios";

const OpcionesUsuarios = () => {
  const { contextUidCliente } = useContext(CartContext);

  const [criterioBusqueda, setcriterioBusqueda] = useState("");

  const [vistaOpcionUno, setvistaOpcionUno] = useState("flex");
  const [vistaOpcionDos, setvistaOpcionDos] = useState("none");
  const [vistaOpcionTres, setvistaOpcionTres] = useState("none");

  const [tipoDeCampo, setTipoDeCampo] = useState(null);

  const [datosObtenidos, setdatosObtenidos] = useState([]);

  function functionRegistroClientes() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
  }

  function functionFichaClientes() {
    setvistaOpcionUno("flex");
    setvistaOpcionDos("none");
    setvistaOpcionTres("none");
  }

  function functionServiciosClientes() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("flex");
    setvistaOpcionTres("none");
  }

  function functionVentasPorClientes() {
    setvistaOpcionUno("none");
    setvistaOpcionDos("none");
    setvistaOpcionTres("flex");
  }

  useEffect(() => {
    // setTipoDeCampo
    const validateData = (criterioBusqueda) => {
      if (/^\d+$/.test(criterioBusqueda)) {
        // celularMovil
        setTipoDeCampo("celularMovil");
      } else if (/\S+@\S+\.\S+/.test(criterioBusqueda)) {
        // email
        setTipoDeCampo("email");
      } else {
        // nombreMasApellido
        setTipoDeCampo("nombreMasApellido");
      }
    };
    const dataType = validateData(criterioBusqueda);
  }, [criterioBusqueda]);

  const obtenerRegistrosFirestore = () => {
    const referenciasDb = db.collection("RegistroClientes");
    referenciasDb
        .where(tipoDeCampo, "==", `${criterioBusqueda}`)
        //.where("documento", "==", `${criterioBusqueda}`) // BUSQUEDA EXACTA
        //.where("documento", ">=", `${criterioBusqueda}`) // BUSQUEDA QUE CONTENGAN
        //.where("documento", "<", `${criterioBusqueda}z`) // BUSQUEDA QUE CONTENGAN
        // .orderBy("timestamp", "asc") cambia a desc
        //.orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            const referenciasSnap = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setdatosObtenidos(referenciasSnap);
        })
        .catch((error) => {
            //console.error("Error al obtener los productos:", error);
        });
};

useEffect(() => {
    if (criterioBusqueda.length > 0 && tipoDeCampo.length > 0) {
        //console.log("console2", criterioBusqueda);
        obtenerRegistrosFirestore();
    }
}, [criterioBusqueda, tipoDeCampo]);

useEffect(() => {
  if (datosObtenidos.length > 0) {
    //console.log("datosObtenidos", datosObtenidos.email);
  }
}, [datosObtenidos]);

  return (
    <>
      <div
        style={{
          alignitems: "left",
          display: "flex",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "15px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div
        className="alineacionVertical"
        style={{ margin: "0px auto 15px auto" }}
      >
        <span className="texto25pxFw700TtUpper">usuarios</span>
      </div>
      <div className="alineacionHorizontalJustificada">
        <AiOutlineSearch
          className="iconoBarraBusqueda"
          style={{ position: "relative" }}
        />
        <input
          placeholder="Email, nombre o celular"
          value={criterioBusqueda}
          onChange={(e) => setcriterioBusqueda(e.target.value)}
          className="casillaBarraBusqueda"
        />
      </div>
      <div className="contenedorBotonesAccionesFiltroServicios">
        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionFichaClientes();
            }}
          >
            Ficha
          </button>
          <div
            style={{ display: `${vistaOpcionUno}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionServiciosClientes();
            }}
          >
            Servicios
          </button>
          <div
            style={{ display: `${vistaOpcionDos}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionVentasPorClientes();
            }}
          >
            Productos
          </button>
          <div
            style={{ display: `${vistaOpcionTres}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaOpcionUno}` }}>
          <EditarUsuarios
            criterioBusqueda={criterioBusqueda}
            tipoDeCampo={tipoDeCampo}
          />
        </div>
        { datosObtenidos.length > 0 ? (
        <div style={{ display: `${vistaOpcionDos}` }}>
          <UsuariosServiciosAdquiridos
            criterioBusqueda={datosObtenidos[0].email}
          />
        </div>
        ) : ( null )}

      </div>
    </>
  );
};

export default OpcionesUsuarios;
