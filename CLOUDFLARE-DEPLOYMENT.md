# Cloudflare Pages Deployment Guide

This guide will walk you through deploying your BlueJay Uniform website to Cloudflare Pages for free hosting with SSL.

## Why Cloudflare Pages?

- **Free hosting** with unlimited bandwidth
- **Automatic SSL/HTTPS** (required by Square)
- **Global CDN** for fast loading worldwide
- **Automatic deployments** from GitHub
- **Zero configuration** needed for static sites

---

## Step-by-Step Deployment

### Step 1: Create Cloudflare Account

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **Sign Up** (or **Log In** if you have an account)
3. Create a free account using your email
4. Verify your email address

### Step 2: Connect to GitHub

1. Once logged in, click **Create a project**
2. Click **Connect to Git**
3. Select **GitHub** as your Git provider
4. Click **Connect GitHub** button
5. Authorize Cloudflare Pages to access your GitHub account
6. You may be asked to select which repositories to give access to:
   - Choose "Only select repositories"
   - Select **BlueJUniformSite**
   - Click **Install & Authorize**

### Step 3: Configure Your Project

1. You'll see a list of your repositories
2. Find **BlueJUniformSite** and click **Begin setup**

3. **Configure your deployment:**
   - **Project name**: `bluejay-uniform` (or choose your own)
   - **Production branch**: `main`
   - **Framework preset**: Select **None** (it's a static site)
   - **Build command**: Leave empty
   - **Build output directory**: `/` (root directory)

4. Click **Save and Deploy**

### Step 4: Wait for Deployment

1. Cloudflare will now deploy your site
2. This usually takes 1-3 minutes
3. You'll see a progress indicator
4. Once complete, you'll see "Success! Your site is live!"

### Step 5: Access Your Site

1. You'll be given a Cloudflare URL like:
   ```
   https://bluejay-uniform.pages.dev
   ```
   Or:
   ```
   https://bluejay-uniform-abc.pages.dev
   ```

2. Click the link to visit your live site!

---

## Setting Up a Custom Domain (Optional)

If you want to use a custom domain like `bluejayuniform.com`:

### Step 1: Purchase a Domain

1. Buy a domain from any registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. Or use an existing domain you own

### Step 2: Add Custom Domain in Cloudflare

1. In your Cloudflare Pages project, go to **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `bluejayuniform.com`)
4. Click **Continue**

### Step 3: Update DNS Settings

1. Cloudflare will show you DNS records to add
2. Go to your domain registrar's DNS settings
3. Add the DNS records provided by Cloudflare:
   - Usually a CNAME record pointing to your pages.dev domain
   - Or A/AAAA records if using root domain

4. DNS changes can take 1-48 hours to propagate (usually 1-2 hours)

5. Once propagated, your site will be accessible at your custom domain!

---

## Switching to Production Mode

Currently, your site is using Square's **sandbox** (test mode). When you're ready to accept real payments:

### Step 1: Update config.js

1. Go to your GitHub repository
2. Open `config.js`
3. Click the pencil icon to edit
4. Comment out the sandbox configuration (add `/*` before and `*/` after)
5. Uncomment the production configuration (remove `/*` and `*/`)
6. Commit the changes

It should look like this:

```javascript
// SANDBOX CONFIGURATION (for testing)
/*
const SQUARE_CONFIG = {
    applicationId: 'sandbox-sq0idb-n1JcoWnA1kqgl2QIQxl-3w',
    accessToken: 'EAAAl2xUL2eRSXolYlos0NC9ZGZyW3vCHyWPvTAi806U2teqHKunVO0-aLsamhX-',
    locationId: 'LKVPYA8PJ46BR',
    environment: 'sandbox'
};
*/

// PRODUCTION CONFIGURATION (uncomment when ready to go live)
const SQUARE_CONFIG = {
    applicationId: 'sq0idp-6Jw7_b_BqZWuOicdFvvkWQ',
    accessToken: 'EAAAl8GwNZpHVufsBPfARJoTR1cOvz0betj0Z8rHNBNCCNFljRsi9UUENruzrLKC',
    locationId: 'LKVPYA8PJ46BR',
    environment: 'production'
};
```

### Step 2: Update Square SDK

1. Open `checkout.html` in GitHub
2. Find the line with Square SDK:
   ```html
   <script type="text/javascript" src="https://sandbox.web.squarecdn.com/v1/square.js"></script>
   ```
3. Change it to:
   ```html
   <script type="text/javascript" src="https://web.squarecdn.com/v1/square.js"></script>
   ```
4. Commit the changes

### Step 3: Automatic Deployment

