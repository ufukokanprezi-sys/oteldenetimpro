// ============================================================
// raporlar.js — Raporlar Modülü
// Şifreli localStorage + Uzun Profesyonel Yorumlar
// ============================================================

async function raporlarSayfasi() {
  // ✅ OTURUM KONTROLÜ EKLENDİ
  const aktifKullanici = aktifKullaniciyiGetir();
  if (!aktifKullanici) { window.location.href = 'index.html'; return; }

  const kayitlar = await denetimleriGetir();

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="max-width:1100px; margin:0 auto">

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px">
        <button class="rapor-sekme-btn aktif" id="sekme-raporlar"
                onclick="raporSekmeGec('raporlar')">📊 Raporlar</button>
        <button class="rapor-sekme-btn" id="sekme-yapayZeka"
                onclick="raporSekmeGec('yapayZeka')">🤖 Yapay Zeka Raporu</button>
      </div>

      <div id="panel-raporlar">

        <div style="background:white; border-radius:16px;
          box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:20px 24px; margin-bottom:24px">
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap">
            <div style="font-size:15px; font-weight:700; margin-right:4px">🔍 Filtrele:</div>
            <input type="text" id="filtre_otel" placeholder="Otel adı..."
              oninput="raporFiltrele()"
              style="padding:10px 14px; border:2px solid #e2e8f0; border-radius:10px;
                     font-size:13px; outline:none; min-width:180px; transition:border-color 0.2s"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
            <select id="filtre_durum" onchange="raporFiltrele()"
              style="padding:10px 14px; border:2px solid #e2e8f0; border-radius:10px;
                     font-size:13px; outline:none; background:white; cursor:pointer">
              <option value="">Tüm Durumlar</option>
              <option value="mukemmel">Mükemmel (90+)</option>
              <option value="iyi">İyi (75-89)</option>
              <option value="gelistir">Geliştirilmeli (50-74)</option>
              <option value="kritik">Kritik (0-49)</option>
            </select>
            <select id="filtre_ay" onchange="raporFiltrele()"
              style="padding:10px 14px; border:2px solid #e2e8f0; border-radius:10px;
                     font-size:13px; outline:none; background:white; cursor:pointer">
              <option value="">Tüm Aylar</option>
              ${aySecenekleriOlustur(kayitlar)}
            </select>
            <button onclick="raporFiltrele()" style="
              padding:10px 18px; background:#3b82f6; color:white; border:none;
              border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
              Uygula
            </button>
            <button onclick="filtreTemizle()" style="
              padding:10px 18px; background:#f1f5f9; color:#64748b; border:none;
              border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
              Temizle
            </button>
            <button onclick="csvIndir()" style="
              padding:10px 18px; background:#16a34a; color:white; border:none;
              border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; margin-left:auto">
              ⬇ CSV İndir
            </button>
          </div>
        </div>

        <div id="raporOzetGrid" style="
          display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px"></div>

        <div style="display:grid; grid-template-columns:1fr 320px; gap:16px; margin-bottom:24px">
          <div style="background:white; border-radius:16px;
                      box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px">
            <div style="font-size:15px; font-weight:700; margin-bottom:20px">📈 Puan Trendi</div>
            <div id="puanGrafik" style="height:200px; display:flex; align-items:flex-end;
                                        gap:6px; border-bottom:2px solid #f1f5f9;
                                        padding-bottom:8px; overflow-x:auto"></div>
            <div id="puanGrafikEtiket" style="display:flex; gap:6px; margin-top:8px; overflow-x:auto"></div>
          </div>
          <div style="background:white; border-radius:16px;
                      box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px">
            <div style="font-size:15px; font-weight:700; margin-bottom:20px">🎯 Durum Dağılımı</div>
            <div id="dagılımGrafik"></div>
          </div>
        </div>

        <div style="background:white; border-radius:16px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px; margin-bottom:24px">
          <div style="font-size:15px; font-weight:700; margin-bottom:20px">🏢 Birim Performans Analizi</div>
          <div id="birimAnalizGrid" style="
            display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:12px"></div>
        </div>

        <div style="background:white; border-radius:16px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px; margin-bottom:24px">
          <div style="font-size:15px; font-weight:700; margin-bottom:20px">🏨 Otel Karşılaştırma</div>
          <div id="otelKarsilastirmaGrafik"></div>
        </div>

        <div style="background:white; border-radius:16px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px; margin-bottom:24px">
          <div style="font-size:15px; font-weight:700; margin-bottom:20px">👤 Denetçi Performans Sıralaması</div>
          <div id="denetciPerformansGrafik"></div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px">
          <div style="background:white; border-radius:16px;
                      box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px">
            <div style="font-size:15px; font-weight:700; margin-bottom:20px">🎯 Hedef vs Gerçek (90 Puan)</div>
            <div id="hedefGercekGrafik"></div>
          </div>
          <div style="background:white; border-radius:16px;
                      box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px">
            <div style="font-size:15px; font-weight:700; margin-bottom:20px">🔵 Dağılım & Trend</div>
            <div id="scatterGrafik"></div>
          </div>
        </div>

        <div style="background:white; border-radius:16px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px; margin-bottom:24px">
          <div style="display:flex; align-items:center; justify-content:space-between;
                      margin-bottom:20px; flex-wrap:wrap; gap:10px">
            <div style="font-size:15px; font-weight:700">🕸️ Birim Radar Analizi</div>
            <select id="radarDenetimSec" onchange="radarGrafikRender(_sonKayitlar||[])"
              style="padding:8px 12px; border:2px solid #e2e8f0; border-radius:8px;
                     font-size:12px; outline:none; background:white; cursor:pointer"></select>
          </div>
          <div id="radarGrafik"></div>
        </div>

        <div style="background:white; border-radius:16px;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08); overflow:hidden; margin-bottom:24px">
          <div style="padding:18px 24px; border-bottom:1px solid #f1f5f9;
                      display:flex; align-items:center; justify-content:space-between">
            <div style="font-size:15px; font-weight:700">📋 Denetim Kayıtları</div>
            <div id="kayitSayisi" style="font-size:13px; color:#94a3b8"></div>
          </div>
          <div style="overflow-x:auto">
            <table style="width:100%; border-collapse:collapse" id="raporTablo">
              <thead>
                <tr>
                  ${["Tarih","Otel","Denetçi","Tür","Puan","Durum","Detay"].map(h => `
                    <th style="text-align:left; font-size:11px; font-weight:700;
                               color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px;
                               padding:10px 16px; background:#f8fafc;
                               border-bottom:1px solid #e2e8f0; white-space:nowrap">
                      ${h}
                    </th>`).join("")}
                </tr>
              </thead>
              <tbody id="raporTabloBody"></tbody>
            </table>
          </div>
        </div>

      </div>

      <div id="panel-yapayZeka" style="display:none">

        <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986);
                    border-radius:14px; padding:24px; margin-bottom:20px; color:white">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px">
            <span style="font-size:28px">🤖</span>
            <div>
              <strong style="font-size:16px; display:block">Yapay Zeka Destekli Kapanış Raporu</strong>
              <span style="font-size:12px; opacity:0.7">${kayitlar.length} denetim kaydı analiz edilecek</span>
            </div>
          </div>
          <p style="font-size:13px; opacity:0.8; line-height:1.7">
            Tüm denetim verileri analiz edilerek her birim için detaylı değerlendirme,
            güçlü/zayıf yönler ve aksiyon planı oluşturulacaktır.
          </p>
        </div>

        <div style="background:white; border-radius:14px; padding:20px;
                    box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-bottom:16px">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:14px; color:#4a5568">
            ⚙️ Rapor Seçenekleri
          </h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:16px">
            <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
              <input type="checkbox" id="opt-birim" checked style="accent-color:#3b82f6"> Birim Bazlı Analiz
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
              <input type="checkbox" id="opt-trend" checked style="accent-color:#3b82f6"> Trend Analizi
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
              <input type="checkbox" id="opt-aksiyon" checked style="accent-color:#3b82f6"> Aksiyon Planı
            </label>
            <label style="display:flex; align-items:center; gap:6px; font-size:13px; cursor:pointer">
              <input type="checkbox" id="opt-oneri" checked style="accent-color:#3b82f6"> Stratejik Öneriler
            </label>
          </div>
          <button onclick="yapayZekaRaporuOlustur()"
            style="padding:13px 28px; background:linear-gradient(135deg,#3b82f6,#1d4ed8);
                   color:white; border:none; border-radius:10px; font-size:14px;
                   font-weight:700; cursor:pointer"
            onmouseover="this.style.transform='translateY(-1px)'"
            onmouseout="this.style.transform='none'">
            🤖 Raporu Oluştur
          </button>
        </div>

        <div id="yzRaporAlani"></div>

      </div>

    </div>

    <style>
      .rapor-sekme-btn {
        padding:10px 20px; border:2px solid #e2e8f0; background:white;
        border-radius:10px; font-size:13px; font-weight:600;
        cursor:pointer; transition:all 0.2s; color:#64748b;
      }
      .rapor-sekme-btn.aktif { background:#3b82f6; border-color:#3b82f6; color:white; }
      @keyframes spin {
        0% { transform:rotate(0deg); }
        100% { transform:rotate(360deg); }
      }
      @media print {
        [style*="page-break-before:always"] { page-break-before: always !important; }
        .rapor-sekme-btn { display:none; }
      }
    </style>`;

  raporFiltrele();
}

// ============================================================
// SEKME GEÇİŞİ
// ============================================================
function raporSekmeGec(sekme) {
  ["raporlar","yapayZeka"].forEach(s => {
    const panel = document.getElementById("panel-" + s);
    const btn   = document.getElementById("sekme-" + s);
    if (panel) panel.style.display = s === sekme ? "block" : "none";
    if (btn)   btn.classList.toggle("aktif", s === sekme);
  });
}

// ============================================================
// FİLTRELE & RENDER
// ============================================================
let _sonKayitlar = [];

async function raporFiltrele() {
  // ✅ ROL BAZLI FİLTRELEME EKLENDİ
  const aktifKullanici = aktifKullaniciyiGetir();
  let tumKayitlar = await denetimleriGetir();

  // Admin hepsini görür, denetçi sadece kendi kayıtlarını
  let kayitlar = aktifKullanici && aktifKullanici.rol === 'admin'
    ? tumKayitlar
    : tumKayitlar.filter(k => k.denetciId === (aktifKullanici?.id || ''));

  const otelFiltre  = (document.getElementById("filtre_otel")?.value  || "").toLowerCase();
  const durumFiltre =  document.getElementById("filtre_durum")?.value  || "";
  const ayFiltre    =  document.getElementById("filtre_ay")?.value     || "";

  if (otelFiltre) {
    kayitlar = kayitlar.filter(k => (k.otelAdi || "").toLowerCase().includes(otelFiltre));
  }
  if (durumFiltre) {
    kayitlar = kayitlar.filter(k => {
      const p = k.puan || 0;
      if (durumFiltre === "mukemmel") return p >= 90;
      if (durumFiltre === "iyi")      return p >= 75 && p < 90;
      if (durumFiltre === "gelistir") return p >= 50 && p < 75;
      if (durumFiltre === "kritik")   return p < 50;
      return true;
    });
  }
  if (ayFiltre) {
    kayitlar = kayitlar.filter(k => {
      const tarih = tarihISOCevir(k.tarih);
      if (!tarih) return false;
      const d = new Date(tarih);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}` === ayFiltre;
    });
  }

  _sonKayitlar = kayitlar;

  raporOzetRender(kayitlar);
  puanGrafikRender(kayitlar);
  dagılımRender(kayitlar);
  birimAnalizRender(kayitlar);
  otelKarsilastirmaRender(kayitlar);
  denetciPerformansRender(kayitlar);
  hedefGercekRender(kayitlar);
  scatterGrafikRender(kayitlar);
  radarSeciciDoldur(kayitlar);
  radarGrafikRender(kayitlar);
  tabloRender(kayitlar);
}

function filtreTemizle() {
  const otel  = document.getElementById("filtre_otel");
  const durum = document.getElementById("filtre_durum");
  const ay    = document.getElementById("filtre_ay");
  if (otel)  otel.value  = "";
  if (durum) durum.value = "";
  if (ay)    ay.value    = "";
  raporFiltrele();
}

// ============================================================
// ÖZET KARTLAR
// ============================================================
function raporOzetRender(kayitlar) {
  const el = document.getElementById("raporOzetGrid");
  if (!el) return;

  const toplam   = kayitlar.length;
  const ortalama = toplam > 0 ? Math.round(kayitlar.reduce((t,k) => t+(k.puan||0), 0) / toplam) : 0;
  const enYuksek = toplam > 0 ? Math.max(...kayitlar.map(k => k.puan||0)) : 0;
  const enDusuk  = toplam > 0 ? Math.min(...kayitlar.map(k => k.puan||0)) : 0;

  const kartlar = [
    { ikon:"📋", renk:"#eff6ff", iRenk:"#3b82f6", deger:toplam,          etiket:"Toplam Denetim" },
    { ikon:"⭐", renk:"#fffbeb", iRenk:"#f59e0b", deger:ortalama || "—", etiket:"Ortalama Puan"  },
    { ikon:"🏆", renk:"#f0fdf4", iRenk:"#22c55e", deger:enYuksek || "—", etiket:"En Yüksek"      },
    { ikon:"⚠️", renk:"#fef2f2", iRenk:"#ef4444", deger:enDusuk  || "—", etiket:"En Düşük"       },
  ];

  el.innerHTML = kartlar.map(k => `
    <div style="background:white; border-radius:14px;
                box-shadow:0 2px 12px rgba(0,0,0,0.08);
                padding:20px; display:flex; align-items:center; gap:16px">
      <div style="width:52px; height:52px; border-radius:14px; background:${k.renk};
                  display:flex; align-items:center; justify-content:center;
                  font-size:24px; flex-shrink:0">${k.ikon}</div>
      <div>
        <div style="font-size:26px; font-weight:800; color:${k.iRenk};
                    line-height:1; margin-bottom:4px">${k.deger}</div>
        <div style="font-size:13px; color:#94a3b8">${k.etiket}</div>
      </div>
    </div>`).join("");
}

