import { useState } from "react";

export default function OrganizarAlfabeticamente() {
 //console.log('llamando a OrganizarAlfabeticamente');
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

    const limpiarCasilla = () => {
    setInputValue("");
    setOutputValue("");
    };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOutputClick = () => {
    const sortedCSS = inputValue
      .split(";")
      .filter((css) => css.trim() !== "")
      .sort((a, b) => {
        // Compara las líneas caracter por caracter
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
          if (a[i] !== b[i]) {
            return a[i] < b[i] ? -1 : 1;
          }
        }
        // Si una línea es un prefijo de la otra, la más corta va primero
        return a.length - b.length;
      })
      .join(";\n")+";";
    setOutputValue(sortedCSS);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputValue);
  };

  return (
    <div className="alineacionVertical">
      <h2>organizador css</h2>
      <textarea
        id="css-input"
        value={inputValue}
        className="SalidaOrganizada"
        onChange={handleInputChange}
      />
      <button onClick={handleOutputClick}>Organize CSS</button>
      <button onClick={limpiarCasilla}>limpiar casilla</button>
      <div>
        <textarea 
            id="css-output" 
            value={outputValue} 
            readOnly 
            className="SalidaOrganizada"
            />
        <button onClick={handleCopyClick}>Copy to Clipboard</button>
      </div>
    </div>
  );
}

/*

  /*const handleOutputClick = () => {
    const sortedCSS = inputValue
      .split(";")
      .filter((css) => css.trim() !== "")
      .sort()
      .join(";\n") + ";";
    setOutputValue(sortedCSS);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputValue);
  };*/
