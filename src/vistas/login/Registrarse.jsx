import { useState, useEffect, useContext } from "react";
import CartContext from "../../context/CartContext";
import "./../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "./../../firebase/index";
import { Link } from "react-router-dom";
import logoPrincipal from "./../../recursosMultimedia/logo2.png";
import BdLogo from "./../../components/LogoBd/BdLogo";
import Login from "./Login";
import TableroClientes from "./../../vistas/clientes/tablero/TableroCLientes";

import Navbar from "./../../components/navbar/Navbar";
import Footer from "./../../components/footer/Footer";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Registrarse() {
  //console.log("llamando a Registrarse");
  const {
    contextCiudadSeleccionada,
    providerUsuarioLogueado,
  } = useContext(CartContext);
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [mensajeError, setmensajeError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setuser] = useState(null);
  const [userId, setuserId] = useState("");
  const [datosRol, setdatosRol] = useState([]);
  const [rol, setrol] = useState("esperando");
  const [loader, setLoader] = useState(false);
  const [celularMovil, setcelularMovil] = useState("");
  const [ciudadMasCelular, setciudadMasCelular] = useState("");
  const [nombreMasApellido, setnombreMasApellido] = useState("");

  const [vitaIniciarSesion, setvitaIniciarSesion] = useState("none");
  const [vitaRegistrarse, setvitaRegistrarse] = useState("flex");
  const [vistaErrorAlert, setvistaErrorAlert] = useState("none");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Si el usuario está autenticado
        //console.log("Usuario en uso:", authUser.email);
        setuser(authUser);
        setuserId(authUser.uid); // Guardar el UID del usuario en la variable userId
        providerUsuarioLogueado(authUser);
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

    if (password.length < 6) {
      setmensajeError("La contraseña debe tener al menos 6 caracteres");
      setvistaErrorAlert("flex");
    }

    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setuser(authUser.user);
        // Crear un objeto con los datos que deseas actualizar
        const userUpdate = {
          displayName: contextCiudadSeleccionada,
        };
        // Actualizar el nombre de usuario y el número de teléfono
        authUser.user.updateProfile(userUpdate);

        db.collection("RegistroClientes")
          .add({
            nombreMasApellido: nombreMasApellido,
            ciudad: contextCiudadSeleccionada,
            celularMovil: celularMovil,
            email: authUser.user.email,
            timestamp: new Date(),
            uid: authUser.user.uid,
            observacionesDeCuidado: "sin observaciones",
          })
          .then(() => {
            setLoader(false);
            //alert("datos enviados");
          })
          .catch((error) => {
            //console.log(error);
          });
      })
      .catch((error) => {
        // Manejar el caso de usuario ya en uso
        if (error.code === "auth/email-already-in-use") {
          setmensajeError("Este correo electrónico ya está en uso.");
          setvistaErrorAlert("flex");
        } else {
          // Manejar otros errores
          //console.log("error en el registro", error);
        }
      });
  };

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
        <div
          className="divCasillasRegistrarse"
          style={{ display: `${vitaRegistrarse}`, margin: "20px 0px 0px 0px" }}
        >
          <form className="app__signup">
            <input
              placeholder="Nombre y apellido"
              type="text"
              value={nombreMasApellido}
              className="casillasLoginNombre"
              onChange={(e) => setnombreMasApellido(e.target.value.toLowerCase())}
            />
            <input
              placeholder="Teléfono"
              type="text"
              value={celularMovil}
              className="casillasLogin"
              onChange={(e) => setcelularMovil(e.target.value.replace(" ", ""))}
            />
            <input
              placeholder="Correo electrónico"
              type="text"
              value={email}
              className="casillasLogin"
              onChange={(e) => setemail(e.target.value.replace(" ", "").toLowerCase())}
            />
            <input
              placeholder="Contraseña mínimo 6 caracteres"
              type="password"
              value={password}
              className="casillasLogin"
              onChange={(e) => setpassword(e.target.value.replace(" ", ""))}
            />
            <input
              placeholder="Ciudad"
              type="text"
              value={contextCiudadSeleccionada}
              disabled
              className="casillasLogin"
              onChange={(e) => setuserName(e.target.value)}
            />

            {celularMovil.length > 0 ? (
              <button
                type="submit"
                className="botonButton"
                style={{ marginTop: "30px" }}
                onClick={signUp}
              >
                Registrarse
              </button>
            ) : null}
          </form>
          <Link to="/login-accion-usuario" style={{ textDecoration: "none" }}>
            <div
              className="divTextoRegistroLogin"
              style={{ marginTop: "30px" }}
            >
              <span className="textoRegistrarse" style={{ marginTop: "15px" }}>
                ¿Ya tienes una cuenta?
                <span className="textoRegistrarseResaltado">
                  {" "}
                  Inicia Sesión
                </span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Registrarse;