// ============================================================
// PUAN TRENDİ GRAFİĞİ
// ============================================================
function puanGrafikRender(kayitlar) {
  const grafikEl = document.getElementById("puanGrafik");
  const etiketEl = document.getElementById("puanGrafikEtiket");
  if (!grafikEl || !etiketEl) return;

  if (kayitlar.length === 0) {
    grafikEl.innerHTML = `<div style="width:100%; text-align:center; color:#cbd5e1;
                                      font-size:14px; padding:40px 0; align-self:center">
                            Gösterilecek veri yok</div>`;
    etiketEl.innerHTML = "";
    return;
  }

  const son20 = [...kayitlar]
    .sort((a,b) => (tarihISOCevir(a.tarih)||"").localeCompare(tarihISOCevir(b.tarih)||""))
    .slice(-20);

  grafikEl.innerHTML = son20.map(k => {
    const puan  = k.puan || 0;
    const yuzde = (puan / 100) * 100;
    const renk  = getRaporRenk(puan);
    return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px;
                  flex:1; min-width:28px; max-width:48px">
        <div style="font-size:10px; font-weight:700; color:${renk}; white-space:nowrap">${puan}</div>
        <div style="width:100%; background:${renk}20; border-radius:6px 6px 0 0;
                    height:${Math.max(yuzde*1.6,4)}px; position:relative; cursor:pointer"
             title="${k.otelAdi||''} — ${k.tarih||''}: ${puan} puan"
             onmouseover="this.style.opacity='0.75'"
             onmouseout="this.style.opacity='1'">
          <div style="position:absolute; bottom:0; left:0; right:0; height:100%;
                      background:${renk}; border-radius:6px 6px 0 0; opacity:0.85"></div>
        </div>
      </div>`;
  }).join("");

  etiketEl.innerHTML = son20.map(k => `
    <div style="flex:1; min-width:28px; max-width:48px; font-size:9px; color:#94a3b8;
                text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap"
         title="${k.otelAdi||''}">
      ${(k.tarih||"").split(".").slice(0,2).join(".")}
    </div>`).join("");
}

// ============================================================
// DURUM DAĞILIMI
// ============================================================
function dagılımRender(kayitlar) {
  const el = document.getElementById("dagılımGrafik");
  if (!el) return;

  const gruplar = [
    { etiket:"Mükemmel",       min:90, max:100, renk:"#22c55e" },
    { etiket:"İyi",            min:75, max:89,  renk:"#3b82f6" },
    { etiket:"Geliştirilmeli", min:50, max:74,  renk:"#f59e0b" },
    { etiket:"Kritik",         min:0,  max:49,  renk:"#ef4444" },
  ];

  const toplam = kayitlar.length;
  if (toplam === 0) {
    el.innerHTML = `<div style="text-align:center; color:#cbd5e1; font-size:14px; padding:32px 0">Veri yok</div>`;
    return;
  }

  el.innerHTML = gruplar.map(g => {
    const sayi  = kayitlar.filter(k => (k.puan||0) >= g.min && (k.puan||0) <= g.max).length;
    const yuzde = Math.round((sayi / toplam) * 100);
    return `
      <div style="margin-bottom:14px">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px">
          <span style="font-weight:600; color:${g.renk}">${g.etiket}</span>
          <span style="color:#94a3b8">${sayi} kayıt (${yuzde}%)</span>
        </div>
        <div style="height:10px; background:#f1f5f9; border-radius:5px; overflow:hidden">
          <div style="height:100%; width:${yuzde}%; background:${g.renk};
                      border-radius:5px; transition:width 0.8s ease"></div>
        </div>
      </div>`;
  }).join("");
}

// ============================================================
// BİRİM PERFORMANS ANALİZİ
// ============================================================
function birimAnalizRender(kayitlar) {
  const el = document.getElementById("birimAnalizGrid");
  if (!el) return;

  if (kayitlar.length === 0) {
    el.innerHTML = `<div style="grid-column:1/-1; text-align:center;
                                color:#cbd5e1; font-size:14px; padding:32px 0">
                      Gösterilecek veri yok</div>`;
    return;
  }

  const birimPuanMap = {};
  kayitlar.forEach(kayit => {
    if (!kayit.birimPuanlari) return;
    Object.entries(kayit.birimPuanlari).forEach(([birimId, puan]) => {
      if (!birimPuanMap[birimId]) birimPuanMap[birimId] = [];
      birimPuanMap[birimId].push(puan);
    });
  });

  if (Object.keys(birimPuanMap).length === 0) {
    el.innerHTML = `<div style="grid-column:1/-1; text-align:center;
                                color:#cbd5e1; font-size:14px; padding:32px 0">
                      Birim verisi bulunamadı</div>`;
    return;
  }

  const birimSonuclar = Object.entries(birimPuanMap)
    .map(([birimId, puanlar]) => {
      const ort   = Math.round(puanlar.reduce((a,b) => a+b, 0) / puanlar.length);
      const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
      return { birimId, birimAdi: birim?.birimAdi || birimId, ort, sayi: puanlar.length };
    })
    .sort((a,b) => b.ort - a.ort);

  el.innerHTML = birimSonuclar.map(b => {
    const renk = getRaporRenk(b.ort);
    const bilgi = getRaporRenkBilgi(b.ort);
    return `
      <div style="background:#f8fafc; border-radius:12px; padding:16px;
                  border:2px solid #f1f5f9; transition:border-color 0.2s"
           onmouseover="this.style.borderColor='${renk}40'"
           onmouseout="this.style.borderColor='#f1f5f9'">
        <div style="display:flex; justify-content:space-between;
                    align-items:flex-start; margin-bottom:10px">
          <div style="font-size:13px; font-weight:600; color:#374151;
                      line-height:1.4; flex:1; padding-right:8px">${b.birimAdi}</div>
          <div style="font-size:20px; font-weight:800; color:${renk}; flex-shrink:0">${b.ort}</div>
        </div>
        <div style="height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden; margin-bottom:8px">
          <div style="height:100%; width:${b.ort}%; background:${renk};
                      border-radius:3px; transition:width 0.8s ease"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px">
          <span style="color:${renk}; font-weight:700; background:${renk}15;
                       padding:2px 8px; border-radius:10px">${bilgi.etiket}</span>
          <span style="color:#94a3b8">${b.sayi} denetim</span>
        </div>
      </div>`;
  }).join("");
}

// ============================================================
// TABLO
// ============================================================
function tabloRender(kayitlar) {
  const body   = document.getElementById("raporTabloBody");
  const sayiEl = document.getElementById("kayitSayisi");
  if (!body) return;

  // ✅ Admin ise denetçi sütunu göster
  const aktifKullanici = aktifKullaniciyiGetir();
  const adminMiGoster  = aktifKullanici && aktifKullanici.rol === 'admin';

  if (sayiEl) sayiEl.textContent = `${kayitlar.length} kayıt`;

  if (kayitlar.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:48px; color:#94a3b8; font-size:14px">
          <div style="font-size:36px; margin-bottom:10px">📋</div>
          Filtreye uygun denetim bulunamadı.
        </td>
      </tr>`;
    return;
  }

  const turEtiket = { gizli:"Gizli Müşteri", acik:"Açık Denetim", ani:"Ani Denetim" };

  body.innerHTML = [...kayitlar].reverse().map(k => {
    const puan  = k.puan || 0;
    const renk  = getRaporRenk(puan);
    const bilgi = getRaporRenkBilgi(puan);
    return `
      <tr style="cursor:pointer"
          onmouseover="this.style.background='#f8fafc'"
          onmouseout="this.style.background='white'"
          onclick="denetimDetayGoster('${k.id}')">
        <td style="padding:12px 16px; font-size:13px; border-bottom:1px solid #f1f5f9; white-space:nowrap">
          ${k.tarih || "—"}
        </td>
        <td style="padding:12px 16px; font-size:13px; border-bottom:1px solid #f1f5f9">
          <strong>${k.otelAdi || "—"}</strong>
        </td>
        <td style="padding:12px 16px; font-size:13px; border-bottom:1px solid #f1f5f9; color:#64748b">
          ${adminMiGoster
            ? `<span style="display:inline-flex; align-items:center; gap:6px">
                 <span style="width:24px; height:24px; border-radius:50%; background:#3b82f620;
                              color:#3b82f6; font-size:11px; font-weight:800;
                              display:inline-flex; align-items:center; justify-content:center">
                   ${(k.denetciAd || k.denetci || '?').charAt(0).toUpperCase()}
                 </span>
                 ${k.denetciAd || k.denetci || "—"}
               </span>`
            : k.denetci || "—"
          }
        </td>
        <td style="padding:12px 16px; font-size:13px; border-bottom:1px solid #f1f5f9; color:#64748b">
          ${turEtiket[k.tur] || k.tur || "—"}
        </td>
        <td style="padding:12px 16px; border-bottom:1px solid #f1f5f9">
          <div style="display:inline-flex; align-items:center; justify-content:center;
                      width:36px; height:36px; border-radius:50%; font-size:12px;
                      font-weight:800; background:${renk}20; color:${renk}">
            ${puan || "—"}
          </div>
        </td>
        <td style="padding:12px 16px; border-bottom:1px solid #f1f5f9">
          <span style="display:inline-flex; align-items:center; padding:4px 10px;
                       border-radius:20px; font-size:11px; font-weight:700;
                       background:${renk}15; color:${renk}">${bilgi.etiket}</span>
        </td>
        <td style="padding:12px 16px; border-bottom:1px solid #f1f5f9">
          <button onclick="event.stopPropagation(); denetimDetayGoster('${k.id}')"
            style="padding:6px 12px; background:#eff6ff; color:#3b82f6;
                   border:none; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer">
            Detay
          </button>
        </td>
      </tr>`;
  }).join("");
}

// ============================================================
// DETAY MODAL
// ============================================================
async function denetimDetayGoster(id) {
  const kayitlar = await denetimleriGetir();
  const k = kayitlar.find(x => x.id === id);
  if (!k) return;

  // ✅ Sadece admin veya kaydın sahibi görebilir
  const aktifKullanici = aktifKullaniciyiGetir();
  if (aktifKullanici && aktifKullanici.rol !== 'admin' && k.denetciId !== aktifKullanici.id) return;

  const puan  = k.puan || 0;
  const renk  = getRaporRenk(puan);
  const bilgi = getRaporRenkBilgi(puan);
  const turEtiket = { gizli:"Gizli Müşteri", acik:"Açık Denetim", ani:"Ani Denetim" };

  const birimSatirlar = (k.secilenBirimler || []).map(birimId => {
    const birim     = DENETIM_VERITABANI.find(b => b.id === birimId);
    const birimPuan = k.birimPuanlari?.[birimId] || 0;
    const br        = getRaporRenk(birimPuan);
    return `
      <div style="display:flex; align-items:center; gap:12px;
                  padding:10px 0; border-bottom:1px solid #f8fafc">
        <div style="flex:1; font-size:13px; font-weight:500">${birim?.birimAdi || birimId}</div>
        <div style="width:100px; height:7px; background:#f1f5f9;
                    border-radius:4px; overflow:hidden; flex-shrink:0">
          <div style="height:100%; width:${birimPuan}%; background:${br}; border-radius:4px"></div>
        </div>
        <div style="font-size:13px; font-weight:800; color:${br};
                    width:32px; text-align:right; flex-shrink:0">${birimPuan}</div>
      </div>`;
  }).join("");

  const modal = document.createElement("div");
  modal.id = "detayModal";
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9000; background:rgba(0,0,0,0.6);
    display:flex; align-items:center; justify-content:center; padding:20px`;

  // ✅ Silme butonu sadece admin için göster
  const silButonu = aktifKullanici && aktifKullanici.rol === 'admin'
    ? `<button onclick="denetimSil('${k.id}')"
         style="padding:10px 18px; background:#fef2f2; color:#ef4444;
                border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
         🗑 Sil
       </button>`
    : '';

  modal.innerHTML = `
    <div style="background:white; border-radius:20px; width:100%; max-width:600px;
                max-height:85vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.3)">
      <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986); padding:24px 28px;
                  border-radius:20px 20px 0 0; display:flex;
                  justify-content:space-between; align-items:flex-start">
        <div style="color:white">
          <div style="font-size:11px; opacity:0.6; text-transform:uppercase;
                      letter-spacing:1px; margin-bottom:4px">Denetim Detayı</div>
          <div style="font-size:20px; font-weight:800">${k.otelAdi || "—"}</div>
          <div style="font-size:13px; opacity:0.7; margin-top:4px">
            ${k.tarih||"—"} · ${turEtiket[k.tur]||k.tur||"—"} · ${k.denetciAd || k.denetci||"—"}
          </div>
        </div>
        <div style="text-align:center; flex-shrink:0; margin-left:16px">
          <div style="font-size:40px; font-weight:900; color:${renk}; line-height:1">${puan}</div>
          <div style="font-size:11px; font-weight:700; color:${renk}; margin-top:4px">${bilgi.etiket}</div>
        </div>
      </div>
      <div style="padding:24px 28px">
        ${k.genelNot ? `
          <div style="background:#f8fafc; border-radius:10px; padding:14px 16px;
                      margin-bottom:20px; font-size:13px; color:#64748b; line-height:1.7;
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                      word-break:break-word; white-space:pre-wrap; overflow-wrap:break-word">
            <strong style="color:#374151; display:block; margin-bottom:6px">📝 Genel Not:</strong>${k.genelNot}
          </div>` : ""}
        ${aktifKullanici && aktifKullanici.rol === 'admin' && k.denetciAd ? `
          <div style="background:#eff6ff; border-radius:10px; padding:10px 14px;
                      margin-bottom:16px; font-size:13px; color:#3b82f6; font-weight:600">
            👤 Denetçi: ${k.denetciAd}
            ${k.denetciRol ? `<span style="font-size:11px; opacity:0.7; margin-left:6px">(${k.denetciRol})</span>` : ''}
          </div>` : ''}
        <div style="font-size:14px; font-weight:700; margin-bottom:12px">📊 Birim Puanları</div>
        ${birimSatirlar || `<div style="color:#94a3b8; font-size:13px; padding:12px 0">Birim verisi bulunamadı.</div>`}
      </div>
      <div style="padding:16px 28px 24px; display:flex; gap:10px; justify-content:flex-end">
        ${silButonu}
        <button onclick="document.getElementById('detayModal').remove()"
          style="padding:10px 18px; background:#f1f5f9; color:#64748b;
                 border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
          Kapat
        </button>
      </div>
    </div>`;

  modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

// ============================================================
// DENETİM SİL — ✅ Sadece Admin Silebilir
// ============================================================
async function denetimSil(id) {
  // ✅ ADMIN KONTROLÜ EKLENDİ
  const aktifKullanici = aktifKullaniciyiGetir();
  if (!aktifKullanici || aktifKullanici.rol !== 'admin') {
    alert("Bu işlem için yetkiniz bulunmamaktadır.");
    return;
  }
  if (!confirm("Bu denetim kaydı silinecek. Emin misiniz?")) return;

  // Tüm kayıtlardan sil (rol filtresi olmadan)
  let tumKayitlar = [];
  try {
    const ham = localStorage.getItem("denetim_kayitlar");
    tumKayitlar = ham ? JSON.parse(ham) : [];
  } catch(e) { tumKayitlar = []; }
  const guncel = tumKayitlar.filter(k => k.id !== id);
  localStorage.setItem("denetim_kayitlar", JSON.stringify(guncel));

  const modal = document.getElementById("detayModal");
  if (modal) modal.remove();
  raporFiltrele();
}

// ============================================================
// CSV İNDİR
// ============================================================
async function csvIndir() {
  const kayitlar = await denetimleriGetir();
  if (kayitlar.length === 0) { alert("İndirilecek kayıt bulunamadı."); return; }

  const turEtiket = { gizli:"Gizli Müşteri", acik:"Açık Denetim", ani:"Ani Denetim" };
  const satirlar  = [["Tarih","Otel","Denetçi","Tür","Puan","Durum","Genel Not"]];

  kayitlar.forEach(k => {
    const bilgi = getRaporRenkBilgi(k.puan || 0);
    satirlar.push([
      k.tarih||"", k.otelAdi||"", k.denetciAd || k.denetci||"",
      turEtiket[k.tur]||k.tur||"", k.puan||0, bilgi.etiket,
      (k.genelNot||"").replace(/"/g,"'")
    ]);
  });

  const csvIcerik = satirlar.map(s => s.map(h => `"${h}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csvIcerik], { type:"text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `denetim_raporu_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
// YAPAY ZEKA RAPORU
// ============================================================
async function yapayZekaRaporuOlustur() {
  const kayitlar = await denetimleriGetir();
  const alan     = document.getElementById("yzRaporAlani");

  if (kayitlar.length === 0) {
    alan.innerHTML = `
      <div style="background:white; border-radius:14px; padding:40px 32px;
                  text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.06)">
        <div style="font-size:48px; margin-bottom:16px">📋</div>
        <h3 style="font-size:16px; font-weight:800; color:#1e293b; margin-bottom:8px">
          Henüz Denetim Kaydı Yok
        </h3>
        <p style="font-size:13px; color:#64748b; line-height:1.7; max-width:360px; margin:0 auto 20px">
          Yapay zeka raporu oluşturabilmek için sisteme en az bir tamamlanmış
          denetim kaydı girilmiş olması gerekmektedir.
        </p>
        <button onclick="sayfayiGoster('yeniDenetim')"
          style="padding:11px 24px; background:#3b82f6; color:white; border:none;
                 border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
          ➕ Yeni Denetim Başlat
        </button>
      </div>`;
    return;
  }

  const birimsizKayitlar = kayitlar.filter(k =>
    !k.birimPuanlari || Object.keys(k.birimPuanlari).length === 0
  );

  if (birimsizKayitlar.length === kayitlar.length) {
    alan.innerHTML = `
      <div style="background:white; border-radius:14px; padding:40px 32px;
                  text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.06)">
        <div style="font-size:48px; margin-bottom:16px">⚠️</div>
        <h3 style="font-size:16px; font-weight:800; color:#1e293b; margin-bottom:8px">
          Birim Verileri Eksik
        </h3>
        <p style="font-size:13px; color:#64748b; line-height:1.7; max-width:360px; margin:0 auto 20px">
          Kayıtlı denetimlerin hiçbirinde birim puanı bulunmamaktadır.
        </p>
        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px;
                    padding:14px 18px; max-width:360px; margin:0 auto 20px; text-align:left">
          <strong style="font-size:12px; color:#92400e; display:block; margin-bottom:6px">
            📌 Eksik Kayıtlar (${birimsizKayitlar.length} adet):
          </strong>
          ${birimsizKayitlar.slice(0,5).map(k => `
            <div style="font-size:12px; color:#78350f; padding:3px 0; border-bottom:1px solid #fde68a20">
              • ${k.tarih || "—"} — ${k.otelAdi || "—"}
            </div>`).join("")}
          ${birimsizKayitlar.length > 5 ? `
            <div style="font-size:11px; color:#92400e; margin-top:6px">
              ...ve ${birimsizKayitlar.length - 5} kayıt daha
            </div>` : ""}
        </div>
      </div>`;
    return;
  }

  if (birimsizKayitlar.length > 0) {
    const devamOnay = confirm(
      `⚠️ Uyarı: ${birimsizKayitlar.length} denetim kaydında birim puanı eksik.\n\n` +
      `Bu kayıtlar rapor analizine dahil edilmeyecek, yalnızca birim verisi olan ` +
      `${kayitlar.length - birimsizKayitlar.length} kayıt kullanılacaktır.\n\n` +
      `Devam etmek istiyor musunuz?`
    );
    if (!devamOnay) return;
  }

  const optBirim   = document.getElementById("opt-birim")?.checked;
  const optTrend   = document.getElementById("opt-trend")?.checked;
  const optAksiyon = document.getElementById("opt-aksiyon")?.checked;
  const optOneri   = document.getElementById("opt-oneri")?.checked;

  alan.innerHTML = `
    <div style="background:white; border-radius:14px; padding:48px 20px;
                text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.06)">
      <div style="width:48px; height:48px; border:4px solid #e2e8f0;
                  border-top-color:#3b82f6; border-radius:50%;
                  animation:spin 0.8s linear infinite; margin:0 auto 16px"></div>
      <strong style="font-size:15px; color:#1e293b">Rapor Oluşturuluyor...</strong>
      <p style="font-size:13px; color:#94a3b8; margin-top:6px">Veriler analiz ediliyor, lütfen bekleyin.</p>
    </div>`;

  setTimeout(() => {
    const birimMap = {};
    kayitlar.forEach(k => {
      if (!k.birimPuanlari) return;
      Object.entries(k.birimPuanlari).forEach(([birimId, puan]) => {
        if (!birimMap[birimId]) birimMap[birimId] = [];
        birimMap[birimId].push(puan);
      });
    });

    // Her birim için soru bazlı en yüksek / en düşük bul
    function soruBazliEnIyiEnKotu(birimId) {
      const soruPuanlar = {}; // soruId -> { metin, puanlar:[] }
      kayitlar.forEach(k => {
        if (!k.cevaplar || !k.cevaplar[birimId]) return;
        const birimObj = (typeof DENETIM_VERITABANI !== "undefined")
          ? DENETIM_VERITABANI.find(b => b.id === birimId) : null;
        Object.entries(k.cevaplar[birimId]).forEach(([bolumNo, bolumCevap]) => {
          if (!bolumCevap.sorular) return;
          Object.entries(bolumCevap.sorular).forEach(([soruId, puan]) => {
            if (!soruPuanlar[soruId]) {
              // Soru metnini veritabanından bul
              let soruMetni = soruId;
              if (birimObj) {
                birimObj.bolumler?.forEach(bol => {
                  const s = bol.sorular?.find(s => String(s.id) === String(soruId));
                  if (s) soruMetni = s.metin || soruId;
                });
              }
              soruPuanlar[soruId] = { metin: soruMetni, puanlar: [] };
            }
            soruPuanlar[soruId].puanlar.push(puan);
          });
        });
      });
      if (Object.keys(soruPuanlar).length === 0) return { enIyi: null, enKotu: null };
      const ortalar = Object.entries(soruPuanlar).map(([sid, v]) => ({
        soruId: sid,
        metin: v.metin,
        ort: Math.round(v.puanlar.reduce((a,b)=>a+b,0)/v.puanlar.length)
      }));
      ortalar.sort((a,b) => b.ort - a.ort);
      return {
        enIyi : ortalar[0]             || null,
        enKotu: ortalar[ortalar.length-1] || null
      };
    }

    const birimler = Object.entries(birimMap).map(([birimId, puanlar]) => {
      const ort   = Math.round(puanlar.reduce((a,b) => a+b, 0) / puanlar.length);
      const min   = Math.min(...puanlar);
      const max   = Math.max(...puanlar);
      const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
      const { enIyi, enKotu } = soruBazliEnIyiEnKotu(birimId);
      return { id: birimId, birimId, ad: birim?.birimAdi || birimId, ort, min, max, sayi: puanlar.length, enIyi, enKotu };
    }).sort((a,b) => b.ort - a.ort);

    const tumPuanlar = kayitlar.map(k => k.puan || 0);
    const genelOrt   = tumPuanlar.length > 0
      ? Math.round(tumPuanlar.reduce((a,b) => a+b, 0) / tumPuanlar.length) : 0;

    function seviye(p) {
      if (p >= 90) return { emoji:"🏆", ad:"Mükemmel",        renk:"#22c55e" };
      if (p >= 75) return { emoji:"✅", ad:"İyi",              renk:"#3b82f6" };
      if (p >= 50) return { emoji:"⚠️", ad:"Geliştirilmeli",  renk:"#f59e0b" };
      return               { emoji:"🚨", ad:"Kritik",          renk:"#ef4444" };
    }

    function aksiyonUret(b) {
      const p = b.ort;
      if (p >= 90) return [
        "Mevcut standartları dokümante ederek diğer birimlere örnek süreç rehberi hazırlayın",
        "Üst performans gösteren personeli ödüllendirme programına dahil edin",
        "Benchmarking çalışması yaparak rakip otellerdeki en iyi uygulamaları inceleyin"
      ];
      if (p >= 75) return [
        "Standart operasyon prosedürlerini güncelleyerek puan tutarsızlığını giderin",
        "Aylık iç denetim sıklığını artırarak gelişimi takip edin",
        "Personel eğitim takvimini gözden geçirerek eksik yetkinlikleri tespit edin"
      ];
      if (p >= 50) return [
        "Birim yöneticisiyle acil performans görüşmesi gerçekleştirin",
        "Kök neden analizi yaparak düşük puanın kaynağını belirleyin",
        "2 haftalık yoğun eğitim programı planlayın ve sonuçları ölçün",
        "Misafir şikayetlerini kategorize ederek öncelikli sorun alanlarını belirleyin"
      ];
      return [
        "🚨 Birim müdürü ve üst yönetim ile acil kriz toplantısı düzenleyin",
        "Tüm personel için zorunlu yeniden eğitim programı başlatın",
        "Günlük denetim protokolü uygulayın ve sonuçları raporlayın",
        "Gerekirse dış danışman desteği alarak süreç yeniden yapılandırması yapın",
        "30 günlük iyileştirme planı oluşturun ve KPI'ları netleştirin"
      ];
    }

    const tarih = new Date().toLocaleDateString("tr-TR", {
      day:"2-digit", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit"
    });

    const genelS = seviye(genelOrt);

    // Birim bazlı fotoğrafları kayıtlardan topla
    function birimFotograflariniTopla(birimId) {
      const fotograflar = [];
      kayitlar.forEach(k => {
        if (!k.fotograflar || !Array.isArray(k.fotograflar)) return;
        k.fotograflar.forEach(f => {
          // maddeId içinde birimId geçiyorsa bu birime ait
          if (f.maddeId && f.maddeId.startsWith(birimId + "_")) {
            fotograflar.push({
              url    : f.url,
              maddeAdi: f.maddeAdi || f.maddeId || "",
              tarih  : k.tarih || "",
              otel   : k.otelAdi || ""
            });
          }
        });
      });
      return fotograflar;
    }

    const birimBolumleriHTML = optBirim ? birimler.map((b, birimIdx) => {
      const s = seviye(b.ort);
      const aksiyonlar = aksiyonUret(b);
      const yorumMetni = yorumUret(b);
      const birimFotolar = birimFotograflariniTopla(b.birimId || b.id || "");

      // ── Birime ait fotoğraf grid HTML ──
      const fotografHTML = birimFotolar.length > 0 ? `
        <div style="margin-top:18px; border-top:1px solid #e2e8f0; padding-top:16px">
          <strong style="font-size:12px; color:#64748b; display:block; margin-bottom:12px">
            📸 Denetim Fotoğrafları (${birimFotolar.length} adet)
          </strong>
          <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px">
            ${birimFotolar.map(f => `
              <div style="border:1px solid #e2e8f0; border-radius:10px; overflow:hidden;
                          background:#f8fafc; box-shadow:0 1px 4px rgba(0,0,0,0.06)">
                <div style="width:100%; height:140px; overflow:hidden; cursor:zoom-in"
                     onclick="this.nextElementSibling && void 0"
                     title="${f.maddeAdi}">
                  <img src="${f.url}" alt="${f.maddeAdi}"
                       style="width:100%; height:100%; object-fit:cover; display:block"
                       onerror="this.parentElement.style.background='#f1f5f9'; this.style.display='none'">
                </div>
                <div style="padding:8px 10px">
                  <div style="font-size:11px; font-weight:600; color:#374151;
                              line-height:1.4; word-break:break-word">
                    ${f.maddeAdi}
                  </div>
                  ${f.tarih ? `<div style="font-size:10px; color:#94a3b8; margin-top:3px">
                    📅 ${f.tarih}${f.otel ? ' — ' + f.otel : ''}
                  </div>` : ''}
                </div>
              </div>`).join("")}
          </div>
        </div>` : "";

      // ── Yapılandırılmış Değerlendirme Bölümü ──
      const aralik = b.max - b.min;
      const degerlendirmeHTML = `
        <div style="margin-top:16px; border:1px solid ${s.renk}30;
                    border-radius:10px; overflow:hidden; background:${s.renk}05">
          <div style="background:${s.renk}12; padding:10px 14px; border-bottom:1px solid ${s.renk}25;
                      display:flex; align-items:center; gap:8px">
            <span style="font-size:14px">${s.emoji}</span>
            <strong style="font-size:12px; color:${s.renk}; text-transform:uppercase;
                           letter-spacing:0.5px">Detaylı Değerlendirme</strong>
          </div>
          <div style="padding:14px 16px; display:flex; flex-direction:column; gap:10px">

            <div style="display:flex; gap:8px; align-items:flex-start">
              <span style="font-size:16px; flex-shrink:0; margin-top:1px">📊</span>
              <div style="flex:1">
                <div style="font-size:11px; font-weight:700; color:#94a3b8;
                            text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px">
                  Performans Özeti
                </div>
                <div style="font-size:12px; color:#374151; line-height:1.7; margin-bottom:8px">
                  <strong style="color:${s.renk}">${b.ort} puan</strong> ortalama ·
                  Aralık: <strong style="color:${aralik <= 10 ? '#22c55e' : aralik >= 25 ? '#ef4444' : '#f59e0b'}">${aralik}</strong>
                </div>
                ${b.enIyi ? `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:4px">
                  <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:8px 10px">
                    <div style="font-size:10px; font-weight:700; color:#16a34a; margin-bottom:3px; display:flex; align-items:center; gap:4px">
                      <span>📈</span> En Yüksek Sorular
                    </div>
                    <div style="font-size:22px; font-weight:800; color:#16a34a; line-height:1">${b.enIyi.ort}</div>
                    <div style="font-size:11px; color:#374151; margin-top:3px; line-height:1.4">${b.enIyi.metin}</div>
                  </div>
                  <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:8px 10px">
                    <div style="font-size:10px; font-weight:700; color:#dc2626; margin-bottom:3px; display:flex; align-items:center; gap:4px">
                      <span>📉</span> En Düşük Soru
                    </div>
                    <div style="font-size:22px; font-weight:800; color:#dc2626; line-height:1">${b.enKotu.ort}</div>
                    <div style="font-size:11px; color:#374151; margin-top:3px; line-height:1.4">${b.enKotu.metin}</div>
                  </div>
                </div>` : ''}
              </div>
            </div>

            <div style="display:flex; gap:8px; align-items:flex-start">
              <span style="font-size:16px; flex-shrink:0; margin-top:1px">🔍</span>
              <div>
                <div style="font-size:11px; font-weight:700; color:#94a3b8;
                            text-transform:uppercase; letter-spacing:0.5px; margin-bottom:3px">
                  Kalite Seviyesi
                </div>
                <div style="font-size:12px; color:#374151; line-height:1.7">
                  <span style="background:${s.renk}20; color:${s.renk}; font-weight:700;
                               padding:2px 10px; border-radius:20px; font-size:11px">
                    ${s.emoji} ${s.ad}
                  </span>
                  <span style="margin-left:8px; color:#64748b">
                    ${s.ad === "Mükemmel"
                      ? "Uluslararası konaklama standartlarının üzerinde."
                      : s.ad === "İyi"
                      ? "Temel kalite gereklilikleri karşılanmaktadır."
                      : s.ad === "Geliştirilmeli"
                      ? "Standartların altında, iyileştirme gerekli."
                      : "Acil müdahale gerektiren kritik seviye."}
                  </span>
                </div>
              </div>
            </div>

            <div style="display:flex; gap:8px; align-items:flex-start">
              <span style="font-size:16px; flex-shrink:0; margin-top:2px">📝</span>
              <div style="flex:1">
                <div style="font-size:11px; font-weight:700; color:#94a3b8;
                            text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px">
                  Değerlendirme
                </div>
                <p style="font-size:13px; color:#1e293b; line-height:1.9; margin:0;
                          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                          word-break:break-word; overflow-wrap:break-word">
                  ${yorumMetni}
                </p>
              </div>
            </div>

            ${aralik >= 15 ? `
            <div style="display:flex; gap:8px; align-items:flex-start">
              <span style="font-size:16px; flex-shrink:0; margin-top:1px">⚡</span>
              <div>
                <div style="font-size:11px; font-weight:700; color:#94a3b8;
                            text-transform:uppercase; letter-spacing:0.5px; margin-bottom:3px">
                  Tutarsızlık Uyarısı
                </div>
                <div style="font-size:12px; color:#92400e; line-height:1.7;
                            background:#fffbeb; border-radius:6px; padding:8px 10px;
                            border-left:3px solid #f59e0b">
                  Denetimler arasında <strong>${aralik} puanlık</strong> geniş bir varyasyon
                  tespit edilmiştir. Hizmet kalitesi denetimlere göre önemli farklılıklar
                  göstermektedir; standart prosedürlerin gözden geçirilmesi önerilir.
                </div>
              </div>
            </div>` : ''}

          </div>
        </div>`;

      return `
        <div style="page-break-before:${birimIdx > 0 ? 'always' : 'auto'};
                    border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;
                    margin-bottom:16px">
          <div style="background:${s.renk}15; border-bottom:1px solid #e2e8f0;
                      padding:14px 18px; display:flex; align-items:center; justify-content:space-between">
            <div style="display:flex; align-items:center; gap:10px">
              <span style="font-size:20px">${s.emoji}</span>
              <strong style="font-size:15px">${b.ad}</strong>
              <span style="font-size:11px; font-weight:700; background:${s.renk}20;
                           color:${s.renk}; padding:3px 10px; border-radius:20px">${s.ad}</span>
            </div>
            <strong style="font-size:20px; color:${s.renk}">
              ${b.ort}<span style="font-size:12px; color:#94a3b8">/100</span>
            </strong>
          </div>
          <div style="padding:16px 18px">
            <div style="display:flex; gap:20px; margin-bottom:14px; flex-wrap:wrap">
              <span style="font-size:12px; color:#64748b">📊 <strong>${b.sayi}</strong> denetim</span>
              <span style="font-size:12px; color:#64748b">⭐ Ortalama: <strong style="color:${s.renk}">${b.ort}</strong></span>
              <span style="font-size:12px; color:#64748b">↕ Varyasyon: <strong style="color:${aralik <= 10 ? '#22c55e' : aralik >= 25 ? '#ef4444' : '#f59e0b'}">${aralik}</strong></span>
            </div>
            ${degerlendirmeHTML}
            ${optAksiyon ? `
              <div style="background:#f8fafc; border-radius:8px; padding:12px; margin-top:14px">
                <strong style="font-size:12px; color:#64748b; display:block; margin-bottom:8px">
                  📌 Önerilen Aksiyonlar:
                </strong>
                ${aksiyonlar.map(a => `
                  <div style="display:flex; gap:8px; margin-bottom:6px; font-size:13px; color:#374151">
                    <span style="color:${s.renk}; flex-shrink:0">→</span>
                    <span>${a}</span>
                  </div>`).join("")}
              </div>` : ""}
            ${fotografHTML}
          </div>
        </div>`;
    }).join("") : "";

    const trendHTML = optTrend ? (() => {
      const sonBes = [...kayitlar].reverse().slice(0,5);
      const ilkBes = kayitlar.slice(0,5);
      const sonOrt = sonBes.length > 0 ? Math.round(sonBes.reduce((a,k) => a+(k.puan||0),0)/sonBes.length) : 0;
      const ilkOrt = ilkBes.length > 0 ? Math.round(ilkBes.reduce((a,k) => a+(k.puan||0),0)/ilkBes.length) : 0;
      const fark   = sonOrt - ilkOrt;
      const tRenk  = fark > 0 ? "#22c55e" : fark < 0 ? "#ef4444" : "#64748b";
      const trend  = fark > 0 ? "📈 Yükseliş" : fark < 0 ? "📉 Düşüş" : "➡️ Sabit";
      return `
        <div style="background:#f8fafc; border-radius:12px; padding:16px 18px; margin-bottom:16px">
          <strong style="font-size:14px; display:block; margin-bottom:12px">📈 Trend Analizi</strong>
          <div style="display:flex; gap:16px; flex-wrap:wrap">
            ${[
              { label:"İlk Dönem Ort.", val:ilkOrt,                  renk:"#64748b" },
              { label:"Son Dönem Ort.", val:sonOrt,                  renk:"#3b82f6" },
              { label:"Değişim",        val:(fark>0?"+":"")+fark,   renk:tRenk     },
              { label:"Trend",          val:trend,                   renk:tRenk     },
            ].map(x => `
              <div style="flex:1; min-width:140px; background:white; border-radius:10px;
                          padding:14px; text-align:center">
                <div style="font-size:11px; color:#94a3b8; margin-bottom:4px">${x.label}</div>
                <div style="font-size:22px; font-weight:800; color:${x.renk}">${x.val}</div>
              </div>`).join("")}
          </div>
          <p style="font-size:13px; color:#64748b; margin-top:12px; line-height:1.7">
            ${fark > 5
              ? "Denetim sürecinde belirgin bir kalite artışı gözlemlenmektedir. Bu olumlu trend, uygulanan eğitim ve iyileştirme çalışmalarının somut sonuçlarını yansıtmaktadır."
              : fark < -5
              ? "Son dönemde performansta düşüş eğilimi tespit edilmiştir. Olası nedenlerin araştırılması ve önleyici aksiyonların ivedilikle alınması önerilmektedir."
              : "Performans görece stabil bir seyir izlemektedir. Sistematik iyileştirme adımlarıyla bu platoya son verilebilir."}
          </p>
        </div>`;
    })() : "";

    const oneriHTML = optOneri ? `
      <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);
                  border:1px solid #bbf7d0; border-radius:12px; padding:18px; margin-bottom:16px">
        <strong style="font-size:14px; display:block; margin-bottom:12px; color:#166534">
          💡 Stratejik Öneriler
        </strong>
        ${[
          genelOrt >= 85
            ? "Mevcut kalite seviyesini korumak için periyodik denetim sıklığını optimize edin ve başarılı uygulamaları diğer birimlere yayın."
            : "Genel ortalamayı 85+ seviyesine taşımak için öncelikli olarak en düşük puanlı birimlere odaklanın.",
          birimler.length > 1
            ? `En yüksek performanslı birim olan "${birimler[0]?.ad}" ile en düşük performanslı birim "${birimler[birimler.length-1]?.ad}" arasındaki farkı kapatmak için çapraz birim mentorluk programı başlatın.`
            : "Birim bazlı denetim verilerini zenginleştirerek daha kapsamlı karşılaştırmalı analiz yapılabilir hale getirin.",
          kayitlar.length < 10
            ? "Daha güvenilir istatistiksel sonuçlar için denetim sıklığını artırın; en az 10-15 kayıt hedefleyin."
            : "Yeterli veri birikimi sağlanmıştır. Aylık kapanış raporları ile yönetim kuruluna düzenli sunum yapılması önerilir.",
          "Denetim sonuçlarını birim yöneticileriyle şeffaf biçimde paylaşarak hesap verebilirlik kültürünü güçlendirin.",
          "Misafir memnuniyet anketleri ile denetim puanları arasındaki korelasyonu analiz ederek denetim kriterlerini güncelleyin."
        ].map((o,i) => `
          <div style="display:flex; gap:10px; margin-bottom:10px;
                      font-size:13px; color:#166534; line-height:1.7">
            <span style="width:22px; height:22px; background:#22c55e; color:white;
                         border-radius:50%; display:flex; align-items:center;
                         justify-content:center; font-size:11px; font-weight:700;
                         flex-shrink:0; margin-top:1px">${i+1}</span>
            <span>${o}</span>
          </div>`).join("")}
      </div>` : "";

    const genelYorum = (() => {
      const kritik   = kayitlar.filter(k => (k.puan||0) < 50).length;
      const mukemmel = kayitlar.filter(k => (k.puan||0) >= 90).length;
      const oran     = kayitlar.length > 0 ? Math.round((mukemmel/kayitlar.length)*100) : 0;
      if (genelOrt >= 90) return `Otel genelinde olağanüstü bir performans tablosu ortaya çıkmaktadır. ${kayitlar.length} denetimin ${oran}%'i mükemmel kategorisinde yer almakta olup bu oran sektörün çok üzerindedir.`;
      if (genelOrt >= 75) return `Otel genelinde tatmin edici bir kalite seviyesi gözlemlenmektedir. ${genelOrt} puanlık genel ortalama temel standartların karşılandığını göstermekte; ${kritik > 0 ? `${kritik} kritik kayıt özellikle dikkat gerektirmektedir` : "tutarlılığın artırılmasına yönelik çalışmalar fark yaratacaktır"}.`;
      if (genelOrt >= 50) return `Otel genelinde iyileştirme gerektiren bir performans tablosu mevcuttur. ${genelOrt} puanlık ortalama misafir beklentilerinin tam karşılanamadığına işaret etmektedir. ${kritik} kritik kayıt acil aksiyon gerektirmektedir.`;
      return `Otel genelinde ciddi kalite sorunları tespit edilmiştir. ${genelOrt} puanlık ortalama operasyonel süreçlerde köklü bir yeniden yapılanma ihtiyacını ortaya koymaktadır.`;
    })();

    alan.innerHTML = `
      <div style="background:white; border-radius:14px; overflow:hidden;
                  box-shadow:0 4px 20px rgba(0,0,0,0.08);
                  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
        <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986); padding:28px; color:white">
          <div style="display:flex; align-items:flex-start;
                      justify-content:space-between; flex-wrap:wrap; gap:12px">
            <div>
              <div style="font-size:11px; opacity:0.6; letter-spacing:1px;
                          text-transform:uppercase; margin-bottom:6px">
                🤖 Yapay Zeka Destekli Kapanış Raporu
              </div>
              <h2 style="font-size:20px; font-weight:800; margin-bottom:4px">
                Otel Denetim Değerlendirmesi
              </h2>
              <div style="font-size:12px; opacity:0.65">
                Oluşturulma: ${tarih} · ${kayitlar.length} denetim · ${birimler.length} birim
              </div>
            </div>
            <div style="text-align:center">
              <div style="width:72px; height:72px; background:${genelS.renk};
                          border-radius:50%; display:flex; flex-direction:column;
                          align-items:center; justify-content:center">
                <strong style="font-size:22px; line-height:1">${genelOrt}</strong>
                <span style="font-size:9px; opacity:0.85">/ 100</span>
              </div>
              <div style="font-size:11px; margin-top:6px; opacity:0.8">${genelS.ad}</div>
            </div>
          </div>
        </div>
        <div style="padding:24px">
          <div style="background:#f8fafc; border-left:4px solid ${genelS.renk};
                      border-radius:0 10px 10px 0; padding:16px; margin-bottom:20px">
            <strong style="font-size:13px; color:#64748b; display:block; margin-bottom:6px">
              📝 Genel Değerlendirme
            </strong>
            <p style="font-size:14px; line-height:1.8; color:#1e293b">${genelYorum}</p>
          </div>
          ${trendHTML}
          ${birimBolumleriHTML}
          ${oneriHTML}
          <div style="border-top:1px solid #f1f5f9; padding-top:16px; margin-top:8px;
                      display:flex; align-items:center; justify-content:space-between;
                      flex-wrap:wrap; gap:8px">
            <span style="font-size:12px; color:#94a3b8">
              🤖 Bu rapor sistem verileri analiz edilerek otomatik oluşturulmuştur.
            </span>
            <button onclick="profesyonelPDFIndir()"
              style="padding:10px 20px; background:linear-gradient(135deg,#1e3a5f,#2d5986);
                     border:none; border-radius:10px; font-size:13px; font-weight:700;
                     color:white; cursor:pointer; display:flex; align-items:center; gap:8px">
              📄 PDF Raporu İndir
            </button>
          </div>
        </div>
      </div>`;
  }, 1200);
}

