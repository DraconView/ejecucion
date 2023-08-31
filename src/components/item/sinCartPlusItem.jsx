// 260422 COMPONENTE PLANTILLA DE VISTA RESUMIDA  
// conexion ItemList Item
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsWhatsapp } from "react-icons/bs";
import AliceCarousel from 'react-alice-carousel';
import "./../../cssGeneral/CssGeneral.css";
import { url2file } from '../../utils';
import { MdExpandLess, MdExpandMore, MdAddShoppingCart } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
//import { TbShoppingCartPlus } from "react-icons/tb";

const Item = ({ item: { visibilidad, descripcion, referencia, id, name, description, price, img, volumen, genero } }) => {

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
//            window.location.href = `https://api.whatsapp.com/send?phone=+59891853283&text=Referencia:${name}`
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
                <Link to={`/item/${id}`} style={{ textDecoration: 'none' }}> 
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
                <IoIosShareAlt 
                    style={{ 
                        position: 'relative', bottom: 115, fontSize: '25px', 
                        color: '#465798', backgroundColor: 'rgba(255, 255, 255, .5)', 
                        cursor: 'pointer', borderRadius:'25px', padding: '10px', left: 127
                    }} onClick={handleShare} />
                </div></Link>   

                <div className='divTituloPrecio'>
                    <span className='textoTituloPrecio'>
                    $ {price}</span>
                </div>    
                <div 
                    className='divActivoTextoDescripcionProducto' 
                    style={{ display:`${vistaDescripcionActiva}` }}
                    onClick={accionAbrirDescripcion}
                    >
                        <span className='tituloDescripcion'>
                        Descripción</span>
                        <MdExpandMore style={{ fontSize: '25px', color: 'black'}}/>
                </div> 
                <div className='divInactivoTextoDescripcionProducto'
                    style={{ display:`${vistaDescripcionInactiva}` }}
                    onClick={accionCerrarDescripcion}
                >
                <div className='replegarDescripcion'>    
                    <span className='tituloDescripcion'>
                    Descripción</span>
                    <MdExpandLess style={{ fontSize: '25px', color: 'black'}}/>
                </div>    
                    <span style={{ fontSize: '20px', color: 'black'}}>
                    {descripcion}</span>
                </div> 
            </div>
        : null}
        </>
    )
}

export default Item

