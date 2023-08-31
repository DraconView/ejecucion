/* este codigo causa este error :
Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more:
*/
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
este codigo elimina el error pero anterior pero cuando se raliizan cambios en un formulario ocasiona este error:
chunk-YR6NTBON.js?v=52ff46c5:sourcemap:9145 Uncaught TypeError: Cannot read properties of undefined (reading 'refs')

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Importar desde "react-dom/client"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Si deseas que tu aplicación funcione sin conexión y cargue más rápido, puedes cambiar
// unregister() a register() a continuación. Ten en cuenta que esto tiene algunas limitaciones.
// Obtén más información sobre los Service Workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/

/* produce duplicidad de elementos en el DOM
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// </React.StrictMode> eliminar para mejorar performance
*/