- Cloudflare will automatically detect the GitHub changes
- It will rebuild and redeploy your site
- Wait 1-3 minutes for the deployment to complete
- Your site is now in production mode!

---

## Important: Backend for Production Payments

**CRITICAL SECURITY NOTE:**

The current implementation is suitable for testing but **NOT** for production use. For actual payment processing, you need a backend server because:

1. **Security**: Never expose your access token in frontend JavaScript
2. **PCI Compliance**: Payment processing should happen server-side
3. **Fraud Prevention**: Backend validation is essential

### Two Options for Production:

#### Option 1: Cloudflare Workers (Recommended - Stay on Cloudflare)

Cloudflare Workers can act as your backend:

1. Create a Cloudflare Worker
2. Move your Square API logic to the Worker
3. Store sensitive credentials as environment variables
4. Update your frontend to call the Worker API

Example Worker code:
```javascript
export default {
  async fetch(request, env) {
    const { sourceId, amount, customer } = await request.json();

    const response = await fetch('https://connect.squareup.com/v2/payments', {
      method: 'POST',
      headers: {
        'Square-Version': '2023-10-18',
        'Authorization': `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source_id: sourceId,
        amount_money: {
          amount: amount,
          currency: 'USD'
        },
        location_id: env.SQUARE_LOCATION_ID
      })
    });

    return response;
  }
}
```

#### Option 2: External Backend Service

Use a backend service like:
- **Heroku** (free tier available)
- **Railway** (free tier available)
- **AWS Lambda** (free tier available)
- **Vercel Serverless Functions** (free tier available)

See `README.md` for complete backend implementation examples.

---

## Automatic Updates

Every time you push changes to GitHub:

1. Cloudflare automatically detects the changes
2. Rebuilds your site
3. Deploys the new version
4. Usually completes in 1-3 minutes

You can see all deployments in the Cloudflare Pages dashboard.

---

## Monitoring and Analytics

### View Deployment Status

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Click **Deployments** to see all deployments
4. Green checkmark = successful
5. Red X = failed (check logs for details)

### Enable Analytics (Optional)

1. In your project, go to **Web Analytics** tab
2. Click **Enable Web Analytics**
3. Add the analytics script to your HTML if needed
4. View visitor statistics, page views, etc.

---

## Troubleshooting

### Site Not Loading
- Check deployment status in Cloudflare dashboard
- Ensure all files were committed to GitHub
- Check browser console for errors

### Payment Issues
- Make sure you're using the correct environment (sandbox vs production)
- Verify Square credentials are correct
- Check that Location ID is accurate
- Test with valid test cards (see SETUP.html)

### Custom Domain Not Working
- DNS changes can take up to 48 hours
- Verify DNS records are correctly configured
- Clear browser cache
- Try accessing in incognito/private mode

### Site Shows Old Version
- Cloudflare Pages has automatic deployments
- Check that your changes were pushed to GitHub
- Check deployment logs in Cloudflare dashboard
- Clear browser cache or use hard refresh (Ctrl+Shift+R)

---

## Costs

### Cloudflare Pages
- **Free**: Unlimited sites, unlimited bandwidth
- **Pro** ($20/month): Advanced features (not needed for most sites)

### Square Fees
- **2.9% + 30¢** per online transaction
- No monthly fees
- No setup fees

### Custom Domain (Optional)
- **$10-15/year** for a .com domain
- Varies by registrar and domain extension

---

## Security Checklist

Before going live with real payments:

- [ ] Switch to production Square credentials
- [ ] Update Square SDK to production URL
- [ ] Implement backend payment processing
- [ ] Store access tokens as environment variables (not in code)
- [ ] Test all payment flows thoroughly
- [ ] Verify SSL/HTTPS is working
- [ ] Set up error logging
- [ ] Create privacy policy page
- [ ] Create terms of service page
- [ ] Test on multiple devices and browsers

---

## Next Steps

1. ✅ Deploy to Cloudflare Pages (follow steps above)
2. ✅ Test the site with sandbox mode
3. ⚠️ Implement backend for production payments
4. ✅ Switch to production mode
5. 🎉 Start accepting real orders!

---

## Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Square Developer Documentation](https://developer.squareup.com/)
- [Your GitHub Repository](https://github.com/OmarShahwanGitHub/BlueJUniformSite)

---

## Quick Reference Commands

### View your site status:
```bash
git status
```

### Make changes and deploy:
```bash
git add .
git commit -m "Your change description"
git push
```

Cloudflare will automatically deploy your changes!

---

**Ready to deploy?** Follow Step 1 above to get started! 🚀
