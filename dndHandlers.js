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
  translateMoveTargetElement(
    event.target,
    element.lastValidX,
    element.lastValidY
  );
  setMoveTargetColor(event.target, "green");
  event.target.style.transition = "0.2s";

  setMoveTargetXY(event.target, element.lastValidX, element.lastValidY);
};

const handleItemMove = (event, element, restirctedCoords) => {
  const x = (getMoveTargetXY(event.target).x || 0) + event.dx;
  const y = (getMoveTargetXY(event.target).y || 0) + event.dy;

  event.target.style.transform = "translate(" + x + "px, " + y + "px)";
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

const updateRestrictedCoordinates = (element, coordinate, event) => {
  for (coordinate of restirctedCoords) {
    if (coordinate.id === element.id) {
      coordinate.x = getMoveTargetXY(event.target).x;
      coordinate.y = getMoveTargetXY(event.target).y;
      break;
    }
  }
};

const handleItemDrop = (event, element, restirctedCoords) => {
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
