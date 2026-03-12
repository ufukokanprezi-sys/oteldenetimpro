// ============================================================
// BİRİMLER SAYFASI — Sol: Birim Listesi | Sağ: Denetim Paneli
// ============================================================

// Sync yardımcı — birimler sayfası için (async denetimleriGetir yerine)
function _denetimleriGetirSync() {
  try {
    const ham = localStorage.getItem("denetim_kayitlar");
    const liste = ham ? JSON.parse(ham) : [];
    const aktif = aktifKullaniciyiGetir() || {};
    if (!aktif || !aktif.id) return liste;
    if (aktif.rol === "admin") return liste;
    return liste.filter(d => d.denetciId === aktif.id);
  } catch(e) { return []; }
}

let secilenBirim = null;

function birimlerSayfasi() {
  const birimListesi = birimlerGetir();

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="
      display:grid;
      grid-template-columns:320px 1fr;
      gap:20px;
      height:calc(100vh - 112px);
      max-width:1200px;
      margin:0 auto">

      <!-- ════ SOL PANEL: Denetlenecek Birimler ════ -->
      <div style="
        background:white;
        border-radius:16px;
        box-shadow:0 2px 12px rgba(0,0,0,0.08);
        display:flex;
        flex-direction:column;
        overflow:hidden">

        <!-- Sol Başlık -->
        <div style="
          padding:18px 20px 14px;
          border-bottom:1px solid #f1f5f9">
          <div style="font-size:15px; font-weight:800; color:#1e293b; margin-bottom:2px">
            🏢 Denetlenecek Birimler
          </div>
          <div style="font-size:12px; color:#94a3b8">
            Toplam <strong style="color:#374151">${birimListesi.length}</strong> birim
          </div>
        </div>

        <!-- Arama -->
        <div style="padding:12px 16px; border-bottom:1px solid #f1f5f9">
          <input id="birimArama" type="text"
            placeholder="🔍  Birim ara..."
            oninput="birimSolFiltrele()"
            style="
              width:100%; padding:9px 13px;
              border:2px solid #e2e8f0; border-radius:10px;
              font-size:13px; outline:none; box-sizing:border-box;
              transition:border-color 0.2s"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
        </div>

        <!-- Birim Listesi -->
        <div id="birimSolListe" style="
          flex:1; overflow-y:auto;
          padding:10px 12px"></div>
      </div>

      <!-- ════ SAĞ PANEL: Denetim Alanı ════ -->
      <div id="birimSagPanel" style="
        background:white;
        border-radius:16px;
        box-shadow:0 2px 12px rgba(0,0,0,0.08);
        display:flex;
        flex-direction:column;
        overflow:hidden">

        <!-- Boş Durum -->
        <div style="
          flex:1; display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          padding:40px; text-align:center">
          <div style="
            width:80px; height:80px;
            background:#f0f9ff;
            border-radius:24px;
            display:flex; align-items:center;
            justify-content:center;
            font-size:36px; margin-bottom:20px">
            📋
          </div>
          <div style="font-size:17px; font-weight:800; color:#1e293b; margin-bottom:8px">
            Liste
          </div>
          <div style="font-size:14px; color:#94a3b8; line-height:1.7; max-width:280px">
            Yeni Denetim Oluşturulduktan Sonra Görünecektir
          </div>
          <div style="
            margin-top:24px; padding:12px 20px;
            background:#f8fafc; border-radius:12px;
            font-size:12px; color:#94a3b8;
            border:2px dashed #e2e8f0">
            ← Soldan bir birim seçin
          </div>
        </div>
      </div>
    </div>`;

  birimSolListeRender(birimListesi);
}

// ============================================================
// SOL LİSTE RENDER
// ============================================================
function birimSolListeRender(liste) {
  const el = document.getElementById("birimSolListe");
  if (!el) return;

  if (liste.length === 0) {
    el.innerHTML = `
      <div style="
        text-align:center; padding:40px 20px;
        color:#94a3b8; font-size:13px">
        <div style="font-size:32px; margin-bottom:10px">🔍</div>
        Birim bulunamadı
      </div>`;
    return;
  }

  // Kategoriye göre grupla
  const gruplar = {};
  liste.forEach(b => {
    if (!gruplar[b.kategori]) gruplar[b.kategori] = [];
    gruplar[b.kategori].push(b);
  });

  const kategoriIkon = {
    "Ön Büro":         "🛎",
    "Kat Hizmetleri":  "🛏",
    "F&B":             "🍽",
    "Mutfak":          "👨‍🍳",
    "Teknik":          "🔧",
    "Güvenlik":        "🔒",
    "Spa & Wellness":  "💆",
    "Satış":           "📊",
    "İnsan Kaynakları":"👥",
    "Genel":           "🏢"
  };

  el.innerHTML = Object.entries(gruplar).map(([kategori, birimler]) => `

    <!-- Kategori Başlığı -->
    <div style="
      font-size:10px; font-weight:700;
      color:#94a3b8; letter-spacing:1px;
      text-transform:uppercase;
      padding:10px 8px 6px;
      margin-top:4px">
      ${kategoriIkon[kategori] || "🏢"} ${kategori}
    </div>

    <!-- Birimler -->
    ${birimler.map(b => {
      const kayitlar    = _denetimleriGetirSync();
      const birimKayit  = kayitlar.filter(k => k.birimId === b.id || k.birimAdi === b.ad);
      const sonDenetim  = birimKayit.length > 0 ? birimKayit[birimKayit.length - 1] : null;
      const sonPuan     = sonDenetim?.puan ?? null;

      const puanRenk = sonPuan === null ? "#94a3b8"
        : sonPuan < 50  ? "#ef4444"
        : sonPuan < 75  ? "#f59e0b"
        : sonPuan < 90  ? "#3b82f6"
        : "#22c55e";

      const secili = secilenBirim?.id === b.id;

      return `
        <div id="birimItem_${b.id}"
          onclick="birimSec('${b.id}')"
          style="
            display:flex; align-items:center; gap:10px;
            padding:10px 12px; border-radius:10px;
            cursor:pointer; margin-bottom:2px;
            transition:all 0.15s;
            background:${secili ? "#eff6ff" : "transparent"};
            border:2px solid ${secili ? "#3b82f6" : "transparent"}"
          onmouseover="if('${b.id}'!==secilenBirim?.id) this.style.background='#f8fafc'"
          onmouseout="if('${b.id}'!==secilenBirim?.id) this.style.background='transparent'">

          <!-- İkon -->
          <div style="
            width:36px; height:36px; border-radius:10px;
            background:${secili ? "#dbeafe" : "#f1f5f9"};
            display:flex; align-items:center;
            justify-content:center; font-size:17px;
            flex-shrink:0; transition:background 0.15s">
            ${b.ikon || "🏢"}
          </div>

          <!-- Bilgi -->
          <div style="flex:1; min-width:0">
            <div style="
              font-size:13px; font-weight:600;
              color:${secili ? "#1d4ed8" : "#1e293b"};
              white-space:nowrap; overflow:hidden;
              text-overflow:ellipsis">
              ${b.ad}
            </div>
            <div style="font-size:11px; color:#94a3b8; margin-top:1px">
              ${birimKayit.length} denetim
            </div>
          </div>

          <!-- Puan -->
          <div style="
            font-size:13px; font-weight:800;
            color:${puanRenk}; flex-shrink:0">
            ${sonPuan !== null ? sonPuan : "—"}
          </div>
        </div>`;
    }).join("")}
  `).join("");
}

// ============================================================
// BİRİM SEÇ → SAĞ PANEL
// ============================================================
function birimSec(birimId) {
  const birimListesi = birimlerGetir();
  const b = birimListesi.find(x => x.id === birimId);
  if (!b) return;

  secilenBirim = b;

  // Sol listede aktif stili güncelle
  document.querySelectorAll("[id^='birimItem_']").forEach(el => {
    el.style.background   = "transparent";
    el.style.borderColor  = "transparent";
    el.querySelector("div").style.background = "#f1f5f9";
    el.querySelector("div div")?.style && (el.querySelector("div div").style.color = "#1e293b");
  });
  const aktifEl = document.getElementById("birimItem_" + birimId);
  if (aktifEl) {
    aktifEl.style.background  = "#eff6ff";
    aktifEl.style.borderColor = "#3b82f6";
  }

  birimSagPanelRender(b);
}

// ============================================================
// SAĞ PANEL RENDER
// ============================================================
function birimSagPanelRender(b) {
  const panel    = document.getElementById("birimSagPanel");
  if (!panel) return;

  const kayitlar    = _denetimleriGetirSync();
  const birimKayit  = kayitlar.filter(k => k.birimId === b.id || k.birimAdi === b.ad);
  const aktif       = aktifKullaniciyiGetir() || {};
  const adminMi     = aktif.rol === "admin";

  // Puan hesapla
  const sonDenetim = birimKayit.length > 0 ? birimKayit[birimKayit.length - 1] : null;
  const sonPuan    = sonDenetim?.puan ?? null;
  const ortPuan    = birimKayit.length > 0
    ? Math.round(birimKayit.reduce((t, k) => t + (k.puan || 0), 0) / birimKayit.length)
    : null;

  const puanRenk = (p) => p === null ? "#94a3b8"
    : p < 50  ? "#ef4444"
    : p < 75  ? "#f59e0b"
    : p < 90  ? "#3b82f6"
    : "#22c55e";

  const puanEtiket = (p) => p === null ? "Denetim Yok"
    : p < 50  ? "Kritik"
    : p < 75  ? "Geliştirilmeli"
    : p < 90  ? "İyi"
    : "Mükemmel";

  panel.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%">

      <!-- Panel Başlık -->
      <div style="
        padding:18px 24px 14px;
        border-bottom:1px solid #f1f5f9;
        display:flex; align-items:center;
        justify-content:space-between; gap:12px">
        <div style="display:flex; align-items:center; gap:12px">
          <div style="
            width:44px; height:44px; border-radius:12px;
            background:#eff6ff;
            display:flex; align-items:center;
            justify-content:center; font-size:22px">
            ${b.ikon || "🏢"}
          </div>
          <div>
            <div style="font-size:16px; font-weight:800; color:#1e293b">
              ${b.ad}
            </div>
            <div style="font-size:12px; color:#94a3b8; margin-top:2px">
              ${b.kategori} ${b.aciklama ? "· " + b.aciklama : ""}
            </div>
          </div>
        </div>
        ${adminMi ? `
          <div style="display:flex; gap:8px">
            <button onclick="birimDuzenleModal('${b.id}')"
              style="
                padding:8px 14px; background:#eff6ff;
                color:#3b82f6; border:none; border-radius:9px;
                font-size:12px; font-weight:700; cursor:pointer">
              ✏️ Düzenle
            </button>
            <button onclick="birimSil('${b.id}')"
              style="
                padding:8px 14px; background:#fef2f2;
                color:#ef4444; border:none; border-radius:9px;
                font-size:12px; font-weight:700; cursor:pointer">
              🗑 Sil
            </button>
          </div>` : ""}
      </div>

      <!-- İstatistik Kartları -->
      <div style="
        display:grid; grid-template-columns:repeat(3,1fr);
        gap:12px; padding:16px 24px;
        border-bottom:1px solid #f1f5f9">

        <div style="
          background:#f8fafc; border-radius:12px;
          padding:14px; text-align:center">
          <div style="font-size:22px; font-weight:800; color:#374151">
            ${birimKayit.length}
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:3px">
            Toplam Denetim
          </div>
        </div>

        <div style="
          background:#f8fafc; border-radius:12px;
          padding:14px; text-align:center">
          <div style="font-size:22px; font-weight:800; color:${puanRenk(sonPuan)}">
            ${sonPuan !== null ? sonPuan : "—"}
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:3px">
            Son Puan
          </div>
        </div>

        <div style="
          background:#f8fafc; border-radius:12px;
          padding:14px; text-align:center">
          <div style="font-size:22px; font-weight:800; color:${puanRenk(ortPuan)}">
            ${ortPuan !== null ? ortPuan : "—"}
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:3px">
            Ortalama Puan
          </div>
        </div>
      </div>

      <!-- Denetim Listesi Başlık -->
      <div style="
        padding:14px 24px 10px;
        display:flex; align-items:center;
        justify-content:space-between">
        <div style="font-size:14px; font-weight:700; color:#1e293b">
          📋 Liste
        </div>
        <div style="font-size:12px; color:#94a3b8">
          ${birimKayit.length > 0
            ? birimKayit.length + " kayıt"
            : ""}
        </div>
      </div>

      <!-- Denetim Kayıtları -->
      <div style="flex:1; overflow-y:auto; padding:0 24px 20px">
        ${birimKayit.length === 0 ? `
          <div style="
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
            padding:48px 20px; text-align:center;
            border:2px dashed #e2e8f0; border-radius:16px;
            background:#fafafa">
            <div style="font-size:36px; margin-bottom:12px">📋</div>
            <div style="font-size:15px; font-weight:700; color:#374151; margin-bottom:6px">
              Liste
            </div>
            <div style="font-size:13px; color:#94a3b8; line-height:1.7">
              Yeni Denetim Oluşturulduktan Sonra<br>Görünecektir
            </div>
          </div>` :

          `<div style="display:flex; flex-direction:column; gap:10px">
            ${[...birimKayit].reverse().map(d => {
              const pr = puanRenk(d.puan);
              const pe = puanEtiket(d.puan);
              return `
                <div style="
                  padding:14px 16px;
                  border:1px solid #f1f5f9;
                  border-radius:12px;
                  display:flex; align-items:center;
                  gap:14px;
                  transition:background 0.15s"
                  onmouseover="this.style.background='#f8fafc'"
                  onmouseout="this.style.background='white'">

                  <!-- Puan Daire -->
                  <div style="
                    width:48px; height:48px; border-radius:50%;
                    background:${pr}18;
                    border:2px solid ${pr};
                    display:flex; align-items:center;
                    justify-content:center;
                    font-size:14px; font-weight:800;
                    color:${pr}; flex-shrink:0">
                    ${d.puan ?? "—"}
                  </div>

                  <!-- Bilgi -->
                  <div style="flex:1; min-width:0">
                    <div style="
                      font-size:13px; font-weight:700;
                      color:#1e293b; margin-bottom:3px">
                      ${d.otelAdi || "—"}
                    </div>
                    <div style="font-size:12px; color:#94a3b8">
                      ${d.tarih || "—"} · ${d.denetci || "—"}
                    </div>
                  </div>

                  <!-- Durum -->
                  <div style="
                    padding:4px 10px;
                    background:${pr}18;
                    color:${pr};
                    border-radius:20px;
                    font-size:11px; font-weight:700;
                    flex-shrink:0">
                    ${pe}
                  </div>
                </div>`;
            }).join("")}
          </div>`
        }
      </div>
    </div>`;
}

