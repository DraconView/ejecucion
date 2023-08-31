import { useState, useEffect } from "react";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";
import BdLogo from "./../../components/LogoBd/BdLogo";
import TableroClientes from "../clientes/tablero/TableroCLientes";
import Login from "./Login";

import { HiArrowNarrowLeft } from "react-icons/hi";

function Registrarse() {

  //console.log('llamando a Registrarse');
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");
  const [datosRol, setdatosRol] = useState([]);
  const [rol, setrol] = useState("esperando");

  const [vitaIniciarSesion, setvitaIniciarSesion] = useState("none");
  const [vitaRegistrarse, setvitaRegistrarse] = useState("flex");

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

  useEffect(() => {
    if (userId) {
        setrol("cliente");
    }
  }, [userId]);

  if (rol && rol.length > 0) {
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
  };

  return (
    <>
      <div className="alineacionVerticalPantallaCompleta">
        <div className="divLogoLoginTablero">
          <div className="alineacionVerticalSinWidth">
            <BdLogo altura={70}/>
          </div>
        </div>
        {/* REGISTRO */}
        <div
          className="divCasillasRegistrarse"
          style={{ display: `${vitaRegistrarse}`,
          margin: "20px 0px 0px 0px"
        }}
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
              value={password}
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
          <Link to="/login" style={{ textDecoration: "none" }}>
          <div 
            className="divTextoRegistroLogin"
            style={{ marginTop: "30px" }}
            >
            <span
              className="textoRegistrarse"
              style={{ marginTop: "15px" }}
            >
              ¿Ya tienes una cuenta?
              <span className="textoRegistrarseResaltado"> 
               {" "}Inicia Sesión</span>
            </span>
          </div>
            </Link>
        </div>
      </div>
    </>
  );
}

export default Registrarse;
