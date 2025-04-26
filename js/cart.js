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
  cartContainer.innerHTML = ''; // Clear "Loading..."

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
      <div id="itemImgBox">
        <img src="/data2/hair2.png" alt="${product.title}" width="150">
      </div>
      <div id="itemDetailsBox">
        <div id="itemNAme">Name: ${product.name}</div>
        <div id="itemDetail">${product.title}</div>
        <div id="itemMRP">MRP: $${product.price.toFixed(2)}</div>
        <div><b>SKU:</b> ${item.sku}</div>
        <div><b>Quantity:</b> ${item.quantity}</div>
      </div>
      <div id="itemPriceBox">
        <div id="itemPrice"> $${(product.price * item.quantity).toFixed(2)}</div>
<div id="itemRemove-${item.id}" class="itemRemoveBtn"  data-id="${item.id}">Remove</div>
      </div>
    `;

    cartContainer.appendChild(itemDiv);

    // Add event listener to this specific remove button by ID
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
  });
})
.catch(error => {
  console.error('Error fetching cart data:', error);
  document.getElementById('CartItemBox').innerHTML = '❌ Failed to load cart data.';
});
