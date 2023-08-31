import { useState } from 'react';

// Función para convertir el CSS en un objeto y organizarlo alfabéticamente
function organizeCSS(css) {
  const cssObj = {};
  const cssLines = css.split(/\n|;/).filter(line => line.trim() !== '');
  cssLines.forEach(line => {
    const [property, value] = line.split(':').map(item => item.trim());
    cssObj[property] = value;
  });

  const sortedCSSObj = {};
  Object.keys(cssObj).sort().forEach(property => {
    sortedCSSObj[property] = cssObj[property];
  });

  return sortedCSSObj;
}

// Función para generar CSS a partir del objeto organizado
function generateCSS(cssObj) {
  return Object.entries(cssObj).map(([property, value]) => `${property}: ${value};`).join('\n');
}

const UnorganizedToOrganizedCSS = () => {
  // Estado para almacenar el CSS desorganizado y el CSS organizado
  const [unorganizedCSS, setUnorganizedCSS] = useState(`
    margin: 10px 30px 10px 0px;
    border-radius: 20px;
    width: 300px;
    border: solid 2px #feba20;
    padding: 10px 20px 10px 50px;
    font-size: 15px;
    color: #000;
    background-color: #ffffff;
    outline: none;
  `);
  const [organizedCSS, setOrganizedCSS] = useState('');

  // Función para manejar el evento de conversión
  const handleConvertClick = () => {
    // Convertir el CSS desorganizado en un objeto y organizarlo
    const organizedCSSObj = organizeCSS(unorganizedCSS);

    // Generar CSS ordenado a partir del objeto organizado
    const organizedCSS = generateCSS(organizedCSSObj);

    // Actualizar el estado con el resultado
    setOrganizedCSS(organizedCSS);
  };

  return (
    <div>
      <h2>Unorganized CSS2:</h2>
      <textarea
        style={{ width: '400px', height: '200px',
      border: 'solid 1px #000'
      }} 
        value={unorganizedCSS}
        onChange={(e) => setUnorganizedCSS(e.target.value)}
        rows={10}
        cols={50}
      />
      <button onClick={handleConvertClick}>Convert</button>
      <h2>Organized CSS:</h2>
      <textarea
        value={organizedCSS}
        readOnly
        rows={10}
        cols={50}
      />
    </div>
  );
};

export default UnorganizedToOrganizedCSS;
