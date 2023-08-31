import { useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { db, auth, storage } from "./../../../firebase/index";
import TableroAdministrador from "../../../vistas/administradores/tablero/TableroAdministrador";
import { Link } from "react-router-dom";
import logoPrincipal from "../../../recursosMultimedia/logo2.png";
import BdLogo from "../../../components/LogoBd/BdLogo";

import { HiArrowNarrowLeft } from "react-icons/hi";

//var alturaViewport = window.innerHeight; `${alturaViewport}px`
// UID de usuario

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LoginTablero() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserId(authUser.uid); // Guardar el UID del usuario en la variable userId
        // <TableroAdministrador username={user.displayName} userId={userId} /> pasar el UID del usuario como prop
        //console.log(authUser, "authUser");
        //console.log (authUser.uid, "authUser.uid");
      } else {
        setUser(null);
        setUserId(""); // Restablecer el UID cuando el usuario no está autenticado
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUser(authUser.user);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUser(authUser);
      })
      .catch((error) => alert(error));

    setOpenSignIn(false);
  };
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                restaurantes
              </span>
            </center>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(" ", ""))}
            />
            <button type="submit" onClick={signUp}>
              Registrarse
            </button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                restaurantes
              </span>
            </center>
            <input
              placeholder="Email"
              type="text"
              value={email.toLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(" ", ""))}
            />
            <button
              type="submit"
              onClick={signIn}
              style={{ marginTop: "15px" }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </Modal>
      <div>
        {user ? (
          <div className="divSalirvolver">
            <div
              style={{
                alignitems: "left",
                display: "flex",
                backgroundColor: "transparent",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Link to="/">
                <HiArrowNarrowLeft
                  style={{
                    fontSize: "35px",
                    margin: "15px 0px 0px 15px",
                    color: "#646464",
                  }}
                />
              </Link>
            </div>
            <button className="botonSalir" onClick={() => auth.signOut()}>
              salir
            </button>
          </div>
        ) : (
          <div className="alineacionVertical" style={{ minHeight: "100vh" }}>
            <div
              style={{
                alignitems: "left",
                display: "flex",
                backgroundColor: "transparent",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Link to="/">
                <HiArrowNarrowLeft
                  style={{
                    fontSize: "35px",
                    margin: "25px 0px 0px 25px",
                    color: "#646464",
                  }}
                />
              </Link>
            </div>

            <div className="divLogoLoginTablero">
              <div className="alineacionVerticalSinWidth">
                <BdLogo />
              </div>
            </div>
            <div className="divTextoLoginTablero">
              <span className="textoPresentacionLoginTablero">
                Te damos la bienvenida al <br />
                tablero de herramientas
              </span>
            </div>
            <button
              className="botonIniciarSesion"
              onClick={() => setOpenSignIn(true)}
            >
              Iniciar seción
            </button>
            <button onClick={() => setOpen(true)}>Registrarse</button>
          </div>
        )}
      </div>

      {user?.displayName ? (
        <TableroAdministrador username={user.displayName} userId={userId} />
      ) : (
        <div className="divIniciarSesion">
          <span className="debesIniciarSesion">
            Ir al tablero
            <Link to="/tablero-administrador" style={{ color: "#808080" }}>
              <span className="botonPublicar">
                tablero
              </span>
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default LoginTablero;