// ============================================================
// YORUM ÜRET — 10 Farklı Uzun Profesyonel Metin
// ============================================================
function yorumUret(b) {
  const aralik  = b.max - b.min;
  const tutarli = aralik <= 10;
  const dalgali = aralik >= 25;

  function sec(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function seviye(p) {
    if (p >= 90) return { ad:"Mükemmel" };
    if (p >= 75) return { ad:"İyi" };
    if (p >= 50) return { ad:"Geliştirilmeli" };
    return               { ad:"Kritik" };
  }

  const s = seviye(b.ort);

  const anaYorumlar = {

    "Mükemmel": [
      `${b.ad} birimi, titizlikle yürütülen ${b.sayi} bağımsız denetim sürecinin bütününde ${b.ort} puanlık kayda değer bir performans ortalaması yakalayarak uluslararası konaklama standartlarının yalnızca karşılanmasıyla yetinmeyip bu standartları sistematik ve ölçülebilir biçimde aştığını gözler önüne sermiş; misafir odaklı hizmet felsefesinin soyut bir söylemden öte, günlük operasyonun her katmanına işlenmiş somut bir gerçekliğe dönüştüğünü tartışmaya yer bırakmayacak şekilde kanıtlamıştır.`,
      `Konaklama endüstrisinin küresel rekabet ortamında sürdürülebilir kalite üretmenin ne denli zorlu bir hedef olduğu göz önünde bulundurulduğunda, ${b.ad} biriminin ${b.sayi} ayrı denetim döneminde sergilediği ve ${b.ort} puanlık güçlü bir ortalamaya karşılık gelen bu performans tablosu; ekip liderliğinin vizyoner yaklaşımını, personelin hizmet bilincini ve operasyonel süreçlerin olgunluğunu bir arada yansıtan, sektörde örnek gösterilebilecek nitelikte bir başarı hikâyesi olarak değerlendirilmelidir.`,
      `${b.ad} biriminde gerçekleştirilen ${b.sayi} kapsamlı denetimin analizi, ${b.ort} puanlık etkileyici ortalama performansın ardında yalnızca bireysel çabaların değil; misafir beklentilerini sürekli olarak aşmayı hedefleyen disiplinli bir hizmet kültürünün, ekip içi güçlü iletişim altyapısının ve kalite güvence mekanizmalarının günlük operasyona eksiksiz entegrasyonunun yattığını açıkça ortaya koymakta; bu tablo, birimi otel bünyesindeki en olgun operasyonel yapılar arasına taşımaktadır.`,
      `Otel denetim metodolojisi çerçevesinde ${b.sayi} bağımsız ölçüm noktasından elde edilen verilerin bütüncül değerlendirmesi, ${b.ad} biriminin ${b.ort} puanlık performans ortalamasıyla fiziksel hizmet altyapısı, personel yetkinlik düzeyi, misafir iletişim kalitesi ve operasyonel süreç olgunluğu boyutlarının tamamında üst düzey bir uyum yakaladığını; bu uyumun ise misafir deneyimini her temas noktasında tutarlı ve yüksek kalitede tutma kapasitesine doğrudan yansıdığını kanıtlar niteliktedir.`,
      `${b.ad} ekibinin ${b.sayi} denetim sürecinde istikrarlı biçimde sürdürdüğü ${b.ort} puanlık ortalama performans; konaklama sektöründe gerçek anlamda fark yaratan birimlerin ortak paydası olan misafir odaklılık, süreç disiplini ve sürekli iyileştirme kültürünün bu birimde yalnızca benimsenmediğini, aynı zamanda ölçülebilir çıktılara dönüştürülerek operasyonun ayrılmaz bir parçası hâline getirildiğini gösteren güçlü ve çok boyutlu bir başarı kanıtı olarak kayıtlara geçmektedir.`,
      `${b.sayi} titiz denetim sürecinden elde edilen verilerin derinlemesine analizi, ${b.ad} biriminin ${b.ort} puanlık ortalama performansının ardında yalnızca bireysel çabaların değil; standart operasyon prosedürlerine sıkı bağlılığın, misafir geri bildirimlerini operasyonel kararlarla buluşturan dinamik bir öğrenme döngüsünün ve hizmet kalitesini kurumsal bir değer olarak benimseyen güçlü bir ekip kimliğinin yattığını ortaya koymakta; bu tablo, birimi otel bünyesindeki en olgun operasyonel yapılar arasına taşımaktadır.`,
      `${b.ad} birimi, ${b.sayi} bağımsız denetim sürecinin tamamında sergilediği ${b.ort} puanlık ortalama performansıyla konaklama hizmetlerinin özünü oluşturan güvenilirlik, sıcaklık, özen ve tutarlılık değerlerini yalnızca söylem düzeyinde değil, her misafir etkileşiminde somutlaştırma kapasitesine sahip olduğunu kanıtlamış; bu kapasite, birimi otel genelinde kalite kültürünün taşıyıcısı ve diğer birimler için ilham kaynağı konumuna yükseltmektedir.`,
      `${b.ort} puanlık güçlü denetim ortalaması ve ${b.sayi} ölçüm noktasından elde edilen tutarlı veriler, ${b.ad} biriminin konaklama sektörünün yüksek baskı ortamında bile kalite çıtasını düşürmeksizin operasyonunu sürdürebildiğini; yoğun sezon koşulları, personel değişimleri veya operasyonel aksaklıklar gibi zorlu senaryolarda dahi misafir deneyimini ön planda tutma konusundaki kurumsal kararlılığını pratikte hayata geçirebildiğini gösteren son derece değerli bir performans profili ortaya koymaktadır.`,
      `${b.ad} biriminin ${b.sayi} denetim sürecinde sergilediği ve ${b.ort} puanlık etkileyici bir ortalamaya ulaşan bu performans tablosu; uluslararası otelcilik standartları, misafir memnuniyeti yönetimi ve operasyonel mükemmellik kriterleri açısından eş zamanlı olarak değerlendirildiğinde, birimin yalnızca mevcut standartları karşılamakla kalmayıp geleceğin konaklama kalite beklentilerine de hazır olduğunu ortaya koyan çok boyutlu ve son derece olumlu bir tablo sunmaktadır.`,
      `${b.sayi} bağımsız denetimin ortalaması olan ${b.ort} puan, ${b.ad} biriminin konaklama hizmetlerinde sürdürülebilir mükemmellik anlayışını benimsediğini ve bu anlayışı rastlantısal başarıların çok ötesinde, sistematik bir operasyonel disipline ve ölçülebilir kalite çıktılarına dönüştürdüğünü açıkça ortaya koymakta; söz konusu başarı, birimin hem mevcut misafir portföyünü koruma hem de yeni misafir segmentlerine hitap etme kapasitesini güçlendiren stratejik bir rekabet avantajı olarak değerlendirilmelidir.`
    ],

    "İyi": [
      `${b.ad} birimi, ${b.sayi} sistematik denetim sürecinde elde ettiği ${b.ort} puanlık ortalama performansıyla konaklama sektörünün temel kalite gerekliliklerini karşıladığını ve misafir memnuniyetine yönelik bilinçli bir kurumsal çabanın varlığını açıkça ortaya koymuş olmakla birlikte; denetim verileri derinlemesine incelendiğinde, üst performans bandına geçişi engelleyen ve büyük olasılıkla süreç standardizasyonu ile personel yetkinlik gelişimi alanlarında yoğunlaşan belirli operasyonel boşlukların giderilmesinin, birimin gerçek potansiyelini tam anlamıyla ortaya çıkarması açısından kritik bir öncelik oluşturduğu anlaşılmaktadır.`,
      `${b.ort} puanlık denetim ortalaması, ${b.ad} biriminin misafir deneyimi yönetiminde doğru bir stratejik yönelim içinde olduğunu ve temel hizmet standartlarını büyük ölçüde hayata geçirebildiğini göstermekte; ancak ${b.sayi} denetim verisi bütüncül biçimde değerlendirildiğinde, mükemmel kategorisine geçişi sağlayacak o kritik mesafeyi kapatmak için hizmet süreçlerinin daha ince ayrıntılarına odaklanılması, misafir geri bildirimlerinin operasyonel kararlara daha sistematik biçimde entegre edilmesi ve ekip içi kalite bilincinin her kademede güçlendirilmesi gerektiği açıkça ortaya çıkmaktadır.`,
      `${b.sayi} bağımsız denetim sürecinde ${b.ort} puana ulaşan ${b.ad} birimi, konaklama hizmetlerinde aranan güvenilirlik, özen ve tutarlılık kriterlerini genel olarak yerine getirmekte ve misafir beklentilerini karşılama konusunda sektörün ortalama performansının üzerinde bir tablo sergilemekte; bununla birlikte, gerçek anlamda fark yaratan ve misafir sadakatini pekiştiren o üst düzey deneyimi sunabilmek için ekibin belirli hizmet temas noktalarında daha yüksek bir performans çıtası belirlemesi ve standart prosedürlere bağlılığı artırması gerekmektedir.`,
      `${b.ad} ekibinin ${b.sayi} denetimde sergilediği ${b.ort} puanlık performans, sektörün ortalama beklentilerinin üzerinde seyretmekte ve misafir odaklı hizmet anlayışının ekip içinde karşılık bulduğunu göstermekte; ancak bu tablonun kalıcı hâle gelmesi ve üst segmente taşınması için standart operasyon prosedürlerinin daha tutarlı biçimde uygulanması, personelin güçlü yönlerinin sistematik eğitim programlarıyla pekiştirilmesi ve zayıf kalan alanlara yönelik hedefli iyileştirme aksiyonlarının ivedilikle hayata geçirilmesi kritik bir öncelik olarak öne çıkmaktadır.`,
      `${b.ort} puanlık ortalama, ${b.ad} biriminin konaklama kalitesi açısından tatmin edici bir düzeyde faaliyet gösterdiğini ortaya koymakta; ${b.sayi} denetim verisi, ekibin güçlü yönlerini korurken belirli temas noktalarında misafir deneyimini daha da zenginleştirebilecek kapasiteye sahip olduğuna işaret etmekte ve bu kapasitenin doğru yönetim desteği, sistematik süreç iyileştirmeleri ve hedefli personel gelişim programlarıyla kısa sürede somut performans artışına dönüştürülebileceğini güçlü biçimde düşündürmektedir.`,
      `${b.ad} birimi, ${b.sayi} denetim boyunca ${b.ort} puanlık bir ortalama yakalayarak otel genelindeki kalite standartlarına uyum sağladığını kanıtlamış ve misafir memnuniyetini öncelikli bir hedef olarak benimsediğini yansıtmış olmakla birlikte; denetim bulgularının bütüncül bir perspektiften değerlendirilmesi, süreç optimizasyonu ve misafir geri bildirim mekanizmalarının güçlendirilmesi alanlarında yapılacak stratejik yatırımların birimin performans ortalamasını anlamlı ve kalıcı biçimde yukarı taşıyacağını açıkça ortaya koymaktadır.`,
      `${b.sayi} ölçüm noktasında ${b.ort} puana ulaşan ${b.ad} birimi, konaklama sektörünün rekabetçi ortamında kabul edilebilir bir performans profili sergilemekte; ancak bu profilin sürdürülebilir bir rekabet avantajına dönüşmesi için hizmet süreçlerinin daha ince ayrıntılarına odaklanılması, misafir geri bildirimlerinin sistematik biçimde operasyona yansıtılması ve ekip içi kalite kültürünün her kademede güçlendirilmesi gerekmekte; bu adımların atılması durumunda birimin kısa vadede üst performans bandına geçme potansiyelinin son derece yüksek olduğu değerlendirilmektedir.`,
      `${b.ort} puanlık denetim ortalamasıyla ${b.ad} birimi, misafir deneyiminin temel bileşenlerini büyük ölçüde karşılayan ve sektörün genel beklentileriyle örtüşen bir operasyonel yapıya sahip olduğunu ortaya koymakta; bununla birlikte ${b.sayi} denetim verisi, birimin mevcut performans tavanını kırarak mükemmellik kategorisine adım atabilmesi için hizmet kalitesini etkileyen kritik değişkenlerin daha sistematik biçimde yönetilmesi ve kalite güvence süreçlerinin operasyonun her katmanına daha derinlemesine entegre edilmesi gerektiğini açıkça ortaya koymaktadır.`,
      `${b.ad} ekibinin ${b.sayi} denetim sürecinde sergilediği ${b.ort} puanlık performans; birimin misafir memnuniyeti yönetiminde sağlam bir temel kurduğunu, temel hizmet standartlarını karşılama konusunda tutarlı bir çaba gösterdiğini ve kalite bilincinin ekip içinde belirli ölçüde yerleştiğini ortaya koymakta; ancak bu temelin gerçek bir rekabet avantajına dönüşmesi için operasyonel süreçlerin daha ince ayrıntılarına odaklanılması ve misafir beklentilerini yalnızca karşılamaktan öteye geçerek aşmayı hedefleyen proaktif bir hizmet yaklaşımının benimsenmesi gerekmektedir.`,
      `${b.sayi} bağımsız denetimin ortalaması olan ${b.ort} puan, ${b.ad} biriminin konaklama hizmetlerinde kabul edilebilir kalite eşiğini aştığını ve misafir odaklı operasyonel anlayışın ekip içinde belirli ölçüde karşılık bulduğunu göstermekte; ancak bu sonuç aynı zamanda birimin henüz tam potansiyelini ortaya koyamadığını ve doğru stratejik yönlendirme ile hedefli iyileştirme aksiyonları sayesinde çok daha yüksek performans bantlarına ulaşabileceğini de açıkça ortaya koymaktadır.`
    ],

    "Geliştirilmeli": [
      `${b.ad} birimi, ${b.sayi} sistematik denetim sürecinde elde ettiği ${b.ort} puanlık ortalama performansıyla konaklama sektörünün beklenen kalite standartlarının belirgin biçimde altında kaldığını ortaya koymuş; denetim bulgularının derinlemesine analizi, bu durumun yalnızca bireysel performans farklılıklarından değil, standart operasyon prosedürlerinin yetersiz uygulanması, personel yetkinlik boşlukları ve kalite güvence mekanizmalarının etkin işlememesi gibi yapısal sorunların bir bileşiminden kaynaklandığını güçlü biçimde düşündürmektedir.`,
      `${b.ort} puanlık denetim ortalaması, ${b.ad} biriminde misafir deneyiminin sistematik biçimde olumsuz etkilendiğine ve mevcut operasyonel yapının konaklama sektörünün temel kalite gerekliliklerini karşılamakta ciddi güçlük çektiğine işaret etmekte; ${b.sayi} denetim verisi bütüncül biçimde değerlendirildiğinde, bu tablonun kısa vadeli yamalarla değil; süreç yeniden tasarımı, hedefli personel gelişim programları ve güçlendirilmiş denetim mekanizmalarını kapsayan kapsamlı bir iyileştirme stratejisiyle aşılabileceği anlaşılmaktadır.`,
      `${b.sayi} bağımsız denetim sürecinde ${b.ort} puana gerileyen ${b.ad} birimi, konaklama hizmetlerinin temel kalite kriterlerini karşılama konusunda ciddi güçlükler yaşadığını ve misafir beklentilerini karşılama kapasitesinin mevcut operasyonel koşullar altında yetersiz kaldığını açıkça ortaya koymuş; bu tablo, birim yöneticisi ve üst yönetimin iş birliğiyle acil bir durum değerlendirmesi yapılmasını, kök neden analizinin tamamlanmasını ve somut iyileştirme hedefleri içeren bir aksiyon planının ivedilikle hayata geçirilmesini zorunlu kılmaktadır.`,
      `${b.ad} ekibinin ${b.sayi} denetimde sergilediği ${b.ort} puanlık performans, sektörün kabul edilebilir kalite eşiğinin altında seyretmekte ve misafir memnuniyetini riske atan operasyonel aksaklıkların sistematik bir nitelik kazandığına işaret etmekte; denetim bulgularının bütüncül değerlendirmesi, bu durumun personel motivasyonu, süreç standardizasyonu ve liderlik etkinliği gibi çok boyutlu faktörlerden beslendiğini ortaya koymakta ve kapsamlı bir kurumsal iyileştirme müdahalesinin kaçınılmaz olduğunu vurgulamaktadır.`,
      `${b.ort} puanlık ortalama, ${b.ad} biriminin konaklama kalitesi açısından yetersiz bir düzeyde faaliyet gösterdiğini ve misafir deneyimini olumsuz etkileyen kronik sorunların varlığını gözler önüne sermekte; ${b.sayi} denetim verisi incelendiğinde, bu sorunların yalnızca yüzeysel müdahalelerle çözülemeyeceği, aksine hizmet süreçlerinin köklü biçimde yeniden yapılandırılmasını, personel yetkinliklerinin sistematik eğitimlerle güçlendirilmesini ve kalite güvence mekanizmalarının operasyonun her katmanına entegre edilmesini gerektirdiği anlaşılmaktadır.`,
      `${b.ad} birimi, ${b.sayi} denetim boyunca ${b.ort} puanlık bir ortalama sergileyerek iyileştirme gerektiren kategoride yer almakta; bu sonuç, birimin mevcut operasyonel yapısının misafir beklentilerini karşılamaktan uzak olduğunu ve hizmet kalitesini etkileyen temel değişkenlerin — personel eğitimi, süreç standardizasyonu, denetim sıklığı ve liderlik desteği — bütüncül bir perspektiften ele alınarak sistematik biçimde iyileştirilmesi gerektiğini açıkça ortaya koymaktadır.`,
      `${b.sayi} ölçüm noktasında ${b.ort} puana gerileyen ${b.ad} birimi, konaklama sektörünün rekabetçi ortamında sürdürülemez bir performans profili sergilemekte; denetim bulgularının derinlemesine analizi, bu tablonun misafir memnuniyetini doğrudan tehdit ettiğini, otel itibarına olumsuz yansıma riskini artırdığını ve birim yöneticisinin doğrudan sorumluluğunda kapsamlı bir iyileştirme programının hayata geçirilmesini zorunlu kıldığını ortaya koymaktadır.`,
      `${b.ort} puanlık denetim ortalamasıyla ${b.ad} birimi, misafir deneyiminin kritik bileşenlerini karşılamakta yetersiz kaldığını ve operasyonel süreçlerde yapısal sorunların varlığını açıkça ortaya koymakta; ${b.sayi} denetim verisi, bu sorunların personel farkındalığı, süreç disiplini ve kalite güvence altyapısı alanlarında yoğunlaştığını düşündürmekte ve kapsamlı bir kurumsal müdahale olmaksızın mevcut tablonun iyileşmeyeceğini güçlü biçimde vurgulamaktadır.`,
      `${b.ad} ekibinin ${b.sayi} denetim sürecinde sergilediği ${b.ort} puanlık performans; kalite güvence sisteminin bu birimde etkin biçimde işlemediğini, misafir odaklı hizmet anlayışının operasyonel gerçekliğe yeterince yansımadığını ve standart prosedürlere uyumun sistematik biçimde takip edilmediğini gösteren çok boyutlu bir tablo ortaya koymakta; bu durumun düzeltilmesi için birim yöneticisi liderliğinde, üst yönetimin aktif desteğiyle ve net KPI'lara bağlı bir iyileştirme planının ivedilikle uygulamaya konulması gerekmektedir.`,
      `${b.sayi} bağımsız denetimin ortalaması olan ${b.ort} puan, ${b.ad} biriminin konaklama hizmetlerinde beklenen kalite standartlarını karşılamaktan uzak olduğunu ve misafir deneyimini olumsuz etkileyen sistematik aksaklıkların varlığını kanıtlamakta; bu tablo, birimin kısa vadede acil iyileştirme aksiyonlarına, orta vadede ise köklü bir süreç ve insan kaynakları yeniden yapılanmasına ihtiyaç duyduğunu açıkça ortaya koymaktadır.`
    ],

    "Kritik": [
      `${b.ad} birimi, ${b.sayi} kapsamlı denetim sürecinde yalnızca ${b.ort} puanlık son derece düşük bir ortalama performans sergileyerek konaklama sektörünün asgari kalite gerekliliklerini dahi karşılayamadığını açıkça ortaya koymuş; denetim bulgularının bütüncül değerlendirmesi, bu kritik tablonun misafir deneyimini doğrudan ve ağır biçimde tehdit ettiğini, otel itibarına telafi edilmesi güç zararlar verebileceğini ve üst yönetimin doğrudan müdahalesini gerektiren acil bir kurumsal kriz niteliği taşıdığını tartışmaya yer bırakmayacak şekilde ortaya koymaktadır.`,
      `${b.ort} puanlık kritik denetim ortalaması, ${b.ad} biriminde operasyonel süreçlerin işlevsiz kaldığını, kalite güvence mekanizmalarının etkin biçimde çalışmadığını ve misafir odaklı hizmet anlayışının günlük operasyona yansımadığını gösteren son derece ciddi bir tablo ortaya koymakta; ${b.sayi} denetim verisi incelendiğinde, bu durumun yalnızca bireysel performans sorunlarından değil, liderlik etkinliği, süreç tasarımı ve kurumsal kalite kültürü gibi temel alanlardaki köklü yapısal sorunlardan beslendiği anlaşılmaktadır.`,
      `${b.sayi} bağımsız denetim sürecinde yalnızca ${b.ort} puana ulaşabilen ${b.ad} birimi, konaklama hizmetlerinin en temel kalite kriterlerini karşılamakta derin güçlükler yaşadığını ve misafir beklentilerini sistematik biçimde karşılayamadığını açıkça ortaya koymuş; bu kritik tablo, birimin mevcut operasyonel yapısının sürdürülemez olduğunu ve kapsamlı bir kurtarma planı, yoğun personel yeniden eğitimi ve köklü süreç yeniden yapılanması olmaksızın misafir memnuniyetini tehdit etmeye devam edeceğini güçlü biçimde vurgulamaktadır.`,
      `${b.ad} ekibinin ${b.sayi} denetimde sergilediği ${b.ort} puanlık performans, konaklama sektörünün kabul edilemez bulduğu bir kalite düzeyine karşılık gelmekte ve misafir deneyiminin her boyutunda ciddi aksaklıkların yaşandığına işaret etmekte; denetim bulgularının derinlemesine analizi, bu tablonun personel yetkinlik eksiklikleri, süreç standardizasyonu yetersizlikleri, denetim mekanizmalarının işlevsizliği ve liderlik boşlukları gibi çok katmanlı ve birbirini besleyen yapısal sorunların bir bileşiminden kaynaklandığını ortaya koymaktadır.`,
      `${b.ort} puanlık ortalama, ${b.ad} biriminin konaklama kalitesi açısından kabul edilemez bir düzeyde faaliyet gösterdiğini ve misafir deneyimini her temas noktasında olumsuz etkileyen kronik ve sistematik sorunların varlığını gözler önüne sermekte; ${b.sayi} denetim verisi, bu sorunların yüzeysel müdahalelerle çözülemeyeceğini, aksine birim yöneticisinin görevden alınması da dahil olmak üzere tüm seçeneklerin masaya yatırıldığı kapsamlı bir kurumsal yeniden yapılanma sürecini zorunlu kıldığını açıkça ortaya koymaktadır.`,
      `${b.ad} birimi, ${b.sayi} denetim boyunca ${b.ort} puanlık kritik bir ortalama sergileyerek otel genelindeki en düşük performanslı birimler arasında yer almakta ve bu sonuç; misafir memnuniyetini, otel itibarını ve kurumsal kalite standartlarını aynı anda tehdit eden çok boyutlu bir operasyonel kriz olarak değerlendirilmeli, üst yönetimin doğrudan gözetiminde ve net zaman çizelgelerine bağlı acil aksiyon planlarıyla ivedilikle müdahale edilmelidir.`,
      `${b.sayi} ölçüm noktasında yalnızca ${b.ort} puana ulaşabilen ${b.ad} birimi, konaklama sektörünün asgari kalite eşiklerinin çok altında seyretmekte ve bu kritik tablo; personel yetkinliklerinin acilen yeniden değerlendirilmesini, süreç altyapısının köklü biçimde yeniden tasarlanmasını, günlük denetim protokollerinin derhal uygulamaya konulmasını ve gerekirse dış danışman desteğiyle kapsamlı bir kurumsal dönüşüm programının başlatılmasını zorunlu kılmaktadır.`,
      `${b.ort} puanlık denetim ortalamasıyla ${b.ad} birimi, misafir deneyiminin kritik bileşenlerini sistematik biçimde karşılayamadığını ve operasyonel süreçlerin temel kalite gerekliliklerini bile yerine getiremez hâle geldiğini açıkça ortaya koymakta; ${b.sayi} denetim verisi, bu tablonun yalnızca birimin değil, tüm otelin kalite algısını ve rekabet gücünü olumsuz etkileme potansiyeli taşıdığını ve acil kurumsal müdahale olmaksızın daha da kötüleşme riskinin yüksek olduğunu güçlü biçimde vurgulamaktadır.`,
      `${b.ad} ekibinin ${b.sayi} denetim sürecinde sergilediği ${b.ort} puanlık performans; kalite güvence sisteminin bu birimde tamamen işlevsiz kaldığını, misafir odaklı hizmet anlayışının operasyonel gerçekliğe hiçbir şekilde yansımadığını ve standart prosedürlere uyumun sistematik biçimde görmezden gelindiğini gösteren son derece endişe verici bir tablo ortaya koymakta; bu durumun düzeltilmesi için birim yöneticisi değişikliği, zorunlu yeniden eğitim programı ve günlük performans takip mekanizması gibi radikal aksiyonların ivedilikle hayata geçirilmesi gerekmektedir.`,
      `${b.sayi} bağımsız denetimin ortalaması olan ${b.ort} puan, ${b.ad} biriminin konaklama hizmetlerinde kabul edilemez bir kalite düzeyinde faaliyet gösterdiğini ve bu durumun misafir memnuniyetini, otel itibarını ve kurumsal sürdürülebilirliği eş zamanlı olarak tehdit ettiğini kanıtlamakta; söz konusu tablo, birimin kısa vadede acil kriz yönetimi aksiyonlarına, orta vadede köklü bir insan kaynakları ve süreç yeniden yapılanmasına ve uzun vadede güçlü bir kalite kültürü inşasına ihtiyaç duyduğunu tartışmaya yer bırakmayacak biçimde ortaya koymaktadır.`
    ]
  };

  const tutarlilikYorumlari = {
    tutarli: [
      `${b.min} ile ${b.max} arasında seyreden ve yalnızca ${aralik} puanlık dar bir varyasyona karşılık gelen puan aralığı, ${b.ad} biriminin konaklama hizmetlerinde operasyonel tutarlılığı başarıyla kurduğunu ve bu tutarlılığı denetimden denetime, vardiyadan vardiyaya istikrarlı biçimde koruyabildiğini kanıtlamakta; bu dar aralık, standart prosedürlerin ekip içinde gerçek anlamda içselleştirildiğinin ve günlük hizmet akışına eksiksiz yansıtıldığının son derece değerli bir göstergesi olarak öne çıkmaktadır.`,
      `Denetimler arasındaki yalnızca ${aralik} puanlık fark, ${b.ad} biriminin kalite çıtasını her koşulda aynı yükseklikte tutabildiğini ve misafir deneyimini etkileyen kritik değişkenleri sistematik biçimde yönetme kapasitesine sahip olduğunu ortaya koymakta; bu tutarlılık, konaklama sektöründe gerçek anlamda fark yaratan ve misafir sadakatini pekiştiren en kritik operasyonel yetkinliklerden biri olarak değerlendirilmelidir.`,
      `${b.min}–${b.max} arasındaki ${aralik} puanlık dar puan aralığı, ${b.ad} biriminde kalite yönetiminin bireysel çabalara değil, sistematik süreçlere ve güçlü bir ekip kültürüne dayandığını ortaya koymakta; bu tutarlılık, birimin yoğun sezon baskısı veya personel değişimleri gibi zorlu koşullarda dahi kalite standartlarını koruyabildiğine dair güçlü bir sinyal vermektedir.`,
      `${aralik} puanlık son derece dar puan varyasyonu, ${b.ad} ekibinin konaklama hizmetlerinde tutarlılığı bilinçli bir operasyonel tercih ve kurumsal bir değer olarak benimsediğini göstermekte; standart operasyon prosedürlerine sıkı bağlılığın, ekip içi güçlü iletişimin ve kalite güvence mekanizmalarının günlük operasyona gerçek anlamda entegre edildiğinin somut ve ölçülebilir bir kanıtı olarak kayıtlara geçmektedir.`,
      `${b.min} ile ${b.max} arasındaki ${aralik} puanlık dar aralık, ${b.ad} biriminin misafir deneyimini her temas noktasında öngörülebilir ve yüksek kalitede tutma kapasitesine sahip olduğunu kanıtlamakta; bu öngörülebilirlik, misafir güvenini inşa eden ve tekrar ziyaret oranlarını artıran en temel operasyonel yetkinliklerden biri olarak değerlendirilmeli ve kurumsal düzeyde takdirle karşılanmalıdır.`
    ],
    dalgali: [
      `Bununla birlikte, ${b.min} ile ${b.max} arasındaki ${aralik} puanlık son derece geniş puan aralığı ciddi endişe verici bir tablo ortaya koymakta; bu dalgalanma, ${b.ad} biriminin kalite çıtasını denetimden denetime istikrarlı biçimde koruyamadığını, standart prosedürlerin uygulanmasında tutarsızlıkların yaşandığını ve misafir deneyiminin öngörülemez hâle geldiğini güçlü biçimde düşündürmekte; bu durumun kök nedenlerinin acilen araştırılması ve sistematik iyileştirme aksiyonlarının hayata geçirilmesi gerekmektedir.`,
      `${aralik} puanlık geniş puan varyasyonu, ${b.ad} biriminde kalite yönetiminin sistematik bir yapıya kavuşturulamadığını ve hizmet kalitesinin bireysel performans farklılıklarına ya da denetim döneminin özelliklerine bağlı olarak önemli ölçüde değiştiğini ortaya koymakta; bu tutarsızlık, misafir güvenini zedeleme ve tekrar ziyaret oranlarını olumsuz etkileme potansiyeli taşıyan kritik bir operasyonel risk olarak değerlendirilmeli ve standart prosedürlerin güçlendirilmesiyle ivedilikle giderilmelidir.`,
      `${b.min}–${b.max} arasındaki ${aralik} puanlık geniş aralık, ${b.ad} biriminin potansiyelini tutarlı biçimde ortaya koyamadığını ve hizmet kalitesinin belirli koşullarda kabul edilemez düzeylere gerilediğini gözler önüne sermekte; bu dalgalanmanın kaynağında personel yetkinlik farklılıkları, vardiya yönetimi sorunları veya denetim mekanizmalarının yetersizliği gibi faktörlerin yattığı değerlendirilmekte ve bu faktörlerin sistematik biçimde ele alınması için kapsamlı bir kök neden analizi yapılması önerilmektedir.`,
      `En düşük ${b.min} ile en yüksek ${b.max} puan arasındaki ${aralik} puanlık makas, ${b.ad} biriminde kalite standartlarının tüm koşullarda eşit biçimde uygulanamadığını ve misafir deneyiminin öngörülemeyen dalgalanmalar sergilediğini ortaya koymakta; bu tablo, birimin güçlü performans sergileme kapasitesine sahip olduğunu ancak bu kapasiteyi tutarlı biçimde hayata geçiremediğini göstermekte ve standart prosedürlerin güçlendirilmesi ile personel eğitiminin yoğunlaştırılması yoluyla bu açığın kapatılabileceğine işaret etmektedir.`,
      `${aralik} puanlık geniş puan varyasyonu, ${b.ad} biriminde kalite güvence sisteminin her koşulda etkin biçimde çalışmadığını ve hizmet standartlarının belirli dönemlerde ciddi biçimde düştüğünü kanıtlamakta; bu tutarsızlık, yalnızca denetim puanlarını değil, misafir memnuniyetini ve otelin rekabet gücünü olumsuz etkileme potansiyeli taşıyan sistemik bir risk olarak değerlendirilmeli ve acil iyileştirme aksiyonlarıyla giderilmelidir.`
    ],
    normal: [
      `${b.min}–${b.max} arasındaki ${aralik} puanlık puan aralığı kabul edilebilir sınırlar içinde kalmakla birlikte, bu varyasyonun tamamen ortadan kaldırılması ve birimin her denetimde benzer yüksek performans sergilemesi için standart operasyon prosedürlerinin güçlendirilmesi ve kalite güvence mekanizmalarının daha sık devreye alınması uzun vadede anlamlı bir performans artışı sağlayacaktır.`,
      `${aralik} puanlık puan varyasyonu büyük bir sorun teşkil etmemekle birlikte, ${b.ad} biriminin zaman zaman beklentilerin altında kaldığını ve bu aralığı daraltmak için hizmet süreçlerinin daha ince ayrıntılarına odaklanılması ile misafir geri bildirimlerinin sistematik biçimde operasyona yansıtılması gerektiğini ortaya koymaktadır.`,
      `${b.min} ile ${b.max} arasındaki fark, birimin genel olarak doğru yolda ilerlediğini ancak tutarlılığı artırmak için ek çaba gösterilmesi gerektiğini düşündürmekte; bu aralığı daraltmak, birimin ortalama performansını da yukarı taşıyacak ve misafir deneyiminin öngörülebilirliğini artıracaktır.`,
      `${aralik} puanlık varyasyon orta düzeyde olup ${b.ad} biriminin belirli koşullarda beklentilerin altında kaldığını göstermekte; bu durumun üstesinden gelmek için vardiya yönetiminin güçlendirilmesi, personel performans takibinin sistematik hâle getirilmesi ve standart prosedürlere uyumun düzenli denetimlerle kontrol edilmesi önerilmektedir.`,
      `${b.min}–${b.max} arasındaki seyir, ${b.ad} biriminin genel olarak istikrarlı bir performans sergilediğini ancak belirli dönemlerde kalite çıtasını aynı yükseklikte tutmakta güçlük çektiğini ortaya koymakta; bu aralığı daraltmaya yönelik hedefli iyileştirme aksiyonları, birimin genel ortalama performansını anlamlı biçimde yukarı taşıyacak ve misafir memnuniyetine olumlu yansıyacaktır.`
    ]
  };

  const veriGucuYorumlari = {
    tek: [
      `Bununla birlikte, mevcut değerlendirmenin yalnızca tek bir denetim verisine dayandığı göz önünde bulundurulduğunda, bu sonucun kesin bir performans profili çizmekten ziyade ön nitelikte bir tablo sunduğu kabul edilmeli; birimin gerçek operasyonel kapasitesini güvenilir biçimde ortaya koyabilmek için en az 3-5 ek bağımsız denetimin gerçekleştirilmesi önerilmektedir.`,
      `Tek denetim verisiyle yapılan bu değerlendirmenin istatistiksel güvenilirlik açısından sınırlılıklar taşıdığı göz önünde bulundurulmalı; söz konusu sonucun bir başlangıç noktası olarak değerlendirilmesi ve daha sağlıklı bir analiz için denetim sıklığının artırılması gerekmektedir.`,
      `Bu değerlendirme tek bir denetim ölçümüne dayanmakta olup söz konusu sonucun birimin uzun vadeli performans eğilimini yansıtıp yansıtmadığı henüz netlik kazanmamıştır; birimin gerçek kalite profilini ortaya koyabilmek için ek denetim verilerine ihtiyaç duyulduğu açıktır.`,
      `Mevcut tek denetim verisi, birimin genel performans eğilimi hakkında ilk bir fikir vermekle birlikte, güvenilir bir kalite değerlendirmesi yapabilmek için en az 5-10 bağımsız denetim verisine ihtiyaç duyulmaktadır; bu nedenle mevcut sonucun kesin bir yargı olarak değil, ilerleyen dönemde zenginleştirilecek bir veri tabanının başlangıç noktası olarak ele alınması önerilmektedir.`,
      `Tek ölçüm noktasına dayanan bu değerlendirmenin sınırlılıkları göz önünde bulundurulduğunda, birimin gerçek operasyonel kapasitesini ortaya koyabilmek için denetim programının yoğunlaştırılması hem daha güvenilir sonuçlar üretecek hem de iyileştirme önceliklerinin doğru biçimde belirlenmesine olanak tanıyacaktır.`
    ],
    az: [
      `${b.sayi} denetimlik veri tabanı, birimin genel performans eğilimini anlamak için bir başlangıç zemini sunmakla birlikte, istatistiksel olarak anlamlı ve güvenilir sonuçlar üretebilmek için daha fazla ölçüm noktasına ihtiyaç duyulmaktadır; denetim sıklığının artırılması, birimin güçlü ve zayıf yönlerinin daha net biçimde ortaya çıkmasını sağlayacaktır.`,
      `${b.sayi} denetim, birimin performansı hakkında yönlendirici bir tablo ortaya koymakla birlikte, bu sonuçların kesin bir kalite profili olarak değerlendirilmesi için veri setinin genişletilmesi gerekmekte; ek denetimlerle elde edilecek zengin veri, hem trend analizini güçlendirecek hem de birimin gerçek operasyonel kapasitesini daha güvenilir biçimde yansıtacaktır.`,
      `${b.sayi} ölçümden elde edilen bu sonuçlar yönlendirici nitelikte olmakla birlikte, istatistiksel güvenilirlik açısından daha kapsamlı bir analiz için denetim sıklığının artırılması önerilmekte; özellikle sezonluk dalgalanmaları ve farklı operasyonel koşullar altındaki performans farklılıklarını ortaya koyabilmek için daha fazla veri noktasına ihtiyaç duyulmaktadır.`,
      `${b.sayi} denetimlik mevcut veri, birimin performans profilini genel hatlarıyla ortaya koymakta; ancak güvenilir kalite değerlendirmesi yapabilmek ve iyileştirme önceliklerini doğru biçimde belirleyebilmek için bu veri setinin en az 8-10 bağımsız denetimle zenginleştirilmesi gerekmektedir.`,
      `${b.sayi} veri noktası, birimin performansını anlamak için bir başlangıç sağlamakta; ancak istatistiksel güç kazanmak ve iyileştirme aksiyonlarını doğru önceliklerle planlamak adına denetim sayısının artırılması tavsiye edilmekte; bu yatırım, kalite yönetimi kararlarının sağlam bir veri temeline dayandırılmasını sağlayacaktır.`
    ],
    yeterli: [
      `${b.sayi} bağımsız denetimden elde edilen bu zengin veri seti, istatistiksel olarak anlamlı ve güvenilir bir değerlendirme zemini sunmakta; birimin performans profilini, güçlü ve zayıf yönlerini ve kalite eğilimini yüksek bir güvenilirlik düzeyinde ortaya koymakta ve bu değerlendirmenin sağlam bir veri temeline dayandığını tartışmaya yer bırakmayacak biçimde kanıtlamaktadır.`,
      `${b.sayi} bağımsız ölçüm, bu değerlendirmenin rastlantısal sonuçların ötesinde birimin gerçek operasyonel kapasitesini yansıttığını güvence altına almakta; söz konusu veri zenginliği, hem trend analizinin güvenilirliğini artırmakta hem de iyileştirme aksiyonlarının doğru önceliklerle planlanmasına olanak tanımaktadır.`,
      `${b.sayi} denetimden elde edilen bu bulgular, birimin sistematik performans eğilimini yüksek güvenilirlikle yansıtmakta ve değerlendirmenin istatistiksel açıdan sağlam bir zemine oturduğunu kanıtlamakta; bu veri zenginliği, birimin güçlü yönlerini pekiştirmeye ve zayıf alanlarını iyileştirmeye yönelik stratejik kararların güvenle alınmasına olanak tanımaktadır.`,
      `${b.sayi} ölçüm noktasına dayanan bu analiz, birimin operasyonel gerçekliğini kapsamlı biçimde yansıtmakta ve kalite değerlendirmesinin güvenilirliğini üst düzeye taşımakta; bu zengin veri seti, hem mevcut performans profilini net biçimde ortaya koymakta hem de gelecekteki iyileştirme stratejilerinin doğru bir veri temeline dayandırılmasını sağlamaktadır.`,
      `${b.sayi} denetimlik zengin veri seti, bu değerlendirmeye hem istatistiksel derinlik hem de operasyonel güvenilirlik kazandırmakta; birimin performans profilini ve kalite eğilimini kapsamlı biçimde ortaya koymakta ve kalite yönetimi açısından son derece değerli içgörüler sunarak stratejik karar alma süreçlerini güçlü bir veri temeline oturtmaktadır.`
    ]
  };

  const anaMetin = sec(anaYorumlar[s.ad]);
  const tutarlilikMetin = tutarli
    ? sec(tutarlilikYorumlari.tutarli)
    : dalgali
    ? sec(tutarlilikYorumlari.dalgali)
    : sec(tutarlilikYorumlari.normal);
  const veriMetin = b.sayi === 1
    ? sec(veriGucuYorumlari.tek)
        : b.sayi <= 3
    ? sec(veriGucuYorumlari.az)
    : sec(veriGucuYorumlari.yeterli);

  return `${anaMetin} ${tutarlilikMetin} ${veriMetin}`;
}

// ============================================================
// OTEL KARŞILAŞTIRMA GRAFİĞİ
// ============================================================
function otelKarsilastirmaRender(kayitlar) {
  const el = document.getElementById("otelKarsilastirmaGrafik");
  if (!el) return;

  if (kayitlar.length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Veri yok</div>`;
    return;
  }

  const otelMap = {};
  kayitlar.forEach(k => {
    const ad = k.otelAdi || "Bilinmeyen";
    if (!otelMap[ad]) otelMap[ad] = [];
    otelMap[ad].push({ puan: k.puan || 0, tarih: k.tarih || "" });
  });

  const otelAdlari = Object.keys(otelMap).sort();
  if (otelAdlari.length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Veri yok</div>`;
    return;
  }

  const renkler = ["#3b82f6","#22c55e","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#14b8a6"];

  el.innerHTML = otelAdlari.map((otelAd, otelIdx) => {
    const denetimler = otelMap[otelAd].sort((a,b) => {
      const ta = tarihISOCevir(a.tarih) || "";
      const tb = tarihISOCevir(b.tarih) || "";
      return ta.localeCompare(tb);
    });
    const renk    = renkler[otelIdx % renkler.length];
    const ort     = Math.round(denetimler.reduce((t,d) => t + d.puan, 0) / denetimler.length);
    const ortRenk = getRaporRenk(ort);

    return `
      <div style="margin-bottom:24px; background:#f8fafc; border-radius:12px;
                  padding:16px; border:1px solid #e2e8f0">
        <div style="display:flex; align-items:center; justify-content:space-between;
                    margin-bottom:14px; flex-wrap:wrap; gap:8px">
          <div style="display:flex; align-items:center; gap:10px">
            <div style="width:12px; height:12px; border-radius:50%;
                        background:${renk}; flex-shrink:0"></div>
            <strong style="font-size:14px; color:#1e293b">${otelAd}</strong>
            <span style="font-size:11px; color:#94a3b8">${denetimler.length} denetim</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px">
            <span style="font-size:12px; color:#64748b">Ortalama:</span>
            <span style="font-size:16px; font-weight:800; color:${ortRenk}">${ort}</span>
          </div>
        </div>
        <div style="display:flex; align-items:flex-end; gap:8px; height:120px;
                    border-bottom:2px solid #e2e8f0; padding-bottom:8px; overflow-x:auto">
          ${denetimler.map(d => {
            const barRenk = getRaporRenk(d.puan);
            const yuzde   = (d.puan / 100) * 100;
            return `
              <div style="display:flex; flex-direction:column; align-items:center; gap:4px;
                          flex-shrink:0; min-width:36px">
                <span style="font-size:10px; font-weight:700; color:${barRenk}">${d.puan}</span>
                <div style="width:28px; background:${barRenk}20; border-radius:4px 4px 0 0;
                            height:${Math.max(yuzde*1.0,4)}px; position:relative; cursor:pointer"
                     title="${d.tarih}: ${d.puan} puan">
                  <div style="position:absolute; bottom:0; left:0; right:0; height:100%;
                              background:${barRenk}; border-radius:4px 4px 0 0; opacity:0.85"></div>
                </div>
              </div>`;
          }).join("")}
        </div>
        <div style="display:flex; gap:8px; margin-top:6px; overflow-x:auto">
          ${denetimler.map(d => `
            <div style="flex-shrink:0; min-width:36px; font-size:9px;
                        color:#94a3b8; text-align:center">
              ${(d.tarih || "").split(".").slice(0,2).join(".")}
            </div>`).join("")}
        </div>
      </div>`;
  }).join("");
}

// ============================================================
// RADAR GRAFİĞİ
// ============================================================
function radarGrafikRender(kayitlar) {
  const el = document.getElementById("radarGrafik");
  if (!el) return;

  if (!kayitlar || kayitlar.length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Veri yok</div>`;
    return;
  }

  const secici    = document.getElementById("radarDenetimSec");
  const secilenId = secici?.value || kayitlar[kayitlar.length - 1]?.id;
  const k         = kayitlar.find(x => x.id === secilenId) || kayitlar[kayitlar.length - 1];

  if (!k || !k.birimPuanlari) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Bu denetimde birim verisi yok</div>`;
    return;
  }

  const birimler = Object.entries(k.birimPuanlari).map(([birimId, puan]) => {
    const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
    return { ad: birim?.birimAdi || birimId, puan };
  });

  if (birimler.length < 3) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Radar için en az 3 birim gerekli</div>`;
    return;
  }

  const n = birimler.length, cx = 200, cy = 200, r = 150;
  const levels = [20, 40, 60, 80, 100];

  function noktaHesapla(idx, deger, maks) {
    const aci     = (Math.PI * 2 * idx) / n - Math.PI / 2;
    const uzaklik = (deger / maks) * r;
    return { x: cx + uzaklik * Math.cos(aci), y: cy + uzaklik * Math.sin(aci) };
  }

  const izgaraHTML = levels.map(lvl => {
    const noktalar = birimler.map((_, i) => noktaHesapla(i, lvl, 100));
    const d = noktalar.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
    return `
      <path d="${d}" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      <text x="${cx + 4}" y="${cy - (lvl / 100) * r}" font-size="9" fill="#94a3b8">${lvl}</text>`;
  }).join("");

  const eksenHTML = birimler.map((_, i) => {
    const p = noktaHesapla(i, 100, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#e2e8f0" stroke-width="1"/>`;
  }).join("");

  const veriNoktalar = birimler.map((b, i) => noktaHesapla(i, b.puan, 100));
  const veriPath     = veriNoktalar.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const etiketHTML = birimler.map((b, i) => {
    const aci    = (Math.PI * 2 * i) / n - Math.PI / 2;
    const ex     = cx + (r + 28) * Math.cos(aci);
    const ey     = cy + (r + 28) * Math.sin(aci);
    const renk   = getRaporRenk(b.puan);
    const kisaAd = b.ad.length > 14 ? b.ad.substring(0, 13) + "…" : b.ad;
    return `
      <text x="${ex}" y="${ey}" text-anchor="middle" dominant-baseline="middle"
            font-size="10" font-weight="600" fill="#374151">${kisaAd}</text>
      <text x="${ex}" y="${ey + 13}" text-anchor="middle" dominant-baseline="middle"
            font-size="10" font-weight="800" fill="${renk}">${b.puan}</text>`;
  }).join("");

  const noktaHTML = veriNoktalar.map((p, i) => {
    const renk = getRaporRenk(birimler[i].puan);
    return `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${renk}" stroke="white" stroke-width="2"/>`;
  }).join("");

  el.innerHTML = `
    <svg viewBox="0 0 400 400" style="width:100%; max-width:420px; display:block; margin:0 auto">
      ${izgaraHTML}
      ${eksenHTML}
      <path d="${veriPath}" fill="#3b82f620" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round"/>
      ${noktaHTML}
      ${etiketHTML}
    </svg>`;
}

