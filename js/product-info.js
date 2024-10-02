//   <div class="carousel-item active">
//   <img src="img/car1.jpg" class="d-block w-100" alt="..." />
// </div>

import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL} from './constants/API.js';

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
    // console.log(carouselObject[item]);
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

// Constantes de horas que sacamos con chatgpt porque genuinamente no sabemos como hacer esto de manera organica. Disculpanos profe. <3
const ahora = new Date();
const anio = ahora.getFullYear();
const mes = String(ahora.getMonth() + 1).padStart(2, '0');
const dia = String(ahora.getDate()).padStart(2, '0');
const horas = String(ahora.getHours()).padStart(2, '0');
const minutos = String(ahora.getMinutes()).padStart(2, '0');
const segundos = String(ahora.getSeconds()).padStart(2, '0');
const fechaHora = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;


async function relatedProducts() {
  getJSONData(PRODUCTS_URL)
  productos = await respuesta.json();

}