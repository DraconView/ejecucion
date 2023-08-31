import { useState } from 'react'
import HerramientasContext from './HerramientasContext'
import { convertToMoney } from '../utils'

export const HerramientasProvider = ({ children }) => {
    const [contextBdOrdenes, setBdOrdenes] = useState("")

// seleccion de base de datos donde se guardaran las ordenes
    const providerBdOrdenes = (BdOrdenesSeleccionada) => {
        setBdOrdenes(BdOrdenesSeleccionada)
        //return contextBdOrdenes
        //return BdOrdenesSeleccionada;
    }

    return (
        <HerramientasContext.Provider
            value={{
                contextBdOrdenes,
                providerBdOrdenes,
            }}
        >
            {children}
        </HerramientasContext.Provider>
    )
}
