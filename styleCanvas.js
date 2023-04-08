const styleCanvas = (image) => {
  canvas.width = image.width;
  canvas.height = image.height;
};

const styleCanvasWrapper = (image) => {
  const canvasWrapper = document.getElementById("canvas-container");
  canvasWrapper.style.width = `${image.width}px`;
  canvasWrapper.style.height = `${image.height}px`;
};

const setMoveTargetColor = (target, color) => {
  switch (color) {
    case "red":
      target.style.backgroundColor = "red";
      break;
    case "green":
      target.style.backgroundColor = "green";
      break;
    default:
      target.style.backgroundColor = "black";
  }
};

const translateMoveTarget = (target, x, y) => {
  target.style.transform = "translate(" + x + "px, " + y + "px)";
};