// ============================================================
// SOL FİLTRE
// ============================================================
function birimSolFiltrele() {
  const aramaVal = (document.getElementById("birimArama")?.value || "").toLowerCase();
  const liste    = birimlerGetir();
  const filtrelendi = liste.filter(b =>
    b.ad.toLowerCase().includes(aramaVal) ||
    b.kategori.toLowerCase().includes(aramaVal)
  );
  birimSolListeRender(filtrelendi);
}

// ============================================================
// BİRİMLER VERİ KATMANI
// ============================================================
function birimlerGetir() {
  const kayitli = localStorage.getItem("denetim_birimler");
  if (kayitli) {
    const liste = JSON.parse(kayitli);
    if (liste.length > 0) return liste;
  }
  const varsayilan = varsayilanBirimler();
  localStorage.setItem("denetim_birimler", JSON.stringify(varsayilan));
  return varsayilan;
}

function varsayilanBirimler() {
  return [
    { id:"b01", ad:"Resepsiyon",       kategori:"Ön Büro",        ikon:"🛎",  aciklama:"Check-in / Check-out" },
    { id:"b02", ad:"Concierge",        kategori:"Ön Büro",        ikon:"🎩",  aciklama:"Misafir hizmetleri" },
    { id:"b03", ad:"Valet & Kapıcı",   kategori:"Ön Büro",        ikon:"🚗",  aciklama:"Araç & karşılama" },
    { id:"b04", ad:"Kat Hizmetleri",   kategori:"Kat Hizmetleri", ikon:"🛏",  aciklama:"Oda temizliği" },
    { id:"b05", ad:"Çamaşırhane",      kategori:"Kat Hizmetleri", ikon:"👕",  aciklama:"Çamaşır & ütü" },
    { id:"b06", ad:"Ana Restoran",     kategori:"F&B",            ikon:"🍽",  aciklama:"Açık büfe & à la carte" },
    { id:"b07", ad:"Lobby Bar",        kategori:"F&B",            ikon:"🍸",  aciklama:"Bar & içecek servisi" },
    { id:"b08", ad:"Havuz Başı",       kategori:"F&B",            ikon:"🏊",  aciklama:"Pool bar & snack" },
    { id:"b09", ad:"Oda Servisi",      kategori:"F&B",            ikon:"🛎",  aciklama:"24 saat oda servisi" },
    { id:"b10", ad:"Ana Mutfak",       kategori:"Mutfak",         ikon:"👨‍🍳", aciklama:"Merkezi mutfak" },
    { id:"b11", ad:"Pastane",          kategori:"Mutfak",         ikon:"🥐",  aciklama:"Pastacılık & fırın" },
    { id:"b12", ad:"Teknik Servis",    kategori:"Teknik",         ikon:"🔧",  aciklama:"Bakım & onarım" },
    { id:"b13", ad:"Güvenlik",         kategori:"Güvenlik",       ikon:"🔒",  aciklama:"Güvenlik & kamera" },
    { id:"b14", ad:"Spa",              kategori:"Spa & Wellness", ikon:"💆",  aciklama:"Masaj & terapi" },
    { id:"b15", ad:"Fitness Center",   kategori:"Spa & Wellness", ikon:"🏋",  aciklama:"Spor salonu" },
  ];
}

