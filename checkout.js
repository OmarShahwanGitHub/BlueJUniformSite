// Checkout page logic with Square Web Payments SDK

let payments;
let card;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', async () => {
    // Load cart from localStorage
    const cartData = localStorage.getItem('bluejay-cart');
    const cartItems = cartData ? JSON.parse(cartData) : [];

    if (cartItems.length === 0) {
        // Redirect to store if cart is empty
        alert('Your cart is empty. Redirecting to store...');
        window.location.href = 'index.html';
        return;
    }

    // Render order summary
    renderOrderSummary(cartItems);

    // Initialize Square Payments
    await initializeSquarePayments();
});

// Render order summary
function renderOrderSummary(items) {
    const orderSummary = document.getElementById('orderSummary');
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    orderSummary.innerHTML = items.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <p class="order-item-details">${item.variation} × ${item.quantity}</p>
            </div>
            <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');

    document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkoutTax').textContent = formatPrice(tax);
    document.getElementById('checkoutTotal').textContent = formatPrice(total);
}

// Initialize Square Payments SDK
async function initializeSquarePayments() {
    try {
        if (!window.Square) {
            throw new Error('Square.js failed to load properly');
        }

        // Initialize Square Payments
        payments = window.Square.payments(
            SQUARE_CONFIG.applicationId,
            SQUARE_CONFIG.locationId
        );

        // Initialize Card Payment
        try {
            card = await payments.card();
            await card.attach('#card-container');

            // Setup payment button
            const cardButton = document.getElementById('card-button');
            cardButton.addEventListener('click', handlePaymentMethodSubmission);

            // Enable the payment button
            cardButton.disabled = false;

        } catch (e) {
            console.error('Initializing Card failed', e);
            showPaymentMessage('Failed to initialize payment form. Please check your Square configuration.', 'error');
        }

    } catch (error) {
        console.error('Square Payments initialization failed:', error);
        showPaymentMessage('Failed to load payment system. Please refresh and try again.', 'error');
    }
}

// Handle payment submission
async function handlePaymentMethodSubmission(event) {
    event.preventDefault();

    const cardButton = document.getElementById('card-button');
    cardButton.disabled = true;
    cardButton.textContent = 'Processing...';

    // Get customer information
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();

    if (!customerName || !customerEmail) {
        showPaymentMessage('Please fill in all required fields.', 'error');
        cardButton.disabled = false;
        cardButton.textContent = 'Pay Now';
        return;
    }

    try {
        // Tokenize the card
        const result = await card.tokenize();

        if (result.status === 'OK') {
            // Get cart data
            const cartData = localStorage.getItem('bluejay-cart');
            const cartItems = cartData ? JSON.parse(cartData) : [];
            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * TAX_RATE;
            const total = subtotal + tax;

            // In a production environment, you would send this to your backend server
            // which would then process the payment with Square
            const paymentData = {
                sourceId: result.token,
                amount: Math.round(total * 100), // Amount in cents
                currency: 'USD',
                customer: {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone
                },
                items: cartItems
            };

            // For now, we'll simulate the payment process
            // YOU NEED TO IMPLEMENT A BACKEND SERVER TO PROCESS THIS
            await processPayment(paymentData);

        } else {
            let errorMessage = 'Payment failed. Please check your card details.';
            if (result.errors) {
                errorMessage = result.errors.map(error => error.message).join(', ');
            }
            showPaymentMessage(errorMessage, 'error');
            cardButton.disabled = false;
            cardButton.textContent = 'Pay Now';
        }

    } catch (e) {
        console.error('Payment error:', e);
        showPaymentMessage('An error occurred during payment. Please try again.', 'error');
        cardButton.disabled = false;
        cardButton.textContent = 'Pay Now';
    }
}

// Process payment (this should be done on your backend server)
async function processPayment(paymentData) {
    // IMPORTANT: This is a simulated payment process
    // In production, you MUST send this data to your backend server
    // Your backend should use the Square Payments API to process the payment

    console.log('Payment data (send this to your backend):', paymentData);

    // Simulating backend API call
    showPaymentMessage(
        'DEMO MODE: Payment processing simulated. In production, implement a backend server to process payments with Square API.',
        'error'
    );

    // For demonstration purposes only:
    setTimeout(() => {
        // Show success message
        showPaymentMessage(
            'Payment successful! Thank you for your order. (DEMO MODE - No actual payment processed)',
            'success'
        );

        // Clear cart after successful payment
        setTimeout(() => {
            localStorage.removeItem('bluejay-cart');
            alert('Order complete! Redirecting to store...');
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
}

// Show payment message
function showPaymentMessage(message, type) {
    const messageElement = document.getElementById('payment-message');
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Backend implementation guide
/*
IMPORTANT: To process actual payments, you need to implement a backend server.

Here's a sample Node.js backend implementation:

```javascript
const express = require('express');
const { Client, Environment } = require('square');

const app = express();
app.use(express.json());

// Initialize Square client
const client = new Client({
  accessToken: 'YOUR_ACCESS_TOKEN',
  environment: Environment.Sandbox // or Environment.Production
});

app.post('/process-payment', async (req, res) => {
  const { sourceId, amount, customer, items } = req.body;

  try {
    const { result } = await client.paymentsApi.createPayment({
      sourceId: sourceId,
      amountMoney: {
        amount: amount,
        currency: 'USD'
      },
      locationId: 'YOUR_LOCATION_ID',
      note: `Order from ${customer.name}`,
      referenceId: `order-${Date.now()}`
    });

    res.json({ success: true, payment: result.payment });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Then update the processPayment function to call your backend:

```javascript
async function processPayment(paymentData) {
    const response = await fetch('YOUR_BACKEND_URL/process-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    });

    const result = await response.json();

    if (result.success) {
        showPaymentMessage('Payment successful! Thank you for your order.', 'success');
        localStorage.removeItem('bluejay-cart');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        throw new Error(result.error);
    }
}
```
*/
