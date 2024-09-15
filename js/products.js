import getJSONData from './utils/getJSONData.js';
import addEvents from './utils/addEvents.js';
import { sortCategories, options} from './utils/sortList.js';

let {
  ORDER_ASC_BY_NAME,
  ORDER_BY_PROD_COUNT,
  ORDER_DESC_BY_NAME,
  currentCategoriesArray,
  minCount,
  maxCount,
  currentSortCriteria, 
  
} = options

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
  let products = "";
  if (IsArray) {
    products = data
  } else {
  products = data.products;
  }

  products.forEach((product) => {
    // Crea el elemento del producto
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
showProducts(sortedArray)
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

    showProducts(data);
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

    showProducts(data);
  });

});
}

//BUSCADOR
let productos = [];
const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const contenedorProducts = document.getElementById('products');
const buscador = document.getElementById('buscador');

function mostrarProductos(productos){
  contenedorProductos.innerHTML = ''
  productos.forEach(producto => {
    // Crear el elemento del producto completo
    const articulo = document.createElement('article');
    articulo.innerHTML = `
      <div id=${producto.id} class="list-group-item list-group-item-action cursor-active">
        <div class="row">
          <div class="col-md-4">
            <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail" />
          </div>
          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">${producto.name}</h4>
              <small class="text-muted">${producto.soldCount} artículos vendidos</small>
            </div>
            <p class="mb-1">${producto.description}</p>
            <p class="text-end fs-5">USD ${producto.cost}</p>
          </div>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(articulo); // Añadir el artículo al contenedor de productos
  });
}
;

function filtrarProductos(textoBusqueda){
  const productosFiltrados = productos.filter(producto =>
    producto.name.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
    producto.description.toLowerCase().includes(textoBusqueda.toLowerCase())
  );
  mostrarProductos(productosFiltrados);
}

async function obtenerProductos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    productos = data.products; 
    
    // Mostrar todos los productos al cargar
    mostrarProductos(productos);

    // Filtrar productos en tiempo real
    buscador.addEventListener('input', function () {
      filtrarProductos(buscador.value); // Filtrar cada vez que el usuario escribe
    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

// Llamar a la función para obtener los productos cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerProductos);