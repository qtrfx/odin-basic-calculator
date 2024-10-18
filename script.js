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

function handleNumber(number) {
  displayValue += number;
  updateDisplay(displayValue);
}

function updateDisplay(newValue) {
  calculatorDisplay.innerText = newValue;
}
