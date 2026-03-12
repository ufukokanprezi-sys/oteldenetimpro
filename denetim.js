// ============================================================
// denetim.js — Yeni Denetim Modülü
// Seçimli Birim | Puanlama | Taslak | localStorage Kayıt
// ============================================================

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================
function bugunTarih() {
  const d = new Date();
  return `${d.getDate().toString().padStart(2,'0')}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getFullYear()}`;
}

function benzersizId() {
  return "dnt_" + Date.now() + "_" + Math.random().toString(36).substr(2,6);
}

// ============================================================
// ✅ DEĞİŞEN 4 FONKSİYON — ŞIFRELI VERSİYON
// ============================================================

async function denetimleriKaydet(liste) {
  try {
    if (typeof EncryptionManager !== "undefined") {
      await EncryptionManager.setItem("denetim_kayitlar", liste);
    } else {
      localStorage.setItem("denetim_kayitlar", JSON.stringify(liste));
    }
  } catch(e) {
    localStorage.setItem("denetim_kayitlar", JSON.stringify(liste));
  }
}

// ✅ ROL BAZLI FİLTRELEME EKLENDİ
async function denetimleriGetir() {
  let tumListe = [];
  try {
    if (typeof EncryptionManager !== "undefined") {
      tumListe = await EncryptionManager.getItem("denetim_kayitlar") || [];
    } else {
      const ham = localStorage.getItem("denetim_kayitlar");
      tumListe = ham ? JSON.parse(ham) : [];
    }
  } catch(e) {
    const ham = localStorage.getItem("denetim_kayitlar");
    tumListe = ham ? JSON.parse(ham) : [];
  }
  const aktifKullanici = aktifKullaniciyiGetir();
  if (!aktifKullanici) return [];
  // Admin → hepsini gör | Denetçi → sadece kendi kayıtları
  if (aktifKullanici.rol === 'admin') return tumListe;
  return tumListe.filter(d => d.denetciId === aktifKullanici.id);
}

async function taslaklariGetir() {
  try {
    if (typeof EncryptionManager !== "undefined") {
      return await EncryptionManager.getItem("denetim_taslaklar") || [];
    }
  } catch(e) {}
  const ham = localStorage.getItem("denetim_taslaklar");
  return ham ? JSON.parse(ham) : [];
}

async function taslaklariKaydet(liste) {
  try {
    if (typeof EncryptionManager !== "undefined") {
      await EncryptionManager.setItem("denetim_taslaklar", liste); return;
    }
  } catch(e) {}
  localStorage.setItem("denetim_taslaklar", JSON.stringify(liste));
}

// ============================================================
// ANA GİRİŞ — Yeni Denetim Sayfası
// ============================================================

// ============================================================
// YENİ DENETİM SAYFASI — Admin: Atama yap | Denetçi: Görevleri gör
// ============================================================
async function denetimSayfasi() {
  const aktifKullanici = aktifKullaniciyiGetir();
  if (!aktifKullanici) { window.location.href = 'index.html'; return; }

  const adminMi = aktifKullanici.rol === 'admin';

  if (adminMi) {
    await adminAtamaSayfasi(aktifKullanici);
  } else {
    await denetciGorevlerim(aktifKullanici);
  }
}

