import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async function () {
    const productID = localStorage.getItem('productID');
    const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
    console.log("Data JSON:", dataJSON);
    const { data } = dataJSON;

    const cart = document.getElementById('idCart');

    if (data) {
        const productHTML = `
        <div class="row g-0 h-100">
    <div class="col-md-4 p-0 position-relative">
        <img src="${data.images[0]}" class="img-fluid rounded-start" alt="${data.name}" style="height: 170px; width: 100%; object-fit: cover;">
       </div>
    <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
            <h3 class="card-title">${data.name}</h3>
            <span id="cant" class="position-absolute top-0 end-0 me-4 mt-4">x1</span>
        </div>
        <div class="d-flex justify-content-between align-items-center" style="flex-grow: 10;">
            <div class="d-flex align-items-center ms-3">
                <button class="btn btn-secondary btn-sm" id="btnMenos">-</button>
                <span id="cant" class="mx-2">1</span>
                <button class="btn btn-secondary btn-sm" id="btnMas">+</button>
           <button class="btn btn-danger ms-2 btn-sm" id="btnEliminar">
                <i class="fas fa-trash-alt"></i>
            </button>
           </div>
            <h5 class="mb-0 me-4"> Precio: ${data.cost} ${data.currency}</h5>
        </div>
    </div>
</div>`;

        cart.innerHTML = productHTML;
    } else {
        cart.innerHTML = '<p>Error al cargar los datos del producto.</p>';
    }
});


const btnEliminar = document.getElementById('btnEliminar');

btnEliminar.addEventListener('click', () => {
    localStorage.removeItem('productID');
})
