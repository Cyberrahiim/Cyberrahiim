// Load products
function loadProducts() {
    const productTable = document.getElementById('productTable');
    if (!productTable) return;
    
    const tbody = productTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn-edit" data-id="${product.id}">Edit</button>
                <button class="btn-delete" data-id="${product.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            editProduct(id);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            deleteProduct(id);
        });
    });
}

// Add new product
function addProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    
    if (name && !isNaN(price)) {
        const newProduct = {
            id: generateId(),
            name,
            description,
            price,
            stock
        };
        
        products.push(newProduct);
        saveData();
        loadProducts();
        
        // Reset form
        e.target.reset();
    } else {
        alert('Name and valid price are required');
    }
}

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const newName = prompt('Enter new name', product.name);
    if (newName) {
        product.name = newName;
        const newDesc = prompt('Enter new description', product.description || '');
        product.description = newDesc;
        const newPrice = parseFloat(prompt('Enter new price', product.price));
        if (!isNaN(newPrice)) {
            product.price = newPrice;
            const newStock = parseInt(prompt('Enter new stock', product.stock || 0));
            if (!isNaN(newStock)) {
                product.stock = newStock;
                
                saveData();
                loadProducts();
            }
        }
    }
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveData();
        loadProducts();
    }
}

// Initialize product form
function initProductForm() {
    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', addProduct);
    }
}