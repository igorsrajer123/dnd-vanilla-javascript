const createDragElement = () => {
  const dragElement = document.createElement("div");
  dragElement.classList.add("drag-element");
  dragElement.style.backgroundColor = "green";
  dragElement.style.position = "absolute";
  dragElement.style.top = "20px";
  dragElement.style.left = "20px";
  dragElement.style.width = "50px";
  dragElement.style.height = "50px";
  return dragElement;
};