// ============================================================
// DENETÇİ PERFORMANS GRAFİĞİ
// ============================================================
function denetciPerformansRender(kayitlar) {
  const el = document.getElementById("denetciPerformansGrafik");
  if (!el) return;

  if (kayitlar.length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Veri yok</div>`;
    return;
  }

  const denetciMap = {};
  kayitlar.forEach(k => {
    const ad = k.denetciAd || k.denetci || "Bilinmeyen";
    if (!denetciMap[ad]) denetciMap[ad] = [];
    denetciMap[ad].push(k.puan || 0);
  });

  const denetciler = Object.entries(denetciMap)
    .map(([ad, puanlar]) => ({
      ad,
      ort:  Math.round(puanlar.reduce((a,b) => a+b, 0) / puanlar.length),
      sayi: puanlar.length,
      min:  Math.min(...puanlar),
      max:  Math.max(...puanlar)
    }))
    .sort((a,b) => b.ort - a.ort);

  el.innerHTML = denetciler.map((d, i) => {
    const renk  = getRaporRenk(d.ort);
    const bilgi = getRaporRenkBilgi(d.ort);
    return `
      <div style="display:flex; align-items:center; gap:14px;
                  padding:12px 0; border-bottom:1px solid #f1f5f9">
        <div style="width:28px; height:28px; border-radius:50%; background:${renk}20;
                    display:flex; align-items:center; justify-content:center;
                    font-size:12px; font-weight:800; color:${renk}; flex-shrink:0">
          ${i + 1}
        </div>
        <div style="flex:1; min-width:0">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px">
            <span style="font-size:13px; font-weight:600; color:#1e293b;
                         white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
                         max-width:160px" title="${d.ad}">${d.ad}</span>
            <span style="font-size:11px; color:#94a3b8; flex-shrink:0; margin-left:8px">
              ${d.sayi} denetim
            </span>
          </div>
          <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden">
            <div style="height:100%; width:${d.ort}%; background:${renk}; border-radius:4px;
                        transition:width 0.8s ease"></div>
          </div>
          <div style="display:flex; gap:12px; margin-top:5px">
            <span style="font-size:10px; color:#94a3b8">Min: <strong style="color:#ef4444">${d.min}</strong></span>
            <span style="font-size:10px; color:#94a3b8">Max: <strong style="color:#22c55e">${d.max}</strong></span>
          </div>
        </div>
        <div style="text-align:right; flex-shrink:0">
          <div style="font-size:22px; font-weight:800; color:${renk}; line-height:1">${d.ort}</div>
          <span style="font-size:10px; font-weight:700; background:${renk}15; color:${renk};
                       padding:2px 8px; border-radius:10px; display:inline-block; margin-top:3px">
            ${bilgi.etiket}
          </span>
        </div>
      </div>`;
  }).join("");
}

// ============================================================
// HEDEF vs GERÇEK GRAFİĞİ
// ============================================================
function hedefGercekRender(kayitlar) {
  const el = document.getElementById("hedefGercekGrafik");
  if (!el) return;

  const HEDEF = 90;
  if (kayitlar.length === 0) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">Veri yok</div>`;
    return;
  }

  const sirali  = [...kayitlar]
    .sort((a,b) => (tarihISOCevir(a.tarih)||"").localeCompare(tarihISOCevir(b.tarih)||""))
    .slice(-20);
  const ustunde = sirali.filter(k => (k.puan||0) >= HEDEF).length;
  const altinda = sirali.length - ustunde;
  const oran    = Math.round((ustunde / sirali.length) * 100);

  const ozetHTML = `
    <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap">
      ${[
        { label:"Hedefe Ulaşan", val:ustunde,  renk:"#22c55e", ikon:"✅" },
        { label:"Hedef Altı",    val:altinda,  renk:"#ef4444", ikon:"❌" },
        { label:"Başarı Oranı",  val:oran+"%", renk:"#3b82f6", ikon:"🎯" },
        { label:"Hedef Puan",    val:HEDEF,    renk:"#f59e0b", ikon:"🏆" },
      ].map(x => `
        <div style="flex:1; min-width:100px; background:${x.renk}10;
                    border:1px solid ${x.renk}30; border-radius:10px;
                    padding:12px; text-align:center">
          <div style="font-size:18px; margin-bottom:4px">${x.ikon}</div>
          <div style="font-size:20px; font-weight:800; color:${x.renk}">${x.val}</div>
          <div style="font-size:11px; color:#64748b; margin-top:2px">${x.label}</div>
        </div>`).join("")}
    </div>`;

  const barHTML = sirali.map(k => {
    const puan     = k.puan || 0;
    const sapma    = puan - HEDEF;
    const pozitif  = sapma >= 0;
    const renk     = pozitif ? "#22c55e" : "#ef4444";
    const genislik = Math.min(Math.abs(sapma) * 2, 100);
    return `
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px">
        <div style="width:90px; flex-shrink:0; text-align:right">
          <div style="font-size:10px; color:#94a3b8">
            ${(k.tarih||"").split(".").slice(0,2).join(".")}
          </div>
          <div style="font-size:10px; font-weight:600; color:#374151; white-space:nowrap;
                      overflow:hidden; text-overflow:ellipsis; max-width:90px">
            ${(k.otelAdi||"").substring(0,12)}${(k.otelAdi||"").length > 12 ? "…" : ""}
          </div>
        </div>
        <div style="flex:1; display:flex; align-items:center; height:24px">
          <div style="flex:1; display:flex; justify-content:flex-end;
                      height:100%; align-items:center">
            ${!pozitif ? `
              <div style="height:16px; width:${genislik}%; background:${renk};
                          border-radius:4px 0 0 4px; display:flex; align-items:center;
                          justify-content:flex-start; padding-left:4px">
                <span style="font-size:9px; font-weight:700; color:white">${sapma}</span>
              </div>` : ""}
          </div>
          <div style="width:2px; height:100%; background:#e2e8f0; flex-shrink:0"></div>
          <div style="flex:1; display:flex; justify-content:flex-start;
                      height:100%; align-items:center">
            ${pozitif ? `
              <div style="height:16px; width:${genislik}%; background:${renk};
                          border-radius:0 4px 4px 0; display:flex; align-items:center;
                          justify-content:flex-end; padding-right:4px">
                <span style="font-size:9px; font-weight:700; color:white">+${sapma}</span>
              </div>` : ""}
          </div>
        </div>
        <div style="width:36px; flex-shrink:0; text-align:center;
                    font-size:12px; font-weight:800; color:${renk}">${puan}</div>
      </div>`;
  }).join("");

  el.innerHTML = `
    ${ozetHTML}
    <div style="display:flex; align-items:center; justify-content:center;
                gap:8px; margin-bottom:12px">
      <div style="width:12px; height:12px; background:#ef4444; border-radius:2px"></div>
      <span style="font-size:11px; color:#64748b">Hedef Altı</span>
      <div style="width:2px; height:16px; background:#e2e8f0; margin:0 4px"></div>
      <div style="width:12px; height:12px; background:#22c55e; border-radius:2px"></div>
      <span style="font-size:11px; color:#64748b">Hedef Üstü (90+)</span>
    </div>
    ${barHTML}`;
}

