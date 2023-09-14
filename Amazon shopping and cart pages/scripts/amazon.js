import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

updateCartQuantity();  //update the cart quantity above the cart icon in the header whenever the page loads

products.forEach((product) => {
  // write the sample html for a single product in the html file and then cut the code and paste here and modify the unique parts of each product by using a template string:
  let eachHTML = ` 
<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars * 10}.png">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    $${ formatCurrency(product.priceCents) }
  </div>

  <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart   js-added-to-cart-product-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary add-to-cart-js" data-product-id="${product.id}">
    Add to Cart
  </button>
</div>
`;
  productsHTML += eachHTML;
});

document.querySelector('.products-grid-js').innerHTML = productsHTML;


function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity ;
  });
  document.querySelector('.cart-quantity-js').innerHTML = cartQuantity; // display total number of items in the cart above the cart button
}

// Make the website interactive by making the Add to Cart button functional:
document.querySelectorAll('.add-to-cart-js').forEach( (button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId //dataset property gives an object with all the data attributes of an element. product id gets converted from kebab case in the html data attribute to a camel case in the js code. This line of code is so that upon clicking an Add to Cart button we get the productId out of it. id is used and not productName because in an e-commerce website there maybe 2 different products with the same name

    // Make and style the Added message when we add a product to the cart: 
    displayAddedMessage(productId);
    
    // get the quantity of items to be added to cart from the select button's drop down menu:
    let quantityFromSelectElement = document.querySelector(`.js-quantity-selector-${productId}`).value;
    let quantity = Number(quantityFromSelectElement);

    addToCart(productId, quantity);
    updateCartQuantity();
  });
});

let timeoutId;
function displayAddedMessage(productId) {
  clearTimeout(timeoutId); //clear any previous timeout, so that the added message shows for exactly 2 seconds after the last time a quantity of the same product was added

  const element = document.querySelector(`.js-added-to-cart-product-${productId}`); //get the html element with the added to cart message
  element.classList.add('added-message-popup'); // now style this class in styles/pages/amazon.css so that it has opacity: 1 and the added message becomes visible
  timeoutId = setTimeout( () => {
  element.classList.remove('added-message-popup');
  }, 2000 ); // removing the opacity:1 class so that the added message disappears after a couple of seconds
}