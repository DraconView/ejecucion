import { useState, useEffect, useContext } from 'react'
import CartContext from "../../context/CartContext";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";
import BdLogo from "./../../components/LogoBd/BdLogo";
import TableroAdministrador from "./../../vistas/administradores/tablero/TableroAdministrador";
import TableroAsistentes from "./../../vistas/asistentes/tablero/TableroAsistentes";
import DiasDisponiblesCalendario from "./../../vistas/clientes/servicios/diasDisponiblesCalendario/DiasDisponiblesCalendario";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

// UID de usuario

function LoginAccionUsuario() {
  //console.log('llamando a LoginAccionUsuario');
  const { providerUsuarioLogueado } = useContext(CartContext);
  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");

  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [mensajeError, setmensajeError] = useState("");
  const [datosRol, setdatosRol] = useState([]);
  const [rol, setrol] = useState("esperando");

  const [vitaIniciarSesion, setvitaIniciarSesion] = useState("flex");
  const [vitaRegistrarse, setvitaRegistrarse] = useState("none");
  const [vistaErrorAlert, setvistaErrorAlert] = useState("none");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
        setuserId(authUser.uid);
        providerUsuarioLogueado(authUser);
      } else {
        setuser(null);
        setuserId("");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, userName]);

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setuser(authUser);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setmensajeError("Email incorrecto");
          setvistaErrorAlert("flex");
        } else if (error.code === "auth/wrong-password") {
          setmensajeError("Contraseña incorrecta");
          setvistaErrorAlert("flex");
        }
      });
  };

  useEffect(() => {
    if (userId) {
      verificacionDeUsuario();
    }
  }, [userId]);

  const verificacionDeUsuario = () => {
    const referenciasDb = db.collection("Rol");
    referenciasDb
      .where("uid", "==", userId)
      .get()
      .then((querySnapshot) => {
        const referenciasSnap = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        if (querySnapshot.size === 0) {
          setdatosRol([]);
        } else {
          setdatosRol(referenciasSnap);
        }
        validarRol(referenciasSnap);
      })
      .catch((error) => {
        //console.error("Error al obtener los productos:", error);
      });
  };

  const validarRol = (validar) => {
    if (validar.length === 0) {
      setrol("cliente");
      localStorage.setItem("localRol", "cliente");
    } else {
      setrol(validar[0].rol);
      //document.cookie = `cookieRol=${validar[0].rol}`;
      localStorage.setItem("localRol", validar[0].rol);
    }
  };

  if (rol && rol.length > 0) {
    if (rol === "administrador") {
      return <TableroAdministrador user={user} />;
    }
    if (rol === "asistente") {
      return <TableroAsistentes user={user} />;
    }
    if (rol === "cliente") {
      return <DiasDisponiblesCalendario />;
    }
  }

  const funcionCerrarAlerta = () => {
    setvistaErrorAlert("none");
  };

  return (
    <>
      <div className="alineacionVerticalPantallaCompleta">

        <div
          className="divErrorAlert"
          style={{
            display: `${vistaErrorAlert}`,
            margin: "30px 0px 0px 0px",
          }}
          onClick={() => { funcionCerrarAlerta(); }}
        >
          <div className="alineacionHorizontaljustificaconsSpaceBetween">
            <span className="tituloErrorAlert">Error</span>
            <AiOutlineCloseCircle className="iconoCerrarErrorAlert" />
          </div>
          <span className="mensajeErrorAlert">
            {mensajeError}
          </span>
        </div>

        <div className="divLogoLoginTablero">
          <div className="alineacionVerticalSinWidth">
            <BdLogo altura={70} />
          </div>
        </div>
        {/* INICIO DE SESION */}
        <div
          className="divCasillasRegistrarse"
          style={{
            display: `${vitaIniciarSesion}`,
            margin: "20px 0px 0px 0px"
          }}
        >
          <form className="app__signup">
            <input
              placeholder="Correo electrónico"
              type="text"
              value={email.toLowerCase()}
              className="casillasLogin"
              onChange={(e) => setemail(e.target.value.replace(" ", "").toLowerCase())}
            />
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              className="casillasLogin"
              onChange={(e) => setpassword(e.target.value.replace(" ", ""))}
            />
            <div className="divOlvidasteContrasena">
              <span className="textoOlvidasteContrasena">
                ¿Has olvidado tu contraseña?
              </span>
            </div>
            <button
              type="submit"
              onClick={signIn}
              className="botonButton"
              style={{ margin: "20px 0px 48px 0px" }}
            >
              Iniciar Sesión
            </button>
          </form>
          <Link to="/registrarse-accion-usuario" style={{ textDecoration: "none" }}>
            <div className="divTextoRegistroLogin">
              <span
                className="textoRegistrarse"
                style={{ marginTop: "15px" }}
              >
                ¿No tienes una cuenta?
                <span className="textoRegistrarseResaltado">
                  {" "}Registrate</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginAccionUsuario;
