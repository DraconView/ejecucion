import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListBurgerItem from "./ListBurgerItem";
import { db, auth, storage } from "../../firebase";
import Spinner from "../../components/spinner/Spinner";

const BurgerCategoriasFire = () => {
  const [list, setlist] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    //const db = getFirestore()

    let docRef;
    if (categoryId) {
      docRef = db
        .collection("ItemServicios")
        .where("categoryId", "==", categoryId);
    } else {
      docRef = db.collection("ItemServicios").orderBy("relevancia", "asc");
    }

    docRef.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        //console.log("No existen resultados");
      }
      setlist(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [categoryId]);

  return (
    <>{list.length > 0 ? <ListBurgerItem list={list} /> : <Spinner />}</>
  );
};

export default BurgerCategoriasFire;
