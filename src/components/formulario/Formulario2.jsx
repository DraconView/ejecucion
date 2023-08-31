import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AlertFailForm from './AlertFailForm'
import "./../../cssGeneral/CssGeneral.css";
import { HiArrowNarrowLeft} from "react-icons/hi";

const Formulario = ({ createOrder }) => {

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
        firstName: '',
        celularMovil: '',
        ciudad: '',
    })
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((state) => {
            return { ...state, [name]: value }
        })
    }

    const handleOnclick = () => {
        const { firstName, celularMovil, ciudad } = form 
        createOrder({ firstName, celularMovil, ciudad }) 
    }

    const classes = useStyles()

    const disabled = !(
        /*form.email.length &&
        form.lastName.length &&
        form.adress.length &&
        form.emailConfirmation.length &&
        form.email === form.emailConfirmation*/
        form.firstName.length &&
        form.ciudad.length &&
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
                        Para continuar <br/>
                        completa los datos</h3>
                    </div>
                    <div className="alineacionVerticalSinWidth"
                        style={{ margin:'40px 0px 40px 0px' }}>
                        <TextField
                            required
                            label="Nombre"
                            Value={form.firstName}
                            multiline
                            name="firstName"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Teléfono"
                            Value={form.celularMovil}
                            multiline
                            name="celularMovil"
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Ciudad"
                            Value={form.ciudad}
                            multiline
                            name="ciudad"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </div>
                    
                    </div>
                    <div className="alineacionVerticalSinWidth" style={{ height: '40px' }}>
                        {disabled ? (
                            <AlertFailForm open={open} setOpen={setOpen} />
                        ) : (
                               <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f7d04b',
                                    color: '#000', 
                                    width:'185px',
                                    marginTop:'40px',
                                }}
                                onClick={handleOnclick}
                            >
                                Continuar
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Formulario

// interfaz
