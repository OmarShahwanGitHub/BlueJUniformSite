# BlueJay Uniform - Point of Sale Website

A modern e-commerce website for BlueJ Uniform, a Tampa-based business specializing in Islamic uniforms and apparel for schools like Universal Academy of Florida, Bayaan Academy, and Hifz Academy.

## Features

- Product catalog with filtering and search
- Shopping cart with persistent storage
- Square payment integration
- Responsive design for mobile and desktop
- Tax calculation (7.5% for Tampa, FL)
- Professional design with brand colors

## Setup Instructions

### 1. Square Configuration

Before deploying, you need to configure your Square account:

1. **Get your Location ID:**
   - Log in to your [Square Dashboard](https://squareup.com/dashboard)
   - Go to Account & Settings > Locations
   - Click on your location and copy the Location ID

2. **Update config.js:**
   - Open `config.js`
   - Replace `REPLACE_WITH_YOUR_LOCATION_ID` with your actual Location ID
   - For testing, use the sandbox configuration (already configured)
   - For production, uncomment the production section and comment out sandbox

### 2. Testing with Sandbox

The site is currently configured to use Square's sandbox environment for testing.

**Test Card Numbers:**
- Visa: 4111 1111 1111 1111
- Mastercard: 5105 1051 0510 5100
- Discover: 6011 0000 0000 0004
- Expiration: Any future date
- CVV: Any 3 digits
- ZIP: Any 5 digits

### 3. Deploying to Production

#### Option A: Simple Static Hosting (GitHub Pages, Netlify, Vercel)

1. Update `config.js` to use production credentials
2. Update `checkout.html` to use production Square SDK:
   ```html
   <script type="text/javascript" src="https://web.squarecdn.com/v1/square.js"></script>
   ```
3. Deploy the entire folder to your hosting provider

#### Option B: With Backend Server (Recommended for Production)

For actual payment processing, you need a backend server. Here's how:

**Backend Setup (Node.js Example):**

```bash
# Create a new directory for backend
mkdir bluejay-backend
cd bluejay-backend
npm init -y
npm install express square cors dotenv
```

Create `server.js`:
```javascript
const express = require('express');
const { Client, Environment } = require('square');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production'
    ? Environment.Production
    : Environment.Sandbox
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
      locationId: process.env.SQUARE_LOCATION_ID,
      note: `Order from ${customer.name} (${customer.email})`,
      referenceId: `order-${Date.now()}`
    });

    console.log('Payment successful:', result.payment);
    res.json({ success: true, payment: result.payment });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Create `.env`:
```
SQUARE_ACCESS_TOKEN=your_access_token_here
SQUARE_LOCATION_ID=your_location_id_here
SQUARE_ENVIRONMENT=sandbox
```

Update `checkout.js` to call your backend (see comments in the file).

### 4. Project Structure

```
bluejay-uniform/
├── index.html          # Main store page
├── checkout.html       # Checkout page
├── styles.css          # All styling
├── config.js          # Square configuration
├── products.js        # Product catalog
├── cart.js            # Shopping cart logic
├── app.js             # Store page logic
├── checkout.js        # Checkout and payment logic
└── README.md          # This file
```

## Configuration

### config.js

Contains Square API credentials and store settings:
- `applicationId`: Square Application ID
- `accessToken`: Square Access Token
- `locationId`: Square Location ID
- `environment`: 'sandbox' or 'production'
- `TAX_RATE`: Tax rate (7.5% for Tampa)

### products.js

Contains the product catalog parsed from your Square catalog CSV. To update products:
1. Export catalog from Square Dashboard
2. Update the PRODUCTS array in `products.js`

## Customization

### Updating Products

Edit `products.js` to add, remove, or modify products. Each product has:
- `id`: Unique identifier from Square
- `name`: Product name
- `variation`: Size, color, or other variation
- `price`: Price in dollars
- `category`: Category for filtering
- `description`: Product description

### Changing Colors

Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c5aa0;    /* Main blue color */
    --secondary-color: #4a90e2;   /* Lighter blue */
    --accent-color: #1e3a5f;      /* Dark accent */
    /* ... other colors ... */
}
```

### Tax Rate

Update `TAX_RATE` in `config.js` if needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

1. **Never commit access tokens to version control**
2. Use environment variables for sensitive data
3. Implement backend server for production payments
4. Enable HTTPS for production deployment
5. Regularly rotate your Square access tokens

## Support

For Square API documentation:
- [Square Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview)
- [Square API Reference](https://developer.squareup.com/reference/square)

For issues with this website, contact your developer.

## License

Proprietary - BlueJay Uniform © 2025
