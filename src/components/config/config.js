/* create-react-app implementa commonjs, no se puede usar import
module.exports = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://tuweb.com',
}*/

// npm create vite implementa ECMAScript en la que process no está definida hay que importarla la librería
import process from 'process';
export const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'https://draconsoftware.com';
