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

function calculate(expression) {
  const [firstOperand, secondOperand, operator] = splitExpression(expression);
  const evalResult = evaluateExpression([firstOperand, secondOperand]);

  if (!evalResult.valid) {
    return evalResult.msg;
  } else {
    let result;

    switch (operator) {
      case "+":
        result = add(firstOperand, secondOperand);
        break;
      case "-":
        result = subtract(firstOperand, secondOperand);
        break;
      case "/":
        result = divide(firstOperand, secondOperand);
        break;
      case "*":
        result = multiply(firstOperand, secondOperand);
        break;
    }
    return parseFloat(result);
  }
  // evaluate that expression is valid
  // split expression into its operands
  // extract operator from expression
  // switch with operator that calls math function with operands as arguments
}

function handleClick({ target: { value: keyValue } }) {
  switch (keyValue) {
    case "AC":
      // Call function that clears display
      break;

    // Fall through on similar cases
    case "/":
    case "*":
    case "+":
    case "-":
      // Call function that evaluates if the operator should be added
      break;
    case ".":
      // Call function that evaluates if a period should be added
      break;
    case "=":
      // Try to evaluate expression with function;
      calculate(displayValue);
    default:
    // Call function that adds key value to displayvalue
  }
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