// ============================================================
// ADMİN — Atama Yönetim Sayfası
// ============================================================
async function adminAtamaSayfasi(aktif) {
  const atamalar   = atamalariGetir();
  const kullanicilar = (typeof kullaniclariGetir === "function") ? kullaniclariGetir() : [];
  const denetciler = kullanicilar.filter(k => k.aktif !== false);
  const oteller    = (typeof otelleriGetir === "function") ? otelleriGetir() : [];

  // Durum renkleri
  const durumRenk = {
    bekliyor  : { renk:"#f59e0b", bg:"#fffbeb", etiket:"Bekliyor",   ikon:"⏳" },
    devam     : { renk:"#3b82f6", bg:"#eff6ff", etiket:"Devam Ediyor",ikon:"🔄" },
    tamamlandi: { renk:"#22c55e", bg:"#f0fdf4", etiket:"Tamamlandı", ikon:"✅" },
    iptal     : { renk:"#94a3b8", bg:"#f8fafc", etiket:"İptal",      ikon:"❌" },
  };

  // İstatistikler
  const bekleyenSayi    = atamalar.filter(a => a.durum === "bekliyor").length;
  const devamSayi       = atamalar.filter(a => a.durum === "devam").length;
  const tamamlananSayi  = atamalar.filter(a => a.durum === "tamamlandi").length;

  // Atama kartları
  const atamaKartlari = atamalar.length === 0
    ? `<div style="text-align:center;padding:48px 20px;color:#94a3b8">
         <div style="font-size:48px;margin-bottom:12px">📋</div>
         <p style="font-size:14px">Henüz atama yapılmadı.<br>Sağ üstten yeni atama ekleyebilirsiniz.</p>
       </div>`
    : [...atamalar].reverse().map(a => {
        const dr = durumRenk[a.durum] || durumRenk.bekliyor;
        const denetciKullanici = kullanicilar.find(k => k.id === a.denetciId);
        return `
          <div style="background:white;border-radius:14px;border:2px solid #f1f5f9;
               padding:18px 20px;margin-bottom:12px;transition:box-shadow 0.2s"
               onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'"
               onmouseout="this.style.boxShadow='none'">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">

              <!-- Sol: Bilgiler -->
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
                  <span style="font-size:16px;font-weight:800;color:#1e293b">${a.otelAdi}</span>
                  <span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
                       background:${dr.bg};color:${dr.renk}">${dr.ikon} ${dr.etiket}</span>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:16px;font-size:12px;color:#64748b">
                  <span>🕵️ <strong>${a.denetciAd || "—"}</strong>
                    <span style="color:#94a3b8">(${denetciKullanici?.kullaniciAdi || "—"})</span>
                  </span>
                  <span>📅 ${a.tarih || "—"}</span>
                  <span>🏢 ${(a.birimler||[]).length} birim</span>
                  <span style="color:${a.tur==='gizli'?'#8b5cf6':'#64748b'}">
                    ${a.tur === "gizli" ? "🎭 Gizli Müşteri" : a.tur === "acik" ? "📢 Açık Denetim" : "⚡ Ani Denetim"}
                  </span>
                </div>
                ${a.notlar ? `<div style="margin-top:8px;font-size:12px;color:#94a3b8;
                  background:#f8fafc;border-radius:8px;padding:7px 10px">
                  📝 ${a.atamaNotu}
                </div>` : ""}
              </div>

              <!-- Sağ: Butonlar -->
              <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
                ${a.durum === "bekliyor" ? `
                  <button onclick="atamaIptalEt('${a.id}')"
                    style="padding:6px 12px;background:#fef2f2;color:#ef4444;border:none;
                    border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap">
                    ❌ İptal
                  </button>
                  <button onclick="atamaDuzenle('${a.id}')"
                    style="padding:6px 12px;background:#eff6ff;color:#3b82f6;border:none;
                    border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap">
                    ✏️ Düzenle
                  </button>` : ""}
                ${a.durum === "tamamlandi" ? `
                  <button onclick="atamaRaporuGoster('${a.denetimId || ""}')"
                    style="padding:6px 12px;background:#f0fdf4;color:#22c55e;border:none;
                    border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap">
                    📊 Raporu Gör
                  </button>` : ""}
                <button onclick="atamaSil('${a.id}')"
                  style="padding:6px 12px;background:#f8fafc;color:#94a3b8;border:none;
                  border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap">
                  🗑 Sil
                </button>
              </div>
            </div>
          </div>`;
      }).join("");

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="max-width:900px;margin:0 auto">

      <!-- Üst bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;
           flex-wrap:wrap;gap:12px;margin-bottom:20px">
        <div>
          <div style="font-size:13px;color:#94a3b8">${atamalar.length} toplam atama</div>
        </div>
        <button onclick="yeniAtamaModal()"
          style="padding:12px 22px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);
          color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;
          cursor:pointer;display:flex;align-items:center;gap:8px">
          ➕ Yeni Atama Yap
        </button>
      </div>

      <!-- Özet kartlar -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px">
        ${[
          { ikon:"⏳", renk:"#f59e0b", bg:"#fffbeb", deger:bekleyenSayi,   etiket:"Bekleyen" },
          { ikon:"🔄", renk:"#3b82f6", bg:"#eff6ff", deger:devamSayi,      etiket:"Devam Eden" },
          { ikon:"✅", renk:"#22c55e", bg:"#f0fdf4", deger:tamamlananSayi, etiket:"Tamamlanan" },
        ].map(s=>`
          <div style="background:white;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.07);
               padding:16px 20px;display:flex;align-items:center;gap:14px">
            <div style="width:44px;height:44px;border-radius:12px;background:${s.bg};
                 display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${s.ikon}</div>
            <div>
              <div style="font-size:26px;font-weight:800;color:${s.renk};line-height:1">${s.deger}</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:3px">${s.etiket}</div>
            </div>
          </div>`).join("")}
      </div>

      <!-- Filtre sekmeleri -->
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        ${["tumu","bekliyor","devam","tamamlandi"].map((d,i)=>{
          const etiketler = ["Tümü","Bekleyen","Devam Eden","Tamamlanan"];
          const sayilar   = [atamalar.length, bekleyenSayi, devamSayi, tamamlananSayi];
          return `<button id="atamaFiltre_${d}"
            onclick="atamaFiltrele('${d}')"
            style="padding:8px 16px;border-radius:20px;font-size:12px;font-weight:700;
            cursor:pointer;border:2px solid ${i===0?'#3b82f6':'#e2e8f0'};
            background:${i===0?'#3b82f6':'white'};
            color:${i===0?'white':'#64748b'};transition:all 0.2s">
            ${etiketler[i]} (${sayilar[i]})
          </button>`;
        }).join("")}
      </div>

      <!-- Atama listesi -->
      <div id="atamaListesi">${atamaKartlari}</div>
    </div>`;
}

// ============================================================
// DENETÇİ — Görev Listesi (atama yapamaz, sadece görür)
// ============================================================
async function denetciGorevlerim(aktif) {
  const atamalar  = atamalariGetir();
  const benim     = atamalar.filter(a => a.denetciId === aktif.id && a.durum !== "iptal");
  const taslaklar = await taslaklariGetir();
  const benimTaslaklar = taslaklar.filter(t => t.denetciId === aktif.id);

  const durumRenk = {
    bekliyor  : { renk:"#f59e0b", bg:"#fffbeb", etiket:"Bekliyor",    ikon:"⏳" },
    devam     : { renk:"#3b82f6", bg:"#eff6ff", etiket:"Devam Ediyor", ikon:"🔄" },
    tamamlandi: { renk:"#22c55e", bg:"#f0fdf4", etiket:"Tamamlandı",  ikon:"✅" },
  };

  // Taslak kartları
  let taslakHTML = "";
  if (benimTaslaklar.length > 0) {
    taslakHTML = `
      <div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:14px;
           padding:18px 20px;margin-bottom:20px">
        <div style="font-size:14px;font-weight:700;color:#92400e;margin-bottom:12px">
          📝 Kayıtlı Taslaklar (${benimTaslaklar.length})
        </div>
        ${benimTaslaklar.map(t=>`
          <div style="display:flex;align-items:center;gap:12px;
               background:white;border-radius:10px;padding:12px 16px;
               margin-bottom:8px;border:1px solid #fde68a">
            <div style="flex:1">
              <strong style="font-size:14px">${t.otelAdi || "İsimsiz Otel"}</strong>
              <div style="font-size:12px;color:#94a3b8;margin-top:2px">
                ${t.tarih} — ${t.secilenBirimler?.length || 0} birim
              </div>
            </div>
            <button onclick="taslakDevamEt('${t.id}')"
              style="padding:8px 14px;background:#f59e0b;color:white;border:none;
              border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">
              Devam Et →
            </button>
            <button onclick="taslakSil('${t.id}')"
              style="padding:8px 10px;background:#fef2f2;color:#ef4444;border:none;
              border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">✕</button>
          </div>`).join("")}
      </div>`;
  }

  // Atama kartları
  const gorevKartlari = benim.length === 0
    ? `<div style="text-align:center;padding:64px 20px;color:#94a3b8">
         <div style="font-size:56px;margin-bottom:16px">📭</div>
         <div style="font-size:18px;font-weight:700;color:#374151;margin-bottom:8px">
           Bekleyen göreviniz yok
         </div>
         <p style="font-size:14px;line-height:1.7">
           Size atanmış bir denetim görevi bulunmuyor.<br>
           Yeni görevler için yöneticinizle iletişime geçin.
         </p>
       </div>`
    : benim.map(a => {
        const dr = durumRenk[a.durum] || durumRenk.bekliyor;
        const bekliyor = a.durum === "bekliyor";
        const devamEdiyor = a.durum === "devam";
        return `
          <div style="background:white;border-radius:16px;border:2px solid ${bekliyor?'#f59e0b':devamEdiyor?'#3b82f6':'#e2e8f0'};
               padding:20px 24px;margin-bottom:14px;transition:box-shadow 0.2s"
               onmouseover="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.1)'"
               onmouseout="this.style.boxShadow='none'">

            <!-- Üst satır -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px">
              <div>
                <div style="font-size:18px;font-weight:800;color:#1e293b;margin-bottom:4px">
                  🏨 ${a.otelAdi}
                </div>
                <span style="padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;
                     background:${dr.bg};color:${dr.renk}">${dr.ikon} ${dr.etiket}</span>
              </div>
              ${bekliyor || devamEdiyor ? `
                <button onclick="gorevDenetime('${a.id}')"
                  style="padding:12px 20px;
                  background:linear-gradient(135deg,${bekliyor?'#f59e0b,#d97706':'#3b82f6,#1d4ed8'});
                  color:white;border:none;border-radius:12px;font-size:14px;
                  font-weight:700;cursor:pointer;flex-shrink:0;white-space:nowrap">
                  ${bekliyor ? "▶ Denetime Başla" : "🔄 Devam Et"}
                </button>` : ""}
            </div>

            <!-- Detay bilgiler -->
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
                 gap:10px;padding:14px;background:#f8fafc;border-radius:10px">
              ${[
                { ikon:"📅", etiket:"Tarih",  deger: a.tarih || "—" },
                { ikon:"🏢", etiket:"Birim",  deger: (a.birimler||[]).length + " birim" },
                { ikon:"🎭", etiket:"Tür",    deger: a.tur==="gizli"?"Gizli Müşteri":a.tur==="acik"?"Açık Denetim":"Ani Denetim" },
                { ikon:"👑", etiket:"Atayan", deger: a.olusturanAd || "Admin" },
              ].map(d=>`
                <div style="text-align:center">
                  <div style="font-size:18px">${d.ikon}</div>
                  <div style="font-size:11px;color:#94a3b8;margin-top:2px">${d.etiket}</div>
                  <div style="font-size:13px;font-weight:700;color:#374151;margin-top:2px">${d.deger}</div>
                </div>`).join("")}
            </div>

            ${a.atamaNotu ? `
              <div style="margin-top:12px;padding:10px 14px;background:#fffbeb;
                   border-radius:10px;border-left:3px solid #f59e0b;
                   font-size:13px;color:#92400e">
                📝 <strong>Admin Notu:</strong> ${a.atamaNotu}
              </div>` : ""}
          </div>`;
      }).join("");

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="max-width:720px;margin:0 auto">

      <!-- Hoşgeldin banner -->
      <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986);
           border-radius:16px;padding:20px 24px;margin-bottom:20px;color:white;
           display:flex;align-items:center;gap:16px">
        <div style="font-size:40px">🕵️</div>
        <div>
          <div style="font-size:16px;font-weight:800;margin-bottom:2px">
            Görevlerim — ${aktif.kullaniciAdi}
          </div>
          <div style="font-size:13px;opacity:0.7">
            ${benim.filter(a=>a.durum==="bekliyor").length} bekleyen ·
            ${benim.filter(a=>a.durum==="devam").length} devam eden ·
            ${benim.filter(a=>a.durum==="tamamlandi").length} tamamlanan
          </div>
        </div>
      </div>

      ${taslakHTML}
      ${gorevKartlari}
    </div>`;
}

