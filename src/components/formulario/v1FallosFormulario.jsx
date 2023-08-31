import { useContext, useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AlertFailForm from './AlertFailForm'
import "./../../cssGeneral/CssGeneral.css";
import CartContext from "../../context/CartContext";
import { HiArrowNarrowLeft} from "react-icons/hi";

const Formulario = ({ createOrder }) => {

    const { contextCelularMovil } = useContext(CartContext)

useEffect(() => {
    function autoFocus() {
        window.scrollTo(0,0);
    }
    autoFocus()
}, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '36ch',
                flexdirection: 'column'
            },
        },
    }))
    const [form, setForm] = useState({
        celularMovil: '',
    })
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((state) => {
            return { ...state, [name]: value }
        })
    }

    const handleOnclick = () => {
        const { celularMovil } = form 
        createOrder({ celularMovil }) 
    }

    const classes = useStyles()

    const disabled = !(
        /*form.email.length &&
        form.lastName.length &&
        form.adress.length &&
        form.emailConfirmation.length &&
        form.email === form.emailConfirmation*/
        //form.ciudad.length &&
        form.celularMovil.length > 0 

    )
 
    return (
        <div style={{ height: '100vh',}}>
            <div 
                style={{ alignitems: 'left', display: 'flex', cursor:'pointer',
                         backgroundColor:'transparent', width:'100%' }}>
                    <Link to="/tablero-administrador"> 
                            <HiArrowNarrowLeft style={{ fontSize:'35px', margin:'15px 0px 0px 15px', color:'#646464'}} /></Link>
            </div>
            <div className='divTituloFormularioRegistro'>
                <span className='textoTituloFormularioRegistro'>
                recibo de servicio  
                </span>
            </div>
            <div className="alineacionVerticalSinWidth">
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    //fullWidth={true}
                >
                    <div>
                    <div className="alineacionVerticalSinWidth">
                    <h3 >
                        Para continuar completa los datos</h3>
                    </div>
                    <div className="alineacionVerticalSinWidth"
                        style={{ margin:'40px 0px 40px 0px' }}>
                        <TextField
                            required
                            label="Teléfono"
                            value={contextCelularMovil}
                            multiline
                            name="celularMovil"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </div>
                    
                    </div>
                    <div className="alineacionVerticalSinWidth" style={{ height: '40px' }}>
                        {disabled ? (
                            <AlertFailForm open={open} setOpen={setOpen} />
                        ) : (
                               <span
                                className="botonButton"
                                style={{ margin:'0px 0px 0px 0px' }}
                                onClick={  handleOnclick}
                            >
                                Continuar
                            </span>
                            
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Formulario
    
