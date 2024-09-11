function setCatID(id) {
  localStorage.setItem('catID', id);
  window.location = 'products.html';
}

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

export default function addEvents(elementsArray, type) {
  // const isNodeList = NodeList.prototype.isPrototypeOf(elementsArray);
  // const arr = isNodeList ? Array.from(elementsArray) : elementsArray;

  const arr = Array.from(elementsArray);

  arr.forEach((item) =>
    document.addEventListener('click', function () {
      if (type.category) {
        setCatID(item.id);
      }

      if (type.product) {
        setProductID(item.id);
      }
    }),
  );
}
