// Select DOM elements
const mainBtn = document.getElementById('main-btn');
const numColumnsInput = document.getElementById('num-columns');
const colorColumns = document.getElementById('color-columns');

// Define color variables
let colors = [];

// Generate random color
function generateColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

// Convert RGB to hex
function rgbToHex(color) {
  return '#' + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

// Copy text to clipboard
function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

// Generate initial random colors for the columns
function generateInitialColors(numColumns) {
  colors = [];
  for (let i = 0; i < numColumns; i++) {
    colors.push(generateColor());
  }
  updateColorColumns();
}

// Update the color columns with the current colors array
function updateColorColumns() {
  colorColumns.innerHTML = '';
  colors.forEach((color, index) => {
    const colorColumn = document.createElement('div');
    colorColumn.classList.add('color-column');

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    colorBox.addEventListener('click', () => {
      copyToClipboard(rgbToHex(color));
    });
    colorColumn.appendChild(colorBox);

    const hexCode = document.createElement('p');
    hexCode.classList.add('hex-code');
    hexCode.innerText = rgbToHex(color);
    hexCode.addEventListener('click', () => {
      copyToClipboard(rgbToHex(color));
    });
    colorColumn.appendChild(hexCode);

    const rgbCode = document.createElement('p');
    rgbCode.classList.add('rgb-code');
    rgbCode.innerText = `rgb(${color.r}, ${color.g}, ${color.b})`;
    rgbCode.addEventListener('click', () => {
      copyToClipboard(`rgb(${color.r}, ${color.g}, ${color.b})`);
    });
    colorColumn.appendChild(rgbCode);

    const generateBtn = document.createElement('button');
    generateBtn.classList.add('generate-color-btn');
    generateBtn.innerText = 'Generate Color';
    generateBtn.addEventListener('click', () => {
      colors[index] = generateColor();
      updateColorColumns();
    });
    colorColumn.appendChild(generateBtn);


    colorColumns.appendChild(colorColumn);
  });
}

// Add click event listener to the main button
mainBtn.addEventListener('click', () => {
  const numColumns = parseInt(numColumnsInput.value);
  if (numColumns > 0) {
    generateInitialColors(numColumns);
  }
});

// Generate initial random colors on page load
generateInitialColors(5);