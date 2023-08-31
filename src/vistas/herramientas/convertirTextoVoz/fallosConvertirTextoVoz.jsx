import { useState } from "react";
import { SpeechRecognition } from "react-speech-recognition";

const ConvertirTextoVoz = ({ transcript, listening, startListening, stopListening }) => {
    const [text, setText] = useState("");
    const [voice, setVoice] = useState("");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [progress, setProgress] = useState(0);
  
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
  
    const handleProgress = () => {
      const percent = Math.floor((transcript.length / text.length) * 100);
      setProgress(percent);
    };
  
    return (
      <div>
        <textarea value={text} onChange={handleInputChange} />
  
        <div className="alineacionVertical" style={{ margin: "10px 10px 10px 10px" }}>
          <span>Selección de voz:</span>
          <select value={voice} onChange={handleVoiceChange}>
            <option value="">Selecciona una voz</option>
            <option value="Alex">Alex</option>
            <option value="Samantha">Samantha</option>
            <option value="Victoria">Victoria</option>
            <option value="es-LA">Voz Latina</option>
          </select>
        </div>
  
        <div className="alineacionVertical" style={{ margin: "10px 10px 10px 10px" }}>
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
  
        <div className="alineacionVertical" style={{ margin: "10px 10px 10px 10px" }}>
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
  
        <div className="alineacionVertical" style={{ margin: "10px 10px 10px 10px" }}>
          <span>Play</span>
          <button onClick={startListening}>Iniciar</button>
          <button onClick={stopListening}>Detener</button>
        </div>
  
        <div className="alineacionVertical" style={{ margin: "10px 10px 10px 10px" }}>
          <span>Progreso:</span>
          <progress value={progress} max="100" />
        </div>
      </div>
    );
  };
  
  export default SpeechRecognition(ConvertirTextoVoz);
  