// ============================================================
// YENİ ATAMA MODAL
// ============================================================
function yeniAtamaModal() {
  const kullanicilar = (typeof kullaniclariGetir === "function") ? kullaniclariGetir() : [];
  const denetciler   = kullanicilar.filter(k => k.aktif !== false);
  const oteller      = (typeof otelleriGetir === "function") ? otelleriGetir() : [];
  const aktif        = aktifKullaniciyiGetir() || {};

  const modal = document.createElement("div");
  modal.id = "atamaModal";
  modal.style.cssText = "position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:20px";

  const bugun = new Date();
  const bugunStr = `${bugun.getFullYear()}-${(bugun.getMonth()+1).toString().padStart(2,'0')}-${bugun.getDate().toString().padStart(2,'0')}`;

  modal.innerHTML = `
    <div style="background:white;border-radius:20px;width:100%;max-width:640px;
         box-shadow:0 24px 64px rgba(0,0,0,0.3);max-height:92vh;overflow-y:auto">

      <!-- Başlık -->
      <div style="padding:22px 26px 18px;border-bottom:1px solid #f1f5f9;
           position:sticky;top:0;background:white;z-index:1;
           display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:18px;font-weight:800;color:#1e293b">➕ Yeni Denetim Ataması</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:2px">Denetçiye görev ata</div>
        </div>
        <button onclick="document.getElementById('atamaModal').remove()"
          style="width:32px;height:32px;border-radius:50%;background:#f1f5f9;border:none;
          font-size:16px;cursor:pointer;color:#64748b">✕</button>
      </div>

      <div style="padding:22px 26px;display:grid;gap:16px">

        <!-- Denetçi Seç -->
        <div>
          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#374151">
            🕵️ Denetçi *
          </label>
          <select id="atama_denetci"
            style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
            font-size:14px;outline:none;background:white;cursor:pointer"
            onchange="atamaDenetciDegisti()"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'">
            <option value="">-- Denetçi Seçin --</option>
            ${denetciler.map(k=>`
              <option value="${k.id}" data-ad="${k.kullaniciAdi}">
                ${k.rol === "admin" ? "👑" : "🕵️"} ${k.kullaniciAdi} (${k.rol === "admin" ? "Admin" : "Denetçi"})
              </option>`).join("")}
          </select>
        </div>

        <!-- Otel Adı -->
        <div>
          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#374151">
            🏨 Otel Adı *
          </label>
          ${oteller.length > 0
            ? `<select id="atama_otelAdi"
                style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
                font-size:14px;outline:none;background:white;cursor:pointer"
                onfocus="this.style.borderColor='#3b82f6'"
                onblur="this.style.borderColor='#e2e8f0'">
                <option value="">-- Otel Seçin --</option>
                ${oteller.map(o=>`<option value="${o.ad}">${o.ad}${o.sehir?" — "+o.sehir:""}</option>`).join("")}
                <option value="__manuel__">✏️ Manuel gir...</option>
              </select>
              <input id="atama_otelAdiManuel" type="text" placeholder="Otel adını yazın..."
                style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
                font-size:14px;outline:none;margin-top:8px;display:none;box-sizing:border-box"
                onfocus="this.style.borderColor='#3b82f6'"
                onblur="this.style.borderColor='#e2e8f0'">`
            : `<input id="atama_otelAdiManuel" type="text" placeholder="Otel adını yazın..."
                style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
                font-size:14px;outline:none;box-sizing:border-box"
                onfocus="this.style.borderColor='#3b82f6'"
                onblur="this.style.borderColor='#e2e8f0'">`}
        </div>

        <!-- Tarih + Tür -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <div>
            <label style="display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#374151">📅 Tarih *</label>
            <input id="atama_tarih" type="date" value="${bugunStr}"
              style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
              font-size:14px;outline:none;box-sizing:border-box"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
          </div>
          <div>
            <label style="display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#374151">🎭 Denetim Türü</label>
            <select id="atama_tur"
              style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
              font-size:14px;outline:none;background:white;cursor:pointer"
              onfocus="this.style.borderColor='#3b82f6'"
              onblur="this.style.borderColor='#e2e8f0'">
              <option value="gizli">🎭 Gizli Müşteri</option>
              <option value="acik">📢 Açık Denetim</option>
              <option value="ani">⚡ Ani Denetim</option>
            </select>
          </div>
        </div>

        <!-- Birim Seçimi -->
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <label style="font-size:13px;font-weight:700;color:#374151">🏢 Denetlenecek Birimler *</label>
            <div style="display:flex;gap:6px">
              <button onclick="atamaTumunuSec(true)"
                style="padding:5px 12px;background:#eff6ff;color:#3b82f6;border:none;
                border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">Tümü</button>
              <button onclick="atamaTumunuSec(false)"
                style="padding:5px 12px;background:#f1f5f9;color:#64748b;border:none;
                border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">Temizle</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
               gap:8px;max-height:220px;overflow-y:auto;padding:2px">
            ${DENETIM_VERITABANI.map(b=>`
              <label id="atamaLabel_${b.id}"
                style="display:flex;align-items:center;gap:8px;padding:9px 12px;
                border:2px solid #e2e8f0;border-radius:9px;cursor:pointer;
                transition:all 0.15s;user-select:none"
                onclick="atamaBirimToggle('${b.id}')">
                <input type="checkbox" id="atamaChk_${b.id}"
                  style="width:15px;height:15px;cursor:pointer;accent-color:#3b82f6"
                  onclick="event.stopPropagation();atamaBirimToggle('${b.id}')">
                <span style="font-size:12px;font-weight:500;line-height:1.3;color:#374151">
                  ${b.sira}. ${b.birimAdi}
                </span>
              </label>`).join("")}
          </div>
          <div id="atamaSecimOzet" style="margin-top:8px;padding:8px 14px;
               background:#f8fafc;border-radius:8px;font-size:12px;color:#94a3b8;text-align:center">
            Birim seçilmedi
          </div>
        </div>

        <!-- Admin Notu -->
        <div>
          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#374151">
            📝 Atama Notu <span style="font-weight:400;color:#94a3b8">(isteğe bağlı)</span>
          </label>
          <textarea id="atama_not" rows="2" placeholder="Denetçiye özel talimat veya bilgi..."
            style="width:100%;padding:12px 14px;border:2px solid #e2e8f0;border-radius:10px;
            font-size:14px;outline:none;resize:vertical;font-family:inherit;box-sizing:border-box"
            onfocus="this.style.borderColor='#3b82f6'"
            onblur="this.style.borderColor='#e2e8f0'"></textarea>
        </div>

        <div id="atamaHata" style="display:none;padding:10px 14px;background:#fef2f2;
          border-radius:9px;font-size:13px;color:#ef4444;font-weight:600"></div>
      </div>

      <!-- Footer Butonlar -->
      <div style="padding:0 26px 22px;display:flex;gap:10px;justify-content:flex-end">
        <button onclick="document.getElementById('atamaModal').remove()"
          style="padding:12px 20px;background:#f1f5f9;color:#64748b;border:none;
          border-radius:10px;font-size:14px;font-weight:700;cursor:pointer">İptal</button>
        <button onclick="atamaKaydet()"
          style="padding:12px 28px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);
          color:white;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer">
          ✅ Görevi Ata
        </button>
      </div>
    </div>`;

  modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);

  // Manuel otel girişi toggle
  const otelSelect = document.getElementById("atama_otelAdi");
  if (otelSelect) {
    otelSelect.addEventListener("change", function() {
      const manuel = document.getElementById("atama_otelAdiManuel");
      if (manuel) manuel.style.display = this.value === "__manuel__" ? "block" : "none";
    });
  }
}

// Atama modalı birim seçimi
const _atamaSecilen = new Set();
function atamaBirimToggle(id) {
  const chk   = document.getElementById("atamaChk_"   + id);
  const label = document.getElementById("atamaLabel_" + id);
  if (_atamaSecilen.has(id)) {
    _atamaSecilen.delete(id);
    if (chk)   chk.checked            = false;
    if (label) { label.style.borderColor = "#e2e8f0"; label.style.background = "white"; }
  } else {
    _atamaSecilen.add(id);
    if (chk)   chk.checked            = true;
    if (label) { label.style.borderColor = "#3b82f6"; label.style.background = "#eff6ff"; }
  }
  const ozet = document.getElementById("atamaSecimOzet");
  if (ozet) ozet.textContent = _atamaSecilen.size > 0
    ? `${_atamaSecilen.size} birim seçildi`
    : "Birim seçilmedi";
}
function atamaTumunuSec(sec) {
  _atamaSecilen.clear();
  DENETIM_VERITABANI.forEach(b => {
    const chk   = document.getElementById("atamaChk_"   + b.id);
    const label = document.getElementById("atamaLabel_" + b.id);
    if (!chk || !label) return;
    if (sec) {
      _atamaSecilen.add(b.id);
      chk.checked            = true;
      label.style.borderColor = "#3b82f6";
      label.style.background  = "#eff6ff";
    } else {
      chk.checked            = false;
      label.style.borderColor = "#e2e8f0";
      label.style.background  = "white";
    }
  });
  const ozet = document.getElementById("atamaSecimOzet");
  if (ozet) ozet.textContent = _atamaSecilen.size > 0 ? `${_atamaSecilen.size} birim seçildi` : "Birim seçilmedi";
}

function atamaKaydet() {
  const denetciId  = document.getElementById("atama_denetci")?.value || "";
  const denetciOpt = document.querySelector("#atama_denetci option:checked");
  const denetciAd  = denetciOpt?.dataset?.ad || denetciOpt?.textContent?.trim() || "";

  // Otel adı
  let otelAdi = "";
  const otelSelect = document.getElementById("atama_otelAdi");
  if (otelSelect) {
    otelAdi = otelSelect.value === "__manuel__" || otelSelect.value === ""
      ? (document.getElementById("atama_otelAdiManuel")?.value || "").trim()
      : otelSelect.value;
  } else {
    otelAdi = (document.getElementById("atama_otelAdiManuel")?.value || "").trim();
  }

  const tarihRaw = document.getElementById("atama_tarih")?.value || "";
  const tur      = document.getElementById("atama_tur")?.value   || "gizli";
  const atamaNot = (document.getElementById("atama_not")?.value  || "").trim();
  const birimler = [..._atamaSecilen];
  const aktif    = aktifKullaniciyiGetir() || {};
  const hataEl   = document.getElementById("atamaHata");

  const goster = (msg) => { hataEl.textContent = msg; hataEl.style.display = "block"; };

  if (!denetciId)       { goster("Denetçi seçiniz."); return; }
  if (!otelAdi)         { goster("Otel adı giriniz."); return; }
  if (!tarihRaw)        { goster("Tarih seçiniz."); return; }
  if (birimler.length === 0) { goster("En az bir birim seçiniz."); return; }

  // Tarihi DD.MM.YYYY'ye çevir
  const p = tarihRaw.split("-");
  const tarih = p.length === 3 ? `${p[2]}.${p[1]}.${p[0]}` : tarihRaw;

  // Denetçi adını kullanıcı listesinden al
  const kullanicilar = (typeof kullaniclariGetir === "function") ? kullaniclariGetir() : [];
  const denetciKul   = kullanicilar.find(k => k.id === denetciId);
  const denetciAdFinal = denetciKul?.kullaniciAdi || denetciAd;

  const yeniAtama = {
    id           : "atm_" + Date.now(),
    denetciId,
    denetciAd    : denetciAdFinal,
    otelAdi,
    tarih,
    tur,
    birimler,
    atamaNotu    : atamaNot,
    durum        : "bekliyor",
    olusturanId  : aktif.id,
    olusturanAd  : aktif.kullaniciAdi || "Admin",
    olusturmaTarihi: new Date().toISOString()
  };

  const liste = atamalariGetir();
  liste.push(yeniAtama);
  atamalariKaydet(liste);
  _atamaSecilen.clear();
  document.getElementById("atamaModal")?.remove();
  adminAtamaSayfasi(aktif);
  if (typeof _basariToast === "function")
    _basariToast("✅ " + denetciAdFinal + " kişisine atama yapıldı.");
}

