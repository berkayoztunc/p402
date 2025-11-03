# 🚀 P402 Frontend Deployment Guide

Frontend'i production ortamına deploy etmek için adım adım kılavuz.

## 📋 Ön Hazırlık

### 1. Backend URL'i Ayarla

`.env.production` dosyasını düzenle:

```env
VITE_API_URL=https://your-backend.workers.dev
```

### 2. Build Oluştur

```bash
cd frontend
npm run build
```

Bu komut `dist/` klasöründe production build'i oluşturur.

## 🌐 Deployment Seçenekleri

### Option 1: Cloudflare Pages (Önerilen)

**장점:**
- ⚡ Ultra-fast global CDN
- 🆓 Generous free tier
- 🔄 Auto-deployments from Git
- 🔒 Free SSL
- ⚙️ Easy custom domains

**Adımlar:**

1. **Cloudflare Dashboard'a Git**
   ```
   https://dash.cloudflare.com/
   ```

2. **Pages Sekmesine Git**
   - "Create a project" tıkla
   - Git repository'nizi bağlayın

3. **Build Ayarları**
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: frontend
   ```

4. **Environment Variables**
   ```
   VITE_API_URL = https://your-backend.workers.dev
   ```

5. **Deploy**
   - "Save and Deploy" tıkla
   - Build tamamlandığında URL'niz hazır!

**Alternatif: Doğrudan Upload**

```bash
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=p402-frontend
```

### Option 2: Vercel

**Avantajlar:**
- 🚀 Zero-config deployment
- 🔄 Git integration
- 🌍 Global CDN
- 📊 Analytics

**Adımlar:**

1. **Vercel CLI Yükle**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Et**
   ```bash
   cd frontend
   vercel
   ```

3. **Environment Variables**
   ```
   Vercel Dashboard → Settings → Environment Variables
   
   VITE_API_URL = https://your-backend.workers.dev
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Option 3: Netlify

**Avantajlar:**
- 🎯 Simple deployment
- 🔄 Continuous deployment
- 🔌 Form handling & functions
- 📊 Split testing

**Adımlar:**

1. **Netlify CLI Yükle**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Environment Variables**
   ```
   Netlify Dashboard → Site settings → Environment variables
   
   VITE_API_URL = https://your-backend.workers.dev
   ```

### Option 4: GitHub Pages

**Avantajlar:**
- 🆓 Completely free
- 📦 Integrated with GitHub
- 🔄 Auto-deploy on push

**Adımlar:**

1. **vite.config.ts Güncelle**
   ```typescript
   export default defineConfig({
     base: '/p402/', // Repository adınız
     // ...
   })
   ```

2. **Build & Deploy Script**
   ```bash
   npm run build
   cd dist
   git init
   git add -A
   git commit -m 'deploy'
   git push -f git@github.com:username/p402.git main:gh-pages
   ```

3. **GitHub Settings**
   - Repository → Settings → Pages
   - Source: gh-pages branch
   - Save

### Option 5: AWS S3 + CloudFront

**Avantajlar:**
- 🏢 Enterprise-grade
- 🔧 Full control
- 🌐 Global distribution
- 🔒 Advanced security

**Adımlar:**

1. **S3 Bucket Oluştur**
   ```bash
   aws s3 mb s3://p402-frontend
   ```

2. **Static Website Hosting Aktif Et**
   ```bash
   aws s3 website s3://p402-frontend \
     --index-document index.html \
     --error-document index.html
   ```

