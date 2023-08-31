import { useState } from "react";
import Speech from "react-speech";

const ConvertirTextoVoz = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(""); // Cambiado a cadena vacía
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  return (
    <div>
      <textarea value={text} onChange={handleInputChange} />

      <div
        className="alineacionVertical"
        style={{ margin: "10px 10px 10px 10px" }}
      >
        <span>selección de voz:</span>
        <select value={voice} onChange={handleVoiceChange}>
          <option value="">Selecciona una voz</option>
          <option value="Alex">Alex</option>
          <option value="Samantha">Samantha</option>
          <option value="Victoria">Victoria</option>
        </select>
      </div>

      <div
        className="alineacionVertical"
        style={{ margin: "10px 10px 10px 10px" }}
      >
        <span>Velocidad:</span>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </div>

      <div
        className="alineacionVertical"
        style={{ margin: "10px 10px 10px 10px" }}
      >
        <span>Tono de voz:</span>
        <input
          type="range"
          id="pitch"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
      </div>

      <div
        className="alineacionVertical"
        style={{ margin: "10px 10px 10px 10px" }}
      >
        <span>play</span>
      <Speech
        text={text}
        voice={voice}
        rate={rate}
        pitch={pitch}
        lang="es-ES"
      />
      </div>
    </div>
  );
};

export default ConvertirTextoVoz;
