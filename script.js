let displayValue;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? "No dividing by zero :madge:" : a / b;
}
function splitExpression(expression) {
  const operatorRegex = /[\+\*\-\/]/;
  const [firstOperand, secondOperand] = expression
    .split(operatorRegex)
    .map((e) => parseFloat(e));
  const operator = expression.match(operatorRegex)[0];

  return [firstOperand, secondOperand, operator];
}
