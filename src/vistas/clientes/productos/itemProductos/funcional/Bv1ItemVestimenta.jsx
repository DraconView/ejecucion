// 260422 COMPONENTE PLANTILLA DE VISTA RESUMIDA CON SOMBRRA DE PRODUCTOS
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsWhatsapp } from "react-icons/bs";
import AliceCarousel from 'react-alice-carousel';
import CartContext from "../../../../context/CartContext";
import "./../../../../cssGeneral/CssGeneral.css";

import { url2file } from '../../../../utils/utils';
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
//import { TbShoppingCartPlus } from "react-icons/tb";

const Item = ({ item: { visibilidad, descripcion, referencia, id, name, description, price, img, volumen, genero, talla } }) => {

    const { contextNumeroWhatsapp } = useContext(CartContext);

    const [images, setImages] = useState([]);
    const [imagesArray, setImagesArray] = useState([])

    const [vistaDescripcionActiva, setvistaDescripcionActiva] = useState("flex");
    const [vistaDescripcionInactiva, setvistaDescripcionInactiva] = useState("none");

    const accionAbrirDescripcion = () => { 
        setvistaDescripcionInactiva("flex")
        setvistaDescripcionActiva("none")
      };
      const accionCerrarDescripcion = () => { 
        setvistaDescripcionInactiva("none")
        setvistaDescripcionActiva("flex")
      };

    const handleDragStart = (e) => e.preventDefault();

//        const handleClick = () => {
//            window.location.href = {`https://api.whatsapp.com/send?phone=${contextNumeroWhatsapp}`}
//        }
//        onClick={handleClick}
    
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
    return (
        <>
        {visibilidad==='ACTIVO' ? 
            <div className='divPricipalItem' >
                <div className='divTituloProducto'>
                    <span className='tituloProducto'>
                        {name}</span>
                </div> 
                <div style={{width: '350px', height:'350px'}}>  
                {images.length ?
                    <AliceCarousel
                        loading='lazy'
                        mouseTracking
                        items={images}
                        disableButtonsControls={true}
                        disableDotsControls={false}
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
                </div>   
                <div className='divIconosOpcionesItem' >
                    <div className='divPrecio' >
                        <span className='textoTituloPrecio'> $ {price}</span>
                    </div>
                    <div className='divOpcionesItem' >    
                        <IoIosShareAlt className='estiloOpcionesItem' onClick={handleShare} /> 
                        <Link to={`/detalles-productos/${id}`} style={{ textDecoration: 'none' }}> 
                            <MdAddShoppingCart className='estiloOpcionesItem' /> 
                        </Link> 
                    </div>
                </div>        
                <div className='divTalla'>
                    <span > tallas: {talla}</span>
                </div>    
                <div className='divDividerItem' />
            </div>
        : null} 
        </>
    )
}

export default Item

/* 
// VERSION CON DESCRIPCION 1127p050223 POSIBLECODIGOFUNCIONAL
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsWhatsapp } from "react-icons/bs";
import AliceCarousel from 'react-alice-carousel';
import './Item.css'
//import './style.css'

import { url2file } from '../../utils';
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
//import { TbShoppingCartPlus } from "react-icons/tb";

const Item = ({ item: { visibilidad, descripcion, referencia, id, name, description, price, img, volumen, genero, talla } }) => {

    const [images, setImages] = useState([]);
    const [imagesArray, setImagesArray] = useState([])

    const [vistaDescripcionActiva, setvistaDescripcionActiva] = useState("flex");
    const [vistaDescripcionInactiva, setvistaDescripcionInactiva] = useState("none");

    const accionAbrirDescripcion = () => { 
        setvistaDescripcionInactiva("flex")
        setvistaDescripcionActiva("none")
      };
      const accionCerrarDescripcion = () => { 
        setvistaDescripcionInactiva("none")
        setvistaDescripcionActiva("flex")
      };

    const handleDragStart = (e) => e.preventDefault();

//        const handleClick = () => {
//            window.location.href = `https://api.whatsapp.com/send?phone=+573204859757&text=Referencia:${name}`
//        }
//        onClick={handleClick}
//        onClick={handleClick}
    
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
    return (
        <>
        {visibilidad==='ACTIVO' ? 
            <div className='divPricipalItem' >
                <div className='divTituloProducto'>
                    <span className='tituloProducto'>
                        {name}</span>
                </div> 
                <div style={{width: '350px', height:'350px'}}>  
                {images.length ?
                    <AliceCarousel
                        loading='lazy'
                        mouseTracking
                        items={images}
                        disableButtonsControls={true}
                        disableDotsControls={false}
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
                </div>   
                <div className='divIconosOpcionesItem' >
                    <div className='divPrecio' >
                        <span className='textoTituloPrecio'> $ {price}</span>
                    </div>
                    <div className='divOpcionesItem' >    
                        <IoIosShareAlt className='estiloOpcionesItem' onClick={handleShare} /> 
                        <Link to={`/item/${id}`} style={{ textDecoration: 'none' }}> 
                            <MdAddShoppingCart className='estiloOpcionesItem' /> 
                        </Link>
                    </div>
                </div>        
                <div 
                    className='divActivoTextoDescripcionProducto' 
                    style={{ display:`${vistaDescripcionActiva}`, justifyContent:'space-between' }}
                    onClick={accionAbrirDescripcion}
                    >
                        <span className='tituloDescripcion'>
                        descripcion...</span>
                        <MdExpandMore className='iconosExpandirContraerDescripcionItem' />
                </div> 
                <div className='divInactivoTextoDescripcionProducto'
                    style={{ display:`${vistaDescripcionInactiva}`, justifyContent:'space-between' }}
                    onClick={accionCerrarDescripcion}
                >
                <div className='replegarDescripcion'>    
                    <span className='tituloDescripcion'>
                    descripcion:</span>
                    <MdExpandLess className='iconosExpandirContraerDescripcionItem' />
                </div>    
                    <p className='parrafoDescripcion' >
                    {descripcion}</p>
                </div> 
                <div className='divDividerItem' />
            </div>
        : null} 
        </>
    )
}

export default Item
*/