// ============================================================
// SCATTER GRAFİĞİ
// ============================================================
function scatterGrafikRender(kayitlar) {
  const el = document.getElementById("scatterGrafik");
  if (!el) return;

  if (kayitlar.length < 2) {
    el.innerHTML = `<div style="text-align:center;color:#cbd5e1;font-size:14px;padding:32px 0">En az 2 denetim gerekli</div>`;
    return;
  }

  const sirali = [...kayitlar]
    .sort((a,b) => (tarihISOCevir(a.tarih)||"").localeCompare(tarihISOCevir(b.tarih)||""));

  const W = 500, H = 280, padL = 40, padR = 20, padT = 20, padB = 40;
  const grafW = W - padL - padR;
  const grafH = H - padT - padB;
  const n     = sirali.length;

  function xPos(i)    { return padL + (i / (n - 1)) * grafW; }
  function yPos(puan) { return padT + grafH - (puan / 100) * grafH; }

  const xOrt = (n - 1) / 2;
  const yOrt = sirali.reduce((t,k) => t + (k.puan||0), 0) / n;
  let pay = 0, payda = 0;
  sirali.forEach((k, i) => {
    pay   += (i - xOrt) * ((k.puan||0) - yOrt);
    payda += (i - xOrt) ** 2;
  });
  const egim      = payda !== 0 ? pay / payda : 0;
  const kesisme   = yOrt - egim * xOrt;
  const trendY0   = kesisme;
  const trendYn   = egim * (n - 1) + kesisme;
  const trendRenk = egim > 0 ? "#22c55e" : egim < 0 ? "#ef4444" : "#94a3b8";

  const izgaraHTML = [0, 25, 50, 75, 100].map(v => {
    const y = yPos(v);
    return `
      <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
            stroke="${v === 90 ? '#ef444440' : '#f1f5f9'}"
            stroke-width="${v === 90 ? 1.5 : 1}"
            stroke-dasharray="${v === 90 ? '4,3' : '0'}"/>
      <text x="${padL - 6}" y="${y}" text-anchor="end" dominant-baseline="middle"
            font-size="9" fill="#94a3b8">${v}</text>`;
  }).join("");

  const noktaHTML = sirali.map((k, i) => {
    const x    = xPos(i);
    const y    = yPos(k.puan || 0);
    const renk = getRaporRenk(k.puan || 0);
    return `
      <circle cx="${x}" cy="${y}" r="6" fill="${renk}" stroke="white"
              stroke-width="2" opacity="0.85" style="cursor:pointer">
        <title>${k.otelAdi||''} — ${k.tarih||''}: ${k.puan} puan</title>
      </circle>`;
  }).join("");

  const trendHTML = n >= 2 ? `
    <line x1="${xPos(0)}" y1="${yPos(trendY0)}"
          x2="${xPos(n-1)}" y2="${yPos(trendYn)}"
          stroke="${trendRenk}" stroke-width="2.5"
          stroke-dasharray="6,3" opacity="0.7"/>` : "";

  const adim = Math.max(1, Math.floor(n / 6));
  const xEtiketHTML = sirali
    .filter((_, i) => i % adim === 0 || i === n - 1)
    .map(k => {
      const i = sirali.indexOf(k);
      return `
        <text x="${xPos(i)}" y="${H - padB + 14}" text-anchor="middle"
              font-size="9" fill="#94a3b8">
          ${(k.tarih||"").split(".").slice(0,2).join(".")}
        </text>`;
    }).join("");

  const trendYon  = egim > 0.5 ? "📈 Yükseliş trendi" : egim < -0.5 ? "📉 Düşüş trendi" : "➡️ Sabit seyir";
  const trendAcik = egim > 0.5
    ? "Denetim puanları zaman içinde artış göstermektedir."
    : egim < -0.5
    ? "Denetim puanları zaman içinde düşüş göstermektedir."
    : "Denetim puanları görece sabit seyretmektedir.";

  el.innerHTML = `
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px; flex-wrap:wrap">
      <div style="display:flex; align-items:center; gap:6px">
        <div style="width:20px; height:3px; background:${trendRenk}; border-radius:2px"></div>
        <span style="font-size:12px; color:#64748b">Trend Çizgisi</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px">
        <div style="width:20px; height:2px; border-top:2px dashed #ef4444"></div>
        <span style="font-size:12px; color:#64748b">Hedef (90)</span>
      </div>
      <div style="margin-left:auto; font-size:13px; font-weight:700; color:${trendRenk}">
        ${trendYon}
      </div>
    </div>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%; display:block">
      ${izgaraHTML}
      <text x="${W - padR}" y="${yPos(90) - 4}" text-anchor="end"
            font-size="9" fill="#ef4444" font-weight="700">Hedef 90</text>
      ${trendHTML}
      ${noktaHTML}
      ${xEtiketHTML}
    </svg>
    <p style="font-size:12px; color:#64748b; margin-top:10px; line-height:1.6; text-align:center">
      ${trendAcik} Toplam <strong>${n}</strong> denetim analiz edildi.
      Trend eğimi: <strong style="color:${trendRenk}">
        ${egim > 0 ? "+" : ""}${egim.toFixed(2)}
      </strong> puan/denetim.
    </p>`;
}

