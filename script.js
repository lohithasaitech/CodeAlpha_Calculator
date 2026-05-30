const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

/* Keyboard Support */

document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers and operators
    if (!isNaN(key) || ["+", "-", "×", "/", ".", "%"].includes(key)) {
        display.value += key;
    }

    // Enter key for result
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace key
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape key to clear
    else if (key === "Escape") {
        clearDisplay();
    }
});
