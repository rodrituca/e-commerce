import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cart = document.getElementById('idCart');
    let finalPriceValue = 0;

    for (const item of cartItems) {
        const response = await fetch(PRODUCT_INFO_URL + item.id + EXT_TYPE);
        const productData = await response.json();

        if (productData) {
            const productHTML = `
            <div class="row g-0 h-100" data-id="${item.id}">
                <div class="col-md-4 p-0 position-relative">
                    <img src="${productData.images[0]}" class="img-fluid rounded-start" alt="${productData.name}" style="height: 170px; width: 100%; object-fit: cover;">
                </div>
                <div class="col-md-8 d-flex flex-column">
                    <div class="card-body">
                        <h3 class="card-title">${productData.name}</h3>
                        <p>Precio: ${productData.cost} ${productData.currency}</p>
                        <p>Cantidad: <span class="cantDisplay">${item.quantity}</span></p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center" style="flex-grow: 10;">
                        <h5 class="mb-0 me-4">Subtotal: ${productData.cost * item.quantity} ${productData.currency}</h5>
                        <button class="btn btn-danger btnEliminar" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="btn btn-secondary btnMas" data-id="${item.id}">+</button>
                        <button class="btn btn-secondary btnMenos" data-id="${item.id}">-</button>
                    </div>
                </div>
            </div>`;
            cart.innerHTML += productHTML;
            finalPriceValue += productData.cost * item.quantity;
        }
    }

    const finalPrice = document.getElementById("finalPrice");
    finalPrice.innerText = `Precio total: ${finalPriceValue} ${cartItems[0]?.currency || ''}`;

    // Manejo del carrito
    cart.addEventListener('click', (event) => {
        const productId = event.target.dataset.id;

        // Eliminar producto
        if (event.target.matches('.btnEliminar')) {
            const updatedCartItems = cartItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            location.reload();
        }

        // Manejo de botones de cantidad
        const item = cartItems.find(item => item.id === productId);
        const cantDisplay = event.target.closest('.d-flex').querySelector('.cantDisplay');

        if (event.target.matches('.btnMas')) {
            item.quantity++;
        } else if (event.target.matches('.btnMenos') && item.quantity > 1) {
            item.quantity--;
        }

        // Actualizar el carrito en localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        cantDisplay.innerText = item.quantity;

        // Actualizar subtotal
        const subtotal = item.quantity * (productData.cost);
        finalPriceValue = cartItems.reduce((total, item) => total + item.quantity * (JSON.parse(localStorage.getItem('cartItems')).find(p => p.id === item.id).cost || 0), 0);
        finalPrice.innerText = `Precio total: ${finalPriceValue} ${cartItems[0]?.currency || ''}`;
    });
});