// ============================================================
// RADAR SEÇİCİ
// ============================================================
function radarSeciciDoldur(kayitlar) {
  const sec = document.getElementById("radarDenetimSec");
  if (!sec) return;
  const mevcutDeger = sec.value;
  sec.innerHTML = [...kayitlar].reverse().map(k =>
    `<option value="${k.id}" ${k.id === mevcutDeger ? "selected" : ""}>
      ${k.tarih || "—"} — ${k.otelAdi || "—"}
    </option>`
  ).join("");
}

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================
function getRaporRenk(puan) {
  if (puan < 50) return "#ef4444";
  if (puan < 75) return "#f59e0b";
  if (puan < 90) return "#3b82f6";
  return "#22c55e";
}

function getRaporRenkBilgi(puan) {
  if (puan < 50) return { etiket:"Kritik" };
  if (puan < 75) return { etiket:"Geliştirilmeli" };
  if (puan < 90) return { etiket:"İyi" };
  return           { etiket:"Mükemmel" };
}

function tarihISOCevir(tarih) {
  if (!tarih) return null;
  const p = tarih.split(".");
  if (p.length === 3) return `${p[2]}-${p[1]}-${p[0]}`;
  return tarih;
}

function aySecenekleriOlustur(kayitlar) {
  const aylar = new Set();
  kayitlar.forEach(k => {
    const iso = tarihISOCevir(k.tarih);
    if (!iso) return;
    const d = new Date(iso);
    if (isNaN(d)) return;
    aylar.add(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);
  });

  const ayAdlari = [
    "","Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
    "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
  ];

  return [...aylar].sort().reverse().map(a => {
    const [yil, ay] = a.split("-");
    return `<option value="${a}">${ayAdlari[parseInt(ay)]} ${yil}</option>`;
  }).join("");
}



