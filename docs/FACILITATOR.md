# P402 Facilitator Guide

## Overview

The P402 platform manages blockchain-based payment operations using its dedicated **Facilitator** service. The Facilitator acts as a critical bridge that enables API users to make payments and API owners to receive them.

## What is a Facilitator?

The Facilitator is a central component of the x402 protocol and performs the following key tasks:

- 🔐 **Payment Verification**: Validates payment requests  
- 📝 **Transaction Creation**: Constructs blockchain transactions  
- ⚡ **Payment Settlement**: Transfers payments to API owners  
- 🛡️ **Security**: Ensures secure transaction management  

## P402’s Custom Facilitator

P402 uses its **own facilitator service**:

```
https://facilitator.p402.store
```

### Why a Custom Facilitator?

✅ **Full Control**: Complete control over the platform  
✅ **Custom Logic**: Ability to customize business logic  
✅ **Performance**: Optimized for speed and efficiency  
✅ **Reliability**: Guaranteed high availability  
✅ **Cost Optimization**: Better cost management  

## Architecture

```
┌─────────────┐
│   Client    │
│  (Wallet)   │
└──────┬──────┘
       │ 1. API Request
       │
       ▼
┌─────────────┐
│  P402 API   │
│ Middleware  │
└──────┬──────┘
       │ 2. Payment Required (402)
       │ + Facilitator URL
       │
       ▼
┌─────────────┐
│ Facilitator │ ◄─── https://facilitator.p402.store
│   (P402)    │
└──────┬──────┘
       │ 3. Create Transaction
       │ 4. Verify Payment
       │
       ▼
┌─────────────┐
│ Blockchain  │
│   (Solana)  │
└─────────────┘
```

## How It Works

### 1. API Request Flow

A user sends a request to a P402 API:

```bash
curl https://p402.store/api/YOUR_API_ID/endpoint
```

### 2. Payment Required Response

If the endpoint requires payment, it returns a `402 Payment Required` response:

```json
{
  "statusCode": 402,
  "message": "Payment Required",
  "paymentRequirements": {
    "network": "solana",
    "asset": "So11111111111111111111111111111111111111112",
    "maxAmountRequired": "1000000",
    "payTo": "API_OWNER_WALLET_ADDRESS",
    "extra": {
      "feePayer": "FACILITATOR_FEE_PAYER_WALLET"
    }
  },
  "facilitatorUrl": "https://facilitator.p402.store"
}
```

### 3. Processing the Payment

The client sends a payment request to the facilitator:

```javascript
const paymentResponse = await fetch('https://facilitator.p402.store/pay', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    paymentRequirements: paymentRequirements,
    payerAddress: wallet.publicKey.toString()
  })
});

const { transaction } = await paymentResponse.json();
```

### 4. Signing and Verifying the Transaction

The client signs the transaction and sends it for verification:

```javascript
// Sign the transaction
const signedTx = await wallet.signTransaction(transaction);

// Send for verification
const verifyResponse = await fetch('https://facilitator.p402.store/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    transaction: signedTx.serialize()
  })
});

const { proof } = await verifyResponse.json();
```

### 5. Accessing the API with Proof

Now the client can access the API using the payment proof:

```javascript
const apiResponse = await fetch('https://p402.store/api/YOUR_API_ID/endpoint', {
  headers: {
    'X-Payment-Proof': proof
  }
});
```

## Configuration

### Environment Variables

The P402 platform defines the facilitator URL as an environment variable:

```env
FACILITATOR_URL=https://facilitator.p402.store
```

### Worker Configuration

Defined in `worker-configuration.d.ts`:

```typescript
interface Env {
  FACILITATOR_URL: string;
  // ... other settings
}
```

### Payment Middleware

Used in `src/payment-middleware.ts` and `src/index.ts`:

