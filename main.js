const body = document.querySelector('body');
const container = document.querySelector('.container');
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

  if (random) {
    let color = getColor();
    e.target.style.setProperty("background-color", color);
    } else if (eraser) {
      e.target.style.setProperty("background-color", 'white');
    } else { e.target.style.setProperty("background-color", 'black') }
}));
}

// clear button + prompt for grid dimension //
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearGrid);

function clearGridContainer() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
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
  random = false;
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
}

const randomButton = document.getElementById('random-button');
randomButton.addEventListener('click', toggleRandom);

// black trace handler //
const blackButton = document.getElementById('black-button');
blackButton.addEventListener('click', toggleBlack);

function toggleBlack() {
  random = false;
  eraser = false;
}

// eraser handler //
const eraserButton = document.getElementById('eraser-button');
let eraser = false;
eraserButton.addEventListener('click', toggleEraser);

function toggleEraser() {
  eraser = true;
}