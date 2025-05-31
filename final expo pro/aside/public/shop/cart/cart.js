// cart.js

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("checkout-btn").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    window.location.href = "/aside/public/shop/cart/checkout/checkout.html";
  });
});

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${itemTotal.toFixed(2)}</p>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
