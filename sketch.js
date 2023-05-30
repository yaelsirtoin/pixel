let gridSize = 60;
let pixelSize = 18;
let grid = [];
let resetButton;
let colorButton;
let colorPicker;
let selectedColor;
let isDrawing = false;

function setup() {
  createCanvas(600, 600);
  initializeGrid();

  resetButton = createButton("Reset");
  resetButton.position(20, 20);
  resetButton.size(100, 40);
  resetButton.style("font-family", "Verdana");
  //resetButton.style("font-weight", "bold")
  resetButton.style("background-color", "#ffffff");
  resetButton.style("color", "#000000");
  resetButton.style("border-radius", "20px");
  resetButton.mousePressed(resetDrawing);

  colorButton = createButton("Select Color");
  colorButton.position(130, 20);
  colorButton.size(140, 40);
  colorButton.style("font-family", "Verdana");
  colorButton.style("background-color", "#ffffff");
  colorButton.style("color", "#000000");
  colorButton.style("border-radius", "20px");
  colorButton.mousePressed(openColorPicker);

  colorPicker = createInput();
  colorPicker.position(282, 20);
  colorPicker.size(40, 40);
  colorPicker.attribute("type", "color");
  colorPicker.style("border-radius", "10px");
  colorPicker.input(setSelectedColor);

  selectedColor = color(0);
}

function draw() {
  background(220);
  drawGrid();

  if (isDrawing) {
    let col = floor(mouseX / pixelSize);
    let row = floor(mouseY / pixelSize);

    if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
      let pixel = grid[row][col];
      pixel.color = selectedColor;
    }
  }
}

function drawGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let x = col * pixelSize + pixelSize / 2;
      let y = row * pixelSize + pixelSize / 2;
      let pixel = grid[row][col];
      fill(pixel.color);
      noStroke();
      circle(x, y, pixelSize);
    }
  }
}

function initializeGrid() {
  for (let row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      grid[row][col] = {
        color: color(255),
      };
    }
  }
}

function mousePressed() {
  isDrawing = true;
}

function mouseDragged() {
  if (isDrawing) {
    let col = floor(mouseX / pixelSize);
    let row = floor(mouseY / pixelSize);

    if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
      let pixel = grid[row][col];
      pixel.color = selectedColor;
    }
  }
}

function mouseReleased() {
  isDrawing = false;
}

function resetDrawing() {
  initializeGrid();
}

function openColorPicker() {
  colorPicker.elt.click();
}

function setSelectedColor() {
  let hexColor = colorPicker.value();
  selectedColor = color(hexColor);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveCanvas("drawing", "png");
  }
}
//write a code in p5.js for a 25 x 25 grid where it consists of pixels in the shape of a circle. You can draw on this grid by clicking and dragging the mouse. At the top of the screen there are buttons - one button that resets what we have drawn so far, and another button that opens an RGB color grid. By pressing the S key on the keyboard, the image is saved.
