import getJSONData from './utils/getJSONData.js';
import addEvents from './utils/addEvents.js';

const contenedorProductos = document.getElementById('products');

document.addEventListener('DOMContentLoaded', async function () {
  const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
  const { data } = await getJSONData(URL);

  showProducts(data);

  let productElements =
    contenedorProductos.querySelectorAll('.list-group-item');
  addEvents(productElements, { product: true });
});

function showProducts(data) {
  const { products } = data;
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
