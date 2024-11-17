import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';
import showBadge from './init.js';

document.addEventListener('DOMContentLoaded', async function () {
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cart = document.getElementById('idCart');

async function renderCart() {
    cart.innerHTML = '';
    let totalPrice = 0;

    //Cartel de carrito vacío
    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.className = 'col-md-8 mb-3 mx-auto d-flex justify-content-center text-center';
        emptyCartMessage.style = 'border: 1px solid #ccc; text-center, border-radius: 5px; padding: 10px; width: 90%; text-align: center; background-color: #f9f9f9, d-flex, justify-content-center;';
        emptyCartMessage.innerHTML = '<h2>Su carrito se encuentra vacío.</h2>';
        
        cart.appendChild(emptyCartMessage);
        document.getElementById("finalPrice").innerText = `Precio total: 0`;
        return;
    }


    for (const item of cartItems) {
    const productData = await (await fetch(PRODUCT_INFO_URL + item.id + EXT_TYPE)).json();

        if (productData) {
            totalPrice += productData.cost * item.quantity;
            const productDiv = document.createElement('div');
            productDiv.className = 'col-md-8 mb-3 mx-auto';
            productDiv.style = 'border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 90%;';
            productDiv.innerHTML = `
                <div class="row g-0 h-100" data-id="${item.id}">
                <div class="col-md-4 p-0 position-relative d-flex align-items-center" style="height: 150px;"> 
                <img src="${productData.images[0]}" class="img-fluid rounded-start ms-2 w-100" alt="${productData.name}">  </div>
                    <div class="col-md-8 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start">
                            <h3 class="mb-0 ms-3">${productData.name}</h3>
                            <button class="btn btn-danger btnEliminar" data-id="${item.id}"> <i class="fas fa-trash-alt"></i> </button>
                    </div>                
                        <div class="d-flex justify-content-between align-items-center mt-auto ms-3" style="height: 100px;">
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-secondary btnMenos btn-sm" data-id="${item.id}">-</button>
                                <input type="number" class="form-control mx-1 custom-spin-button" value="${item.quantity}" min="1" style="width: 30px; text-align: center; padding: 0; border-radius: 0;">
                                <button type="button" class="btn btn-secondary btnMas btn-sm" data-id="${item.id}">+</button>
                            </div>
                            <p class="mb-0 text-end"><strong>Precio: ${productData.cost} ${productData.currency}</strong></p>
                        </div>
                    </div>
                </div>`;

    cart.appendChild(productDiv);

// Botones de cantidad y eliminar
const btnEliminar = productDiv.querySelector('.btnEliminar');
const btnMas = productDiv.querySelector('.btnMas');
const btnMenos = productDiv.querySelector('.btnMenos');

    btnEliminar.addEventListener('click', () => {
    cartItems.splice(cartItems.indexOf(item), 1);
    updateCart();
    showBadge(); });

    btnMas.addEventListener('click', () => {
    item.quantity++;
    updateCart();
    showBadge(); });

    btnMenos.addEventListener('click', () => {
    if (item.quantity > 1) {
    item.quantity--;
    updateCart();
    showBadge(); }});
    
}
}


const impuesto = (parseInt(totalPrice) * parseFloat(shippingType.value));
document.getElementById("finalPrice").innerText = `Subtotal: ${totalPrice + impuesto} ${cartItems[0]?.currency || ''}`;

//Atado con alambre provisionalmente hasta llegar a nuestro destino
document.getElementById("shippingType").addEventListener("click", () => {
const impuesto = (parseInt(totalPrice) * parseFloat(shippingType.value));
document.getElementById("finalPrice").innerText = `Subtotal: ${totalPrice + impuesto} ${cartItems[0]?.currency || ''}`;;
  })


    }

    function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart(); }
    await renderCart();
    showBadge();
});


// Validación de campos
const city = document.getElementById('dpto');
const location = document.getElementById('localidad');
const street = document.getElementById('calle');
const number = document.getElementById('num');
const corner = document.getElementById('esq');
const requiredFields = [city, location, street, number, corner];

// Comprobar si los campos obligatorios están vacíos
function validation() {
  let valid = true;
 
  requiredFields.forEach(input => {
    if (input.value.trim() === "") {
      input.classList.remove('is-valid')
      input.classList.add("is-invalid");
      valid = false;
    } else {
     input.classList.add('is-valid')
      input.classList.remove("is-invalid");
    }
  });
  return valid;
}
const shippingType = document.getElementById('shippingType')
function selectedField(){
  let valid = true;
  if (shippingType.value !== "0"){
    shippingType.classList.add('is-valid')
    shippingType.classList.remove("is-invalid");
  } else {
    shippingType.classList.remove('is-valid')
    shippingType.classList.add("is-invalid");
valid = false;
  }
  return valid
};

function paymentMethodSelect(){
  const paymentMethod = document.getElementById('paymentMethod')

  let valid = true;
  if (paymentMethod.value){
    paymentMethod.classList.add('is-valid');
    paymentMethod.classList.remove("is-invalid");
    valid = true;
  } else {
    paymentMethod.classList.remove('is-valid');
    paymentMethod.classList.add("is-invalid");
    valid = false;
  }
return valid
};

function cardValidation() {
  let valid = true;

  const cardNum = document.getElementById('numTar')
  const cvv = document.getElementById('cvv')
  const fv = document.getElementById('fv')
  const required = [cardNum, cvv, fv];


  required.forEach(input => {
    if (input.value.trim() === "") {
      input.classList.remove('is-valid')
      input.classList.add("is-invalid");
      valid = false;
    } else {
     input.classList.add('is-valid')
      input.classList.remove("is-invalid");
    }
  });
  return valid;
};


// Funcionalidad del acordeón
document.getElementById('nextToShipping').addEventListener('click', () => {
  // Avanzar a la siguiente sección (Dirección de envío)
  document.getElementById('collapseCart').classList.remove('show');
  document.getElementById('collapseOne').classList.add('show');
});

document.getElementById('nextToShippingMethod').addEventListener('click', (event) => {
  // Comprobar la validación antes de avanzar
  if (validation()) {
    // Si la validación es correcta, avanza a la siguiente sección (Tipo de envío)
    document.getElementById('collapseOne').classList.remove('show');
    document.getElementById('collapseTwo').classList.add('show');
  } else {
    // Si la validación falla, prevenir que se avance
    event.preventDefault();
  }
});

document.getElementById('nextToPayment').addEventListener('click', (event) => {
  // Avanzar a la siguiente sección (Forma de pago)
if (selectedField()){
  document.getElementById('collapseTwo').classList.remove('show');
  document.getElementById('collapseThree').classList.add('show');
} else {
  event.preventDefault();
}
});

const confirmBtn = document.getElementById('confirmBtn')
confirmBtn.addEventListener('click', (event) => {
  let valid = true;
  if (paymentMethodSelect() && cardValidation()){
    alert("Tu compra fue exitosa!!! gracias!!! te queremos!!!")
    return valid;
  }else{
    event.preventDefault();
  }
});

