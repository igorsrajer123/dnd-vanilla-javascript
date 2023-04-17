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
    onstart: (event) => {
      const originalRect = event.target.getBoundingClientRect();
      const clone = event.target.cloneNode(true);

      // Create a placeholder element
      const placeholder = document.createElement("div");
      placeholder.style.width = originalRect.width + "px";
      placeholder.style.height = originalRect.height + "px";

      // Insert the placeholder before the original element
      event.target.parentNode.insertBefore(placeholder, event.target);

      clone.style.position = "absolute";
      clone.style.top = originalRect.top + "px";
      clone.style.left = originalRect.left + "px";
      document.body.appendChild(clone);

      // Add draggable event listeners to the new cloned element
      interact(clone).draggable(event.interactable.options.draggable);

      // Set the clone as the current target of the drag event
      event.interactable.target = clone;
      // Set the clone's initial position to the same as the original element
      clone.setAttribute("data-x", 0);
      clone.setAttribute("data-y", 0);

      // Add the placeholder to the event so that it can be removed later
      event.placeholder = placeholder;
      console.log(document.querySelectorAll(".elements > div"));
    },
    onmove: (event) => {
      // Get the current element being dragged (the clone)
      const currentElement = event.target;
      if (!currentElement.id.includes("random"))
        currentElement.id = currentElement.id + "-random";
      // Get the x and y coordinates of the drag event
      const x =
        (parseFloat(currentElement.getAttribute("data-x")) || 0) + event.dx;
      const y =
        (parseFloat(currentElement.getAttribute("data-y")) || 0) + event.dy;
      // Translate the clone to the new position
      currentElement.style.transform = `translate(${x}px, ${y}px)`;
      // Get the original element (the one that was cloned)
      // Update the clone's data-x and data-y attributes with the new position
      currentElement.setAttribute("data-x", x);
      currentElement.setAttribute("data-y", y);
    },
    onend: (event) => {
      if (event.target.id.includes("random")) {
        event.target.style.transform = "";

        // Remove the data-x and data-y attributes from the cloned element
        event.target.removeAttribute("data-x");
        event.target.removeAttribute("data-y");
        event.target.remove();

        // Remove the placeholder element
        event.placeholder.remove();
      }
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
