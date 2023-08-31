import { useState } from 'react';
import Speech from 'react-speech';

const ConvertirTextoVoz = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState(null);
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

      <select value={voice} onChange={handleVoiceChange}>
        <option value="">Selecciona una voz</option>
        <option value="Alex">Alex</option>
        <option value="Samantha">Samantha</option>
        <option value="Victoria">Victoria</option>
      </select>

      <label htmlFor="rate">Velocidad:</label>
      <input
        type="range"
        id="rate"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={handleRateChange}
      />

      <label htmlFor="pitch">Tono de voz:</label>
      <input
        type="range"
        id="pitch"
        min="0.5"
        max="2"
        step="0.1"
        value={pitch}
        onChange={handlePitchChange}
      />

      <Speech
        text={text}
        voice={voice}
        rate={rate}
        pitch={pitch}
        lang="es-ES"
      />
    </div>
  );
};

export default ConvertirTextoVoz;
