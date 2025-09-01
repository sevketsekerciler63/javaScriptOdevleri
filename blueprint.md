# Akkayasoft Ticaret Proje Taslağı

## 1. Genel Bakış

Bu proje, kullanıcıların ürünleri görüntüleyebileceği, sepetine ekleyebileceği ve satın alabileceği modern, tam özellikli bir e-ticaret platformu oluşturmayı hedefler. Platform, yönetici paneli, gelişmiş kullanıcı etkileşimi ve detaylı bir sipariş süreci içerecektir.

## 2. Gelişmiş Özellikler

*   **Proje Adı:** Akkayasoft Ticaret
*   **Veri Kalıcılığı (localStorage):** Tüm dinamik veriler (ürünler, kullanıcılar, sepet) tarayıcı hafızasında saklanır.
*   **Kullanıcı Yönetimi:** Hesap oluşturma (e-posta kontrolü ile), giriş/çıkış.
*   **Yönetici Paneli (`/dashboard`):** Ürün Ekleme/Silme.
*   **Etkileşim Sistemleri:** Yıldızlı Puanlama, Yorum Yapma/Silme.
*   **Ürün Listeleme:**
    *   **Kategori Filtreleme:** Sol menüden kategoriye göre ürünleri filtreleme.
    *   **Modern Izgara Yapısı:** Büyük ekranlarda 4'lü ürün gösterimi.
*   **Alışveriş Sepeti ve Sipariş Süreci:**
    *   **Dinamik Sepet:** Ürün ekleme, çıkarma, miktar güncelleme.
    *   **Sepet Sayfası (`/cart`):** Giriş yapılmadığında uyarı gösteren başlangıç sayfası.
    *   **Sipariş Özeti:** Ara toplam, KDV, kargo ve genel toplam gösterimi.
    *   **Ödeme (Simülasyon):** Gerçekçi kredi kartı formu ile simüle edilmiş ödeme akışı.
    *   **Adres Yönetimi:** Teslimat adresi formu.
    *   **Google Maps Entegrasyonu:** Adresin haritadan seçilebilmesi.

## 3. Mevcut Adım: UI/UX Geliştirmeleri ve Sepet Sayfası

*   [x] Proje planı, yeni UI/UX hedefleriyle güncellendi.
*   [ ] **`data/products.js` Güncellemesi:** Ürün verilerine `category` alanı eklenecek.
*   [ ] **`App.jsx` Güncellemesi:** Kayıt fonksiyonundaki uyarı mesajı güncellenecek ve `/cart` rotası eklenecek.
*   [ ] **`Cart.jsx` (Yeni Sayfa):** Giriş yapılmamışsa uyarı gösteren yeni sepet sayfası oluşturulacak.
*   [ ] **`Products.jsx` Güncellemesi:** Sayfa, solda kategori menüsü ve sağda 4'lü ürün ızgarası olacak şekilde yeniden yapılandırılacak.
*   [ ] **`ProductDetail.jsx` ve `Products.jsx` Güncellemesi:** "Sepete Ekle" butonları `addToCart` fonksiyonuna bağlanacak.
