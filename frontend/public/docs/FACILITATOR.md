# P402 Facilitator Guide

## Overview

The P402 platform manages blockchain-based payment operations using its dedicated **Facilitator** service. The Facilitator acts as a critical bridge that enables API users to make payments and API owners to receive them.

## What is a Facilitator?

The Facilitator is a central component of the x402 protocol and performs the following key tasks:

- 🔐 **Payment Verification**: Validates payment requests  
- 📝 **Transaction Creation**: Constructs blockchain transactions  
- ⚡ **Payment Settlement**: Transfers payments to API owners  
- 🛡️ **Security**: Ensures secure transaction management  



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
│ Facilitator │ ◄─── https://____.p402.store
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

## Configuration



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


## Upcoming Features

🚀 **Multi-Chain Support**: Ethereum, Polygon, and more  
🚀 **Advanced Analytics**: Transaction analytics and reporting  
🚀 **Custom Fee Models**: Configurable fee structures  
🚀 **WebSocket Support**: Real-time payment notifications  

## Support

If you encounter issues with the Facilitator:

- 📧 Email: support@p402.store  

## Related Documentation

- [API Creation Guide](./API_CREATION.md)  
- [API Usage Guide](./API_USAGE.md)  
- [Solana Authentication](./SOLANA_AUTH_GUIDE.md)  
- [Error Codes](./ERROR_CODES.md)  

---

**Note:** The P402 Facilitator is continuously updated and improved. Check the documentation regularly for the latest information.
