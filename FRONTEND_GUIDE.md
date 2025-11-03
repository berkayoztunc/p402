# P402 Frontend - Kurulum ve Kullanım Kılavuzu

## 🎯 Genel Bakış

P402'nin modern Vue 3 tabanlı frontend arayüzü başarıyla oluşturuldu! Özellikler:

- ✅ **Wallet Authentication**: MetaMask ile giriş
- ✅ **API Yönetimi**: API ekleme, düzenleme, silme
- ✅ **Kullanım İstatistikleri**: Dashboard ile takip
- ✅ **Modern Tasarım**: Siyah-turuncu one-pager arayüz
- ✅ **Responsive**: Mobil uyumlu tasarım

## 🚀 Hızlı Başlangıç

### 1. Frontend'i Çalıştırma

```bash
cd frontend
npm run dev
```

Frontend şu adreste çalışacak: **http://localhost:5173**

### 2. Backend'i Çalıştırma

Başka bir terminalde:

```bash
# Ana dizinde
npm run dev
```

Backend şu adreste çalışacak: **http://localhost:8787**

### 3. MetaMask ile Bağlanma

1. Tarayıcınızda MetaMask extension'ını açın
2. Frontend'de "Connect Wallet" butonuna tıklayın
3. MetaMask'ta bağlantıyı onaylayın
4. Dashboard'a otomatik yönlendirileceksiniz

## 📋 Kullanım Adımları

### API Ekleme

1. Dashboard'da **"+ Add New API"** butonuna tıklayın
2. Formu doldurun:
   - **API Name**: API'nizin adı (örn: "Weather API")
   - **Description**: Açıklama
   - **Target URL**: Hedef API URL'i (örn: "https://api.openweathermap.org")
   - **Price**: Fiyat (örn: "$0.001")
   - **Network**: Blockchain ağı (Ethereum, Polygon, Solana, Base, Arbitrum)
3. **"Create"** butonuna tıklayın

### API Düzenleme

1. API kartında **"Edit"** butonuna tıklayın
2. Değişiklikleri yapın
3. **"Update"** butonuna tıklayın

### API Silme

1. API kartında **"Delete"** butonuna tıklayın
2. Onay mesajını kabul edin

### API'yi Aktif/Pasif Yapma

- API kartının sağ üst köşesindeki **toggle switch**'e tıklayın
- Yeşil = Aktif, Gri = Pasif

### Proxy URL'yi Kopyalama

- API kartındaki **proxy URL**'ye tıklayın
- URL otomatik olarak panoya kopyalanır

## 🎨 Tasarım Özellikleri

- **Ana Renk**: Turuncu (#ff6b00)
- **Arka Plan**: Siyah (#0a0a0a)
- **Tipografi**: Modern, okunabilir fontlar
- **Animasyonlar**: Smooth transitions ve hover efektleri
- **Responsive**: Tüm cihazlarda çalışır

## 🔧 Teknik Detaylar

### Teknolojiler

- **Vue 3**: Composition API ile modern Vue
- **TypeScript**: Tip güvenliği
- **Vite**: Hızlı geliştirme
- **Pinia**: State management
- **Ethers.js**: Web3 wallet entegrasyonu
- **Axios**: HTTP client

### Proje Yapısı

```
frontend/
├── src/
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── router/         # Vue Router yapılandırması
│   ├── services/       # API servis katmanı
│   ├── stores/         # Pinia state stores
│   ├── types/          # TypeScript tip tanımları
│   ├── views/          # Sayfa bileşenleri
│   │   └── Home.vue    # Ana one-pager sayfası
│   ├── App.vue         # Root component
│   └── main.ts         # Uygulama giriş noktası
├── .env                # Çevre değişkenleri
└── package.json        # Bağımlılıklar
```

### State Management (Pinia)

**Auth Store** (`stores/auth.ts`):
- `address`: Kullanıcının wallet adresi
- `isConnected`: Bağlantı durumu
- `connectWallet()`: Wallet bağlama
- `disconnectWallet()`: Bağlantıyı kesme
- `checkConnection()`: Mevcut bağlantıyı kontrol et

### API Service (`services/api.ts`)

- `getAllApis()`: Tüm API'leri getir
- `getUserApis(address)`: Kullanıcının API'lerini getir
- `registerApi(data)`: Yeni API kaydet
- `updateApi(id, data)`: API güncelle
- `deleteApi(id)`: API sil
- `toggleApiStatus(id, status)`: API durumunu değiştir

## 🔐 Güvenlik

- Wallet tabanlı kimlik doğrulama (şifre yok!)
- Client-side state management
- Secure CORS yapılandırması
- No sensitive data storage

## 📱 Responsive Breakpoints

- **Desktop**: 1920px+
- **Laptop**: 1440px - 1920px
- **Tablet**: 768px - 1440px
- **Mobile**: 375px - 768px

## 🐛 Sorun Giderme

### MetaMask Tespit Edilmedi

**Sorun**: "MetaMask not installed" hatası
**Çözüm**: MetaMask extension'ını yükleyin ve etkinleştirin

### CORS Hatası

**Sorun**: API istekleri başarısız oluyor
**Çözüm**: Backend'in çalıştığından ve CORS'un düzgün yapılandırıldığından emin olun

### Bağlantı Kesildi

**Sorun**: Wallet bağlantısı kayboldu
**Çözüm**: Sayfayı yenileyin, otomatik olarak yeniden bağlanacak

### API Güncellenmiyor

**Sorun**: Değişiklikler yansımıyor
**Çözüm**: Tarayıcı cache'ini temizleyin veya hard refresh yapın (Cmd+Shift+R)

## 🚀 Production Build

### Build Oluşturma

```bash
cd frontend
npm run build
```

Build dosyaları `dist/` klasöründe oluşur.

### Preview

```bash
npm run preview
```

### Deploy

Cloudflare Pages, Vercel, Netlify veya benzeri platformlara deploy edebilirsiniz:

```bash
# Cloudflare Pages için
npx wrangler pages deploy dist

# Vercel için
npx vercel --prod

# Netlify için
npx netlify deploy --prod
```

## 🔄 Backend Entegrasyonu

Frontend, backend ile şu endpoint'ler üzerinden iletişim kurar:

- `GET /manage/apis` - Tüm API'leri listele
- `GET /manage/my-apis/:address` - Kullanıcının API'lerini listele
- `POST /manage/register` - Yeni API kaydet
- `PUT /manage/apis/:id` - API güncelle
- `DELETE /manage/apis/:id` - API sil

Environment değişkenini `.env` dosyasında ayarlayın:

```env
VITE_API_URL=http://localhost:8787
```

## 📊 Dashboard İstatistikleri

Dashboard şu metrikleri gösterir:

- **Total APIs**: Toplam kayıtlı API sayısı
- **Active APIs**: Aktif API sayısı
- **Total Revenue**: Toplam gelir (şu an mock data)
- **Total Requests**: Toplam istek sayısı (şu an mock data)

> **Not**: Kullanım istatistikleri için backend'de tracking sistemi kurulması gerekir.

## 🎯 Gelecek Geliştirmeler

- [ ] Real-time usage analytics
- [ ] Payment history sayfası
- [ ] API documentation generator
- [ ] Rate limiting ayarları
- [ ] Custom domain support
- [ ] Team collaboration
- [ ] Webhook notifications

## 📄 Lisans

MIT License

---

**Yardıma mı ihtiyacınız var?** GitHub Issues'da soru sorabilirsiniz.

**Katkıda bulunmak ister misiniz?** Pull request'ler memnuniyetle karşılanır! 🎉
