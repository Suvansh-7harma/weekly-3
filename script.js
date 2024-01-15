const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const productListElement = document.getElementById('productList');
  const cartElement = document.getElementById('cart');
  const cartItems = [];
  
  function renderProductList() {
    productListElement.innerHTML = '<h2>Product</h2>';
  
    Products.forEach(product => {
      const productItem = createProductItem(product);
      productListElement.appendChild(productItem);
    });
  }
  
  function createProductItem(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <span>${product.name} - ${product.price}</span>
      <button onclick="addToCart(${product.id})">+</button>
      <button onclick="removeFromCart(${product.id})">-</button>
    `;
    return productItem;
  }
  
  function renderCart() {
    cartElement.innerHTML = '<h2>Cart</h2>';
  
    if (cartItems.length === 0) {
      const noProductMessage = document.createElement('p');
      noProductMessage.textContent = 'No Product added to the cart';
      cartElement.appendChild(noProductMessage);
    } else {
      cartItems.forEach(item => {
        const cartItem = createCartItem(item);
        cartElement.appendChild(cartItem);
      });
    }
  }
  
  function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <span>${item.name} - Quantity: ${item.quantity}</span>
      <span>Total: ${item.price * item.quantity}</span>
    `;
    return cartItem;
  }
  
  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
  
    renderCart();
  }
  
  function removeFromCart(productId) {
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  
    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
  
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cartItems.splice(existingItemIndex, 1);
      }
  
      renderCart();
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProductList();
    renderCart();
  });
  