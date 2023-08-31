import { useState, useEffect } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { db, auth, storage } from './../../../../firebase/index'
import SubirLogo from "./SubirLogo";
import { Link } from 'react-router-dom'
import { HiArrowNarrowLeft} from "react-icons/hi";

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

function UserSubirLogo() {
  //console.log('llamando a UserSubirLogo');
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubcribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("BdLogo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
            registro: new Date(),
          }))
        );
      });
  }, []);
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
            <span style={{fontSize: "25px", fontWeight: "bold"}}>
            restaurantes</span>
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
            <span style={{fontSize: "25px", fontWeight: "bold"}}>
            restaurantes</span>
            </center>
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
      <div className="app__header">
      <div 
        style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
                <Link to="/union-edicion-logo"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
      </div>
        {user ? (
          <button onClick={() => auth.signOut()}>Salir</button>
        ) : (
          <div style={{ backgroundColor: "#ffffff", padding: "10px", textAlign: "right" }}>  
            <button onClick={() => setOpenSignIn(true)}>Iniciar seción</button>
            <button onClick={() => setOpen(true)}>Registrarse</button>
          </div>
        )}
      </div>

      {user?.displayName ? (
        <SubirLogo username={user.displayName} />
      ) : (
        <h3
        style={{textAlign:"center", position:"relative", backgroundColor:"#ffffff", paddingBottom:"50px"}}>
          Inicia sesión para cargar contenido</h3>
      )}




    </div>
  );
}

export default UserSubirLogo;

/*

//import InstagramEmbed from "react-instagram-embed";

        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B7f8GYPh1d-/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
*/        