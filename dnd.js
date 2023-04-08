const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./second-test.png";
image.onload = () => {
  styleCanvas(image);
  styleCanvasWrapper(image);
  ctx.drawImage(image, 0, 0, image.width, image.height);
};

[
  {
    html: createDragElement(),
    lastValidX: 0,
    lastValidY: 0,
  },
  {
    html: createDragElement(),
    lastValidX: 0,
    lastValidY: 0,
  },
].forEach((element) => {
  document.getElementById("canvas-container").appendChild(element.html);
  interact(element.html).draggable({
    restrict: {
      restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
    onmove: (event) => handleItemMove(event),
    onend: (event) => handleItemDrop(event, element),
  });
});
