export default [
    { input: { length: 50, chest: 85, sleeve: 61 }, output: { S: 1 } },
    { input: { length: 59, chest: 90, sleeve: 64 }, output: { S: 1 } },
    { input: { length: 63, chest: 96, sleeve: 62.5 }, output: { S: 1 } },
    { input: { length: 63.5, chest: 99, sleeve: 65.5 }, output: { S: 1 } },
    { input: { length: 64, chest: 106, sleeve: 67 }, output: { M: 1 } },
    { input: { length: 67, chest: 110, sleeve: 66 }, output: { M: 1 } },
    { input: { length: 68, chest: 114, sleeve: 68 }, output: { L: 1 } },
    { input: { length: 68.5, chest: 119, sleeve: 69 }, output: { L: 1 } },
    { input: { length: 69, chest: 124, sleeve: 68.5 }, output: { XL: 1 } },
    { input: { length: 70.5, chest: 134, sleeve: 69.5 }, output: { XL: 1 } },
    { input: { length: 72, chest: 138, sleeve: 70 }, output: { XXL: 1 } },
    { input: { length: 74, chest: 141, sleeve: 70.5 }, output: { XXL: 1 } },
    { input: { length: 75.5, chest: 146, sleeve: 71 }, output: { "3XL": 1 } },
    { input: { length: 100, chest: 200, sleeve: 76 }, output: { "3XL": 1 } }
  ];
  
//-------------------

import brain from "brain.js";
//const brain = require("../dist/index").default;

const trainingData = [
  "Jane saw Doug.",
  "Doug saw Jane.",
  "Spot saw Doug and Jane looking at each other.",
  "It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all."
];

const lstm = new brain.recurrent.LSTM();
const result = lstm.train(trainingData, {
  iterations: 1500,
  log: details => console.log(details),
  errorThresh: 0.011
});

const run1 = lstm.run("Jane");
const run2 = lstm.run("Doug");
const run3 = lstm.run("Spot");
const run4 = lstm.run("It");

console.log("run 1: Jane" + run1);
console.log("run 2: Doug" + run2);
console.log("run 3: Spot" + run3);
console.log("run 4: It" + run4);

