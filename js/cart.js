const token = localStorage.getItem("authToken");
console.log(token)
fetch('https://engine.cocomatik.com/api/orders/cart/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(data => {
  const cartContainer = document.getElementById('cart-Container');
  cartContainer.innerHTML = ''; // Clear "Loading..."

  const cartItems = data.items || data; // Support both direct array or nested

  if (!Array.isArray(cartItems)) {
    cartContainer.innerHTML = 'Unexpected data format.';
    console.error('Expected array but got:', cartItems);
    return;
  }

  if (cartItems.length === 0) {
    cartContainer.innerHTML = 'Your cart is empty.';
    return;
  }

  cartItems.forEach(item => {
    const product = item.product_details;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-box';

    itemDiv.innerHTML = `
      <strong>${product.name}</strong><br>
      <small><b>SKU:</b> ${item.sku}</small><br>
      <small><b>Quantity:</b> ${item.quantity}</small><br>
      <small><b>Price:</b> $${product.price.toFixed(2)}</small>
    `;

    cartContainer.appendChild(itemDiv);
  });
})
.catch(error => {
  console.error('Error fetching cart data:', error);
  document.getElementById('cart-items').innerHTML = '❌ Failed to load cart data.';
});