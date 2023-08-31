import { useEffect, useState } from 'react';
import "./../../cssGeneral/CssGeneral.css";
import { Link } from 'react-router-dom';

const ListBurgerItem = ({ list }) => {
    return (
        <div>
            <div className="alineacionVerticalSinWidth" style={{ margin:'20px 0px 20px 0px' }}>
                <span className="textoBurgerCategorias">SERVICIOS</span>
                {list.map((product) => (
                    <div className="divBurgerCategorias" key={product.id}>
                        <Link to={`/categories/${product.categoryId}-${product.subCategorias}`} style={{ textDecoration: 'none' }}>
                            <div className="divTextosburgerCategorias" >
                                <span>{product.name}</span>    
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>    
    );
};

export default ListBurgerItem;