// ============================================================
// BİRİM EKLE MODAL
// ============================================================
function birimEkleModal() {
  const liste      = birimlerGetir();
  const kategoriler = [...new Set(liste.map(b => b.kategori))];

  const modal = document.createElement("div");
  modal.id = "birimModal";
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,0.55);
    display:flex; align-items:center;
    justify-content:center; padding:20px`;

  modal.innerHTML = `
    <div style="
      background:white; border-radius:20px;
      width:100%; max-width:460px;
      box-shadow:0 20px 60px rgba(0,0,0,0.25)">

      <div style="
        padding:20px 24px 16px;
        border-bottom:1px solid #f1f5f9;
        display:flex; justify-content:space-between; align-items:center">
        <div style="font-size:16px; font-weight:800; color:#1e293b">
          🏢 Yeni Birim Ekle
        </div>
        <button onclick="document.getElementById('birimModal').remove()"
          style="
            width:30px; height:30px; border-radius:50%;
            background:#f1f5f9; border:none;
            font-size:15px; cursor:pointer; color:#64748b">✕</button>
      </div>

      <div style="padding:20px 24px; display:grid; gap:13px">
        <div>
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
            Birim Adı *
          </label>
          <input id="birim_ad" type="text" placeholder="örn: Resepsiyon"
            style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
            border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
        </div>
        <div>
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
            Kategori *
          </label>
          <input id="birim_kategori" type="text"
            placeholder="örn: Ön Büro" list="kategoriOneri"
            style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
            border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
          <datalist id="kategoriOneri">
            ${kategoriler.map(k => `<option value="${k}">`).join("")}
          </datalist>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
              İkon (emoji)
            </label>
            <input id="birim_ikon" type="text" placeholder="🏢"
              style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
              border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
              Açıklama
            </label>
            <input id="birim_aciklama" type="text" placeholder="Kısa açıklama"
              style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
              border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
          </div>
        </div>
        <div id="birimHata" style="
          display:none; padding:10px 13px; background:#fef2f2;
          border-radius:8px; font-size:13px; color:#ef4444; font-weight:600">
        </div>
      </div>

      <div style="padding:0 24px 20px; display:flex; gap:10px; justify-content:flex-end">
        <button onclick="document.getElementById('birimModal').remove()"
          style="padding:10px 18px; background:#f1f5f9; color:#64748b;
          border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
          İptal
        </button>
        <button onclick="birimKaydet()"
          style="padding:10px 22px;
          background:linear-gradient(135deg,#3b82f6,#1d4ed8);
          color:white; border:none; border-radius:10px;
          font-size:13px; font-weight:700; cursor:pointer">
          Kaydet
        </button>
      </div>
    </div>`;

  modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
  document.getElementById("birim_ad").focus();
}

// ============================================================
// BİRİM KAYDET
// ============================================================
function birimKaydet() {
  const ad       = (document.getElementById("birim_ad")?.value       || "").trim();
  const kategori = (document.getElementById("birim_kategori")?.value || "").trim();
  const ikon     = (document.getElementById("birim_ikon")?.value     || "🏢").trim();
  const aciklama = (document.getElementById("birim_aciklama")?.value || "").trim();
  const hataEl   =  document.getElementById("birimHata");

  if (!ad)       { hataGoster(hataEl, "Birim adı zorunludur.");  return; }
  if (!kategori) { hataGoster(hataEl, "Kategori zorunludur.");   return; }

  const liste = birimlerGetir();
  if (liste.find(b => b.ad.toLowerCase() === ad.toLowerCase())) {
    hataGoster(hataEl, "Bu isimde bir birim zaten mevcut."); return;
  }

  liste.push({
    id: "birim_" + Date.now(),
    ad, kategori,
    ikon: ikon || "🏢",
    aciklama
  });

  localStorage.setItem("denetim_birimler", JSON.stringify(liste));
  document.getElementById("birimModal")?.remove();
  birimlerSayfasi();
  basariToast(`✅ "${ad}" birimi eklendi.`);
}

// ============================================================
// BİRİM DÜZENLE MODAL
// ============================================================
function birimDuzenleModal(birimId) {
  const liste = birimlerGetir();
  const b     = liste.find(x => x.id === birimId);
  if (!b) return;

  const modal = document.createElement("div");
  modal.id = "birimDuzenleModal";
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,0.55);
    display:flex; align-items:center;
    justify-content:center; padding:20px`;

  modal.innerHTML = `
    <div style="
      background:white; border-radius:20px;
      width:100%; max-width:460px;
      box-shadow:0 20px 60px rgba(0,0,0,0.25)">

      <div style="
        padding:20px 24px 16px;
        border-bottom:1px solid #f1f5f9;
        display:flex; justify-content:space-between; align-items:center">
        <div style="font-size:16px; font-weight:800; color:#1e293b">
          ✏️ Birim Düzenle
        </div>
        <button onclick="document.getElementById('birimDuzenleModal').remove()"
          style="
            width:30px; height:30px; border-radius:50%;
            background:#f1f5f9; border:none;
            font-size:15px; cursor:pointer; color:#64748b">✕</button>
      </div>

      <div style="padding:20px 24px; display:grid; gap:13px">
        <div>
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
            Birim Adı *
          </label>
          <input id="duzenle_ad" type="text" value="${b.ad}"
            style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
            border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
        </div>
        <div>
          <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
            Kategori *
          </label>
          <input id="duzenle_kategori" type="text" value="${b.kategori}"
            style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
            border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
              İkon
            </label>
            <input id="duzenle_ikon" type="text" value="${b.ikon || "🏢"}"
              style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
              border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:5px; color:#374151">
              Açıklama
            </label>
            <input id="duzenle_aciklama" type="text" value="${b.aciklama || ""}"
              style="width:100%; padding:10px 13px; border:2px solid #e2e8f0;
              border-radius:10px; font-size:14px; outline:none; box-sizing:border-box"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
          </div>
        </div>
      </div>

      <div style="padding:0 24px 20px; display:flex; gap:10px; justify-content:flex-end">
        <button onclick="document.getElementById('birimDuzenleModal').remove()"
          style="padding:10px 18px; background:#f1f5f9; color:#64748b;
          border:none; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer">
          İptal
        </button>
        <button onclick="birimGuncelle('${birimId}')"
          style="padding:10px 22px; background:#f59e0b;
          color:white; border:none; border-radius:10px;
          font-size:13px; font-weight:700; cursor:pointer">
          Güncelle
        </button>
      </div>
    </div>`;

  modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

// ============================================================
// BİRİM GÜNCELLE
// ============================================================
function birimGuncelle(birimId) {
  const ad       = (document.getElementById("duzenle_ad")?.value       || "").trim();
  const kategori = (document.getElementById("duzenle_kategori")?.value || "").trim();
  const ikon     = (document.getElementById("duzenle_ikon")?.value     || "🏢").trim();
  const aciklama = (document.getElementById("duzenle_aciklama")?.value || "").trim();

  if (!ad || !kategori) { alert("Ad ve kategori zorunludur."); return; }

  const liste = birimlerGetir();
  const idx   = liste.findIndex(b => b.id === birimId);
  if (idx === -1) return;

  liste[idx] = { ...liste[idx], ad, kategori, ikon, aciklama };
  localStorage.setItem("denetim_birimler", JSON.stringify(liste));

  document.getElementById("birimDuzenleModal")?.remove();
  secilenBirim = liste[idx];
  birimlerSayfasi();
  setTimeout(() => birimSec(birimId), 50);
  basariToast(`✅ "${ad}" güncellendi.`);
}

// ============================================================
// BİRİM SİL
// ============================================================
function birimSil(birimId) {
  const liste = birimlerGetir();
  const b     = liste.find(x => x.id === birimId);
  if (!b) return;
  if (!confirm(`"${b.ad}" birimi silinecek. Emin misiniz?`)) return;

  const guncel = liste.filter(x => x.id !== birimId);
  localStorage.setItem("denetim_birimler", JSON.stringify(guncel));
  secilenBirim = null;
  birimlerSayfasi();
  basariToast(`🗑 "${b.ad}" silindi.`);
}

// ============================================================
// YARDIMCI — tanımlı değilse
// ============================================================
if (typeof hataGoster === "undefined") {
  window.hataGoster = function(el, mesaj) {
    if (!el) return;
    el.textContent   = mesaj;
    el.style.display = "block";
    setTimeout(() => { el.style.display = "none"; }, 3000);
  };
}

if (typeof basariToast === "undefined") {
  window.basariToast = function(mesaj) {
    const t = document.createElement("div");
    t.style.cssText = `
      position:fixed; bottom:24px; right:24px;
      background:#1e293b; color:white;
      padding:14px 20px; border-radius:12px;
      font-size:14px; font-weight:600;
      box-shadow:0 8px 24px rgba(0,0,0,0.2); z-index:9999`;
    t.textContent = mesaj;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };
}