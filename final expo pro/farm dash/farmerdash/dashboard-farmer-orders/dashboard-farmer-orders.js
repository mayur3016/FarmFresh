// dashboard-farmer-orders.js

document.addEventListener("DOMContentLoaded", () => {
  renderFarmerOrders();
});

function renderFarmerOrders() {
  const ordersContainer = document.getElementById("orders-container");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const farmerProducts = JSON.parse(localStorage.getItem("farmerProducts")) || [];

  const farmerProductNames = farmerProducts.map(p => p.name.toLowerCase());

  ordersContainer.innerHTML = "";

  let relevantOrders = 0;

  orders.forEach(order => {
    const matchedItems = order.items.filter(item =>
      farmerProductNames.includes(item.name.toLowerCase())
    );

    if (matchedItems.length === 0) return;

    relevantOrders++;

    const card = document.createElement("div");
    card.className = "order-card";

    const itemsHTML = matchedItems
      .map(item => `<p>${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</p>`)
      .join("");

    card.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p><strong>Customer:</strong> ${order.customer.name}</p>
      <p><strong>Mobile:</strong> ${order.customer.mobile}</p>
      <p><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.zip}</p>
      <p><strong>Order Date:</strong> ${order.date}</p>
      <div><strong>Items You Supplied:</strong><br>${itemsHTML}</div>
    `;

    ordersContainer.appendChild(card);
  });

  if (relevantOrders === 0) {
    ordersContainer.innerHTML = "<p>No orders for your products yet.</p>";
  }
}