3. **Build Upload Et**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://p402-frontend
   ```

4. **CloudFront Distribution Oluştur**
   - AWS Console → CloudFront
   - Create Distribution
   - Origin: S3 bucket
   - SSL Certificate ekle

## 🔧 Post-Deployment Checklist

### 1. CORS Ayarları

Backend'te frontend domain'ini ekle:

```typescript
// src/index.ts
app.use("*", cors({
  origin: [
    'http://localhost:5173',
    'https://p402.pages.dev', // Cloudflare Pages
    'https://p402.vercel.app', // Vercel
    'https://yourdomain.com', // Custom domain
  ]
}));
```

### 2. Environment Variables

Tüm platformlarda `VITE_API_URL` set edildiğinden emin ol.

### 3. Custom Domain (Opsiyonel)

**Cloudflare Pages:**
1. Dashboard → Custom domains
2. Add custom domain
3. DNS kayıtlarını ekle

**Vercel:**
1. Project Settings → Domains
2. Add domain
3. DNS kayıtlarını ekle

**Netlify:**
1. Domain settings → Add custom domain
2. DNS kayıtlarını ekle

### 4. SSL/HTTPS

Tüm platformlar otomatik SSL sağlar. Custom domain için:
- Let's Encrypt otomatik kurulur
- Veya kendi sertifikanızı yükleyin

### 5. Performance Optimization

**Cloudflare:**
- Auto minify aktif et
- Brotli compression
- HTTP/3

**Vercel:**
- Edge Network otomatik
- Image optimization

**Netlify:**
- Asset optimization
- Prerendering

## 🔒 Güvenlik Best Practices

### 1. Environment Variables

❌ **Yapma:**
```javascript
const API_URL = 'https://api.example.com' // Hardcoded
```

✅ **Yap:**
```javascript
const API_URL = import.meta.env.VITE_API_URL
```

### 2. API Keys

- ⚠️ Asla API key'leri frontend'e koyma
- ✅ Backend'de API key'leri kullan
- ✅ Environment variables kullan

### 3. HTTPS Only

```typescript
// Tüm istekleri HTTPS'e yönlendir
if (window.location.protocol === 'http:') {
  window.location.href = window.location.href.replace('http:', 'https:')
}
```

## 📊 Monitoring & Analytics

### 1. Error Tracking

**Sentry Integration:**

```bash
npm install @sentry/vue
```

```typescript
// main.ts
import * as Sentry from "@sentry/vue";

Sentry.init({
  app,
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### 2. Analytics

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

```typescript
// main.ts
import { inject } from '@vercel/analytics';
inject();
```

**Google Analytics:**
```typescript
// index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 3. Performance Monitoring

**Web Vitals:**
```bash
npm install web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [ main ]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
      run: |
        cd frontend
        npm run build
        
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        projectName: p402-frontend
        directory: frontend/dist
```

## 🐛 Troubleshooting

### Build Hataları

**"Out of memory"**
```bash
# Node memory limit artır
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

**"Module not found"**
```bash
# Dependencies yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

### Deployment Hataları

**404 Errors (SPA)**

Tüm route'ları index.html'e yönlendir:

**Cloudflare Pages:** Otomatik
**Vercel:** Otomatik
**Netlify:** `_redirects` dosyası:
```
/*    /index.html   200
```

**CORS Errors**

Backend'te doğru origin'leri ekle.

### Performance Issues

**Slow Loading:**
- CDN kullan
- Asset'leri compress et
- Code splitting kontrol et

**Large Bundle Size:**
- Tree shaking kontrolü
- Gereksiz dependencies kaldır
- Dynamic imports kullan

## 📈 Optimization Tips

### 1. Code Splitting

```typescript
// router/index.ts
const Home = () => import('../views/Home.vue')
```

### 2. Asset Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'web3': ['ethers'],
        }
      }
    }
  }
})
```

### 3. Lazy Loading Images

```vue
<img loading="lazy" src="..." alt="...">
```

### 4. Preload Critical Assets

```html
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>
```

## ✅ Final Checklist

Deployment öncesi kontrol listesi:

- [ ] `.env.production` doğru ayarlandı
- [ ] Build başarılı (`npm run build`)
- [ ] Tüm testler geçti
- [ ] Backend CORS ayarları güncellendi
- [ ] Environment variables set edildi
- [ ] Custom domain yapılandırıldı (opsiyonel)
- [ ] SSL aktif
- [ ] Analytics kuruldu (opsiyonel)
- [ ] Error tracking kuruldu (opsiyonel)
- [ ] CI/CD pipeline kuruldu (opsiyonel)

## 🎉 Başarılı Deployment!

Frontend'iniz artık live! 

**Next Steps:**
1. Test et: Tüm fonksiyonları kontrol et
2. Monitor et: Analytics ve error logs izle
3. Optimize et: Performance metrikleri iyileştir
4. Scale et: Traffic arttıkça ölçeklendir

---

**Sorular?** GitHub Issues'da sorun!

**Başarılar!** 🚀
