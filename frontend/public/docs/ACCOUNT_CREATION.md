# How to Create an Account

Welcome to P402! This guide will walk you through creating your account using blockchain wallet authentication.

## 📋 Prerequisites

Before you begin, you'll need:
- A **Solana wallet** (we recommend [Phantom](https://phantom.app/))
- Basic understanding of wallet message signing
- Internet connection

## 🚀 Account Creation Steps

### Step 1: Install a Solana Wallet

If you don't have a Solana wallet yet:

1. Visit [phantom.app](https://phantom.app/)
2. Download the browser extension for Chrome, Firefox, or Brave
3. Follow the setup wizard to create a new wallet
4. **Important**: Save your recovery phrase securely!

### Step 2: Connect Your Wallet

1. Navigate to the P402 homepage at your deployed URL
2. Click the **"Connect Wallet"** button in the top-right corner
3. Your wallet extension will pop up - click **"Connect"** to allow P402 to view your public address

> **Note**: P402 only requests permission to view your public address - we never have access to your private keys or funds.

### Step 3: Sign Authentication Message

1. After connecting, P402 will request a message signature
2. This message proves you own the wallet address
3. The message contains:
   - Your wallet address
   - A unique nonce (random number)
   - A timestamp
   - The P402 domain

4. Review the message in your wallet popup
5. Click **"Sign"** to authenticate

> **Security Note**: Signing this message does NOT give P402 permission to spend your funds. It only proves ownership of your wallet address.

### Step 4: You're In!

Once authenticated:
- Your wallet address appears in the top-right corner
- You can now access the Dashboard
- Create and manage APIs
- View your API statistics

## 🔒 Security Features

### No Passwords Required
P402 uses **cryptographic signatures** instead of passwords:
- ✅ No password to remember or forget
- ✅ No password database to be hacked
- ✅ Proof of ownership through cryptography
- ✅ Session-based authentication with JWT tokens

### Session Management
- Sessions last **24 hours** by default
- After expiration, you'll need to sign in again
- You can manually disconnect anytime by clicking **"Disconnect Wallet"**

### Multi-Wallet Support
- Switch between multiple wallets
- Each wallet has its own account and APIs
- Wallet addresses are your unique identifiers

## 🔄 Reconnecting Your Account

Already have an account? Simply:
1. Click **"Connect Wallet"**
2. Select the same wallet you used before
3. Sign the authentication message
4. Access all your existing APIs and data

## ❓ Troubleshooting

### "Wallet not detected"
- Make sure your wallet extension is installed and unlocked
- Refresh the page and try again
- Try a different browser if issues persist

### "Signature verification failed"
- Ensure you're signing the correct message
- Check that your wallet app is up to date
- Try disconnecting and reconnecting your wallet

### "Session expired"
- Your 24-hour session has ended
- Simply reconnect your wallet to create a new session
- Your data and APIs are safe - nothing is lost

## 🎯 Next Steps

Now that you have an account:
- Learn [How to Create a P402 API](./API_CREATION.md)
- Discover [How to Use P402 APIs](./API_USAGE.md)
- Read about [Custom Headers](./CUSTOM_HEADERS_FEATURE.md)

## 💡 Tips

- **Keep your wallet secure**: Your wallet is your account - protect your recovery phrase
- **Use hardware wallets**: For production APIs with real revenue, consider a hardware wallet like Ledger
- **Test on devnet first**: Before going live, test your setup with testnet/devnet tokens

---

**Need help?** Check our [Error Codes](./ERROR_CODES.md) documentation or reach out to the community.
