const body = document.querySelector('body');
const container = document.querySelector('.grid-container');
const blocks = document.querySelectorAll('.block');

// Default Grid //
addBlocks(16);

// Generate Blocks (Divs) //
function addBlock() {
  const block = document.createElement('div');
  block.classList.add('block');
  container.appendChild(block);
}

function addBlocks(n) {
  document.documentElement.style.setProperty("--column", n);
  const numBlocks = Math.pow(n, 2);
  for (let i = 1; i < numBlocks + 1; i++) {
    addBlock();
  }
  addMouseOver();
}

// add mouseover eventlistner //
function addMouseOver() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => block.addEventListener('mouseover', function(e) {
    e.target.style.setProperty("background-color", 'black');
    if (userRGB) {
      toggleUserRGB();
      e.target.style.setProperty("background-color", userRGB);
    } else if (random) {
      let color = getColor();
      e.target.style.setProperty("background-color", color);
    } else if (eraser) {
      e.target.style.setProperty("background-color", 'white');
    } 
}));
}

const clearButton = document.getElementById('clear-button');

function eraseTrace() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => block.style.setProperty("background-color", 'white'));
}
clearButton.addEventListener('click', eraseTrace);

function clearGridContainer() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function initialize() {
  random = false;
  userRGB = '';
  document.getElementById('red').value = 0;
  document.getElementById('green').value = 0;
  document.getElementById('blue').value = 0;
  document.getElementById('dimension-input').value = 0;
  document.getElementById('dimension-value').textContent = 0;
  document.documentElement.style.setProperty("--preview", 'black');
}

function clearGrid() {
  clearGridContainer();
  const squarePer = Number(prompt("How many squares per side?", 16));
  if (squarePer > 100) {
    const squarePer = Number(prompt("Number cannot be greater than 100", 16));
    addBlocks(squarePer);
  } else {
    addBlocks(squarePer);
  }
  initialize();
}

// random RGB color - basic //
function getColor() {
  let symbols, color;
  symbols = "0123456789ABCDEF";

  color = "#";

  for (let i = 0; i < 6; i++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

// random RGB handler //
let random = false;

function toggleRandom() {
  random = true;
  eraser = false;
  userRGB = '';
}

const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', toggleRandom);

// black trace handler //
const blackButton = document.getElementById('black-button');
blackButton.addEventListener('click', toggleBlack);

function toggleBlack() {
  random = false;
  eraser = false;
  userRGB = '';
}

// eraser handler //
const eraserButton = document.getElementById('eraser-button');
let eraser = false;
eraserButton.addEventListener('click', toggleEraser);

function toggleEraser() {
  random = false;
  eraser = true;
  userRGB = '';
}

// rbg selector //
let userRGB;

function selectRGB() {
  let red = document.getElementById('red').value;
  let green = document.getElementById('green').value;
  let blue = document.getElementById('blue').value;

  userRGB = `rgb(${red},${green},${blue})`;

  document.documentElement.style.setProperty('--preview', userRGB);

}

document.getElementById('red').addEventListener('input', selectRGB);
document.getElementById('green').addEventListener('input', selectRGB);
document.getElementById('blue').addEventListener('input', selectRGB);

// rgb handler //
function toggleUserRGB() {
  eraser = false;
  random = false;
}

// rgb preview click to set color //
let rgbPreview = document.getElementById('color-preview');
function setRGB() {
  userRGB = document.documentElement.style.getPropertyValue(
    '--preview');
  toggleUserRGB();
}
rgbPreview.addEventListener('click', setRGB);

// grid dimension range input handler //
let userDimension;
let userInput = document.getElementById('dimension-input');
const dimensionText = document.getElementById('dimension-value');

function userInputHandler() {
  clearGridContainer();
  let userInputValue = userInput.value;
  dimensionText.textContent = userInputValue;
  addBlocks(userInputValue);
}

userInput.addEventListener('input', userInputHandler);