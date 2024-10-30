import getJSONData from './utils/getJSONData.js';
import addEvents from './utils/addEvents.js';
import { sortList, options } from './utils/sortList.js';
import { PRODUCTS_URL, EXT_TYPE } from './constants/API.js';

let data = [];

let {
  ORDER_ASC_BY_PRICE,
  ORDER_DESC_BY_PRICE,
  ORDER_BY_PROD_COUNT,
  ORDER_BY_RANGE,
  FILTER,
  minCount,
  maxCount,
} = options;

const contenedorProductos = document.getElementById('products');
const searchInput = document.querySelector('#searchProduct');

function showProducts(data) {
  const IsArray = data instanceof Array;
  let products = '';
  if (IsArray) {
    products = data;
  } else {
    products = data.products;
  }

  products.forEach((product) => {
    // Crear el elemento del producto
    const articulo = document.createElement('article');

    articulo.innerHTML = `
    <div id=${product.id} class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        <div class="col-md-4">
          <img
            src="${product.image}"
            alt="${product.description}"
            class="img-thumbnail"
          />
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${product.name}</h4>
            <small class="text-muted">${product.soldCount} artículos</small>
          </div>
          <p class="mb-1">${product.description}</p>
          <p class="text-end fs-5">USD ${product.cost}</p>
        </div>
      </div>
    </div>
    `;

    
    // Añadir el producto al contenedor
    contenedorProductos.appendChild(articulo);
  });
}

function deleteDOMElements(className) {
  const IsArray = className instanceof Array;
  const array = IsArray ? className : Array.from(className);
  array.forEach((item) => {
    if (!(item instanceof HTMLElement)) return;
    item.remove();
  });
}
// Filtro de gabi
document.addEventListener('DOMContentLoaded', async function () {
  const catID = localStorage.getItem('catID');
  const jsonData = await getJSONData(PRODUCTS_URL + catID + EXT_TYPE);
  data = jsonData.data;

  showProducts(data);
  const productElements =
    contenedorProductos.querySelectorAll('.list-group-item');
  addEvents(productElements, { product: true });

  document.getElementById('sortAsc').addEventListener('click', function () {
    let sortedArray = sortList(ORDER_ASC_BY_PRICE, data.products);
    const productsElements = document.querySelectorAll('.list-group-item');
    deleteDOMElements(productsElements);
    showProducts(sortedArray);
    addEvents(document.querySelectorAll('.list-group-item'), { product: true });
  });

  document.getElementById('sortDesc').addEventListener('click', function () {
    const productsElements = document.querySelectorAll('.list-group-item');
    deleteDOMElements(productsElements);
    const sortedArray = sortList(ORDER_DESC_BY_PRICE, data.products);
    showProducts(sortedArray);
    addEvents(document.querySelectorAll('.list-group-item'), { product: true });
  });

  document.getElementById('sortByCount').addEventListener('click', function () {
    const productsElements = document.querySelectorAll('.list-group-item');
    deleteDOMElements(productsElements);
    const sortedArray = sortList(ORDER_BY_PROD_COUNT, data.products);
    showProducts(sortedArray);
    addEvents(document.querySelectorAll('.list-group-item'), { product: true });
  });

  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';

      minCount = undefined;
      maxCount = undefined;

      const productsElements = document.querySelectorAll('.list-group-item');
      deleteDOMElements(productsElements);
      showProducts(data);
      searchInput.value = '';
    });

  document
    .getElementById('rangeFilterCount')
    .addEventListener('click', function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById('rangeFilterCountMin').value;
      maxCount = document.getElementById('rangeFilterCountMax').value;

      if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = 0;
      }

      if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = 0;
      }

      const rangeObj = { from: minCount, to: maxCount };

      const productsElements = document.querySelectorAll('.list-group-item');
      deleteDOMElements(productsElements);
      const sortedArray = sortList(ORDER_BY_RANGE, data.products, {
        range: rangeObj,
      });
      showProducts(sortedArray);
      addEvents(document.querySelectorAll('.list-group-item'), {
        product: true,
      });
    });

  searchInput.addEventListener('input', (e) => {
    const { value } = e.target;
    const productsElements = document.querySelectorAll('.list-group-item');
    deleteDOMElements(productsElements);
    const filteredList = sortList(FILTER, data.products, { search: value });
    showProducts(filteredList);
  });
});
