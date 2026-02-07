// shared-cart.js

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
      button.addEventListener('click', () => {
        const product = button.closest('.product');
        const name = product.querySelector('.name') ? product.querySelector('.name').textContent : product.querySelector('b')?.textContent;
        const priceText = product.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showCartPopup(name);
        updateCartIndicator();
      });
    }
  });

  updateCartIndicator();
});

function showCartPopup(productName) {
  const popup = document.createElement('div');
  popup.className = 'cart-popup';
  popup.textContent = `${productName} added to cart`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

function updateCartIndicator() {
  let indicator = document.getElementById('cart-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'cart-indicator';
    indicator.className = 'cart-indicator';
    indicator.innerHTML = '<a href="cart.html">🛒 <span id="cart-count">0</span></a>';
    document.body.appendChild(indicator);
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
      button.addEventListener('click', () => {
        const product = button.closest('.product, .card, .product-card');
        if (!product) return;

        const nameElement = product.querySelector('.name') || product.querySelector('h2') || product.querySelector('h3');
        const name = nameElement ? nameElement.textContent.trim() : 'Unnamed Item';

        const priceText = product.querySelector('.price')?.textContent || '$0';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showCartPopup(name);
        updateCartIndicator();
      });
    }
  });

  updateCartIndicator();
});
