import { useState, useEffect } from "react";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";
import BdLogo from "./../../components/LogoBd/BdLogo";
import TableroAdministrador from "./../../vistas/administradores/tablero/TableroAdministrador";
import TableroClientes from "./../../vistas/clientes/tablero/TableroClientes";
import TableroAsistentes from "./../../vistas/asistentes/tablero/TableroAsistentes";

import { HiArrowNarrowLeft } from "react-icons/hi";

// UID de usuario

function Login() {

 //console.log('llamando a Login');
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");
  const [datosRol, setdatosRol] = useState([]);
  const [rol, setrol] = useState("esperando");

  const [vitaIniciarSesion, setvitaIniciarSesion] = useState("flex");
  const [vitaRegistrarse, setvitaRegistrarse] = useState("none");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Si el usuario está autenticado
        setuser(authUser);
        setuserId(authUser.uid); // Guardar el UID del usuario en la variable userId
        // <TableroAdministrador userName={user.displayName} userId={userId} /> pasar el UID del usuario como prop
      } else {
        setuser(null);
        setuserId(""); // Restablecer el UID cuando el usuario no está autenticado
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
      .catch((error) => alert(error));
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
      return <TableroClientes user={user} />;
    }
  }

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setuser(authUser.user);
        return authUser.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((error) => alert(error.message));
    //setOpen(false);
  };

  /*
  vistas de usuario

  - no logeado 
  -- iniciar sesion
  - registrado
  - administrador
  - cliente
  - asistentes 

  */

  return (
    <>
      <div className="alineacionVerticalPantallaCompleta">
        <div className="divLogoLoginTablero">
          <div className="alineacionVerticalSinWidth">
            <BdLogo altura={70}/>
          </div>
        </div>
        {/* INICIO DE SESION */}
        <div
          className="divCasillasLogin"
          style={{ display: `${vitaIniciarSesion}` }}
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
              style={{ marginTop: "30px" }}
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="divTextoRegistroLogin">
            <span
              className="textoRegistrarse"
              style={{ marginTop: "15px" }}
              onClick={() => {
                setvitaIniciarSesion("none");
                setvitaRegistrarse("flex");
              }}
            >
              ¿No tienes una cuenta?
              <span className="textoRegistrarseResaltado"> 
                {" "}Registrate</span>
            </span>
          </div>
        </div>

        {/* REGISTRO */}
        <div
          className="divCasillasLogin"
          style={{ display: `${vitaRegistrarse}` }}
        >
          <form className="app__signup">
            <input
              placeholder="Nombre"
              type="text"
              value={userName}
              className="casillasLogin"
              onChange={(e) => setuserName(e.target.value.replace(" ", "").toLowerCase())}
            />
            <input
              placeholder="Correo electrónico"
              type="text"
              value={email}
              className="casillasLogin"
              onChange={(e) => setemail(e.target.value.replace(" ", "").toLowerCase())}
            />
            <input
              placeholder="Contraseña"
              type="password"
              value={password}s
              className="casillasLogin"
              onChange={(e) => setpassword(e.target.value.replace(" ", ""))}
            />
            <button
              type="submit"
              className="botonButton"
              style={{ marginTop: "30px" }}
              onClick={signUp}
            >
              Registrarse
            </button>
          </form>
          <div className="divTextoRegistroLogin">
            <span
              className="textoRegistrarse"
              style={{ marginTop: "15px" }}
              onClick={() => {
                setvitaIniciarSesion("flex");
                setvitaRegistrarse("none");
              }}
            >
              ¿Ya tienes una cuenta?
              <span className="textoRegistrarseResaltado"> 
               {" "}Inicia Sesión</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
