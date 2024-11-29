//import { CATEGORIES_URL } from './app.js';
import getJSONData from './utils/getJSONData.js';
import addEvents from './utils/addEvents.js';
import { sortList, options } from './utils/sortList.js';
import showBadge from './init.js';
export const CATEGORIES_URL =  'http://localhost:3000/cats';
showBadge();

let {
  ORDER_ASC_BY_NAME,
  ORDER_BY_PROD_COUNT,
  ORDER_DESC_BY_NAME,
  currentCategoriesArray,
  minCount,
  maxCount,
  currentSortCriteria,
} = options;

function showCategoriesList() {
  let htmlContentToAppend = '';
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(category.productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.productCount) <= maxCount))
    ) {
      htmlContentToAppend += `
            <div id="${category.id}" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `;
    }

    document.getElementById('cat-list-container').innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortList(
    currentSortCriteria,
    currentCategoriesArray,
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function () {
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentCategoriesArray = resultObj.data;
      showCategoriesList();
      const categories = document.querySelectorAll('.list-group-item');
      addEvents(categories, { category: true });
      //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document.getElementById('sortAsc').addEventListener('click', function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById('sortDesc').addEventListener('click', function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById('sortByCount').addEventListener('click', function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
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
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList();
    });
});
