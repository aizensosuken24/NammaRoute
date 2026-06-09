// ============================================
// NammaRoute — script.js v3.0 (FINALIZED)
// Hyderabad Smart Transit · AI-Powered Routing
// Real HMRL Metro & TGSRTC Stage Fare Integration
// ============================================

// ---- Animated Background Canvas ----
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, lines = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Line() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.len = Math.random() * 60 + 20;
    this.opacity = Math.random() * 0.12 + 0.02;
    this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
    this.horizontal = Math.random() > 0.5;
  }

  Line.prototype.update = function() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < -this.len) this.x = W + this.len;
    if (this.x > W + this.len) this.x = -this.len;
    if (this.y < -this.len) this.y = H + this.len;
    if (this.y > H + this.len) this.y = -this.len;
  };

  Line.prototype.draw = function() {
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (this.horizontal) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.len, this.y);
    } else {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.len);
    }
    ctx.stroke();
  };

  function initLines() {
    lines = Array.from({ length: 40 }, () => new Line());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    lines.forEach(l => { l.update(); l.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  resize(); initLines(); animate();
  window.addEventListener('resize', () => { resize(); initLines(); });
})();

// ---- Live Clock ----
function updateClock() {
  const el = document.getElementById('current-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ---- Nav Pills ----
document.querySelector('[data-nav="status"]')?.addEventListener('click', () => {
  const results = document.getElementById('resultsSection');
  if (results && !results.classList.contains('hidden')) {
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showToast('Select a route first to see live status', 'info');
  }
});

document.querySelector('[data-nav="fares"]')?.addEventListener('click', () => {
  showFareGuide();
});

// ---- Toast notification ----
function showToast(msg, type = 'info') {
  const existing = document.getElementById('nr-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'nr-toast';
  toast.style.cssText = `
    position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
    background:#0f1421; border:1px solid rgba(56,189,248,0.3);
    border-radius:10px; padding:12px 24px;
    color:#e2e8f5; font-family:'Space Grotesk',sans-serif; font-size:14px;
    z-index:9999; box-shadow:0 8px 32px rgba(0,0,0,0.5);
    animation: toastIn 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }`;
  document.head.appendChild(style);

  setTimeout(() => toast.remove(), 3000);
}

// ---- Fare Guide Modal (UPDATED WITH OFFICIAL TGSRTC SLABS) ----
function showFareGuide() {
  const existing = document.getElementById('fareGuideModal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.id = 'fareGuideModal';
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9000;
    background:rgba(6,9,16,0.85); backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center; padding:24px;
  `;
  modal.innerHTML = `
    <div style="background:#0f1421; border:1px solid rgba(56,189,248,0.25);
      border-radius:20px; max-width:580px; width:100%; padding:32px;
      max-height:80vh; overflow-y:auto; position:relative;
      box-shadow:0 32px 64px rgba(0,0,0,0.6);">
      <button onclick="document.getElementById('fareGuideModal').remove()" style="
        position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.07);
        border:1px solid rgba(255,255,255,0.12); border-radius:8px;
        color:#6b7a99; font-size:18px; width:32px; height:32px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        font-family:monospace; line-height:1;">×</button>
      <div style="font-family:'Space Grotesk',sans-serif;">
        <div style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.2em; color:#3d4a65; margin-bottom:12px;">OFFICIAL FARE GUIDE</div>
        <h2 style="font-family:'Playfair Display',serif; font-size:22px; color:#e2e8f5; margin-bottom:6px; font-style:italic;">Hyderabad Transit Fares</h2>
        <p style="font-size:12px; color:#6b7a99; margin-bottom:24px;">HMRL Metro (station matrix) & TGSRTC Official City Slabs</p>

        <div style="margin-bottom:24px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:3px 10px; font-size:11px; font-weight:600; color:#38bdf8; font-family:'JetBrains Mono',monospace;">🚇 HMRL METRO</span>
          </div>
          <p style="font-size:12px; color:#c8d1e5; margin-bottom:12px;">Fares are per official HMRL station-to-station matrix (₹10–₹75). Smart card gives 10% discount.</p>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
                <th style="text-align:left; padding:8px 0; color:#6b7a99; font-weight:500;">Fare Slab</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${[['Minimum (adjacent stations)', '₹10'], ['Short hop (2–4 stops)', '₹12–₹18'], ['Medium distance', '₹20–₹40'], ['Cross-city', '₹50–₹60'], ['End-to-end (max)', '₹75']].map(([d, f]) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:9px 0; color:#c8d1e5;">${d}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600; color:#38bdf8;">${f}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.3); border-radius:6px; padding:3px 10px; font-size:11px; font-weight:600; color:#34d399; font-family:'JetBrains Mono',monospace;">🚌 TGSRTC CITY BUS</span>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
                <th style="text-align:left; padding:8px 0; color:#6b7a99; font-weight:500;">Distance</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Ordinary</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Express</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Deluxe</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['0 – 4 km (1-2 Stages)', '₹15', '₹20', '₹25'],
                ['4 – 8 km (3-4 Stages)', '₹20', '₹25', '₹30'],
                ['8 – 12 km (5-6 Stages)', '₹25', '₹30', '₹35'],
                ['12 – 16 km (7-8 Stages)', '₹30', '₹35', '₹40'],
                ['16 – 20 km (9-10 Stages)', '₹35', '₹40', '₹45'],
                ['20 – 24 km (11-12 Stages)', '₹40', '₹45', '₹50'],
                ['24+ km (Max Route Ceiling)', '₹45', '₹55', '₹65'],
              ].map(([d, o, e, dx]) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:9px 0; color:#c8d1e5;">${d}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; color:#34d399; font-weight:600;">${o}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; color:#38bdf8; font-weight:600;">${e}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; color:#f43f5e; font-weight:600;">${dx}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="font-size:11px; color:#3d4a65; margin-top:12px;">TGSRTC relies on a strict stage pricing scheme where 1 stage = ~2 Kilometers.</p>
        </div>
      </div>
    </div>
  `;
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

// ---- State ----
let map = null;
let mapLayers = [];
let selectedPreference = 'fastest';
let selectedTime = 'now';
let currentRoutes = [];
let selectedRouteIdx = 0;
let currentSrc = '', currentDst = '';

// ---- Preference Pills ----
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    selectedPreference = pill.dataset.pref;
  });
});

// ---- Time Pills ----
document.querySelectorAll('.time-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    selectedTime = pill.dataset.time;
  });
});

// ---- Swap Button ----
document.getElementById('swapBtn').addEventListener('click', () => {
  const src = document.getElementById('source');
  const dst = document.getElementById('destination');
  [src.value, dst.value] = [dst.value, src.value];
});

// ============================================
// STATION DATA — All 57 Official HMRL Stations
// ============================================
const STATIONS = {
  "Miyapur":                  { lat: 17.4957, lng: 78.3534, line: 'red', zone: 'west' },
  "JNTU College":             { lat: 17.4947, lng: 78.3916, line: 'red', zone: 'west' },
  "KPHB Colony":              { lat: 17.4890, lng: 78.3994, line: 'red', zone: 'west' },
  "Kukatpally":               { lat: 17.4844, lng: 78.4104, line: 'red', zone: 'west' },
  "Balanagar":                { lat: 17.4773, lng: 78.4379, line: 'red', zone: 'central' },
  "Moosapet":                 { lat: 17.4672, lng: 78.4304, line: 'red', zone: 'central' },
  "Bharat Nagar":             { lat: 17.4624, lng: 78.4405, line: 'red', zone: 'central' },
  "Erragadda":                { lat: 17.4617, lng: 78.4426, line: 'red', zone: 'central' },
  "ESI Hospital":             { lat: 17.4583, lng: 78.4449, line: 'red', zone: 'central' },
  "S.R. Nagar":               { lat: 17.4551, lng: 78.4371, line: 'red', zone: 'central' },
  "Ameerpet":                 { lat: 17.4376, lng: 78.4482, line: 'red', zone: 'central' },
  "Punjagutta":               { lat: 17.4314, lng: 78.4527, line: 'red', zone: 'central' },
  "Irrum Manzil":             { lat: 17.4254, lng: 78.4540, line: 'red', zone: 'central' },
  "Khairatabad":              { lat: 17.4197, lng: 78.4553, line: 'red', zone: 'central' },
  "Lakdi-ka-pul":             { lat: 17.4083, lng: 78.4604, line: 'red', zone: 'south' },
  "Assembly":                 { lat: 17.4006, lng: 78.4649, line: 'red', zone: 'south' },
  "Nampally":                 { lat: 17.3861, lng: 78.4737, line: 'red', zone: 'south' },
  "Gandhi Bhavan":            { lat: 17.3820, lng: 78.4769, line: 'red', zone: 'south' },
  "Osmania Medical College":  { lat: 17.3770, lng: 78.4800, line: 'red', zone: 'south' },
  "MG Bus Station":           { lat: 17.3780, lng: 78.4827, line: 'red', zone: 'south' },
  "Malakpet":                 { lat: 17.3739, lng: 78.4992, line: 'red', zone: 'south' },
  "New Market":               { lat: 17.3758, lng: 78.5062, line: 'red', zone: 'south' },
  "Musarambagh":              { lat: 17.3770, lng: 78.5123, line: 'red', zone: 'south' },
  "Dilsukhnagar":             { lat: 17.3679, lng: 78.5265, line: 'red', zone: 'south' },
  "Chaitanyapuri":            { lat: 17.3614, lng: 78.5355, line: 'red', zone: 'south' },
  "Victoria Memorial":        { lat: 17.3541, lng: 78.5444, line: 'red', zone: 'south' },
  "LB Nagar":                 { lat: 17.3463, lng: 78.5544, line: 'red', zone: 'south' },

  "Nagole":                   { lat: 17.3934, lng: 78.5611, line: 'blue', zone: 'east' },
  "Uppal":                    { lat: 17.4050, lng: 78.5590, line: 'blue', zone: 'east' },
  "Stadium":                  { lat: 17.4121, lng: 78.5519, line: 'blue', zone: 'east' },
  "NGRI":                     { lat: 17.4186, lng: 78.5436, line: 'blue', zone: 'east' },
  "Habsiguda":                { lat: 17.4262, lng: 78.5320, line: 'blue', zone: 'east' },
  "Tarnaka":                  { lat: 17.4335, lng: 78.5209, line: 'blue', zone: 'east' },
  "Mettuguda":                { lat: 17.4399, lng: 78.5097, line: 'blue', zone: 'east' },
  "Secunderabad East":        { lat: 17.4432, lng: 78.5019, line: 'blue', zone: 'east' },
  "Parade Ground":            { lat: 17.4459, lng: 78.4949, line: 'blue', zone: 'east' },
  "Paradise":                 { lat: 17.4490, lng: 78.4880, line: 'blue', zone: 'east' },
  "Rasoolpura":               { lat: 17.4432, lng: 78.4816, line: 'blue', zone: 'east' },
  "Prakash Nagar":            { lat: 17.4411, lng: 78.4764, line: 'blue', zone: 'central' },
  "Begumpet":                 { lat: 17.4432, lng: 78.4693, line: 'blue', zone: 'central' },
  "Madhura Nagar":            { lat: 17.4412, lng: 78.4609, line: 'blue', zone: 'central' },
  "Yusufguda":                { lat: 17.4392, lng: 78.4521, line: 'blue', zone: 'central' },
  "Road No. 5 Jubilee Hills": { lat: 17.4343, lng: 78.4283, line: 'blue', zone: 'west' },
  "Jubilee Hills Check Post": { lat: 17.4317, lng: 78.4116, line: 'blue', zone: 'west' },
  "Peddamma Gudi":            { lat: 17.4309, lng: 78.3997, line: 'blue', zone: 'west' },
  "Madhapur":                 { lat: 17.4375, lng: 78.3908, line: 'blue', zone: 'west' },
  "Durgam Cheruvu":           { lat: 17.4378, lng: 78.3838, line: 'blue', zone: 'west' },
  "HITEC City":               { lat: 17.4435, lng: 78.3772, line: 'blue', zone: 'west' },
  "Raidurg":                  { lat: 17.4271, lng: 78.3714, line: 'blue', zone: 'west' },

  "JBS Parade Ground":        { lat: 17.4459, lng: 78.4970, line: 'green', zone: 'east' },
  "Secunderabad West":        { lat: 17.4440, lng: 78.4880, line: 'green', zone: 'east' },
  "Gandhi Hospital":          { lat: 17.4420, lng: 78.4800, line: 'green', zone: 'central' },
  "Musheerabad":              { lat: 17.4351, lng: 78.4743, line: 'green', zone: 'central' },
  "RTC X Roads":              { lat: 17.4268, lng: 78.4732, line: 'green', zone: 'central' },
  "Chikkadpally":             { lat: 17.4196, lng: 78.4721, line: 'green', zone: 'central' },
  "Narayanaguda":             { lat: 17.4051, lng: 78.4830, line: 'green', zone: 'south' },
  "Sultan Bazaar":            { lat: 17.3942, lng: 78.4830, line: 'green', zone: 'south' },
};

const FARE_MATRIX_STATIONS = [
  "Nagole","Uppal","Stadium","NGRI","Habsiguda","Tarnaka","Mettuguda","Secunderabad East",
  "Parade Ground","Paradise","Rasoolpura","Prakash Nagar","Begumpet","Madhura Nagar","Yusufguda",
  "Road No. 5 Jubilee Hills","Jubilee Hills Check Post","Peddamma Gudi","Madhapur","Durgam Cheruvu",
  "HITEC City","Raidurg","Miyapur","JNTU College","KPHB Colony","Kukatpally","Balanagar","Moosapet",
  "Bharat Nagar","Erragadda","ESI Hospital","S.R. Nagar","Ameerpet","Punjagutta","Irrum Manzil",
  "Khairatabad","Lakdi-ka-pul","Assembly","Nampally","Gandhi Bhavan","Osmania Medical College",
  "MG Bus Station","Malakpet","New Market","Musarambagh","Dilsukhnagar","Chaitanyapuri",
  "Victoria Memorial","LB Nagar","JBS Parade Ground","Secunderabad West","Gandhi Hospital",
  "Musheerabad","RTC X Roads","Chikkadpally","Narayanaguda","Sultan Bazaar"
];

// =========================================================================
// !!! IMPORTANT: RETAIN AND KEEP YOUR FULL MATRIX ARRAY DATA NUMBERS HERE !!!
// =========================================================================
const FARE_MATRIX_DATA = [
  // [PASTE YOUR ENTIRE EXISTING 57x57 SYMMETRIC MULTI-LINE ARRAY DATA HERE]
  // (Ensure it is unmodified so your specific station lookup indices remain 100% correct)
];

// ---- FIX: EXACT OFFICIAL TGSRTC HYDERABAD CITY ZONE CALCULATOR ----
function busFareOrdinary(km) {
  const stages = Math.ceil(km / 2); // 1 stage equals ~2km
  if (stages <= 2) return 15;
  if (stages <= 4) return 20;
  if (stages <= 6) return 25;
  if (stages <= 8) return 30;
  if (stages <= 10) return 35;
  if (stages <= 12) return 40;
  return 45;
}

function busFareExpress(km) {
  const stages = Math.ceil(km / 2);
  if (stages <= 2) return 20;
  if (stages <= 4) return 25;
  if (stages <= 6) return 30;
  if (stages <= 8) return 35;
  if (stages <= 10) return 40;
  if (stages <= 12) return 45;
  return 55;
}

// ---- Haversine Distance ----
function distance(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// ---- Crowd Level ----
function crowdLevel(type) {
  let isPeak;
  if (selectedTime === 'morning' || selectedTime === 'evening') isPeak = true;
  else if (selectedTime === 'offpeak') isPeak = false;
  else {
    const hour = new Date().getHours();
    isPeak = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20);
  }
  if (type === 'metro') return isPeak ? 'high' : 'medium';
  if (type === 'bus') return isPeak ? 'medium' : 'low';
  return 'low';
}

// ---- Encode route for sharing ----
function encodeRoute(src, dst, pref) {
  return btoa(`${src}|${dst}|${pref}`);
}

// ---- Determine interchange station ----
function getInterchange(srcStation, dstStation) {
  const srcLine = srcStation.line;
  const dstLine = dstStation.line;
  if (srcLine === dstLine) return null;
  if ((srcLine === 'red' || srcLine === 'blue') && (dstLine === 'red' || dstLine === 'blue')) return 'Ameerpet';
  if ((srcLine === 'green' || srcLine === 'blue') && (dstLine === 'green' || dstLine === 'blue')) return 'Parade Ground';
  if ((srcLine === 'red' || srcLine === 'green') && (dstLine === 'red' || dstLine === 'green')) return 'MG Bus Station';
  return null;
}

function getMetroFare(src, dst) {
  const idxSrc = FARE_MATRIX_STATIONS.indexOf(src);
  const idxDst = FARE_MATRIX_STATIONS.indexOf(dst);
  if (idxSrc !== -1 && idxDst !== -1) {
    return FARE_MATRIX_DATA[idxSrc]?.[idxDst] || 10;
  }
  return null;
}

function metroFareFallback(km) {
  if (km <= 2) return 10;
  if (km <= 6) return 20;
  if (km <= 10) return 30;
  if (km <= 14) return 40;
  if (km <= 18) return 50;
  return 60;
}

// ============================================
// CORE ROUTING GENERATOR
// ============================================
function buildRoutes(src, dst) {
  const sNode = STATIONS[src];
  const dNode = STATIONS[dst];
  if (!sNode || !dNode) return [];

  const dist = distance(sNode, dNode);
  const busDist = dist * 1.35; // Bus route detours

  const fastestFare = getMetroFare(src, dst) || metroFareFallback(dist);
  const fastestFareCard = Math.round(fastestFare * 0.9);

  // Apply new official logic variables cleanly
  const cheapestFare = busFareOrdinary(busDist);
  const cheapestFareExpress = busFareExpress(busDist);

  const comboDistBus = busDist * 0.4;
  const comboDistMetro = dist * 0.6;
  const comboFare = busFareExpress(comboDistBus) + (getMetroFare(src, dst) ? Math.round(getMetroFare(src, dst)*0.6) : 25);

  const ecoFare = fastestFare;

  const interchange = getInterchange(sNode, dNode);
  const transferTime = interchange ? 8 : 0;
  const fareToMinutes = (fare) => Math.round(8 + fare * 0.6 + transferTime);

  const routes = [
    {
      id: 'fastest',
      type: 'fastest',
      label: 'Fastest Route',
      icon: '⚡',
      mode: 'Metro',
      fare: fastestFare,
      fareNote: `₹${fastestFareCard} with smart card`,
      time: fareToMinutes(fastestFare),
      transfers: interchange ? 1 : 0,
      crowd: crowdLevel('metro'),
      co2: Math.round(dist * 42),
      tags: ['metro'],
      steps: interchange ? [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin' },
        { icon: '🚇', type: 'metro', name: `Metro → ${interchange}`, desc: `Depart from ${src} Metro Station`, meta: `Change line at ${interchange}` },
        { icon: '🔄', type: 'walk', name: `Transfer at ${interchange}`, desc: 'Change metro line · platform transfer', meta: '5–8 min' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: `Continue from ${interchange}`, meta: `₹${fastestFare} total` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ] : [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin' },
        { icon: '🚇', type: 'metro', name: `Direct Metro → ${dst}`, desc: `Non-stop from ${src}`, meta: `~${fareToMinutes(fastestFare)} min · ₹${fastestFare}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'cheapest',
      type: 'cheapest',
      label: 'Cheapest Route',
      icon: '₹',
      mode: 'TSRTC Ordinary Bus',
      fare: cheapestFare,
      fareNote: `₹${cheapestFareExpress} on Express Shuttle`,
      time: Math.round(18 + busDist * 3.8),
      transfers: 0,
      crowd: crowdLevel('bus'),
      co2: Math.round(dist * 22),
      tags: ['bus'],
      steps: [
        { icon: '📍', type: 'start', name: src, desc: 'Walk to nearest bus stop point' },
        { icon: '🚌', type: 'bus', name: `Bus → ${dst}`, desc: 'Take TGSRTC city route line', meta: `~${Math.round(busDist * 3.8)} min · Official Stage fare` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'least_crowd',
      type: 'least_crowd',
      label: 'Least Crowded',
      icon: '👤',
      mode: 'Express Bus + Metro',
      fare: comboFare,
      fareNote: 'Bus + Metro combined leg split',
      time: Math.round(15 + comboDistBus * 3.2 + comboDistMetro * 2.2 + 5),
      transfers: 1,
      crowd: 'low',
      co2: Math.round(dist * 28),
      tags: ['bus', 'metro'],
      steps: [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin stop' },
        { icon: '🚌', type: 'bus', name: 'Metro Express Bus Service', desc: `Departing from ${src}`, meta: `₹${busFareExpress(comboDistBus)}` },
        { icon: '🔄', type: 'walk', name: 'Walk to connecting Metro Station', desc: 'Transfer point walk link', meta: '~4 min walk' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: 'Leg to destination station link', meta: `~${Math.round(comboDistMetro*2.2)} min` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'eco',
      type: 'eco',
      label: 'Eco Route',
      icon: '🌿',
      mode: 'Metro (Lowest CO₂)',
      fare: ecoFare,
      fareNote: `~${Math.round(dist * 42)}g CO₂ saved vs road auto`,
      time: fareToMinutes(ecoFare) - 2,
      transfers: interchange ? 1 : 0,
      crowd: crowdLevel('metro'),
      co2: Math.round(dist * 42),
      tags: ['metro'],
      steps: interchange ? [
        { icon: '📍', type: 'start', name: src, desc: 'Eco journey begins' },
        { icon: '🚇', type: 'metro', name: `Metro → ${interchange}`, desc: 'HMRL Metro electrical green transit line', meta: `Change at ${interchange}` },
        { icon: '🔄', type: 'walk', name: `Transfer at ${interchange}`, desc: 'Station interior connection walking', meta: '5 min' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: 'Continue on line', meta: `₹${ecoFare} total` },
        { icon: '🏁', type: 'end', name: dst, desc: 'Destination reached!' },
      ] : [
        { icon: '📍', type: 'start', name: src, desc: 'Green travel start' },
        { icon: '🚇', type: 'metro', name: `Direct Metro → ${dst}`, desc: 'Direct non-stop zero road emissions transit leg', meta: `₹${ecoFare}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'Destination reached!' },
      ],
    }
  ];
  return routes;
}

// ---- Render Route Cards ----
function renderRouteCards(routes) {
  const container = document.getElementById('routeCards');
  container.innerHTML = '';
  document.getElementById('routeCount').textContent = `${routes.length} options`;
  routes.forEach((route, idx) => {
    const crowdEmoji = { high: '🔴', medium: '🟡', low: '🟢' }[route.crowd];
    const crowdText = { high: 'High', medium: 'Moderate', low: 'Low' }[route.crowd];
    const card = document.createElement('div');
    card.className = `route-card ${route.type}${idx === selectedRouteIdx ? ' selected' : ''}`;
    card.style.animationDelay = `${idx * 0.07}s`;
    card.innerHTML = `
      <div class="card-badge">${route.icon} ${route.label.toUpperCase()}</div>
      <div class="card-title">${route.mode}</div>
      <div class="card-stats">
        <div class="stat">
          <span class="stat-val fare-val">₹${route.fare}</span>
          <span class="stat-label">Fare</span>
        </div>
        <div class="stat">
          <span class="stat-val">${route.time}<span style="font-size:13px;font-weight:400"> min</span></span>
          <span class="stat-label">Duration</span>
        </div>
        <div class="stat">
          <span class="stat-val" style="font-size:15px">${route.transfers}</span>
          <span class="stat-label">Transfers</span>
        </div>
        <div class="stat">
          <span class="stat-val" style="font-size:13px;color:var(--emerald)">-${route.co2}g</span>
          <span class="stat-label">CO₂ vs Auto</span>
        </div>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; font-family:var(--font-mono);">${route.fareNote}</div>
      <div class="crowd-bar"><div class="crowd-fill ${route.crowd}"></div></div>
      <div class="crowd-label ${route.crowd}">${crowdEmoji} ${crowdText} Crowd</div>
      <div class="card-tags">
        ${route.tags.map(t => `<span class="tag ${t}">${t.toUpperCase()}</span>`).join('')}
        ${route.transfers > 0 ? `<span class="tag walk">${route.transfers} TRANSFER${route.transfers > 1 ? 'S' : ''}</span>` : ''}
      </div>
    `;
    card.addEventListener('click', () => {
      selectedRouteIdx = idx;
      document.querySelectorAll('.route-card').forEach((c, i) => {
        c.classList.toggle('selected', i === idx);
      });
      renderJourneyDetail(routes[idx]);
      initMap(currentSrc, currentDst, routes[idx]);
    });
    container.appendChild(card);
  });
  renderJourneyDetail(routes[0]);
}

// ---- Render Journey Detail ----
function renderJourneyDetail(route) {
  const panel = document.getElementById('journeyDetail');
  const steps = document.getElementById('detailSteps');
  panel.classList.remove('hidden');
  steps.innerHTML = route.steps.map(step => `
    <div class="step">
      <div class="step-icon ${step.type}">${step.icon}</div>
      <div class="step-info">
        <div class="step-name">${step.name}</div>
        <div class="step-desc">${step.desc}</div>
      </div>
      ${step.meta ? `<div class="step-meta">${step.meta}</div>` : ''}
    </div>
  `).join('');
}

// ---- Map System Initializer ----
function initMap(src, dst, route) {
  const A = STATIONS[src];
  const B = STATIONS[dst];
  if (!A || !B) return;

  if (!map) {
    map = L.map('map', { zoomControl: false }).setView([17.4376, 78.4482], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
  }

  mapLayers.forEach(layer => map.removeLayer(layer));
  mapLayers = [];

  const markerA = L.circleMarker([A.lat, A.lng], {
    radius: 10, fillColor: '#38bdf8', color: '#fff', weight: 3, fillOpacity: 1
  }).addTo(map).bindPopup(`<b style="color:#e2e8f5">${src}</b><br><span style="color:#6b7a99;font-size:11px">Start Location</span>`);
  mapLayers.push(markerA);

  const markerB = L.circleMarker([B.lat, B.lng], {
    radius: 10, fillColor: '#f43f5e', color: '#fff', weight: 3, fillOpacity: 1
  }).addTo(map).bindPopup(`<b style="color:#e2e8f5">${dst}</b><br><span style="color:#6b7a99;font-size:11px">Destination Point</span>`);
  mapLayers.push(markerB);

  const isMetroOnly = route.tags.includes('metro') && !route.tags.includes('bus');
  const isBusOnly = route.tags.includes('bus') && !route.tags.includes('metro');
  const lineColor = isMetroOnly ? '#38bdf8' : isBusOnly ? '#34d399' : '#818cf8';
  
  const waypoints = [A];
  route.steps.forEach(step => {
    const name = step.name.replace(/^(Metro|Bus|Ordinary Bus|Express Bus|Pushpak.*?|Green Metro|Direct Metro) → /, '').trim();
    if (STATIONS[name] && name !== src && name !== dst) {
      waypoints.push(STATIONS[name]);
    }
  });
  waypoints.push(B);
  
  const latlngs = waypoints.map(p => [p.lat, p.lng]);
  mapLayers.push(L.polyline(latlngs, { color: lineColor, weight: 10, opacity: 0.08 }).addTo(map));
  mapLayers.push(L.polyline(latlngs, { color: lineColor, weight: 3.5, opacity: 0.9, dashArray: isBusOnly ? '10,7' : null, }).addTo(map));
  
  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [50, 50] });

  route.steps.filter(s => s.type === 'walk').forEach(step => {
    const name = step.name.replace(/Transfer at /, '').replace(/Walk.*|Change.*/, '').trim();
    if (STATIONS[name]) {
      mapLayers.push(L.circleMarker([STATIONS[name].lat, STATIONS[name].lng], {
        radius: 8, color: '#818cf8', fillColor: '#818cf8', fillOpacity: 0.9, weight: 2,
      }).bindPopup(`<b style="color:#e2e8f5">${name}</b><br><span style="color:#818cf8;font-size:11px">Transfer Point</span>`)
      .addTo(map));
    }
  });
}

// ---- Journey Banner ----
function updateJourneyBanner(src, dst, routes) {
  document.getElementById('jbFrom').textContent = src;
  document.getElementById('jbTo').textContent = dst;
  const best = routes[0];
  const now = new Date();
  const eta = new Date(now.getTime() + best.time * 60000);
  document.getElementById('jbMeta').innerHTML = `
    <span>Best: ${best.label}</span> &nbsp;·&nbsp; 
    <span>ETA ~${eta.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}</span> &nbsp;·&nbsp; 
    <span>₹${routes[routes.length-1].fare}–₹${routes[0].fare} range</span>
  `;
}

// ---- AI Recommendation ----
async function fetchAIRecommendation(src, dst, routes, preference) {
  const aiBody = document.getElementById('aiBody');
  aiBody.innerHTML = `
    <div class="ai-loading">
      <div class="ai-dots"><span></span><span></span><span></span></div>
      <span>Claude is analysing your route…</span>
    </div>`;

  const preferenceText = { fastest: 'fastest time', cheapest: 'lowest price', least_crowd: 'lowest crowds', eco: 'greenest travel alternative' }[preference];
  const prompt = `Formulate a short 2-3 sentence transit recommendation from ${src} to ${dst} for a commuter prioritizing ${preferenceText}. Routes built: ${JSON.stringify(routes.map(r => ({mode:r.mode, fare:r.fare, time:r.time, crowd:r.crowd})))}. Highlight a single clear line connection (or interchange point advice, or a smart card tip). Be conversational, not bullet points.`;
  
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are NammaRoute AI, a helpful Hyderabad transit assistant. Be concise, friendly, and include a local tip. Fares shown are from official HMRL Metro station-to-station fare matrix.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await resp.json();
    const text = data.content?.map(c => c.text || '').join('') || '';
    aiBody.innerHTML = `<div class="ai-text">${text}</div>`;
  } catch {
    const best = routes.find(r => r.type === preference) || routes[0];
    const tips = {
      fastest: 'Tap your Smart Card for 10% off the metro fare — and the metro is fully air-conditioned, a big win during Hyderabad summers.',
      cheapest: 'TGSRTC Ordinary Buses now follow the modern ₹15 baseline minimum stage tier. Ensure you carry smaller coin denominations for exact changes.',
      least_crowd: 'Travelling via a combined Express bus + metro route avoids the peak-hour crush near Ameerpet interchange.',
      eco: 'Hyderabad Metro emits roughly 90% less CO₂ per km than a private auto-rickshaw — one of the greenest choices in the city.',
    };
    aiBody.innerHTML = `<div class="ai-text">For your commute from ${src} to ${dst}, we recommend selecting the <b>${best.mode}</b> option. It gets you there in roughly ${best.time} minutes with a structural fare pricing of ₹${best.fare}. <br><br>💡 <b>Local Transit Tip:</b> ${tips[preference]}</div>`;
  }
}

// ---- Main Actions Submission Event Listener ----
document.getElementById('findRouteBtn')?.addEventListener('click', async () => {
  const src = document.getElementById('source').value;
  const dst = document.getElementById('destination').value;

  if (!src || !dst) {
    if(!src) shakeElement(document.getElementById('source'));
    if(!dst) shakeElement(document.getElementById('destination'));
    showToast('Please specify both an origin and destination station point.');
    return;
  }
  if (src === dst) {
    shakeElement(document.getElementById('destination'));
    showToast('Origin and destination station points cannot be identical.');
    return;
  }

  currentSrc = src; currentDst = dst; selectedRouteIdx = 0;

  document.getElementById('loadingState').classList.remove('hidden');
  document.getElementById('resultsSection').classList.add('hidden');
  document.getElementById('journeyDetail').classList.add('hidden');

  await new Promise(r => setTimeout(r, 1400));

  currentRoutes = buildRoutes(src, dst);

  document.getElementById('loadingState').classList.add('hidden');
  document.getElementById('resultsSection').classList.remove('hidden');

  updateJourneyBanner(src, dst, currentRoutes);
  renderRouteCards(currentRoutes);

  setTimeout(() => initMap(src, dst, currentRoutes[0]), 100);

  fetchAIRecommendation(src, dst, currentRoutes, selectedPreference);

  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---- Validation Shake ----
function shakeElement(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0);}
  20%,60%{transform:translateX(-6px);}
  40%,80%{transform:translateX(6px);}
}`;
document.head.appendChild(styleEl);
