// Item RECIBE DE ItemList ES UN COMPONENTE PLANTILLA DE VISTA RESUMIDA CON NAVEGACION A ItemDetailContainer

const ListaInventarios = ({ item }) => {
    //console.log('dato item archivo Item')

let nivelUnidades =''
if (item.stock > 1900){
    nivelUnidades = 'green'
} 
if (item.stock < 1600)
{
    nivelUnidades = 'red'
} 

    return (
    <div style={{
                display:'flex' ,
                justifyycontent:'start',
                backgroundColor:'#ffffff',
                flexdirection:'row',
                marginLeft:'20px' , 
                width:'100%' ,
                marginTop:'10px' , 
            }}>    
    <div style={{ minWidth:'350px'}}><span>{item.name}</span> </div>
    <div style={{ minWidth:'100px', color:`${nivelUnidades}`}}><span >Uds: {item.stock}</span> </div>
    <div style={{ minWidth:'80px'}}><span> x {item.volumen}</span> </div>
    <div style={{ minWidth:'160px'}}><span> Code: {item.codeRef}</span> </div>
    <div style={{ minWidth:'110px'}}><span> $ {item.price}</span> </div>
    <div style={{ minWidth:'210px'}}><span> Fabricado Por: {item.fabricadoPor}</span> </div>
    </div>
) }

export default ListaInventarios

