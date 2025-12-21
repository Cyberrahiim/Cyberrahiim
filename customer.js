// Initialize customer page
function initCustomerPage() {
    // Load existing customers
    loadCustomers();
    
    // Add customer button
    document.getElementById('addCustomerBtn').addEventListener('click', () => {
        document.getElementById('customerId').value = '';
        document.getElementById('customerForm').reset();
        document.getElementById('modalTitle').textContent = 'Add New Customer';
        document.getElementById('customerModal').style.display = 'block';
    });
    
    // Close modal buttons
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('customerModal').style.display = 'none';
    });
    
    document.querySelector('.close-modal-btn').addEventListener('click', () => {
        document.getElementById('customerModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('customerModal')) {
            document.getElementById('customerModal').style.display = 'none';
        }
    });
    
    // Customer form submission
    document.getElementById('customerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCustomer();
    });
    
    // Search functionality
    document.getElementById('customerSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#customerTable tbody tr');
        
        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            const phone = row.cells[2].textContent.toLowerCase();
            
            if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Load customers into table
function loadCustomers() {
    const tbody = document.querySelector('#customerTable tbody');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone || '-'}</td>
            <td>
                <button class="btn-edit" data-id="${customer.id}">Edit</button>
                <button class="btn-delete" data-id="${customer.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
        
        // Add event listeners to buttons
        row.querySelector('.btn-edit').addEventListener('click', () => editCustomer(customer.id));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteCustomer(customer.id));
    });
}

// Save customer (add or edit)
function saveCustomer() {
    const id = document.getElementById('customerId').value;
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    if (!name || !email) {
        alert('Name and email are required');
        return;
    }
    
    const customerData = {
        id: id || generateId(),
        name,
        email,
        phone,
        address
    };
    
    if (id) {
        // Update existing customer
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) {
            customers[index] = customerData;
        }
    } else {
        // Add new customer
        customers.push(customerData);
    }
    
    saveData();
    loadCustomers();
    document.getElementById('customerModal').style.display = 'none';
}

// Edit customer
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    
    document.getElementById('customerId').value = customer.id;
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerPhone').value = customer.phone || '';
    document.getElementById('customerAddress').value = customer.address || '';
    
    document.getElementById('modalTitle').textContent = 'Edit Customer';
    document.getElementById('customerModal').style.display = 'block';
}

// Delete customer
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        saveData();
        loadCustomers();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initCustomerPage);