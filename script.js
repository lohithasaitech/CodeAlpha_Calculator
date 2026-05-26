const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";
let lastInput = "";

function updateDisplay() {
  display.value = current || "0";
}

// Evaluate safely
function safeEval(expr) {
  try {
    // disallow unsafe characters; only numbers and arithmetic
    if (!/^[\d+\-*/.() ]*$/.test(expr)) return "Err";
    // No leading operator other than minus sign
    let result = Function('"use strict";return (' + expr + ")")();
    if (result === undefined) return "";
    return Number(result.toFixed(8)); // avoid floating point display weirdness
  } catch (e) {
    return "Err";
  }
}


function handleInput(value) {
  const ops = ['+', '-', '*', '/'];
  if (value === "C") {
    current = "";
  } else if (value === "Backspace") {
    current = current.slice(0, -1);
  } else if (value === "Enter") {
    let evaluated = safeEval(current);
    current = evaluated === "Err" ? "" : evaluated.toString();
  } else if (value === "=") {
    let evaluated = safeEval(current);
    current = evaluated === "Err" ? "" : evaluated.toString();
  } else {
    // Prevent consecutive operators, except minus
    if (ops.includes(value)) {
      if (current === "" && value !== "-") return; // No leading operator (except minus)
      if (ops.includes(lastInput)) return;
    }
    current += value;
  }
  lastInput = value;
  updateDisplay();
}

// Mouse input
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    let key = btn.getAttribute('data-key');
    handleInput(key);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  let allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','Enter','Backspace','c','C','='];
  if (!allowedKeys.includes(e.key)) return;
  if (e.key === "c" || e.key === "C") {
    handleInput("C");
  } else if (e.key === "=") {
    handleInput("=");
  } else {
    handleInput(e.key);
  }
});
updateDisplay();
