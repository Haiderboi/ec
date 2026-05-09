// Shopping Cart Management System
// Handles all cart operations with localStorage persistence

class ShoppingCart {
    constructor() {
        this.TAX_RATE = 0.10; // 10% tax
        this.SHIPPING_COST = 5.00; // Flat $5 shipping
        this.cart = this.loadCart();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('ec-shop-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error('Error loading cart:', e);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('ec-shop-cart', JSON.stringify(this.cart));
            this.updateCartUI();
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Product not found:', productId);
            return false;
        }

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Get cart items
    getItems() {
        return this.cart;
    }

    // Get cart item count
    getItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart total quantity
    getTotalQuantity() {
        return this.cart.length;
    }

    // Calculate subtotal
    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calculate tax
    getTax() {
        return this.getSubtotal() * this.TAX_RATE;
    }

    // Get shipping cost
    getShipping() {
        return this.cart.length > 0 ? this.SHIPPING_COST : 0;
    }

    // Calculate grand total
    getTotal() {
        return this.getSubtotal() + this.getTax() + this.getShipping();
    }

    // Get order summary for checkout
    getOrderSummary() {
        return {
            items: this.cart,
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            shipping: this.getShipping(),
            total: this.getTotal(),
            itemCount: this.getItemCount(),
            timestamp: new Date().toISOString()
        };
    }

    // Update UI elements
    updateCartUI() {
        this.updateCartCount();
        this.updateCartPage();
    }

    // Update cart count in header
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        
        cartCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline' : 'none';
        });
    }

    // Update cart page display
    updateCartPage() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Start shopping!</p>';
            return;
        }

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100x100?text=${encodeURIComponent(item.name)}'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="category">${item.category}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="cartManager.updateQuantity('${item.id}', parseInt(this.value))">
                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="btn-remove" onclick="cartManager.removeItem('${item.id}')">Remove</button>
            </div>
        `).join('');

        this.updateCartSummary();
    }

    // Update cart summary
    updateCartSummary() {
        const summaryContainer = document.querySelector('.cart-summary');
        if (!summaryContainer) return;

        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const shipping = this.getShipping();
        const total = this.getTotal();

        summaryContainer.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn-checkout" onclick="location.href='checkout.html'" ${this.cart.length === 0 ? 'disabled' : ''}>
                Proceed to Checkout
            </button>
        `;
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Format order for WhatsApp
    formatOrderForWhatsApp(customerInfo) {
        const summary = this.getOrderSummary();
        let message = `🛍️ *New Order from EC Shop*\n\n`;
        
        message += `👤 *Customer Details*\n`;
        message += `Name: ${customerInfo.fullname}\n`;
        message += `Email: ${customerInfo.email}\n`;
        message += `Phone: ${customerInfo.phone}\n`;
        message += `Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}\n`;
        message += `Country: ${customerInfo.country}\n\n`;
        
        message += `📦 *Order Items*\n`;
        summary.items.forEach(item => {
            message += `• ${item.name}\n`;
            message += `  Qty: ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
        });
        
        message += `\n💰 *Order Total*\n`;
        message += `Subtotal: $${summary.subtotal.toFixed(2)}\n`;
        message += `Tax (10%): $${summary.tax.toFixed(2)}\n`;
        message += `Shipping: $${summary.shipping.toFixed(2)}\n`;
        message += `*Grand Total: $${summary.total.toFixed(2)}*\n\n`;
        
        if (customerInfo.notes) {
            message += `📝 *Special Instructions*\n${customerInfo.notes}\n\n`;
        }
        
        message += `Thank you for your order! 🎉`;
        
        return message;
    }

    // Send order to WhatsApp
    sendToWhatsApp(customerInfo) {
        const message = this.formatOrderForWhatsApp(customerInfo);
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the message
        // You can replace the phone number with your actual WhatsApp business number
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
        
        // Save order to Supabase (if configured)
        this.saveOrderToDatabase(customerInfo);
        
        // Clear cart after successful order
        setTimeout(() => {
            this.clearCart();
        }, 1000);
    }

    // Save order to database
    async saveOrderToDatabase(customerInfo) {
        const summary = this.getOrderSummary();
        const orderData = {
            customer_name: customerInfo.fullname,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone,
            customer_address: customerInfo.address,
            customer_city: customerInfo.city,
            customer_state: customerInfo.state,
            customer_zip: customerInfo.zip,
            customer_country: customerInfo.country,
            items: JSON.stringify(summary.items),
            subtotal: summary.subtotal,
            tax: summary.tax,
            shipping: summary.shipping,
            total: summary.total,
            notes: customerInfo.notes || '',
            status: 'pending',
            created_at: new Date().toISOString()
        };

        try {
            if (typeof saveOrderToSupabase !== 'undefined') {
                await saveOrderToSupabase(customerInfo, summary.items, summary);
                console.log('Order saved to Supabase');
            }
        } catch (error) {
            console.error('Error saving order to database:', error);
        }
    }
}

// Initialize cart manager globally
let cartManager = new ShoppingCart();

// Add to cart function (called from product cards)
function addToCart(productId) {
    cartManager.addItem(productId, 1);
}

// Update cart on page load
document.addEventListener('DOMContentLoaded', function() {
    cartManager.updateCartUI();
});

// Log cart status
console.log('Shopping cart initialized');
