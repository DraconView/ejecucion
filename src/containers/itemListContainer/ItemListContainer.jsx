// CONSULTA A LA BASE DATOS PRINCIPAL => ItemList
// conexion ItemListContainer ItemList
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../../components/itemList/ItemList'
//import { getFirestore } from '../../firebase'
import { db, auth, storage } from '../../firebase'
//import MainImgCategories from './MainImgCategories'
import Spinner from '../../components/spinner/Spinner'
import Marcas from '../../components/barraCategorias/Marcas'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom'
import "./../../cssGeneral/CssGeneral.css";

const ItemListContainer = (parametro) => {
    //console.log('llamando a ItemListContainer');
    const [list, setlist] = useState([])
    const { categoryId } = useParams()
    const [lastKey, setLastKey] = useState("");
    const [nextPosts_loading, setNextPostsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [vistaMostrarMas, setvistaMostrarMas] = useState("flex");
    const [vistaVolverInicio, setvistaVolverInicio] = useState("none");
    
    function vistaMostrarVolver() {
        setvistaMostrarMas("none")
        setvistaVolverInicio("flex")
    }

    function autoFocus() {
        window.scrollTo(0, 0);
    }
    
    useEffect(() => {
        setIsLoading(true)
        let docRef
        if (categoryId) {
            docRef = db
                .collection("ItemServicios")
                .where('categoryId', '==', categoryId)
                .orderBy("timestamp", "asc")
                .limit(9)
        } else {
            docRef = db
                .collection("ItemServicios")
                .where('categoryId', '==', categoryId)
                .orderBy("timestamp", "asc")
                .limit(9)
        }

        docRef.get().then((querySnapshot) => {
            setNextPostsLoading(true);
            setIsLoading(false)
            if (querySnapshot.size === 0) {
                //console.log('No existen resultados')
                vistaMostrarVolver()
            }
            setlist(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
            querySnapshot.docs.forEach(doc => {
                setLastKey(doc.data().timestamp);
            });
        })
    }, [categoryId])

    //console.log(categoryId, 'categoryId')

    const updateList = () => {
        setIsLoading(true)
        let docRef
        let newArray = [...list];
        docRef = db
            .collection("ItemServicios")
            .where('categoryId', '==', categoryId)
            .orderBy("timestamp", "asc")
            .startAfter(lastKey)
            .limit(9)

        docRef.get().then((querySnapshot) => {
            setIsLoading(false)
            setNextPostsLoading(true);
            if (querySnapshot.size === 0) {
                //console.log('No hay mas productos')
                setNextPostsLoading(false);
                vistaMostrarVolver()
            }
            querySnapshot.docs.forEach(doc => {
                newArray.push({ ...doc.data(), id: doc.id });
                setLastKey(doc.data().timestamp);
            });
            setlist(newArray);
        }).catch(() => {
            setNextPostsLoading(false);
        })
    }

    //const [mtCategorias, setmtCategorias] = useState(categoryId);
    //.orderBy(`${mtCategorias}`, "desc")
    //console.log(mtCategorias,'mtCategorias') 

    return (
        <div>
            <div className='divVolverMasCategorias'>
                <Link to="/catalogo">
                    <div className='divVolverCategorias'>
                        <HiArrowNarrowLeft
                            style={{ fontSize: '35px', color: '#646464', backgroundColor: 'transparent', cursor: 'pointer' }} />
                    </div>
                </Link>
                <div className='divTextoCategorias'>
                    <span className='textoCategorias'
                    >{categoryId}</span>
                </div>
            </div>

            {list.length > 0 ?
                <>
                    <ItemList
                        list={list}
                        nextPosts_loading={nextPosts_loading}
                        updateList={updateList}
                        isLoading={isLoading}
                    />
                    <button className='divTextoMostrarMas'
                        style={{ display: `${vistaMostrarMas}` }}
                        onClick={() => updateList()} >
                        <span
                            className='textoMostrarMas' >
                            mostrar mas...
                        </span>
                    </button>
                    <div className='divNoHayMasResultados'
                        style={{ display: `${vistaVolverInicio}` }}>
                        <button className='divTextoMostrarMas'
                            onClick={() => autoFocus()} >
                            <span
                                className='textoMostrarMas' >
                                ir al inicio...
                            </span>
                        </button>
                        <span className='d' >
                            no hay mas resultados
                        </span>
                    </div>
                </>
                :
                <Spinner />
            }
        </div>
    )
}

export default ItemListContainer

// <MainImgCategories imgCategory={categoryId} /> imagenes de categorias

