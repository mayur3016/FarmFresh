// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  updateOrderTotal();

  const placeOrderBtn = document.querySelector(".checkout-button");
  placeOrderBtn.addEventListener("click", handlePlaceOrder);

  const closePopupBtn = document.getElementById("close-popup");
  closePopupBtn.addEventListener("click", () => {
    document.getElementById("order-popup").style.display = "none";
    window.location.href = "/aside/public/shop/order/dashboard-user.html";
  });
});

function updateOrderTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total-amount").textContent = total.toFixed(2);
}

function handlePlaceOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("fullname").value.trim();
  const mobile = document.getElementById("mobile-number").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const zip = document.getElementById("zip").value.trim();

  if (!name || !mobile || !address || !city || !zip) {
    alert("Please fill in all shipping information.");
    return;
  }

  const order = {
    id: Date.now(),
    customer: { name, mobile, address, city, zip },
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  document.getElementById("order-popup").style.display = "flex";
}
