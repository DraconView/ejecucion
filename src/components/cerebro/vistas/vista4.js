const trainingData = [
  {
    input: {
      alineacionCasillaEdicionFormularios: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        margin: "5px 0px 5px 0px",
        width: "320px",
        height: "20px"
      }
    },
    output: {
      alineacionCasillaEdicionFormularios: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        height: "20px",
        justifyContent: "left",
        margin: "5px 0px 5px 0px",
        width: "320px"
      }
    }
  }
];

  


//Declaramos primero una constante
let trainedNet;

/*
const fs = require('fs');

function saveDataToFile(data) {
  fs.writeFile('data.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Data saved to data.json');
    }
  });
}

saveDataToFile(trainingData);

button.addEventListener('click', () => {
  const inputVal = input.value;
  const result = execute(inputVal);
  output.textContent = result;
  
  // Guardar datos en archivo
  const data = {
    input: inputVal,
    output: result
  };
  saveDataToFile(data);
});

*/



document.addEventListener('DOMContentLoaded', () => {
  // Crear elementos HTML
  const input = document.createElement('input');
  input.type = 'text';
  const button = document.createElement('button');
  button.textContent = 'Procesar';
  const output = document.createElement('p');

  // Agregar elementos al DOM
  document.body.appendChild(input);
  document.body.appendChild(button);
  document.body.appendChild(output);

  // Manejar clic del botón
  button.addEventListener('click', () => {
    const inputVal = input.value;
    const result = execute(inputVal);
    output.textContent = result;
  });
});

function encode(arg) {
    return arg.split("").map((x) => x.charCodeAt(0) / 255);
  }
  
  function processTrainingData(data) {
    return data.map((d) => {
      return {
        input: encode(d.input),
        output: d.output
      };
    });
  }
  
  function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
    console.log("Training Finished!!");
  }
  
  function execute(input) {
    let results = trainedNet(encode(input));
    let output;
    results.trump > results.kardashian
      ? (output = "Trump")
      : (output = "Kardashian");
    return output;
  }
  
  // Entrenar neurona
  train(trainingData);

  
  

