{
  /* <div class="carousel-item active">
<img class="d-block w-100" src="..." alt="First slide" />
</div> */
}

import getJSONData from './utils/getJSONData.js';
import { PRODUCT_INFO_URL, EXT_TYPE } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async function () {
  const productID = localStorage.getItem('productID');
  const dataJSON = await getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE);
  const { data } = dataJSON;
});


