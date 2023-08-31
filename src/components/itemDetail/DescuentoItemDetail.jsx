import { useContext, useEffect, useState } from 'react'
import ItemCount from '../itemCount/ItemCount'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import AliceCarousel from 'react-alice-carousel';
import CartContext from '../../context/CartContext'
import { HiArrowNarrowLeft} from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import "./../../cssGeneral/CssGeneral.css";

const ItemDetail = ({ item }) => {
    const [count, setCount] = useState(1)
    const [selectCount, setSelectCount] = useState(false)
    const [loading, setLoading] = useState(false)
    const { productsAdd } = useContext(CartContext)
    const [imagesArray, setImagesArray] = useState([])
    const [descuento, setdescuento] = useState("");

    useEffect(() => {
        if (item.img === undefined) {
            setLoading(true)
        } else {
            setImagesArray([item.img]);
        }
    }, [item])

    const handleClickComprar = () => {
        if (count > 0) {
            setSelectCount(true)
            productsAdd({
                id: item.id,
                name: item.name,
                img: item.img,
                idTienda: 1,
                count,
                price: descuento,
                stock: item.stock,
                codeRef: item.name,
                // volumen: item.volumen
            })
        }
    }

    return (
            <div className='divPrincipalItemDetail'>

                <div className="divSalirvolverProductosDetallados" >
                    <Link to="/" >
                        <HiArrowNarrowLeft style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} />
                    </Link>
                </div> 

                <div className="divImagenProducto" >  
                        {imagesArray.length ?
                            <AliceCarousel
                                loading='lazy'
                                mouseTracking
                                items={imagesArray.map(img => <img src={img[0]} 
                                className="post__image" 
                                role="presentation" />)}
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
                
                <div className="divDatosProductosDetalle" >
                    <div className="tituloProductoDetallado" >{item.name}</div>
                    <div className='textoDetalleProductos' ><span> stock: {item.stock}</span> </div>
                    <div className='textoDetalleProductos' ><span> descripción: {item.descripcion}</span> </div>
                    <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '20px' }}> <p> $ {Intl.NumberFormat().format(item.price)} </p> </div>
                </div>   

                <div className='divOpcionDescuento' >
                    <input
                        placeholder="Ingresa descuento" value={Intl.NumberFormat().format(descuento)} 
                        onChange={(e) => setdescuento(e.target.value)}
                        className="casillaTextoIcono" />
                        <ItemCount
                        setCount={setCount}
                        count={count}
                        min={1}
                        stock={item.stock} />
                </div>

                <div className='divCantidadMasCarro' >
                        {selectCount ? (
                        <>
                            <div className="alineacionVerticalSinWidth"
                            style={{ height: '40px', marginTop: '-15px' }}>
                                <Link   to="/cart" style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: '#000',
                                            color: '#ffffff', 
                                            width:'185px'   
                                        }}
                                    >
                                        Verificar pedido
                                    </Button>
                                </Link>
                            </div>
                            <div className="alineacionVerticalSinWidth"
                                style={{ height: '40px', marginTop: '-85px' }} >
                                <Link to="/catalogo" style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: '#f7d04b',
                                            color: '#ffffff', 
                                            width:'185px'
                                        }}
                                    >
                                        Seguir comprando
                                    </Button>
                                </Link>
                            </div>
                        </>
                        ) : (
                        <div className="alineacionVerticalSinWidth" 
                             style={{ height: '40px', marginTop: '-60px' }}>
                        <Button
                            variant="contained"
                            onClick={handleClickComprar}
                            disabled={item.stock === 0}
                            style={{
                                backgroundColor: '#000',
                                color: '#ffffff', 
                                width:'185px'
                            }}
                        >
                            Añadir al carrito
                        </Button>

                        </div>)}
                </div>

        </div>
    )
}
                    
export default ItemDetail
