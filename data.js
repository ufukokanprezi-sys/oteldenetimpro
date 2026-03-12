// ============================================================
// data.js — Otel Gizli Müşteri Denetim Sistemi
// 32 Birim | 1280 Kriter | Misafir Yolculuğu Modeli
// ============================================================

const RENK_BANTLARI = {
  kritik:   { min: 0,  max: 49,  renk: "kirmizi", ikon: "⚠️",  etiket: "Kritik — Acil Aksiyon" },
  gelistir: { min: 50, max: 74,  renk: "sari",    ikon: "📋",  etiket: "Geliştirilmeli" },
  iyi:      { min: 75, max: 89,  renk: "yesil",   ikon: "✅",  etiket: "İyi Düzey" },
  mukemmel: { min: 90, max: 100, renk: "altin",   ikon: "⭐",  etiket: "Mükemmel" }
};

function getRenkBant(puan) {
  if (puan <= 49) return RENK_BANTLARI.kritik;
  if (puan <= 74) return RENK_BANTLARI.gelistir;
  if (puan <= 89) return RENK_BANTLARI.iyi;
  return RENK_BANTLARI.mukemmel;
}

const DENETIM_VERITABANI = [

  // ============================================================
  // BİRİM 1 — REZERVASYON
  // ============================================================
  {
    id: "birim_01",
    birimAdi: "Rezervasyon",
    sira: 1,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b01_b1_s01", sira: 1,  metin: "Telefon ilk 3 çalışta yanıtlandı mı?" },
          { id: "b01_b1_s02", sira: 2,  metin: "Personel kendini ismiyle tanıttı mı?" },
          { id: "b01_b1_s03", sira: 3,  metin: "Misafire ismiyle hitap edildi mi?" },
          { id: "b01_b1_s04", sira: 4,  metin: "Oda tipleri net biçimde anlatıldı mı?" },
          { id: "b01_b1_s05", sira: 5,  metin: "Fiyat bilgisi eksiksiz verildi mi?" },
          { id: "b01_b1_s06", sira: 6,  metin: "İptal koşulları bildirildi mi?" },
          { id: "b01_b1_s07", sira: 7,  metin: "Özel istekler (doğum günü, diyet vb.) soruldu mu?" },
          { id: "b01_b1_s08", sira: 8,  metin: "Rezervasyon özeti tekrar edildi mi?" },
          { id: "b01_b1_s09", sira: 9,  metin: "Onay maili / mesajı gönderildi mi?" },
          { id: "b01_b1_s10", sira: 10, metin: "Personel sabırlı ve ilgili miydi?" },
          { id: "b01_b1_s11", sira: 11, metin: "Alternatif oda seçeneği sunuldu mu?" },
          { id: "b01_b1_s12", sira: 12, metin: "Check-in / check-out saatleri bildirildi mi?" },
          { id: "b01_b1_s13", sira: 13, metin: "Ulaşım bilgisi sunuldu mu?" },
          { id: "b01_b1_s14", sira: 14, metin: "Erken / geç check-in imkânı soruldu mu?" },
          { id: "b01_b1_s15", sira: 15, metin: "Çocuk / engelli ihtiyaçları soruldu mu?" },
          { id: "b01_b1_s16", sira: 16, metin: "Paket / kampanya bilgisi verildi mi?" },
          { id: "b01_b1_s17", sira: 17, metin: "Görüşme boyunca nazik bir dil kullanıldı mı?" },
          { id: "b01_b1_s18", sira: 18, metin: "Beklemeye alındıysa misafir bilgilendirildi mi?" },
          { id: "b01_b1_s19", sira: 19, metin: "Rezervasyon numarası iletildi mi?" },
          { id: "b01_b1_s20", sira: 20, metin: "Kapanışta teşekkür edildi mi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b01_b2_s01", sira: 1,  metin: "Telefona yanıt süresi yeterli miydi?" },
          { id: "b01_b2_s02", sira: 2,  metin: "Personelin ses tonu ve nezaketi iyi miydi?" },
          { id: "b01_b2_s03", sira: 3,  metin: "Verilen bilgiler doğru ve güvenilir miydi?" },
          { id: "b01_b2_s04", sira: 4,  metin: "Rezervasyon süreci kolay ve akıcı mıydı?" },
          { id: "b01_b2_s05", sira: 5,  metin: "Web sitesi kullanımı kolay mıydı?" },
          { id: "b01_b2_s06", sira: 6,  metin: "Online rezervasyon formu anlaşılır mıydı?" },
          { id: "b01_b2_s07", sira: 7,  metin: "Fiyat / değer dengesi tatmin edici miydi?" },
          { id: "b01_b2_s08", sira: 8,  metin: "Özel isteklere yeterince ilgi gösterildi mi?" },
          { id: "b01_b2_s09", sira: 9,  metin: "Onay mailinin içeriği yeterli miydi?" },
          { id: "b01_b2_s10", sira: 10, metin: "Genel rezervasyon deneyimi memnuniyet verici miydi?" },
          { id: "b01_b2_s11", sira: 11, metin: "Alternatif seçenekler yeterince sunuldu mu?" },
          { id: "b01_b2_s12", sira: 12, metin: "Bilgilendirme eksiksiz miydi?" },
          { id: "b01_b2_s13", sira: 13, metin: "Personelin bilgi düzeyi yeterli miydi?" },
          { id: "b01_b2_s14", sira: 14, metin: "İletişim hızı yeterli miydi?" },
          { id: "b01_b2_s15", sira: 15, metin: "Sorular tatmin edici biçimde yanıtlandı mı?" },
          { id: "b01_b2_s16", sira: 16, metin: "Kampanya / paket bilgisi açıkça sunuldu mu?" },
          { id: "b01_b2_s17", sira: 17, metin: "Rezervasyon onayı zamanında ulaştı mı?" },
          { id: "b01_b2_s18", sira: 18, metin: "Müşteri hizmetleri kalitesi yüksek miydi?" },
          { id: "b01_b2_s19", sira: 19, metin: "Bu oteli tekrar tercih etmek ister misiniz?" },
          { id: "b01_b2_s20", sira: 20, metin: "İlk izlenim olarak otel imajı güçlü müydü?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 2 — DIŞ CEPHE / BİNA GİRİŞİ
  // ============================================================
  {
    id: "birim_02",
    birimAdi: "Dış Cephe / Bina Girişi",
    sira: 2,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b02_b1_s01", sira: 1,  metin: "Kapıda karşılayan personel hazır mıydı?" },
          { id: "b02_b1_s02", sira: 2,  metin: "Personel gülümseyerek karşıladı mı?" },
          { id: "b02_b1_s03", sira: 3,  metin: "Kapı misafir için açıldı mı?" },
          { id: "b02_b1_s04", sira: 4,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b02_b1_s05", sira: 5,  metin: "Misafire hoş geldiniz denildi mi?" },
          { id: "b02_b1_s06", sira: 6,  metin: "Bagaj taşıma yardımı teklif edildi mi?" },
          { id: "b02_b1_s07", sira: 7,  metin: "Personel otel hakkında bilgi verdi mi?" },
          { id: "b02_b1_s08", sira: 8,  metin: "Misafir resepsiyona yönlendirildi mi?" },
          { id: "b02_b1_s09", sira: 9,  metin: "Personel temiz ve düzgün görünümlü müydü?" },
          { id: "b02_b1_s10", sira: 10, metin: "Görevli kendini ismiyle tanıttı mı?" },
          { id: "b02_b1_s11", sira: 11, metin: "Hava durumuna göre şemsiye / önlem sunuldu mu?" },
          { id: "b02_b1_s12", sira: 12, metin: "Engelli misafir için yardım teklif edildi mi?" },
          { id: "b02_b1_s13", sira: 13, metin: "Personel resepsiyona kadar eşlik etti mi?" },
          { id: "b02_b1_s14", sira: 14, metin: "Güleryüzlü ve sıcak bir tutum sergilendi mi?" },
          { id: "b02_b1_s15", sira: 15, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b02_b1_s16", sira: 16, metin: "Araç kapısı açıldı mı?" },
          { id: "b02_b1_s17", sira: 17, metin: "Çocuklu misafire özel ilgi gösterildi mi?" },
          { id: "b02_b1_s18", sira: 18, metin: "Yoğun anlarda bile ilgi koparmadan sürdürüldü mü?" },
          { id: "b02_b1_s19", sira: 19, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b02_b1_s20", sira: 20, metin: "Güvenlik görevlisi görünür konumdaydı mı?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b02_b2_s01", sira: 1,  metin: "Binanın dış görünümü çekici miydi?" },
          { id: "b02_b2_s02", sira: 2,  metin: "Peyzaj ve bahçe düzenlemesi bakımlı mıydı?" },
          { id: "b02_b2_s03", sira: 3,  metin: "Giriş kapısı temiz miydi?" },
          { id: "b02_b2_s04", sira: 4,  metin: "Tabelalar görünür ve anlaşılır mıydı?" },
          { id: "b02_b2_s05", sira: 5,  metin: "Aydınlatma yeterli miydi?" },
          { id: "b02_b2_s06", sira: 6,  metin: "Genel bakım durumu iyi miydi?" },
          { id: "b02_b2_s07", sira: 7,  metin: "Engelli rampası kullanışlı mıydı?" },
          { id: "b02_b2_s08", sira: 8,  metin: "Otel girişi çekici ve davetkar mıydı?" },
          { id: "b02_b2_s09", sira: 9,  metin: "Giriş alanı genel olarak temiz miydi?" },
          { id: "b02_b2_s10", sira: 10, metin: "İlk izlenim olumlu muydu?" },
          { id: "b02_b2_s11", sira: 11, metin: "Giriş yolu düzenli ve güvenli miydi?" },
          { id: "b02_b2_s12", sira: 12, metin: "Bayrak / tabela düzeni profesyoneldi mi?" },
          { id: "b02_b2_s13", sira: 13, metin: "Gece aydınlatması yeterli miydi?" },
          { id: "b02_b2_s14", sira: 14, metin: "Güvenlik önlemleri yeterli miydi?" },
          { id: "b02_b2_s15", sira: 15, metin: "Çevre temizliği iyi miydi?" },
          { id: "b02_b2_s16", sira: 16, metin: "Mevsim koşullarına hazırlık yeterli miydi?" },
          { id: "b02_b2_s17", sira: 17, metin: "Otopark düzeni ve erişimi uygundu mu?" },
          { id: "b02_b2_s18", sira: 18, metin: "Bina tabelası gece de görünür müydü?" },
          { id: "b02_b2_s19", sira: 19, metin: "Giriş kapısı kolay açılıp kapanıyor muydu?" },
          { id: "b02_b2_s20", sira: 20, metin: "Genel dış cephe imajı otelin kalitesini yansıtıyor muydu?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 3 — LOBI / RESEPSIYON
  // ============================================================
  {
    id: "birim_03",
    birimAdi: "Lobi / Resepsiyon",
    sira: 3,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b03_b1_s01", sira: 1,  metin: "Resepsiyon görevlisi misafiri karşıladı mı?" },
          { id: "b03_b1_s02", sira: 2,  metin: "Check-in işlemi hızlı tamamlandı mı?" },
          { id: "b03_b1_s03", sira: 3,  metin: "Misafire ismiyle hitap edildi mi?" },
          { id: "b03_b1_s04", sira: 4,  metin: "Oda bilgisi eksiksiz verildi mi?" },
          { id: "b03_b1_s05", sira: 5,  metin: "Anahtar / kart teslimi düzgün yapıldı mı?" },
          { id: "b03_b1_s06", sira: 6,  metin: "Otel olanakları hakkında bilgi verildi mi?" },
          { id: "b03_b1_s07", sira: 7,  metin: "Özel istekler kayıt altına alındı mı?" },
          { id: "b03_b1_s08", sira: 8,  metin: "Personel güleryüzlü ve nazik miydi?" },
          { id: "b03_b1_s09", sira: 9,  metin: "Bekleme süresi makul müydü?" },
          { id: "b03_b1_s10", sira: 10, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b03_b1_s11", sira: 11, metin: "Oda yönlendirmesi yapıldı mı?" },
          { id: "b03_b1_s12", sira: 12, metin: "Bagaj yardımı teklif edildi mi?" },
          { id: "b03_b1_s13", sira: 13, metin: "Misafir bilgileri doğru alındı mı?" },
          { id: "b03_b1_s14", sira: 14, metin: "Güvenlik bilgileri paylaşıldı mı?" },
          { id: "b03_b1_s15", sira: 15, metin: "Resepsiyon personeli profesyonel görünümlü müydü?" },
          { id: "b03_b1_s16", sira: 16, metin: "Şikâyet / talep kanalları bildirildi mi?" },
          { id: "b03_b1_s17", sira: 17, metin: "Erken / geç check-out bilgisi verildi mi?" },
          { id: "b03_b1_s18", sira: 18, metin: "Misafir memnuniyeti soruldu mu?" },
          { id: "b03_b1_s19", sira: 19, metin: "Acil durum prosedürleri anlatıldı mı?" },
          { id: "b03_b1_s20", sira: 20, metin: "Kapanışta iyi konaklamalar dilendi mi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b03_b2_s01", sira: 1,  metin: "Lobi genel görünümü şık ve temiz miydi?" },
          { id: "b03_b2_s02", sira: 2,  metin: "Oturma alanları yeterli ve konforlu muydu?" },
          { id: "b03_b2_s03", sira: 3,  metin: "Lobi aydınlatması yeterli miydi?" },
          { id: "b03_b2_s04", sira: 4,  metin: "Havalandırma ve koku hoş muydu?" },
          { id: "b03_b2_s05", sira: 5,  metin: "Resepsiyon tezgâhı düzenli miydi?" },
          { id: "b03_b2_s06", sira: 6,  metin: "Yönlendirme tabelaları yeterli miydi?" },
          { id: "b03_b2_s07", sira: 7,  metin: "Lobi müziği uygun seviyede miydi?" },
          { id: "b03_b2_s08", sira: 8,  metin: "Genel temizlik standardı yüksek miydi?" },
          { id: "b03_b2_s09", sira: 9,  metin: "Dekorasyon otelin konseptiyle uyumluydu mu?" },
          { id: "b03_b2_s10", sira: 10, metin: "Wi-Fi bağlantısı lobide çalışıyor muydu?" },
          { id: "b03_b2_s11", sira: 11, metin: "Bagaj bekleme alanı yeterliydi mi?" },
          { id: "b03_b2_s12", sira: 12, metin: "Asansör erişimi kolay mıydı?" },
          { id: "b03_b2_s13", sira: 13, metin: "Engelli erişimi uygun muydu?" },
          { id: "b03_b2_s14", sira: 14, metin: "Lobi genel gürültü seviyesi kabul edilebilir miydi?" },
          { id: "b03_b2_s15", sira: 15, metin: "Bilgi panosu / broşürler güncel miydi?" },
          { id: "b03_b2_s16", sira: 16, metin: "Oturma alanları temiz ve bakımlı mıydı?" },
          { id: "b03_b2_s17", sira: 17, metin: "Resepsiyon bekleme süreci konforlu muydu?" },
          { id: "b03_b2_s18", sira: 18, metin: "Lobi genel atmosferi misafirperver miydi?" },
          { id: "b03_b2_s19", sira: 19, metin: "Güvenlik kamerası ve önlemleri görünür müydü?" },
          { id: "b03_b2_s20", sira: 20, metin: "Genel lobi deneyimi beklentileri karşıladı mı?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 4 — ODA / SUITE
  // ============================================================
  {
    id: "birim_04",
    birimAdi: "Oda / Suite",
    sira: 4,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b04_b1_s01", sira: 1,  metin: "Oda zamanında hazır mıydı?" },
          { id: "b04_b1_s02", sira: 2,  metin: "Oda tesliminde personel eşlik etti mi?" },
          { id: "b04_b1_s03", sira: 3,  metin: "Oda özellikleri tanıtıldı mı?" },
          { id: "b04_b1_s04", sira: 4,  metin: "Klima / ısıtma kullanımı anlatıldı mı?" },
          { id: "b04_b1_s05", sira: 5,  metin: "Minibar içeriği hakkında bilgi verildi mi?" },
          { id: "b04_b1_s06", sira: 6,  metin: "Oda servisi menüsü tanıtıldı mı?" },
          { id: "b04_b1_s07", sira: 7,  metin: "Kasa kullanımı anlatıldı mı?" },
          { id: "b04_b1_s08", sira: 8,  metin: "Acil çıkış bilgisi verildi mi?" },
          { id: "b04_b1_s09", sira: 9,  metin: "Özel istekler odaya yansıtıldı mı?" },
          { id: "b04_b1_s10", sira: 10, metin: "Personel nazik ve yardımsever miydi?" },
          { id: "b04_b1_s11", sira: 11, metin: "TV / eğlence sistemi kullanımı anlatıldı mı?" },
          { id: "b04_b1_s12", sira: 12, metin: "Wi-Fi şifresi iletildi mi?" },
          { id: "b04_b1_s13", sira: 13, metin: "Oda servisi saatleri bildirildi mi?" },
          { id: "b04_b1_s14", sira: 14, metin: "Çamaşırhane hizmeti tanıtıldı mı?" },
          { id: "b04_b1_s15", sira: 15, metin: "Misafirin soruları yanıtlandı mı?" },
          { id: "b04_b1_s16", sira: 16, metin: "Kapanışta iyi dinlenmeler dilendi mi?" },
          { id: "b04_b1_s17", sira: 17, metin: "Oda anahtarı / kartı düzgün çalışıyor muydu?" },
          { id: "b04_b1_s18", sira: 18, metin: "Ekstra yastık / yorgan talebi karşılandı mı?" },
          { id: "b04_b1_s19", sira: 19, metin: "Oda değişikliği talebi uygun şekilde işlendi mi?" },
          { id: "b04_b1_s20", sira: 20, metin: "Personel oda konusunda bilgi sahibi miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b04_b2_s01", sira: 1,  metin: "Oda genel temizliği yüksek standartlıydı mı?" },
          { id: "b04_b2_s02", sira: 2,  metin: "Yatak ve çarşaflar temiz ve düzenliydi mi?" },
          { id: "b04_b2_s03", sira: 3,  metin: "Banyo temizliği yeterliydi mi?" },
          { id: "b04_b2_s04", sira: 4,  metin: "Klima / ısıtma sistemi çalışıyor muydu?" },
          { id: "b04_b2_s05", sira: 5,  metin: "Aydınlatma yeterli ve işlevsel miydi?" },
          { id: "b04_b2_s06", sira: 6,  metin: "Ses yalıtımı yeterli miydi?" },
          { id: "b04_b2_s07", sira: 7,  metin: "Minibar eksiksiz ve soğuk muydu?" },
          { id: "b04_b2_s08", sira: 8,  metin: "Banyo malzemeleri tam ve kaliteliydi mi?" },
          { id: "b04_b2_s09", sira: 9,  metin: "TV ve eğlence sistemi çalışıyor muydu?" },
          { id: "b04_b2_s10", sira: 10, metin: "Wi-Fi hızı ve bağlantısı yeterliydi mi?" },
          { id: "b04_b2_s11", sira: 11, metin: "Oda genel kokusu hoş muydu?" },
          { id: "b04_b2_s12", sira: 12, metin: "Kasa çalışıyor ve kullanışlı mıydı?" },
          { id: "b04_b2_s13", sira: 13, metin: "Priz ve şarj noktaları yeterli miydi?" },
          { id: "b04_b2_s14", sira: 14, metin: "Oda büyüklüğü beklentileri karşıladı mı?" },
          { id: "b04_b2_s15", sira: 15, metin: "Manzara / pencere yeterli miydi?" },
          { id: "b04_b2_s16", sira: 16, metin: "Dolap ve depolama alanı yeterliydi mi?" },
          { id: "b04_b2_s17", sira: 17, metin: "Çalışma masası ve sandalye konforluydu mu?" },
          { id: "b04_b2_s18", sira: 18, metin: "Yatak konforu yüksek miydi?" },
          { id: "b04_b2_s19", sira: 19, metin: "Genel oda dekorasyonu şık mıydı?" },
          { id: "b04_b2_s20", sira: 20, metin: "Genel oda deneyimi beklentileri karşıladı mı?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 5 — BANYO / TUVALET
  // ============================================================
  {
    id: "birim_05",
    birimAdi: "Banyo / Tuvalet",
    sira: 5,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b05_b1_s01", sira: 1,  metin: "Banyo temizliği düzenli aralıklarla yapıldı mı?" },
          { id: "b05_b1_s02", sira: 2,  metin: "Temizlik personeli nazik ve sessiz miydi?" },
          { id: "b05_b1_s03", sira: 3,  metin: "Eksik malzemeler zamanında tamamlandı mı?" },
          { id: "b05_b1_s04", sira: 4,  metin: "Havlu değişimi zamanında yapıldı mı?" },
          { id: "b05_b1_s05", sira: 5,  metin: "Talep üzerine ekstra malzeme sağlandı mı?" },
          { id: "b05_b1_s06", sira: 6,  metin: "Personel kapı çalmadan odaya girmedi mi?" },
          { id: "b05_b1_s07", sira: 7,  metin: "Arıza bildirimi hızlı işlendi mi?" },
          { id: "b05_b1_s08", sira: 8,  metin: "Temizlik saatleri misafiri rahatsız etmedi mi?" },
          { id: "b05_b1_s09", sira: 9,  metin: "Personel özel isteklere duyarlı mıydı?" },
          { id: "b05_b1_s10", sira: 10, metin: "Banyo malzemeleri düzenli dizildi mi?" },
          { id: "b05_b1_s11", sira: 11, metin: "Temizlik sonrası oda düzeni korundu mu?" },
          { id: "b05_b1_s12", sira: 12, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b05_b1_s13", sira: 13, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b05_b1_s14", sira: 14, metin: "Ekstra havlu talebi karşılandı mı?" },
          { id: "b05_b1_s15", sira: 15, metin: "Saç kurutma makinesi çalışıyor muydu?" },
          { id: "b05_b1_s16", sira: 16, metin: "Banyo seti eksiksiz sunuldu mu?" },
          { id: "b05_b1_s17", sira: 17, metin: "Personel gizliliğe saygı gösterdi mi?" },
          { id: "b05_b1_s18", sira: 18, metin: "Tıkanıklık / arıza bildirimi işleme alındı mı?" },
          { id: "b05_b1_s19", sira: 19, metin: "Temizlik kalitesi tutarlı mıydı?" },
          { id: "b05_b1_s20", sira: 20, metin: "Genel banyo hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b05_b2_s01", sira: 1,  metin: "Banyo genel temizliği yüksek standartlıydı mı?" },
          { id: "b05_b2_s02", sira: 2,  metin: "Sıcak su düzenli ve yeterli geldi mi?" },
          { id: "b05_b2_s03", sira: 3,  metin: "Su basıncı yeterli miydi?" },
          { id: "b05_b2_s04", sira: 4,  metin: "Havlular temiz ve kaliteliydi mi?" },
          { id: "b05_b2_s05", sira: 5,  metin: "Banyo malzemeleri kaliteli miydi?" },
          { id: "b05_b2_s06", sira: 6,  metin: "Zemin kaymaz ve güvenliydi mi?" },
          { id: "b05_b2_s07", sira: 7,  metin: "Ayna ve aydınlatma yeterliydi mi?" },
          { id: "b05_b2_s08", sira: 8,  metin: "Havalandırma yeterli miydi?" },
          { id: "b05_b2_s09", sira: 9,  metin: "Küvet / duşakabin temiz miydi?" },
          { id: "b05_b2_s10", sira: 10, metin: "Tuvalet temiz ve hijyenik miydi?" },
          { id: "b05_b2_s11", sira: 11, metin: "Lavabo ve musluklar çalışıyor muydu?" },
          { id: "b05_b2_s12", sira: 12, metin: "Banyo genel kokusu hoş muydu?" },
          { id: "b05_b2_s13", sira: 13, metin: "Tuvalet kâğıdı ve kâğıt havlu yeterliydi mi?" },
          { id: "b05_b2_s14", sira: 14, metin: "Saç kurutma makinesi kaliteli miydi?" },
          { id: "b05_b2_s15", sira: 15, metin: "Banyo genel tasarımı şık mıydı?" },
          { id: "b05_b2_s16", sira: 16, metin: "Depolama alanı yeterliydi mi?" },
          { id: "b05_b2_s17", sira: 17, metin: "Banyo aksesuarları eksiksiz miydi?" },
          { id: "b05_b2_s18", sira: 18, metin: "Küvet / duş kullanımı konforlu muydu?" },
          { id: "b05_b2_s19", sira: 19, metin: "Genel banyo hijyeni kabul edilebilir düzeyde miydi?" },
          { id: "b05_b2_s20", sira: 20, metin: "Genel banyo deneyimi beklentileri karşıladı mı?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 6 — KAHVALTI / RESTORAN
  // ============================================================
  {
    id: "birim_06",
    birimAdi: "Kahvaltı / Restoran",
    sira: 6,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b06_b1_s01", sira: 1,  metin: "Misafir kapıda karşılandı mı?" },
          { id: "b06_b1_s02", sira: 2,  metin: "Masa yönlendirmesi yapıldı mı?" },
          { id: "b06_b1_s03", sira: 3,  metin: "Menü sunuldu mu?" },
          { id: "b06_b1_s04", sira: 4,  metin: "Personel sipariş alırken nazik miydi?" },
          { id: "b06_b1_s05", sira: 5,  metin: "Diyet / alerji bilgisi soruldu mu?" },
          { id: "b06_b1_s06", sira: 6,  metin: "Siparişler doğru ve eksiksiz getirildi mi?" },
          { id: "b06_b1_s07", sira: 7,  metin: "Servis süresi makul müydü?" },
          { id: "b06_b1_s08", sira: 8,  metin: "Masa düzenli tutuldu mu?" },
          { id: "b06_b1_s09", sira: 9,  metin: "İçecek ikmali düzenli yapıldı mı?" },
          { id: "b06_b1_s10", sira: 10, metin: "Personel menü hakkında bilgi sahibi miydi?" },
          { id: "b06_b1_s11", sira: 11, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b06_b1_s12", sira: 12, metin: "Özel dilek / kutlama düzenlemesi yapıldı mı?" },
          { id: "b06_b1_s13", sira: 13, metin: "Hesap doğru ve zamanında getirildi mi?" },
          { id: "b06_b1_s14", sira: 14, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b06_b1_s15", sira: 15, metin: "Çocuklu ailelere özel ilgi gösterildi mi?" },
          { id: "b06_b1_s16", sira: 16, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b06_b1_s17", sira: 17, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b06_b1_s18", sira: 18, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b06_b1_s19", sira: 19, metin: "Açık büfe düzeni düzenli tutuldu mu?" },
          { id: "b06_b1_s20", sira: 20, metin: "Genel servis kalitesi yüksek miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b06_b2_s01", sira: 1,  metin: "Yiyecek çeşitliliği yeterli miydi?" },
          { id: "b06_b2_s02", sira: 2,  metin: "Yiyeceklerin sunumu şık mıydı?" },
          { id: "b06_b2_s03", sira: 3,  metin: "Yiyeceklerin lezzeti yüksek miydi?" },
          { id: "b06_b2_s04", sira: 4,  metin: "Yiyecekler taze miydi?" },
          { id: "b06_b2_s05", sira: 5,  metin: "Sıcak yiyecekler sıcak servis edildi mi?" },
          { id: "b06_b2_s06", sira: 6,  metin: "Soğuk yiyecekler soğuk servis edildi mi?" },
          { id: "b06_b2_s07", sira: 7,  metin: "Restoran genel temizliği yüksek miydi?" },
          { id: "b06_b2_s08", sira: 8,  metin: "Masa ve sandalyeler temiz miydi?" },
          { id: "b06_b2_s09", sira: 9,  metin: "Restoran atmosferi keyifli miydi?" },
          { id: "b06_b2_s10", sira: 10, metin: "Aydınlatma yeterli ve uygun muydu?" },
          { id: "b06_b2_s11", sira: 11, metin: "Gürültü seviyesi kabul edilebilir miydi?" },
          { id: "b06_b2_s12", sira: 12, metin: "Vejetaryen / vegan seçenekler yeterliydi mi?" },
          { id: "b06_b2_s13", sira: 13, metin: "İçecek kalitesi yüksek miydi?" },
          { id: "b06_b2_s14", sira: 14, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b06_b2_s15", sira: 15, metin: "Açık büfe düzeni hijyenik miydi?" },
          { id: "b06_b2_s16", sira: 16, metin: "Oturma düzeni konforlu muydu?" },
          { id: "b06_b2_s17", sira: 17, metin: "Kahvaltı saatleri yeterli miydi?" },
          { id: "b06_b2_s18", sira: 18, metin: "Genel yemek deneyimi memnuniyet verici miydi?" },
          { id: "b06_b2_s19", sira: 19, metin: "Menü çeşitliliği beklentileri karşıladı mı?" },
          { id: "b06_b2_s20", sira: 20, metin: "Genel restoran deneyimi beklentileri karşıladı mı?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 7 — BAR / LOUNGE
  // ============================================================
  {
    id: "birim_07",
    birimAdi: "Bar / Lounge",
    sira: 7,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b07_b1_s01", sira: 1,  metin: "Misafir içeri girişte karşılandı mı?" },
          { id: "b07_b1_s02", sira: 2,  metin: "Oturma yönlendirmesi yapıldı mı?" },
          { id: "b07_b1_s03", sira: 3,  metin: "Menü zamanında sunuldu mu?" },
          { id: "b07_b1_s04", sira: 4,  metin: "Bartender / garson nazik miydi?" },
          { id: "b07_b1_s05", sira: 5,  metin: "Sipariş doğru alındı mı?" },
          { id: "b07_b1_s06", sira: 6,  metin: "İçecekler zamanında servis edildi mi?" },
          { id: "b07_b1_s07", sira: 7,  metin: "Personel içecekler hakkında bilgi sahibi miydi?" },
          { id: "b07_b1_s08", sira: 8,  metin: "Alkol servisinde yaş kontrolü yapıldı mı?" },
          { id: "b07_b1_s09", sira: 9,  metin: "Masa düzenli tutuldu mu?" },
          { id: "b07_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b07_b1_s11", sira: 11, metin: "Hesap doğru ve zamanında getirildi mi?" },
          { id: "b07_b1_s12", sira: 12, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b07_b1_s13", sira: 13, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b07_b1_s14", sira: 14, metin: "Alkollü içki önerileri uygun şekilde yapıldı mı?" },
          { id: "b07_b1_s15", sira: 15, metin: "Alkolsüz alternatifler sunuldu mu?" },
          { id: "b07_b1_s16", sira: 16, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b07_b1_s17", sira: 17, metin: "Atıştırmalık / meze önerileri yapıldı mı?" },
          { id: "b07_b1_s18", sira: 18, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b07_b1_s19", sira: 19, metin: "Genel servis tutumu profesyonel miydi?" },
          { id: "b07_b1_s20", sira: 20, metin: "Genel bar hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b07_b2_s01", sira: 1,  metin: "İçecek çeşitliliği yeterli miydi?" },
          { id: "b07_b2_s02", sira: 2,  metin: "İçeceklerin kalitesi yüksek miydi?" },
          { id: "b07_b2_s03", sira: 3,  metin: "Kokteyl sunumu şık mıydı?" },
          { id: "b07_b2_s04", sira: 4,  metin: "Bar genel temizliği yüksek miydi?" },
          { id: "b07_b2_s05", sira: 5,  metin: "Bar atmosferi keyifli miydi?" },
          { id: "b07_b2_s06", sira: 6,  metin: "Müzik seviyesi uygun muydu?" },
          { id: "b07_b2_s07", sira: 7,  metin: "Aydınlatma uygun muydu?" },
          { id: "b07_b2_s08", sira: 8,  metin: "Oturma konforu yeterliydi mi?" },
          { id: "b07_b2_s09", sira: 9,  metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b07_b2_s10", sira: 10, metin: "Alkollü içecek kalitesi yüksek miydi?" },
          { id: "b07_b2_s11", sira: 11, metin: "Alkolsüz içecek seçenekleri yeterliydi mi?" },
          { id: "b07_b2_s12", sira: 12, metin: "Atıştırmalık / meze kalitesi iyiydi mi?" },
          { id: "b07_b2_s13", sira: 13, metin: "Bar tezgâhı temiz ve düzenliydi mi?" },
          { id: "b07_b2_s14", sira: 14, metin: "Genel bar dekorasyonu şık mıydı?" },
          { id: "b07_b2_s15", sira: 15, metin: "Havalandırma yeterli miydi?" },
          { id: "b07_b2_s16", sira: 16, metin: "Gürültü seviyesi kabul edilebilir miydi?" },
          { id: "b07_b2_s17", sira: 17, metin: "Bar saatleri yeterli miydi?" },
          { id: "b07_b2_s18", sira: 18, metin: "Ödeme seçenekleri yeterliydi mi?" },
          { id: "b07_b2_s19", sira: 19, metin: "Genel bar deneyimi beklentileri karşıladı mı?" },
          { id: "b07_b2_s20", sira: 20, metin: "Bu bara tekrar gelmek ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 8 — SPA / WELLNESS
  // ============================================================
  {
    id: "birim_08",
    birimAdi: "Spa / Wellness",
    sira: 8,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b08_b1_s01", sira: 1,  metin: "Misafir karşılandı ve yönlendirildi mi?" },
          { id: "b08_b1_s02", sira: 2,  metin: "Sağlık durumu / kontrendikasyon soruldu mu?" },
          { id: "b08_b1_s03", sira: 3,  metin: "Hizmet seçenekleri tanıtıldı mı?" },
          { id: "b08_b1_s04", sira: 4,  metin: "Randevu zamanında başladı mı?" },
          { id: "b08_b1_s05", sira: 5,  metin: "Terapist profesyonel ve deneyimli miydi?" },
          { id: "b08_b1_s06", sira: 6,  metin: "Misafirin tercihleri dikkate alındı mı?" },
          { id: "b08_b1_s07", sira: 7,  metin: "Gizlilik ve özel alan korundu mu?" },
          { id: "b08_b1_s08", sira: 8,  metin: "Personel nazik ve sakin bir tutum sergiledi mi?" },
          { id: "b08_b1_s09", sira: 9,  metin: "Uygulama sonrası öneri / bilgi verildi mi?" },
          { id: "b08_b1_s10", sira: 10, metin: "Ek hizmet önerileri uygun şekilde yapıldı mı?" },
          { id: "b08_b1_s11", sira: 11, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b08_b1_s12", sira: 12, metin: "Soyunma odası / duş yönlendirmesi yapıldı mı?" },
          { id: "b08_b1_s13", sira: 13, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b08_b1_s14", sira: 14, metin: "Randevu hatırlatması yapıldı mı?" },
          { id: "b08_b1_s15", sira: 15, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b08_b1_s16", sira: 16, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b08_b1_s17", sira: 17, metin: "Ayrılışta memnuniyet soruldu mu?" },
          { id: "b08_b1_s18", sira: 18, metin: "Ürün önerileri bilgili şekilde yapıldı mı?" },
          { id: "b08_b1_s19", sira: 19, metin: "Genel spa personel tutumu profesyonel miydi?" },
          { id: "b08_b1_s20", sira: 20, metin: "Genel spa hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b08_b2_s01", sira: 1,  metin: "Spa genel temizliği yüksek miydi?" },
          { id: "b08_b2_s02", sira: 2,  metin: "Uygulama odası temiz ve düzenliydi mi?" },
          { id: "b08_b2_s03", sira: 3,  metin: "Spa atmosferi huzurlu ve rahatlatıcı mıydı?" },
          { id: "b08_b2_s04", sira: 4,  metin: "Müzik / ses ortamı uygun muydu?" },
          { id: "b08_b2_s05", sira: 5,  metin: "Aydınlatma uygun muydu?" },
          { id: "b08_b2_s06", sira: 6,  metin: "Sıcaklık ve havalandırma yeterliydi mi?" },
          { id: "b08_b2_s07", sira: 7,  metin: "Kullanılan ürünlerin kalitesi yüksek miydi?" },
          { id: "b08_b2_s08", sira: 8,  metin: "Havuz / jakuzi temiz miydi?" },
          { id: "b08_b2_s09", sira: 9,  metin: "Sauna / buhar odası çalışıyor muydu?" },
                    { id: "b08_b2_s10", sira: 10, metin: "Soyunma odası temiz ve donanımlı mıydı?" },
          { id: "b08_b2_s11", sira: 11, metin: "Havlu ve bornoz kalitesi yüksek miydi?" },
          { id: "b08_b2_s12", sira: 12, metin: "Dinlenme alanı konforlu muydu?" },
          { id: "b08_b2_s13", sira: 13, metin: "Spa menü çeşitliliği yeterli miydi?" },
          { id: "b08_b2_s14", sira: 14, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b08_b2_s15", sira: 15, metin: "Uygulama süresi yeterliydi mi?" },
          { id: "b08_b2_s16", sira: 16, metin: "Genel spa kokusu hoş muydu?" },
          { id: "b08_b2_s17", sira: 17, metin: "Spa rezervasyon süreci kolay mıydı?" },
          { id: "b08_b2_s18", sira: 18, metin: "Ekipman ve aletler temiz ve modern miydi?" },
          { id: "b08_b2_s19", sira: 19, metin: "Genel spa deneyimi beklentileri karşıladı mı?" },
          { id: "b08_b2_s20", sira: 20, metin: "Bu spa'ya tekrar gelmek ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 9 — HAVUZ
  // ============================================================
  {
    id: "birim_09",
    birimAdi: "Havuz",
    sira: 9,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b09_b1_s01", sira: 1,  metin: "Havuz personeli misafiri karşıladı mı?" },
          { id: "b09_b1_s02", sira: 2,  metin: "Şezlong / havlu tahsisi yapıldı mı?" },
          { id: "b09_b1_s03", sira: 3,  metin: "Havuz kuralları bildirildi mi?" },
          { id: "b09_b1_s04", sira: 4,  metin: "Cankurtaran görünür konumdaydı mı?" },
          { id: "b09_b1_s05", sira: 5,  metin: "İçecek / atıştırmalık servisi sunuldu mu?" },
          { id: "b09_b1_s06", sira: 6,  metin: "Personel nazik ve yardımsever miydi?" },
          { id: "b09_b1_s07", sira: 7,  metin: "Çocuklu ailelere özel ilgi gösterildi mi?" },
          { id: "b09_b1_s08", sira: 8,  metin: "Şezlong talepleri zamanında karşılandı mı?" },
          { id: "b09_b1_s09", sira: 9,  metin: "Havlu değişimi yapıldı mı?" },
          { id: "b09_b1_s10", sira: 10, metin: "Güneş kremi / aksesuar hizmeti sunuldu mu?" },
          { id: "b09_b1_s11", sira: 11, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b09_b1_s12", sira: 12, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b09_b1_s13", sira: 13, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b09_b1_s14", sira: 14, metin: "Havuz alanı temizliği düzenli yapıldı mı?" },
          { id: "b09_b1_s15", sira: 15, metin: "Engelli misafir için yardım teklif edildi mi?" },
          { id: "b09_b1_s16", sira: 16, metin: "Acil durum ekipmanları görünür müydü?" },
          { id: "b09_b1_s17", sira: 17, metin: "Havuz saatleri bildirildi mi?" },
          { id: "b09_b1_s18", sira: 18, metin: "Personel güvenlik kurallarını uyguladı mı?" },
          { id: "b09_b1_s19", sira: 19, metin: "Genel havuz personel tutumu profesyonel miydi?" },
          { id: "b09_b1_s20", sira: 20, metin: "Genel havuz hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b09_b2_s01", sira: 1,  metin: "Havuz suyu temiz ve berrak mıydı?" },
          { id: "b09_b2_s02", sira: 2,  metin: "Havuz su sıcaklığı uygun muydu?" },
          { id: "b09_b2_s03", sira: 3,  metin: "Havuz çevresi temiz miydi?" },
          { id: "b09_b2_s04", sira: 4,  metin: "Şezlong ve şemsiyeler yeterli miydi?" },
          { id: "b09_b2_s05", sira: 5,  metin: "Şezlong konforu yüksek miydi?" },
          { id: "b09_b2_s06", sira: 6,  metin: "Havuz alanı genel düzeni iyiydi mi?" },
          { id: "b09_b2_s07", sira: 7,  metin: "Çocuk havuzu yeterli ve güvenliydi mi?" },
          { id: "b09_b2_s08", sira: 8,  metin: "Duş ve soyunma alanları temiz miydi?" },
          { id: "b09_b2_s09", sira: 9,  metin: "Havuz bar / ikram hizmeti kaliteliydi mi?" },
          { id: "b09_b2_s10", sira: 10, metin: "Havuz aydınlatması yeterli miydi?" },
          { id: "b09_b2_s11", sira: 11, metin: "Kaymaz zemin güvenli miydi?" },
          { id: "b09_b2_s12", sira: 12, metin: "Havuz boyutu yeterli miydi?" },
          { id: "b09_b2_s13", sira: 13, metin: "Havuz kokusu hoş muydu?" },
          { id: "b09_b2_s14", sira: 14, metin: "Genel havuz alanı bakımlı mıydı?" },
          { id: "b09_b2_s15", sira: 15, metin: "Gece havuzu aydınlatması yeterliydi mi?" },
          { id: "b09_b2_s16", sira: 16, metin: "Havuz çevresi gürültü seviyesi uygundu mu?" },
          { id: "b09_b2_s17", sira: 17, metin: "Havuz ekipmanları (merdiven, tutamak) güvenliydi mi?" },
          { id: "b09_b2_s18", sira: 18, metin: "Havuz alanı kapasitesi yeterliydi mi?" },
          { id: "b09_b2_s19", sira: 19, metin: "Genel havuz deneyimi beklentileri karşıladı mı?" },
          { id: "b09_b2_s20", sira: 20, metin: "Bu havuzu tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 10 — FITNESS / SPOR MERKEZİ
  // ============================================================
  {
    id: "birim_10",
    birimAdi: "Fitness / Spor Merkezi",
    sira: 10,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b10_b1_s01", sira: 1,  metin: "Misafir karşılandı ve yönlendirildi mi?" },
          { id: "b10_b1_s02", sira: 2,  metin: "Fitness merkezi kuralları bildirildi mi?" },
          { id: "b10_b1_s03", sira: 3,  metin: "Ekipman kullanımı tanıtıldı mı?" },
          { id: "b10_b1_s04", sira: 4,  metin: "Sağlık durumu / kısıtlama soruldu mu?" },
          { id: "b10_b1_s05", sira: 5,  metin: "Personel yardımsever ve bilgili miydi?" },
          { id: "b10_b1_s06", sira: 6,  metin: "Havlu / su servisi sunuldu mu?" },
          { id: "b10_b1_s07", sira: 7,  metin: "Kişisel antrenör hizmeti tanıtıldı mı?" },
          { id: "b10_b1_s08", sira: 8,  metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b10_b1_s09", sira: 9,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b10_b1_s10", sira: 10, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b10_b1_s11", sira: 11, metin: "Ekipman arızası bildirildi mi?" },
          { id: "b10_b1_s12", sira: 12, metin: "Temizlik malzemeleri kullanıma sunuldu mu?" },
          { id: "b10_b1_s13", sira: 13, metin: "Soyunma odası yönlendirmesi yapıldı mı?" },
          { id: "b10_b1_s14", sira: 14, metin: "Fitness saatleri bildirildi mi?" },
          { id: "b10_b1_s15", sira: 15, metin: "Personel güvenlik kurallarını uyguladı mı?" },
          { id: "b10_b1_s16", sira: 16, metin: "Grup dersleri hakkında bilgi verildi mi?" },
          { id: "b10_b1_s17", sira: 17, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b10_b1_s18", sira: 18, metin: "Genel fitness personel tutumu profesyonel miydi?" },
          { id: "b10_b1_s19", sira: 19, metin: "Misafirin soruları eksiksiz yanıtlandı mı?" },
          { id: "b10_b1_s20", sira: 20, metin: "Genel fitness hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b10_b2_s01", sira: 1,  metin: "Fitness ekipmanları modern ve çalışır durumdaydı mı?" },
          { id: "b10_b2_s02", sira: 2,  metin: "Ekipman çeşitliliği yeterli miydi?" },
          { id: "b10_b2_s03", sira: 3,  metin: "Fitness merkezi genel temizliği yüksek miydi?" },
          { id: "b10_b2_s04", sira: 4,  metin: "Havalandırma yeterli miydi?" },
          { id: "b10_b2_s05", sira: 5,  metin: "Aydınlatma yeterli miydi?" },
          { id: "b10_b2_s06", sira: 6,  metin: "Müzik / ses ortamı uygun muydu?" },
          { id: "b10_b2_s07", sira: 7,  metin: "Soyunma odaları temiz ve donanımlı mıydı?" },
          { id: "b10_b2_s08", sira: 8,  metin: "Duş alanları temiz miydi?" },
          { id: "b10_b2_s09", sira: 9,  metin: "Su / içecek ikmal noktası yeterliydi mi?" },
          { id: "b10_b2_s10", sira: 10, metin: "Fitness alanı kapasitesi yeterliydi mi?" },
          { id: "b10_b2_s11", sira: 11, metin: "Zemin güvenli ve kaymaz mıydı?" },
          { id: "b10_b2_s12", sira: 12, metin: "Ayna ve görsel düzen yeterliydi mi?" },
          { id: "b10_b2_s13", sira: 13, metin: "Ekipman bakımı düzenli yapılıyor muydu?" },
          { id: "b10_b2_s14", sira: 14, metin: "Havlu servisi yeterliydi mi?" },
          { id: "b10_b2_s15", sira: 15, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b10_b2_s16", sira: 16, metin: "Genel fitness atmosferi motive ediciydi mi?" },
          { id: "b10_b2_s17", sira: 17, metin: "Güvenlik ekipmanları yeterliydi mi?" },
          { id: "b10_b2_s18", sira: 18, metin: "Fitness saatleri yeterli miydi?" },
          { id: "b10_b2_s19", sira: 19, metin: "Genel fitness deneyimi beklentileri karşıladı mı?" },
          { id: "b10_b2_s20", sira: 20, metin: "Bu fitness merkezini tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 11 — ODA SERVİSİ
  // ============================================================
  {
    id: "birim_11",
    birimAdi: "Oda Servisi",
    sira: 11,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b11_b1_s01", sira: 1,  metin: "Telefon zamanında yanıtlandı mı?" },
          { id: "b11_b1_s02", sira: 2,  metin: "Personel kendini ismiyle tanıttı mı?" },
          { id: "b11_b1_s03", sira: 3,  metin: "Sipariş doğru alındı mı?" },
          { id: "b11_b1_s04", sira: 4,  metin: "Tahmini teslimat süresi bildirildi mi?" },
          { id: "b11_b1_s05", sira: 5,  metin: "Sipariş zamanında teslim edildi mi?" },
          { id: "b11_b1_s06", sira: 6,  metin: "Personel kapıyı çalarak girdi mi?" },
          { id: "b11_b1_s07", sira: 7,  metin: "Sipariş eksiksiz ve doğru muydu?" },
          { id: "b11_b1_s08", sira: 8,  metin: "Servis düzeni şık ve düzenliydi mi?" },
          { id: "b11_b1_s09", sira: 9,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b11_b1_s10", sira: 10, metin: "Hesap doğru sunuldu mu?" },
          { id: "b11_b1_s11", sira: 11, metin: "Diyet / alerji talebi dikkate alındı mı?" },
          { id: "b11_b1_s12", sira: 12, metin: "Servis malzemeleri temiz miydi?" },
          { id: "b11_b1_s13", sira: 13, metin: "Tepsi / masa kurulumu düzgün yapıldı mı?" },
          { id: "b11_b1_s14", sira: 14, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b11_b1_s15", sira: 15, metin: "Kullanılan malzemelerin toplanması teklif edildi mi?" },
          { id: "b11_b1_s16", sira: 16, metin: "Personel gizliliğe saygı gösterdi mi?" },
          { id: "b11_b1_s17", sira: 17, metin: "Ek talep / istek karşılandı mı?" },
          { id: "b11_b1_s18", sira: 18, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b11_b1_s19", sira: 19, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b11_b1_s20", sira: 20, metin: "Genel oda servisi hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b11_b2_s01", sira: 1,  metin: "Yiyeceklerin lezzeti yüksek miydi?" },
          { id: "b11_b2_s02", sira: 2,  metin: "Yiyecekler sıcak / soğuk uygun sıcaklıkta geldi mi?" },
          { id: "b11_b2_s03", sira: 3,  metin: "Yiyeceklerin sunumu şık mıydı?" },
          { id: "b11_b2_s04", sira: 4,  metin: "Porsiyon büyüklüğü yeterli miydi?" },
          { id: "b11_b2_s05", sira: 5,  metin: "İçecek kalitesi yüksek miydi?" },
          { id: "b11_b2_s06", sira: 6,  metin: "Menü çeşitliliği yeterli miydi?" },
          { id: "b11_b2_s07", sira: 7,  metin: "Servis malzemeleri kaliteliydi mi?" },
          { id: "b11_b2_s08", sira: 8,  metin: "Teslimat süresi kabul edilebilir miydi?" },
          { id: "b11_b2_s09", sira: 9,  metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b11_b2_s10", sira: 10, metin: "Sipariş doğruluğu yüksek miydi?" },
          { id: "b11_b2_s11", sira: 11, metin: "Kahvaltı oda servisi kalitesi iyiydi mi?" },
          { id: "b11_b2_s12", sira: 12, metin: "Gece yarısı servisi yeterliydi mi?" },
          { id: "b11_b2_s13", sira: 13, metin: "Servis saatleri yeterli miydi?" },
          { id: "b11_b2_s14", sira: 14, metin: "Özel diyet seçenekleri yeterliydi mi?" },
          { id: "b11_b2_s15", sira: 15, metin: "Ambalaj / paketleme kaliteliydi mi?" },
          { id: "b11_b2_s16", sira: 16, metin: "Genel oda servisi deneyimi keyifliydi mi?" },
          { id: "b11_b2_s17", sira: 17, metin: "Sipariş takibi kolay mıydı?" },
          { id: "b11_b2_s18", sira: 18, metin: "Ödeme seçenekleri yeterliydi mi?" },
          { id: "b11_b2_s19", sira: 19, metin: "Genel oda servisi deneyimi beklentileri karşıladı mı?" },
          { id: "b11_b2_s20", sira: 20, metin: "Oda servisini tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 12 — TOPLANTI / KONFERANS SALONU
  // ============================================================
  {
    id: "birim_12",
    birimAdi: "Toplantı / Konferans Salonu",
    sira: 12,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b12_b1_s01", sira: 1,  metin: "Organizatör / koordinatör karşılamayı yaptı mı?" },
          { id: "b12_b1_s02", sira: 2,  metin: "Salon zamanında hazır mıydı?" },
          { id: "b12_b1_s03", sira: 3,  metin: "Teknik ekipman kurulumu yapıldı mı?" },
          { id: "b12_b1_s04", sira: 4,  metin: "Personel teknik konularda yardımcı oldu mu?" },
          { id: "b12_b1_s05", sira: 5,  metin: "İkram servisi zamanında yapıldı mı?" },
          { id: "b12_b1_s06", sira: 6,  metin: "Özel düzenleme talepleri karşılandı mı?" },
          { id: "b12_b1_s07", sira: 7,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b12_b1_s08", sira: 8,  metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b12_b1_s09", sira: 9,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b12_b1_s10", sira: 10, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b12_b1_s11", sira: 11, metin: "Mola organizasyonu zamanında yapıldı mı?" },
          { id: "b12_b1_s12", sira: 12, metin: "Salon düzeni talebe göre ayarlandı mı?" },
          { id: "b12_b1_s13", sira: 13, metin: "Teknik arıza anında müdahale edildi mi?" },
          { id: "b12_b1_s14", sira: 14, metin: "Etkinlik sonrası teşekkür edildi mi?" },
          { id: "b12_b1_s15", sira: 15, metin: "Koordinatör süreç boyunca ulaşılabilir miydi?" },
          { id: "b12_b1_s16", sira: 16, metin: "Katılımcı listesi / kayıt işlemi düzgün yapıldı mı?" },
          { id: "b12_b1_s17", sira: 17, metin: "Yönlendirme tabelaları yeterliydi mi?" },
          { id: "b12_b1_s18", sira: 18, metin: "Genel organizasyon koordinasyonu başarılıydı mı?" },
          { id: "b12_b1_s19", sira: 19, metin: "Misafir talepleri proaktif karşılandı mı?" },
          { id: "b12_b1_s20", sira: 20, metin: "Genel toplantı hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b12_b2_s01", sira: 1,  metin: "Salon büyüklüğü yeterli miydi?" },
          { id: "b12_b2_s02", sira: 2,  metin: "Teknik ekipman (projeksiyon, ses) kaliteli miydi?" },
          { id: "b12_b2_s03", sira: 3,  metin: "Wi-Fi hızı ve bağlantısı yeterliydi mi?" },
          { id: "b12_b2_s04", sira: 4,  metin: "Aydınlatma yeterli ve ayarlanabilir miydi?" },
          { id: "b12_b2_s05", sira: 5,  metin: "Havalandırma ve sıcaklık uygundu mu?" },
          { id: "b12_b2_s06", sira: 6,  metin: "Ses yalıtımı yeterli miydi?" },
          { id: "b12_b2_s07", sira: 7,  metin: "Oturma düzeni konforlu muydu?" },
          { id: "b12_b2_s08", sira: 8,  metin: "Salon genel temizliği yüksek miydi?" },
          { id: "b12_b2_s09", sira: 9,  metin: "İkram kalitesi yüksek miydi?" },
          { id: "b12_b2_s10", sira: 10, metin: "İkram çeşitliliği yeterli miydi?" },
          { id: "b12_b2_s11", sira: 11, metin: "Yazı tahtası / flipchart yeterliydi mi?" },
          { id: "b12_b2_s12", sira: 12, metin: "Kırtasiye malzemeleri eksiksiz miydi?" },
          { id: "b12_b2_s13", sira: 13, metin: "Tuvalet / lavabo erişimi kolay mıydı?" },
          { id: "b12_b2_s14", sira: 14, metin: "Otopark erişimi yeterliydi mi?" },
          { id: "b12_b2_s15", sira: 15, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b12_b2_s16", sira: 16, metin: "Salon dekorasyonu profesyonel bir atmosfer sundu mu?" },
          { id: "b12_b2_s17", sira: 17, metin: "Engelli erişimi uygun muydu?" },
          { id: "b12_b2_s18", sira: 18, metin: "Genel toplantı salonu deneyimi keyifliydi mi?" },
          { id: "b12_b2_s19", sira: 19, metin: "Genel toplantı deneyimi beklentileri karşıladı mı?" },
          { id: "b12_b2_s20", sira: 20, metin: "Bu salonu tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

   // ============================================================
  // BİRİM 13 — ÇAMAŞIRHANE (Vale kaldırıldı)
  // ============================================================
  {
    id: "birim_13",
    birimAdi: "Çamaşırhane",
    sira: 13,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b13_b1_s01", sira: 1,  metin: "Çamaşırhane hizmeti check-in'de tanıtıldı mı?" },
          { id: "b13_b1_s02", sira: 2,  metin: "Teslimat süresi önceden bildirildi mi?" },
          { id: "b13_b1_s03", sira: 3,  metin: "Kıyafetler zamanında teslim alındı mı?" },
          { id: "b13_b1_s04", sira: 4,  metin: "Kıyafetler zamanında iade edildi mi?" },
          { id: "b13_b1_s05", sira: 5,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b13_b1_s06", sira: 6,  metin: "Özel bakım / yıkama talimatları dikkate alındı mı?" },
          { id: "b13_b1_s07", sira: 7,  metin: "Hasar veya kayıp durumunda misafir bilgilendirildi mi?" },
          { id: "b13_b1_s08", sira: 8,  metin: "Fiyat bilgisi işlem öncesinde verildi mi?" },
          { id: "b13_b1_s09", sira: 9,  metin: "Acil / ekspres servis talebi karşılandı mı?" },
          { id: "b13_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b13_b1_s11", sira: 11, metin: "Kıyafetler özenli biçimde paketlendi mi?" },
          { id: "b13_b1_s12", sira: 12, metin: "Personel misafirin gizliliğine saygı gösterdi mi?" },
          { id: "b13_b1_s13", sira: 13, metin: "Kıyafet teslim formu / listesi eksiksiz dolduruldu mu?" },
          { id: "b13_b1_s14", sira: 14, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b13_b1_s15", sira: 15, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b13_b1_s16", sira: 16, metin: "Oda teslimatı sırasında kapı çalındı mı?" },
          { id: "b13_b1_s17", sira: 17, metin: "Ek temizlik / onarım talebi karşılandı mı?" },
          { id: "b13_b1_s18", sira: 18, metin: "Hizmet saatleri misafire bildirildi mi?" },
          { id: "b13_b1_s19", sira: 19, metin: "Genel çamaşırhane personel tutumu profesyonel miydi?" },
          { id: "b13_b1_s20", sira: 20, metin: "Genel çamaşırhane hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b13_b2_s01", sira: 1,  metin: "Kıyafetler temiz ve eksiksiz iade edildi mi?" },
          { id: "b13_b2_s02", sira: 2,  metin: "Ütüleme kalitesi yüksek miydi?" },
          { id: "b13_b2_s03", sira: 3,  metin: "Kuru temizleme kalitesi yüksek miydi?" },
          { id: "b13_b2_s04", sira: 4,  metin: "Kıyafetler herhangi bir hasar görmeden iade edildi mi?" },
          { id: "b13_b2_s05", sira: 5,  metin: "Paketleme kalitesi yüksek ve özenli miydi?" },
          { id: "b13_b2_s06", sira: 6,  metin: "Teslimat süresi makul müydü?" },
          { id: "b13_b2_s07", sira: 7,  metin: "Fiyatlandırma şeffaf ve adil miydi?" },
          { id: "b13_b2_s08", sira: 8,  metin: "Ekspres servis kalitesi standart hizmetle eşit miydi?" },
          { id: "b13_b2_s09", sira: 9,  metin: "Kıyafet takip / kayıt sistemi güvenilir miydi?" },
          { id: "b13_b2_s10", sira: 10, metin: "Özel kumaş bakımı (ipek, yün vb.) doğru yapıldı mı?" },
          { id: "b13_b2_s11", sira: 11, metin: "Leke çıkarma işlemi başarılı mıydı?" },
          { id: "b13_b2_s12", sira: 12, metin: "Kıyafetlerin kokusu temiz ve hoş muydu?" },
          { id: "b13_b2_s13", sira: 13, metin: "Hizmet saatleri yeterli miydi?" },
          { id: "b13_b2_s14", sira: 14, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b13_b2_s15", sira: 15, metin: "Çamaşırhane alanı temiz ve düzenliydi mi?" },
          { id: "b13_b2_s16", sira: 16, metin: "Onarım / dikiş hizmeti kaliteli miydi?" },
          { id: "b13_b2_s17", sira: 17, metin: "Genel çamaşırhane hizmeti güvenilir miydi?" },
          { id: "b13_b2_s18", sira: 18, metin: "Ödeme seçenekleri yeterliydi mi?" },
          { id: "b13_b2_s19", sira: 19, metin: "Genel çamaşırhane deneyimi beklentileri karşıladı mı?" },
          { id: "b13_b2_s20", sira: 20, metin: "Bu hizmeti tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 14 — CONCIERGE / DANIŞMA
  // ============================================================
  {
    id: "birim_14",
    birimAdi: "Concierge / Danışma",
    sira: 14,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b14_b1_s01", sira: 1,  metin: "Concierge misafiri sıcak karşıladı mı?" },
          { id: "b14_b1_s02", sira: 2,  metin: "Misafirin ihtiyacı doğru anlaşıldı mı?" },
          { id: "b14_b1_s03", sira: 3,  metin: "Yerel aktivite / gezi önerileri yapıldı mı?" },
          { id: "b14_b1_s04", sira: 4,  metin: "Restoran rezervasyonu yapıldı mı?" },
          { id: "b14_b1_s05", sira: 5,  metin: "Ulaşım organizasyonu sağlandı mı?" },
          { id: "b14_b1_s06", sira: 6,  metin: "Tur / etkinlik rezervasyonu yapıldı mı?" },
          { id: "b14_b1_s07", sira: 7,  metin: "Personel bölge hakkında bilgili miydi?" },
          { id: "b14_b1_s08", sira: 8,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b14_b1_s09", sira: 9,  metin: "Özel talep / sürpriz organizasyonu yapıldı mı?" },
          { id: "b14_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b14_b1_s11", sira: 11, metin: "Personel nazik ve sabırlı mıydı?" },
          { id: "b14_b1_s12", sira: 12, metin: "Bilgi güncel ve doğru muydu?" },
          { id: "b14_b1_s13", sira: 13, metin: "Harita / broşür temin edildi mi?" },
          { id: "b14_b1_s14", sira: 14, metin: "Acil durum yardımı sağlandı mı?" },
          { id: "b14_b1_s15", sira: 15, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b14_b1_s16", sira: 16, metin: "Takip / geri bildirim yapıldı mı?" },
          { id: "b14_b1_s17", sira: 17, metin: "Hizmet proaktif şekilde sunuldu mu?" },
          { id: "b14_b1_s18", sira: 18, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b14_b1_s19", sira: 19, metin: "Genel concierge tutumu profesyonel miydi?" },
          { id: "b14_b1_s20", sira: 20, metin: "Genel concierge hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b14_b2_s01", sira: 1,  metin: "Verilen bilgilerin doğruluğu yüksek miydi?" },
          { id: "b14_b2_s02", sira: 2,  metin: "Öneri kalitesi beklentileri karşıladı mı?" },
          { id: "b14_b2_s03", sira: 3,  metin: "Rezervasyon / organizasyon hızı yeterliydi mi?" },
          { id: "b14_b2_s04", sira: 4,  metin: "Ulaşım organizasyonu sorunsuz muydu?" },
          { id: "b14_b2_s05", sira: 5,  metin: "Tur / etkinlik kalitesi beklentileri karşıladı mı?" },
          { id: "b14_b2_s06", sira: 6,  metin: "Concierge masası erişilebilir konumdaydı mı?" },
          { id: "b14_b2_s07", sira: 7,  metin: "Hizmet saatleri yeterli miydi?" },
          { id: "b14_b2_s08", sira: 8,  metin: "Broşür / bilgi materyalleri güncel miydi?" },
          { id: "b14_b2_s09", sira: 9,  metin: "Özel organizasyon kalitesi yüksek miydi?" },
          { id: "b14_b2_s10", sira: 10, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b14_b2_s11", sira: 11, metin: "Dijital / online concierge hizmeti yeterliydi mi?" },
          { id: "b14_b2_s12", sira: 12, metin: "Genel bilgi düzeyi tatmin ediciydi mi?" },
          { id: "b14_b2_s13", sira: 13, metin: "Hizmet kişiselleştirilmiş miydi?" },
          { id: "b14_b2_s14", sira: 14, metin: "Bekleme süresi makul müydü?" },
          { id: "b14_b2_s15", sira: 15, metin: "Concierge hizmeti genel olarak güvenilir miydi?" },
          { id: "b14_b2_s16", sira: 16, metin: "Misafir deneyimini zenginleştirdi mi?" },
          { id: "b14_b2_s17", sira: 17, metin: "Acil durum desteği yeterliydi mi?" },
          { id: "b14_b2_s18", sira: 18, metin: "Genel concierge deneyimi keyifliydi mi?" },
          { id: "b14_b2_s19", sira: 19, metin: "Genel concierge deneyimi beklentileri karşıladı mı?" },
          { id: "b14_b2_s20", sira: 20, metin: "Bu hizmeti tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 15 — ÇOCUK KULÜBÜ / AİLE HİZMETLERİ
  // ============================================================
  {
    id: "birim_15",
    birimAdi: "Çocuk Kulübü / Aile Hizmetleri",
    sira: 15,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b15_b1_s01", sira: 1,  metin: "Personel çocukları sıcak karşıladı mı?" },
          { id: "b15_b1_s02", sira: 2,  metin: "Aktivite programı tanıtıldı mı?" },
          { id: "b15_b1_s03", sira: 3,  metin: "Yaş gruplarına uygun aktiviteler sunuldu mu?" },
          { id: "b15_b1_s04", sira: 4,  metin: "Personel çocuklarla ilgili ve sabırlı mıydı?" },
          { id: "b15_b1_s05", sira: 5,  metin: "Güvenlik kuralları uygulandı mı?" },
          { id: "b15_b1_s06", sira: 6,  metin: "Ebeveynler düzenli bilgilendirildi mi?" },
          { id: "b15_b1_s07", sira: 7,  metin: "Çocuk teslim / teslim alma prosedürü güvenliydi mi?" },
          { id: "b15_b1_s08", sira: 8,  metin: "Alerji / sağlık bilgisi alındı mı?" },
          { id: "b15_b1_s09", sira: 9,  metin: "Personel ilk yardım bilgisine sahip miydi?" },
          { id: "b15_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b15_b1_s11", sira: 11, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b15_b1_s12", sira: 12, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b15_b1_s13", sira: 13, metin: "Bebek bakım hizmetleri sunuldu mu?" },
          { id: "b15_b1_s14", sira: 14, metin: "Çocuk menüsü hakkında bilgi verildi mi?" },
          { id: "b15_b1_s15", sira: 15, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b15_b1_s16", sira: 16, metin: "Aktiviteler eğlenceli ve eğitici miydi?" },
          { id: "b15_b1_s17", sira: 17, metin: "Ayrılışta çocuklara veda edildi mi?" },
          { id: "b15_b1_s18", sira: 18, metin: "Ebeveynlere gün sonu özeti verildi mi?" },
          { id: "b15_b1_s19", sira: 19, metin: "Genel çocuk kulübü personel tutumu profesyonel miydi?" },
          { id: "b15_b1_s20", sira: 20, metin: "Genel çocuk kulübü hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b15_b2_s01", sira: 1,  metin: "Çocuk kulübü alanı güvenli miydi?" },
          { id: "b15_b2_s02", sira: 2,  metin: "Oyun alanı temiz ve bakımlı mıydı?" },
          { id: "b15_b2_s03", sira: 3,  metin: "Oyuncaklar / materyaller yaşa uygun muydu?" },
          { id: "b15_b2_s04", sira: 4,  metin: "Alan büyüklüğü yeterli miydi?" },
          { id: "b15_b2_s05", sira: 5,  metin: "Aktivite çeşitliliği yeterli miydi?" },
          { id: "b15_b2_s06", sira: 6,  metin: "Havalandırma ve sıcaklık uygundu mu?" },
          { id: "b15_b2_s07", sira: 7,  metin: "Bebek bakım alanı yeterliydi mi?" },
          { id: "b15_b2_s08", sira: 8,  metin: "Çocuk menüsü kaliteli miydi?" },
          { id: "b15_b2_s09", sira: 9,  metin: "Güvenlik ekipmanları yeterliydi mi?" },
          { id: "b15_b2_s10", sira: 10, metin: "Genel temizlik standardı yüksek miydi?" },
          { id: "b15_b2_s11", sira: 11, metin: "Çocuk havuzu güvenli ve temiz miydi?" },
          { id: "b15_b2_s12", sira: 12, metin: "Ebeveyn bekleme alanı konforlu muydu?" },
          { id: "b15_b2_s13", sira: 13, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b15_b2_s14", sira: 14, metin: "Çalışma saatleri yeterli miydi?" },
          { id: "b15_b2_s15", sira: 15, metin: "Aktivite programı çeşitli ve zengin miydi?" },
          { id: "b15_b2_s16", sira: 16, metin: "Engelli çocuklar için uygun düzenleme var mıydı?" },
          { id: "b15_b2_s17", sira: 17, metin: "Genel çocuk kulübü atmosferi neşeli miydi?" },
          { id: "b15_b2_s18", sira: 18, metin: "Çocukların memnuniyeti yüksek miydi?" },
          { id: "b15_b2_s19", sira: 19, metin: "Genel çocuk kulübü deneyimi beklentileri karşıladı mı?" },
          { id: "b15_b2_s20", sira: 20, metin: "Bu hizmeti tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 16 — GÜVENLİK
  // ============================================================
  {
    id: "birim_16",
    birimAdi: "Güvenlik",
    sira: 16,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b16_b1_s01", sira: 1,  metin: "Güvenlik personeli görünür konumdaydı mı?" },
          { id: "b16_b1_s02", sira: 2,  metin: "Giriş kontrolü uygun şekilde yapıldı mı?" },
          { id: "b16_b1_s03", sira: 3,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b16_b1_s04", sira: 4,  metin: "Misafir kimlik doğrulaması yapıldı mı?" },
          { id: "b16_b1_s05", sira: 5,  metin: "Şüpheli durumlarda müdahale edildi mi?" },
          { id: "b16_b1_s06", sira: 6,  metin: "Acil durum prosedürleri uygulandı mı?" },
          { id: "b16_b1_s07", sira: 7,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b16_b1_s08", sira: 8,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b16_b1_s09", sira: 9,  metin: "Kayıp eşya prosedürü uygulandı mı?" },
          { id: "b16_b1_s10", sira: 10, metin: "Güvenlik turu düzenli yapıldı mı?" },
          { id: "b16_b1_s11", sira: 11, metin: "Misafir şikâyetleri ciddiye alındı mı?" },
          { id: "b16_b1_s12", sira: 12, metin: "Otopark güvenliği sağlandı mı?" },
          { id: "b16_b1_s13", sira: 13, metin: "Yangın güvenliği ekipmanları kontrol edildi mi?" },
          { id: "b16_b1_s14", sira: 14, metin: "Personel ilk yardım bilgisine sahip miydi?" },
          { id: "b16_b1_s15", sira: 15, metin: "Gece güvenliği yeterli miydi?" },
          { id: "b16_b1_s16", sira: 16, metin: "CCTV sistemi çalışıyor muydu?" },
          { id: "b16_b1_s17", sira: 17, metin: "Misafir mahremiyeti korundu mu?" },
          { id: "b16_b1_s18", sira: 18, metin: "Güvenlik personeli iletişim araçlarını kullandı mı?" },
          { id: "b16_b1_s19", sira: 19, metin: "Genel güvenlik personel tutumu profesyonel miydi?" },
          { id: "b16_b1_s20", sira: 20, metin: "Genel güvenlik hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b16_b2_s01", sira: 1,  metin: "Otel genel güvenlik seviyesi yüksek miydi?" },
          { id: "b16_b2_s02", sira: 2,  metin: "CCTV kapsama alanı yeterli miydi?" },
          { id: "b16_b2_s03", sira: 3,  metin: "Elektronik kart sistemi güvenilir miydi?" },
          { id: "b16_b2_s04", sira: 4,  metin: "Yangın alarm sistemi çalışır durumdaydı mı?" },
          { id: "b16_b2_s05", sira: 5,  metin: "Acil çıkış işaretleri görünür müydü?" },
          { id: "b16_b2_s06", sira: 6,  metin: "Yangın söndürücüler erişilebilir konumdaydı mı?" },
          { id: "b16_b2_s07", sira: 7,  metin: "Otopark aydınlatması yeterli miydi?" },
          { id: "b16_b2_s08", sira: 8,  metin: "Otopark güvenli ve düzenliydi mi?" },
                   { id: "b16_b2_s09", sira: 9,  metin: "Giriş kontrol sistemi güvenilir miydi?" },
          { id: "b16_b2_s10", sira: 10, metin: "Misafir kasası güvenli miydi?" },
          { id: "b16_b2_s11", sira: 11, metin: "Ortak alanlar güvenli hissettirdi mi?" },
          { id: "b16_b2_s12", sira: 12, metin: "Asansör güvenliği yeterli miydi?" },
          { id: "b16_b2_s13", sira: 13, metin: "Havuz / spa güvenlik önlemleri yeterliydi mi?" },
          { id: "b16_b2_s14", sira: 14, metin: "Acil durum aydınlatması çalışıyor muydu?" },
          { id: "b16_b2_s15", sira: 15, metin: "Genel güvenlik altyapısı modern miydi?" },
          { id: "b16_b2_s16", sira: 16, metin: "Misafir bilgileri gizliliği korundu mu?" },
          { id: "b16_b2_s17", sira: 17, metin: "Kayıp eşya sistemi güvenilir miydi?" },
          { id: "b16_b2_s18", sira: 18, metin: "Güvenlik protokolleri tutarlı uygulandı mı?" },
          { id: "b16_b2_s19", sira: 19, metin: "Genel güvenlik deneyimi beklentileri karşıladı mı?" },
          { id: "b16_b2_s20", sira: 20, metin: "Otelde kendinizi güvende hissettiniz mi?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 17 — TEKNİK HİZMETLER / BAKIM
  // ============================================================
  {
    id: "birim_17",
    birimAdi: "Teknik Hizmetler / Bakım",
    sira: 17,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b17_b1_s01", sira: 1,  metin: "Arıza bildirimi hızlı alındı mı?" },
          { id: "b17_b1_s02", sira: 2,  metin: "Tahmini müdahale süresi bildirildi mi?" },
          { id: "b17_b1_s03", sira: 3,  metin: "Teknisyen zamanında geldi mi?" },
          { id: "b17_b1_s04", sira: 4,  metin: "Personel kapı çalmadan odaya girmedi mi?" },
          { id: "b17_b1_s05", sira: 5,  metin: "Arıza kalıcı olarak giderildi mi?" },
          { id: "b17_b1_s06", sira: 6,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b17_b1_s07", sira: 7,  metin: "Çalışma sonrası alan temiz bırakıldı mı?" },
          { id: "b17_b1_s08", sira: 8,  metin: "Misafir süreci hakkında bilgilendirildi mi?" },
          { id: "b17_b1_s09", sira: 9,  metin: "Gizliliğe saygı gösterildi mi?" },
          { id: "b17_b1_s10", sira: 10, metin: "Şikâyet takibi yapıldı mı?" },
          { id: "b17_b1_s11", sira: 11, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b17_b1_s12", sira: 12, metin: "Teknik bilgi düzeyi yeterli miydi?" },
          { id: "b17_b1_s13", sira: 13, metin: "Ekipman ve alet kullanımı güvenliydi mi?" },
          { id: "b17_b1_s14", sira: 14, metin: "Misafirin onayı alınarak çalışıldı mı?" },
          { id: "b17_b1_s15", sira: 15, metin: "Acil teknik müdahale hızlı yapıldı mı?" },
          { id: "b17_b1_s16", sira: 16, metin: "Çözüm sonrası memnuniyet soruldu mu?" },
          { id: "b17_b1_s17", sira: 17, metin: "Personel alternatif çözüm önerdi mi?" },
          { id: "b17_b1_s18", sira: 18, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b17_b1_s19", sira: 19, metin: "Genel teknik personel tutumu profesyonel miydi?" },
          { id: "b17_b1_s20", sira: 20, metin: "Genel teknik hizmet memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b17_b2_s01", sira: 1,  metin: "Oda teknik ekipmanları genel olarak çalışır durumdaydı mı?" },
          { id: "b17_b2_s02", sira: 2,  metin: "Klima / ısıtma sistemi düzgün çalıştı mı?" },
          { id: "b17_b2_s03", sira: 3,  metin: "Elektrik sistemi sorunsuz muydu?" },
          { id: "b17_b2_s04", sira: 4,  metin: "Su tesisatı sorunsuz muydu?" },
          { id: "b17_b2_s05", sira: 5,  metin: "TV / eğlence sistemi çalışıyor muydu?" },
          { id: "b17_b2_s06", sira: 6,  metin: "Wi-Fi altyapısı güçlü müydü?" },
          { id: "b17_b2_s07", sira: 7,  metin: "Asansörler düzgün çalışıyor muydu?" },
          { id: "b17_b2_s08", sira: 8,  metin: "Arıza müdahale süresi makul müydü?" },
          { id: "b17_b2_s09", sira: 9,  metin: "Teknik sorunlar kalıcı olarak çözüldü mü?" },
          { id: "b17_b2_s10", sira: 10, metin: "Genel bakım kalitesi yüksek miydi?" },
          { id: "b17_b2_s11", sira: 11, metin: "Ortak alan teknik ekipmanları çalışıyor muydu?" },
          { id: "b17_b2_s12", sira: 12, metin: "Aydınlatma sistemleri sorunsuz muydu?" },
          { id: "b17_b2_s13", sira: 13, metin: "Güvenlik sistemleri çalışır durumdaydı mı?" },
          { id: "b17_b2_s14", sira: 14, metin: "Teknik altyapı genel olarak modern miydi?" },
          { id: "b17_b2_s15", sira: 15, metin: "Bakım çalışmaları misafiri rahatsız etmedi mi?" },
          { id: "b17_b2_s16", sira: 16, metin: "Önleyici bakım yeterli görünüyor muydu?" },
          { id: "b17_b2_s17", sira: 17, metin: "Teknik destek hattı ulaşılabilir miydi?" },
          { id: "b17_b2_s18", sira: 18, metin: "Genel teknik hizmet güvenilir miydi?" },
          { id: "b17_b2_s19", sira: 19, metin: "Genel teknik deneyimi beklentileri karşıladı mı?" },
          { id: "b17_b2_s20", sira: 20, metin: "Teknik hizmet genel konaklamayı olumsuz etkiledi mi?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 18 — HOUSEKEEPING / KAT HİZMETLERİ
  // ============================================================
  {
    id: "birim_18",
    birimAdi: "Housekeeping / Kat Hizmetleri",
    sira: 18,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b18_b1_s01", sira: 1,  metin: "Oda temizliği uygun saatte yapıldı mı?" },
          { id: "b18_b1_s02", sira: 2,  metin: "Personel kapı çalmadan odaya girmedi mi?" },
          { id: "b18_b1_s03", sira: 3,  metin: "Personel nazik ve sessiz miydi?" },
          { id: "b18_b1_s04", sira: 4,  metin: "Özel temizlik talepleri karşılandı mı?" },
          { id: "b18_b1_s05", sira: 5,  metin: "Havlu / çarşaf değişimi zamanında yapıldı mı?" },
          { id: "b18_b1_s06", sira: 6,  metin: "Eksik malzemeler tamamlandı mı?" },
          { id: "b18_b1_s07", sira: 7,  metin: "Kişisel eşyalara dokunulmadı mı?" },
          { id: "b18_b1_s08", sira: 8,  metin: "Personel gizliliğe saygı gösterdi mi?" },
          { id: "b18_b1_s09", sira: 9,  metin: "Temizlik sonrası oda düzeni korundu mu?" },
          { id: "b18_b1_s10", sira: 10, metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b18_b1_s11", sira: 11, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b18_b1_s12", sira: 12, metin: "Ekstra temizlik talebi karşılandı mı?" },
          { id: "b18_b1_s13", sira: 13, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b18_b1_s14", sira: 14, metin: "Temizlik ekipmanları uygun şekilde kullanıldı mı?" },
          { id: "b18_b1_s15", sira: 15, metin: "Çöp / atık düzenli toplandı mı?" },
          { id: "b18_b1_s16", sira: 16, metin: "Minibar yenileme zamanında yapıldı mı?" },
          { id: "b18_b1_s17", sira: 17, metin: "Banyo malzemeleri yenilendi mi?" },
          { id: "b18_b1_s18", sira: 18, metin: "Oda kokusu temizlik sonrası hoş muydu?" },
          { id: "b18_b1_s19", sira: 19, metin: "Genel housekeeping tutumu profesyonel miydi?" },
          { id: "b18_b1_s20", sira: 20, metin: "Genel kat hizmetleri memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b18_b2_s01", sira: 1,  metin: "Oda genel temizliği yüksek standartlıydı mı?" },
          { id: "b18_b2_s02", sira: 2,  metin: "Zemin temizliği yeterliydi mi?" },
          { id: "b18_b2_s03", sira: 3,  metin: "Toz alma işlemi eksiksiz yapıldı mı?" },
          { id: "b18_b2_s04", sira: 4,  metin: "Cam / ayna temizliği yeterliydi mi?" },
          { id: "b18_b2_s05", sira: 5,  metin: "Yatak yapımı düzgün ve özenli miydi?" },
          { id: "b18_b2_s06", sira: 6,  metin: "Banyo temizliği yüksek standartlıydı mı?" },
          { id: "b18_b2_s07", sira: 7,  metin: "Havlu / çarşaf kalitesi yüksek miydi?" },
          { id: "b18_b2_s08", sira: 8,  metin: "Oda kokusu hoş muydu?" },
          { id: "b18_b2_s09", sira: 9,  metin: "Temizlik sıklığı yeterli miydi?" },
          { id: "b18_b2_s10", sira: 10, metin: "Minibar yenileme kalitesi iyiydi mi?" },
          { id: "b18_b2_s11", sira: 11, metin: "Banyo malzemeleri kaliteli miydi?" },
          { id: "b18_b2_s12", sira: 12, metin: "Oda genel düzeni estetik miydi?" },
          { id: "b18_b2_s13", sira: 13, metin: "Temizlik ürünleri kaliteli miydi?" },
          { id: "b18_b2_s14", sira: 14, metin: "Koridor ve ortak alanlar temiz miydi?" },
          { id: "b18_b2_s15", sira: 15, metin: "Asansör temizliği yeterliydi mi?" },
          { id: "b18_b2_s16", sira: 16, metin: "Genel hijyen standardı yüksek miydi?" },
          { id: "b18_b2_s17", sira: 17, metin: "Temizlik tutarlı şekilde yapıldı mı?" },
          { id: "b18_b2_s18", sira: 18, metin: "Özel temizlik talebi kalitesi iyiydi mi?" },
          { id: "b18_b2_s19", sira: 19, metin: "Genel housekeeping deneyimi beklentileri karşıladı mı?" },
          { id: "b18_b2_s20", sira: 20, metin: "Housekeeping hizmeti konaklamayı olumlu etkiledi mi?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 19 — CHECK-OUT / AYRILIŞ
  // ============================================================
  {
    id: "birim_19",
    birimAdi: "Check-Out / Ayrılış",
    sira: 19,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b19_b1_s01", sira: 1,  metin: "Check-out işlemi hızlı tamamlandı mı?" },
          { id: "b19_b1_s02", sira: 2,  metin: "Misafire ismiyle hitap edildi mi?" },
          { id: "b19_b1_s03", sira: 3,  metin: "Hesap doğru ve eksiksiz sunuldu mu?" },
          { id: "b19_b1_s04", sira: 4,  metin: "Fatura kalemleri açıklandı mı?" },
          { id: "b19_b1_s05", sira: 5,  metin: "İtiraz / şikâyet saygıyla dinlendi mi?" },
          { id: "b19_b1_s06", sira: 6,  metin: "Ödeme seçenekleri sunuldu mu?" },
          { id: "b19_b1_s07", sira: 7,  metin: "Konaklama deneyimi hakkında geri bildirim alındı mı?" },
          { id: "b19_b1_s08", sira: 8,  metin: "Bagaj yardımı teklif edildi mi?" },
          { id: "b19_b1_s09", sira: 9,  metin: "Ulaşım / transfer organizasyonu yapıldı mı?" },
          { id: "b19_b1_s10", sira: 10, metin: "Personel nazik ve güler yüzlüydü mü?" },
          { id: "b19_b1_s11", sira: 11, metin: "Tekrar görüşme / gelecek rezervasyon teklif edildi mi?" },
          { id: "b19_b1_s12", sira: 12, metin: "Unutulan eşya kontrolü yapıldı mı?" },
          { id: "b19_b1_s13", sira: 13, metin: "Sadakat programı hatırlatması yapıldı mı?" },
          { id: "b19_b1_s14", sira: 14, metin: "Kapıya kadar uğurlandı mı?" },
          { id: "b19_b1_s15", sira: 15, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b19_b1_s16", sira: 16, metin: "Fatura dijital / fiziksel olarak teslim edildi mi?" },
          { id: "b19_b1_s17", sira: 17, metin: "Geç check-out talebi uygun şekilde işlendi mi?" },
          { id: "b19_b1_s18", sira: 18, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b19_b1_s19", sira: 19, metin: "Ayrılışta içten teşekkür ve veda edildi mi?" },
          { id: "b19_b1_s20", sira: 20, metin: "Genel check-out hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b19_b2_s01", sira: 1,  metin: "Check-out süreci kolay ve akıcı mıydı?" },
          { id: "b19_b2_s02", sira: 2,  metin: "Bekleme süresi makul müydü?" },
          { id: "b19_b2_s03", sira: 3,  metin: "Fatura doğruluğu yüksek miydi?" },
          { id: "b19_b2_s04", sira: 4,  metin: "Ödeme sistemi sorunsuz çalıştı mı?" },
          { id: "b19_b2_s05", sira: 5,  metin: "Dijital check-out seçeneği mevcut muydu?" },
          { id: "b19_b2_s06", sira: 6,  metin: "Resepsiyon alanı temiz ve düzenliydi mi?" },
          { id: "b19_b2_s07", sira: 7,  metin: "Bagaj depolama hizmeti yeterliydi mi?" },
          { id: "b19_b2_s08", sira: 8,  metin: "Transfer / ulaşım organizasyonu kaliteliydi mi?" },
          { id: "b19_b2_s09", sira: 9,  metin: "Genel ayrılış atmosferi sıcak mıydı?" },
          { id: "b19_b2_s10", sira: 10, metin: "Son izlenim olumlu muydu?" },
          { id: "b19_b2_s11", sira: 11, metin: "Geri bildirim formu / anketi sunuldu mu?" },
          { id: "b19_b2_s12", sira: 12, metin: "Sadakat programı avantajları açıklandı mı?" },
          { id: "b19_b2_s13", sira: 13, metin: "Fatura detayları anlaşılır mıydı?" },
          { id: "b19_b2_s14", sira: 14, metin: "Genel check-out süreci profesyoneldi mi?" },
          { id: "b19_b2_s15", sira: 15, metin: "Erken / geç check-out esnekliği yeterliydi mi?" },
          { id: "b19_b2_s16", sira: 16, metin: "Ayrılış sonrası iletişim (mail vb.) yapıldı mı?" },
          { id: "b19_b2_s17", sira: 17, metin: "Genel konaklama değerlendirmesi olumlu muydu?" },
          { id: "b19_b2_s18", sira: 18, metin: "Oteli başkalarına tavsiye eder misiniz?" },
          { id: "b19_b2_s19", sira: 19, metin: "Genel check-out deneyimi beklentileri karşıladı mı?" },
          { id: "b19_b2_s20", sira: 20, metin: "Bu otele tekrar gelmek ister misiniz?" }
        ]
      }
    ]
  },

   // ============================================================
  // BİRİM 20 — OTOPARK / VALE / ULAŞIM (Vale soruları eklendi)
  // ============================================================
  {
    id: "birim_20",
    birimAdi: "Otopark / Vale / Ulaşım",
    sira: 20,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b20_b1_s01", sira: 1,  metin: "Otopark / vale personeli misafiri karşıladı mı?" },
          { id: "b20_b1_s02", sira: 2,  metin: "Otopark yönlendirmesi açık ve net yapıldı mı?" },
          { id: "b20_b1_s03", sira: 3,  metin: "Vale hizmeti aktif olarak sunuldu mu?" },
          { id: "b20_b1_s04", sira: 4,  metin: "Araç teslim alınırken hasar kontrol formu dolduruldu mu?" },
          { id: "b20_b1_s05", sira: 5,  metin: "Araç güvenli ve uygun bir alana park edildi mi?" },
          { id: "b20_b1_s06", sira: 6,  metin: "Vale personeli nazik ve profesyonel miydi?" },
          { id: "b20_b1_s07", sira: 7,  metin: "Araç talep edildiğinde zamanında getirildi mi?" },
          { id: "b20_b1_s08", sira: 8,  metin: "Araç iade edilirken hasar kontrolü tekrar yapıldı mı?" },
          { id: "b20_b1_s09", sira: 9,  metin: "Vale ücreti önceden bildirildi mi?" },
          { id: "b20_b1_s10", sira: 10, metin: "Transfer hizmeti zamanında ve sorunsuz yapıldı mı?" },
          { id: "b20_b1_s11", sira: 11, metin: "Transfer şoförü nazik ve profesyonel miydi?" },
          { id: "b20_b1_s12", sira: 12, metin: "Rota ve varış bilgisi doğru verildi mi?" },
          { id: "b20_b1_s13", sira: 13, metin: "Engelli araç parkı için özel yardım teklif edildi mi?" },
          { id: "b20_b1_s14", sira: 14, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b20_b1_s15", sira: 15, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b20_b1_s16", sira: 16, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b20_b1_s17", sira: 17, metin: "Havalimanı transfer organizasyonu sorunsuz muydu?" },
          { id: "b20_b1_s18", sira: 18, metin: "Bagaj yardımı transfer sırasında teklif edildi mi?" },
          { id: "b20_b1_s19", sira: 19, metin: "Genel vale / ulaşım personel tutumu profesyonel miydi?" },
          { id: "b20_b1_s20", sira: 20, metin: "Genel otopark / vale / ulaşım hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b20_b2_s01", sira: 1,  metin: "Otopark kapasitesi yeterli miydi?" },
          { id: "b20_b2_s02", sira: 2,  metin: "Otopark genel güvenliği yüksek miydi?" },
          { id: "b20_b2_s03", sira: 3,  metin: "Otopark aydınlatması yeterli miydi?" },
          { id: "b20_b2_s04", sira: 4,  metin: "Otopark temiz ve düzenliydi mi?" },
          { id: "b20_b2_s05", sira: 5,  metin: "Otopark erişimi ve girişi kolay mıydı?" },
          { id: "b20_b2_s06", sira: 6,  metin: "Otopark ücretlendirmesi adil ve şeffaf mıydı?" },
          { id: "b20_b2_s07", sira: 7,  metin: "Engelli park alanı yeterli ve uygun muydu?" },
          { id: "b20_b2_s08", sira: 8,  metin: "CCTV / güvenlik kamerası kapsama alanı yeterliydi mi?" },
          { id: "b20_b2_s09", sira: 9,  metin: "Vale hizmeti hızlı ve güvenilir miydi?" },
          { id: "b20_b2_s10", sira: 10, metin: "Araç hasarsız teslim edildi mi?" },
          { id: "b20_b2_s11", sira: 11, metin: "Transfer aracı temiz ve konforluydu mu?" },
          { id: "b20_b2_s12", sira: 12, metin: "Transfer süresi ve güzergâh makul müydü?" },
          { id: "b20_b2_s13", sira: 13, metin: "Havalimanı transfer kalitesi yüksek miydi?" },
          { id: "b20_b2_s14", sira: 14, metin: "Yönlendirme tabelaları yeterli ve anlaşılır mıydı?" },
          { id: "b20_b2_s15", sira: 15, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b20_b2_s16", sira: 16, metin: "Transfer rezervasyonu kolay ve hızlı mıydı?" },
          { id: "b20_b2_s17", sira: 17, metin: "Vale bekleme süresi makul müydü?" },
          { id: "b20_b2_s18", sira: 18, metin: "Ulaşım hizmetleri saatleri yeterli miydi?" },
          { id: "b20_b2_s19", sira: 19, metin: "Genel otopark / vale / ulaşım deneyimi beklentileri karşıladı mı?" },
          { id: "b20_b2_s20", sira: 20, metin: "Bu hizmeti tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 21 — PLAJ / SAHIL HİZMETLERİ
  // ============================================================
  {
    id: "birim_21",
    birimAdi: "Plaj / Sahil Hizmetleri",
    sira: 21,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b21_b1_s01", sira: 1,  metin: "Plaj personeli misafiri karşıladı mı?" },
          { id: "b21_b1_s02", sira: 2,  metin: "Şezlong / şemsiye tahsisi yapıldı mı?" },
          { id: "b21_b1_s03", sira: 3,  metin: "Plaj kuralları bildirildi mi?" },
          { id: "b21_b1_s04", sira: 4,  metin: "Cankurtaran görünür konumdaydı mı?" },
          { id: "b21_b1_s05", sira: 5,  metin: "İçecek / atıştırmalık servisi sunuldu mu?" },
          { id: "b21_b1_s06", sira: 6,  metin: "Personel nazik ve yardımsever miydi?" },
          { id: "b21_b1_s07", sira: 7,  metin: "Havlu servisi sağlandı mı?" },
          { id: "b21_b1_s08", sira: 8,  metin: "Su sporları / aktivite bilgisi verildi mi?" },
          { id: "b21_b1_s09", sira: 9,  metin: "Çocuklu ailelere özel ilgi gösterildi mi?" },
          { id: "b21_b1_s10", sira: 10, metin: "Güneş kremi / aksesuar hizmeti sunuldu mu?" },
          { id: "b21_b1_s11", sira: 11, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b21_b1_s12", sira: 12, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b21_b1_s13", sira: 13, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b21_b1_s14", sira: 14, metin: "Plaj temizliği düzenli yapıldı mı?" },
          { id: "b21_b1_s15", sira: 15, metin: "Engelli misafir için yardım teklif edildi mi?" },
          { id: "b21_b1_s16", sira: 16, metin: "Acil durum ekipmanları görünür müydü?" },
          { id: "b21_b1_s17", sira: 17, metin: "Plaj saatleri bildirildi mi?" },
          { id: "b21_b1_s18", sira: 18, metin: "Personel güvenlik kurallarını uyguladı mı?" },
          { id: "b21_b1_s19", sira: 19, metin: "Genel plaj personel tutumu profesyonel miydi?" },
          { id: "b21_b1_s20", sira: 20, metin: "Genel plaj hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b21_b2_s01", sira: 1,  metin: "Plaj genel temizliği yüksek miydi?" },
          { id: "b21_b2_s02", sira: 2,  metin: "Deniz / kum temizliği yeterliydi mi?" },
          { id: "b21_b2_s03", sira: 3,  metin: "Şezlong ve şemsiyeler yeterli miydi?" },
          { id: "b21_b2_s04", sira: 4,  metin: "Şezlong konforu yüksek miydi?" },
          { id: "b21_b2_s05", sira: 5,  metin: "Duş ve soyunma alanları temiz miydi?" },
          { id: "b21_b2_s06", sira: 6,  metin: "Plaj bar / ikram hizmeti kaliteliydi mi?" },
          { id: "b21_b2_s07", sira: 7,  metin: "Su sporları ekipmanları güvenli miydi?" },
          { id: "b21_b2_s08", sira: 8,  metin: "Plaj alanı kapasitesi yeterliydi mi?" },
          { id: "b21_b2_s09", sira: 9,  metin: "Plaj genel düzeni estetik miydi?" },
          { id: "b21_b2_s10", sira: 10, metin: "Gece plaj aydınlatması yeterliydi mi?" },
          { id: "b21_b2_s11", sira: 11, metin: "Çocuk oyun alanı güvenli miydi?" },
          { id: "b21_b2_s12", sira: 12, metin: "Plaj tuvalet / duş alanları yeterliydi mi?" },
          { id: "b21_b2_s13", sira: 13, metin: "Deniz suyu kalitesi iyiydi mi?" },
          { id: "b21_b2_s14", sira: 14, metin: "Plaj güvenlik önlemleri yeterliydi mi?" },
          { id: "b21_b2_s15", sira: 15, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b21_b2_s16", sira: 16, metin: "Plaj saatleri yeterli miydi?" },
          { id: "b21_b2_s17", sira: 17, metin: "Genel plaj atmosferi keyifliydi mi?" },
          { id: "b21_b2_s18", sira: 18, metin: "Plaj erişimi kolay mıydı?" },
          { id: "b21_b2_s19", sira: 19, metin: "Genel plaj deneyimi beklentileri karşıladı mı?" },
          { id: "b21_b2_s20", sira: 20, metin: "Bu plajı tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 22 — ENGELLİ / ÖZEL İHTİYAÇ HİZMETLERİ
  // ============================================================
  {
    id: "birim_22",
    birimAdi: "Engelli / Özel İhtiyaç Hizmetleri",
    sira: 22,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b22_b1_s01", sira: 1,  metin: "Personel engelli misafiri fark ederek yardım teklif etti mi?" },
          { id: "b22_b1_s02", sira: 2,  metin: "Tekerlekli sandalye yardımı sunuldu mu?" },
          { id: "b22_b1_s03", sira: 3,  metin: "Özel oda düzenlemesi yapıldı mı?" },
          { id: "b22_b1_s04", sira: 4,  metin: "Personel iletişimde sabırlı ve anlayışlıydı mı?" },
          { id: "b22_b1_s05", sira: 5,  metin: "Görme engelli misafir için rehberlik yapıldı mı?" },
          { id: "b22_b1_s06", sira: 6,  metin: "İşitme engelli misafir için destek sağlandı mı?" },
          { id: "b22_b1_s07", sira: 7,  metin: "Özel diyet / alerji ihtiyaçları karşılandı mı?" },
          { id: "b22_b1_s08", sira: 8,  metin: "Acil durum prosedürleri özel ihtiyaçlara göre uyarlandı mı?" },
          { id: "b22_b1_s09", sira: 9,  metin: "Personel engelli hakları konusunda bilinçli miydi?" },
          { id: "b22_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b22_b1_s11", sira: 11, metin: "Yardım teklifi saygılı ve onurlu biçimde yapıldı mı?" },
          { id: "b22_b1_s12", sira: 12, metin: "Refakatçi için uygun düzenleme yapıldı mı?" },
          { id: "b22_b1_s13", sira: 13, metin: "Özel ekipman (yükseltici, tutamak vb.) temin edildi mi?" },
          { id: "b22_b1_s14", sira: 14, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b22_b1_s15", sira: 15, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b22_b1_s16", sira: 16, metin: "Hizmet kişiselleştirilmiş miydi?" },
          { id: "b22_b1_s17", sira: 17, metin: "Tüm süreç boyunca destek sürekliydi mi?" },
          { id: "b22_b1_s18", sira: 18, metin: "Ayrılışta teşekkür ve veda edildi mi?" },
          { id: "b22_b1_s19", sira: 19, metin: "Genel özel ihtiyaç personel tutumu profesyonel miydi?" },
          { id: "b22_b1_s20", sira: 20, metin: "Genel engelli hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b22_b2_s01", sira: 1,  metin: "Engelli rampaları yeterli ve kullanışlıydı mı?" },
          { id: "b22_b2_s02", sira: 2,  metin: "Asansörler engelli erişimine uygun muydu?" },
          { id: "b22_b2_s03", sira: 3,  metin: "Engelli odası donanımı yeterliydi mi?" },
          { id: "b22_b2_s04", sira: 4,  metin: "Banyo tutamakları ve güvenlik ekipmanları yeterliydi mi?" },
          { id: "b22_b2_s05", sira: 5,  metin: "Ortak alanlarda engelli erişimi uygundu mu?" },
          { id: "b22_b2_s06", sira: 6,  metin: "Restoranlar engelli erişimine uygundu mu?" },
          { id: "b22_b2_s07", sira: 7,  metin: "Havuz engelli erişimine uygundu mu?" },
          { id: "b22_b2_s08", sira: 8,  metin: "Engelli otopark alanı yeterliydi mi?" },
          { id: "b22_b2_s09", sira: 9,  metin: "Braille / sesli yönlendirme yeterliydi mi?" },
          { id: "b22_b2_s10", sira: 10, metin: "Genel erişilebilirlik standardı yüksek miydi?" },
          { id: "b22_b2_s11", sira: 11, metin: "Tekerlekli sandalye erişim yolları yeterliydi mi?" },
          { id: "b22_b2_s12", sira: 12, metin: "Özel diyet menüsü kaliteli miydi?" },
          { id: "b22_b2_s13", sira: 13, metin: "Acil durum sistemleri engelli kullanımına uygundu mu?" },
          { id: "b22_b2_s14", sira: 14, metin: "Genel engelli altyapısı modern miydi?" },
          { id: "b22_b2_s15", sira: 15, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b22_b2_s16", sira: 16, metin: "Engelli misafir için özel aktiviteler sunuldu mu?" },
          { id: "b22_b2_s17", sira: 17, metin: "Genel erişilebilirlik deneyimi keyifliydi mi?" },
          { id: "b22_b2_s18", sira: 18, metin: "Otel engelli dostu bir imaj sergiledi mi?" },
          { id: "b22_b2_s19", sira: 19, metin: "Genel engelli hizmet deneyimi beklentileri karşıladı mı?" },
          { id: "b22_b2_s20", sira: 20, metin: "Bu oteli engelli misafirlere tavsiye eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 23 — YIYECEK İÇECEK (F&B) GENEL
  // ============================================================
  {
    id: "birim_23",
    birimAdi: "Yiyecek İçecek (F&B) Genel",
    sira: 23,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b23_b1_s01", sira: 1,  metin: "F&B personeli misafiri sıcak karşıladı mı?" },
          { id: "b23_b1_s02", sira: 2,  metin: "Menü bilgisi eksiksiz sunuldu mu?" },
          { id: "b23_b1_s03", sira: 3,  metin: "Diyet / alerji bilgisi soruldu mu?" },
          { id: "b23_b1_s04", sira: 4,  metin: "Sipariş doğru ve eksiksiz alındı mı?" },
          { id: "b23_b1_s05", sira: 5,  metin: "Servis süresi makul müydü?" },
          { id: "b23_b1_s06", sira: 6,  metin: "Personel hijyen kurallarına uydu mu?" },
          { id: "b23_b1_s07", sira: 7,  metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b23_b1_s08", sira: 8,  metin: "Personel nazik ve profesyonel miydi?" },
          { id: "b23_b1_s09", sira: 9,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b23_b1_s10", sira: 10, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b23_b1_s11", sira: 11, metin: "Hesap doğru ve zamanında getirildi mi?" },
          { id: "b23_b1_s12", sira: 12, metin: "Özel kutlama düzenlemesi yapıldı mı?" },
          { id: "b23_b1_s13", sira: 13, metin: "Masa düzenli tutuldu mu?" },
          { id: "b23_b1_s14", sira: 14, metin: "İkmal / yenileme proaktif yapıldı mı?" },
          { id: "b23_b1_s15", sira: 15, metin: "Menü önerileri bilgili şekilde yapıldı mı?" },
          { id: "b23_b1_s16", sira: 16, metin: "Çocuklu ailelere özel ilgi gösterildi mi?" },
          { id: "b23_b1_s17", sira: 17, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b23_b1_s18", sira: 18, metin: "Ödeme seçenekleri yeterliydi mi?" },
          { id: "b23_b1_s19", sira: 19, metin: "Genel F&B personel tutumu profesyonel miydi?" },
          { id: "b23_b1_s20", sira: 20, metin: "Genel F&B hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b23_b2_s01", sira: 1,  metin: "Yiyecek kalitesi genel olarak yüksek miydi?" },
          { id: "b23_b2_s02", sira: 2,  metin: "Menü çeşitliliği yeterli miydi?" },
          { id: "b23_b2_s03", sira: 3,  metin: "Yiyeceklerin tazeliği yüksek miydi?" },
          { id: "b23_b2_s04", sira: 4,  metin: "Sunum kalitesi yüksek miydi?" },
          { id: "b23_b2_s05", sira: 5,  metin: "İçecek kalitesi yüksek miydi?" },
          { id: "b23_b2_s06", sira: 6,  metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b23_b2_s07", sira: 7,  metin: "Hijyen standardı yüksek miydi?" },
          { id: "b23_b2_s08", sira: 8,  metin: "Vejetaryen / vegan seçenekler yeterliydi mi?" },
          { id: "b23_b2_s09", sira: 9,  metin: "Çocuk menüsü kaliteli miydi?" },
          { id: "b23_b2_s10", sira: 10, metin: "Yerel / otantik lezzetler sunuldu mu?" },
          { id: "b23_b2_s11", sira: 11, metin: "Uluslararası mutfak seçenekleri yeterliydi mi?" },
          { id: "b23_b2_s12", sira: 12, metin: "Porsiyon büyüklüğü yeterli miydi?" },
          { id: "b23_b2_s13", sira: 13, metin: "Servis ekipmanları temiz ve kaliteliydi mi?" },
          { id: "b23_b2_s14", sira: 14, metin: "F&B alanları genel temizliği yüksek miydi?" },
          { id: "b23_b2_s15", sira: 15, metin: "Açık büfe düzeni hijyenik miydi?" },
          { id: "b23_b2_s16", sira: 16, metin: "Servis saatleri yeterli miydi?" },
          { id: "b23_b2_s17", sira: 17, metin: "Genel F&B atmosferi keyifliydi mi?" },
          { id: "b23_b2_s18", sira: 18, metin: "Özel diyet ihtiyaçları karşılandı mı?" },
          { id: "b23_b2_s19", sira: 19, metin: "Genel F&B deneyimi beklentileri karşıladı mı?" },
          { id: "b23_b2_s20", sira: 20, metin: "F&B hizmetlerini başkalarına tavsiye eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 24 — ETKİNLİK / ANİMASYON
  // ============================================================
  {
    id: "birim_24",
    birimAdi: "Etkinlik / Animasyon",
    sira: 24,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b24_b1_s01", sira: 1,  metin: "Animasyon ekibi misafirleri sıcak karşıladı mı?" },
          { id: "b24_b1_s02", sira: 2,  metin: "Etkinlik programı önceden duyuruldu mu?" },
          { id: "b24_b1_s03", sira: 3,  metin: "Aktiviteler zamanında başladı mı?" },
          { id: "b24_b1_s04", sira: 4,  metin: "Personel enerjik ve coşkuluydu mu?" },
          { id: "b24_b1_s05", sira: 5,  metin: "Tüm yaş gruplarına yönelik aktivite sunuldu mu?" },
          { id: "b24_b1_s06", sira: 6,  metin: "Katılım teşvik edildi mi?" },
          { id: "b24_b1_s07", sira: 7,  metin: "Güvenlik kuralları uygulandı mı?" },
          { id: "b24_b1_s08", sira: 8,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b24_b1_s09", sira: 9,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b24_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b24_b1_s11", sira: 11, metin: "Çocuklara özel animasyon yapıldı mı?" },
          { id: "b24_b1_s12", sira: 12, metin: "Gece eğlencesi kaliteli miydi?" },
          { id: "b24_b1_s13", sira: 13, metin: "Müzik / ses sistemi uygun seviyedeydi mi?" },
          { id: "b24_b1_s14", sira: 14, metin: "Etkinlik alanı güvenli miydi?" },
          { id: "b24_b1_s15", sira: 15, metin: "Personel misafirlerle samimi iletişim kurdu mu?" },
          { id: "b24_b1_s16", sira: 16, metin: "Özel etkinlik / kutlama organizasyonu yapıldı mı?" },
          { id: "b24_b1_s17", sira: 17, metin: "Etkinlik sonrası teşekkür edildi mi?" },
          { id: "b24_b1_s18", sira: 18, metin: "Aktiviteler hakkında bilgi verildi mi?" },
          { id: "b24_b1_s19", sira: 19, metin: "Genel animasyon personel tutumu profesyonel miydi?" },
          { id: "b24_b1_s20", sira: 20, metin: "Genel animasyon hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b24_b2_s01", sira: 1,  metin: "Etkinlik çeşitliliği yeterli miydi?" },
          { id: "b24_b2_s02", sira: 2,  metin: "Aktivitelerin kalitesi yüksek miydi?" },
          { id: "b24_b2_s03", sira: 3,  metin: "Etkinlik alanı yeterli büyüklükteydi mi?" },
          { id: "b24_b2_s04", sira: 4,  metin: "Ses / ışık sistemi kaliteli miydi?" },
                  { id: "b24_b2_s05", sira: 5,  metin: "Gece eğlencesi kalitesi yüksek miydi?" },
          { id: "b24_b2_s06", sira: 6,  metin: "Çocuk aktiviteleri eğlenceli ve güvenliydi mi?" },
          { id: "b24_b2_s07", sira: 7,  metin: "Spor aktiviteleri yeterli miydi?" },
          { id: "b24_b2_s08", sira: 8,  metin: "Su aktiviteleri kaliteli miydi?" },
          { id: "b24_b2_s09", sira: 9,  metin: "Etkinlik alanı temiz ve bakımlıydı mı?" },
          { id: "b24_b2_s10", sira: 10, metin: "Etkinlik programı dengeli ve çeşitliydi mi?" },
          { id: "b24_b2_s11", sira: 11, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b24_b2_s12", sira: 12, metin: "Etkinlik saatleri yeterli miydi?" },
          { id: "b24_b2_s13", sira: 13, metin: "Genel animasyon atmosferi neşeli miydi?" },
          { id: "b24_b2_s14", sira: 14, metin: "Etkinlikler otelin konseptiyle uyumluydu mu?" },
          { id: "b24_b2_s15", sira: 15, metin: "Özel etkinlik organizasyonu kaliteliydi mi?" },
          { id: "b24_b2_s16", sira: 16, metin: "Katılım kolaylığı yeterliydi mi?" },
          { id: "b24_b2_s17", sira: 17, metin: "Ekipman ve malzemeler kaliteliydi mi?" },
          { id: "b24_b2_s18", sira: 18, metin: "Genel etkinlik deneyimi keyifliydi mi?" },
          { id: "b24_b2_s19", sira: 19, metin: "Genel animasyon deneyimi beklentileri karşıladı mı?" },
          { id: "b24_b2_s20", sira: 20, metin: "Animasyon hizmetini başkalarına tavsiye eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 25 — SAĞLIK / KLİNİK HİZMETLERİ
  // ============================================================
  {
    id: "birim_25",
    birimAdi: "Sağlık / Klinik Hizmetleri",
    sira: 25,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b25_b1_s01", sira: 1,  metin: "Sağlık personeli misafiri sıcak karşıladı mı?" },
          { id: "b25_b1_s02", sira: 2,  metin: "Sağlık hizmetleri hakkında bilgi verildi mi?" },
          { id: "b25_b1_s03", sira: 3,  metin: "Acil müdahale hızlı yapıldı mı?" },
          { id: "b25_b1_s04", sira: 4,  metin: "Personel ilk yardım bilgisine sahip miydi?" },
          { id: "b25_b1_s05", sira: 5,  metin: "Gizlilik ve mahremiyet korundu mu?" },
          { id: "b25_b1_s06", sira: 6,  metin: "Personel nazik ve anlayışlıydı mı?" },
          { id: "b25_b1_s07", sira: 7,  metin: "İlaç / malzeme temin edildi mi?" },
          { id: "b25_b1_s08", sira: 8,  metin: "Hastane yönlendirmesi yapıldı mı?" },
          { id: "b25_b1_s09", sira: 9,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b25_b1_s10", sira: 10, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b25_b1_s11", sira: 11, metin: "Sağlık kaydı tutuldu mu?" },
          { id: "b25_b1_s12", sira: 12, metin: "Takip / kontrol yapıldı mı?" },
          { id: "b25_b1_s13", sira: 13, metin: "Sigorta / ödeme bilgisi verildi mi?" },
          { id: "b25_b1_s14", sira: 14, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b25_b1_s15", sira: 15, metin: "Personel profesyonel ve güven verici miydi?" },
          { id: "b25_b1_s16", sira: 16, metin: "Sağlık hizmetleri 7/24 ulaşılabilir miydi?" },
          { id: "b25_b1_s17", sira: 17, metin: "Engelli / yaşlı misafir için özel destek sağlandı mı?" },
          { id: "b25_b1_s18", sira: 18, metin: "Ayrılışta iyileşmeler dilendi mi?" },
          { id: "b25_b1_s19", sira: 19, metin: "Genel sağlık personel tutumu profesyonel miydi?" },
          { id: "b25_b1_s20", sira: 20, metin: "Genel sağlık hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b25_b2_s01", sira: 1,  metin: "Klinik / sağlık odası temiz ve hijyenik miydi?" },
          { id: "b25_b2_s02", sira: 2,  metin: "Tıbbi ekipmanlar yeterli ve çalışır durumdaydı mı?" },
          { id: "b25_b2_s03", sira: 3,  metin: "İlaç / malzeme stoku yeterli miydi?" },
          { id: "b25_b2_s04", sira: 4,  metin: "Acil müdahale süresi makul müydü?" },
          { id: "b25_b2_s05", sira: 5,  metin: "Sağlık hizmetleri erişilebilirliği yüksek miydi?" },
          { id: "b25_b2_s06", sira: 6,  metin: "Klinik genel atmosferi güven verici miydi?" },
          { id: "b25_b2_s07", sira: 7,  metin: "Hastane yönlendirmesi hızlı ve doğru muydu?" },
          { id: "b25_b2_s08", sira: 8,  metin: "Sağlık hizmetleri fiyatlandırması şeffaf mıydı?" },
          { id: "b25_b2_s09", sira: 9,  metin: "Genel sağlık altyapısı yeterliydi mi?" },
          { id: "b25_b2_s10", sira: 10, metin: "Bekleme alanı konforlu muydu?" },
          { id: "b25_b2_s11", sira: 11, metin: "Gizlilik politikası yeterliydi mi?" },
          { id: "b25_b2_s12", sira: 12, metin: "Sağlık hizmetleri saatleri yeterli miydi?" },
          { id: "b25_b2_s13", sira: 13, metin: "Genel sağlık hizmeti kalitesi yüksek miydi?" },
          { id: "b25_b2_s14", sira: 14, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b25_b2_s15", sira: 15, metin: "Acil durum iletişim sistemi yeterliydi mi?" },
          { id: "b25_b2_s16", sira: 16, metin: "Sağlık personeli nitelik düzeyi yüksek miydi?" },
          { id: "b25_b2_s17", sira: 17, metin: "Genel sağlık hizmeti güvenilir miydi?" },
          { id: "b25_b2_s18", sira: 18, metin: "Takip hizmetleri yeterliydi mi?" },
          { id: "b25_b2_s19", sira: 19, metin: "Genel sağlık deneyimi beklentileri karşıladı mı?" },
          { id: "b25_b2_s20", sira: 20, metin: "Bu sağlık hizmetini başkalarına tavsiye eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 26 — ALIŞVERIŞ / BUTIK
  // ============================================================
  {
    id: "birim_26",
    birimAdi: "Alışveriş / Butik",
    sira: 26,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b26_b1_s01", sira: 1,  metin: "Mağaza personeli misafiri karşıladı mı?" },
          { id: "b26_b1_s02", sira: 2,  metin: "Ürün bilgisi eksiksiz sunuldu mu?" },
          { id: "b26_b1_s03", sira: 3,  metin: "Personel nazik ve yardımsever miydi?" },
          { id: "b26_b1_s04", sira: 4,  metin: "Ürün önerileri uygun şekilde yapıldı mı?" },
          { id: "b26_b1_s05", sira: 5,  metin: "Fiyat bilgisi şeffaf verildi mi?" },
          { id: "b26_b1_s06", sira: 6,  metin: "Ödeme işlemi hızlı tamamlandı mı?" },
          { id: "b26_b1_s07", sira: 7,  metin: "İade / değişim politikası bildirildi mi?" },
          { id: "b26_b1_s08", sira: 8,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b26_b1_s09", sira: 9,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b26_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b26_b1_s11", sira: 11, metin: "Ürün ambalajı özenli yapıldı mı?" },
          { id: "b26_b1_s12", sira: 12, metin: "Hediye paketi hizmeti sunuldu mu?" },
          { id: "b26_b1_s13", sira: 13, metin: "Kampanya / indirim bilgisi verildi mi?" },
          { id: "b26_b1_s14", sira: 14, metin: "Personel ürünler hakkında bilgili miydi?" },
          { id: "b26_b1_s15", sira: 15, metin: "Oda teslimatı hizmeti sunuldu mu?" },
          { id: "b26_b1_s16", sira: 16, metin: "Müşteri gizliliği korundu mu?" },
          { id: "b26_b1_s17", sira: 17, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b26_b1_s18", sira: 18, metin: "Sadakat programı avantajları bildirildi mi?" },
          { id: "b26_b1_s19", sira: 19, metin: "Genel butik personel tutumu profesyonel miydi?" },
          { id: "b26_b1_s20", sira: 20, metin: "Genel alışveriş hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b26_b2_s01", sira: 1,  metin: "Ürün çeşitliliği yeterli miydi?" },
          { id: "b26_b2_s02", sira: 2,  metin: "Ürün kalitesi yüksek miydi?" },
          { id: "b26_b2_s03", sira: 3,  metin: "Fiyatlandırma adil miydi?" },
          { id: "b26_b2_s04", sira: 4,  metin: "Mağaza genel düzeni şık mıydı?" },
          { id: "b26_b2_s05", sira: 5,  metin: "Mağaza temizliği yüksek miydi?" },
          { id: "b26_b2_s06", sira: 6,  metin: "Ürün teşhiri çekici miydi?" },
          { id: "b26_b2_s07", sira: 7,  metin: "Ödeme seçenekleri yeterliydi mi?" },
          { id: "b26_b2_s08", sira: 8,  metin: "Mağaza aydınlatması yeterli miydi?" },
          { id: "b26_b2_s09", sira: 9,  metin: "Yerel / otantik ürünler sunuldu mu?" },
          { id: "b26_b2_s10", sira: 10, metin: "Hediyelik eşya çeşitliliği yeterli miydi?" },
          { id: "b26_b2_s11", sira: 11, metin: "Mağaza saatleri yeterli miydi?" },
          { id: "b26_b2_s12", sira: 12, metin: "Ambalaj kalitesi yüksek miydi?" },
          { id: "b26_b2_s13", sira: 13, metin: "Fiyat / kalite dengesi uygun muydu?" },
          { id: "b26_b2_s14", sira: 14, metin: "Mağaza genel atmosferi davetkar mıydı?" },
          { id: "b26_b2_s15", sira: 15, metin: "Ürün stok yeterliliği iyiydi mi?" },
          { id: "b26_b2_s16", sira: 16, metin: "Dijital ödeme sistemi çalışıyor muydu?" },
          { id: "b26_b2_s17", sira: 17, metin: "Genel alışveriş deneyimi keyifliydi mi?" },
          { id: "b26_b2_s18", sira: 18, metin: "Mağaza otelin kalitesini yansıtıyor muydu?" },
          { id: "b26_b2_s19", sira: 19, metin: "Genel alışveriş deneyimi beklentileri karşıladı mı?" },
          { id: "b26_b2_s20", sira: 20, metin: "Bu mağazayı tekrar ziyaret etmek ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 27 — İŞ MERKEZİ / DİJİTAL HİZMETLER
  // ============================================================
  {
    id: "birim_27",
    birimAdi: "İş Merkezi / Dijital Hizmetler",
    sira: 27,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b27_b1_s01", sira: 1,  metin: "İş merkezi personeli misafiri karşıladı mı?" },
          { id: "b27_b1_s02", sira: 2,  metin: "Hizmetler hakkında bilgi verildi mi?" },
          { id: "b27_b1_s03", sira: 3,  metin: "Teknik destek zamanında sağlandı mı?" },
          { id: "b27_b1_s04", sira: 4,  metin: "Personel nazik ve yardımsever miydi?" },
          { id: "b27_b1_s05", sira: 5,  metin: "Baskı / fotokopi hizmeti sunuldu mu?" },
          { id: "b27_b1_s06", sira: 6,  metin: "Faks / tarama hizmeti sunuldu mu?" },
          { id: "b27_b1_s07", sira: 7,  metin: "Sekreterlik desteği sağlandı mı?" },
          { id: "b27_b1_s08", sira: 8,  metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b27_b1_s09", sira: 9,  metin: "Personel üniforma giyiyor muydu?" },
          { id: "b27_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b27_b1_s11", sira: 11, metin: "Gizlilik ve veri güvenliği korundu mu?" },
          { id: "b27_b1_s12", sira: 12, metin: "Toplantı odası rezervasyonu yapıldı mı?" },
          { id: "b27_b1_s13", sira: 13, metin: "Kurye / kargo hizmeti sunuldu mu?" },
          { id: "b27_b1_s14", sira: 14, metin: "Personel teknik konularda bilgili miydi?" },
          { id: "b27_b1_s15", sira: 15, metin: "Hizmet saatleri bildirildi mi?" },
          { id: "b27_b1_s16", sira: 16, metin: "Ücretlendirme şeffaf bildirildi mi?" },
          { id: "b27_b1_s17", sira: 17, metin: "Ayrılışta teşekkür edildi mi?" },
          { id: "b27_b1_s18", sira: 18, metin: "Dijital hizmetler hakkında bilgi verildi mi?" },
          { id: "b27_b1_s19", sira: 19, metin: "Genel iş merkezi personel tutumu profesyonel miydi?" },
          { id: "b27_b1_s20", sira: 20, metin: "Genel iş merkezi hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b27_b2_s01", sira: 1,  metin: "İş merkezi ekipmanları modern ve çalışır durumdaydı mı?" },
          { id: "b27_b2_s02", sira: 2,  metin: "Wi-Fi hızı ve bağlantısı yeterliydi mi?" },
          { id: "b27_b2_s03", sira: 3,  metin: "Bilgisayar / yazıcı kalitesi yüksek miydi?" },
          { id: "b27_b2_s04", sira: 4,  metin: "İş merkezi genel temizliği yüksek miydi?" },
          { id: "b27_b2_s05", sira: 5,  metin: "Çalışma ortamı sessiz ve verimli miydi?" },
          { id: "b27_b2_s06", sira: 6,  metin: "Aydınlatma yeterli miydi?" },
          { id: "b27_b2_s07", sira: 7,  metin: "Oturma konforu yüksek miydi?" },
          { id: "b27_b2_s08", sira: 8,  metin: "Baskı / fotokopi kalitesi iyiydi mi?" },
          { id: "b27_b2_s09", sira: 9,  metin: "Hizmet saatleri yeterli miydi?" },
          { id: "b27_b2_s10", sira: 10, metin: "Fiyatlandırma adil miydi?" },
          { id: "b27_b2_s11", sira: 11, metin: "Veri güvenliği yeterliydi mi?" },
          { id: "b27_b2_s12", sira: 12, metin: "Toplantı odası teknik altyapısı yeterliydi mi?" },
          { id: "b27_b2_s13", sira: 13, metin: "Kurye / kargo hizmeti güvenilir miydi?" },
          { id: "b27_b2_s14", sira: 14, metin: "Genel iş merkezi kapasitesi yeterliydi mi?" },
          { id: "b27_b2_s15", sira: 15, metin: "Dijital hizmetler kullanımı kolay mıydı?" },
          { id: "b27_b2_s16", sira: 16, metin: "Mobil uygulama / dijital concierge yeterliydi mi?" },
          { id: "b27_b2_s17", sira: 17, metin: "Genel iş merkezi atmosferi verimli miydi?" },
          { id: "b27_b2_s18", sira: 18, metin: "Teknik destek kalitesi yüksek miydi?" },
          { id: "b27_b2_s19", sira: 19, metin: "Genel iş merkezi deneyimi beklentileri karşıladı mı?" },
          { id: "b27_b2_s20", sira: 20, metin: "Bu hizmeti tekrar kullanmak ister misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 28 — SÜRDÜRÜLEBILIRLIK / ÇEVRE
  // ============================================================
  {
    id: "birim_28",
    birimAdi: "Sürdürülebilirlik / Çevre",
    sira: 28,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b28_b1_s01", sira: 1,  metin: "Personel çevre politikaları hakkında bilgi verdi mi?" },
          { id: "b28_b1_s02", sira: 2,  metin: "Havlu / çarşaf yenileme politikası açıklandı mı?" },
          { id: "b28_b1_s03", sira: 3,  metin: "Enerji tasarrufu uygulamaları bildirildi mi?" },
          { id: "b28_b1_s04", sira: 4,  metin: "Geri dönüşüm uygulamaları hakkında bilgi verildi mi?" },
          { id: "b28_b1_s05", sira: 5,  metin: "Personel sürdürülebilirlik konusunda bilinçli miydi?" },
          { id: "b28_b1_s06", sira: 6,  metin: "Yerel ürün / tedarik bilgisi paylaşıldı mı?" },
          { id: "b28_b1_s07", sira: 7,  metin: "Plastik azaltma uygulamaları uygulandı mı?" },
          { id: "b28_b1_s08", sira: 8,  metin: "Misafir çevre dostu davranışa teşvik edildi mi?" },
          { id: "b28_b1_s09", sira: 9,  metin: "Karbon ayak izi azaltma bilgisi verildi mi?" },
          { id: "b28_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b28_b1_s11", sira: 11, metin: "Personel çevre sertifikaları hakkında bilgili miydi?" },
          { id: "b28_b1_s12", sira: 12, metin: "Yeşil alan / bahçe bakımı özenli miydi?" },
          { id: "b28_b1_s13", sira: 13, metin: "Su tasarrufu uygulamaları bildirildi mi?" },
          { id: "b28_b1_s14", sira: 14, metin: "Organik / doğal ürün kullanımı hakkında bilgi verildi mi?" },
          { id: "b28_b1_s15", sira: 15, metin: "Personel çevre dostu tutum sergiledi mi?" },
          { id: "b28_b1_s16", sira: 16, metin: "Sosyal sorumluluk projeleri hakkında bilgi verildi mi?" },
          { id: "b28_b1_s17", sira: 17, metin: "Yenilenebilir enerji kullanımı hakkında bilgi verildi mi?" },
          { id: "b28_b1_s18", sira: 18, metin: "Yerel topluma katkı hakkında bilgi paylaşıldı mı?" },
          { id: "b28_b1_s19", sira: 19, metin: "Genel sürdürülebilirlik personel tutumu profesyonel miydi?" },
          { id: "b28_b1_s20", sira: 20, metin: "Genel çevre hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b28_b2_s01", sira: 1,  metin: "Otelin çevre dostu uygulamaları görünür müydü?" },
          { id: "b28_b2_s02", sira: 2,  metin: "Geri dönüşüm kutuları yeterli ve görünür müydü?" },
          { id: "b28_b2_s03", sira: 3,  metin: "Plastik kullanımı minimize edilmiş miydi?" },
          { id: "b28_b2_s04", sira: 4,  metin: "Enerji tasarruf sistemleri çalışıyor muydu?" },
          { id: "b28_b2_s05", sira: 5,  metin: "Su tasarrufu önlemleri yeterliydi mi?" },
          { id: "b28_b2_s06", sira: 6,  metin: "Organik / yerel yiyecek seçenekleri sunuldu mu?" },
          { id: "b28_b2_s07", sira: 7,  metin: "Yeşil alan ve bahçe bakımlı mıydı?" },
          { id: "b28_b2_s08", sira: 8,  metin: "Çevre sertifikaları görünür yerde sergileniyor muydu?" },
          { id: "b28_b2_s09", sira: 9,  metin: "Yenilenebilir enerji kullanımı belirgin miydi?" },
          { id: "b28_b2_s10", sira: 10, metin: "Otel genel çevre duyarlılığı yüksek miydi?" },
          { id: "b28_b2_s11", sira: 11, metin: "Doğal temizlik ürünleri kullanılıyor muydu?" },
          { id: "b28_b2_s12", sira: 12, metin: "Gürültü kirliliği önlemleri yeterliydi mi?" },
          { id: "b28_b2_s13", sira: 13, metin: "Atık yönetimi sistemi görünür müydü?" },
          { id: "b28_b2_s14", sira: 14, metin: "Yerel tedarikçi kullanımı belirgin miydi?" },
          { id: "b28_b2_s15", sira: 15, metin: "Çevre dostu ambalaj kullanılıyor muydu?" },
          { id: "b28_b2_s16", sira: 16, metin: "Sosyal sorumluluk projeleri görünür müydü?" },
          { id: "b28_b2_s17", sira: 17, metin: "Genel sürdürülebilirlik altyapısı yeterliydi mi?" },
          { id: "b28_b2_s18", sira: 18, metin: "Otel çevre dostu bir imaj sergiledi mi?" },
          { id: "b28_b2_s19", sira: 19, metin: "Genel sürdürülebilirlik deneyimi beklentileri karşıladı mı?" },
          { id: "b28_b2_s20", sira: 20, metin: "Otelin çevre duyarlılığı konaklamayı olumlu etkiledi mi?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 29 — SADAKAT PROGRAMI / CRM
  // ============================================================
  {
    id: "birim_29",
    birimAdi: "Sadakat Programı / CRM",
    sira: 29,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b29_b1_s01", sira: 1,  metin: "Sadakat programı check-in'de tanıtıldı mı?" },
          { id: "b29_b1_s02", sira: 2,  metin: "Mevcut üyelik avantajları açıklandı mı?" },
          { id: "b29_b1_s03", sira: 3,  metin: "Puan / ödül sistemi anlatıldı mı?" },
          { id: "b29_b1_s04", sira: 4,  metin: "Üyelik kaydı kolaylaştırıldı mı?" },
          { id: "b29_b1_s05", sira: 5,  metin: "Personel sadakat programı hakkında bilgili miydi?" },
          { id: "b29_b1_s06", sira: 6,  metin: "VIP / üst üye ayrıcalıkları uygulandı mı?" },
          { id: "b29_b1_s07", sira: 7,  metin: "Puan kullanımı kolaylaştırıldı mı?" },
          { id: "b29_b1_s08", sira: 8,  metin: "Kişiselleştirilmiş hizmet sunuldu mu?" },
          { id: "b29_b1_s09", sira: 9,  metin: "Önceki konaklama bilgileri kullanıldı mı?" },
          { id: "b29_b1_s10", sira: 10, metin: "Şikâyet anında çözüme kavuşturuldu mu?" },
          { id: "b29_b1_s11", sira: 11, metin: "Doğum günü / özel gün kutlaması yapıldı mı?" },
          { id: "b29_b1_s12", sira: 12, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b29_b1_s13", sira: 13, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b29_b1_s14", sira: 14, metin: "Check-out'ta puan özeti verildi mi?" },
          { id: "b29_b1_s15", sira: 15, metin: "Gelecek konaklama için teşvik sunuldu mu?" },
          { id: "b29_b1_s16", sira: 16, metin: "Misafir tercihleri kayıt altına alındı mı?" },
          { id: "b29_b1_s17", sira: 17, metin: "Sadakat programı dijital erişimi kolaylaştırıldı mı?" },
          { id: "b29_b1_s18", sira: 18, metin: "Ayrılışta tekrar görüşme teklif edildi mi?" },
          { id: "b29_b1_s19", sira: 19, metin: "Genel CRM personel tutumu profesyonel miydi?" },
          { id: "b29_b1_s20", sira: 20, metin: "Genel sadakat programı hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b29_b2_s01", sira: 1,  metin: "Sadakat programı avantajları yeterli miydi?" },
          { id: "b29_b2_s02", sira: 2,  metin: "Puan kazanma sistemi adil miydi?" },
          { id: "b29_b2_s03", sira: 3,  metin: "Puan kullanımı kolay mıydı?" },
          { id: "b29_b2_s04", sira: 4,  metin: "Dijital sadakat uygulaması kullanışlı mıydı?" },
          { id: "b29_b2_s05", sira: 5,  metin: "VIP ayrıcalıkları tatmin ediciydi mi?" },
          { id: "b29_b2_s06", sira: 6,  metin: "Kişiselleştirme düzeyi yüksek miydi?" },
          { id: "b29_b2_s07", sira: 7,  metin: "Özel teklifler / kampanyalar cazip miydi?" },
          { id: "b29_b2_s08", sira: 8,  metin: "Üyelik seviyeleri arasındaki fark belirgin miydi?" },
          { id: "b29_b2_s09", sira: 9,  metin: "Sadakat programı iletişimi yeterliydi mi?" },
          { id: "b29_b2_s10", sira: 10, metin: "Program genel olarak değer sunuyor muydu?" },
          { id: "b29_b2_s11", sira: 11, metin: "Ödül çeşitliliği yeterli miydi?" },
          { id: "b29_b2_s12", sira: 12, metin: "Üyelik kaydı süreci kolay mıydı?" },
          { id: "b29_b2_s13", sira: 13, metin: "Puan geçerlilik süresi yeterli miydi?" },
          { id: "b29_b2_s14", sira: 14, metin: "Ortak program avantajları yeterliydi mi?" },
          { id: "b29_b2_s15", sira: 15, metin: "Genel CRM sistemi güvenilir miydi?" },
          { id: "b29_b2_s16", sira: 16, metin: "Kişisel veri güvenliği yeterliydi mi?" },
          { id: "b29_b2_s17", sira: 17, metin: "Sadakat programı beklentileri karşıladı mı?" },
          { id: "b29_b2_s18", sira: 18, metin: "Program misafir deneyimini zenginleştirdi mi?" },
          { id: "b29_b2_s19", sira: 19, metin: "Genel sadakat programı deneyimi beklentileri karşıladı mı?" },
          { id: "b29_b2_s20", sira: 20, metin: "Sadakat programı nedeniyle tekrar tercih eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 30 — ŞIKÂYET YÖNETİMİ
  // ============================================================
  {
    id: "birim_30",
    birimAdi: "Şikâyet Yönetimi",
    sira: 30,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b30_b1_s01", sira: 1,  metin: "Şikâyet saygıyla ve dikkatle dinlendi mi?" },
          { id: "b30_b1_s02", sira: 2,  metin: "Personel savunmacı bir tutum sergilemedi mi?" },
          { id: "b30_b1_s03", sira: 3,  metin: "Özür dilendi mi?" },
          { id: "b30_b1_s04", sira: 4,  metin: "Çözüm süreci hakkında bilgi verildi mi?" },
          { id: "b30_b1_s05", sira: 5,  metin: "Şikâyet zamanında çözüme kavuşturuldu mu?" },
          { id: "b30_b1_s06", sira: 6,  metin: "Çözüm misafiri tatmin etti mi?" },
          { id: "b30_b1_s07", sira: 7,  metin: "Takip / geri bildirim yapıldı mı?" },
          { id: "b30_b1_s08", sira: 8,  metin: "Yönetici devreye girdi mi?" },
          { id: "b30_b1_s09", sira: 9,  metin: "Tazminat / jest sunuldu mu?" },
          { id: "b30_b1_s10", sira: 10, metin: "Personel empati kurdu mu?" },
          { id: "b30_b1_s11", sira: 11, metin: "Şikâyet kayıt altına alındı mı?" },
          { id: "b30_b1_s12", sira: 12, metin: "Yabancı dil desteği sağlandı mı?" },
          { id: "b30_b1_s13", sira: 13, metin: "Personel üniforma giyiyor muydu?" },
          { id: "b30_b1_s14", sira: 14, metin: "Çözüm süreci şeffaf mıydı?" },
          { id: "b30_b1_s15", sira: 15, metin: "Misafirin beklentisi doğru anlaşıldı mı?" },
          { id: "b30_b1_s16", sira: 16, metin: "Alternatif çözüm önerildi mi?" },
          { id: "b30_b1_s17", sira: 17, metin: "Şikâyet süreci misafiri daha da rahatsız etmedi mi?" },
          { id: "b30_b1_s18", sira: 18, metin: "Çözüm sonrası memnuniyet soruldu mu?" },
          { id: "b30_b1_s19", sira: 19, metin: "Genel şikâyet yönetimi personel tutumu profesyonel miydi?" },
          { id: "b30_b1_s20", sira: 20, metin: "Genel şikâyet yönetimi hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b30_b2_s01", sira: 1,  metin: "Şikâyet kanalları yeterli ve erişilebilir miydi?" },
          { id: "b30_b2_s02", sira: 2,  metin: "Şikâyet formu / sistemi kullanışlı mıydı?" },
          { id: "b30_b2_s03", sira: 3,  metin: "Yanıt süresi makul müydü?" },
          { id: "b30_b2_s04", sira: 4,  metin: "Çözüm kalitesi yüksek miydi?" },
          { id: "b30_b2_s05", sira: 5,  metin: "Tazminat / jest yeterliydi mi?" },
          { id: "b30_b2_s06", sira: 6,  metin: "Şikâyet takip sistemi güvenilir miydi?" },
          { id: "b30_b2_s07", sira: 7,  metin: "Dijital şikâyet kanalları yeterliydi mi?" },
          { id: "b30_b2_s08", sira: 8,  metin: "Şikâyet gizliliği korundu mu?" },
          { id: "b30_b2_s09", sira: 9,  metin: "Genel şikâyet yönetimi sistemi güçlü müydü?" },
          { id: "b30_b2_s10", sira: 10, metin: "Şikâyet sonrası hizmet kalitesi arttı mı?" },
          { id: "b30_b2_s11", sira: 11, metin: "Yönetim şikâyeti ciddiye aldı mı?" },
          { id: "b30_b2_s12", sira: 12, metin: "Çözüm süreci adil miydi?" },
          { id: "b30_b2_s13", sira: 13, metin: "Şikâyet yönetimi süreci stressiz miydi?" },
          { id: "b30_b2_s14", sira: 14, metin: "Genel şikâyet deneyimi olumlu muydu?" },
          { id: "b30_b2_s15", sira: 15, metin: "Şikâyet sonrası güven yeniden oluştu mu?" },
          { id: "b30_b2_s16", sira: 16, metin: "Şikâyet yönetimi otelin kalitesini yansıttı mı?" },
          { id: "b30_b2_s17", sira: 17, metin: "Genel şikâyet süreci profesyoneldi mi?" },
          { id: "b30_b2_s18", sira: 18, metin: "Şikâyet yönetimi misafir sadakatini güçlendirdi mi?" },
          { id: "b30_b2_s19", sira: 19, metin: "Genel şikâyet deneyimi beklentileri karşıladı mı?" },
          { id: "b30_b2_s20", sira: 20, metin: "Şikâyet yönetimi nedeniyle otele olan güveniniz arttı mı?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 31 — GENEL OTEL DEĞERLENDİRMESİ
  // ============================================================
  {
    id: "birim_31",
    birimAdi: "Genel Otel Değerlendirmesi",
    sira: 31,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b31_b1_s01", sira: 1,  metin: "Genel personel tutumu konaklama boyunca tutarlı mıydı?" },
          { id: "b31_b1_s02", sira: 2,  metin: "Tüm departmanlarda hizmet kalitesi yüksek miydi?" },
          { id: "b31_b1_s03", sira: 3,  metin: "Personel misafir odaklı bir tutum sergiledi mi?" },
          { id: "b31_b1_s04", sira: 4,  metin: "Proaktif hizmet anlayışı benimsendi mi?" },
          { id: "b31_b1_s05", sira: 5,  metin: "Personel arası koordinasyon yüksek miydi?" },
          { id: "b31_b1_s06", sira: 6,  metin: "Yönetim görünür ve erişilebilir miydi?" },
          { id: "b31_b1_s07", sira: 7,  metin: "Tüm personel üniforma standardına uydu mu?" },
          { id: "b31_b1_s08", sira: 8,  metin: "Yabancı dil desteği genel olarak yeterliydi mi?" },
          { id: "b31_b1_s09", sira: 9,  metin: "Personel eğitim düzeyi yüksek görünüyor muydu?" },
          { id: "b31_b1_s10", sira: 10, metin: "Misafir memnuniyeti öncelikli tutuldu mu?" },
          { id: "b31_b1_s11", sira: 11, metin: "Şikâyet yönetimi genel olarak başarılıydı mı?" },
          { id: "b31_b1_s12", sira: 12, metin: "Özel ihtiyaçlara duyarlılık yüksek miydi?" },
          { id: "b31_b1_s13", sira: 13, metin: "Hizmet tutarlılığı konaklama boyunca korundu mu?" },
          { id: "b31_b1_s14", sira: 14, metin: "Personel genel moral ve motivasyonu yüksek miydi?" },
          { id: "b31_b1_s15", sira: 15, metin: "Misafir geri bildirimine açıklık yüksek miydi?" },
          { id: "b31_b1_s16", sira: 16, metin: "Genel personel imajı otelin markasını yansıttı mı?" },
          { id: "b31_b1_s17", sira: 17, metin: "Kültürel duyarlılık yeterliydi mi?" },
          { id: "b31_b1_s18", sira: 18, metin: "Personel genel olarak güven verici miydi?" },
          { id: "b31_b1_s19", sira: 19, metin: "Genel personel performansı beklentileri karşıladı mı?" },
          { id: "b31_b1_s20", sira: 20, metin: "Genel personel hizmeti memnuniyet verici miydi?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b31_b2_s01", sira: 1,  metin: "Otelin genel temizlik standardı yüksek miydi?" },
          { id: "b31_b2_s02", sira: 2,  metin: "Otel genel bakım durumu iyiydi mi?" },
          { id: "b31_b2_s03", sira: 3,  metin: "Otel atmosferi misafirperver miydi?" },
          { id: "b31_b2_s04", sira: 4,  metin: "Fiyat / değer dengesi uygun muydu?" },
          { id: "b31_b2_s05", sira: 5,  metin: "Otel konumu ve erişimi uygundu mu?" },
          { id: "b31_b2_s06", sira: 6,  metin: "Otel genel güvenlik seviyesi yüksek miydi?" },
          { id: "b31_b2_s07", sira: 7,  metin: "Otel teknolojik altyapısı yeterliydi mi?" },
          { id: "b31_b2_s08", sira: 8,  metin: "Otel sürdürülebilirlik anlayışı güçlüydü mü?" },
          { id: "b31_b2_s09", sira: 9,  metin: "Otel genel imajı markasıyla uyumluydu mu?" },
          { id: "b31_b2_s10", sira: 10, metin: "Otel misafir deneyimini bütünsel sundu mu?" },
          { id: "b31_b2_s11", sira: 11, metin: "Otel genel yiyecek içecek kalitesi yüksek miydi?" },
          { id: "b31_b2_s12", sira: 12, metin: "Otel genel eğlence / aktivite kalitesi yüksek miydi?" },
          { id: "b31_b2_s13", sira: 13, metin: "Otel genel spa / wellness kalitesi yüksek miydi?" },
          { id: "b31_b2_s14", sira: 14, metin: "Otel genel oda konforu yüksek miydi?" },
          { id: "b31_b2_s15", sira: 15, metin: "Otel genel lobi / ortak alan kalitesi yüksek miydi?" },
          { id: "b31_b2_s16", sira: 16, metin: "Otel genel personel hizmet kalitesi yüksek miydi?" },
          { id: "b31_b2_s17", sira: 17, metin: "Otel genel güvenlik hizmetleri yeterliydi mi?" },
          { id: "b31_b2_s18", sira: 18, metin: "Otel genel teknik altyapı kalitesi yüksek miydi?" },
          { id: "b31_b2_s19", sira: 19, metin: "Genel otel deneyimi beklentileri karşıladı mı?" },
          { id: "b31_b2_s20", sira: 20, metin: "Bu oteli başkalarına tavsiye eder misiniz?" }
        ]
      }
    ]
  },

  // ============================================================
  // BİRİM 32 — GİZLİ MÜŞTERİ GENEL DEĞERLENDİRME
  // ============================================================
  {
    id: "birim_32",
    birimAdi: "Gizli Müşteri Genel Değerlendirme",
    sira: 32,
    bolumler: [
      {
        bolumNo: 1,
        bolumAdi: "Personel Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b32_b1_s01", sira: 1,  metin: "Gizli müşteri kimliği konaklama boyunca fark edilmedi mi?" },
          { id: "b32_b1_s02", sira: 2,  metin: "Hizmet tutarlılığı tüm temaslarda korundu mu?" },
          { id: "b32_b1_s03", sira: 3,  metin: "Personel standart prosedürleri uyguladı mı?" },
          { id: "b32_b1_s04", sira: 4,  metin: "Beklenmedik durumlarda personel doğru tepki verdi mi?" },
          { id: "b32_b1_s05", sira: 5,  metin: "Tüm departmanlarda hizmet standardı eşit miydi?" },
          { id: "b32_b1_s06", sira: 6,  metin: "Personel baskı altında kalitesini korudu mu?" },
          { id: "b32_b1_s07", sira: 7,  metin: "Gece vardiyası hizmet kalitesi gündüzle eşit miydi?" },
          { id: "b32_b1_s08", sira: 8,  metin: "Hafta sonu hizmet kalitesi hafta içiyle eşit miydi?" },
          { id: "b32_b1_s09", sira: 9,  metin: "Yoğun dönemde hizmet kalitesi korundu mu?" },
          { id: "b32_b1_s10", sira: 10, metin: "Personel etik kurallara uydu mu?" },
          { id: "b32_b1_s11", sira: 11, metin: "Misafir şikâyetine tepki hızı yeterliydi mi?" },
          { id: "b32_b1_s12", sira: 12, metin: "Personel kişisel telefon kullanımına dikkat etti mi?" },
          { id: "b32_b1_s13", sira: 13, metin: "Personel arası iletişim profesyoneldi mi?" },
          { id: "b32_b1_s14", sira: 14, metin: "Personel misafir önünde uygunsuz davranış sergilemedi mi?" },
                   { id: "b32_b1_s15", sira: 15, metin: "Genel personel disiplini yüksek miydi?" },
          { id: "b32_b1_s16", sira: 16, metin: "Personel misafir mahremiyetine saygı gösterdi mi?" },
          { id: "b32_b1_s17", sira: 17, metin: "Personel otel politikalarını doğru uyguladı mı?" },
          { id: "b32_b1_s18", sira: 18, metin: "Personel genel tutumu marka değerini yansıttı mı?" },
          { id: "b32_b1_s19", sira: 19, metin: "Genel gizli müşteri personel değerlendirmesi olumlu muydu?" },
          { id: "b32_b1_s20", sira: 20, metin: "Genel personel performansı denetim standartlarını karşıladı mı?" }
        ]
      },
      {
        bolumNo: 2,
        bolumAdi: "Hizmet Kalitesi Değerlendirmesi",
        tip: "score",
        skala: { min: 1, max: 100 },
        renkBantlari: RENK_BANTLARI,
        notZorunlu: true,
        sorular: [
          { id: "b32_b2_s01", sira: 1,  metin: "Otel genel hizmet standardı tutarlı mıydı?" },
          { id: "b32_b2_s02", sira: 2,  metin: "Misafir yolculuğu başından sonuna sorunsuz muydu?" },
          { id: "b32_b2_s03", sira: 3,  metin: "Otel vaat ettiği hizmet seviyesini sundu mu?" },
          { id: "b32_b2_s04", sira: 4,  metin: "Genel fiziksel koşullar yüksek standarttaydı mı?" },
          { id: "b32_b2_s05", sira: 5,  metin: "Genel hijyen ve temizlik standardı yüksek miydi?" },
          { id: "b32_b2_s06", sira: 6,  metin: "Genel güvenlik standardı yüksek miydi?" },
          { id: "b32_b2_s07", sira: 7,  metin: "Genel teknoloji altyapısı yeterliydi mi?" },
          { id: "b32_b2_s08", sira: 8,  metin: "Genel sürdürülebilirlik uygulamaları görünür müydü?" },
          { id: "b32_b2_s09", sira: 9,  metin: "Genel fiyat / değer dengesi uygun muydu?" },
          { id: "b32_b2_s10", sira: 10, metin: "Otel genel imajı rekabetçi miydi?" },
          { id: "b32_b2_s11", sira: 11, metin: "Misafir deneyimi bütünsel ve tutarlı mıydı?" },
          { id: "b32_b2_s12", sira: 12, metin: "Otel standartları uluslararası normlara uygun muydu?" },
          { id: "b32_b2_s13", sira: 13, metin: "Genel konaklama deneyimi yıldız sınıfıyla uyumluydu mu?" },
          { id: "b32_b2_s14", sira: 14, metin: "Otel genel marka vaadini yerine getirdi mi?" },
          { id: "b32_b2_s15", sira: 15, metin: "Gizli müşteri denetimi genel olarak başarılı sonuç verdi mi?" },
          { id: "b32_b2_s16", sira: 16, metin: "Otelin güçlü yönleri belirgin miydi?" },
          { id: "b32_b2_s17", sira: 17, metin: "Otelin gelişime açık alanları tespit edilebildi mi?" },
          { id: "b32_b2_s18", sira: 18, metin: "Genel denetim bulguları tutarlı ve güvenilir miydi?" },
          { id: "b32_b2_s19", sira: 19, metin: "Genel otel deneyimi sektör ortalamasının üzerinde miydi?" },
          { id: "b32_b2_s20", sira: 20, metin: "Bu oteli gizli müşteri denetimi açısından başarılı buluyor musunuz?" }
        ]
      }
    ]
  }

]; // DENETIM_VERITABANI sonu

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================

// Birim ortalaması hesapla
function birimOrtalamasi(birimId, cevaplar) {
  const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) return null;
  let toplam = 0, adet = 0;
  birim.bolumler.forEach(bolum => {
    bolum.sorular.forEach(soru => {
      if (cevaplar[soru.id] !== undefined) {
        toplam += cevaplar[soru.id];
        adet++;
      }
    });
  });
  return adet > 0 ? Math.round(toplam / adet) : null;
}

// Genel otel ortalaması hesapla
function genelOrtalama(cevaplar) {
  let toplam = 0, adet = 0;
  DENETIM_VERITABANI.forEach(birim => {
    birim.bolumler.forEach(bolum => {
      bolum.sorular.forEach(soru => {
        if (cevaplar[soru.id] !== undefined) {
          toplam += cevaplar[soru.id];
          adet++;
        }
      });
    });
  });
  return adet > 0 ? Math.round(toplam / adet) : null;
}

// Bölüm ortalaması hesapla
function bolumOrtalamasi(birimId, bolumNo, cevaplar) {
  const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) return null;
  const bolum = birim.bolumler.find(b => b.bolumNo === bolumNo);
  if (!bolum) return null;
  let toplam = 0, adet = 0;
  bolum.sorular.forEach(soru => {
    if (cevaplar[soru.id] !== undefined) {
      toplam += cevaplar[soru.id];
      adet++;
    }
  });
  return adet > 0 ? Math.round(toplam / adet) : null;
}

// Kritik birimler (puan < 50) listele
function kritikBirimleriGetir(cevaplar) {
  return DENETIM_VERITABANI
    .map(birim => ({
      birim,
      puan: birimOrtalamasi(birim.id, cevaplar)
    }))
    .filter(({ puan }) => puan !== null && puan < 50)
    .sort((a, b) => a.puan - b.puan);
}

// Tüm birimlerin özet raporu
function ozetRapor(cevaplar) {
  return DENETIM_VERITABANI.map(birim => {
    const puan = birimOrtalamasi(birim.id, cevaplar);
    return {
      birimId:   birim.id,
      birimAdi:  birim.birimAdi,
      sira:      birim.sira,
      puan:      puan,
      renkBant:  puan !== null ? getRenkBant(puan) : null
    };
  });
}

// Export
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DENETIM_VERITABANI,
    RENK_BANTLARI,
    getRenkBant,
    birimOrtalamasi,
    bolumOrtalamasi,
    genelOrtalama,
    kritikBirimleriGetir,
    ozetRapor
  };
}