```typescript
const middleware = createDynamicPaymentMiddleware(c.env.DB, {
  facilitatorUrl: c.env.FACILITATOR_URL as Resource,
  paymentAddress: c.env.PAYMENT_ADDRESS,
  network: c.env.NETWORK,
});
```

## Supported Networks

P402 Facilitator supports the following networks:

| Network | Status | Asset |
|----------|---------|--------|
| Solana Mainnet | ✅ Active | SOL, SPL Tokens |
| Solana Devnet | ✅ Active | SOL (Test) |

## Payment Requirements Structure

Each API defines its payment requirements dynamically:

```typescript
interface PaymentRequirements {
  network: 'solana';
  asset: string;              // Token mint address
  maxAmountRequired: string;  // Lamports / smallest unit
  payTo: string;              // API owner’s wallet
  extra: {
    feePayer: string;         // Facilitator’s fee payer wallet
  };
}
```

## Security Features

🔒 **Transaction Verification**: Every transaction is verified on-chain  
🔒 **Proof-Based Access**: Access is granted using cryptographic proof  
🔒 **Fee Payer Protection**: Keeps the facilitator’s fee payer wallet secure  
🔒 **Network Validation**: Address formats are validated per network  

## Error Handling

Common facilitator-related errors:

| Error Code | Description | Solution |
|-------------|--------------|-----------|
| `FACILITATOR_ERROR` | Facilitator service not responding | Try again later |
| `INVALID_PAYMENT_ADDRESS` | Invalid payment address | Check the wallet address |
| `PAYMENT_VERIFICATION_FAILED` | Payment verification failed | Resubmit the transaction |
| `INSUFFICIENT_FUNDS` | Insufficient balance | Add more SOL to your wallet |

## Benefits for API Owners

✨ **Automatic Payment Collection**: Payments are collected automatically  
✨ **No Extra Integration**: Works out of the box  
✨ **Multi-Network Support**: Supports multiple blockchain networks  
✨ **Instant Settlement**: Real-time payment transfers  
✨ **Low Fees**: Optimized transaction costs  

## Benefits for API Users

✨ **Secure Payments**: Safe and verified payment process  
✨ **Fast Transactions**: Quick transaction times  
✨ **Transparent Pricing**: Clear and predictable costs  
✨ **Multi-Wallet Support**: Compatible with various wallets  
✨ **Easy Integration**: Simple setup using x402 SDK  

## Client Integration

### Using x402 SDK

```bash
npm install x402
```

```javascript
import { X402Client } from 'x402';

const client = new X402Client({
  wallet: yourSolanaWallet,
  facilitatorUrl: 'https://facilitator.p402.store'
});

// Make a paid API request
const response = await client.request('https://p402.store/api/YOUR_API_ID/endpoint');
```

### Manual Integration

To use the facilitator manually, follow the steps in the “How It Works” section above.

## Monitoring and Logs

The P402 platform logs all facilitator operations:

```typescript
console.log("Using payment config for API:", {
  owner_address: api.owner_address,
  facilitator: {
    url: config.facilitatorUrl,
  }
});
```

## Upcoming Features

🚀 **Multi-Chain Support**: Ethereum, Polygon, and more  
🚀 **Advanced Analytics**: Transaction analytics and reporting  
🚀 **Custom Fee Models**: Configurable fee structures  
🚀 **WebSocket Support**: Real-time payment notifications  

## Support

If you encounter issues with the Facilitator:

- 📧 Email: support@p402.store  
- 🐛 GitHub Issues: [p402/issues](https://github.com/berkayoztunc/p402/issues)  
- 📖 Full Documentation: [P402 Docs](https://p402.store/documentation)  

## Related Documentation

- [API Creation Guide](./API_CREATION.md)  
- [API Usage Guide](./API_USAGE.md)  
- [Solana Authentication](./SOLANA_AUTH_GUIDE.md)  
- [Error Codes](./ERROR_CODES.md)  

---

**Note:** The P402 Facilitator is continuously updated and improved. Check the documentation regularly for the latest information.
