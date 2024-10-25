import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE, PRODUCT_INFO_COMMENTS_URL } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async function () {
    const productID = localStorage.getItem('productID');
    const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
    console.log("Data JSON:", dataJSON);
    const { data } = dataJSON;

    const cart = document.getElementById('idCart');

    // Verifica que los datos del producto estén disponibles
    if (data) {
        const productHTML = `
        <div class="row g-0 h-100">
            <div class="col-md-4 p-0">
                <img src="${data.images[0]}" class="img-fluid rounded-start" alt="${data.name}" style="height: 150px; width: 100%; object-fit: cover;">
            </div>
            <div class="col-md-8 d-flex flex-column">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${data.description}</p>
                    <p class="card-text text-right"><small class="text-body-secondary">Precio: ${data.cost+ data.currency}</small></p>
                </div>
            </div>
        </div>
        `;

        // Agrega el HTML generado al contenedor
        cart.innerHTML = productHTML;
    } else {
        cart.innerHTML = '<p>Error al cargar los datos del producto.</p>';
    }
});