// ============================================================
// ATAMA İPTAL / SİL / DÜZENLE
// ============================================================
function atamaIptalEt(atamaId) {
  if (!confirm("Bu atamayı iptal etmek istediğinize emin misiniz?")) return;
  const liste = atamalariGetir();
  const idx   = liste.findIndex(a => a.id === atamaId);
  if (idx === -1) return;
  liste[idx].durum = "iptal";
  atamalariKaydet(liste);
  denetimSayfasi();
}
function atamaSil(atamaId) {
  if (!confirm("Bu atama kaydı silinecek. Emin misiniz?")) return;
  atamalariKaydet(atamalariGetir().filter(a => a.id !== atamaId));
  denetimSayfasi();
}
function atamaRaporuGoster(denetimId) {
  if (!denetimId) { alert("Rapor henüz mevcut değil."); return; }
  sayfaGit("raporlar", null);
}

// ============================================================
// DENETÇİ — Atanmış görevi başlatır
// ============================================================
function gorevDenetime(atamaId) {
  const atamalar = atamalariGetir();
  const atama    = atamalar.find(a => a.id === atamaId);
  if (!atama) return;

  // Atamayı "devam" durumuna geçir
  const idx = atamalar.findIndex(a => a.id === atamaId);
  if (idx > -1 && atamalar[idx].durum === "bekliyor") {
    atamalar[idx].durum = "devam";
    atamalariKaydet(atamalar);
  }

  // _aktifDenetim'e ata ve denetim formunu göster
  _aktifAtamaId = atamaId;
  _secilenBirimler.clear();
  atama.birimler.forEach(b => _secilenBirimler.add(b));

  const aktif = aktifKullaniciyiGetir() || {};
  const p     = atama.tarih.split(".");
  const tarihISO = p.length === 3 ? `${p[2]}-${p[1]}-${p[0]}` : "";

  _aktifDenetim = {
    id              : benzersizId(),
    atamaId         : atamaId,
    denetciId       : aktif.id,
    denetciAd       : aktif.kullaniciAdi || "",
    denetciRol      : aktif.rol || "denetci",
    denetci         : aktif.kullaniciAdi,
    otelAdi         : atama.otelAdi,
    tarih           : atama.tarih,
    tur             : atama.tur,
    genelNot        : atama.atamaNotu || "",
    secilenBirimler : atama.birimler,
    cevaplar        : {},
    aktifBirimIndex : 0,
    baslangic       : new Date().toISOString()
  };

  birimDenetimGoster(0);
}

// Aktif atama ID'si (denetim tamamlandığında güncellenir)
let _aktifAtamaId = null;

