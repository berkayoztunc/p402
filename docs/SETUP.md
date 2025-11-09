# P402 Setup Guide 🚀

This guide contains step-by-step instructions for setting up the P402 Dynamic API Payment Gateway.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Cloudflare account
- Wrangler CLI (automatically installed via npm install)

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Create D1 Database

```bash
# Create database
npm run db:create
```

When this command runs, it will give you a **database_id**. Example:
```
✅ Successfully created DB 'p402_apis' in region WEUR
Created your database using D1's new storage backend.

[[d1_databases]]
binding = "DB"
database_name = "p402_apis"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # <-- COPY THIS
```

### 3. Update wrangler.jsonc File

Open the `wrangler.jsonc` file and update these values:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "p402_apis",
      "database_id": "PASTE_THE_DATABASE_ID_FROM_ABOVE_HERE"
    }
  ],
  "vars": {
    "FACILITATOR_URL": "https://your-facilitator-url.com",
    "PAYMENT_ADDRESS": "0xYourWalletAddress",
    "NETWORK": "base-sepolia"
  }
}
```

**Important:** 
- `database_id`: The ID you received in Step 2
- `FACILITATOR_URL`: Your x402 facilitator URL
- `PAYMENT_ADDRESS`: Your default wallet address (each API uses its own address)
- `NETWORK`: The blockchain network you want to use

### 4. Run Database Migrations

#### For Local Development:
```bash
npm run db:migrate:local
```

#### For Production (before deploying):
```bash
npm run db:migrate:prod
```

### 5. Start Development Server

```bash
npm run dev
```

Once the server starts, you can access it at:
- Main page: http://localhost:8787/
- Dashboard: http://localhost:8787/dashboard.html

## 🧪 Testing

### 1. Register an API

```bash
curl -X POST http://localhost:8787/manage/register \
  -H "Content-Type: application/json" \
  -d '{
    "owner_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    "api_name": "Test API",
    "description": "Test description",
    "target_url": "https://api.open-meteo.com",
    "price": "$0.001",
    "network": "base-sepolia"
  }'
```

### 2. List APIs

```bash
curl http://localhost:8787/manage/apis
```

### 3. Use Registered API

Using the `id` value from the response:

```bash
curl http://localhost:8787/api/{API_ID}/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m
```

## 🚀 Deploy to Production

### 1. Create Production Database

```bash
npx wrangler d1 create p402_apis
```

Copy the database ID.

### 2. Update wrangler.jsonc with Production ID

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "p402_apis",
      "database_id": "PRODUCTION_DATABASE_ID"
    }
  ]
}
```

### 3. Run Production Migration

```bash
npm run db:migrate:prod
```

### 4. Deploy

```bash
npm run deploy
```

## 🎯 Usage Scenario

```javascript
// 1. Register your API in the system
const registerResponse = await fetch('https://your-domain.workers.dev/manage/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    owner_address: '0xYourWallet',
    api_name: 'Weather API',
    target_url: 'https://api.weather.com',
    price: '$0.001',
    network: 'base-sepolia'
  })
});

const { api, proxyUrl } = await registerResponse.json();
// proxyUrl: "/api/550e8400-e29b-41d4-a716-446655440000"

// 2. Give this URL to your customers
// They access your API with 402 payment, you earn money for each call!
```

## 📊 Dashboard

You can access the web dashboard at:
- Local: http://localhost:8787/dashboard.html
- Production: https://your-domain.workers.dev/dashboard.html

With the dashboard you can:
- ✅ Register new APIs
- ✅ View all APIs
- ✅ Examine API details
- ✅ Copy proxy URLs

## 🔧 Troubleshooting

### Database not found error

```bash
# Check database list
npx wrangler d1 list

# Make sure the database ID is correct in wrangler.jsonc
```

### Migration not working

```bash
# Run migration file manually
npx wrangler d1 execute p402_apis --local --file=./migrations/0001_create_apis.sql
```

### x402-hono error

Make sure the x402-hono package is installed correctly:

```bash
npm list x402-hono
```

## 📚 API Endpoints

### Management
- `GET /` - Health check
- `GET /manage/apis` - List all APIs
- `GET /manage/my-apis/:address` - List user's APIs
- `POST /manage/register` - Register new API
- `PUT /manage/apis/:id` - Update API
- `DELETE /manage/apis/:id` - Delete API

### Proxy
- `ALL /api/:id/*` - Proxy to registered API (402 payment required)

## 🤝 Support

If you encounter problems:
1. Check `wrangler dev` output
2. Check browser console
3. Make sure database migrations have run

## 🎉 Success!

Your dynamic 402 payment gateway is now ready! 🚀
