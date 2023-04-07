const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load the image
const image = new Image();
image.src = "./second-test.png";
image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.style.width = `${image.width}px`;
  canvasContainer.style.height = `${image.height}px`;
};

// Create the draggable element
const dragElement = createDragElement();
document.getElementById("canvas-container").appendChild(dragElement);

let lastValidX = 0;
let lastValidY = 0;

interact(dragElement).draggable({
  restrict: {
    restriction: "parent",
  },
  onstart: () => {
    lastValidX = parseFloat(dragElement.style.left) || 0;
    lastValidY = parseFloat(dragElement.style.top) || 0;
  },
  onmove: (event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.transform = "translate(" + x + "px, " + y + "px)";
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);

    if (isInsideRestrictedArea(target, canvas)) {
      target.style.backgroundColor = "red";
    } else {
      target.style.backgroundColor = "green";
    }
  },
  onend: (event) => {
    const target = event.target;

    if (isInsideRestrictedArea(target, canvas)) {
      target.style.transform =
        "translate(" + lastValidX + "px, " + lastValidY + "px)";
      target.setAttribute("data-x", lastValidX);
      target.setAttribute("data-y", lastValidY);
      target.style.backgroundColor = "red";
    } else {
      lastValidX = event.target.offsetLeft;
      lastValidY = event.target.offsetTop;
    }
  },
});

// Create the draggable element
function createDragElement() {
  const dragElement = document.createElement("div");
  dragElement.classList.add("drag-element");
  dragElement.style.backgroundColor = "green";
  dragElement.style.position = "absolute";
  dragElement.style.width = "50px";
  dragElement.style.height = "50px";
  dragElement.style.cursor = "pointer";
  dragElement.setAttribute("data-x", 0);
  dragElement.setAttribute("data-y", 0);
  return dragElement;
}

// Check if an element is inside a restricted area
function isInsideRestrictedArea(element, canvas) {
  const rect = element.getBoundingClientRect();
  const elementX = rect.left - canvas.getBoundingClientRect().left;
  const elementY = rect.top - canvas.getBoundingClientRect().top;
  const elementWidth = rect.width;
  const elementHeight = rect.height;

  const imageData = canvas
    .getContext("2d")
    .getImageData(elementX, elementY, elementWidth, elementHeight);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Check if the pixel is black (r=g=b=a=0)
    if (r === 0 && g === 0 && b === 0 && a === 255) {
      return true;
    }
  }

  return false;
}
