function setCatID(id) {
  localStorage.setItem('catID', id);
  window.location = 'products.html';
}

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

export default function addEvents(elementsArray, type) {
  const IsArray = elementsArray instanceof Array;
  const array = IsArray ? elementsArray : Array.from(elementsArray);

  array.forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();

      if (type.category) {
        setCatID(item.id);
      }

      if (type.product) {
        setProductID(item.id);
      }
    }),
  );
}
