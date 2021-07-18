//CSS GRID ASSIGNMENT

const calc = document.querySelector('#calc');
const buttons = calc.querySelectorAll('button');
const screen = calc.querySelector('#screen');

buttons.forEach(button => {
  let buttonId = button.id;
  console.log(buttonId);
  button.style.gridArea = `a${buttonId}`;
});

// BUTTONS

buttons.forEach(button => button.addEventListener('click', log));

let firstOperand = '';
let operator = null;
let secondOperand = '';

function log(e) {
  if (operator == null && e.target.className == 'number' && firstOperand.length < 6) {
    firstOperand += `${e.target.id}`;
    screen.textContent = `${firstOperand}`;
  } else if (e.target.className == 'operator' && operator == null) {
    screen.textContent = '';
    operator = e.target.id;
    e.target.classList.add('selected');
  } else if (e.target.className == 'operator' && !(operator == null)) {
    screen.textContent = 'ERROR';
  } else if (e.target.className == 'number' && !(operator == null) && secondOperand.length < 6) {
    secondOperand += `${e.target.id}`;
    screen.textContent = `${secondOperand}`;
  } else if (e.target.className == 'equal' && !(operator == null) && !(secondOperand == '')) {
    let result = calculate(operator, firstOperand, secondOperand);
    screen.textContent = `${result}`;
    let red = calc.querySelector(`#${operator}`);
    red.classList.remove('selected');
    firstOperand = '';
    operator = null;
    secondOperand = '';
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
