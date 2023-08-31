import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#ffffff',
    },
    title: {
        flexGrow: 1,
        padding: '7px',
        height: '43px',
    },
    logoWhastapp: {
        flexGrow: 1,
        position: 'fixed',
        padding: '-800px',
        height: '250px',
        /*flexGrow: 3,
        position: 'fixed',
        padding: '100px',
        height: '500px',*/
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },

    categoria: {
        color: '#ffffff',
        textDecoration: 'none',
    },
    categoriaMobile: {
        color: 'black',
        textDecoration: 'none',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))

export default style
