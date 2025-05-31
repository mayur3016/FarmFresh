// dashboard-user.js

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});

function renderOrders() {
  const ordersList = document.getElementById("ordersList");
  const noOrdersMessage = document.getElementById("noOrdersMessage");

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  ordersList.innerHTML = "";
  if (orders.length === 0) {
    noOrdersMessage.style.display = "block";
    return;
  }

  noOrdersMessage.style.display = "none";

  orders.forEach((order, index) => {
    const orderCard = document.createElement("div");
    orderCard.className = "order-card";

    const itemsHTML = order.items
      .map(item => `<li class="order-item">${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</li>`)
      .join("");

    orderCard.innerHTML = `
      <div class="order-header">
        <span>Order #${order.id}</span>
        <span>${order.date}</span>
      </div>
      <div><strong>Shipping to:</strong> ${order.customer.name}, ${order.customer.address}, ${order.customer.city}, ${order.customer.zip}</div>
      <div class="order-items">
        <ul>${itemsHTML}</ul>
      </div>
      <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
      <button class="cancel-order-btn" onclick="cancelOrder(${index})">Cancel Order</button>
    `;

    ordersList.appendChild(orderCard);
  });
}

function cancelOrder(index) {
  if (confirm("Are you sure you want to cancel this order?")) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }
}
