const display = document.getElementById("display");
let currentInput = "";
let resultShown = false;

function appendNumber(num) {
  if (resultShown) {
    currentInput = "";
    resultShown = false;
  }

  if (num === '.') {
    const parts = currentInput.split(/[\+\-\*\/%]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  currentInput += num;
  updateDisplay(currentInput);
}

function appendOperator(op) {
  if (resultShown) resultShown = false;
  if (currentInput === "") return;

  const lastChar = currentInput[currentInput.length - 1];
  if ("+-*/%".includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  currentInput += op;
  updateDisplay(currentInput);
}

function clearDisplay() {
  currentInput = "";
  updateDisplay("0");
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
}

function calculateResult() {
  try {
    if (currentInput === "") return;
    let expression = currentInput.replace(/÷/g, "/").replace(/×/g, "*");

    let result = eval(expression);
    if (!isFinite(result)) throw new Error("Math Error");

    updateDisplay(result);
    currentInput = result.toString();
    resultShown = true;
  } catch (err) {
    updateDisplay("Error");
    currentInput = "";
    resultShown = true;
  }
}

function updateDisplay(content) {
  display.textContent = content;
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.') {
    appendNumber(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
