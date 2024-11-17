import getJSONData from './utils/getJSONData.js';
import showBadge from './init.js';
showBadge();

import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL} from './constants/API.js';

// Botón Switch
const switchButton = document.getElementById('BtnSwitch');

// Sirve para saber en qué modo se encuentra
const modoDiaNoche = localStorage.getItem('modo');

// Si el modo actual es noche, se aplica el modo oscuro
if (modoDiaNoche === 'noche') {
  document.body.classList.add('bg-dark', 'text-white');

  // Seleccionar todas las card-body y card-header
  const cardBodies = document.querySelectorAll('.card-body');
  cardBodies.forEach(function(cardBody) {
    cardBody.classList.add('bg-dark', 'text-white');
  });
  
  const cardHeaders = document.querySelectorAll('.card-header');
  cardHeaders.forEach(function(cardHeader) {
    cardHeader.classList.add('bg-dark', 'text-white');
  });
  
  // El botón queda activado
  switchButton.checked = true;
} else {
  // Si no, se aplica el modo claro (día)
  document.body.classList.add('bg-light', 'text-dark');
}

// Función para cambiar el modo día/noche
function cambiar() {
  const activado = switchButton.checked;
  const cardBodies = document.querySelectorAll('.card-body');
  const cardHeaders = document.querySelectorAll('.card-header');

  // Si está activado = modo oscuro
  if (activado) {
    // Cambiar el modo del body a oscuro
    document.body.classList.remove('bg-light', 'text-dark');
    document.body.classList.add('bg-dark', 'text-white');

    // Cambiar el estilo de todas las card-body
    cardBodies.forEach(function(cardBody) {
      cardBody.classList.remove('bg-light', 'text-dark');
      cardBody.classList.add('bg-dark', 'text-white');
    });

    // Cambiar el estilo de todas las card-header
    cardHeaders.forEach(function(cardHeader) {
      cardHeader.classList.remove('bg-light', 'text-dark');
      cardHeader.classList.add('bg-dark', 'text-white');
    });

    // Guardar el modo en el localStorage como 'noche'
    localStorage.setItem('modo', 'noche');

  // Si no está activado = modo claro
  } else {

    // Cambiar el modo del body a claro
    document.body.classList.remove('bg-dark', 'text-white');
    document.body.classList.add('bg-light', 'text-dark');

    // Cambiar el estilo de todas las card-body
    cardBodies.forEach(function(cardBody) {
      cardBody.classList.remove('bg-dark', 'text-white');
      cardBody.classList.add('bg-light', 'text-dark');
    });

    // Cambiar el estilo de todas las card-header
    cardHeaders.forEach(function(cardHeader) {
      cardHeader.classList.remove('bg-dark', 'text-white');
      cardHeader.classList.add('bg-light', 'text-dark');
    });

    // Guardar el modo en el localStorage como 'dia'
    localStorage.setItem('modo', 'dia');
  }
}

// Agregamos la función cambiar al evento 'change' del switchButton
switchButton.addEventListener('change', cambiar);



//Fetch para el carrusel
document.addEventListener('DOMContentLoaded', async function () {
  const productID = localStorage.getItem('productID');
  const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
  const { data } = dataJSON;

  const productNameHTMLElement = document.querySelector('#productName');
  const productCountHTMLElement = document.querySelector('#productCount');
  const productCategoryHTMLElement = document.querySelector('#productCategory');
  const productImageContainerHTMLElement = document.querySelector(
    '#productImageContainer',
  );
  const productDescriptionHTMLElement = document.querySelector(
    '#productDescription',
  );
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
    console.log(item);
    console.log(data[item]);
    if (carouselObject[item]) {
      if (data[item] instanceof Array) {
        const array = data[item];
        array.forEach((arrayItem, index) => {
          const div = document.createElement('div');
          div.className =
            index === 0 ? 'carousel-item active' : 'carousel-item';
          const img = document.createElement('img');
          img.src = arrayItem;
          img.className = 'd-block w-80 mx-auto img-fluid';
          div.appendChild(img);
          productImageContainerHTMLElement.appendChild(div);
        });

        continue;
      }
      carouselObject[item] = carouselObject[item].innerHTML += data[item];
    }
  }

//Mostrar los comentarios
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
  botonEnv.addEventListener("click", function() {
    const comentarioTexto = document.getElementById('comentario').value;
    const score = 5; // Acá después ponemos el score correspondiente a las estrellitas que enviamos (todavía no sabemos como hacerlo)

    const comentarioNuevo = document.createElement("div");
    comentarioNuevo.classList.add('comentario', 'container');
    comentarioNuevo.innerHTML = `<div class="card-body">
                                 <h5 class="card-title">${sessionStorage.user}</h5>
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


});})

//Boton de compra
const btnComprar = document.getElementById("btnComprar");
btnComprar.addEventListener("click", async () => {
    const productID = localStorage.getItem('productID');
    const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
    const { data } = dataJSON;

    // Crea un objeto del producto usando los datos obtenidos
    const newProduct = {
        id: data.id,
        name: data.name,
        price: data.cost,
        quantity: 1 };

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.id === productID);


    if (existingProductIndex > -1) {
        cartItems[existingProductIndex].quantity += 1;
    } else { cartItems.push(newProduct); }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = "cart.html";
});


// Obtener estrellitas de calificaciones
function obtenerEstrellas(calificacion){
  let estrellas = "";
  let stars = Math.round(calificacion);
  for(let i = 0; i < stars; i++){
      estrellas+=`<span class="fa fa-star checked"></span>`;
  }
  for(let i = stars; i < 5; i++){
      estrellas+=`<span class="fa fa-star"></span>`;
  }

  return estrellas;
}

// Constantes de horas que sacamos con chatgpt porque genuinamente no sabemos como hacer esto. Disculpanos profe. <3
const ahora = new Date();
const anio = ahora.getFullYear();
const mes = String(ahora.getMonth() + 1).padStart(2, '0');
const dia = String(ahora.getDate()).padStart(2, '0');
const horas = String(ahora.getHours()).padStart(2, '0');
const minutos = String(ahora.getMinutes()).padStart(2, '0');
const segundos = String(ahora.getSeconds()).padStart(2, '0');
const fechaHora = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;


// Sección de productos relacionados
document.addEventListener('DOMContentLoaded', function () {
  const productID = localStorage.getItem('productID');
  const productURL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

  fetch(productURL)
    .then(response => response.json())
    .then(productData => {
      console.log('Producto:', productData);
      const relatedProducts = productData.relatedProducts || [];
      const cards = [
        document.getElementById("relatedProducts1"),
        document.getElementById("relatedProducts2"),
      ];
      const numProductsToShow = Math.min(relatedProducts.length, cards.length);

      for (let i = 0; i < numProductsToShow; i++) {
        const producto = relatedProducts[i];
        const card = cards[i]; 
        const imagen = card.querySelector("img"); 
        const nombre = card.querySelector("h3"); 

        imagen.src = producto.image; 
        imagen.alt = `Imagen de ${producto.name}`; 
        nombre.textContent = producto.name; 

        card.dataset.id = producto.id;
        card.addEventListener('click', function() {
          localStorage.setItem('productID', producto.id);
          window.location.href = 'product-info.html'; });
      }
    })
    .catch(error => {
     console.error('Error:', error);
    });
});