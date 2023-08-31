import { useState } from 'react'
import CartContext from './CartContext'
import { convertToMoney } from '../utils/utils'

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])
    const [contextBdOrdenes, setcontextBdOrdenes] = useState("")
    const [contextCiudadSeleccionada, setcontextCiudadSeleccionada] = useState("")
    const [contextPuntoReferencia , setcontextPuntoReferencia] = useState("")
    const [idDiaHoraSeleccionado, setIdDiaHoraSeleccionado] = useState("")  
    const [contextNumeroWhatsapp, setcontextNumeroWhatsapp] = useState("")  
    const [contextDiaMasHoraDinamicosSeleccionados, setcontextDiaMasHoraDinamicosSeleccionados] = useState([])
    const [contextServicios, setcontextServicios] = useState([])
    const [contextItemProductos, setcontextItemProductos] = useState([])
    const [contextUsuarioLogueado, setcontextEstatusUsuarioLogueado] = useState("")
    const [contextAccionUsuario, setcontextAccionUsuario] = useState("")
    const [contextCelularMovil, setcontextCelularMovil] = useState("")
    const [contextDatosCita, setcontextDatosCita] = useState([])
    const [contextIdParaActualizar, setcontextIdParaActualizar] = useState("")
    const [contextUidCliente, setcontextUidCliente] = useState("")
    const [contextFiltrarProductosPorCategoria, setcontextFiltrarProductosPorCategoria] = useState([])

    const providerUidCliente = (uidCliente) => {
        setcontextUidCliente(uidCliente)
    }

    const providerIdParaActualizar = (idParaActualizar) => {
        setcontextIdParaActualizar(idParaActualizar)
    }
    
    const providerDatosCita = (datosCita) => {
        setcontextDatosCita(datosCita)
    }

    const providerCelularMovil  = (celularMovil) => {
        setcontextCelularMovil(celularMovil)
    }

    const providerAccionUsuario = (accionUsuario) => {
        setcontextAccionUsuario(accionUsuario)
    }

    const providerUsuarioLogueado = (estatusUsuarioLogueado) => {
        setcontextEstatusUsuarioLogueado(estatusUsuarioLogueado)
    }

    const providerDiaDinamicoSeleccionado = (diaDinamicoSeleccionado) => {
        setcontextDiaDinamicoSeleccionado(diaDinamicoSeleccionado)
    }

    const [contextDiaDinamicoSeleccionado, setcontextDiaDinamicoSeleccionado] = useState([])

    const providerDiaMasHoraDinamicosSeleccionados = (diaMasHoraDinamicosSeleccionados) => {
        setcontextDiaMasHoraDinamicosSeleccionados(diaMasHoraDinamicosSeleccionados)
    }

    const productsAdd = (itemCount) => {
        if (cartItem.find((item) => item.id === itemCount.id)) {
            const newCartItem = cartItem.map((item) => {
                if (item.id === itemCount.id) {
                    return { ...item, count: itemCount.count + item.count }
                }
                return item
            })
            setCartItem(newCartItem)
        } else {
            setCartItem((state) => {
                return [...state, itemCount]
            })
        }
    }

    const providerBdOrdenes = (BdOrdenesSeleccionada) => {
        setcontextBdOrdenes(BdOrdenesSeleccionada)
    }

    const providerEleccionCiudad = (contextCiudadSeleccionada) => {   
        setcontextCiudadSeleccionada(contextCiudadSeleccionada)
    }

    const providerPuntoReferencia = (puntoReferencia) => {
        setcontextPuntoReferencia(puntoReferencia)
    }

    const RecibirIdDiaHoraSeleccionado = (idDiaHoraSeleccionado) => {
        setIdDiaHoraSeleccionado(idDiaHoraSeleccionado)
    }

    const deleteProduct = (itemCount) => {
        const newItems = cartItem.filter((item) => item.id !== itemCount.id)
        setCartItem(newItems)
    }

    const costoTotal = () => {
        const cost = cartItem.reduce(
            (acumulador, item) => acumulador + item.price * item.count,
            0
        )
        return convertToMoney(cost)
    }

    const cantTotal = () => {
        return cartItem.reduce((acumulador, item) => acumulador + item.count, 0)
    }

    const resetCantCart = () => {
        setCartItem([])
        //console.log("resetCantCart en CartProvider");
    }

    const providerNumeroWhatsapp = (numeroWhatsappRecibido) => {
        setcontextNumeroWhatsapp(numeroWhatsappRecibido)
    }

    const providerEnviarServicios = (servicios) => {
        setcontextServicios(servicios)
    }

    const providerItemProductos = (itemProductos) => {
        setcontextItemProductos(itemProductos)
    }

    const providerFiltrarProductosPorCategoria = (itemProductos) => {
        setcontextFiltrarProductosPorCategoria(itemProductos)
    }
        
    const [contextCiudades, setcontextCiudades] = useState([])

    const providerEnviarCiudades = (ciudades) => {
        setcontextCiudades(ciudades)
    }


    const [contextDuracionCita, setcontextDuracionCita] = useState(0)

    const providerDuracionCita = (duracionCita) => {
        setcontextDuracionCita(duracionCita)
    }


    const [contextHorariosCalendario, setcontextHorariosCalendario] = useState([])

    const providerHorariosCalendario = (horariosCalendario) => {
        setcontextHorariosCalendario(horariosCalendario)
    }

    return (
        <CartContext.Provider
            value={{
                productsAdd,
                providerBdOrdenes,
                providerEleccionCiudad,
                providerPuntoReferencia,
                RecibirIdDiaHoraSeleccionado,
                providerNumeroWhatsapp,
                deleteProduct,
                costoTotal,
                cantTotal,
                resetCantCart,
                providerDiaDinamicoSeleccionado,
                providerDiaMasHoraDinamicosSeleccionados,
                providerEnviarServicios, 
                providerEnviarCiudades, 
                providerDuracionCita,
                providerHorariosCalendario,
                providerUsuarioLogueado,
                providerAccionUsuario,
                providerCelularMovil,
                providerDatosCita,
                providerIdParaActualizar,
                providerUidCliente,
                providerItemProductos,
                providerFiltrarProductosPorCategoria,
                contextBdOrdenes,
                cartItem,
                contextCiudadSeleccionada,
                idDiaHoraSeleccionado,
                contextPuntoReferencia,
                contextNumeroWhatsapp,
                contextDiaDinamicoSeleccionado,
                contextDiaMasHoraDinamicosSeleccionados,
                contextServicios,
                contextCiudades,
                contextDuracionCita,
                contextHorariosCalendario,
                contextUsuarioLogueado,
                contextAccionUsuario,
                contextCelularMovil,
                contextDatosCita,
                contextIdParaActualizar,
                contextUidCliente,
                contextItemProductos,   
                contextFiltrarProductosPorCategoria,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
