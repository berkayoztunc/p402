# P402 Facilitator Rehberi

## Genel Bakış

P402 platformu, kendi özel **Facilitator** servisini kullanarak blockchain tabanlı ödeme işlemlerini yönetir. Facilitator, API kullanıcılarının ödeme yapabilmeleri ve API sahiplerinin ödemelerini alabilmeleri için kritik bir köprü görevi görür.

## Facilitator Nedir?

Facilitator, x402 protokolünün merkezi bir bileşenidir ve şu görevleri yerine getirir:

- 🔐 **Ödeme Doğrulama**: Ödeme taleplerini doğrular
- 📝 **İşlem Oluşturma**: Blockchain işlemlerini oluşturur
- ⚡ **Ödeme Mutabakatı**: Ödemeleri API sahiplerine aktarır
- 🛡️ **Güvenlik**: Güvenli işlem yönetimi sağlar

## P402'nin Özel Facilitator'ı

P402, **kendi facilitator servisini** kullanır:

```
https://facilitator.p402.store
```

### Neden Özel Facilitator?

✅ **Tam Kontrol**: Platform üzerinde tam kontrol  
✅ **Özel Mantık**: İş mantığını özelleştirebilme  
✅ **Performans**: Optimize edilmiş performans  
✅ **Güvenilirlik**: Yüksek erişilebilirlik garantisi  
✅ **Maliyet Optimizasyonu**: Maliyet kontrolü  

## Mimari

```
┌─────────────┐
│  İstemci    │
│  (Cüzdan)   │
└──────┬──────┘
       │ 1. API İsteği
       │
       ▼
┌─────────────┐
│  P402 API   │
│ Middleware  │
└──────┬──────┘
       │ 2. Ödeme Gerekli (402)
       │ + Facilitator URL
       │
       ▼
┌─────────────┐
│ Facilitator │ ◄─── https://facilitator.p402.store
│  (P402)     │
└──────┬──────┘
       │ 3. İşlem Oluştur
       │ 4. Ödemeyi Doğrula
       │
       ▼
┌─────────────┐
│  Blockchain │
│   (Solana)  │
└─────────────┘
```

## Nasıl Çalışır?

### 1. API İstek Akışı

Kullanıcı bir P402 API'sine istek gönderir:

```bash
curl https://p402.store/api/YOUR_API_ID/endpoint
```

### 2. Ödeme Gerekli Yanıtı

API, ödeme gerektiren bir endpoint ise `402 Payment Required` yanıtı döner:

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

### 3. Ödeme İşleme

İstemci, facilitator'a ödeme talebi gönderir:

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

### 4. İşlem İmzalama ve Doğrulama

İstemci işlemi imzalar ve doğrulama için gönderir:

