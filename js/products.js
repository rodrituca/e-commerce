document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const contenedorProductos = document.getElementById('products');
      const productos = data.products;

      productos.forEach((product) => {
        // Crear el elemento del producto
        const articulo = document.createElement('article');

        // Rellenar el HTML del producto
        articulo.innerHTML = `
          <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
              <div class="col-3">
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
    })

    // Pop Up de error
    .catch((error) => {
      alert('Error al cargar los productos:', error);
    });
});
