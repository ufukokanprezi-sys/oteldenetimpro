// ============================================================
// service-worker.js — PWA Çevrimdışı Desteği
// ============================================================

const CACHE_ADI    = "denetim-pro-v1";
const CACHE_SURUMU = "2026-03-12";

// Önbelleğe alınacak dosyalar
const ONBELLEK_DOSYALAR = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./denetim.js",
  "./raporlar.js",
  "./birimler.js",
  "./data.js",
  "./manifest.json",
  // CryptoJS CDN yedeği
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
];

// ============================================================
// KURULUM — Dosyaları önbelleğe al
// ============================================================
self.addEventListener("install", e => {
  console.log("[SW] Kuruluyor...");
  e.waitUntil(
    caches.open(CACHE_ADI).then(cache => {
      console.log("[SW] Dosyalar önbelleğe alınıyor...");
      // Tek tek dene — biri başarısız olsa diğerleri etkilenmesin
      return Promise.allSettled(
        ONBELLEK_DOSYALAR.map(url =>
          cache.add(url).catch(err =>
            console.warn("[SW] Önbelleklenemedi:", url, err)
          )
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ============================================================
// AKTİFLEŞTİRME — Eski önbellekleri temizle
// ============================================================
self.addEventListener("activate", e => {
  console.log("[SW] Aktifleşiyor...");
  e.waitUntil(
    caches.keys().then(anahtarlar =>
      Promise.all(
        anahtarlar
          .filter(k => k !== CACHE_ADI)
          .map(k => {
            console.log("[SW] Eski önbellek siliniyor:", k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ============================================================
// FETCH — Önce önbellek, sonra ağ (Offline First)
// ============================================================
self.addEventListener("fetch", e => {
  // POST isteklerini atla
  if (e.request.method !== "GET") return;

  // Chrome extension isteklerini atla
  if (e.request.url.startsWith("chrome-extension://")) return;

  e.respondWith(
    caches.match(e.request).then(onbellekCevabi => {
      if (onbellekCevabi) {
        // Arka planda güncelle (Stale While Revalidate)
        const agIstegi = fetch(e.request).then(agCevabi => {
          if (agCevabi && agCevabi.status === 200) {
            caches.open(CACHE_ADI).then(cache =>
              cache.put(e.request, agCevabi.clone())
            );
          }
          return agCevabi;
        }).catch(() => {});

        return onbellekCevabi;
      }

      // Önbellekte yoksa ağdan al
      return fetch(e.request).then(agCevabi => {
        if (!agCevabi || agCevabi.status !== 200) return agCevabi;

        // Başarılı cevabı önbelleğe ekle
        caches.open(CACHE_ADI).then(cache =>
          cache.put(e.request, agCevabi.clone())
        );
        return agCevabi;
      }).catch(() => {
        // Ağ da yoksa offline sayfası döndür
        if (e.request.destination === "document") {
          return caches.match("./dashboard.html");
        }
      });
    })
  );
});

// ============================================================
// ARKA PLAN SENKRONIZASYON — Bağlantı gelince gönder
// ============================================================
self.addEventListener("sync", e => {
  if (e.tag === "denetim-senkron") {
    console.log("[SW] Arka plan senkronizasyonu başladı...");
    e.waitUntil(bekleyenKayitlariGonder());
  }
});

async function bekleyenKayitlariGonder() {
  // Firebase bağlantısı gelince bekleyen kayıtları gönder
  // Bu fonksiyon firebase-config.js ile birlikte çalışır
  const clients = await self.clients.matchAll();
  clients.forEach(client =>
    client.postMessage({ tip: "SENKRON_BASLADI" })
  );
}

// ============================================================
// PUSH BİLDİRİMLERİ — Opsiyonel
// ============================================================
self.addEventListener("push", e => {
  const veri = e.data?.json() || {
    baslik : "Denetim Pro",
    govde  : "Yeni bir bildiriminiz var.",
    ikon   : "./icon-192.png"
  };

  e.waitUntil(
    self.registration.showNotification(veri.baslik, {
      body : veri.govde,
      icon : veri.ikon,
      badge: "./icon-192.png",
      tag  : "denetim-bildiri"
    })
  );
});
