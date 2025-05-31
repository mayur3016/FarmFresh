
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addProductForm');
  const fileInput = document.getElementById('productImage');
  const preview = document.getElementById('imagePreview');

  if (!form) return;

  // Preview image
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      preview.style.display = 'none';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const imageFile = fileInput.files[0];

    if (!name || !description || isNaN(price) || isNaN(stock)) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const newProduct = { name, description, price, stock };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newProduct.image = e.target.result;
        saveProduct(newProduct);
      };
      reader.readAsDataURL(imageFile);
    } else {
      newProduct.image = '';
      saveProduct(newProduct);
    }
  });

  function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
    products.push(product);
    localStorage.setItem('farmerProducts', JSON.stringify(products));
    alert('Product added successfully!');
    form.reset();
    preview.src = '';
    preview.style.display = 'none';
  }
});


 







    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('addProductForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const image = document.getElementById('productImage').value.trim();

        if (!name || !description || isNaN(price) || isNaN(stock)) {
          alert('Please fill out all required fields correctly.');
          return;
        }

        const newProduct = { name, description, price, stock, image };
        const existing = JSON.parse(localStorage.getItem('farmerProducts')) || [];
        existing.push(newProduct);
        localStorage.setItem('farmerProducts', JSON.stringify(existing));

        alert('Product added successfully!');
        form.reset();
      });
    });
