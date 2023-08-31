import { useState, useEffect } from "react";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";
import BdLogo from "./../../components/LogoBd/BdLogo";

import { HiArrowNarrowLeft } from "react-icons/hi";

// UID de usuario

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");
  const [datosRol, setdatosRol] = useState([]);
  const [rol, setrol] = useState("");

  useEffect(() => {
   //console.log("1111");
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Si el usuario está autenticado
        setuser(authUser);
        setuserId(authUser.uid); // Guardar el UID del usuario en la variable userId
        // <TableroAdministrador username={user.displayName} userId={userId} /> pasar el UID del usuario como prop
      } else {
        setuser(null);
        setuserId(""); // Restablecer el UID cuando el usuario no está autenticado
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signIn = (event) => {
   //console.log("2222");
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setuser(authUser);
      })
      .catch((error) => alert(error));
  };

  /*if (user) {
    return <TableroAdministrador username={user.displayName} userId={userId} />;
  }*/

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
    } else {
      setrol(validar[0].rol);
    }
  };

  useEffect(() => {
    if (rol.length > 0) {
     //console.log(rol);
    }
  }, [rol]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setuser(authUser.user);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
    verificarRolEnBd();
  };

  return (
    <div className="alineacionVertical">
      <div className="divLogoLoginTablero">
        <div className="alineacionVerticalSinWidth">
          <BdLogo />
        </div>
      </div>
      <form className="app__signup">
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
        <button type="submit" onClick={signIn} style={{ marginTop: "15px" }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
