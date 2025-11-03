# Test Script for P402

## 1. Sağlık kontrolü
curl http://localhost:8787/

## 2. API Kaydet
curl -X POST http://localhost:8787/manage/register \
  -H "Content-Type: application/json" \
  -d '{
    "owner_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    "api_name": "Demo Weather API",
    "description": "Test weather API",
    "target_url": "https://api.open-meteo.com",
    "price": "$0.001",
    "network": "base-sepolia"
  }'

## 3. Tüm API'leri listele
curl http://localhost:8787/manage/apis

## 4. Kullanıcının API'lerini listele
curl http://localhost:8787/manage/my-apis/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1

## 5. API'yi kullan (ID'yi önceki adımdan alın)
# curl http://localhost:8787/api/{YOUR_API_ID}/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m

## 6. API güncelle
# curl -X PUT http://localhost:8787/manage/apis/{YOUR_API_ID} \
#   -H "Content-Type: application/json" \
#   -d '{
#     "price": "$0.002"
#   }'

## 7. API sil
# curl -X DELETE http://localhost:8787/manage/apis/{YOUR_API_ID}
