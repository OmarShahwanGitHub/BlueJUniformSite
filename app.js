// Main application logic for store page

let currentProducts = [...PRODUCTS];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(currentProducts);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            e.target.classList.add('active');
            
            // Update current category and filter products
            const category = e.target.getAttribute('data-category');
            filterAndRenderProducts(category);
        });
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filterAndRenderProducts();
    });

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    cartBtn.addEventListener('click', () => {
        cart.renderCartModal();
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length > 0) {
            window.location.href = 'checkout.html';
        }
    });
}

// Filter and render products
function filterAndRenderProducts(selectedCategory = null) {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    // Get category from active tab if not provided
    let category = selectedCategory;
    if (!category) {
        const activeTab = document.querySelector('.nav-tab.active');
        category = activeTab ? activeTab.getAttribute('data-category') : 'all';
    }

    let filtered = PRODUCTS;

    // Apply category filter
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }

    // Apply search filter
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.variation.toLowerCase().includes(lowerQuery)
        );
    }

    renderProducts(filtered);
}

// Render products to the grid
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');

    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="loading">No products found</div>';
        return;
    }

    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });

    // Define category order with "Other" at the bottom
    const categoryOrder = ['hijab', 'abaya', 'thawb', 'uniform', 'tunic', 'other'];
    
    // Render products grouped by category in specified order
    let html = '';
    categoryOrder.forEach(category => {
        if (productsByCategory[category] && productsByCategory[category].length > 0) {
            const categoryProducts = productsByCategory[category];
            const categoryName = getCategoryName(category);
            
            html += `
                <div class="category-section">
                    <h2 class="category-header">${categoryName}</h2>
                    <div class="category-products">
                        ${categoryProducts.map(product => `
                            <div class="product-card" data-id="${product.id}">
                                <h3 class="product-name">${product.name}</h3>
                                ${product.variation !== 'Regular' ? `<p class="product-variation">${product.variation}</p>` : ''}
                                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                                <div class="product-price">${formatPrice(product.price)}</div>
                                <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                                    Add to Cart
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });

    productsGrid.innerHTML = html;
}

// Add product to cart
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Category mapping helper
function getCategoryName(category) {
    const categoryNames = {
        'hijab': 'Hijabs & Accessories',
        'abaya': 'Abayas',
        'thawb': 'Thawbs',
        'uniform': 'School Uniforms',
        'tunic': 'Tunics',
        'wholesale': 'Wholesale',
        'other': 'Other Items'
    };
    return categoryNames[category] || category;
}
