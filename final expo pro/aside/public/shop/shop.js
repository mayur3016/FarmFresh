// shop.js

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const products = JSON.parse(localStorage.getItem('products')) || getSampleProducts();

  // Render product cards
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <a href="/aside/public/shop/product-detail/product-detail.html?id=${product.id}" class="btn">View Details</a>
    </div>
  `).join('');
});

// Sample products fallback
function getSampleProducts() {
  const sample = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 45.00,
      image: "/aside/public/images/products/tomatoes.jpg",
      description: "Fresh, juicy, and pesticide-free tomatoes from local farms."
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 25.00,
      image: "/aside/public/images/products/spinach.jpg",
      description: "Leafy green spinach, rich in iron and vitamins."
    },
    {
      id: 3,
      name: "Golden Mangoes",
      price: 90.00,
      image: "/aside/public/images/products/mango.jpg",
      description: "Naturally ripened sweet mangoes, directly from the orchard."
    }
  ];
  localStorage.setItem('products', JSON.stringify(sample));
  return sample;
}
