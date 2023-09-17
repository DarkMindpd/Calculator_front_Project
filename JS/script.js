let big_text = document.getElementById("bigtext");
let small_text = document.getElementById("smalltext");

console.log(eval("5*(7)"));

let near_machine_language = [];

let human_language = [];

function show(small, big) {
  let small_data = "";
  let big_data = "";

  for (var i = 0; i < small.length; i++) {
    small_data += small[i];
  }

  if (small == human_language) {
    small_data += "=";
  }

  for (var i = 0; i < big.length; i++) {
    big_data += big[i];
  }

  small_text.innerText = small_data;
  big_text.innerText = big_data;

  if (small_text.textContent.length > 28) {
    small_text.style.overflowX = "scroll";
  } else {
    small_text.style.overflowX = "unset";
  }
  if (big_text.textContent.length > 14) {
    big_text.style.overflowX = "scroll";
  } else {
    big_text.style.overflowX = "unset";
  }
}

function del() {
  near_machine_language = [];
  human_language = [];

  big_text.innerText = "";
  small_text.innerText = "";

  small_text.style.overflowX = "unset";
  big_text.style.overflowX = "unset";
}

function get_value(value) {
  let symbols = ["%", "*", "-", "+", "/", "÷", "×"];
  let machine = value;
  let human = value;

  if (value == "×") {
    machine = "*";
  } else if (value == "÷") {
    machine = "/";
  }

  near_machine_language.push(machine);
  human_language.push(human);

  if (
    symbols.includes(human_language[human_language.length - 2]) &&
    symbols.includes(value)
  ) {
    near_machine_language.splice(near_machine_language.length - 2, 1);
    human_language.splice(human_language.length - 2, 1);
  } else if (
    human_language[human_language.length - 2] == "." && 
    value == "."
    ) {
      near_machine_language.splice(near_machine_language.length - 2, 1);
      human_language.splice(human_language.length - 2, 1);
    }
    show([], human_language);
}

function del_last() {
  near_machine_language.splice(-1);
  human_language.splice(-1);
  show([], human_language);
}

function equal() {
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let machine_language = "";
  let eq = "";

  for (var i = 0; i < near_machine_language.length; i++) {
    if (
      near_machine_language[i] == "(" &&
      numbers.includes(near_machine_language[i - 1])
    ) {
      machine_language += "*";
    } else if (
      numbers.includes(near_machine_language[i]) &&
      near_machine_language[i - 1] == ")"
    ) {
      machine_language += "*";
    } else if (
      near_machine_language[i] == "(" &&
      near_machine_language[i - 1] == ")"
    ) {
      machine_language += "*";
    }
    machine_language += near_machine_language[i];
  }

  try {
    eq = String(eval(machine_language));
    near_machine_language = [];
    show(human_language, [eq]);
    human_language = [];
    for (var x = 0; x < eq.length; x++) {
      near_machine_language.push(eq[x]);
      human_language.push(eq[x]);
    }
  } catch {
    eq = "invalid format.";
    show(human_language, [eq]);
  }
}
