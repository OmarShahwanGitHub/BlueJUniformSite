// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartDisplay();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('bluejay-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('bluejay-cart', JSON.stringify(this.items));
        this.updateCartDisplay();
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                variation: product.variation,
                price: product.price,
                quantity: 1
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        
        // Update cart modal content if it's currently open
        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.classList.contains('active')) {
            this.renderCartModal();
        }
    }

    // Update item quantity
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
            
            // Update cart modal content if it's currently open
            const cartModal = document.getElementById('cartModal');
            if (cartModal && cartModal.classList.contains('active')) {
                this.renderCartModal();
            }
        }
    }

    // Get cart total
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get tax amount
    getTax() {
        return this.getSubtotal() * TAX_RATE;
    }

    // Get grand total
    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Update cart display
    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    // Show notification
    showNotification(message) {
        // Simple notification - you can enhance this with a better UI
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Render cart modal content
    renderCartModal() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartTax = document.getElementById('cartTax');
        const cartGrandTotal = document.getElementById('cartGrandTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutBtn.disabled = true;
            if (cartTotal) cartTotal.textContent = '$0.00';
            if (cartTax) cartTax.textContent = '$0.00';
            if (cartGrandTotal) cartGrandTotal.textContent = '$0.00';
            return;
        }

        checkoutBtn.disabled = false;

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.variation} - ${formatPrice(item.price)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-btn" onclick="cart.removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('');

        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const total = this.getTotal();

        if (cartTotal) cartTotal.textContent = formatPrice(subtotal);
        if (cartTax) cartTax.textContent = formatPrice(tax);
        if (cartGrandTotal) cartGrandTotal.textContent = formatPrice(total);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart
const cart = new ShoppingCart();
