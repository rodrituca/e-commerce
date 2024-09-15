//   <div class="carousel-item active">
//   <img src="img/car1.jpg" class="d-block w-100" alt="..." />
// </div>

import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';

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
});
