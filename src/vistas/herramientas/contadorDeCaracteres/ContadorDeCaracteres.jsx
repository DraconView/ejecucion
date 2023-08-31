import { useState } from "react";

function ContadorDeCaracteres () {
  const [count, setCount] = useState(0);

  function handleInput(event) {
    setCount(event.target.value.length);
  }

  return (
    <div>
      <textarea onChange={handleInput} />
      <p>Caracteres introducidos: {count}</p>
    </div>
  );
}

export default ContadorDeCaracteres ;
