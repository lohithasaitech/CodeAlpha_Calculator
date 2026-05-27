let display = document.getElementById("display");

function appendValue(value){

  display.value += value;

}

function clearDisplay(){

  display.value = "";

}

function deleteValue(){

  display.value = display.value.slice(0,-1);

}

function calculateResult(){

  try{

    display.value = eval(display.value);

  }

  catch(error){

    display.value = "Invalid";

  }

}

// Keyboard Support

document.addEventListener("keydown", function(event){

  let key = event.key;

  if(
    (key >= "0" && key <= "9") ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "." ||
    key === "%"
  ){

    appendValue(key);

  }

  else if(key === "Enter"){

    calculateResult();

  }

  else if(key === "Backspace"){

    deleteValue();

  }

  else if(key === "Escape"){

    clearDisplay();

  }

});