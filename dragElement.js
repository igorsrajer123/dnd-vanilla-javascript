const cloneDragElement = (event, canvasRect) => {
  var dragClone = event.relatedTarget.cloneNode(true);
  dragClone.id = crypto.randomUUID();
  dragClone.style.backgroundColor = event.relatedTarget.backgroundColor;
  dragClone.style.position = "absolute";
  dragClone.style.width = event.relatedTarget.width;
  dragClone.style.height = event.relatedTarget.height;
  dragClone.style.top =
    event.dragEvent.client.y -
    canvasRect.top -
    event.relatedTarget.clientHeight / 2 +
    "px";
  dragClone.style.left =
    event.dragEvent.client.x -
    canvasRect.left -
    event.relatedTarget.clientWidth / 2 +
    "px";

  // const dragElement = document.createElement("div");
  // dragElement.classList.add("drag-element");
  // dragElement.id = elementId;
  // dragElement.style.zIndex = 0;
  // dragElement.style.backgroundColor = "green";
  // dragElement.style.position = "absolute";
  // dragElement.style.top = "20px";
  // dragElement.style.left = "20px";
  // dragElement.style.width = "50px";
  // dragElement.style.height = "50px";
  return dragClone;
};
