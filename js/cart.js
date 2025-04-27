const token = localStorage.getItem("authToken");
console.log(token);

loadCart();

function loadCart() {
  fetch('https://engine.cocomatik.com/api/orders/cart/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    renderCartItems(data);
  })
  .catch(error => {
    console.error('Error fetching cart data:', error);
    document.getElementById('CartItemBox').innerHTML = '❌ Failed to load cart data.';
  });
}

function renderCartItems(data) {
  const cartTotalPrice = document.getElementById("cartTotalPrice");
  const carttotalItem = document.getElementById("carttotalItem");

  if (cartTotalPrice) cartTotalPrice.textContent = `Order Amount: $${data.total_value.toFixed(2)}`;
  if (carttotalItem) carttotalItem.textContent = `Item: ${data.total_items}`;

  const cartContainer = document.getElementById('CartItemBox');
  cartContainer.innerHTML = '';

  const cartItems = data.items || [];

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    cartContainer.innerHTML = 'Your cart is empty.';
    return;
  }

  cartItems.forEach(item => {
    const product = item.product_details;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-box';

    itemDiv.innerHTML = `
      <div class="Img-Details-Box">
        <div id="itemImgBox">
          <img src="/data2/hair2.png" alt="${product.title}" width="150">
        </div>

        <div id="itemDetailsBox">
          <div id="itemNAme">Name: ${product.name}</div>
          <div id="itemDetail">${product.description}</div>
          <div id="itemMRP">MRP: $${product.mrp.toFixed(2)}</div>
          <div id="price">Price: $${product.price}</div>
          <div><b>SKU:</b> ${product.sku}</div>
          <div><b>Quantity:</b> <span class="quantity-text">${item.quantity}</span></div>
          <div class="quantity-container" data-id="${item.id}">
            <button class="decrease">-</button>
            <input type="text" class="quantity" value="${item.quantity}" readonly>
            <button class="increase">+</button>
          </div>
        </div>
      </div>

      <div id="itemPriceBox">
        <div class="itemPrice"> $${(product.price * item.quantity).toFixed(2)}</div>
        <div class="itemRemoveBtn" data-id="${item.id}">Remove</div>
      </div>
    `;

    cartContainer.appendChild(itemDiv);

    // Remove button event
    const removeBtn = itemDiv.querySelector('.itemRemoveBtn');
    removeBtn.addEventListener('click', function () {
      const cartItemId = this.getAttribute('data-id');
      removeCartItem(cartItemId, itemDiv);
    });

    // Quantity buttons event
    const quantityContainer = itemDiv.querySelector('.quantity-container');
    const decreaseBtn = quantityContainer.querySelector('.decrease');
    const increaseBtn = quantityContainer.querySelector('.increase');
    const quantityInput = quantityContainer.querySelector('.quantity');
    const priceDiv = itemDiv.querySelector('.itemPrice');
    const quantityText = itemDiv.querySelector('.quantity-text');

    decreaseBtn.addEventListener('click', () => changeQuantity(-1, item.id, product.price, quantityInput, priceDiv, quantityText));
    increaseBtn.addEventListener('click', () => changeQuantity(1, item.id, product.price, quantityInput, priceDiv, quantityText));
  });
}

function removeCartItem(cartItemId, itemDiv) {
  fetch('https://engine.cocomatik.com/api/orders/cart/delete/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({ cart_item_id: cartItemId })
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to delete item');
    itemDiv.remove();
    refreshCartTotals(); // Update totals after remove
  })
  .catch(err => {
    console.error('Delete failed:', err);
    alert('❌ Failed to remove item.');
  });
}

function changeQuantity(change, cartItemId, productPrice, quantityInput, priceDiv, quantityText) {
  let newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity < 1) return;

  quantityInput.disabled = true;

  fetch('https://engine.cocomatik.com/api/orders/cart/update/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      cart_item_id: cartItemId,
      quantity: newQuantity
    })
  })
  .then(response => {
    quantityInput.disabled = false;
    if (!response.ok) {
      throw new Error('Failed to update quantity');
    }
    // Update local display first
    quantityInput.value = newQuantity;
    quantityText.textContent = newQuantity;
    priceDiv.textContent = `$${(productPrice * newQuantity).toFixed(2)}`;
    // Then refresh totals
    refreshCartTotals();
  })
  .catch(err => {
    quantityInput.disabled = false;
    console.error('Quantity update failed:', err);
    alert('❌ Failed to update quantity.');
  });
}

function refreshCartTotals() {
  fetch('https://engine.cocomatik.com/api/orders/cart/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const cartTotalPrice = document.getElementById("cartTotalPrice");
    const carttotalItem = document.getElementById("carttotalItem");

    if (cartTotalPrice) cartTotalPrice.textContent = `Order Amount: $${data.total_value.toFixed(2)}`;
    if (carttotalItem) carttotalItem.textContent = `Item: ${data.total_items}`;
  })
  .catch(error => {
    console.error('Failed to refresh totals:', error);
  });
}
