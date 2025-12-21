// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
}

// Initialize the app
function initApp() {
    checkAuth();
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Load current page data
    const path = window.location.pathname;
    if (path.endsWith('dashboard.html')) {
        loadDashboardData();
    } else if (path.endsWith('customers.html')) {
        loadCustomers();
    } else if (path.endsWith('products.html')) {
        loadProducts();
    } else if (path.endsWith('invoices.html')) {
        loadInvoices();
    } else if (path.endsWith('create-invoice.html')) {
        initInvoiceForm();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Sample data storage (in a real app, this would be a database)
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

// Save data to localStorage
function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

// Format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// Generate random ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}