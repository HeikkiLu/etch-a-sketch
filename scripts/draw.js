let gridSize = 16;
let rgb = false;
let opacityMode = false;
let erase = false;

const sliderValue = document.querySelector(".sliderValue");
const slider = document.querySelector(".slider");
const rgbButton = document.querySelector(".rgb");
const grayscaleButton = document.querySelector(".grayscale");
const eraseButton = document.querySelector(".erase");
const clearButton = document.querySelector(".clear");
const content = document.querySelector(".palette");

const createGrid = () => {
  while (content.firstChild) {
    content.firstChild.remove();
  }

  content.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  content.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.id = "square";
    square.addEventListener("mouseover", (e) => {
      draw(e);
    });
    content.appendChild(square);
  }
};

const controlsEventListeners = () => {
  clearButton.addEventListener("click", () => {
    clearGrid();
  });

  rgbButton.addEventListener("click", () => {
    rgb = !rgb;
    opacityMode = false;
    erase = false;
    buttonActive();
  });

  grayscaleButton.addEventListener("click", () => {
    opacityMode = !opacityMode;
    rgb = false;
    erase = false;
    buttonActive();
  });

  eraseButton.addEventListener("click", () => {
    erase = !erase;
    rgb = false;
    opacityMode = false;
    buttonActive();
  });

  sliderValue.textContent = `Grid size: ${slider.value}x${slider.value}`;
  slider.addEventListener("change", () => {
    sliderEventListener();
    sliderValue.textContent = `Grid size: ${slider.value}x${slider.value}`;
  });
};

const sliderEventListener = () => {
  const slider = document.querySelector(".slider");
  gridSize = slider.value;
  clearGrid();
  createGrid();
};

const clearGrid = () => {
  const squares = document.querySelectorAll("#square");
  squares.forEach((square) => {
    square.style.backgroundColor = "#fff";
  });
};

const draw = (e) => {
  if (erase && !rgb && !opacityMode) {
    e.target.style.backgroundColor = "#fff";
  } else if (rgb && !opacityMode && !erase) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(
      ${r},${g},${b}
    )`;
  } else if (opacityMode && !rgb && !erase) {
    if (e.target.style.backgroundColor.match(/rgba/)) {
      let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
      if (currentOpacity <= 0.9) {
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${
          currentOpacity + 0.1
        })`;
      }
    } else if (e.target.style.backgroundColor == "rgb(0, 0, 0)") {
      return;
    } else {
      e.target.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
    }
  } else {
    e.target.style.backgroundColor = "black";
  }
};

const buttonActive = () => {
  rgb ? (rgbButton.id = "active") : (rgbButton.id = null);
  opacityMode ? (grayscaleButton.id = "active") : (grayscaleButton.id = null);
  erase ? (eraseButton.id = "active") : (eraseButton.id = null);
};

controlsEventListeners();
createGrid();
