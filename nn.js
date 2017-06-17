// Neural network

/* A neural network.

hiddenUnits can either be an integer or an array. If it's an integer, have one
layer with that many hidden units. If it's an array, the ith element represents
the number of hidden units in the ith hidden layer.
*/
function NeuralNetwork(numInputs, numOutputs, hiddenUnits=100) {
  /* Fit this neural network to this single training example.

  input is an array. output is an integer from 0 to (numOutputs
  - 1).
  */
  this.fit = function(input, output) {
    ;//todo
  }

  // Predict the output. input is an array.
  this.predict = function(input) {
    return 0; //todo
  }
}
