
  document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    let total = 0;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <span>Qty: ${item.quantity}</span>
        <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
      `;
      cartItemsContainer.appendChild(row);
      total += item.price * item.quantity;
    });

    totalDisplay.textContent = total.toFixed(2);
  });

  function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
  }

