const keyPad = document.querySelector(".keypad");
const calculatorDisplay = document.querySelector(".calculator-display");
let displayValue = "";

keyPad.addEventListener("click", handleClick);

function handleClick(event) {
  if (displayValue === "Syntax Error") {
    displayValue = "";
  }
  switch (event.target.innerText) {
    case "+":
    case "-":
    case "/":
    case "*":
      handleOperand(event.target.innerText);
      break;
    case "=":
      handleCalculate(displayValue);
      break;
    case "AC":
      resetDisplay();
      break;
    default:
      if (event.target.classList.contains("key")) {
        handleNumber(event.target.innerText);
      }
  }
}

function resetDisplay() {
  displayValue = "";
  calculatorDisplay.innerText = displayValue;
}

function handleNumber(number) {
  displayValue += number;
  updateDisplay(displayValue);
}

function updateDisplay(newValue) {
  calculatorDisplay.innerText = newValue;
}

function handleOperand(operand) {
  if (/[\+\-\*\/]/.test(displayValue)) {
    handleCalculate(displayValue, operand);
  } else {
    displayValue += operand;
    updateDisplay(displayValue);
  }
}

function handleCalculate(expression, optionalOperand = "") {
  const splitUpExpression = splitExpression(expression);
  if (!Array.isArray(splitUpExpression)) {
    displayValue = splitUpExpression;
    updateDisplay(displayValue);
    return;
  }
  const operands = splitUpExpression[0].map((operand) => parseFloat(operand));
  const operator = splitUpExpression[1][0];

  let result;
  switch (operator) {
    case "+":
      result = add(operands[0], operands[1]);
      break;
    case "-":
      result = subtract(operands[0], operands[1]);
      break;
    case "*":
      result = multiply(operands[0], operands[1]);
      break;
    case "/":
      result = divide(operands[0], operands[1]);
      break;
  }
  result = String(result);
  if (optionalOperand !== "") {
    result += optionalOperand;
  }
  if (result.length > 12 && result.includes(".")) {
    result = roundNumber(result);
  }
  displayValue = result;
  updateDisplay(result);
}

function roundNumber(number) {
  const [beforePeriod] = number.split(".");
  const decimalToRound = 14 - beforePeriod.length - 3;

  if (decimalToRound < 0) return beforePeriod;
  return parseFloat(number).toFixed(decimalToRound);
}
function splitExpression(expression) {
  const operatorRegex = /[\+\-\/\*]/;
  const operands = expression.split(operatorRegex);
  const operator = expression.match(operatorRegex);

  if (
    !operator ||
    operands[0] === "" ||
    operands[1] === "" ||
    checkPeriods(operands)
  ) {
    return "Syntax Error";
  }
  return [[operands[0], operands[1]], operator];
}

function checkPeriods(operands) {
  let tooManyPeriods = false;
  operands.every((operand) => {
    const periodRegex = /\./g;
    const amountOfPeriods = operand.match(periodRegex);

    if (amountOfPeriods && amountOfPeriods.length > 1) {
      tooManyPeriods = true;
      return false;
    }
  });
  return tooManyPeriods;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b == 0) {
    return "No dividing by 0 :madge:";
  }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}
