# P402 Kurulum Rehberi 🚀

Bu rehber P402 Dynamic API Payment Gateway'i kurmanız için adım adım yönergeler içermektedir.

## 📋 Ön Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Cloudflare hesabı
- Wrangler CLI (npm install ile otomatik gelir)

## 🛠️ Kurulum Adımları

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. D1 Database Oluşturun

```bash
# Database oluştur
npm run db:create
```

Bu komut çalıştığında size bir **database_id** verecek. Örnek:
```
✅ Successfully created DB 'p402_apis' in region WEUR
Created your database using D1's new storage backend.

[[d1_databases]]
binding = "DB"
database_name = "p402_apis"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # <-- BUNU KOPYALAYIN
```

### 3. wrangler.jsonc Dosyasını Güncelleyin

`wrangler.jsonc` dosyasını açın ve şu değerleri güncelleyin:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "p402_apis",
      "database_id": "BURAYA_YUKARIDAKI_DATABASE_ID_YI_YAPIŞTIRIN"
    }
  ],
  "vars": {
    "FACILITATOR_URL": "https://your-facilitator-url.com",
    "PAYMENT_ADDRESS": "0xYourWalletAddress",
    "NETWORK": "base-sepolia"
  }
}
```

**Önemli:** 
- `database_id`: Adım 2'de aldığınız ID
- `FACILITATOR_URL`: x402 facilitator URL'iniz
- `PAYMENT_ADDRESS`: Default wallet adresiniz (her API kendi adresini kullanır)
- `NETWORK`: Kullanmak istediğiniz blockchain network'ü

### 4. Database Migration'ları Çalıştırın

#### Local Development için:
```bash
npm run db:migrate:local
```

#### Production için (deploy etmeden önce):
```bash
npm run db:migrate:prod
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Sunucu başladığında şu adresten erişebilirsiniz:
- Ana sayfa: http://localhost:8787/
- Dashboard: http://localhost:8787/dashboard.html

## 🧪 Test Edin

### 1. API Kaydedin

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

### 2. API'leri Listeleyin

```bash
curl http://localhost:8787/manage/apis
```

### 3. Kayıtlı API'yi Kullanın

Yanıttan aldığınız `id` değerini kullanarak:

```bash
curl http://localhost:8787/api/{API_ID}/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m
```

## 🚀 Production'a Deploy

### 1. Production Database Oluşturun

```bash
npx wrangler d1 create p402_apis
```

Database ID'yi kopyalayın.

### 2. wrangler.jsonc'yi Production ID ile Güncelleyin

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

### 3. Production Migration Çalıştırın

```bash
npm run db:migrate:prod
```

### 4. Deploy Edin

```bash
npm run deploy
```

## 🎯 Kullanım Senaryosu

```javascript
// 1. API'nizi sisteme kaydedin
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

// 2. Müşterilerinize bu URL'i verin
// Onlar 402 payment ile API'nize erişir, her çağrı için para kazanırsınız!
```

## 📊 Dashboard

Web dashboard'a şu adresten erişebilirsiniz:
- Local: http://localhost:8787/dashboard.html
- Production: https://your-domain.workers.dev/dashboard.html

Dashboard ile:
- ✅ Yeni API kaydedin
- ✅ Tüm API'leri görüntüleyin
- ✅ API detaylarını inceleyin
- ✅ Proxy URL'leri kopyalayın

## 🔧 Troubleshooting

### Database bulunamıyor hatası

```bash
# Database listesini kontrol edin
npx wrangler d1 list

# Database ID'nin wrangler.jsonc'de doğru olduğundan emin olun
```

### Migration çalışmıyor

```bash
# Migration dosyasını manuel çalıştırın
npx wrangler d1 execute p402_apis --local --file=./migrations/0001_create_apis.sql
```

### x402-hono hatası

x402-hono paketinin doğru kurulduğundan emin olun:

```bash
npm list x402-hono
```

## 📚 API Endpoints

### Management
- `GET /` - Health check
- `GET /manage/apis` - Tüm API'leri listele
- `GET /manage/my-apis/:address` - Kullanıcının API'lerini listele
- `POST /manage/register` - Yeni API kaydet
- `PUT /manage/apis/:id` - API güncelle
- `DELETE /manage/apis/:id` - API sil

### Proxy
- `ALL /api/:id/*` - Kayıtlı API'ye proxy (402 payment gerekli)

## 🤝 Destek

Sorun yaşarsanız:
1. `wrangler dev` çıktısını kontrol edin
2. Browser console'u kontrol edin
3. Database migration'larının çalıştığından emin olun

## 🎉 Başarılar!

Artık dinamik 402 payment gateway'iniz hazır! 🚀
