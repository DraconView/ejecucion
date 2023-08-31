import { useState, useEffect } from "react";
import "./../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from './../../../firebase/index'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function FichaDeposito({stock, codigo, cantidad, unidades, volumen, referencia, postId, name, img, costo, price, categoryId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

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


  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("ItemProductos")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    let array = [];
    if (typeof img === "string") {
      array = [
        <img src={img} className="post__image" onDragStart={handleDragStart} role="presentation" />
      ]
      setImages(array);
    } else {
      img.forEach(element => {
        array.push(<img src={element} className="post__image" onDragStart={handleDragStart} role="presentation" />)
      });
      setImages(array);
    }
  }, [img])

  const postComment = (event) => {
    event.preventDefault();
    db.collection("ItemProductos").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: new Date(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="divNombreProductoFicha">
          <span className="TextoNombreProductoFicha">{name}</span>
        </div>
        <div className="divDisponibilidadProductoFicha">
          <span className="TextoNombreProductoFicha">disponibilidad: </span>
          <span className="TextoDisponibilidadProductoFicha">{stock}</span>
        </div>
      </div>
      {images.length ?
        <AliceCarousel 
        loading='lazy' 
        mouseTracking
        items={images}
        disableButtonsControls={true}
        disableDotsControls={true}
        touchMoveDefaultEvents={true}
        //autoPlay={true}
        autoPlayInterval={3000}
        animationDuration={1000}
        responsive='responsive'
        infinite
        autoPlayControls={true}
        autoPlayStrategy='action'
        controlsStrategy='alternate'
        />
        : null}

     <span className="usoComentarios" 
      >comentarios:</span>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <span>{comment.username}: </span>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Agregar Comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            style={{ paddingRight: "15px", backgroundColor: "#ffffff" }}
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}

export default FichaDeposito;

