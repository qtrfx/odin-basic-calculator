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
function evaluateExpression(operands) {
  const returnResult = {
    valid: true,
    msg: "",
  };
  operands.every((operand) => {
    if (operand.match(".")[0] > 1) {
      returnResult.valid = false;
      returnResult.msg += "Invalid Syntax";
      return false;
    }
  });
  if (returnResult.valid) {
    returnResult.msg = "All good!";
  }

  return returnResult;
}

function splitExpression(expression) {
  const operatorRegex = /[\+\*\-\/]/;
  const [firstOperand, secondOperand] = expression
    .split(operatorRegex)
    .map((e) => parseFloat(e));
  const operator = expression.match(operatorRegex)[0];

  return [firstOperand, secondOperand, operator];
}
