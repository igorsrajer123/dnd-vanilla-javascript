const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./second-test.png";
image.onload = () => {
  styleCanvas(image);
  styleCanvasWrapper(image);
  ctx.drawImage(image, 0, 0, image.width, image.height);
};

let restirctedCoords = [
  { id: 1, x: 0, y: 0 },
  { id: 2, x: 20, y: 20 },
];

[
  {
    id: 1,
    html: createDragElement(1),
    lastValidX: 0,
    lastValidY: 0,
    currentX: 0,
    currentY: 0,
  },
  {
    id: 2,
    html: createDragElement(2),
    lastValidX: 20,
    lastValidY: 20,
    currentX: 20,
    currentY: 20,
  },
].forEach((element) => {
  document.getElementById("canvas-container").appendChild(element.html);
  interact(element.html).draggable({
    restrict: {
      restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
    onmove: (event) => handleItemMove(event, element, restirctedCoords),
    onend: (event) => handleItemDrop(event, element, restirctedCoords),
  });
});
