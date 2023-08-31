import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import "./../../cssGeneral/CssGeneral.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})
const AlertFailForm = ({ open, setOpen }) => {
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div className="alineacionVerticalSinWidth" style={{ height: '40px'}}>
                <button
                    className="botonButton"
                    style={{ margin:'0px 0px 0px 0px' }}
                    onClick={handleClickOpen}
                >
                Continuar
            </button>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                Alerta para seguir comprando 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Error! Verifique que todos los campos estén completos y que
                        los correos electrónicos son los mismos 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} color="primary">
                        Cancelar 
                    </button>
                    <button onClick={handleClose} color="primary">
                    De acuerdo 
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertFailForm

// interfaz
