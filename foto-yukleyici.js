// ============================================================
// foto-yukleyici.js
// Denetim fotoğrafı çekme, sıkıştırma, yerel depolama
// Firebase bağımlılığı kaldırıldı — tamamen yerel çalışır
// ============================================================

// ============================================================
// FOTOĞRAF SIKIŞTIRICISI
// ============================================================
function fotografSikistir(dosya, maxGenislik, kalite) {
  if (maxGenislik === undefined) maxGenislik = 1200;
  if (kalite === undefined) kalite = 0.75;

  return new Promise(function(resolve, reject) {
    if (!dosya || !dosya.type.startsWith("image/")) {
      reject(new Error("Geçersiz dosya türü"));
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement("canvas");
        var width  = img.width;
        var height = img.height;
        if (width > maxGenislik) {
          height = Math.round((height * maxGenislik) / width);
          width  = maxGenislik;
        }
        canvas.width  = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        var base64 = canvas.toDataURL("image/jpeg", kalite);
        var boyut  = Math.round((base64.length * 3) / 4 / 1024);
        resolve({
          base64       : base64,
          genislik     : width,
          yukseklik    : height,
          boyutKB      : boyut,
          orijinalAd   : dosya.name,
          tur          : "image/jpeg"
        });
      };
      img.onerror = function() { reject(new Error("Görsel yüklenemedi")); };
      img.src = e.target.result;
    };
    reader.onerror = function() { reject(new Error("Dosya okunamadı")); };
    reader.readAsDataURL(dosya);
  });
}

// ============================================================
// FOTOĞRAF KAYDET — yerel localStorage
// ============================================================
async function fotografYukle(base64, denetimId, maddeAdi, siraNo) {
  if (siraNo === undefined) siraNo = 0;
  var anahtar = "foto_" + denetimId + "_" + siraNo + "_" + Date.now();
  try {
    localStorage.setItem(anahtar, base64);
  } catch(e) {
    _eskiFotograflariTemizle();
    try { localStorage.setItem(anahtar, base64); } catch(_) {}
  }
  return {
    url          : base64,
    yol          : anahtar,
    kaynak       : "local",
    yuklemeTarihi: new Date().toISOString()
  };
}

// ============================================================
// FOTOĞRAF SİL
// ============================================================
async function fotografSil(yol) {
  if (!yol) return false;
  try { localStorage.removeItem(yol); return true; } catch(e) { return false; }
}

function _eskiFotograflariTemizle() {
  var anahtarlar = Object.keys(localStorage)
    .filter(function(k) { return k.startsWith("foto_"); })
    .sort();
  var silinecek = anahtarlar.slice(0, Math.ceil(anahtarlar.length * 0.3));
  silinecek.forEach(function(k) { localStorage.removeItem(k); });
}

// ============================================================
// FOTOĞRAF BÜYÜTME
// ============================================================
function fotografBuyut(src) {
  if (!src || src === "#") return;
  var modal = document.createElement("div");
  modal.style.cssText = [
    "position:fixed", "inset:0", "background:rgba(0,0,0,0.92)",
    "z-index:9999", "display:flex", "align-items:center",
    "justify-content:center", "padding:20px", "cursor:zoom-out"
  ].join(";");
  modal.innerHTML = [
    '<div style="position:relative;max-width:90vw;max-height:90vh">',
    '<img src="' + src + '" style="max-width:100%;max-height:90vh;border-radius:12px;object-fit:contain">',
    '<button onclick="this.closest(\'div\').parentNode.remove()" ',
    'style="position:absolute;top:-12px;right:-12px;width:32px;height:32px;',
    'border-radius:50%;background:#ef4444;color:white;border:none;',
    'font-size:16px;cursor:pointer;font-weight:700">✕</button>',
    '</div>'
  ].join("");
  modal.addEventListener("click", function(e) { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

// ============================================================
// window'a global aç
// ============================================================
window.fotografBuyut = fotografBuyut;
window.FotoYukleyici = {
  sikistir     : fotografSikistir,
  yukle        : fotografYukle,
  sil          : fotografSil,
  buyut        : fotografBuyut,

  // ── Fotoğraf yükleme alanı HTML'ini üret ──
  alaniOlustur : function(maddeId, maddeAdi) {
    var guvenliAd = (maddeAdi || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");
    return [
      '<div class="foto-yukle-alani">',

        // Kamera + Galeri butonları
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">',

          // Kamera ile çek (mobil)
          '<label style="',
            'flex:1;min-width:120px;display:flex;align-items:center;justify-content:center;',
            'gap:7px;padding:11px 14px;background:#eff6ff;color:#3b82f6;',
            'border:2px dashed #93c5fd;border-radius:10px;cursor:pointer;',
            'font-size:13px;font-weight:700;transition:all 0.2s;',
            'user-select:none" ',
            'onmouseover="this.style.background=\'#dbeafe\'" ',
            'onmouseout="this.style.background=\'#eff6ff\'">',
            '<input type="file" accept="image/*" capture="environment" multiple ',
              'style="display:none" ',
              'onchange="fotografEkle(event,\'' + maddeId + '\',\'' + guvenliAd + '\')">',
            '📷 Fotoğraf Çek',
          '</label>',

          // Galeriden seç
          '<label style="',
            'flex:1;min-width:120px;display:flex;align-items:center;justify-content:center;',
            'gap:7px;padding:11px 14px;background:#f0fdf4;color:#22c55e;',
            'border:2px dashed #86efac;border-radius:10px;cursor:pointer;',
            'font-size:13px;font-weight:700;transition:all 0.2s;',
            'user-select:none" ',
            'onmouseover="this.style.background=\'#dcfce7\'" ',
            'onmouseout="this.style.background=\'#f0fdf4\'">',
            '<input type="file" accept="image/*" multiple ',
              'style="display:none" ',
              'onchange="fotografEkle(event,\'' + maddeId + '\',\'' + guvenliAd + '\')">',
            '🖼 Galeriden Seç',
          '</label>',

        '</div>',

        // İlerleme çubuğu
        '<div id="durum_foto_' + maddeId + '" ',
          'style="display:none;align-items:center;gap:10px;margin-bottom:8px;',
          'background:#f8fafc;border-radius:8px;padding:10px 12px">',
          '<div style="flex:1;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">',
            '<div id="progress_foto_' + maddeId + '" ',
              'style="height:100%;width:0%;background:#3b82f6;border-radius:3px;',
              'transition:width 0.3s ease"></div>',
          '</div>',
          '<span id="durumMetin_foto_' + maddeId + '" ',
            'style="font-size:12px;color:#64748b;white-space:nowrap">Yükleniyor...</span>',
        '</div>',

        // Önizleme grid
        '<div id="onizleme_foto_' + maddeId + '" class="foto-onizleme-grid"></div>',

      '</div>'
    ].join('');
  }
};
