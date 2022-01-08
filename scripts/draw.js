let gridSize = 16;
let rgb = false;

const createGrid = () => {
  const content = document.querySelector(".palette");
  while (content.firstChild) {
    content.firstChild.remove();
  }
  for (let i = 1; i <= gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add(`column${i}`);
    row.id = "column";
    for (let j = 1; j < gridSize; j++) {
      const square = document.createElement("div");
      square.classList.add(`square${j}`);
      square.id = "square";
      square.addEventListener("mouseover", (e) => {
        draw(e);
      });
      row.appendChild(square);
    }
    content.appendChild(row);
  }
};

const createControls = () => {
  const controls = document.querySelector(".controls");

  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear";
  clearButton.addEventListener("click", () => {
    clearGrid();
  });

  const rgbButton = document.createElement("button");
  rgbButton.textContent = "RGB";
  rgbButton.addEventListener("click", () => {
    rgb = !rgb;
  });

  const gridSizeSlider = document.createElement("input");
  const sliderValue = document.createElement("p");
  sliderValue.classList.add("sliderValue");
  gridSizeSlider.classList.add("slider");
  gridSizeSlider.type = "range";
  gridSizeSlider.min = "16";
  gridSizeSlider.max = "64";
  gridSizeSlider.value = "16";
  sliderValue.textContent = `Grid size: ${gridSizeSlider.value}x${gridSizeSlider.value}`;
  gridSizeSlider.addEventListener("change", () => {
    sliderEventListener();
    sliderValue.textContent = `Grid size: ${gridSizeSlider.value}x${gridSizeSlider.value}`;
  });
  controls.appendChild(sliderValue);
  controls.appendChild(gridSizeSlider);
  controls.appendChild(rgbButton);
  controls.appendChild(clearButton);
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
    square.style.backgroundColor = "white";
  });
};

const draw = (e) => {
  if (!rgb) {
    e.target.style.backgroundColor = "black";
  } else {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(
      ${r},${g},${b}
    )`;
  }
};

createControls();
createGrid();
