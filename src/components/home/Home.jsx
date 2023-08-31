// CONTIENE LISTA DE PRODUCTOS DE LA TIENDA 
import ItemListContainer from '../../containers/itemListContainer/ItemListContainer'
// import ImgMain from '../main/ImgMain'<ImgMain /> banner superior

import useStyles from './Style' 

const Home = () => {
    const classes = useStyles()
    return (
        <div  >
            
            <div className={classes.appBar}>
            <ItemListContainer />
            </div>
        </div>
    )
}
export default Home

/*
var alturaViewport = window.innerHeight;
style={{ height:`${alturaViewport}px` }}
*/


