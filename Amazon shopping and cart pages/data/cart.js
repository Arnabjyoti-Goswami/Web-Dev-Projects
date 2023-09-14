export let cart = JSON.parse( localStorage.getItem('cart') ); //get cart from localStorage

if(!cart) { //If cart is empty in the local storage initially, then we need to set it to a default value. If an element doesnt exist in localStorage then localStorage will return null for the key to that value. The negation of that null value will be a truthy value so this if statement will run.
  cart = []; //default value of the cart is an empty cart
}

export function saveToStorage() { //save cart to local storage so that variables aren't reset when the page is refreshed, add this function at the end of addToCart() and removeFromCart() functions
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) { // as this function manages the cart so it's better to keep it in cart.js file instead of amazon.js, and import it in amazon.js
  // Loop through the cart to see if current product is already in the cart: 
  let matchingItem = undefined;
  cart.forEach( (cartItem) => {
    if(cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if(matchingItem)  { //if it is in the cart then increase its quantity
    matchingItem.quantity += quantity;
  } else { //otherwise add it to the cart
    cart.push( {
      productId: productId,
      quantity: quantity
    } );
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach( (cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    };
  });

  cart = newCart;

  saveToStorage();
}