import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./../../cssGeneral/CssGeneral.css";

const ItemBurger = ({ item: { subCategorias, categoryId, unidades, id, name, description, price, img, volumen, genero, referencia } }) => {

      return (
        <div className="divBurgerCategorias">
        <Link to={`/categories/${categoryId+"-"+subCategorias}`} style={{ textDecoration: 'none' }}>
            <div className="divTextosburgerCategorias" >
                <span >{subCategorias}</span>    
            </div>
        </Link>
        </div>
    )
}

export default ItemBurger

/* RENDER CON SUBCATEGORIAS 1203a070223 POSIBLECODIGOFUNCIONAL
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./../../cssGeneral/CssGeneral.css";

const ItemBurger = ({ item: { categoryId, unidades, id, name, description, price, img, volumen, genero, referencia } }) => {

      return (
        <div className="divBurgerCategorias">
        <Link to={`/categories/${categoryId}`} style={{ textDecoration: 'none' }}>
            <div className="divTextosburgerCategorias" >
                <span >{categoryId}</span>    
            </div>
        </Link>
        </div>
    )
}

export default ItemBurger
*/

