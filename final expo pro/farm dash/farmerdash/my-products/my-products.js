document.addEventListener('DOMContentLoaded', () => {
  loadFarmerProducts();
});

function loadFarmerProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];

  if (products.length === 0) {
    productList.innerHTML = '<p style="text-align:center;">No products added yet.</p>';
    return;
  }

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Use placeholder image if none is provided
    const imageUrl = product.image && product.image.trim() !== ''
      ? product.image
      : 'https://via.placeholder.com/300x180?text=No+Image';

    card.innerHTML = `
      <img src="${imageUrl}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Description:</strong> ${product.description || 'N/A'}</p>
      <div class="btn-group">
        <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function editProduct(index) {
  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
  const product = products[index];

  const name = prompt('Product name:', product.name);
  const price = parseFloat(prompt('Price:', product.price));
  const stock = parseInt(prompt('Stock:', product.stock));
  const description = prompt('Description:', product.description || '');
  const image = prompt('Image URL:', product.image || '');

  if (!name || isNaN(price) || isNaN(stock)) return;

  products[index] = { ...product, name, price, stock, description, image };
  localStorage.setItem('farmerProducts', JSON.stringify(products));
  loadFarmerProducts();
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
  if (!confirm(`Delete "${products[index].name}"?`)) return;
  products.splice(index, 1);
  localStorage.setItem('farmerProducts', JSON.stringify(products));
  loadFarmerProducts();
}
