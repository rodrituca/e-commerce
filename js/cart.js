import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';

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
            productDiv.style = 'border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 80%;';
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
    updateCart(); });

    btnMas.addEventListener('click', () => {
    item.quantity++;
    updateCart(); });

    btnMenos.addEventListener('click', () => {
    if (item.quantity > 1) {
    item.quantity--;
    updateCart(); }});
    
}
}

    document.getElementById("finalPrice").innerText = `Precio total: ${totalPrice} ${cartItems[0]?.currency || ''}`;
    }

    function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart(); }
    await renderCart();
});

//
const confirmBtn = document.getElementById("confirmBtn")

confirmBtn.addEventListener("click", () => {
const elementos = document.createElement("div");
elementos.innerHTML = `<div class="accordion" id="accordionExample">
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Accordion Item #1
    </button>
  </h2>
  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Accordion Item #2
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Accordion Item #3
    </button>
  </h2>
  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
</div>`
});

//Funcionalidad del acordeón
document.getElementById('nextToShipping').addEventListener('click', () => {
  // Avanzar a la siguiente sección (Dirección de envío)
  document.getElementById('collapseCart').classList.remove('show');
  document.getElementById('collapseOne').classList.add('show');
});

document.getElementById('nextToShippingMethod').addEventListener('click', () => {
  // Avanzar a la siguiente sección (Tipo de envío)
  document.getElementById('collapseOne').classList.remove('show');
  document.getElementById('collapseTwo').classList.add('show');
});

document.getElementById('nextToPayment').addEventListener('click', () => {
  // Avanzar a la siguiente sección (Forma de pago)
  document.getElementById('collapseTwo').classList.remove('show');
  document.getElementById('collapseThree').classList.add('show');
});