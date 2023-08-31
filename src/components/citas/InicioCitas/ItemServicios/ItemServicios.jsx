import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import { BsWhatsapp } from "react-icons/bs";
import "./../../../../cssGeneral/CssGeneral.css";
import { url2file } from '../../../../utils/utils';


const ItemServicios = ({ item: { subCategorias, visibilidad, categoryId, unidades, id, name, description, price, img, volumen, genero, referencia } }) => {

    const [images, setImages] = useState([]);
    const [imagesArray, setImagesArray] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDragStart = (e) => e.preventDefault();
    
    useEffect(() => {
        let array = [];
        if (typeof img === "string") {
            array = [
                <img src={img} className="post__image" onDragStart={handleDragStart} role="presentation" />
            ]
            setImages(array);
            setImagesArray([img]);
        } else {
            img.forEach(element => {
                array.push(<img src={element} className="post__image" onDragStart={handleDragStart} role="presentation" />)
            });
            setImages(array);
            setImagesArray([...img]);
        }
    }, [img])

    const [vistaTextoCategoria, setvistaTextoCategoria] = useState("flex");
    const [vistaSubCategorias, setvistaSubCategorias] = useState("none")
    const [arraysubCategorias, setarraysubCategorias] = useState([]);
    
    const handleShare = async () => {
        const filesArray = []
        for (const url of imagesArray) {
            const file = await url2file(url);
            filesArray.push(file);
        }
        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
                files: filesArray,
                title: name,
                text: name,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            alert('No se puede compartir en este navegador.')
            //console.log(`No se puede compartir en este navegador.`);
        }
    }

    function accionAbrirMenu () { 
        setvistaTextoCategoria("none")
        setvistaSubCategorias("flex")
      };

    return (
        <>
        {visibilidad==='ACTIVO' ?
        <Link to={`/detalles-servicios/${id}`} style={{ textDecoration: 'none' }}>
            <div className="divMarcoImagenCategorias" >
                <div className="divImagenCategorias" 
                        style={{ position: 'relative', bottom: 10, right: 5 }}>
                    {images.length ?
                        <img className="imagenesCategorias" src={img[0]} />
                        : null}
                </div>
            </div>
            </Link>
        : null}
        </>
    )
}

export default ItemServicios

//        const handleClick = () => {
//            window.location.href = `https://api.whatsapp.com/send?phone=+59891853283&text=Referencia:${name}`
//        }
//        onClick={handleClick}
//        onClick={handleClick}

/* RENDER CON SUBCATEGORIAS 1203a070223 POSIBLECODIGOFUNCIONAL
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import { BsWhatsapp } from "react-icons/bs";
import "./../../../../cssGeneral/CssGeneral.css";
import { url2file } from '../../utils';


const ItemInicioCategorias = ({ item: { subCategorias, visibilidad, categoryId, unidades, id, name, description, price, img, volumen, genero, referencia } }) => {

    const [images, setImages] = useState([]);
    const [imagesArray, setImagesArray] = useState([])
    const [loading, setLoading] = useState(false)

    const handleDragStart = (e) => e.preventDefault();
    
    useEffect(() => {
        let array = [];
        if (typeof img === "string") {
            array = [
                <img src={img} className="post__image" onDragStart={handleDragStart} role="presentation" />
            ]
            setImages(array);
            setImagesArray([img]);
        } else {
            img.forEach(element => {
                array.push(<img src={element} className="post__image" onDragStart={handleDragStart} role="presentation" />)
            });
            setImages(array);
            setImagesArray([...img]);
        }
    }, [img])

    const [vistaTextoCategoria, setvistaTextoCategoria] = useState("flex");
    const [vistaSubCategorias, setvistaSubCategorias] = useState("none")
    const [arraysubCategorias, setarraysubCategorias] = useState([]);
    
    useEffect(() => {
      convertToArray(subCategorias);
      function convertToArray(recibirSubCategorias) {
        const resultadoArraySubCategorias = recibirSubCategorias.split(',');
        setarraysubCategorias(resultadoArraySubCategorias);
      }
    }, [vistaSubCategorias]);

    const handleShare = async () => {
        const filesArray = []
        for (const url of imagesArray) {
            const file = await url2file(url);
            filesArray.push(file);
        }
        //console.log(filesArray)
        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
            navigator.share({
                files: filesArray,
                title: name,
                text: name,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            alert('No se puede compartir en este navegador.')
            //console.log(`No se puede compartir en este navegador.`);
        }
    }

    function accionAbrirMenu () { 
        setvistaTextoCategoria("none")
        setvistaSubCategorias("flex")
      };

    return (
        <>
        {visibilidad==='ACTIVO' ?
            <div className="divMarcoImagenCategorias"
                 onClick={() => accionAbrirMenu()}>
                <div className="divImagenCategorias" 
                        style={{ position: 'relative', bottom: 10, right: 5 }}>
                    {images.length ?
                        <img className="imagenesCategorias" src={img[0]} />
                        : null}
                        
                        <div className="divIfnfoProductos2" 
                            style={{ position: 'relative', bottom: 80,  display: `${vistaTextoCategoria}` }} >
                            <span >{categoryId}</span>  
                        </div>
                        <div className="contenedorDivTextoEleccion" 
                             style={{ position: 'relative', bottom: 200, left: 50,  display: `${vistaSubCategorias}`, flexdirection: 'column'  }}>
                                {arraysubCategorias.map((arraysubCategorias, index) => (
                                    <Link to={`/categories/${categoryId+"-"+arraysubCategorias}`} style={{ textDecoration: 'none' }}>
                                        <div className="divTextoEleccion" key={index}
                                        >
                                            <span className='texto25pxFw700TtUpper'> 
                                                {arraysubCategorias}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                        </div>  
                </div>
            </div>
        : null}
        </>
    )
}

export default ItemInicioCategorias
*/

/* div para colocar titulos de categorias
                        <div className="divIfnfoProductos2" 
                            style={{ position: 'relative', bottom: 180,  display: `${vistaTextoCategoria}` }} >
                            <span >{arraysubCategorias}</span>  
                        </div>*/

