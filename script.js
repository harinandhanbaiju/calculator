const display = document.getElementById("display");
const keys = document.querySelectorAll(".key");

let firstValue = "";
let secondValue = "";
let operator = "";
let waitingForSecondValue = false;

function updateDisplay(value) {
  display.textContent = value;
}

function clearAll() {
  firstValue = "";
  secondValue = "";
  operator = "";
  waitingForSecondValue = false;
  updateDisplay("0");
}

function deleteLast() {
  if (waitingForSecondValue) {
    secondValue = secondValue.slice(0, -1);
    updateDisplay(secondValue || "0");
    return;
  }

  firstValue = firstValue.slice(0, -1);
  updateDisplay(firstValue || "0");
}

function appendNumber(digit) {
  if (waitingForSecondValue) {
    secondValue += digit;
    updateDisplay(secondValue);
    return;
  }

  firstValue += digit;
  updateDisplay(firstValue);
}

function appendDecimal() {
  if (waitingForSecondValue) {
    if (!secondValue.includes(".")) {
      secondValue = secondValue ? secondValue + "." : "0.";
      updateDisplay(secondValue);
    }
    return;
  }

  if (!firstValue.includes(".")) {
    firstValue = firstValue ? firstValue + "." : "0.";
    updateDisplay(firstValue);
  }
}

function chooseOperator(nextOperator) {
  if (!firstValue) {
    return;
  }

  if (operator && secondValue) {
    const result = operate(Number(firstValue), Number(secondValue), operator);
    firstValue = String(result);
    secondValue = "";
    updateDisplay(firstValue);
  }

  operator = nextOperator;
  waitingForSecondValue = true;
}

function operate(a, b, op) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "%") {
    return a % b;
  } else if (op === "/") {
    return b === 0 ? "Error" : a / b;
  }

  return b;
}

function calculate() {
  if (!operator || !secondValue) {
    return;
  }

  const result = operate(Number(firstValue), Number(secondValue), operator);
  updateDisplay(String(result));

  if (result === "Error") {
    clearAll();
    updateDisplay("Error");
    return;
  }

  firstValue = String(result);
  secondValue = "";
  operator = "";
  waitingForSecondValue = false;
}

for (const key of keys) {
  key.addEventListener("click", () => {
    const action = key.dataset.action;
    const value = key.dataset.value;

    if (action === "number") {
      appendNumber(value);
    } else if (action === "decimal") {
      appendDecimal();
    } else if (action === "operator") {
      chooseOperator(value);
    } else if (action === "equals") {
      calculate();
    } else if (action === "clear") {
      clearAll();
    } else if (action === "delete") {
      deleteLast();
    }
  });
}
