const getMoveTargetXY = (target) => {
  return {
    x: parseFloat(target.getAttribute("data-x")),
    y: parseFloat(target.getAttribute("data-y")),
  };
};

const setMoveTargetXY = (target, x, y) => {
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
};

const returnToValidPosition = (event, element) => {
  translateMoveTarget(event.target, element.lastValidX, element.lastValidY);
  setMoveTargetColor(event.target, "green");
  event.target.style.transition = "0.2s";

  setMoveTargetXY(event.target, element.lastValidX, element.lastValidY);
};

const updateRestrictedCoordinates = (element, coordinate, event) => {
  for (coordinate of restirctedCoords) {
    if (coordinate.id === element.id) {
      coordinate.x = getMoveTargetXY(event.target).x;
      coordinate.y = getMoveTargetXY(event.target).y;
      break;
    }
  }
};

const handleItemMove = (event, element, restirctedCoords) => {
  const x = (getMoveTargetXY(event.target).x || 0) + event.dx;
  const y = (getMoveTargetXY(event.target).y || 0) + event.dy;

  translateMoveTarget(event.target, x, y);
  event.target.style.transition = "0s";

  setMoveTargetXY(event.target, x, y);

  if (isInsideRestrictedArea(event.target, canvas)) {
    setMoveTargetColor(event.target, "red");
  } else {
    restirctedCoords.forEach((coord) => {
      if (coord.id !== element.id) {
        if (isColliding(getMoveTargetXY(event.target), coord)) {
          setMoveTargetColor(event.target, "red");
        } else {
          setMoveTargetColor(event.target, "green");
        }
      }
    });
  }
};

const handleDropNewElement = (event) => {
  console.log("NOVI");
  let clone = cloneDragElement(
    event,
    interact.getElementRect(draggableContainer)
  );

  draggableContainer.appendChild(clone);

  restirctedCoords = [...restirctedCoords, { id: clone.id, x: 0, y: 0 }];

  copiedElements = [
    ...copiedElements,
    {
      id: clone.id,
      html: clone,
      lastValidX: 0,
      lastValidY: 0,
    },
  ];

  addDraggableElements({
    id: clone.id,
    html: clone,
    lastValidX: 0,
    lastValidY: 0,
  });
};

const handleDropExistingElement = (event, element, restirctedCoords) => {
  console.log("STARI");
  if (isInsideRestrictedArea(event.target, canvas)) {
    returnToValidPosition(event, element);
  } else {
    restirctedCoords.forEach((coord) => {
      if (coord.id !== element.id) {
        if (isColliding(getMoveTargetXY(event.target), coord)) {
          returnToValidPosition(event, element);
        } else {
          element.lastValidX = getMoveTargetXY(event.target).x;
          element.lastValidY = getMoveTargetXY(event.target).y;
          updateRestrictedCoordinates(element, coord, event);
        }
      }
    });
  }
};
