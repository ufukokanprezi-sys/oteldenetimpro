// ============================================================
// auth.js — Kullanıcı Yönetimi & Rol Tabanlı Erişim Sistemi
// Admin / Denetçi | CryptoJS AES | localStorage
// ============================================================

const AUTH_KEY        = 'otelGizliMusteriAuth';
const KULLANICILAR_KEY = 'otelKullanicilar';
const AKTIF_KEY       = 'otelAktifKullanici';
const CRYPTO_SECRET   = 'otelGizliAnahtar2024';

// ─── Yardımcı: Şifrele / Çöz ────────────────────────────────
function authSifrele(veri) {
  return CryptoJS.AES.encrypt(JSON.stringify(veri), CRYPTO_SECRET).toString();
}

function authCoz(sifreli) {
  try {
    const bytes = CryptoJS.AES.decrypt(sifreli, CRYPTO_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
}

// ─── Şifre Hash ─────────────────────────────────────────────
function sifreHashle(sifre) {
  return CryptoJS.SHA256(sifre + CRYPTO_SECRET).toString();
}

// ─── Kullanıcıları Getir ─────────────────────────────────────
function kullanicilariGetir() {
  const raw = localStorage.getItem(KULLANICILAR_KEY);
  if (!raw) return [];
  const cozulmus = authCoz(raw);
  return Array.isArray(cozulmus) ? cozulmus : [];
}

// ─── Kullanıcıları Kaydet ────────────────────────────────────
function kullanicilariKaydet(liste) {
  localStorage.setItem(KULLANICILAR_KEY, authSifrele(liste));
}

// ─── İlk Kurulum: Admin Yoksa Oluştur ───────────────────────
function ilkKurulumKontrol() {
  const liste = kullanicilariGetir();
  const adminVar = liste.some(k => k.rol === 'admin');
  if (!adminVar) {
    const ilkAdmin = {
      id       : 'usr_' + Date.now(),
      ad       : 'Admin',
      kullaniciAdi: 'admin',
      sifreHash: sifreHashle('admin123'),
      rol      : 'admin',
      olusturma: new Date().toISOString(),
      aktif    : true
    };
    kullanicilariKaydet([ilkAdmin]);
  }
}

// ─── Giriş Yap ───────────────────────────────────────────────
function girisYap(kullaniciAdi, sifre) {
  const liste = kullanicilariGetir();
  const hash  = sifreHashle(sifre);
  const kullanici = liste.find(
    k => k.kullaniciAdi === kullaniciAdi && k.sifreHash === hash && k.aktif
  );

  if (!kullanici) return { basarili: false, mesaj: 'Kullanıcı adı veya şifre hatalı.' };

  const aktifVeri = {
    id          : kullanici.id,
    ad          : kullanici.ad,
    kullaniciAdi: kullanici.kullaniciAdi,
    rol         : kullanici.rol,
    girisZamani : new Date().toISOString()
  };

  localStorage.setItem(AKTIF_KEY, authSifrele(aktifVeri));
  return { basarili: true, kullanici: aktifVeri };
}

// ─── Çıkış Yap ───────────────────────────────────────────────
function cikisYap() {
  localStorage.removeItem(AKTIF_KEY);
  window.location.href = 'index.html';
}

// ─── Aktif Kullanıcıyı Getir ─────────────────────────────────
function aktifKullaniciyiGetir() {
  const raw = localStorage.getItem(AKTIF_KEY);
  if (!raw) return null;
  return authCoz(raw);
}

// ─── Oturum Kontrolü (Her Sayfada Çağır) ────────────────────
function oturumKontrol(gerekliRol = null) {
  const kullanici = aktifKullaniciyiGetir();
  if (!kullanici) {
    window.location.href = 'index.html';
    return null;
  }
  if (gerekliRol && kullanici.rol !== gerekliRol && kullanici.rol !== 'admin') {
    window.location.href = 'dashboard.html';
    return null;
  }
  return kullanici;
}

// ─── Rol Kontrolü ────────────────────────────────────────────
function adminMi() {
  const k = aktifKullaniciyiGetir();
  return k && k.rol === 'admin';
}

function denetciMi() {
  const k = aktifKullaniciyiGetir();
  return k && (k.rol === 'denetci' || k.rol === 'admin');
}

// ─── Yeni Kullanıcı Ekle (Sadece Admin) ──────────────────────
function kullaniciEkle(ad, kullaniciAdi, sifre, rol) {
  if (!adminMi()) return { basarili: false, mesaj: 'Yetkisiz işlem.' };

  const liste = kullanicilariGetir();
  const mevcutVar = liste.some(k => k.kullaniciAdi === kullaniciAdi);
  if (mevcutVar) return { basarili: false, mesaj: 'Bu kullanıcı adı zaten kullanılıyor.' };

  const yeni = {
    id          : 'usr_' + Date.now(),
    ad          : ad.trim(),
    kullaniciAdi: kullaniciAdi.trim().toLowerCase(),
    sifreHash   : sifreHashle(sifre),
    rol         : rol, // 'admin' veya 'denetci'
    olusturma   : new Date().toISOString(),
    aktif       : true
  };

  liste.push(yeni);
  kullanicilariKaydet(liste);
  return { basarili: true, kullanici: yeni };
}

// ─── Kullanıcı Sil (Sadece Admin, Kendini Silemez) ───────────
function kullaniciSil(kullaniciId) {
  if (!adminMi()) return { basarili: false, mesaj: 'Yetkisiz işlem.' };

  const aktif = aktifKullaniciyiGetir();
  if (aktif.id === kullaniciId) return { basarili: false, mesaj: 'Kendinizi silemezsiniz.' };

  const liste = kullanicilariGetir();
  const yeniListe = liste.filter(k => k.id !== kullaniciId);
  kullanicilariKaydet(yeniListe);
  return { basarili: true };
}

// ─── Kullanıcı Pasif Yap (Silmeden Devre Dışı) ───────────────
function kullaniciDevreDisi(kullaniciId) {
  if (!adminMi()) return { basarili: false, mesaj: 'Yetkisiz işlem.' };

  const liste = kullanicilariGetir();
  const idx   = liste.findIndex(k => k.id === kullaniciId);
  if (idx === -1) return { basarili: false, mesaj: 'Kullanıcı bulunamadı.' };

  liste[idx].aktif = false;
  kullanicilariKaydet(liste);
  return { basarili: true };
}

// ─── Şifre Güncelle ──────────────────────────────────────────
function sifreGuncelle(kullaniciId, yeniSifre) {
  const aktif = aktifKullaniciyiGetir();
  // Sadece admin veya kullanıcının kendisi değiştirebilir
  if (!aktif) return { basarili: false, mesaj: 'Oturum bulunamadı.' };
  if (aktif.id !== kullaniciId && aktif.rol !== 'admin') {
    return { basarili: false, mesaj: 'Yetkisiz işlem.' };
  }

  const liste = kullanicilariGetir();
  const idx   = liste.findIndex(k => k.id === kullaniciId);
  if (idx === -1) return { basarili: false, mesaj: 'Kullanıcı bulunamadı.' };

  liste[idx].sifreHash = sifreHashle(yeniSifre);
  kullanicilariKaydet(liste);
  return { basarili: true };
}

// ─── Kullanıcı Listesi (Sadece Admin Görebilir) ───────────────
function kullaniciListesiGetir() {
  if (!adminMi()) return [];
  return kullanicilariGetir().map(k => ({
    id          : k.id,
    ad          : k.ad,
    kullaniciAdi: k.kullaniciAdi,
    rol         : k.rol,
    aktif       : k.aktif,
    olusturma   : k.olusturma
  }));
}

// ─── Sayfa Yüklendiğinde Otomatik Çalış ──────────────────────
(function() {
  ilkKurulumKontrol();
})();
