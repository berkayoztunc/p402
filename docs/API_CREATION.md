# How to Create a P402 API

Learn how to register and monetize your APIs using P402's payment gateway infrastructure.

## 📋 Prerequisites

Before creating an API:
- ✅ Connected wallet account (see [How to Create an Account](./ACCOUNT_CREATION.md))
- ✅ An existing API endpoint you want to monetize
- ✅ Basic understanding of HTTP APIs
- ✅ A wallet address to receive payments

## 🎯 What is a P402 API?

When you register an API with P402, you create a **paid proxy endpoint** that:
- Forwards requests to your actual API
- Automatically collects payment before each request
- Returns responses from your API to the client
- Tracks usage and generates revenue statistics

## 🚀 Creating Your First API

### Step 1: Access the Dashboard

1. Navigate to P402 and connect your wallet
2. Click **"Dashboard"** in the navigation menu
3. Click the **"Add New API"** button

### Step 2: Fill in API Details

You'll need to provide:

#### **API Name** (required)
- A descriptive name for your API
- Example: "Weather Data API" or "Stock Price Service"

#### **Description** (required)
- Brief explanation of what your API does
- Visible to potential users in the marketplace
- Example: "Real-time weather data for any location worldwide"

#### **Target URL** (required)
- The actual URL of your API endpoint
- Must be a valid HTTP/HTTPS URL
- Example: `https://api.open-meteo.com/v1/forecast`

> **Important**: The target URL is where P402 will forward paid requests. Make sure it's accessible and working.

#### **Price** (required)
- Cost per request in USD
- Format: `$0.001` (dollar sign followed by amount)
- Examples: `$0.001`, `$0.01`, `$1.00`
- Recommended range: $0.001 - $1.00 per request

#### **Payment Network** (required)
- Blockchain network for receiving payments
- Options:
  - `base-sepolia` (testnet, for testing)
  - `ethereum` (mainnet, for production)
  - `solana` (Solana mainnet)

#### **Payment Wallet Address** (required)
- The wallet address where you'll receive payments
- Must match the selected network
- Example (Ethereum): `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1`
- Example (Solana): `7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`

> **Security Tip**: Use a dedicated wallet for receiving API payments to keep finances organized.

### Step 3: Configure Custom Headers (Optional)

If your target API requires authentication or custom headers:

1. Click **"Add Custom Header"**
2. Enter header name (e.g., `Authorization`)
3. Enter header value (e.g., `Bearer your-api-key-here`)
4. Add multiple headers as needed

**Common use cases:**
```json
{
  "Authorization": "Bearer sk-1234567890",
  "X-API-Key": "your-api-key",
  "Content-Type": "application/json"
}
```

> **Security Note**: Headers are stored securely and only used when forwarding requests to your target API. They're never exposed to API consumers.

### Step 4: Add Documentation (Optional)

Help users understand your API:

1. Provide usage examples
2. List available endpoints
3. Describe request/response formats
4. Include rate limits or restrictions

Example documentation:
```
## Weather API

Get real-time weather data for any location.

### Endpoint
GET /api/{your-api-id}?latitude=52.52&longitude=13.41

### Parameters
- latitude: Latitude coordinate (required)
- longitude: Longitude coordinate (required)

### Response
Returns JSON with temperature, humidity, wind speed, etc.
```

### Step 5: Add Tags (Optional)

Categorize your API for discoverability:
- `weather`, `data`, `finance`, `ai`, `blockchain`, etc.
- Multiple tags can be added
- Makes your API easier to find in the marketplace

### Step 6: Review and Register

1. Double-check all information
2. Click **"Register API"**
3. Wait for confirmation

## ✅ After Registration

Once your API is registered, you'll receive:

### Proxy URL
Your monetized API endpoint:
```
https://your-p402-domain.com/api/{api-id}
```

Example:
```
https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000
```

### API ID
A unique UUID for your API:
```
550e8400-e29b-41d4-a716-446655440000
```

### Dashboard Access
- View request statistics
- Monitor revenue
- Update API settings
- Toggle active/inactive status

## 🔧 Managing Your API

### Updating API Settings

1. Go to Dashboard
2. Find your API in the list
3. Click **"Edit"** or the settings icon
4. Modify any field except the API ID
5. Click **"Save Changes"**

### Activating/Deactivating

- Toggle the **Active** switch in the dashboard
- Inactive APIs won't accept new requests
- Useful for maintenance or testing

### Deleting an API

1. Click **"Delete"** in the API settings
2. Confirm deletion
3. **Warning**: This action cannot be undone!

## 📊 Monitoring Performance

Your dashboard shows:
- **Total Requests**: Number of paid API calls
- **Revenue**: Total earnings from this API
- **Success Rate**: Percentage of successful requests
- **Recent Activity**: Latest request logs

## 💡 Best Practices

### Pricing Strategy
- Start with low prices ($0.001-$0.01) to attract users
- Increase prices as your API proves valuable
- Consider bulk pricing for enterprise clients (contact support)

### Target URL Configuration
- Use stable, production URLs (not localhost!)
- Ensure high uptime and reliability
- Consider using your own CDN or edge infrastructure

### Security
- Rotate API keys regularly if using custom headers
- Monitor for unusual request patterns
- Use rate limiting on your target API

### Documentation
- Keep documentation up to date
- Include code examples in multiple languages
- Provide clear error messages

## 🧪 Testing Your API

Before going live, test your setup:

### Using cURL
```bash
curl -X GET https://your-p402-domain.com/api/{api-id} \
  -H "Content-Type: application/json"
```

### Using JavaScript
```javascript
fetch('https://your-p402-domain.com/api/{api-id}', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Expected Flow
1. Client sends request to P402 proxy URL
2. P402 checks payment (HTTP 402 if unpaid)
3. Payment is processed via blockchain
4. Request is forwarded to your target URL with custom headers
5. Response is returned to client
6. Revenue appears in your dashboard

## ❓ Troubleshooting

### "Invalid URL" error
- Ensure target URL starts with `http://` or `https://`
- Test the URL in a browser first
- Check for typos

### "Invalid Price" error
- Must use format: `$0.001` (dollar sign required)
- No spaces or extra characters
- Decimals are optional but recommended

### API not receiving requests
- Check if API is marked as **Active**
- Verify target URL is accessible
- Test target URL directly (without P402) first

### Payment not received
- Confirm wallet address matches the network
- Check blockchain explorer for transaction
- Payments may take 10-30 seconds to confirm

## 🎯 Next Steps

- Learn [How to Use P402 APIs](./API_USAGE.md) as a consumer
- Explore [Custom Headers Feature](./CUSTOM_HEADERS_FEATURE.md)
- Review [Error Codes](./ERROR_CODES.md) for debugging

## 📈 Advanced Features

### Multiple APIs
- Register unlimited APIs with one account
- Each API can have different pricing
- Separate wallets for each API (optional)

### Enterprise Support
For high-volume APIs:
- Custom rate limits
- Dedicated infrastructure
- Priority support
- Contact us for enterprise plans

---

**Ready to monetize?** Start registering your APIs and turn your code into revenue! 🚀
