import { useState } from "react";

const CompararTextosSinLibreria = () => {

  //console.log("CompararTextos");

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleInputChange = (event, inputNumber) => {
    const value = event.target.value;
    if (inputNumber === 1) {
      setInputValue1(value);
    } else if (inputNumber === 2) {
      setInputValue2(value);
    }
  };

  const compareInputs = () => {
    let difference = "";

    if (inputValue1.length > inputValue2.length) {
      difference = inputValue1.slice(inputValue2.length);
    } else {
      difference = inputValue2.slice(inputValue1.length);
    }

    return difference;
  };

  return (
    <div>
      <textarea
        className="textAreaComparar"
        value={inputValue1}
        onChange={(e) => handleInputChange(e, 1)}
        style={{ whiteSpace: "pre-wrap" }}
      />
      <textarea
        className="textAreaComparar"
        value={inputValue2}
        onChange={(e) => handleInputChange(e, 2)}
        style={{ whiteSpace: "pre-wrap" }}
      />
      <p
        style={{ whiteSpace: "pre-wrap" }}
      >Difference: {compareInputs()}</p>
    </div>
  );
};

export default CompararTextosSinLibreria;
