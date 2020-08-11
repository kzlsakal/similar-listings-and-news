const createMockElement = (tag) => {
  const newElement = document.createElement(tag);
  newElement.animate = () => {};
  newElement.cloneNode = function () {
    return createMockElement(this.tagName);
  };
  return newElement;
};


module.exports = createMockElement;
