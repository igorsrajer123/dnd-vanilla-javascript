const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const draggableContainer = document.getElementById("canvas-container");

const elements = document.querySelectorAll(".elements > div");

const image = new Image();
image.src = "./second-test.png";
image.onload = () => {
  styleCanvas(image);
  styleCanvasWrapper(image);
  ctx.drawImage(image, 0, 0, image.width, image.height);
};

let restirctedCoords = [];
let copiedElements = [];

elements.forEach((element) => {
  interact(element).draggable({
    onstart: function (event) {
      const clonedElement = event.target.cloneNode(true);
      event.target.clonedElement = clonedElement;

      const containerRect = draggableContainer.getBoundingClientRect();

      const initialX =
        event.clientX0 - containerRect.left - event.rect.width / 2;
      const initialY =
        event.clientY0 -
        containerRect.top -
        containerRect.width / 3 -
        event.rect.height / 2;

      clonedElement.style.position = "absolute";
      clonedElement.style.pointerEvents = "none";
      clonedElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
      clonedElement.setAttribute("data-x", initialX);
      clonedElement.setAttribute("data-y", initialY);

      draggableContainer.appendChild(clonedElement);
    },
    onmove: function (event) {
      const clonedElement = event.target.clonedElement;

      const x =
        (parseFloat(clonedElement.getAttribute("data-x")) || 0) + event.dx;
      const y =
        (parseFloat(clonedElement.getAttribute("data-y")) || 0) + event.dy;

      clonedElement.style.transform = `translate(${x}px, ${y}px)`;

      clonedElement.setAttribute("data-x", x);
      clonedElement.setAttribute("data-y", y);
    },
    onend: function (event) {
      draggableContainer.removeChild(event.target.clonedElement);
      delete event.target.clonedElement;
      delete event.target.initialClientX;
      delete event.target.initialClientY;
    },
  });
});

interact(draggableContainer).dropzone({
  ondrop: (event) => {
    if (event.relatedTarget.id.includes("element-")) {
      handleDropNewElement(event);
    }
  },
});

function addDraggableElements(element) {
  interact(element.html).draggable({
    restrict: {
      restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
    onmove: (event) => handleItemMove(event, element, restirctedCoords),
    onend: (event) =>
      handleDropExistingElement(event, element, restirctedCoords),
  });
}
