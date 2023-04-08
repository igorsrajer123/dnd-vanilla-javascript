const isInsideRestrictedArea = (element, canvas) => {
  const rect = element.getBoundingClientRect();

  return isBlackPixel(
    canvas
      .getContext("2d")
      .getImageData(
        rect.left - canvas.getBoundingClientRect().left,
        rect.top - canvas.getBoundingClientRect().top,
        rect.width,
        rect.height
      ).data
  );
};

const isBlackPixel = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Check if the pixel is black (r=g=b=a=0)
    if (r !== 0 || g !== 0 || b !== 0 || a === 255) return true;
  }

  return false;
};

const isColliding = (dragElement, dropEelement) => {
  const HEIGHT_AND_WIDTH = 50;
  return (
    dragElement.x < dropEelement.x + HEIGHT_AND_WIDTH &&
    dragElement.x + HEIGHT_AND_WIDTH > dropEelement.x &&
    dragElement.y < dropEelement.y + HEIGHT_AND_WIDTH &&
    dragElement.y + HEIGHT_AND_WIDTH > dropEelement.y
  );
};
