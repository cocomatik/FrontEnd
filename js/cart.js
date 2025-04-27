const token = localStorage.getItem("authToken");
console.log(token);

fetch('https://engine.cocomatik.com/api/orders/cart/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(data => {
  const cartContainer = document.getElementById('CartItemBox');
  cartContainer.innerHTML = '';

  const cartItems = data.items || data;

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

   <section class="Img-Details-Box">

   
      <section id="itemImgBox">
        <img src="/data2/hair2.png" alt="${product.title}" width="150">
      </section>

      <section id="itemDetailsBox">
        <div id="itemNAme">Name: ${product.name}</div>
        <div id="itemDetail">${product.description}</div>
        <div id="itemMRP">MRP: $${product.mrp.toFixed(2)}</div>
        <div id="price">price: $${product.price}</div>
        <div><b>SKU:</b> ${product.sku}</div>
        <div><b>Quantity:</b> <span class="quantity-text">${item.quantity}</span></div>
        <div class="quantity-container" data-id="${item.id}">
          <button class="decrease">-</button>
          <input type="text" class="quantity" value="${item.quantity}" readonly>
          <button class="increase">+</button>
        </div>
      </section>

         </section>

      <section id="itemPriceBox">
        <div id="itemPrice"> $${(product.price * item.quantity).toFixed(2)}</div>
        <div id="itemRemove-${item.id}" class="itemRemoveBtn" data-id="${item.id}">Remove</div>
      </section>
    `;

    cartContainer.appendChild(itemDiv);

    document.getElementById(`itemRemove-${item.id}`).addEventListener('click', function () {
      const cartItemId = this.getAttribute('data-id');

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
        this.closest('.item-box').remove();
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('❌ Failed to remove item.');
      });
    });

    const quantityContainer = itemDiv.querySelector('.quantity-container');
    const decreaseBtn = quantityContainer.querySelector('.decrease');
    const increaseBtn = quantityContainer.querySelector('.increase');
    const quantityInput = quantityContainer.querySelector('.quantity');
    const priceDiv = itemDiv.querySelector('#itemPrice');
    const quantityText = itemDiv.querySelector('.quantity-text');

    decreaseBtn.addEventListener('click', () => updateQuantity(-1, item.id, product.price, quantityInput, priceDiv, quantityText));
    increaseBtn.addEventListener('click', () => updateQuantity(1, item.id, product.price, quantityInput, priceDiv, quantityText));
  });
})
.catch(error => {
  console.error('Error fetching cart data:', error);
  document.getElementById('CartItemBox').innerHTML = '❌ Failed to load cart data.';
});

function updateQuantity(change, cartItemId, productPrice, quantityInput, priceDiv, quantityText) {
  let newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity < 1) return;

  fetch('https://engine.cocomatik.com/api/orders/cart/update/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${localStorage.getItem("authToken")}`
    },
    body: JSON.stringify({
      cart_item_id: cartItemId,
      quantity: newQuantity
    })
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to update quantity');
    quantityInput.value = newQuantity;
    quantityText.textContent = newQuantity;
    priceDiv.textContent = `$${(productPrice * newQuantity).toFixed(2)}`;
  })
  .catch(err => {
    console.error('Quantity update failed:', err);
    alert('❌ Failed to update quantity.');
  });
}
