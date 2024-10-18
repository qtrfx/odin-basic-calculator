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
      if (event.target.classList.contains("keypad-key")) {
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
