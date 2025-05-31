// product.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-box">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">₹${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
        <button class="btn" id="addToCartBtn">Add to Cart</button>
      </div>
    </div>
  `;

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(product);
    alert(`${product.name} added to cart.`);
  });
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
