# How to Use P402 APIs

A comprehensive guide for developers who want to consume paid APIs through the P402 platform.

## 📋 Overview

P402 APIs work like regular HTTP APIs with one key difference: **you must pay before accessing the endpoint**. This guide explains how to make successful paid API calls.

## 🎯 Prerequisites

- Basic understanding of HTTP requests
- Knowledge of your preferred programming language (JavaScript, Python, cURL, etc.)
- Cryptocurrency wallet with funds on the supported network
- The P402 API endpoint URL you want to use

## 🔍 Finding APIs

### Browse the Marketplace

1. Visit the P402 homepage
2. Navigate to **"Marketplace"** or **"Browse APIs"**
3. View all available APIs with:
   - Name and description
   - Price per request
   - Payment network
   - Owner information

### API Information

For each API, you'll see:
- **API Name**: What the API does
- **Description**: Detailed explanation
- **Price**: Cost per request (e.g., `$0.001`)
- **Network**: Blockchain network (base-sepolia, ethereum, solana)
- **Endpoint**: The proxy URL to call

## 🚀 Making Your First Request

### Step 1: Get the API Endpoint

Each P402 API has a unique URL format:
```
https://your-p402-domain.com/api/{api-id}
```

Example:
```
https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000
```

### Step 2: Make a Request (Without Payment)

Try calling the API without payment to see the payment requirement:

```bash
curl -X GET https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000
```

You'll receive an **HTTP 402 Payment Required** response:

```json
{
  "error": "Payment Required",
  "message": "This API requires payment of $0.001 per request",
  "code": "PAYMENT_REQUIRED",
  "paymentDetails": {
    "price": "$0.001",
    "network": "base-sepolia",
    "facilitatorUrl": "https://facilitator.x402.dev"
  }
}
```

### Step 3: Understanding Payment Flow

P402 uses the **x402 protocol** for automatic payment handling:

1. **Initial Request**: Client calls API → Receives 402 Payment Required
2. **Payment Processing**: Client pays via x402 facilitator
3. **Receipt Token**: Client receives payment proof
4. **Retry Request**: Client resends request with payment proof
5. **Success**: API processes request and returns data

## 💳 Making Paid Requests

### Option 1: Using x402 Client Libraries

The easiest way to use P402 APIs is with x402-compatible HTTP clients:

#### JavaScript/TypeScript (fetch-x402)

```bash
npm install fetch-x402
```

```javascript
import createFetch from 'fetch-x402';

const fetch = createFetch({
  wallet: yourWalletInstance,
  signTransaction: async (tx) => {
    // Sign and send transaction
    return transactionHash;
  }
});

// Make a paid API call (payment handled automatically)
const response = await fetch('https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

#### Python (httpx-x402)

```bash
pip install httpx-x402
```

```python
import httpx_x402

# Configure with your wallet
client = httpx_x402.Client(
    wallet=your_wallet_instance,
    sign_transaction=sign_transaction_function
)

# Make a paid request
response = client.get(
    'https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000',
    headers={'Content-Type': 'application/json'}
)

data = response.json()
print(data)
```

### Option 2: Manual Payment Flow

If you prefer to handle payments manually:

#### Step 1: Get Payment Details

```bash
curl -X GET https://p402.dev/api/{api-id}
```

Response:
```json
{
  "error": "Payment Required",
  "paymentDetails": {
    "price": "$0.001",
    "network": "base-sepolia",
    "facilitatorUrl": "https://facilitator.x402.dev",
    "recipientAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1"
  }
}
```

#### Step 2: Pay via x402 Facilitator

Send a payment request to the facilitator:

```javascript
const paymentResponse = await fetch('https://facilitator.x402.dev/pay', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    amount: '0.001',
    network: 'base-sepolia',
    resource: 'https://p402.dev/api/{api-id}'
  })
});

const { receiptToken } = await paymentResponse.json();
```

#### Step 3: Retry with Payment Proof

```javascript
const apiResponse = await fetch('https://p402.dev/api/{api-id}', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Payment-Receipt': receiptToken
  }
});

const data = await apiResponse.json();
```

## 🔧 Advanced Usage

### Passing Query Parameters

P402 forwards all query parameters to the target API:

```bash
curl -X GET "https://p402.dev/api/{api-id}?latitude=52.52&longitude=13.41"
```

### POST Requests with Body

Send JSON data in request body:

```javascript
const response = await fetch('https://p402.dev/api/{api-id}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Payment-Receipt': receiptToken
  },
  body: JSON.stringify({
    query: 'example data',
    limit: 10
  })
});
```

### Custom Request Headers

Add your own headers (forwarded to target API if allowed):

```bash
curl -X GET https://p402.dev/api/{api-id} \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Custom-Header: value"
```

### Different HTTP Methods

P402 supports all standard HTTP methods:

```javascript
// GET
fetch('https://p402.dev/api/{api-id}', { method: 'GET' })

// POST
fetch('https://p402.dev/api/{api-id}', { method: 'POST', body: data })

// PUT
fetch('https://p402.dev/api/{api-id}', { method: 'PUT', body: data })

// DELETE
fetch('https://p402.dev/api/{api-id}', { method: 'DELETE' })

