//CSS GRID ASSIGNMENT

const calc = document.querySelector('#calc');
const buttons = calc.querySelectorAll('button');
const screen = calc.querySelector('#screentext');

buttons.forEach(button => {
  let buttonId = button.id;
  button.style.gridArea = `a${buttonId}`;
});

// BUTTONS

buttons.forEach(button => button.addEventListener('click', evaluate));

let firstOperand = '';
let operator = null;
let secondOperand = '';

function evaluate(e) {
  if (screen.className == 'scrollingtext') screen.classList.remove('scrollingtext');
  let targetClass = e.target.className;
  switch (targetClass) {
    case 'number':
      log(e);
      break;
    case 'operator':
      operate(e);
      break;
    case 'equal':
      equal(e);
      break;
    case 'clear':
      clear();
      screen.textContent = 'HELLO';
      break;
    case 'backspace':
      backspace(e);
      break;
    case 'empty':
      empty(e);
      break;
  }
}

function log(e) {
  if (operator == null && firstOperand.length < 6) {
    firstOperand += `${e.target.id}`;
    screen.textContent = `${firstOperand}`;
  } else if (!(operator == null) && secondOperand.length < 6) {
    secondOperand += `${e.target.id}`;
    screen.textContent = `${secondOperand}`;
  }
}

function operate(e) {
  if (operator == null) {
    screen.textContent = '';
    operator = e.target.id;
    e.target.classList.add('selected');
  } else if (!(operator == null)) {
    screen.textContent = 'ERROR';
    setTimeout(() => {screen.textContent = secondOperand}, 1000);
  }
}

function equal(e) {
  if (operator == null) return;
  else if (!(operator == null) && !(secondOperand == '')) {
    let longResult = calculate(operator, firstOperand, secondOperand);
    let result = Math.round((longResult + Number.EPSILON) * 100) / 100;
    screen.textContent = `${result}`;
    if (result.toString().length > 6) {
      screen.classList.add('scrollingtext');
    }
    clear();
    firstOperand = result;
  } else {
    screen.textContent = 'ERROR';
    setTimeout(() => {screen.textContent = secondOperand}, 1000);
  }
}


function calculate(operator, a, b) {
  switch (operator) {
    case 'divide':
      return +a / +b;
    case 'multiply':
      return +a * +b;
    case 'subtract':
      return +a - +b;
    case 'add':
      return +a + +b;
  }
}

function clear() {
  if (!(operator == null)) removeRed();
  firstOperand = '';
  operator = null;
  secondOperand = '';
}

function backspace(e) {
  if (firstOperand == '') return;
  if (operator == null) {
    firstOperand = firstOperand.slice(0, -1);
    screen.textContent = `${firstOperand}`;
  } else if (!(operator == null) && secondOperand == '') {
    removeRed();
    screen.textContent = firstOperand;
    operator = null;
  } else if (!(operator == null) && !(secondOperand == '')) {
    secondOperand = secondOperand.slice(0, -1);
    screen.textContent = `${secondOperand}`;
  }
}

function removeRed () {
    let red = calc.querySelector(`#${operator}`);
    red.classList.remove('selected');
}

function empty() {
  let thoughtbubble = document.querySelector('#thoughtbubble');
  thoughtbubble.textContent = '';
  let thought = document.createElement('p');
  thought.textContent = 'That\ntickles!';
  thoughtbubble.appendChild(thought);
  thoughtbubble.classList.add('visible');
  setTimeout(() => {thoughtbubble.classList.remove('visible');}, 3000);
}
