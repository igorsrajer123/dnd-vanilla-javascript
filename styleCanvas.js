const styleCanvas = (image) => {
  canvas.width = image.width;
  canvas.height = image.height;
};

const styleCanvasWrapper = (image) => {
  const canvasWrapper = document.getElementById("canvas-container");
  canvasWrapper.style.width = `${image.width}px`;
  canvasWrapper.style.height = `${image.height}px`;
};
