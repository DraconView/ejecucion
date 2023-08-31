const trainingData = [
    {
      input: "Tan cierto, gracias!",
      output: { politico: 1 }
    },
    {
      input: "Dentro de la guardería de Chi",
      output: { moda: 1 }
    },
    {
      input: "¿Por qué me teñí el pelo de rosa?",
      output: { moda: 1 }
    },
    {
      input:
        "Feeling Blue (llevando el contorno en polvo de @kkwbeauty en el kit de contorno medio y oscuro como sombra de ojos, y un nuevo labial próximamente)",
      output: { moda: 1 }
    },
    {
      input: "¡Quiero tanto a mi mamá como a una rubia! @KrisJenner @KUWTK",
      output: { moda: 1 }
    },
    {
      input: "Realmente no hago pelucas. Es real.",
      output: { moda: 1 }
    },
    {
      input:
        "Espera, la idea de volver a la oscuridad me entristece. @MyleezaKardash puede haberme influenciado",
      output: { moda: 1 }
    },
    {
      input:
        "Salí en vivo en instagram! ¡Gracias a mi BFF Allison por la divertida entrevista y gracias a Creat & Cultivate por recibirme!",
      output: { moda: 1 }
    },
    {
      input:
        "¡En camino al evento @createcultivate! Estoy siendo entrevistado sobre negocios por mi mejor amiga Allison. ¡Esto debería ser divertido!",
      output: { moda: 1 }
    },
    {
      input:
        "¡El mas dulce! ¡El mejor bebé! Se parece un poco a North y un poco a Saint, ¡pero definitivamente es su propia persona!",
      output: { moda: 1 }
    },
    {
      input:
        "¡La Semana de la Moda es muy divertida en el #KimmodaGame! ¡Me encantaría ver lo que llevas puesto! http://smarturl.it/PlayKKH",
      output: { moda: 1 }
    },
    {
      input:
        "'El congresista Schiff omitió y distorsionó hechos clave' @FoxNews Entonces, ¿qué más hay de nuevo? ¡Él es un farsante total!",
      output: { politico: 1 }
    },
    {
      input:
        "Seré entrevistado por @JudgeJeanine en @FoxNews a las 9:00 p.m. ¡Disfrutar!",
      output: { politico: 1 }
    },
    {
      input:
        "Dem Memo: no reveló quiénes eran los clientes: la campaña de Clinton y el DNC. ¡Guau!",
      output: { politico: 1 }
    },
    {
      input:
        "La respuesta del memorando demócrata sobre los abusos de vigilancia del gobierno es un FRACASO político y legal total. Simplemente confirma todas las cosas terribles que se hicieron. ¡TAN ILEGAL!",
      output: { politico: 1 }
    },
    {
      input:
        "Las solicitudes de desempleo se encuentran en el nivel más bajo desde 1973. ¡Mucho de esto tiene que ver con el recorte masivo de regulaciones innecesarias y que eliminan empleos!",
      output: { politico: 1 }
    },
    {
      input: "¡Tan cierto Wayne, y el desempleo negro más bajo de la historia!",
      output: { politico: 1 }
    },
    {
      input:
        "¡Gracias a los grandes hombres y mujeres de los Estados Unidos @SecretService por un trabajo bien hecho!",
      output: { politico: 1 }
    },
    {
      input:
        "¡Hoy, @FLOTUS Melania y yo tuvimos el honor de dar la bienvenida al Primer Ministro @TurnbullMalcolm y a la Sra. Turnbull de Australia a la @WhiteHouse!",
      output: { politico: 1 }
    },
    {
      input:
        "Después de años de reconstruir OTRAS naciones, finalmente estamos reconstruyendo NUESTRA nación, ¡y estamos restaurando nuestra confianza y nuestro orgullo!",
      output: { politico: 1 }
    },
    {
      input: "Tan cierto, gracias!",
      output: { politico: 1 }
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
    let politicalResponses = [
      "En cuanto al ámbito político, ",
      "En términos políticos, ",
      "Desde una perspectiva política, "
    ];
    let fashionResponses = [
      "En cuanto a moda, ",
      "Hablando de moda, ",
      "Desde una perspectiva de moda, "
    ];
    if (results.politico > results.moda) {
      output = politicalResponses[Math.floor(Math.random() * politicalResponses.length)];
    } else {
      output = fashionResponses[Math.floor(Math.random() * fashionResponses.length)];
    }
    return output;
  }
  
  // Entrenar neurona
  train(trainingData);

  
  

