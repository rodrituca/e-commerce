import getJSONData from './utils/getJSONData.js';
import addEvents from './utils/addEvents.js';
import { sortCategories, options } from './utils/sortList.js';

let {
  ORDER_ASC_BY_NAME,
  ORDER_BY_PROD_COUNT,
  ORDER_DESC_BY_NAME,
  currentCategoriesArray,
  minCount,
  maxCount,
  currentSortCriteria,
} = options;

const contenedorProductos = document.getElementById('products');

document.addEventListener('DOMContentLoaded', async function () {
  const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
  const { data } = await getJSONData(URL);

  showProducts(data);
  const productElements =
    contenedorProductos.querySelectorAll('.list-group-item');
  addEvents(productElements, { product: true });
});

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

    document.getElementById('sortAsc').addEventListener('click', function () {
      let sortedArray = sortCategories(ORDER_ASC_BY_NAME, data.products);
      showProducts(sortedArray);
    });

    document.getElementById('sortDesc').addEventListener('click', function () {
      sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document
      .getElementById('sortByCount')
      .addEventListener('click', function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
      });

    document
      .getElementById('clearRangeFilter')
      .addEventListener('click', function () {
        document.getElementById('rangeFilterCountMin').value = '';
        document.getElementById('rangeFilterCountMax').value = '';

        minCount = undefined;
        maxCount = undefined;

        showProducts(data);
      });

    document
      .getElementById('rangeFilterCount')
      .addEventListener('click', function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById('rangeFilterCountMin').value;
        maxCount = document.getElementById('rangeFilterCountMax').value;

        if (
          minCount != undefined &&
          minCount != '' &&
          parseInt(minCount) >= 0
        ) {
          minCount = parseInt(minCount);
        } else {
          minCount = undefined;
        }

        if (
          maxCount != undefined &&
          maxCount != '' &&
          parseInt(maxCount) >= 0
        ) {
          maxCount = parseInt(maxCount);
        } else {
          maxCount = undefined;
        }

        showProducts(data);
      });
  });
}