// ============================================================
// ATAMA FİLTRELE
// ============================================================
function atamaFiltrele(durum) {
  // Sekme stillerini güncelle
  ["tumu","bekliyor","devam","tamamlandi"].forEach(d => {
    const btn = document.getElementById("atamaFiltre_" + d);
    if (!btn) return;
    if (d === durum) {
      btn.style.background   = "#3b82f6";
      btn.style.borderColor  = "#3b82f6";
      btn.style.color        = "white";
    } else {
      btn.style.background   = "white";
      btn.style.borderColor  = "#e2e8f0";
      btn.style.color        = "#64748b";
    }
  });

  const kullanicilar = (typeof kullaniclariGetir === "function") ? kullaniclariGetir() : [];
  const durumRenk = {
    bekliyor  : { renk:"#f59e0b", bg:"#fffbeb", etiket:"Bekliyor",    ikon:"⏳" },
    devam     : { renk:"#3b82f6", bg:"#eff6ff", etiket:"Devam Ediyor", ikon:"🔄" },
    tamamlandi: { renk:"#22c55e", bg:"#f0fdf4", etiket:"Tamamlandı",  ikon:"✅" },
    iptal     : { renk:"#94a3b8", bg:"#f8fafc", etiket:"İptal",       ikon:"❌" },
  };

  const tumu = atamalariGetir();
  const liste = durum === "tumu" ? tumu : tumu.filter(a => a.durum === durum);
  const el    = document.getElementById("atamaListesi");
  if (!el) return;

  if (liste.length === 0) {
    el.innerHTML = `<div style="text-align:center;padding:40px;color:#94a3b8;font-size:14px">Bu durumda atama bulunamadı.</div>`;
    return;
  }

  el.innerHTML = [...liste].reverse().map(a => {
    const dr = durumRenk[a.durum] || durumRenk.bekliyor;
    const denetciKul = kullanicilar.find(k => k.id === a.denetciId);
    return `
      <div style="background:white;border-radius:14px;border:2px solid #f1f5f9;
           padding:18px 20px;margin-bottom:12px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
              <span style="font-size:16px;font-weight:800;color:#1e293b">${a.otelAdi}</span>
              <span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
                   background:${dr.bg};color:${dr.renk}">${dr.ikon} ${dr.etiket}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:16px;font-size:12px;color:#64748b">
              <span>🕵️ <strong>${a.denetciAd||"—"}</strong> <span style="color:#94a3b8">(${denetciKul?.kullaniciAdi||"—"})</span></span>
              <span>📅 ${a.tarih||"—"}</span>
              <span>🏢 ${(a.birimler||[]).length} birim</span>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
            ${a.durum==="bekliyor"?`
              <button onclick="atamaIptalEt('${a.id}')" style="padding:6px 12px;background:#fef2f2;color:#ef4444;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">❌ İptal</button>
              <button onclick="atamaDuzenle('${a.id}')" style="padding:6px 12px;background:#eff6ff;color:#3b82f6;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer">✏️ Düzenle</button>`:""
            }
            <button onclick="atamaSil('${a.id}')" style="padding:6px 12px;background:#f8fafc;color:#94a3b8;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">🗑 Sil</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function atamaDuzenle(atamaId) {
  // Basit: mevcut atamayı sil, modal'ı dolu açar
  alert("Düzenleme: önce atamayı silin, sonra yeni atama yapın.");
}
function atamaDenetciDegisti() { /* ileride kullanılabilir */ }

// ============================================================
// DENETİM TAMAMLANDIĞINDA ATAMAYÜ GÜNCELLE
// ============================================================
// denetimTamamla fonksiyonunun sonuna eklenir
const _orijinalDenetimTamamla = typeof denetimTamamla === "function" ? denetimTamamla : null;

// ============================================================
// BİRİM SEÇİM
// ============================================================
const _secilenBirimler = new Set();

function birimSecToggle(birimId) {
  const chk   = document.getElementById("birimChk_" + birimId);
  const label = document.getElementById("birimLabel_" + birimId);
  if (_secilenBirimler.has(birimId)) {
    _secilenBirimler.delete(birimId);
    chk.checked = false;
    label.style.borderColor  = "#e2e8f0";
    label.style.background   = "white";
    label.style.color        = "inherit";
  } else {
    _secilenBirimler.add(birimId);
    chk.checked = true;
    label.style.borderColor  = "#3b82f6";
    label.style.background   = "#eff6ff";
    label.style.color        = "#1d4ed8";
  }
  secimOzetGuncelle();
}

function tumunuSec(sec) {
  _secilenBirimler.clear();
  DENETIM_VERITABANI.forEach(b => {
    const chk   = document.getElementById("birimChk_" + b.id);
    const label = document.getElementById("birimLabel_" + b.id);
    if (!chk || !label) return;
    if (sec) {
      _secilenBirimler.add(b.id);
      chk.checked = true;
      label.style.borderColor = "#3b82f6";
      label.style.background  = "#eff6ff";
      label.style.color       = "#1d4ed8";
    } else {
      chk.checked = false;
      label.style.borderColor = "#e2e8f0";
      label.style.background  = "white";
      label.style.color       = "inherit";
    }
  });
  secimOzetGuncelle();
}

function secimOzetGuncelle() {
  const el = document.getElementById("secimOzet");
  if (!el) return;
  const sayi = _secilenBirimler.size;
  if (sayi === 0) {
    el.textContent = "Henüz birim seçilmedi";
    el.style.color = "#94a3b8";
  } else {
    el.innerHTML = `<strong style="color:#3b82f6">${sayi} birim seçildi</strong>
      — Toplam <strong>${sayi * 40}</strong> soru doldurulacak`;
    el.style.color = "#64748b";
  }
}

// ============================================================
// FORM VERİSİ TOPLA
// ============================================================
function formVeriTopla() {
  return {
    otelAdi:        (document.getElementById("dnt_otelAdi")?.value  || "").trim(),
    tarih:          document.getElementById("dnt_tarih")?.value      || "",
    denetci:        document.getElementById("dnt_denetci")?.value    || "",
    tur:            document.getElementById("dnt_tur")?.value        || "gizli",
    genelNot:       document.getElementById("dnt_genelNot")?.value   || "",
    secilenBirimler: [..._secilenBirimler]
  };
}

function formDogrula(veri) {
  if (!veri.otelAdi)              { alert("Otel adı zorunludur.");          return false; }
  if (!veri.tarih)                { alert("Denetim tarihi zorunludur.");     return false; }
  if (veri.secilenBirimler.length === 0) { alert("En az bir birim seçmelisiniz."); return false; }
  return true;
}

// ============================================================
// TASLAK KAYDET — ✅ denetciId + denetciAd + denetciRol EKLENDİ
// ============================================================
async function taslakOlarakKaydet() {
  const aktif = aktifKullaniciyiGetir() || {};
  const veri  = formVeriTopla();
  if (!veri.otelAdi) { alert("Taslak için otel adı giriniz."); return; }

  const taslaklar = await taslaklariGetir();
  const yeni = {
    id:             benzersizId(),
    denetciId:      aktif.id,
    denetciAd:      aktif.ad       || aktif.kullaniciAdi || '',  // ✅ YENİ
    denetciRol:     aktif.rol      || 'denetci',                 // ✅ YENİ
    denetci:        aktif.kullaniciAdi,
    otelAdi:        veri.otelAdi,
    tarih:          veri.tarih ? tarihFormatla(veri.tarih) : bugunTarih(),
    tur:            veri.tur,
    genelNot:       veri.genelNot,
    secilenBirimler: veri.secilenBirimler,
    cevaplar:       {},
    olusturma:      new Date().toISOString()
  };

  taslaklar.push(yeni);
  await taslaklariKaydet(taslaklar);
  alert("✅ Taslak kaydedildi. Daha sonra devam edebilirsiniz.");
  denetimSayfasi();
}

async function taslakDevamEt(id) {
  const taslaklar = await taslaklariGetir();
  const taslak    = taslaklar.find(t => t.id === id);
  if (!taslak) return;

  denetimSayfasi();
  setTimeout(() => {
    document.getElementById("dnt_otelAdi").value  = taslak.otelAdi;
    document.getElementById("dnt_denetci").value  = taslak.denetci;
    document.getElementById("dnt_tur").value      = taslak.tur;
    document.getElementById("dnt_genelNot").value = taslak.genelNot || "";

    if (taslak.tarih) {
      const parcalar = taslak.tarih.split(".");
      if (parcalar.length === 3) {
        document.getElementById("dnt_tarih").value =
          `${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`;
      }
    }

    _secilenBirimler.clear();
    taslak.secilenBirimler.forEach(bid => birimSecToggle(bid));

    (async () => {
      const guncel = taslaklar.filter(t => t.id !== id);
      await taslaklariKaydet(guncel);
    })();

    sessionStorage.setItem("taslak_cevaplar", JSON.stringify(taslak.cevaplar || {}));
  }, 100);
}

async function taslakSil(id) {
  if (!confirm("Bu taslak silinecek. Emin misiniz?")) return;
  const liste  = await taslaklariGetir();
  const guncel = liste.filter(t => t.id !== id);
  await taslaklariKaydet(guncel);
  denetimSayfasi();
}

// ============================================================
// DENETİME BAŞLA — ✅ denetciId + denetciAd + denetciRol EKLENDİ
// ============================================================
let _aktifDenetim = null;

function denetimBaslat() {
  const veri = formVeriTopla();
  if (!formDogrula(veri)) return;

  const aktif = aktifKullaniciyiGetir() || {};
  const taslakCevaplar = JSON.parse(sessionStorage.getItem("taslak_cevaplar") || "{}");
  sessionStorage.removeItem("taslak_cevaplar");

  _aktifDenetim = {
    id:             benzersizId(),
    denetciId:      aktif.id,
    denetciAd:      aktif.ad       || aktif.kullaniciAdi || '',  // ✅ YENİ
    denetciRol:     aktif.rol      || 'denetci',                 // ✅ YENİ
    denetci:        veri.denetci || aktif.kullaniciAdi,
    otelAdi:        veri.otelAdi,
    tarih:          tarihFormatla(veri.tarih),
    tur:            veri.tur,
    genelNot:       veri.genelNot,
    secilenBirimler: veri.secilenBirimler,
    cevaplar:       taslakCevaplar,
    aktifBirimIndex: 0,
    baslangic:      new Date().toISOString()
  };

  birimDenetimGoster(0);
}

// ============================================================
// BİRİM DENETİM EKRANI
// ============================================================
function birimDenetimGoster(index) {
  const secilenIds = _aktifDenetim.secilenBirimler;
  if (index >= secilenIds.length) {
    denetimTamamla();
    return;
  }

  _aktifDenetim.aktifBirimIndex = index;
  const birimId = secilenIds[index];
  const birim   = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) { birimDenetimGoster(index + 1); return; }

  const toplamBirim    = secilenIds.length;
  const ilerlemeYuzde  = Math.round((index / toplamBirim) * 100);
  const mevcutCevap    = _aktifDenetim.cevaplar[birimId] || {};

  let bolumlerHTML = birim.bolumler.map((bolum, bi) => {
    const mevcutBolum = mevcutCevap[bolum.bolumNo] || {};
    let sorularHTML = "";
    if (bolum.tip === "score") {
      sorularHTML = bolum.sorular.map(soru => {
        const mevcutPuan = mevcutBolum.sorular?.[soru.id] ?? "";
        return `
          <div style="display:flex; align-items:center; gap:12px;
            padding:10px 0; border-bottom:1px solid #f8fafc"
            id="soruSatir_${soru.id}">
            <div style="flex:1; font-size:13px; line-height:1.5; color:#374151">
              <span style="color:#94a3b8; font-size:11px; margin-right:6px">${soru.sira}.</span>
              ${soru.metin}
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0">
              <input type="number" min="1" max="100"
                id="puan_${soru.id}" value="${mevcutPuan}" placeholder="—"
                style="width:64px; padding:8px; text-align:center;
                  border:2px solid #e2e8f0; border-radius:8px;
                  font-size:14px; font-weight:700; outline:none"
                oninput="puanGuncelle('${soru.id}','${birimId}',${bi})"
                onfocus="this.style.borderColor='#3b82f6'"
                onblur="this.style.borderColor='#e2e8f0'">
              <div id="puanRenk_${soru.id}" style="
                width:10px; height:10px; border-radius:50%;
                background:${mevcutPuan ? getRenkKod(mevcutPuan) : '#e2e8f0'};
                flex-shrink:0; transition:background 0.3s"></div>
            </div>
          </div>`;
      }).join("");
    }

    const bolumPuan = hesaplaBolumPuan(birimId, bolum.bolumNo);
    const renkBilgi = bolumPuan !== null ? getRenkBilgi(bolumPuan) : null;

    return `
      <div style="background:white; border-radius:14px; border:2px solid #f1f5f9;
        margin-bottom:16px; overflow:hidden" id="bolumKart_${birimId}_${bolum.bolumNo}">
        <div style="padding:14px 18px; background:#f8fafc; border-bottom:2px solid #f1f5f9;
          display:flex; align-items:center; justify-content:space-between">
          <div>
            <div style="font-size:14px; font-weight:700">${bolum.bolumNo}. ${bolum.bolumAdi}</div>
            <div style="font-size:12px; color:#94a3b8; margin-top:2px">${bolum.sorular?.length || 0} soru</div>
          </div>
          <div id="bolumPuanGoster_${birimId}_${bolum.bolumNo}" style="text-align:right">
            ${bolumPuan !== null ? `
              <div style="font-size:20px; font-weight:800; color:${renkBilgi.renk}">${bolumPuan}</div>
              <div style="font-size:10px; font-weight:700; color:${renkBilgi.renk}; white-space:nowrap">${renkBilgi.etiket}</div>`
            : `<div style="font-size:12px; color:#cbd5e1">Henüz girilmedi</div>`}
          </div>
        </div>
        <div style="padding:4px 18px 8px">
          ${sorularHTML}
          ${bolum.notZorunlu ? `
            <div style="margin-top:12px; padding-top:12px; border-top:1px solid #f1f5f9">
              <label style="font-size:12px; font-weight:600; color:#64748b; display:block; margin-bottom:6px">
                📝 Bölüm Notu ${bolum.notZorunlu ? '<span style="color:#ef4444">*</span>' : ''}
              </label>
              <textarea id="not_${birimId}_${bolum.bolumNo}"
                placeholder="Bu bölüme ait gözlem ve notlarınızı yazınız..."
                rows="2"
                style="width:100%; padding:10px 12px; border:2px solid #e2e8f0;
                  border-radius:8px; font-size:13px; resize:vertical; outline:none;
                  font-family:inherit; transition:border-color 0.2s"
                onfocus="this.style.borderColor='#3b82f6'"
                onblur="this.style.borderColor='#e2e8f0'"
              >${mevcutBolum.not || ""}</textarea>
            </div>` : ""}
        </div>
      </div>`;
  }).join("");

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="max-width:800px; margin:0 auto">
      <div style="background:white; border-radius:14px;
        box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:16px 20px; margin-bottom:20px">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px">
          <div>
            <span style="font-size:13px; font-weight:700; color:#3b82f6">Birim ${index+1} / ${toplamBirim}</span>
            <span style="font-size:13px; color:#94a3b8; margin-left:8px">${_aktifDenetim.otelAdi}</span>
          </div>
          <span style="font-size:13px; font-weight:700; color:#64748b">%${ilerlemeYuzde}</span>
        </div>
        <div style="height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden">
          <div style="height:100%; width:${ilerlemeYuzde}%;
            background:linear-gradient(90deg,#3b82f6,#60a5fa);
            border-radius:4px; transition:width 0.5s ease"></div>
        </div>
        <div style="display:flex; gap:6px; margin-top:12px; flex-wrap:wrap">
          ${secilenIds.map((bid, i) => {
            const b = DENETIM_VERITABANI.find(x => x.id === bid);
            const tamamlandi = _aktifDenetim.cevaplar[bid] !== undefined;
            const aktifMi    = i === index;
            return `<div style="padding:4px 10px; border-radius:20px; font-size:11px;
              font-weight:600; cursor:pointer; transition:all 0.2s;
              background:${aktifMi ? '#3b82f6' : tamamlandi ? '#dcfce7' : '#f1f5f9'};
              color:${aktifMi ? 'white' : tamamlandi ? '#16a34a' : '#94a3b8'};
              border:2px solid ${aktifMi ? '#3b82f6' : tamamlandi ? '#86efac' : '#e2e8f0'}"
              onclick="birimDenetimGoster(${i})" title="${b?.birimAdi || ''}">
              ${tamamlandi && !aktifMi ? '✓ ' : ''}${b?.sira || i+1}
            </div>`;
          }).join("")}
        </div>
      </div>

      <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986);
        border-radius:14px; padding:20px 24px; margin-bottom:20px;
        color:white; display:flex; align-items:center; justify-content:space-between">
        <div>
          <div style="font-size:11px; opacity:0.6; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px">
            Birim ${birim.sira} / ${DENETIM_VERITABANI.length}
          </div>
          <div style="font-size:22px; font-weight:800">${birim.birimAdi}</div>
          <div style="font-size:13px; opacity:0.7; margin-top:4px">
            ${birim.bolumler.length} bölüm — ${birim.bolumler.reduce((t,b) => t + (b.sorular?.length||0), 0)} soru
          </div>
        </div>
        <div id="birimGenelPuan" style="text-align:center">
          <div style="font-size:36px; font-weight:800; line-height:1">—</div>
          <div style="font-size:11px; opacity:0.6; margin-top:4px">Birim Puanı</div>
        </div>
      </div>

      ${bolumlerHTML}

      <div style="display:flex; gap:12px; justify-content:space-between;
        flex-wrap:wrap; margin-top:8px; padding-bottom:32px">
        <div style="display:flex; gap:8px">
          <button onclick="denetimIptal()" style="padding:12px 20px; background:#fef2f2;
            color:#ef4444; border:none; border-radius:10px; font-size:14px;
            font-weight:700; cursor:pointer">✕ İptal</button>
          <button onclick="araTaslagiKaydet()" style="padding:12px 20px; background:#fffbeb;
            color:#f59e0b; border:none; border-radius:10px; font-size:14px;
            font-weight:700; cursor:pointer">💾 Kaydet</button>
        </div>
        <div style="display:flex; gap:8px">
          ${index > 0 ? `
            <button onclick="birimKaydetGec(${index}, 'geri')" style="padding:12px 20px;
              background:#f1f5f9; color:#64748b; border:none; border-radius:10px;
              font-size:14px; font-weight:700; cursor:pointer">← Geri</button>` : ""}
          <button onclick="birimKaydetGec(${index}, 'ileri')" style="padding:14px 28px;
            background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:white;
            border:none; border-radius:10px; font-size:15px; font-weight:700; cursor:pointer">
            ${index === secilenIds.length - 1 ? '✅ Tamamla' : 'Sonraki Birim →'}
          </button>
        </div>
      </div>
    </div>`;

  birim.bolumler.forEach((bolum, bi) => {
    bolum.sorular?.forEach(soru => {
      const input = document.getElementById("puan_" + soru.id);
      if (input && input.value) puanRenkGuncelle(soru.id, parseInt(input.value));
    });
  });

  birimGenelPuanGuncelle(birimId);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// PUAN GÜNCELLEME
// ============================================================
function puanGuncelle(soruId, birimId, bolumIndex) {
  const input = document.getElementById("puan_" + soruId);
  if (!input) return;
  let val = parseInt(input.value);
  if (isNaN(val)) { puanRenkGuncelle(soruId, null); return; }
  if (val < 1)   { val = 1;   input.value = 1; }
  if (val > 100) { val = 100; input.value = 100; }
  puanRenkGuncelle(soruId, val);
  birimGenelPuanGuncelle(birimId);
  bolumPuanGuncelle(birimId, bolumIndex);
}

function puanRenkGuncelle(soruId, puan) {
  const el = document.getElementById("puanRenk_" + soruId);
  if (!el) return;
  el.style.background = puan ? getRenkKod(puan) : "#e2e8f0";
}

function getRenkKod(puan) {
  if (puan < 50) return "#ef4444";
  if (puan < 75) return "#f59e0b";
  if (puan < 90) return "#3b82f6";
  return "#22c55e";
}

function getRenkBilgi(puan) {
  if (puan < 50) return { renk:"#ef4444", etiket:"Kritik" };
  if (puan < 75) return { renk:"#f59e0b", etiket:"Geliştirilmeli" };
  if (puan < 90) return { renk:"#3b82f6", etiket:"İyi" };
  return           { renk:"#22c55e", etiket:"Mükemmel" };
}

function hesaplaBolumPuan(birimId, bolumNo) {
  const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) return null;
  const bolum = birim.bolumler.find(b => b.bolumNo === bolumNo);
  if (!bolum) return null;
  const puanlar = bolum.sorular
    ?.map(s => { const el = document.getElementById("puan_" + s.id); return el && el.value ? parseInt(el.value) : null; })
    .filter(p => p !== null);
  if (!puanlar || puanlar.length === 0) return null;
  return Math.round(puanlar.reduce((a,b) => a+b, 0) / puanlar.length);
}

function bolumPuanGuncelle(birimId, bolumIndex) {
  const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) return;
  const bolum = birim.bolumler[bolumIndex];
  if (!bolum) return;
  const puan = hesaplaBolumPuan(birimId, bolum.bolumNo);
  const el   = document.getElementById(`bolumPuanGoster_${birimId}_${bolum.bolumNo}`);
  if (!el) return;
  if (puan === null) { el.innerHTML = `<div style="font-size:12px;color:#cbd5e1">Henüz girilmedi</div>`; return; }
  const r = getRenkBilgi(puan);
  el.innerHTML = `<div style="font-size:20px;font-weight:800;color:${r.renk}">${puan}</div>
    <div style="font-size:10px;font-weight:700;color:${r.renk};white-space:nowrap">${r.etiket}</div>`;
}

function birimGenelPuanGuncelle(birimId) {
  const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) return;
  const tumPuanlar = [];
  birim.bolumler.forEach(bolum => {
    bolum.sorular?.forEach(soru => {
      const el = document.getElementById("puan_" + soru.id);
      if (el && el.value) tumPuanlar.push(parseInt(el.value));
    });
  });
  const el = document.getElementById("birimGenelPuan");
  if (!el) return;
  if (tumPuanlar.length === 0) {
    el.innerHTML = `<div style="font-size:36px;font-weight:800;line-height:1;opacity:0.4">—</div>
      <div style="font-size:11px;opacity:0.6;margin-top:4px">Birim Puanı</div>`;
    return;
  }
  const ort = Math.round(tumPuanlar.reduce((a,b) => a+b, 0) / tumPuanlar.length);
  const r   = getRenkBilgi(ort);
  el.innerHTML = `<div style="font-size:36px;font-weight:800;line-height:1;color:${r.renk}">${ort}</div>
    <div style="font-size:11px;opacity:0.7;margin-top:4px">${r.etiket}</div>`;
}

// ============================================================
// BİRİM KAYDET & GEÇ
// ============================================================
function birimKaydetGec(index, yon) {
  const birimId = _aktifDenetim.secilenBirimler[index];
  const birim   = DENETIM_VERITABANI.find(b => b.id === birimId);
  if (!birim) { birimDenetimGoster(yon === 'ileri' ? index+1 : index-1); return; }
  const cevaplar = {};
  birim.bolumler.forEach(bolum => {
    const bolumCevap = { sorular: {}, not: "" };
    bolum.sorular?.forEach(soru => {
      const el = document.getElementById("puan_" + soru.id);
      if (el && el.value) bolumCevap.sorular[soru.id] = parseInt(el.value);
    });
    const notEl = document.getElementById(`not_${birimId}_${bolum.bolumNo}`);
    if (notEl) bolumCevap.not = notEl.value;
    cevaplar[bolum.bolumNo] = bolumCevap;
  });
  _aktifDenetim.cevaplar[birimId] = cevaplar;
  if (yon === 'ileri') birimDenetimGoster(index + 1);
  else birimDenetimGoster(index - 1);
}

// ============================================================
// ARA TASLAK KAYDET — ✅ denetciId + denetciAd + denetciRol EKLENDİ
// ============================================================
async function araTaslagiKaydet() {
  const index   = _aktifDenetim.aktifBirimIndex;
  const birimId = _aktifDenetim.secilenBirimler[index];
  const birim   = DENETIM_VERITABANI.find(b => b.id === birimId);

  if (birim) {
    const cevaplar = {};
    birim.bolumler.forEach(bolum => {
      const bolumCevap = { sorular: {}, not: "" };
      bolum.sorular?.forEach(soru => {
        const el = document.getElementById("puan_" + soru.id);
        if (el && el.value) bolumCevap.sorular[soru.id] = parseInt(el.value);
      });
      const notEl = document.getElementById(`not_${birimId}_${bolum.bolumNo}`);
      if (notEl) bolumCevap.not = notEl.value;
      cevaplar[bolum.bolumNo] = bolumCevap;
    });
    _aktifDenetim.cevaplar[birimId] = cevaplar;
  }

  const aktif     = aktifKullaniciyiGetir() || {};
  const taslaklar = await taslaklariGetir();
  const yeni = {
    id:              benzersizId(),
    denetciId:       aktif.id,
    denetciAd:       aktif.ad       || aktif.kullaniciAdi || '',  // ✅ YENİ
    denetciRol:      aktif.rol      || 'denetci',                 // ✅ YENİ
    denetci:         _aktifDenetim.denetci,
    otelAdi:         _aktifDenetim.otelAdi,
    tarih:           _aktifDenetim.tarih,
    tur:             _aktifDenetim.tur,
    genelNot:        _aktifDenetim.genelNot,
    secilenBirimler: _aktifDenetim.secilenBirimler,
    cevaplar:        _aktifDenetim.cevaplar,
    aktifBirimIndex: index,
    olusturma:       new Date().toISOString()
  };
  taslaklar.push(yeni);
  await taslaklariKaydet(taslaklar);
  alert("✅ Taslak kaydedildi. Ana sayfadan devam edebilirsiniz.");
}

// ============================================================
// DENETİMİ TAMAMLA — ✅ denetciId + denetciAd + denetciRol EKLENDİ
// ============================================================
async function denetimTamamla() {
  let toplamPuan = 0;
  let toplamSoru = 0;
  const birimPuanlari = {};

  _aktifDenetim.secilenBirimler.forEach(birimId => {
    const birim    = DENETIM_VERITABANI.find(b => b.id === birimId);
    const cevaplar = _aktifDenetim.cevaplar[birimId] || {};
    let birimToplam = 0, birimSoru = 0;
    birim?.bolumler.forEach(bolum => {
      const bolumCevap = cevaplar[bolum.bolumNo] || {};
      Object.values(bolumCevap.sorular || {}).forEach(p => {
        birimToplam += p; birimSoru++;
        toplamPuan  += p; toplamSoru++;
      });
    });
    birimPuanlari[birimId] = birimSoru > 0 ? Math.round(birimToplam / birimSoru) : 0;
  });

  const genelPuan = toplamSoru > 0 ? Math.round(toplamPuan / toplamSoru) : 0;

  const aktif = aktifKullaniciyiGetir() || {};

  const sonucKayit = {
    ..._aktifDenetim,
    denetciId:     _aktifDenetim.denetciId   || aktif.id,
    denetciAd:     _aktifDenetim.denetciAd   || aktif.ad || aktif.kullaniciAdi || '',  // ✅ YENİ
    denetciRol:    _aktifDenetim.denetciRol  || aktif.rol || 'denetci',                // ✅ YENİ
    puan:          genelPuan,
    birimPuanlari: birimPuanlari,
    tamamlanma:    new Date().toISOString()
  };

  const kayitlar = await denetimleriGetir();
  kayitlar.push(sonucKayit);
  await denetimleriKaydet(kayitlar);

  // Atamayı tamamlandı olarak işaretle
  if (_aktifAtamaId) {
    const atamalar = atamalariGetir();
    const idx = atamalar.findIndex(a => a.id === _aktifAtamaId);
    if (idx > -1) {
      atamalar[idx].durum     = "tamamlandi";
      atamalar[idx].denetimId = sonucKayit.id;
      atamalar[idx].tamamlanmaTarihi = new Date().toISOString();
      atamalariKaydet(atamalar);
    }
    _aktifAtamaId = null;
  }

  _aktifDenetim = null;
  sonucEkraniGoster(sonucKayit);
}

// ============================================================
// SONUÇ EKRANI
// ============================================================
function sonucEkraniGoster(kayit) {
  const r = getRenkBilgi(kayit.puan);
  const birimSatirlar = kayit.secilenBirimler.map(birimId => {
    const birim = DENETIM_VERITABANI.find(b => b.id === birimId);
    const puan  = kayit.birimPuanlari[birimId] || 0;
    const rb    = getRenkBilgi(puan);
    return `
      <div style="display:flex; align-items:center; gap:12px;
        padding:10px 0; border-bottom:1px solid #f8fafc">
        <div style="flex:1; font-size:13px; font-weight:500">${birim?.birimAdi || birimId}</div>
        <div style="width:120px; height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden">
          <div style="height:100%; width:${puan}%; background:${rb.renk}; border-radius:4px"></div>
        </div>
        <div style="font-size:14px; font-weight:800; color:${rb.renk}; width:36px; text-align:right">${puan}</div>
        <div style="font-size:11px; font-weight:700; color:${rb.renk}; width:100px; text-align:right">${rb.etiket}</div>
      </div>`;
  }).join("");

  document.getElementById("sayfaIcerik").innerHTML = `
    <div style="max-width:720px; margin:0 auto">
      <div style="background:linear-gradient(135deg,#1e3a5f,#2d5986);
        border-radius:20px; padding:36px; margin-bottom:24px;
        text-align:center; color:white">
        <div style="font-size:56px; margin-bottom:16px">🎉</div>
        <div style="font-size:22px; font-weight:800; margin-bottom:8px">Denetim Tamamlandı!</div>
        <div style="font-size:15px; opacity:0.75; margin-bottom:28px">${kayit.otelAdi} — ${kayit.tarih}</div>
        <div style="display:inline-flex; flex-direction:column; align-items:center;
          background:rgba(255,255,255,0.12); border-radius:16px; padding:20px 40px">
          <div style="font-size:64px; font-weight:900; line-height:1; color:${r.renk}">${kayit.puan}</div>
          <div style="font-size:14px; opacity:0.8; margin-top:6px">Genel Puan</div>
          <div style="font-size:13px; font-weight:700; color:${r.renk}; margin-top:4px">${r.etiket}</div>
        </div>
      </div>
      <div style="background:white; border-radius:16px;
        box-shadow:0 2px 12px rgba(0,0,0,0.08); padding:24px; margin-bottom:24px">
        <h3 style="font-size:16px; font-weight:700; margin-bottom:16px">📊 Birim Puanları</h3>
        ${birimSatirlar}
      </div>
      <div style="display:flex; gap:12px; flex-wrap:wrap">
        <button onclick="sayfaGit('dashboard',null)" style="flex:1; padding:14px;
          background:#f1f5f9; color:#374151; border:none; border-radius:12px;
          font-size:15px; font-weight:700; cursor:pointer; min-width:140px">
          📊 Dashboard'a Git
        </button>
        <button onclick="sayfaGit('denetim',null)" style="flex:1; padding:14px;
          background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:white;
          border:none; border-radius:12px; font-size:15px; font-weight:700;
          cursor:pointer; min-width:140px">
          ${(aktifKullaniciyiGetir()||{}).rol === 'admin' ? '+ Yeni Denetim' : '📋 Görevlerime Dön'}
        </button>
      </div>
    </div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// YARDIMCI
// ============================================================
function tarihFormatla(isoTarih) {
  if (!isoTarih) return bugunTarih();
  const [yil, ay, gun] = isoTarih.split("-");
  return `${gun}.${ay}.${yil}`;
}

function denetimIptal() {
  if (!confirm("Denetimden çıkmak istediğinize emin misiniz?\nKaydedilmemiş veriler silinecek.")) return;

  // Atama varsa "devam"dan "bekliyor"a geri al
  if (_aktifAtamaId) {
    const atamalar = atamalariGetir();
    const idx = atamalar.findIndex(a => a.id === _aktifAtamaId);
    if (idx > -1 && atamalar[idx].durum === "devam") {
      atamalar[idx].durum = "bekliyor";
      atamalariKaydet(atamalar);
    }
    _aktifAtamaId = null;
  }

  _aktifDenetim = null;
  _secilenBirimler.clear();
  sayfaGit("denetim", null);
}
// ============================================================
// MODÜL HAZIR — dashboard.html'e sinyal gönder
// ============================================================
window._denetimModulHazir = true;
document.dispatchEvent(new Event("denetimModulHazir"));

// ============================================================
// ŞIFRELI localStorage BRIDGE — dashboard.js ile uyumlu
// ============================================================
window._denetimleriGetirAsync = async function() {
  try {
    // Sifrele objesi dashboard.html'de tanımlı
    if (typeof Sifrele !== "undefined") {
      return Sifrele.oku("denetim_kayitlar") || [];
    }
  } catch(e) {}
  const ham = localStorage.getItem("denetim_kayitlar");
  return ham ? JSON.parse(ham) : [];
};

window._denetimleriKaydetAsync = async function(liste) {
  try {
    if (typeof Sifrele !== "undefined") {
      Sifrele.kaydet("denetim_kayitlar", liste); return;
    }
  } catch(e) {}
  localStorage.setItem("denetim_kayitlar", JSON.stringify(liste));
};

window._denetimEkleAsync = async function(kayit) {
  const liste = await window._denetimleriGetirAsync();
  if (!kayit.id) kayit.id = "dnt_" + Date.now() + "_" + Math.random().toString(36).substr(2,6);
  liste.push(kayit);
  await window._denetimleriKaydetAsync(liste);
  return kayit.id;
};

window._denetimSilAsync = async function(id) {
  const liste  = await window._denetimleriGetirAsync();
  const guncel = liste.filter(k => k.id !== id);
  await window._denetimleriKaydetAsync(guncel);
};
// ============================================================
// Denetim formu — her maddeye fotoğraf alanı
// ============================================================

// Fotoğraf deposu — { maddeId: [{ url, yol, kaynak }] }
const _fotografDepo = {};

// ── Madde HTML'ini üret (mevcut maddeHTML fonksiyonuna ekle) ──
function maddeHTMLOlustur(madde, bolumId) {
  const maddeId = `${bolumId}_${madde.id || madde.ad.replace(/\s+/g,"_")}`;

  return `
    <div class="denetim-madde" id="madde_${maddeId}">

      <!-- Madde başlık + puan seçici (mevcut kodun) -->
      <div class="madde-ust">
        <span class="madde-ad">${madde.ad}</span>
        <div class="madde-puan-secici">
          ${[0,25,50,75,100].map(p => `
            <button class="puan-btn ${p >= 75 ? "puan-iyi" : p >= 50 ? "puan-orta" : "puan-kotu"}"
                    onclick="puanSec('${maddeId}', ${p}, this)"
                    data-puan="${p}">
              ${p}
            </button>`).join("")}
        </div>
      </div>

      <!-- Not alanı -->
      <textarea
        id="not_${maddeId}"
        placeholder="Gözlem notu ekleyin..."
        style="width:100%;padding:10px;border:1px solid #e2e8f0;
               border-radius:8px;font-size:13px;resize:vertical;
               min-height:60px;margin-top:8px;font-family:inherit">
      </textarea>

      <!-- ✅ FOTOĞRAF ALANI — olumsuz maddelerde göster -->
      <div id="fotoContainer_${maddeId}" style="display:block;margin-top:10px">
        <div class="foto-yukle-alani">
          <div style="font-size:11px;color:#94a3b8;margin-bottom:8px;font-weight:600">
            📸 Kanıt Fotoğrafı Ekle
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">

            <!-- Kamera ile çek — capture özelliği ayrı bir input'ta -->
            <label id="kameraLabel_${maddeId}"
              style="flex:1;min-width:130px;display:flex;align-items:center;
              justify-content:center;gap:8px;padding:12px 14px;background:#eff6ff;
              color:#3b82f6;border:2px solid #93c5fd;border-radius:10px;cursor:pointer;
              font-size:13px;font-weight:700;user-select:none;transition:all 0.2s"
              onmouseover="this.style.background='#dbeafe';this.style.borderColor='#3b82f6'"
              onmouseout="this.style.background='#eff6ff';this.style.borderColor='#93c5fd'">
              <input type="file" accept="image/*" capture="environment"
                id="kameraInput_${maddeId}"
                style="display:none;position:absolute;width:0;height:0;overflow:hidden"
                onchange="fotografEkle(event,'${maddeId}','${madde.ad.replace(/'/g,"\\'")}')">
              📷 Kamera ile Çek
            </label>

            <!-- Galeriden seç — capture YOK -->
            <label id="galeriLabel_${maddeId}"
              style="flex:1;min-width:130px;display:flex;align-items:center;
              justify-content:center;gap:8px;padding:12px 14px;background:#f0fdf4;
              color:#16a34a;border:2px solid #86efac;border-radius:10px;cursor:pointer;
              font-size:13px;font-weight:700;user-select:none;transition:all 0.2s"
              onmouseover="this.style.background='#dcfce7';this.style.borderColor='#22c55e'"
              onmouseout="this.style.background='#f0fdf4';this.style.borderColor='#86efac'">
              <input type="file" accept="image/*" multiple
                id="galeriInput_${maddeId}"
                style="display:none;position:absolute;width:0;height:0;overflow:hidden"
                onchange="fotografEkle(event,'${maddeId}','${madde.ad.replace(/'/g,"\\'")}')">
              🖼 Galeriden Seç
            </label>

          </div>

          <!-- İlerleme çubuğu -->
          <div id="durum_foto_${maddeId}"
            style="display:none;align-items:center;gap:10px;margin-bottom:8px;
            background:#f8fafc;border-radius:8px;padding:10px 12px;border:1px solid #e2e8f0">
            <div style="flex:1;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
              <div id="progress_foto_${maddeId}"
                style="height:100%;width:0%;background:#3b82f6;border-radius:3px;
                transition:width 0.3s ease"></div>
            </div>
            <span id="durumMetin_foto_${maddeId}"
              style="font-size:12px;color:#64748b;white-space:nowrap">İşleniyor...</span>
          </div>

          <!-- Önizleme grid -->
          <div id="onizleme_foto_${maddeId}" class="foto-onizleme-grid"></div>
        </div>
      </div>

    </div>`;
}

// ── Puan seçilince fotoğraf alanını göster/gizle ──
window.puanSec = function(maddeId, puan, btn) {
  // Aktif butonu işaretle
  btn.closest(".madde-puan-secici")
     .querySelectorAll(".puan-btn")
     .forEach(b => b.classList.remove("secili"));
  btn.classList.add("secili");

  // Puan değerini sakla
  btn.closest(".denetim-madde").dataset.puan = puan;

  // Fotoğraf alanı her zaman görünür
  const fotoContainer = document.getElementById(`fotoContainer_${maddeId}`);
  if (fotoContainer) {
    fotoContainer.style.display = "block";
  }
};

// ── Fotoğraf ekle ──
window.fotografEkle = async function(event, maddeId, maddeAdi) {
  const dosyalar = Array.from(event.target.files || []);
  if (!dosyalar.length) return;

  const durumEl      = document.getElementById("durum_foto_" + maddeId);
  const progressBar  = document.getElementById("progress_foto_" + maddeId);
  const durumMetin   = document.getElementById("durumMetin_foto_" + maddeId);
  const onizlemeGrid = document.getElementById("onizleme_foto_" + maddeId);

  if (durumEl) { durumEl.style.display = "flex"; }
  if (!_fotografDepo[maddeId]) _fotografDepo[maddeId] = [];

  for (let i = 0; i < dosyalar.length; i++) {
    const dosya = dosyalar[i];

    // Görsel mi kontrol
    if (!dosya.type.startsWith("image/")) {
      console.warn("[Foto] Görsel değil:", dosya.type);
      continue;
    }

    const yuzde = Math.round(((i + 1) / dosyalar.length) * 100);

    try {
      if (durumMetin) durumMetin.textContent = "Sıkıştırılıyor... (" + (i+1) + "/" + dosyalar.length + ")";
      if (progressBar) progressBar.style.width = (yuzde * 0.5) + "%";

      // Sıkıştır
      const sikistirilmis = await window.FotoYukleyici.sikistir(dosya, 1200, 0.75);

      if (durumMetin) durumMetin.textContent = "Kaydediliyor... (" + (i+1) + "/" + dosyalar.length + ")";
      if (progressBar) progressBar.style.width = (yuzde * 0.5 + 50) + "%";

      const geciciId = "gecici_" + Date.now();
      const sonuc = await window.FotoYukleyici.yukle(
        sikistirilmis.base64,
        geciciId,
        maddeAdi,
        _fotografDepo[maddeId].length
      );

      // Depoya ekle
      _fotografDepo[maddeId].push({
        url     : sonuc.url,
        yol     : sonuc.yol,
        kaynak  : sonuc.kaynak,
        maddeId,
        maddeAdi,
        boyutKB : sikistirilmis.boyutKB
      });

      // Önizleme ekle
      if (onizlemeGrid) {
        const fotoIndex = _fotografDepo[maddeId].length - 1;
        const url = sonuc.url;
        const kart = document.createElement("div");
        kart.className = "foto-onizleme-kart";
        kart.id = "kart_foto_" + maddeId + "_" + fotoIndex;

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Denetim fotoğrafı";
        img.style.cssText = "width:100%;height:100%;object-fit:cover;cursor:zoom-in";
        img.addEventListener("click", (function(u){ return function(){ window.FotoYukleyici.buyut(u); }; })(url));

        const silBtn = document.createElement("button");
        silBtn.className = "foto-sil-btn";
        silBtn.title = "Kaldır";
        silBtn.textContent = "✕";
        silBtn.addEventListener("click", (function(mid, idx){ return function(e){ e.stopPropagation(); fotografKaldir(mid, idx); }; })(maddeId, fotoIndex));

        const rozet = document.createElement("span");
        rozet.className = "foto-yerel-rozet";
        rozet.textContent = "📱 " + Math.round(sikistirilmis.boyutKB) + " KB";

        kart.appendChild(img);
        kart.appendChild(silBtn);
        kart.appendChild(rozet);
        onizlemeGrid.appendChild(kart);
      }

    } catch(e) {
      console.error("[Fotoğraf] Eklenemedi:", e);
      if (durumMetin) durumMetin.textContent = "❌ Hata: " + e.message;
    }
  }

  if (progressBar) progressBar.style.width = "100%";
  const toplamFoto = _fotografDepo[maddeId]?.length || 0;
  if (durumMetin) durumMetin.textContent = "✅ " + toplamFoto + " fotoğraf eklendi";

  setTimeout(() => {
    if (durumEl) durumEl.style.display = "none";
    if (progressBar) progressBar.style.width = "0%";
  }, 1800);

  // Input'u sıfırla — aynı dosyayı tekrar seçebilmek için
  try { event.target.value = ""; } catch(e) {}
};

// ── Fotoğraf kaldır ──
window.fotografKaldir = function(maddeId, siraNo) {
  if (!_fotografDepo[maddeId]) return;

  const foto = _fotografDepo[maddeId][siraNo];

  // Firebase Storage'dan sil
  if (foto?.yol && foto?.kaynak === "firebase" && window.FotoYukleyici) {
    window.FotoYukleyici.sil(foto.yol);
  }

  // Yerel depodan kaldır
  if (foto?.kaynak === "local" && foto?.yol) {
    localStorage.removeItem(foto.yol);
  }

  _fotografDepo[maddeId].splice(siraNo, 1);

  // Önizleme kartını kaldır
  const kart = document.getElementById(`kart_foto_${maddeId}_${siraNo}`);
  if (kart) kart.remove();
};

// ── Kayıt sırasında fotoğrafları kayda ekle ──
function fotograflariKaydeEkle(kayit) {
  const fotografOzeti = [];

  Object.entries(_fotografDepo).forEach(([maddeId, fotolar]) => {
    fotolar.forEach(foto => {
      fotografOzeti.push({
        maddeId,
        maddeAdi : foto.maddeAdi || maddeId,
        url      : foto.url,
        yol      : foto.yol,
        kaynak   : foto.kaynak,
        boyutKB  : foto.boyutKB,
        tarih    : foto.yuklemeTarihi
      });
    });
  });

  return { ...kayit, fotograflar: fotografOzeti };
}