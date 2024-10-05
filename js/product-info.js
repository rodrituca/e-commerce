import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL } from './constants/API.js';

// Fetch para el carrusel
document.addEventListener('DOMContentLoaded', async function () {
  const productID = localStorage.getItem('productID');
  const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
  const { data } = dataJSON;

  const productNameHTMLElement = document.querySelector('#productName');
  const productCountHTMLElement = document.querySelector('#productCount');
  const productCategoryHTMLElement = document.querySelector('#productCategory');
  const productImageContainerHTMLElement = document.querySelector('#productImageContainer');
  const productDescriptionHTMLElement = document.querySelector('#productDescription');
  const productCurrencyHTMLElement = document.querySelector('#productCurrency');
  const productCostHTMLElement = document.querySelector('#productCost');

  const carouselObject = {
    name: productNameHTMLElement,
    soldCount: productCountHTMLElement,
    category: productCategoryHTMLElement,
    images: productImageContainerHTMLElement,
    description: productDescriptionHTMLElement,
    currency: productCurrencyHTMLElement,
    cost: productCostHTMLElement,
  };

  for (const item in data) {
    if (carouselObject[item]) {
      if (data[item] instanceof Array) {
        const array = data[item];
        array.forEach((arrayItem, index) => {
          const div = document.createElement('div');
          div.className = index === 0 ? 'carousel-item active' : 'carousel-item';
          const img = document.createElement('img');
          img.src = arrayItem;
          img.className = 'd-block w-100';
          div.appendChild(img);
          productImageContainerHTMLElement.appendChild(div);
        });
        continue;
      }
      carouselObject[item] = carouselObject[item].innerHTML += data[item];
    }
  }

  // Mostrar los comentarios
  const dataComments = await getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE);
  const { data: comments } = dataComments;

  function mostrarComentarios(comentarios) {
    const contenedor = document.getElementById("commentsBox");
    contenedor.innerHTML = '';

    comentarios.forEach(comentario => {
      const divComentario = document.createElement('div');
      divComentario.classList.add('comentario', 'container');
      divComentario.innerHTML = `<div class="card-body">
                               <h5 class="card-title">${comentario.user}</h5>
                               <h6 class="card-subtitle mb-2 text-muted">${comentario.dateTime}</h6>
                               <p class="card-text">${comentario.description}</p>
                               <div class="card-footer">Puntuación: ${obtenerEstrellas(comentario.score)}</div>
                               </div>`;
      contenedor.appendChild(divComentario);
    });

    // Agregar el comentario a la lista de calificaciones
    const botonEnv = document.getElementById('btnEnv');
    botonEnv.addEventListener("click", function () {
      const comentarioTexto = document.getElementById('comentario').value;
      const score = 5; // Acá después ponemos el score correspondiente a las estrellitas (todavía no sabemos como hacerlo)

      const comentarioNuevo = document.createElement("div");
      comentarioNuevo.classList.add('comentario', 'container');
      comentarioNuevo.innerHTML = `<div class="card-body">
                                 <h5 class="card-title">${localStorage.userName}</h5>
                                 <h6 class="card-subtitle mb-2 text-muted">${fechaHora}</h6>
                                 <p class="card-text">${comentarioTexto}</p>
                                 <div class="card-footer">Puntuación: ${obtenerEstrellas(score)}</div>
                                 </div>`;

      contenedor.appendChild(comentarioNuevo);
      document.getElementById('comentario').value = '';
    });
  }

  mostrarComentarios(comments);

  // Sistema de calificación con Estrellitas
  document.querySelectorAll('.rating span').forEach((star, index) => {
    star.addEventListener('click', () => {
      document.querySelectorAll('.rating span').forEach((s, i) => {
        s.classList.toggle('checked', i <= index);
      });
    });
  });

  // Obtener estrellitas de calificaciones
  function obtenerEstrellas(calificacion) {
    let estrellas = "";
    let stars = Math.round(calificacion);
    for (let i = 0; i < stars; i++) {
      estrellas += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = stars; i < 5; i++) {
      estrellas += `<span class="fa fa-star"></span>`;
    }
    return estrellas;
  }

// Sección productos relacionados

// Obtengo el ID del producto desde el localStorage
localStorage.getItem('productID');

const productURL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

// Fetch
fetch(productURL)
  .then(response => {
    return response.json();
  })
  .then(productData => {
    console.log('Producto:', productData);

    const relatedProducts = productData.relatedProducts;

    // Tarjetas del HTML
    const cards = [
      document.getElementById("relatedProducts1"),
      document.getElementById("relatedProducts2"),
      document.getElementById("relatedProducts3"),
    ];

    // Mostrar 3 productos o menos
    const numProductsToShow = Math.min(relatedProducts.length, cards.length);

    // Itera sobre los productos relacionados y actualiza las tarjetas
    for (let i = 0; i < numProductsToShow; i++) {
      const producto = relatedProducts[i];
      const card = cards[i]; 

      //Imagen del producto
      const imagen = card.querySelector("img"); 
      //Nombre del producto
      const nombre = card.querySelector("h3"); 
      //Descripción del producto
      const descripcion = card.querySelector(".card-text"); 

        // Asignamos la imagen, nombre y descripción al HTML
        imagen.src = producto.image; 
        imagen.alt = `Imagen de ${producto.name}`; 
        nombre.textContent = producto.name; 
        descripcion.textContent = producto.description;
      }
    }
  )
  .catch(error => {
    console.error('Error:', error);
  });

document.addEventListener('DOMContentLoaded', async function () {
});
});