```javascript
// İşlemi imzala
const signedTx = await wallet.signTransaction(transaction);

// Doğrulama için gönder
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

### 5. Kanıtla API Erişimi

Artık ödeme kanıtıyla API'ye erişim sağlanır:

```javascript
const apiResponse = await fetch('https://p402.store/api/YOUR_API_ID/endpoint', {
  headers: {
    'X-Payment-Proof': proof
  }
});
```

## Konfigürasyon

### Ortam Değişkenleri

P402 platformu, facilitator URL'ini ortam değişkeni olarak tanımlar:

```env
FACILITATOR_URL=https://facilitator.p402.store
```

### Worker Konfigürasyonu

`worker-configuration.d.ts` dosyasında tanımlı:

```typescript
interface Env {
  FACILITATOR_URL: string;
  // ... diğer ayarlar
}
```

### Ödeme Middleware

`src/payment-middleware.ts` ve `src/index.ts` dosyalarında kullanımı:

```typescript
const middleware = createDynamicPaymentMiddleware(c.env.DB, {
  facilitatorUrl: c.env.FACILITATOR_URL as Resource,
  paymentAddress: c.env.PAYMENT_ADDRESS,
  network: c.env.NETWORK,
});
```

## Desteklenen Ağlar

P402 Facilitator şu ağları destekler:

| Ağ | Durum | Varlık |
|---------|--------|-------|
| Solana Mainnet | ✅ Aktif | SOL, SPL Token'lar |
| Solana Devnet | ✅ Aktif | SOL (Test) |

## Ödeme Gereksinimleri Yapısı

Her API'nin ödeme gereksinimleri dinamik olarak belirlenir:

```typescript
interface PaymentRequirements {
  network: 'solana';
  asset: string;              // Token mint adresi
  maxAmountRequired: string;  // Lamports/en küçük birim
  payTo: string;             // API sahibinin cüzdanı
  extra: {
    feePayer: string;        // Facilitator'ın ücret ödeyicisi
  };
}
```

## Güvenlik Özellikleri

🔒 **İşlem Doğrulama**: Her işlem blockchain üzerinde doğrulanır  
🔒 **Kanıt Tabanlı Erişim**: Kanıt bazlı erişim kontrolü  
🔒 **Ücret Ödeyici Koruması**: Facilitator ücret ödeyicisini güvenli tutar  
🔒 **Ağ Doğrulaması**: Adres formatları ağa göre doğrulanır  

## Hata Yönetimi

Facilitator ile ilgili hatalar:

| Hata Kodu | Açıklama | Çözüm |
|------------|-------------|----------|
| `FACILITATOR_ERROR` | Facilitator servisi yanıt vermiyor | Tekrar deneyin |
| `INVALID_PAYMENT_ADDRESS` | Ödeme adresi geçersiz | Cüzdan adresini kontrol edin |
| `PAYMENT_VERIFICATION_FAILED` | Ödeme doğrulaması başarısız | İşlemi tekrar gönderin |
| `INSUFFICIENT_FUNDS` | Yetersiz bakiye | Cüzdanınıza yeterli SOL ekleyin |

## API Sahipleri İçin Avantajlar

✨ **Otomatik Ödeme Toplama**: Ödemeler otomatik olarak toplanır  
✨ **Entegrasyon Gerektirmez**: Ek entegrasyon gerektirmez  
✨ **Çoklu Ağ Desteği**: Farklı blockchain ağlarını destekler  
✨ **Anında Mutabakat**: Anlık ödeme transferi  
✨ **Düşük Ücretler**: Optimize edilmiş işlem ücretleri  

## API Kullanıcıları İçin Avantajlar

✨ **Güvenli Ödemeler**: Güvenli ödeme sistemi  
✨ **Hızlı İşlemler**: Hızlı işlem süresi  
✨ **Şeffaf Fiyatlandırma**: Şeffaf fiyatlandırma  
✨ **Çoklu Cüzdan**: Çeşitli cüzdan desteği  
✨ **Kolay Entegrasyon**: x402 SDK ile kolay entegrasyon  

## İstemci Entegrasyonu

### x402 SDK Kullanımı

```bash
npm install x402
```

```javascript
import { X402Client } from 'x402';

const client = new X402Client({
  wallet: yourSolanaWallet,
  facilitatorUrl: 'https://facilitator.p402.store'
});

// Ücretli API isteği yap
const response = await client.request('https://p402.store/api/YOUR_API_ID/endpoint');
```

### Manuel Entegrasyon

Facilitator'ı manuel olarak kullanmak için yukarıdaki "Nasıl Çalışır?" bölümündeki adımları takip edin.

## İzleme ve Loglar

P402 platformu, facilitator işlemlerini loglar:

```typescript
console.log("Using payment config for API:", {
  owner_address: api.owner_address,
  facilitator: {
    url: config.facilitatorUrl,
  }
});
```

## Gelecek Geliştirmeler

🚀 **Çoklu Zincir Desteği**: Ethereum, Polygon gibi ağlar  
🚀 **Gelişmiş Analitik**: İşlem analitiği ve raporlama  
🚀 **Özel Ücret Modelleri**: Özelleştirilebilir ücret modelleri  
🚀 **WebSocket Desteği**: Gerçek zamanlı ödeme bildirimleri  

## Destek

Facilitator ile ilgili sorun yaşıyorsanız:

- 📧 Email: support@p402.store
- 🐛 GitHub Issues: [p402/issues](https://github.com/berkayoztunc/p402/issues)
- 📖 Tam Dokümantasyon: [P402 Docs](https://p402.store/documentation)

## İlgili Dokümantasyon

- [API Oluşturma Rehberi](./API_CREATION.md)
- [API Kullanım Rehberi](./API_USAGE.md)
- [Solana Kimlik Doğrulama](./SOLANA_AUTH_GUIDE.md)
- [Hata Kodları](./ERROR_CODES.md)

---

**Not**: P402 Facilitator sürekli güncellenmekte ve geliştirilmektedir. En güncel bilgiler için dokümantasyonu düzenli olarak kontrol edin.
