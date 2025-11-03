# P402 - Dynamic API Payment Gateway 🚀

HTTP 402 Payment Required protokolünü kullanarak API'leriniz için otomatik ödeme toplayın!

## 🌟 Özellikler

- **Dinamik API Kaydı**: Kullanıcılar kendi API'lerini sisteme kaydedebilir
- **Otomatik 402 Payment**: Her API çağrısı için otomatik ödeme kontrolü
- **Proxy Sistemi**: İstekler otomatik olarak kayıtlı API'lere yönlendirilir
- **Çoklu Network Desteği**: Base Sepolia, Ethereum, vb.
- **Kullanıcı Bazlı Ödeme**: Her API sahibi kendi wallet adresine ödeme alır

## 🏗️ Kurulum

### 1. Bağımlılıkları yükleyin
```txt
npm install
```

### 2. D1 Database oluşturun
```bash
# Database oluştur
npx wrangler d1 create p402_apis

# Migration'ları çalıştır (local)
npx wrangler d1 execute p402_apis --local --file=./migrations/0001_create_apis.sql

# Migration'ları çalıştır (production)
npx wrangler d1 execute p402_apis --file=./migrations/0001_create_apis.sql
```

### 3. wrangler.jsonc'yi güncelleyin
Database ID'yi `wrangler d1 create` komutundan aldıktan sonra güncelleyin.

### 4. Geliştirme sunucusunu başlatın
```txt
npm run dev
```

## 📖 Kullanım

### 1. API Kaydet

```bash
curl -X POST http://localhost:8787/manage/register \
  -H "Content-Type: application/json" \
  -d '{
    "owner_address": "0xYourWalletAddress",
    "api_name": "Weather API",
    "description": "Real-time weather data",
    "target_url": "https://your-api.com",
    "price": "$0.001",
    "network": "base-sepolia"
  }'
```

### 2. API'leri Listele

```bash
# Tüm aktif API'ler
curl http://localhost:8787/manage/apis

# Kullanıcının API'leri
curl http://localhost:8787/manage/my-apis/0xYourWalletAddress
```

### 3. Kayıtlı API'yi Kullan

```bash
curl http://localhost:8787/api/{API_ID}/your-endpoint \
  -H "Authorization: Payment YOUR_PAYMENT_TOKEN"
```

## 🚀 Deploy

```txt
npm run deploy
```

## 🔧 Type Generation

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
