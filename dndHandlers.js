const handleItemMove = (event) => {
  const x = (parseFloat(event.target.getAttribute("data-x")) || 0) + event.dx;
  const y = (parseFloat(event.target.getAttribute("data-y")) || 0) + event.dy;
  event.target.style.transform = "translate(" + x + "px, " + y + "px)";
  event.target.style.transition = "0s";
  event.target.setAttribute("data-x", x);
  event.target.setAttribute("data-y", y);

  if (isInsideRestrictedArea(event.target, canvas)) {
    event.target.style.backgroundColor = "red";
  } else {
    event.target.style.backgroundColor = "green";
  }
};

const handleItemDrop = (event, element) => {
  if (isInsideRestrictedArea(event.target, canvas)) {
    event.target.style.transform =
      "translate(" + element.lastValidX + "px, " + element.lastValidY + "px)";
    event.target.setAttribute("data-x", element.lastValidX);
    event.target.setAttribute("data-y", element.lastValidY);
    event.target.style.backgroundColor = "green";
    event.target.style.transition = "0.2s";
  } else {
    element.lastValidX = event.target.getAttribute("data-x");
    element.lastValidY = event.target.getAttribute("data-y");
  }
};
