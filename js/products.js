document.addEventListener("DOMContentLoaded", function () {
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const contenedorProductos = document.getElementById("products");

      //
      const productos = data.products;

      productos.forEach((product) => {
        // Crear el elemento del producto
        const articulo = document.createElement("article");
        articulo.classList.add("product");

        // Rellenar el HTML del producto
        articulo.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="precio">${product.cost} ${product.currency}</p>
            <p class="cantidad-vendidos">Vendidos: ${product.soldCount}</p>
            <button>Comprar</button>
                `;

        // Añadir el producto al contenedor
        contenedorProductos.appendChild(articulo);
      });
    })

    // Pop Up de error
    .catch((error) => {
      alert("Error al cargar los productos:", error);
    });
});
