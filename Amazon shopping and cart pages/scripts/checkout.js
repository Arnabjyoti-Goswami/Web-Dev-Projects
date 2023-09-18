import {cart, removeFromCart, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// Generate the HTML for cartSummary of products in checkout page:
let cartSummaryHTML = '';
cart.forEach( (cartItem) => {
  let matchingProduct;
  products.forEach( (product) => {
    if(product.id === cartItem.productId) {
      matchingProduct = product; // now we got the whole object 'product' from products.js, using just the ID property of the the different object 'cartItem' from cart.js
    }
  });

  cartSummaryHTML += 
`<div class="cart-item-container    cart-item-container-${matchingProduct.id}-js">
  <div class="delivery-date  delivery-date-${matchingProduct.id}-js">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
          ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${ formatCurrency(matchingProduct.priceCents) }
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary   update-product-js"     data-product-id="${matchingProduct.id}">
          Update
        </span>

        <input class="quantity-input"></input>
        <span class="save-quantity-input  link-primary">Save</span>

        <span class="delete-quantity-link link-primary   delete-product-js" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>   ` ;

});

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;


updateCartQuantityHeader(); // Display the current number of items in the header of the checkout page
function updateCartQuantityHeader() {
  let cartQuantity = 0;
  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity ;
  });
  document.querySelector('.cart-quantity-header-js').innerHTML = `${cartQuantity} items`; // display total number of items in the cart above the cart button
}

// Make delete button for the items in the checkout page functional:
document.querySelectorAll('.delete-product-js').forEach( (link) => {
  link.addEventListener('click', () => {
    let currentProductId = link.dataset.productId;
    removeFromCart(currentProductId); //update the cart after deletion of a product

    document.querySelector(`.cart-item-container-${currentProductId}-js`).remove(); //remove the html element for the deleted product from the webpage

    updateCartQuantityHeader();
  });
});


// Make update button for the items in the checkout page functional:
document.querySelectorAll('.update-product-js').forEach( (link) => {
  link.addEventListener('click', () => {
    const currentProductId = link.dataset.productId; // get the productId of the current element in the iteration of the forEach loop using the data attribute created before

    const container = document.querySelector(`.cart-item-container-${currentProductId}-js`);
    container.classList.add('is-editing-quantity');

    // implement functionality of the update button:
    container.querySelector('.save-quantity-input').addEventListener('click', () => {
      const inputBoxValue = container.querySelector('.quantity-input').value;
      const quantity = Number(inputBoxValue); // get the value of the quantity from the input textbox
      
      updateQuantity(currentProductId, quantity); // update quantity of the product in the cart
      container.querySelector('.quantity-label').innerHTML = `${quantity}`; //show the new quantity label

      container.classList.remove('is-editing-quantity'); // so that we can switch between Update and Save, as this line of code would reverse all the styling applied when editing the quantity by just removing the is-editing-quantity class

      updateCartQuantityHeader();
    });

  });
});

function updateQuantity(productId, quantity) {
  cart.forEach( (cartItem) => {
    if(cartItem.productId === productId) {
      cartItem.quantity = quantity;
    }
  } );
  saveToStorage();
}


// Make the delivery date options functional
document.querySelectorAll('.delivery-option-input').forEach((radio) => {
  radio.addEventListener('change', () => {
    const currentProductId = radio.getAttribute('name').replace('delivery-option-', ''); // get the productId for which the radio button selector on which a change occurs
    const deliveryDateElement = document.querySelector(`.delivery-date-${currentProductId}-js`); // select the delivery date element so that we can change its innerHTML according to the option selected
    const selectedOption = document.querySelector(`input[name="delivery-option-${currentProductId}"]:checked`); // get the selected option out of the all the radio selector options available for the current product
    
    // Get the selected delivery date and update the delivery date element
    if (selectedOption) {
      const selectedDeliveryDate = selectedOption.nextElementSibling.querySelector('.delivery-option-date').textContent; // get the delivery date data for the selectedOption
      deliveryDateElement.textContent = `Delivery date: ${selectedDeliveryDate}`; // update the innerHTML of the delivery date element
    }
  });
});
