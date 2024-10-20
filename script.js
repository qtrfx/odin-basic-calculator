const keyPad = document.querySelector(".keypad");
const calculatorDisplay = document.querySelector(".calculator-display");
let displayValue = "0";

const keyDict = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
  "+": "plus",
  "-": "minus",
  "*": "multi",
  "/": "divide",
  Delete: "delete",
  "=": "equals",
  ".": "period",
};

keyPad.addEventListener("click", handleButtonEvent);
document.querySelector("body").addEventListener("keydown", (e) => {
  if (e.key in keyDict) {
    let keyClass = "";
    if (e.key === "Delete" && e.getModifierState("Shift"))
      keyClass = `.key-clear`;
    else keyClass = `.key-${keyDict[e.key]}`;
    document.querySelector(keyClass).click();
  }
});

// This function handles all click events and calls the respective button functions
function handleButtonEvent(event, keyPressed = false) {
  // Resets the display to an empty state if the previous result was a syntax
  // error
  if (
    displayValue === "Syntax Error" ||
    displayValue === "Math Error" ||
    displayValue === "NaN"
  ) {
    resetDisplay();
  }
  switch (event.target.innerText) {
    case "+":
    case "-":
    case "/":
    case "*":
      handleOperator(event.target.innerText);
      break;
    case "Del":
      handleDelete(displayValue);
      break;
    case "=":
      handleCalculate(displayValue);
      break;
    case "AC":
      resetDisplay();
      break;
    case ".":
      checkPeriods(displayValue);
      break;
    default:
      if (event.target.classList.contains("key")) {
        handleNumber(event.target.innerText);
      }
  }
}

// Deletes the last digit in the displayed expression if it exists and updates
// the display.
function handleDelete(expression) {
  if (expression.length > 0 && expression !== "0") {
    if (expression.length === 1) displayValue = "0";
    else displayValue = displayValue.slice(0, -1);
    updateDisplay(displayValue);
  }
}

function resetDisplay() {
  displayValue = "0";
  calculatorDisplay.innerText = displayValue;
}

// Adds the number from the button input to the current expression.
function handleNumber(number) {
  if (number !== "." && displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay(displayValue);
}

function updateDisplay(newValue) {
  calculatorDisplay.innerText = newValue;
}

// Adds operator input to current expression but calculates current expression,
// if an operator already exists in it.
function handleOperator(operator) {
  const operatorRegex = /(?<![\*\/])(?!^\-)\-|[\/\+\*]/;
  const multiDiviRegex = /[\/\*]/;
  const minusRegex = /(?!^\-)\-/;
  if (
    multiDiviRegex.test(displayValue) &&
    operator === "-" &&
    !minusRegex.test(displayValue)
  ) {
    displayValue += operator;
    updateDisplay(displayValue);
  } else if (operatorRegex.test(displayValue)) {
    handleCalculate(displayValue, operator);
  } else {
    displayValue += operator;
    updateDisplay(displayValue);
  }
}

function handleCalculate(expression, optionalOperand = "") {
  // Split up the expression if possible.
  const splitUpExpression = splitExpression(expression);
  if (splitUpExpression === "Syntax Error") {
    displayValue = splitUpExpression;
    updateDisplay(displayValue);
    return;
  } else if (splitUpExpression === "unchanged") {
    return;
  }
  // Convert operands to floats for easier calculation.
  const operands = splitUpExpression[0].map((operand) => parseFloat(operand));
  const operator = splitUpExpression[1][0];

  // Get result of basic calculator function depending on operator
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
  // Convert result back to a string for easier manipulation afterwards
  result = String(result);
  // Add operand to the result if the function was called through an operator key
  if (optionalOperand !== "") {
    result += optionalOperand;
  }
  // If the resulting decimal number would overflow the calculator display,
  // round it so it fits inside.
  if (result.length > 12 && result.includes(".")) {
    result = roundNumber(result);
  }
  displayValue = result;
  updateDisplay(result);
}

// This function rounds the calculated result to a decimal that will let it fit
// inside the calculator display without overflowing.
// If the number is too large before the decimal, drop the decimal entirely.
function roundNumber(number) {
  const [beforePeriod] = number.split(".");
  let decimalToRound = 14 - beforePeriod.length - 3;
  if (parseInt(beforePeriod) < 0) decimalToRound--;
  if (decimalToRound < 0) return beforePeriod;
  return parseFloat(number).toFixed(decimalToRound);
}

// Validates and splits up an expression to return for evaluation.
function splitExpression(expression, periodCheck = false) {
  // This regular expression captures the first occurence of + / and * whereas
  // - only gets captured if it is not at the beginning of of an operand and not
  // preceded by a / or *. This is to ensure that the calculator can handle
  // negative numbers.
  const operatorRegex = /(?<![\*\/])(?!^\-)\-|[\/\+\*]/;
  let operands = expression.split(operatorRegex);
  const operator = expression.match(operatorRegex);
  if (operands[1] && operands[1] === "-") operands[1] = "";
  if (periodCheck) return operands.pop();
  if (operands.length === 1) return "unchanged";
  if (!operator || operands[0] === "" || operands[1] === "") {
    return "Syntax Error";
  }
  return [[operands[0], operands[1]], operator];
}

// Checks if an operand has too many periods which would make the expression
// invalid.
function checkPeriods(expression) {
  const lastOperand = splitExpression(expression, true);
  if (lastOperand.includes(".")) {
    return;
  }
  handleNumber(".");
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b == 0) {
    return "Math Error";
  }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}