// PATCH
fetch('https://p402.dev/api/{api-id}', { method: 'PATCH', body: data })
```

## 📊 Response Handling

### Success Response

When payment is valid and request succeeds:

```json
{
  "data": "API response data",
  "status": "success"
}
```

Status Code: **200 OK**

### Error Responses

#### Payment Required (402)
```json
{
  "error": "Payment Required",
  "code": "PAYMENT_REQUIRED",
  "paymentDetails": { ... }
}
```

#### Invalid Payment (402)
```json
{
  "error": "Invalid Payment",
  "code": "INVALID_PAYMENT",
  "message": "Payment verification failed"
}
```

#### API Not Found (404)
```json
{
  "error": "API Not Found",
  "code": "API_NOT_FOUND",
  "message": "The requested API does not exist"
}
```

#### Target API Error (502)
```json
{
  "error": "Target API Failed",
  "code": "TARGET_API_ERROR",
  "message": "The upstream API returned an error"
}
```

See [Error Codes Documentation](./ERROR_CODES.md) for complete list.

## 💡 Best Practices

### 1. Implement Retry Logic

Network issues can happen - implement exponential backoff:

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

### 2. Cache Responses

If the API returns static data, cache it to save costs:

```javascript
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, data);
  return data;
}
```

### 3. Monitor Spending

Track your API usage and costs:

```javascript
let totalSpent = 0;
const pricePerRequest = 0.001;

async function trackableRequest(url) {
  const response = await fetch(url);
  totalSpent += pricePerRequest;
  
  console.log(`Total spent: $${totalSpent.toFixed(3)}`);
  return response;
}
```

### 4. Handle Errors Gracefully

```javascript
try {
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error.code, error.message);
    
    if (error.code === 'PAYMENT_REQUIRED') {
      // Handle payment
    } else if (error.code === 'API_NOT_FOUND') {
      // API doesn't exist
    }
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Network error:', error);
  throw error;
}
```

### 5. Use Environment Variables

Store API endpoints securely:

```javascript
// .env
P402_API_ENDPOINT=https://p402.dev/api/550e8400-e29b-41d4-a716-446655440000

// app.js
const apiUrl = process.env.P402_API_ENDPOINT;
```

## 🧪 Testing

### Testing with Testnets

Before spending real money, test with testnets:

1. Look for APIs on `base-sepolia` network
2. Get testnet tokens from faucets
3. Test your integration thoroughly
4. Switch to mainnet when ready

### Example Test Script

```javascript
async function testApiIntegration() {
  const testCases = [
    { method: 'GET', params: '?test=1' },
    { method: 'POST', body: { data: 'test' } },
    { method: 'GET', params: '?test=2' }
  ];
  
  for (const test of testCases) {
    console.log(`Testing ${test.method}...`);
    
    try {
      const response = await fetch(
        `${apiUrl}${test.params || ''}`,
        {
          method: test.method,
          body: test.body ? JSON.stringify(test.body) : undefined
        }
      );
      
      console.log('✅ Success:', response.status);
    } catch (error) {
      console.error('❌ Failed:', error.message);
    }
  }
}
```

## 📱 Platform-Specific Examples

### Node.js

```javascript
const fetch = require('node-fetch');

async function callP402Api() {
  const response = await fetch('https://p402.dev/api/{api-id}', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
}
```

### Browser (Vanilla JS)

```html
<script>
  async function getData() {
    const response = await fetch('https://p402.dev/api/{api-id}');
    const data = await response.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  }
  
  document.getElementById('fetch-btn').addEventListener('click', getData);
</script>
```

### React

```jsx
import { useState, useEffect } from 'react';

function ApiConsumer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://p402.dev/api/{api-id}');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

### Python

```python
import requests

def call_p402_api():
    url = "https://p402.dev/api/{api-id}"
    headers = {"Content-Type": "application/json"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.json())
        return None

data = call_p402_api()
print(data)
```

## ❓ Troubleshooting

### "Payment Required" keeps appearing
- Ensure you're including the payment receipt token
- Check that payment was successful on blockchain
- Verify you're using the correct network

### "Invalid Payment" error
- Payment may have expired (receipts valid for 10 minutes)
- Amount may be insufficient
- Network mismatch (e.g., paying on Ethereum but API expects Solana)

### Slow response times
- Could be target API latency (not P402)
- Check target API status
- Consider geographic location of servers

### CORS errors in browser
- P402 APIs support CORS by default
- If issues persist, contact API owner
- Use server-side requests as alternative

## 🎯 Next Steps

- Explore [How to Create a P402 API](./API_CREATION.md) if you want to monetize your own APIs
- Learn about [Custom Headers](./CUSTOM_HEADERS_FEATURE.md)
- Review [Error Codes](./ERROR_CODES.md) for debugging

## 💰 Cost Management

### Calculating Costs

```javascript
// Calculate monthly costs
const requestsPerDay = 1000;
const pricePerRequest = 0.001;
const daysPerMonth = 30;

const monthlyCost = requestsPerDay * pricePerRequest * daysPerMonth;
console.log(`Monthly cost: $${monthlyCost}`);
// Output: Monthly cost: $30
```

### Setting Spending Limits

```javascript
const DAILY_LIMIT = 10; // $10 per day
let dailySpent = 0;
let lastResetDate = new Date().toDateString();

async function rateLimitedFetch(url, price) {
  const today = new Date().toDateString();
  
  // Reset daily counter
  if (today !== lastResetDate) {
    dailySpent = 0;
    lastResetDate = today;
  }
  
  // Check limit
  if (dailySpent + price > DAILY_LIMIT) {
    throw new Error('Daily spending limit reached');
  }
  
  const response = await fetch(url);
  dailySpent += price;
  
  return response;
}
```

---

**Happy API consuming!** 🚀 Start building amazing applications with P402's paid APIs.
