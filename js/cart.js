import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';
 
document.addEventListener('DOMContentLoaded', async function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cart = document.getElementById('idCart');
 
    async function renderCart() {
        cart.innerHTML = '';
        let totalPrice = 0;
 
        for (const item of cartItems) {
            const productData = await (await fetch(PRODUCT_INFO_URL + item.id + EXT_TYPE)).json();
 
            if (productData) {
                totalPrice += productData.cost * item.quantity;
                cart.innerHTML += `
                <div class="col-md-8 mb-3 mx-auto" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 80%;">
                    <div class="row g-0 h-100" data-id="${item.id}">
                    
                <div class="col-md-4 p-0 position-relative d-flex align-items-center" style="height: 150px;"> 
                    <img src="${productData.images[0]}" class="img-fluid rounded-start ms-2 w-100" alt="${productData.name}"> 
                </div>
                       
                <div class="col-md-8 d-flex flex-column">
                   <div class="d-flex justify-content-between align-items-start">
                <h3 class="mb-0 ms-3">${productData.name}</h3>
                <button class="btn btn-danger btnEliminar" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>                

         <div class="d-flex justify-content-between align-items-center mt-auto ms-3" style="height: 100px;">
            <div class="d-flex align-items-center">
    <button type="button" class="btn btn-secondary btnMenos btn-sm" data-id="${item.id}">-</button>
    <input type="number" id="quantity-${item.id}" class="form-control mx-1" value="${item.quantity}" min="1" style="width: 30px; text-align: center; padding: 0; border-radius: 0;">
    <button type="button" class="btn btn-secondary btnMas btn-sm" data-id="${item.id}">+</button>
</div>

   
       <p class="mb-0 text-end"><strong>Precio: ${productData.cost} ${productData.currency}</strong></p>

                </div>
                </div>
                </div>
                </div>`;
            }
        }
 
        document.getElementById("finalPrice").innerText = `Precio total: ${totalPrice} ${cartItems[0]?.currency || ''}`;
    }
 
    // Botones de cantidad y eliminar producto
    cart.addEventListener('click', (event) => {
    const productId = parseInt(event.target.dataset.id, 10);
    const item = cartItems.find(item => item.id === productId);
 
    if (event.target.matches('.btnEliminar')) { cartItems.splice(cartItems.indexOf(item), 1); }
    else if (event.target.matches('.btnMas')) { item.quantity++; }
    else if (event.target.matches('.btnMenos') && item.quantity > 1) { item.quantity--; }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart(); });
 
    await renderCart();
});

