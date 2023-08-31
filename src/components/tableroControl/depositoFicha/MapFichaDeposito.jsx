import { useState, useEffect } from "react";
//import "./Publicador.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { db, auth, storage } from './../../../firebase/index'
import FichaDeposito from "./FichaDeposito";
import "./../../../cssGeneral/CssGeneral.css";
import {Link} from 'react-router-dom'

import { HiArrowNarrowLeft} from "react-icons/hi";


function MapFichaDeposito() {
  //console.log('llamando a MapFichaDeposito');
  const [posts, setPosts] = useState([]);

useEffect(() => {
  db.collection("ItemProductos")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
}, []);

return (

<div className="app__posts">
<div 
        style={{ alignitems: 'left', display: 'flex', backgroundColor:'transparent', width:'100%', cursor:'pointer' }}>
                <Link to="/tablero-administrador"> 
                <HiArrowNarrowLeft
                style={{ fontSize:'35px', margin:'0px 0px 0px 0px', color:'#646464'}} /></Link>
      </div>

      <div className='divBarraTitulos'>
        <span className='textoBarraTitulos'>
            Deposito
        </span>
      </div>
      
  {posts.map(({ id, post }) => (
    <FichaDeposito
      key={id}
      postId={id}
      username={post.username}
      name={post.name}
      volumen={post.volumen}
      stock={post.stock}
      codigo={post.codigo}
      cantidad={post.cantidad}
      img={post.img}
    />
  ))}
</div>

)
}

export default MapFichaDeposito;