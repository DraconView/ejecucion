import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Paper, Button } from "@material-ui/core";
import { convertToMoney } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../buttons/Buttons";
import { TiDeleteOutline } from "react-icons/ti";
import "./../../cssGeneral/CssGeneral.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "97%",
    margin: "auto",
    marginTop: "20px",
    minHeight: "100vh",
  },
});
const TableCart = ({ setShowForm }) => {
  //console.log("llamando a TableCart");

  const { cartItem, deleteProduct, costoTotal, contextBdOrdenes } = useContext(CartContext);

  const [vistaBotonAgregarOtro, setVistaBotonAgregarOtro] = useState("none");

  useEffect(() => {
    if (contextBdOrdenes === "OrdenesProductos") {
      setVistaBotonAgregarOtro("flex");
    }
  }, [contextBdOrdenes]);

  const deleteItem = (item) => {
    deleteProduct(item);
  };
  const classes = useStyles();

  useEffect(() => {
    function autoFocus() {
      window.scrollTo(0, 0);
    }
    autoFocus();
  }, []);

  // vista final de orden de compra
  return (
    <div className="divTablaProductos">
      <Paper className={classes.root}>
        <TableContainer>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  width="90"
                  display="flex"
                  flexdirection="column"
                >
                  Producto
                </TableCell>
                <TableCell align="center" width="50px">
                  Cantidad
                </TableCell>
                <TableCell align="center" width="50px">
                  Precio
                </TableCell>
                <TableCell align="center" width="50px">
                  Eliminar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItem.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <div display="flex" flexdirection="column">
                        {item.name}
                        <img
                          src={item.img[0]}
                          alt="img"
                          style={{ width: "100px" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">{item.count}</TableCell>
                    <TableCell align="center">
                      {convertToMoney(item.price)}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => deleteItem(item)}>
                        <TiDeleteOutline
                          style={{ fontSize: "27px", color: "#465798" }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div
            className="alineacionVerticalDerecha"
            style={{ margin: "10px 0px 0px -30px" }}
          >
            Costo Total: {costoTotal()}
          </div>
        </TableContainer>
        <div
          className="alineacionVerticalDerecha"
          style={{ margin: "20px 0px 0px -30px" }}
        >
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="boton2">
              <span className="textoBoton">finalizar</span>
            </div>
          </Link>
        </div>
        <div
          className="alineacionVerticalDerecha"
          style={{ margin: "0px 0px 20px -30px",
          display: `${vistaBotonAgregarOtro}` }}
        >
          <Link to="/categorias-productos" style={{ textDecoration: "none" }}>
            <div className="boton2">
              <span className="textoBoton">agregar otro</span>
            </div>
          </Link>
        </div>
      </Paper>
    </div>
  );
};
export default TableCart;

/* POSIBLECODIGOFUNCIONAL 1132a070223
import { useEffect } from 'react' 
import CartContext from '../../context/CartContext'
import { Table, TableBody, TableCell } from '@material-ui/core'
import { TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Paper, div , Button} from '@material-ui/core'
import { convertToMoney } from '../../utils'
import { makeStyles } from '@material-ui/core/styles'
import Buttons from '../buttons/Buttons'

var alturaViewport = window.innerHeight;

const useStyles = makeStyles({
    root: {
        width: '97%',
        margin: 'auto',
        marginTop: '20px',
        minHeight: '100vh',
    },
})
const TableCart = ({ setShowForm }) => {
    const { cartItem, deleteProduct, costoTotal } =
        useContext(CartContext)
//console.log('TableCart')
    const deleteItem = (item) => {
        deleteProduct(item)
    }
    const classes = useStyles()

    useEffect(() => {
        function autoFocus() {
            window.scrollTo(0,0);
        }
        autoFocus()
    }, [])

    // vista final de orden de compra
    return (
        <div >
            <Paper className={classes.root}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow> 
                                <TableCell style={{ width: '20%'}}>
                                    Producto 
                                </TableCell>
                                <TableCell style={{ width: '20%' }}>
                                    Articulo 
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{ width: '20%' }}
                                >
                                    Cantidad 
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{ width: '20%' }}
                                >
                                    Precio 
                                </TableCell>
                                <TableCell
                                    align="right"
                                    style={{ width: '20%' }}
                                >
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItem.map((item) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">
                                            <img
                                                src={item.img[0]}
                                                alt="img"
                                                style={{ width: '80px' }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">
                                            {item.count}
                                        </TableCell>
                                        <TableCell align="right">
                                            {convertToMoney(item.price)}
                                        </TableCell>
                                        <TableCell
                                             align="right">
                                            <Button onClick={() => deleteItem(item)}>
                                            Eliminar 
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <div className='alineacionVerticalSinFlexEnd'>
                        Costo Total: {costoTotal()}
                    </div>
                </TableContainer>
                <Buttons setShowForm={setShowForm} />
            </Paper>
        </div>
    )
}
export default TableCart

*/
