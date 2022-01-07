let gridSize = 16;

const createGrid = () => {
  const content = document.querySelector(".content");
  while (content.firstChild) {
    content.firstChild.remove();
  }
  for (let i = 1; i <= gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add(`row${i}`);
    row.id = "row";
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
  controls.appendChild(clearButton);

  const gridSizeSlider = document.createElement("input");
  gridSizeSlider.classList.add("slider");
  gridSizeSlider.type = "range";
  gridSizeSlider.min = "16";
  gridSizeSlider.max = "100";
  gridSizeSlider.value = "16";
  gridSizeSlider.addEventListener("change", () => {
    sliderEventListener();
  });
  controls.appendChild(gridSizeSlider);
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
  e.target.style.backgroundColor = "black";
};

createGrid();
createControls();