// ============================================================
// PROFESYONEL PDF RAPORU — Dinamik sayfa, jsPDF ile
// Her birim ayrı sayfa(lar), uzun yorum + fotoğraflar dahil
// ============================================================
async function profesyonelPDFIndir() {
  if (typeof window.jspdf === "undefined") {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // ── Noto Sans fontunu CDN'den yükle (Türkçe dahil tam Unicode desteği) ──
  // dejavu-font.js gerektirmez; her ortamda sorunsuz çalışır
  async function _fontBase64(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const buf = await res.arrayBuffer();
      let bin = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
      return btoa(bin);
    } catch(e) { return null; }
  }

  // Noto Sans — Google Fonts GitHub CDN üzerinden (TTF, Türkçe + Latin tam destek)
  const [notoReg, notoBold] = await Promise.all([
    _fontBase64("https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf"),
    _fontBase64("https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Bold.ttf")
  ]);

  const FONTNAME = "NotoSans";

  if (notoReg) {
    doc.addFileToVFS("NotoSans-Regular.ttf", notoReg);
    doc.addFont("NotoSans-Regular.ttf", FONTNAME, "normal");
  }
  if (notoBold) {
    doc.addFileToVFS("NotoSans-Bold.ttf", notoBold);
    doc.addFont("NotoSans-Bold.ttf", FONTNAME, "bold");
  }

  // Font yüklenemezse Helvetica fallback (ASCII yeterli değil ama en azından hata vermez)
  const _fontYuklendi = !!(notoReg && notoBold);
  if (!_fontYuklendi) {
    console.warn("[PDF] Noto Sans yüklenemedi, Helvetica kullanılıyor (Türkçe karakterler görünmeyebilir)");
  }

  const W = 210, H = 297;
  const MARGIN = 14;
  const ICALAN = W - MARGIN * 2;   // 182 mm
  const ALTBOSLIK = 20;            // footer için bırakılan boşluk

  const kayitlar = (typeof denetimleriGetirSync === "function")
    ? denetimleriGetirSync()
    : (() => { try { const h = localStorage.getItem("denetim_kayitlar"); return h ? JSON.parse(h) : []; } catch(e){ return []; } })();

  const aktif    = (typeof aktifKullaniciyiGetir === "function") ? aktifKullaniciyiGetir() || {} : {};
  const simdi    = new Date();
  const tarihStr = `${simdi.getDate().toString().padStart(2,"0")}.${(simdi.getMonth()+1).toString().padStart(2,"0")}.${simdi.getFullYear()}`;
  const saatStr  = `${simdi.getHours().toString().padStart(2,"0")}:${simdi.getMinutes().toString().padStart(2,"0")}`;

  const LACIVERT = [30, 58, 95];
  const MAVI     = [45, 89, 134];
  const ALTIN    = [245, 158, 11];
  const BEYAZ    = [255, 255, 255];
  const ACIK     = [248, 250, 252];
  const KENAR    = [226, 232, 240];

  let sayfaNo = 0;  // toplam sayfa sayısı (footer için)

  // ── Dinamik sayfa yönetimi ──
  // Y pozisyonu ve sayfa takibi için yardımcılar
  let _gy = 0;

  function yeniSayfa(baslikMetni, altBaslik) {
    sayfaNo++;
    if (sayfaNo > 1) doc.addPage();

    // Üst başlık bandı
    doc.setFillColor(...LACIVERT);
    doc.rect(0, 0, W, 36, "F");
    if (otelImgData) doc.addImage(otelImgData, "JPEG", MARGIN, 7, 16, 16);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...BEYAZ);
    doc.text(baslikMetni, otelImgData ? 33 : MARGIN, 15);
    if (altBaslik) {
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(180, 200, 220);
      doc.text(altBaslik, otelImgData ? 33 : MARGIN, 23);
    }
    doc.setFillColor(...ALTIN);
    doc.rect(0, 36, W, 1.5, "F");

    _gy = 44;
  }

  function footerCiz() {
    doc.setFillColor(...LACIVERT);
    doc.rect(0, H - 14, W, 14, "F");
    doc.setFillColor(...ALTIN);
    doc.rect(0, H - 14, 4, 14, "F");
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(180, 200, 220);
    doc.text("Otel Gizli Müşteri Denetim Sistemi — " + tarihStr, 10, H - 5.5);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setTextColor(...ALTIN);
    doc.text("Sayfa " + sayfaNo, W - 14, H - 5.5, { align: "right" });
  }

  // Sayfa doluysa yeni sayfa aç
  function sayfaKontrol(gerekliY, baslik, altBaslik) {
    if (_gy + gerekliY > H - ALTBOSLIK) {
      footerCiz();
      yeniSayfa(baslik || _aktifBaslik, altBaslik || _aktifAltBaslik);
    }
  }

  // Aktif başlık (sayfa açılırken tekrar kullanılır)
  let _aktifBaslik = "";
  let _aktifAltBaslik = "";

  function bolumBasligi(metin) {
    sayfaKontrol(18);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...LACIVERT);
    doc.text(metin, MARGIN, _gy);
    doc.setFillColor(...ALTIN);
    doc.rect(MARGIN, _gy + 2, Math.min(metin.length * 2.2, 60), 0.8, "F");
    _gy += 10;
  }

  // ── otel.jpg yükle ──
  let otelImgData = null;
  try {
    otelImgData = await new Promise((res) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const cv = document.createElement("canvas");
        cv.width = img.width; cv.height = img.height;
        cv.getContext("2d").drawImage(img, 0, 0);
        res(cv.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => res(null);
      img.src = "./otel.jpg?" + Date.now();
    });
  } catch(e) { otelImgData = null; }

  // ── Denetim fotoğraflarını base64'e çevir ──
  async function imgBase64(url) {
    if (!url) return null;
    if (url.startsWith("data:")) return url;
    try {
      return await new Promise((res) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const cv = document.createElement("canvas");
          cv.width = img.naturalWidth || 400;
          cv.height = img.naturalHeight || 300;
          cv.getContext("2d").drawImage(img, 0, 0);
          res(cv.toDataURL("image/jpeg", 0.75));
        };
        img.onerror = () => res(null);
        img.src = url;
      });
    } catch(e) { return null; }
  }

  // ── Renk yardımcısı ──
  function puanRenk(p) {
    if (p >= 90) return [34,197,94];
    if (p >= 75) return [59,130,246];
    if (p >= 50) return [245,158,11];
    return [239,68,68];
  }
  function puanEtiket(p) {
    if (p >= 90) return "Mükemmel";
    if (p >= 75) return "İyi";
    if (p >= 50) return "Geliştirilmeli";
    return "Kritik";
  }
  function seviyeEmoji(p) {
    if (p >= 90) return "★";
    if (p >= 75) return "✓";
    if (p >= 50) return "!";
    return "✕";
  }

  // ── Uzun metin satırlara böl ve yaz, gerekirse yeni sayfa ──
  function yazMetin(metin, x, fontSize, renk, maxW, baslik, altBaslik) {
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(...renk);
    const satirlar = doc.splitTextToSize(metin, maxW);
    const satirY = fontSize * 0.353 + 1.5; // mm cinsinden satır yüksekliği
    satirlar.forEach(satir => {
      sayfaKontrol(satirY + 2, baslik, altBaslik);
      doc.text(satir, x, _gy);
      _gy += satirY + 0.8;
    });
    _gy += 1;
  }

  // ─────────────────────────────────────────
  // SAYFA 1 — KAPAK
  // ─────────────────────────────────────────
  sayfaNo++;
  doc.setFillColor(...LACIVERT);
  doc.rect(0, 0, W, H, "F");
  doc.setFillColor(...MAVI);
  doc.rect(0, 0, W, 8, "F");

  if (otelImgData) {
    doc.addImage(otelImgData, "JPEG", 0, 0, W, H);
    doc.setFillColor(15, 25, 40);
    try { doc.setGState(new doc.GState({ opacity: 0.82 })); } catch(e) {}
    doc.rect(0, 0, W, H, "F");
    try { doc.setGState(new doc.GState({ opacity: 1 })); } catch(e) {}
    const logoSize = 22;
    doc.setFillColor(...BEYAZ);
    doc.roundedRect(14, 14, logoSize + 4, logoSize + 4, 4, 4, "F");
    doc.addImage(otelImgData, "JPEG", 16, 16, logoSize, logoSize);
  }

  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(180, 200, 220);
  doc.text("OTEL GİZLİ MÜŞTERİ DENETİM SİSTEMİ", 44, 24);
  doc.text("© 2026 — TÜM HAKLARI SAKLIDIR", 44, 30);

  doc.setTextColor(...BEYAZ);
  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
  doc.setFontSize(28);
  doc.text("DENETİM", W / 2, 118, { align: "center" });
  doc.text("DEĞERLENDİRME", W / 2, 130, { align: "center" });
  doc.text("RAPORU", W / 2, 142, { align: "center" });

  doc.setFillColor(...ALTIN);
  doc.rect(W/2 - 30, 148, 60, 1.5, "F");

  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 200, 220);
  doc.text("Hazırlayan: " + (aktif.kullaniciAdi || "Sistem"), W / 2, 162, { align: "center" });
  doc.text("Tarih: " + tarihStr + "  Saat: " + saatStr, W / 2, 170, { align: "center" });
  doc.text("Toplam Denetim Sayısı: " + kayitlar.length, W / 2, 178, { align: "center" });

  doc.setFillColor(...ALTIN);
  doc.rect(0, H - 14, W, 14, "F");
  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 25, 40);
  doc.text("GİZLİ — Sadece Yetkili Personel", W / 2, H - 5, { align: "center" });

  // ─────────────────────────────────────────
  // SAYFA 2 — GENEL BİLGİLER & İSTATİSTİKLER
  // ─────────────────────────────────────────
  _aktifBaslik = "GENEL BİLGİLER & İSTATİSTİKLER";
  _aktifAltBaslik = "Rapor Özeti";
  yeniSayfa(_aktifBaslik, _aktifAltBaslik);

  const genelOrt = kayitlar.length > 0
    ? Math.round(kayitlar.reduce((t, k) => t + (k.puan || 0), 0) / kayitlar.length) : 0;
  const enYuksek  = kayitlar.length > 0 ? Math.max(...kayitlar.map(k => k.puan||0)) : 0;
  const enDusuk   = kayitlar.length > 0 ? Math.min(...kayitlar.map(k => k.puan||0)) : 0;
  const uniqueOteller    = [...new Set(kayitlar.map(k => k.otelAdi).filter(Boolean))];
  const uniqueDenetciler = [...new Set(kayitlar.map(k => k.denetciAd || k.denetci).filter(Boolean))];

  // İstatistik kartları (2x2 grid)
  const kartlar = [
    { baslik:"GENEL ORTALAMA", deger: genelOrt + " / 100", renk: puanRenk(genelOrt) },
    { baslik:"TOPLAM DENETİM", deger: String(kayitlar.length), renk: MAVI },
    { baslik:"EN YÜKSEK PUAN", deger: String(enYuksek), renk: [34,197,94] },
    { baslik:"EN DÜŞÜK PUAN",  deger: String(enDusuk),  renk: [239,68,68] },
  ];
  kartlar.forEach((kart, i) => {
    const x = MARGIN + (i % 2) * 91;
    const y = _gy + Math.floor(i / 2) * 32;
    doc.setFillColor(...ACIK);
    doc.roundedRect(x, y, 88, 28, 4, 4, "F");
    doc.setFillColor(...kart.renk);
    doc.roundedRect(x, y, 5, 28, 2, 2, "F");
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...kart.renk);
    doc.text(kart.deger, x + 12, y + 13);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(kart.baslik, x + 12, y + 22);
  });
  _gy += 74;

  // Rapor detay tablosu
  bolumBasligi("RAPOR DETAYLARI");
  const ilkDenetim = kayitlar.length > 0 ? kayitlar[0] : null;
  const sonDenetim = kayitlar.length > 0 ? kayitlar[kayitlar.length - 1] : null;
  const bilgiler = [
    ["Raporu Hazırlayan",   aktif.kullaniciAdi || "—"],
    ["Hazırlanma Tarihi",   tarihStr + " " + saatStr],
    ["İlk Denetim Tarihi",  ilkDenetim ? ilkDenetim.tarih : "—"],
    ["Son Denetim Tarihi",  sonDenetim ? sonDenetim.tarih : "—"],
    ["Denetlenen Oteller",  uniqueOteller.length > 0 ? uniqueOteller.join(", ") : "—"],
    ["Aktif Denetçiler",    uniqueDenetciler.length > 0 ? uniqueDenetciler.join(", ") : "—"],
    ["Toplam Denetim",      kayitlar.length + " kayıt"],
    ["Kritik Denetimler",   kayitlar.filter(k => (k.puan||0) < 50).length + " adet"],
    ["Mükemmel Denetimler", kayitlar.filter(k => (k.puan||0) >= 90).length + " adet"],
  ];
  bilgiler.forEach((satir, i) => {
    sayfaKontrol(11, _aktifBaslik, _aktifAltBaslik);
    doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
    doc.rect(MARGIN, _gy - 4, ICALAN, 11, "F");
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...LACIVERT);
    doc.text(satir[0], MARGIN + 3, _gy + 3);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const degerSatirlar = doc.splitTextToSize(satir[1], ICALAN - 75);
    doc.text(degerSatirlar[0], MARGIN + 80, _gy + 3);
    _gy += 11;
  });

  footerCiz();

  // ─────────────────────────────────────────
  // SAYFA 3 — DENETİM KAYITLARI LİSTESİ
  // ─────────────────────────────────────────
  _aktifBaslik = "DENETİM KAYITLARI";
  _aktifAltBaslik = kayitlar.length + " kayıt";
  yeniSayfa(_aktifBaslik, _aktifAltBaslik);

  // Tablo başlığı
  const kolonlar = [
    { baslik:"TARİH",   x: MARGIN,      w: 22 },
    { baslik:"OTEL",    x: MARGIN + 22, w: 48 },
    { baslik:"DENETÇİ", x: MARGIN + 70, w: 38 },
    { baslik:"TÜR",     x: MARGIN + 108,w: 28 },
    { baslik:"PUAN",    x: MARGIN + 136,w: 18 },
    { baslik:"DURUM",   x: MARGIN + 154,w: 28 },
  ];
  doc.setFillColor(...LACIVERT);
  doc.rect(MARGIN, _gy - 3, ICALAN, 11, "F");
  kolonlar.forEach(k => {
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...BEYAZ);
    doc.text(k.baslik, k.x + 1, _gy + 4);
  });
  _gy += 11;

  const turEtiket = { gizli:"Gizli Müşteri", acik:"Açık Denetim", ani:"Ani Denetim" };
  [...kayitlar].reverse().forEach((k, i) => {
    sayfaKontrol(12, _aktifBaslik, _aktifAltBaslik);
    const puan  = k.puan || 0;
    const renk  = puanRenk(puan);
    doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
    doc.rect(MARGIN, _gy - 3, ICALAN, 11, "F");

    const satirlar_otel = doc.splitTextToSize(k.otelAdi || "—", 46);
    const satirlar_dnt  = doc.splitTextToSize(k.denetciAd || k.denetci || "—", 36);

    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(k.tarih || "—",                      kolonlar[0].x + 1, _gy + 4);
    doc.text(satirlar_otel[0],                     kolonlar[1].x + 1, _gy + 4);
    doc.text(satirlar_dnt[0],                      kolonlar[2].x + 1, _gy + 4);
    doc.text((turEtiket[k.tur] || k.tur || "—").substring(0,14), kolonlar[3].x + 1, _gy + 4);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setTextColor(...renk);
    doc.text(String(puan),                         kolonlar[4].x + 1, _gy + 4);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text(puanEtiket(puan),                     kolonlar[5].x + 1, _gy + 4);
    _gy += 11;
  });

  footerCiz();

  // ─────────────────────────────────────────
  // SAYFA 4 — BİRİM PERFORMANS SIRALAMASI
  // ─────────────────────────────────────────
  const birimMapPDF = {};
  kayitlar.forEach(k => {
    if (!k.birimPuanlari) return;
    Object.entries(k.birimPuanlari).forEach(([bid, p]) => {
      if (!birimMapPDF[bid]) birimMapPDF[bid] = [];
      birimMapPDF[bid].push(p);
    });
  });
  const birimSirali = Object.entries(birimMapPDF)
    .map(([bid, puanlar]) => {
      const ort = Math.round(puanlar.reduce((t,p)=>t+p,0)/puanlar.length);
      const min = Math.min(...puanlar);
      const max = Math.max(...puanlar);
      const birim = (typeof DENETIM_VERITABANI !== "undefined")
        ? DENETIM_VERITABANI.find(b => b.id === bid) : null;
      return { id: bid, ad: birim?.birimAdi || bid, ort, min, max, sayi: puanlar.length };
    })
    .sort((a,b) => b.ort - a.ort);  // Sıralama tablosu: en iyiden en kötüye

  if (birimSirali.length > 0) {
    _aktifBaslik = "BİRİM PERFORMANS SIRALAMASI";
    _aktifAltBaslik = birimSirali.length + " birim";
    yeniSayfa(_aktifBaslik, _aktifAltBaslik);

    birimSirali.forEach((b, i) => {
      sayfaKontrol(15, _aktifBaslik, _aktifAltBaslik);
      const renk = puanRenk(b.ort);
      const oran = b.ort / 100;
      const barW = 65;
      const barX = MARGIN + 105;

      doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
      doc.rect(MARGIN, _gy - 3, ICALAN, 13, "F");

      // Sıra no
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...renk);
      doc.text(String(i + 1), MARGIN + 3, _gy + 5);

      // Birim adı
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      const adKisalt = b.ad.length > 32 ? b.ad.substring(0, 32) + "…" : b.ad;
      doc.text(adKisalt, MARGIN + 12, _gy + 5);

      // Bar
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(barX, _gy, barW, 7, 2, 2, "F");
      if (oran > 0) {
        doc.setFillColor(...renk);
        doc.roundedRect(barX, _gy, Math.max(oran * barW, 2), 7, 2, 2, "F");
      }

      // Puan + etiket
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...renk);
      doc.text(String(b.ort), W - MARGIN, _gy + 5, { align: "right" });

      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(puanEtiket(b.ort), barX + barW + 2, _gy + 5);

      _gy += 13;
    });

    // Stratejik öneriler
    _gy += 6;
    sayfaKontrol(20, _aktifBaslik, _aktifAltBaslik);
    bolumBasligi("STRATEJİK ÖNERİLER");

    const kritikBirimler = birimSirali.filter(b => b.ort < 50);
    const oneriler = [
      genelOrt >= 85
        ? "Mevcut kalite seviyesini korumak için periyodik denetim sıklığını optimize edin."
        : "Genel ortalamayı 85+ seviyesine taşımak için en düşük puanlı birimlere odaklanın.",
      kritikBirimler.length > 0
        ? `Kritik birimler: ${kritikBirimler.slice(0,2).map(b=>b.ad).join(", ")} — acil aksiyon gerektirir.`
        : "Tüm birimler kabul edilebilir seviyede. Üst performansı yakalamak için çapraz mentorluk uygulayın.",
      kayitlar.length < 10
        ? "Güvenilir istatistikler için denetim sıklığını artırın; en az 10-15 kayıt hedefleyin."
        : "Aylık kapanış raporlarıyla yönetim kuruluna düzenli sunum yapılması önerilir.",
      "Denetim sonuçlarını birim yöneticileriyle şeffaf biçimde paylaşarak hesap verebilirliği güçlendirin.",
      "Misafir memnuniyet anketleri ile denetim puanları arasındaki korelasyonu analiz edin."
    ];
    oneriler.forEach((o, i) => {
      sayfaKontrol(16, _aktifBaslik, _aktifAltBaslik);
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(MARGIN, _gy - 2, ICALAN, 13, 3, 3, "F");
      doc.setFillColor(34, 197, 94);
      doc.circle(MARGIN + 6, _gy + 4, 3, "F");
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...BEYAZ);
      doc.text(String(i + 1), MARGIN + 6, _gy + 5.5, { align: "center" });
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(22, 101, 52);
      const satirlar = doc.splitTextToSize(o, ICALAN - 18);
      doc.text(satirlar[0], MARGIN + 14, _gy + 5);
      _gy += 14;
    });

    footerCiz();
  }

  // ─────────────────────────────────────────
  // HER BİRİM İÇİN DETAY SAYFALARI
  // Uzun yorum + detaylar + aksiyonlar + fotoğraflar
  // ─────────────────────────────────────────
  function _yorumUretPDF(b) {
    const aralik  = b.max - b.min;
    const tutarli = aralik <= 10;
    const dalgali = aralik >= 25;
    function _sec(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    const seviyeAd = b.ort >= 90 ? "Mükemmel" : b.ort >= 75 ? "İyi" : b.ort >= 50 ? "Geliştirilmeli" : "Kritik";

    const anaYorumlar = {
      "Mükemmel": [
        `${b.ad} birimi, titizlikle yürütülen ${b.sayi} bağımsız denetim sürecinin bütününde ${b.ort} puanlık kayda değer bir performans ortalaması yakalayarak uluslararası konaklama standartlarının yalnızca karşılanmasıyla yetinmeyip bu standartları sistematik ve ölçülebilir biçimde aştığını gözler önüne sermiş; misafir odaklı hizmet felsefesinin soyut bir söylemden öte, günlük operasyonun her katmanına işlenmiş somut bir gerçekliğe dönüştüğünü tartışmaya yer bırakmayacak şekilde kanıtlamıştır.`,
        `Konaklama endüstrisinin küresel rekabet ortamında sürdürülebilir kalite üretmenin ne denli zorlu bir hedef olduğu göz önünde bulundurulduğunda, ${b.ad} biriminin ${b.sayi} ayrı denetim döneminde sergilediği ve ${b.ort} puanlık güçlü bir ortalamaya karşılık gelen bu performans tablosu; ekip liderliğinin vizyoner yaklaşımını, personelin hizmet bilincini ve operasyonel süreçlerin olgunluğunu bir arada yansıtan, sektörde örnek gösterilebilecek nitelikte bir başarı hikayesi olarak değerlendirilmelidir.`
      ],
      "İyi": [
        `${b.ad} birimi, ${b.sayi} sistematik denetim sürecinde elde ettiği ${b.ort} puanlık ortalama performansıyla konaklama sektörünün temel kalite gerekliliklerini karşıladığını ve misafir memnuniyetine yönelik bilinçli bir kurumsal çabanın varlığını açıkça ortaya koymuş olmakla birlikte; denetim verileri derinlemesine incelendiğinde, üst performans bandına geçişi engelleyen ve büyük olasılıkla süreç standardizasyonu ile personel yetkinlik gelişimi alanlarında yoğunlaşan belirli operasyonel boşlukların giderilmesinin, birimin gerçek potansiyelini tam anlamıyla ortaya çıkarması açısından kritik bir öncelik oluşturduğu anlaşılmaktadır.`,
        `${b.ort} puanlık denetim ortalaması, ${b.ad} biriminin misafir deneyimi yönetiminde doğru bir stratejik yönelim içinde olduğunu ve temel hizmet standartlarını büyük ölçüde hayata geçirebildiğini göstermekte; ancak ${b.sayi} denetim verisi bütüncül biçimde değerlendirildiğinde, mükemmel kategorisine geçişi sağlayacak o kritik mesafeyi kapatmak için hizmet süreçlerinin daha ince ayrıntılarına odaklanılması, misafir geri bildirimlerinin operasyonel kararlara daha sistematik biçimde entegre edilmesi ve ekip içi kalite bilincinin her kademede güçlendirilmesi gerektiği açıkça ortaya çıkmaktadır.`
      ],
      "Geliştirilmeli": [
        `${b.ad} birimi, ${b.sayi} sistematik denetim sürecinde elde ettiği ${b.ort} puanlık ortalama performansıyla konaklama sektörünün beklenen kalite standartlarının belirgin biçimde altında kaldığını ortaya koymuş; denetim bulgularının derinlemesine analizi, bu durumun yalnızca bireysel performans farklılıklarından değil, standart operasyon prosedürlerinin yetersiz uygulanması, personel yetkinlik boşlukları ve kalite güvence mekanizmalarının etkin işlememesi gibi yapısal sorunların bir bileşiminden kaynaklandığını güçlü biçimde düşündürmektedir.`,
        `${b.ort} puanlık denetim ortalaması, ${b.ad} biriminde misafir deneyiminin sistematik biçimde olumsuz etkilendiğine ve mevcut operasyonel yapının konaklama sektörünün temel kalite gerekliliklerini karşılamakta ciddi güçlük çektiğine işaret etmekte; ${b.sayi} denetim verisi bütüncül biçimde değerlendirildiğinde, bu tablonun kısa vadeli yamalarla değil; süreç yeniden tasarımı, hedefli personel gelişim programları ve güçlendirilmiş denetim mekanizmalarını kapsayan kapsamlı bir iyileştirme stratejisiyle aşılabileceği anlaşılmaktadır.`
      ],
      "Kritik": [
        `${b.ad} birimi, ${b.sayi} kapsamlı denetim sürecinde yalnızca ${b.ort} puanlık son derece düşük bir ortalama performans sergileyerek konaklama sektörünün asgari kalite gerekliliklerini dahi karşılayamadığını açıkça ortaya koymuş; denetim bulgularının bütüncül değerlendirmesi, bu kritik tablonun misafir deneyimini doğrudan ve ağır biçimde tehdit ettiğini, otel itibarına telafi edilmesi güç zararlar verebileceğini ve üst yönetimin doğrudan müdahalesini gerektiren acil bir kurumsal kriz niteliği taşıdığını tartışmaya yer bırakmayacak şekilde ortaya koymaktadır.`,
        `${b.ort} puanlık kritik denetim ortalaması, ${b.ad} biriminde operasyonel süreçlerin işlevsiz kaldığını, kalite güvence mekanizmalarının etkin biçimde çalışmadığını ve misafir odaklı hizmet anlayışının günlük operasyona yansımadığını gösteren son derece ciddi bir tablo ortaya koymakta; ${b.sayi} denetim verisi incelendiğinde, bu durumun yalnızca bireysel performans sorunlarından değil, liderlik etkinliği, süreç tasarımı ve kurumsal kalite kültürü gibi temel alanlardaki köklü yapısal sorunlardan beslendiği anlaşılmaktadır.`
      ]
    };

    // Tek denetimde varyasyon yorumu anlamsız — sadece çok denetimde ekle
    let tutKisim = "";
    if (b.sayi > 1) {
      const tutarliYorumlar = [
        `${b.min} ile ${b.max} arasında seyreden ve yalnızca ${aralik} puanlık dar bir varyasyona karşılık gelen puan aralığı, ${b.ad} biriminin operasyonel tutarlılığı başarıyla kurduğunu ve denetimden denetime istikrarlı biçimde koruyabildiğini kanıtlamaktadır.`,
        `Denetimler arasındaki ${aralik} puanlık dar fark, ${b.ad} biriminin kalite çıtasını her koşulda aynı yükseklikte tutabildiğini ve misafir deneyimini etkileyen kritik değişkenleri sistematik biçimde yönetme kapasitesine sahip olduğunu ortaya koymaktadır.`
      ];
      const dalgaliYorumlar = [
        `Bununla birlikte, ${b.min} ile ${b.max} arasındaki ${aralik} puanlık geniş puan aralığı ciddi endişe yaratmaktadır. Bu dalgalanma, ${b.ad} biriminin kalite çıtasını denetimden denetime istikrarlı biçimde koruyamadığını ve misafir deneyiminin öngörülemez hale geldiğini göstermekte; kök nedenlerinin acilen araştırılması gerekmektedir.`,
        `${aralik} puanlık geniş puan varyasyonu, ${b.ad} biriminde kalite yönetiminin sistematik bir yapıya kavuşturulamadığını ortaya koymakta; bu tutarsızlık misafir güvenini zedeleme ve tekrar ziyaret oranlarını olumsuz etkileme potansiyeli taşıyan kritik bir operasyonel risk olarak değerlendirilmelidir.`
      ];
      const normalYorumlar = [
        `${b.min}–${b.max} arasındaki ${aralik} puanlık puan aralığı kabul edilebilir sınırlar içinde kalmakla birlikte, bu varyasyonun daha da daraltılması için standart operasyon prosedürlerinin güçlendirilmesi anlamlı bir performans artışı sağlayacaktır.`
      ];
      tutKisim = " " + (tutarli ? _sec(tutarliYorumlar) : dalgali ? _sec(dalgaliYorumlar) : _sec(normalYorumlar));
    } else {
      // Tek denetim — sadece daha fazla veri gerektiği notunu ekle
      tutKisim = ` Mevcut değerlendirme tek bir denetim verisine dayanmaktadır; birimin gerçek performans profilini daha güvenilir biçimde ortaya koyabilmek için ek denetimler yapılması önerilmektedir.`;
    }

    const ana = _sec(anaYorumlar[seviyeAd]);
    return ana + tutKisim;
  }

  function aksiyonUretPDF(b) {
    const p = b.ort;
    if (p >= 90) return [
      "Mevcut standartları dokümante ederek diğer birimlere örnek süreç rehberi hazırlayın",
      "Üst performans gösteren personeli ödüllendirme programına dahil edin",
      "Benchmarking çalışması yaparak rakip otellerdeki en iyi uygulamaları inceleyin"
    ];
    if (p >= 75) return [
      "Standart operasyon prosedürlerini güncelleyerek puan tutarsızlığını giderin",
      "Aylık iç denetim sıklığını artırarak gelişimi takip edin",
      "Personel güçlü yönlerini belirleyerek çapraz eğitim programı uygulayın"
    ];
    if (p >= 50) return [
      "Birim yöneticisiyle acil performans görüşmesi gerçekleştirin",
      "Kök neden analizi yaparak düşük puanın kaynağını belirleyin",
      "2 haftalık yoğun eğitim programı planlayın ve sonuçları ölçün",
      "Misafir şikayetlerini kategorize ederek öncelikli sorun alanlarını belirleyin"
    ];
    return [
      "Birim müdürü ve üst yönetim ile acil kriz toplantısı düzenleyin",
      "Tüm personel için zorunlu yeniden eğitim programı başlatın",
      "Günlük denetim protokolü uygulayın ve sonuçları raporlayın",
      "Gerekirse dış danışman desteği alarak süreç yeniden yapılandırması yapın",
      "30 günlük iyileştirme planı oluşturun ve KPI'ları netleştirin"
    ];
  }

  // ── Kategori ayraç sayfası oluşturucu ──
  function kategoriAyracSayfasi(kategori) {
    const cfg = {
      "Kritik":        { renk: [239, 68,  68],  ikon: "✕", aciklama: "Acil müdahale gerektiren birimler — puan 50'nin altında",  alt: "Bu bölümdeki birimler için ivedi aksiyon planı uygulanmalıdır."  },
      "Geliştirilmeli":{ renk: [245,158,  11],  ikon: "!", aciklama: "İyileştirme gerektiren birimler — puan 50–74 arasında",       alt: "Bu bölümdeki birimler hedefli gelişim programı gerektirmektedir." },
      "İyi":           { renk: [59, 130, 246],  ikon: "✓", aciklama: "Performansı iyi birimler — puan 75–89 arasında",             alt: "Bu birimler standartları karşılamakta, üst banda geçiş için potansiyel taşımaktadır." },
      "Mükemmel":      { renk: [34, 197,  94],  ikon: "★", aciklama: "Mükemmel performans gösteren birimler — puan 90 ve üzeri",   alt: "Bu birimler sektörde örnek gösterilebilecek kalite seviyesindedir." }
    };
    const c = cfg[kategori] || cfg["İyi"];

    footerCiz();
    sayfaNo++;
    doc.addPage();

    // Tam sayfa arka plan rengi (açık ton)
    doc.setFillColor(c.renk[0], c.renk[1], c.renk[2]);
    doc.rect(0, 0, W, H, "F");

    // Koyu overlay
    doc.setFillColor(0, 0, 0);
    try { doc.setGState(new doc.GState({ opacity: 0.55 })); } catch(e) {}
    doc.rect(0, 0, W, H, "F");
    try { doc.setGState(new doc.GState({ opacity: 1 })); } catch(e) {}

    // Sol renkli şerit
    doc.setFillColor(...c.renk);
    doc.rect(0, 0, 8, H, "F");

    // Büyük ikon/sembol
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setFontSize(72);
    doc.setTextColor(...c.renk);
    doc.text(c.ikon, W / 2, 110, { align: "center" });

    // Kategori adı
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text(kategori.toUpperCase(), W / 2, 145, { align: "center" });

    // Alt çizgi
    doc.setFillColor(...c.renk);
    doc.rect(W / 2 - 40, 150, 80, 1.5, "F");

    // Açıklama
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 210, 220);
    const acikSatirlar = doc.splitTextToSize(c.aciklama, 140);
    acikSatirlar.forEach((s, i) => {
      doc.text(s, W / 2, 162 + i * 7, { align: "center" });
    });

    // Alt not
    doc.setFontSize(8.5);
    doc.setTextColor(160, 175, 190);
    const altSatirlar = doc.splitTextToSize(c.alt, 140);
    altSatirlar.forEach((s, i) => {
      doc.text(s, W / 2, 180 + i * 6, { align: "center" });
    });

    // Footer
    doc.setFillColor(0, 0, 0);
    try { doc.setGState(new doc.GState({ opacity: 0.35 })); } catch(e) {}
    doc.rect(0, H - 14, W, 14, "F");
    try { doc.setGState(new doc.GState({ opacity: 1 })); } catch(e) {}
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(180, 200, 220);
    doc.text("Otel Gizli Müşteri Denetim Sistemi — " + tarihStr, 10, H - 5.5);
    doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
    doc.setTextColor(...c.renk);
    doc.text("Sayfa " + sayfaNo, W - 14, H - 5.5, { align: "right" });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SAYFA 5+ : KATEGORİ BAZLI LİSTELEME
  // Sıra: Kritik → Geliştirilmeli → İyi → Mükemmel
  // Her kategori: Kapak sayfası → Birimler listesi (en düşükten en yükseğe)
  // Her birim satırında: puan, bar, kısa yorum, varsa fotoğraflar
  // ─────────────────────────────────────────────────────────────────────────

  const kategoriler = [
    { ad: "Kritik",         renk: [239, 68,  68],  filtre: b => b.ort < 50,              siralama: (a,b) => a.ort - b.ort },
    { ad: "Geliştirilmeli", renk: [245, 158,  11], filtre: b => b.ort >= 50 && b.ort < 75, siralama: (a,b) => a.ort - b.ort },
    { ad: "İyi",            renk: [59,  130, 246], filtre: b => b.ort >= 75 && b.ort < 90, siralama: (a,b) => a.ort - b.ort },
    { ad: "Mükemmel",       renk: [34,  197,  94], filtre: b => b.ort >= 90,              siralama: (a,b) => a.ort - b.ort },
  ];

  // Fotoğraf eşleştirici
  function birimFotograflariniGetir(birimId, birimAd) {
    const liste = [];
    kayitlar.forEach(k => {
      if (!k.fotograflar || !Array.isArray(k.fotograflar)) return;
      k.fotograflar.forEach(f => {
        if (f.maddeId && (
          f.maddeId.startsWith(birimId + "_") ||
          f.maddeId.startsWith(birimAd + "_")
        )) {
          liste.push({ url: f.url, maddeAdi: f.maddeAdi || f.maddeId || "", tarih: k.tarih || "", otel: k.otelAdi || "" });
        }
      });
    });
    return liste;
  }

  for (const kategori of kategoriler) {
    const grupBirimler = birimSirali
      .filter(kategori.filtre)
      .sort(kategori.siralama); // En düşükten en yükseğe

    if (grupBirimler.length === 0) continue;

    // ── KATEGORİ KAPAK SAYFASI ──
    kategoriAyracSayfasi(kategori.ad);

    // ── KATEGORİ LİSTE SAYFASI (tüm birimler art arda) ──
    _aktifBaslik    = kategori.ad.toUpperCase() + " BİRİMLER";
    _aktifAltBaslik = grupBirimler.length + " birim — en düşükten en yükseğe";
    yeniSayfa(_aktifBaslik, _aktifAltBaslik);

    for (const b of grupBirimler) {
      const renk   = puanRenk(b.ort);
      const etiket = puanEtiket(b.ort);
      const aralik = b.max - b.min;

      // Bu birime ait fotoğraflar
      const birimFotolar = birimFotograflariniGetir(b.id, b.ad);
      const fotoSatirSayisi = Math.ceil(birimFotolar.length / 3);
      const fotoYukseklik   = fotoSatirSayisi > 0 ? fotoSatirSayisi * 48 + 12 : 0;

      // Birim kartının toplam tahmini yüksekliği
      const kartTahminiH = 30 + 10 + 22 + 30 + fotoYukseklik + 8;
      sayfaKontrol(kartTahminiH, _aktifBaslik, _aktifAltBaslik);

      // ── Birim başlık bandı ──
      doc.setFillColor(...renk);
      doc.roundedRect(MARGIN, _gy, ICALAN, 18, 3, 3, "F");
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...BEYAZ);
      const adKisa = b.ad.length > 38 ? b.ad.substring(0, 38) + "…" : b.ad;
      doc.text(adKisa, MARGIN + 5, _gy + 7);
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(8);
      doc.text(etiket + " · " + b.sayi + " denetim · Varyasyon: " + aralik, MARGIN + 5, _gy + 14);
      // Puan sağda
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(16);
      doc.text(String(b.ort), W - MARGIN - 4, _gy + 11, { align: "right" });
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(7);
      doc.text("/ 100", W - MARGIN - 4, _gy + 16, { align: "right" });
      _gy += 20;

      // ── Performans bar ──
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(MARGIN, _gy, ICALAN, 5, 2, 2, "F");
      doc.setFillColor(...renk);
      doc.roundedRect(MARGIN, _gy, Math.max((b.ort / 100) * ICALAN, 3), 5, 2, 2, "F");
      _gy += 9;

      // ── İstatistik (mini) ──
      const miniStats = [
        { l: "En Yüksek", v: String(b.max), r: [34,197,94] },
        { l: "En Düşük",  v: String(b.min), r: [239,68,68] },
        { l: "Varyasyon", v: String(aralik), r: aralik <= 10 ? [34,197,94] : aralik >= 25 ? [239,68,68] : [245,158,11] },
      ];
      const mW = ICALAN / 3;
      miniStats.forEach((s, i) => {
        const x = MARGIN + i * mW;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(x, _gy, mW - 2, 12, 2, 2, "F");
        doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...s.r);
        doc.text(s.v, x + mW / 2 - 1, _gy + 7, { align: "center" });
        doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        doc.text(s.l, x + mW / 2 - 1, _gy + 11, { align: "center" });
      });
      _gy += 16;

      // ── Değerlendirme yorumu ──
      const yorumKisa = _yorumUretPDF(b);
      const yorumSat  = doc.splitTextToSize(yorumKisa, ICALAN - 14);
      const satirYukseklik = 4.8;
      const yorumH    = yorumSat.length * satirYukseklik + 12;

      // Yorum bloğu sayfaya sığmıyorsa yeni sayfa aç (blok bölünmesin)
      if (_gy + yorumH > H - ALTBOSLIK) {
        footerCiz();
        yeniSayfa(_aktifBaslik, _aktifAltBaslik);
      }

      // Arka plan kutusu (tam yükseklik bilindiğinden güvenle çizilir)
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(MARGIN, _gy, ICALAN, yorumH, 2, 2, "F");
      doc.setFillColor(...renk);
      doc.roundedRect(MARGIN, _gy, 4, yorumH, 2, 0, "F");

      _gy += 5;
      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...LACIVERT);
      doc.text("DEĞERLENDİRME", MARGIN + 8, _gy);
      _gy += 5;

      doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      yorumSat.forEach(satir => {
        doc.text(satir, MARGIN + 8, _gy);
        _gy += satirYukseklik;
      });
      _gy += 6;

      // ── Fotoğraflar ──
      if (birimFotolar.length > 0) {
        sayfaKontrol(16, _aktifBaslik, _aktifAltBaslik);
        doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...LACIVERT);
        doc.text("Denetim Fotoğrafları (" + birimFotolar.length + " adet)", MARGIN, _gy);
        doc.setFillColor(...ALTIN);
        doc.rect(MARGIN, _gy + 2, 50, 0.6, "F");
        _gy += 7;

        const fW = 55, fH = 42, fPerRow = 3, fAralik = 4;

        for (let fi = 0; fi < birimFotolar.length; fi++) {
          const col  = fi % fPerRow;
          const fX   = MARGIN + col * (fW + fAralik);

          if (col === 0) {
            sayfaKontrol(fH + 8, _aktifBaslik, _aktifAltBaslik);
          }

          // Çerçeve
          doc.setFillColor(241, 245, 249);
          doc.roundedRect(fX, _gy, fW, fH, 3, 3, "F");
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.4);
          doc.roundedRect(fX, _gy, fW, fH, 3, 3, "S");

          try {
            const base64 = await imgBase64(birimFotolar[fi].url);
            if (base64) {
              doc.addImage(base64, "JPEG", fX, _gy, fW, fH - 10);
            } else {
              doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
              doc.setFontSize(6.5);
              doc.setTextColor(148, 163, 184);
              doc.text("Görsel yüklenemedi", fX + fW / 2, _gy + fH / 2 - 5, { align: "center" });
            }
          } catch(e) {
            doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
            doc.setFontSize(6.5);
            doc.setTextColor(148, 163, 184);
            doc.text("Görsel yüklenemedi", fX + fW / 2, _gy + fH / 2 - 5, { align: "center" });
          }

          // Soru adı + tarih altında
          doc.setFillColor(248, 250, 252);
          doc.rect(fX, _gy + fH - 10, fW, 10, "F");
          doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
          doc.setFontSize(6);
          doc.setTextColor(30, 41, 59);
          const maddeAd = birimFotolar[fi].maddeAdi.length > 28
            ? birimFotolar[fi].maddeAdi.substring(0, 28) + "…"
            : birimFotolar[fi].maddeAdi;
          doc.text(maddeAd, fX + 2, _gy + fH - 5);
          if (birimFotolar[fi].tarih) {
            doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
            doc.setFontSize(5);
            doc.setTextColor(148, 163, 184);
            doc.text(
              birimFotolar[fi].tarih + (birimFotolar[fi].otel ? " · " + birimFotolar[fi].otel.substring(0, 12) : ""),
              fX + 2, _gy + fH - 1
            );
          }

          if (col === fPerRow - 1 || fi === birimFotolar.length - 1) {
            _gy += fH + 5;
          }
        }
      }

      // Birimler arasına ince ayırıcı çizgi
      _gy += 4;
      sayfaKontrol(6, _aktifBaslik, _aktifAltBaslik);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(MARGIN, _gy, W - MARGIN, _gy);
      _gy += 8;
    }

    footerCiz();
  }

  // Kaydet
  const dosyaAdi = "Denetim_Raporu_" + tarihStr.replace(/\./g, "-") + ".pdf";
  doc.save(dosyaAdi);
}

// PDF alt bilgi yardımcısı (uyumluluk için korundu)
function _pdfFooter(doc, W, H, LACIVERT, ALTIN, tarihStr, sayfa) {
  doc.setFillColor(...LACIVERT);
  doc.rect(0, H - 14, W, 14, "F");
  doc.setFillColor(...ALTIN);
  doc.rect(0, H - 14, 4, 14, "F");
  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 200, 220);
  doc.text("Otel Gizli Müşteri Denetim Sistemi — " + tarihStr, 10, H - 5.5);
  doc.setFont(_fontYuklendi ? FONTNAME : "helvetica", "bold");
  doc.setTextColor(...ALTIN);
  doc.text("Sayfa " + sayfa, W - 14, H - 5.5, { align: "right" });
}
