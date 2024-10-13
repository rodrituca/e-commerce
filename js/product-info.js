import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL} from './constants/API.js';

//Botón Switch
const switchButton = document.getElementById('BtnSwitch');
const modoDiaNoche = localStorage.getItem('modo');

if (modoDiaNoche === 'noche') {
  document.body.classList.add('bg-dark', 'text-white');
  switchButton.checked = true;
} else {
  document.body.classList.add('bg-light', 'text-dark');
}

// Cambiar entre Modo Día y Modo Noche
switchButton.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.remove('bg-light', 'text-dark');
    document.body.classList.add('bg-dark', 'text-white');
    localStorage.setItem('modo', 'noche');
  } else {
    document.body.classList.remove('bg-dark', 'text-white');
    document.body.classList.add('bg-light', 'text-dark');
    localStorage.setItem('modo', 'dia');
  }
});

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
          img.className = 'd-block w-100';
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