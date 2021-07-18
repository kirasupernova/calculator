const calc = document.querySelector('#calc');
const buttons = calc.querySelectorAll('button');

buttons.forEach(button => {
  let buttonId = button.id;
  console.log(buttonId);
  button.style.gridArea = `a${buttonId}`;
});
