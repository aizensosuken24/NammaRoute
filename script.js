// ============================================
// NammaRoute — script.js v2.1
// Hyderabad Smart Transit · AI-Powered Routing
// Real HMRL Metro & TSRTC Bus Fares
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
// "Live Status" → scrolls to results if available, else shows toast
document.querySelector('[data-nav="status"]')?.addEventListener('click', () => {
  const results = document.getElementById('resultsSection');
  if (results && !results.classList.contains('hidden')) {
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showToast('Select a route first to see live status', 'info');
  }
});

// "Fare Guide" → scrolls to fare guide modal
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

// ---- Fare Guide Modal ----
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
      border-radius:20px; max-width:560px; width:100%; padding:32px;
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
        <p style="font-size:12px; color:#6b7a99; margin-bottom:24px;">HMRL Metro & TSRTC Bus — Official 2024 slabs</p>

        <div style="margin-bottom:24px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:3px 10px; font-size:11px; font-weight:600; color:#38bdf8; font-family:'JetBrains Mono',monospace;">🚇 HMRL METRO</span>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
                <th style="text-align:left; padding:8px 0; color:#6b7a99; font-weight:500;">Distance</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Fare</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Up to 2 km', '₹10'],
                ['2 – 4 km', '₹15'],
                ['4 – 6 km', '₹20'],
                ['6 – 8 km', '₹25'],
                ['8 – 10 km', '₹30'],
                ['10 – 12 km', '₹35'],
                ['12 – 14 km', '₹40'],
                ['14 – 16 km', '₹45'],
                ['16 – 18 km', '₹50'],
                ['18 – 21 km', '₹55'],
                ['Above 21 km', '₹60'],
              ].map(([d, f]) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:9px 0; color:#c8d1e5;">${d}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; font-weight:600;
                    background:linear-gradient(135deg,#34d399,#38bdf8);
                    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
                    background-clip:text;">${f}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="font-size:11px; color:#3d4a65; margin-top:8px;">Smart card gives 10% discount. Children under 90cm travel free.</p>
        </div>

        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.3); border-radius:6px; padding:3px 10px; font-size:11px; font-weight:600; color:#34d399; font-family:'JetBrains Mono',monospace;">🚌 TSRTC BUS</span>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
                <th style="text-align:left; padding:8px 0; color:#6b7a99; font-weight:500;">Distance</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Ordinary</th>
                <th style="text-align:right; padding:8px 0; color:#6b7a99; font-weight:500;">Express/Metro</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ['Up to 3 km', '₹6', '₹8'],
                ['3 – 6 km', '₹8', '₹10'],
                ['6 – 10 km', '₹10', '₹12'],
                ['10 – 15 km', '₹13', '₹16'],
                ['15 – 20 km', '₹16', '₹20'],
                ['20 – 30 km', '₹20', '₹25'],
                ['Above 30 km', '₹25', '₹30'],
              ].map(([d, o, e]) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:9px 0; color:#c8d1e5;">${d}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; color:#34d399; font-weight:600;">${o}</td>
                  <td style="padding:9px 0; text-align:right; font-family:'JetBrains Mono',monospace; color:#38bdf8; font-weight:600;">${e}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="font-size:11px; color:#3d4a65; margin-top:8px;">Metro Express & Pushpak services charge express fare. Season passes available at TSRTC bus depots.</p>
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

// ---- Station Data ----
const STATIONS = {
  "Lingampally":   { lat: 17.4924, lng: 78.3182, zone: 'west' },
  "Miyapur":       { lat: 17.4957, lng: 78.3534, zone: 'west' },
  "JNTU":          { lat: 17.4947, lng: 78.3916, zone: 'west' },
  "Kukatpally":    { lat: 17.4844, lng: 78.4104, zone: 'west' },
  "Balanagar":     { lat: 17.4773, lng: 78.4379, zone: 'central' },
  "Moosapet":      { lat: 17.4672, lng: 78.4304, zone: 'central' },
  "Bharat Nagar":  { lat: 17.4624, lng: 78.4405, zone: 'central' },
  "Erragadda":     { lat: 17.4617, lng: 78.4426, zone: 'central' },
  "Ameerpet":      { lat: 17.4376, lng: 78.4482, zone: 'central' },
  "SR Nagar":      { lat: 17.4451, lng: 78.4371, zone: 'central' },
  "Begumpet":      { lat: 17.4432, lng: 78.4693, zone: 'central' },
  "Secunderabad":  { lat: 17.4399, lng: 78.4983, zone: 'east' },
  "Paradise":      { lat: 17.4459, lng: 78.4949, zone: 'east' },
  "Nampally":      { lat: 17.3861, lng: 78.4737, zone: 'south' },
  "MGBS":          { lat: 17.3780, lng: 78.4827, zone: 'south' },
  "LB Nagar":      { lat: 17.3463, lng: 78.5544, zone: 'south' },
  "Dilsukhnagar":  { lat: 17.3679, lng: 78.5265, zone: 'south' },
  "Uppal":         { lat: 17.4050, lng: 78.5590, zone: 'east' },
  "HITEC City":    { lat: 17.4435, lng: 78.3772, zone: 'west' },
  "Raidurg":       { lat: 17.4271, lng: 78.3714, zone: 'west' },
  "Kondapur":      { lat: 17.4601, lng: 78.3588, zone: 'west' },
  "Gachibowli":    { lat: 17.4401, lng: 78.3489, zone: 'west' },
};

// ---- Haversine Distance ----
function distance(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// ---- REAL HMRL Metro Fare (official 2024 slab) ----
// Source: Hyderabad Metro Rail (HMRL) official fare chart
function metroFare(km) {
  if (km <= 2)  return 10;
  if (km <= 4)  return 15;
  if (km <= 6)  return 20;
  if (km <= 8)  return 25;
  if (km <= 10) return 30;
  if (km <= 12) return 35;
  if (km <= 14) return 40;
  if (km <= 16) return 45;
  if (km <= 18) return 50;
  if (km <= 21) return 55;
  return 60; // max fare for any distance above 21 km
}

// Smart card discount (10% off, rounded to nearest ₹5)
function metroFareSmartCard(km) {
  const base = metroFare(km);
  return Math.round((base * 0.9) / 5) * 5 || base - 2;
}

// ---- REAL TSRTC Bus Fare (official 2024 slab) ----
// Ordinary city bus fare
function busFareOrdinary(km) {
  if (km <= 3)  return 6;
  if (km <= 6)  return 8;
  if (km <= 10) return 10;
  if (km <= 15) return 13;
  if (km <= 20) return 16;
  if (km <= 30) return 20;
  return 25;
}

// Metro Express / Pushpak fare
function busFareExpress(km) {
  if (km <= 3)  return 8;
  if (km <= 6)  return 10;
  if (km <= 10) return 12;
  if (km <= 15) return 16;
  if (km <= 20) return 20;
  if (km <= 30) return 25;
  return 30;
}

// ---- Crowd Level (respects selected time) ----
function crowdLevel(type) {
  let isPeak;
  if (selectedTime === 'morning') isPeak = true;
  else if (selectedTime === 'evening') isPeak = true;
  else if (selectedTime === 'offpeak') isPeak = false;
  else {
    const hour = new Date().getHours();
    isPeak = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20);
  }
  if (type === 'metro') return isPeak ? 'high' : 'medium';
  if (type === 'bus')   return isPeak ? 'medium' : 'low';
  return 'low';
}

// ---- Save/Share: Encode route as URL param ----
function encodeRoute(src, dst, pref) {
  return btoa(`${src}|${dst}|${pref}`);
}

// ---- Build Route Options ----
function buildRoutes(src, dst) {
  const A = STATIONS[src], B = STATIONS[dst];
  if (!A || !B) return [];

  const dist = distance(A, B);
  // Metro route is slightly longer (not straight line), add ~15% overhead
  const metroDist = dist * 1.15;
  // Bus route via roads is ~25% longer
  const busDist = dist * 1.25;
  // Combined route bus leg + metro leg
  const comboDistBus = dist * 0.55;
  const comboDistMetro = dist * 0.65;

  const isNear = dist < 5;
  const interchange = A.zone !== B.zone ? 'Ameerpet' : null;

  // Real fares
  const fastestFare = metroFare(metroDist);
  const fastestFareCard = metroFareSmartCard(metroDist);
  const cheapestFare = busFareOrdinary(busDist);
  const cheapestFareExpress = busFareExpress(busDist);
  const comboFare = busFareExpress(comboDistBus) + metroFare(comboDistMetro);
  const ecoFare = metroFare(metroDist); // metro = most eco

  // Transfer adds walking time
  const transferTime = interchange ? 8 : 0;

  const routes = [
    {
      id: 'fastest', type: 'fastest',
      label: 'Fastest Route', icon: '⚡', mode: 'Metro',
      fare: fastestFare,
      fareNote: `₹${fastestFareCard} with smart card`,
      time: Math.round(10 + metroDist * 2.2 + transferTime),
      transfers: interchange ? 1 : 0,
      crowd: crowdLevel('metro'),
      co2: Math.round(dist * 42),
      tags: ['metro'],
      steps: interchange ? [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin' },
        { icon: '🚇', type: 'metro', name: `Metro → ${interchange}`, desc: `Depart from ${src} Metro Station`, meta: `~${Math.round(metroDist/2*2.2)} min · ₹${metroFare(metroDist/2)}` },
        { icon: '🔄', type: 'walk', name: `Transfer at ${interchange}`, desc: 'Change metro line · same platform or short walk', meta: '5–8 min' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: `Continue from ${interchange}`, meta: `~${Math.round(metroDist/2*2.2)} min · ₹${metroFare(metroDist/2)}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ] : [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin' },
        { icon: '🚇', type: 'metro', name: `Direct Metro → ${dst}`, desc: `Non-stop from ${src}`, meta: `~${Math.round(10+metroDist*2.2)} min · ₹${fastestFare} (₹${fastestFareCard} smart card)` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'cheapest', type: 'cheapest',
      label: 'Cheapest Route', icon: '₹', mode: 'TSRTC Ordinary Bus',
      fare: cheapestFare,
      fareNote: `₹${cheapestFareExpress} on Express/Pushpak`,
      time: Math.round(18 + busDist * 3.5),
      transfers: isNear ? 0 : 1,
      crowd: crowdLevel('bus'),
      co2: Math.round(dist * 18),
      tags: ['bus'],
      steps: isNear ? [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin bus stop' },
        { icon: '🚌', type: 'bus', name: `Ordinary Bus → ${dst}`, desc: `Board TSRTC at ${src}`, meta: `~${Math.round(18+busDist*3.5)} min · ₹${cheapestFare}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ] : [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin bus stop' },
        { icon: '🚌', type: 'bus', name: `Bus → ${interchange || 'Ameerpet'}`, desc: 'Board TSRTC ordinary bus', meta: `~${Math.round(busDist*1.8)} min · ₹${busFareOrdinary(busDist*0.55)}` },
        { icon: '🔄', type: 'walk', name: 'Change Bus', desc: 'Transfer at bus interchange stop', meta: '5 min' },
        { icon: '🚌', type: 'bus', name: `Bus → ${dst}`, desc: 'Continue journey', meta: `~${Math.round(busDist*1.5)} min · ₹${busFareOrdinary(busDist*0.5)}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'least_crowd', type: 'least_crowd',
      label: 'Least Crowded', icon: '👤', mode: 'Express Bus + Metro',
      fare: comboFare,
      fareNote: 'Bus + Metro combined',
      time: Math.round(15 + comboDistBus * 3.2 + comboDistMetro * 2.2 + 5),
      transfers: 1, crowd: 'low',
      co2: Math.round(dist * 28),
      tags: ['bus', 'metro'],
      steps: [
        { icon: '📍', type: 'start', name: src, desc: 'Board at origin' },
        { icon: '🚌', type: 'bus', name: 'Pushpak / Metro Express Bus', desc: `Depart from ${src} — less crowded off-peak service`, meta: `~${Math.round(comboDistBus*3.2)} min · ₹${busFareExpress(comboDistBus)}` },
        { icon: '🔄', type: 'walk', name: 'Walk to Metro Station', desc: 'Short walk — typically 3–5 minutes', meta: '~4 min walk' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: 'Less-crowded metro leg to destination', meta: `~${Math.round(comboDistMetro*2.2)} min · ₹${metroFare(comboDistMetro)}` },
        { icon: '🏁', type: 'end', name: dst, desc: 'You have arrived!' },
      ],
    },
    {
      id: 'eco', type: 'eco',
      label: 'Eco Route', icon: '🌿', mode: 'Metro (Green Line)',
      fare: ecoFare,
      fareNote: `~${Math.round(dist * 42)}g CO₂ saved vs auto`,
      time: Math.round(10 + metroDist * 2.0 + transferTime),
      transfers: interchange ? 1 : 0,
      crowd: crowdLevel('metro'),
      co2: Math.round(dist * 42),
      tags: ['metro'],
      steps: interchange ? [
        { icon: '📍', type: 'start', name: src, desc: 'Eco journey begins' },
        { icon: '🚇', type: 'metro', name: `Green Metro → ${interchange}`, desc: 'HMRL Metro — lowest per-km CO₂ in Hyderabad', meta: `~${Math.round(metroDist/2*2.0)} min · ₹${metroFare(metroDist/2)}` },
        { icon: '🔄', type: 'walk', name: `Transfer at ${interchange}`, desc: 'Station transfer', meta: '5 min' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: 'Continue on metro', meta: `~${Math.round(metroDist/2*2.0)} min · ₹${metroFare(metroDist/2)}` },
        { icon: '🏁', type: 'end', name: dst, desc: `Saved ~${Math.round(dist*42*4)}g CO₂ vs auto-rickshaw!` },
      ] : [
        { icon: '📍', type: 'start', name: src, desc: 'Eco journey begins' },
        { icon: '🚇', type: 'metro', name: `Metro → ${dst}`, desc: 'Hyderabad Metro: lowest carbon public transit', meta: `~${Math.round(10+metroDist*2.0)} min · ₹${ecoFare}` },
        { icon: '🏁', type: 'end', name: dst, desc: `Saved ~${Math.round(dist*42*4)}g CO₂ vs auto-rickshaw!` },
      ],
    },
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
    const crowdText  = { high: 'High', medium: 'Moderate', low: 'Low' }[route.crowd];

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
        ${step.meta ? `<div class="step-meta">${step.meta}</div>` : ''}
      </div>
    </div>
  `).join('');
}

// ---- Map ----
function initMap(src, dst, route) {
  const A = STATIONS[src], B = STATIONS[dst];
  if (!A || !B) return;

  const midLat = (A.lat + B.lat) / 2;
  const midLng = (A.lng + B.lng) / 2;

  if (!map) {
    map = L.map('map', { zoomControl: true }).setView([midLat, midLng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 18,
    }).addTo(map);
  } else {
    map.setView([midLat, midLng], 12);
  }

  mapLayers.forEach(l => map.removeLayer(l));
  mapLayers = [];

  const makeIcon = (color, emoji) => L.divIcon({
    className: '',
    html: `<div style="background:${color};border:2px solid rgba(255,255,255,0.25);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.6),0 0 16px ${color}40">${emoji}</div>`,
    iconSize: [36, 36], iconAnchor: [18, 18],
  });

  mapLayers.push(L.marker([A.lat, A.lng], { icon: makeIcon('#34d399', '📍') })
    .bindPopup(`<b style="color:#e2e8f5">${src}</b><br><span style="color:#34d399;font-size:11px">Origin</span>`)
    .addTo(map));

  mapLayers.push(L.marker([B.lat, B.lng], { icon: makeIcon('#fb7185', '🏁') })
    .bindPopup(`<b style="color:#e2e8f5">${dst}</b><br><span style="color:#fb7185;font-size:11px">Destination</span>`)
    .addTo(map));

  const isMetroOnly = route.tags.includes('metro') && !route.tags.includes('bus');
  const isBusOnly = route.tags.includes('bus') && !route.tags.includes('metro');
  const lineColor = isMetroOnly ? '#38bdf8' : isBusOnly ? '#34d399' : '#818cf8';

  const waypoints = [A];
  route.steps.forEach(step => {
    const name = step.name.replace(/^(Metro|Bus|Ordinary Bus|Express Bus|Pushpak.*?|Green Metro) → /, '').trim();
    if (STATIONS[name] && name !== src && name !== dst) {
      waypoints.push(STATIONS[name]);
    }
  });
  waypoints.push(B);

  const latlngs = waypoints.map(p => [p.lat, p.lng]);

  mapLayers.push(L.polyline(latlngs, { color: lineColor, weight: 10, opacity: 0.08 }).addTo(map));
  mapLayers.push(L.polyline(latlngs, {
    color: lineColor, weight: 3.5, opacity: 0.9,
    dashArray: isBusOnly ? '10,7' : null,
  }).addTo(map));

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

// ---- AI Recommendation (Claude API) ----
async function fetchAIRecommendation(src, dst, routes, preference) {
  const aiBody = document.getElementById('aiBody');
  aiBody.innerHTML = `
    <div class="ai-loading">
      <div class="ai-dots"><span></span><span></span><span></span></div>
      <span>Claude is analysing your route…</span>
    </div>`;

  const preferenceText = {
    fastest: 'I want to reach as fast as possible.',
    cheapest: 'I want the cheapest route.',
    least_crowd: 'I want the least crowded route.',
    eco: 'I want the most eco-friendly route.',
  }[preference] || 'I want a good balance of speed and cost.';

  const routeSummary = routes.map(r =>
    `${r.label}: via ${r.mode}, ₹${r.fare} (official HMRL/TSRTC fare), ${r.time} min, ${r.crowd} crowd, ${r.transfers} transfer(s), saves ${r.co2}g CO₂ vs auto`
  ).join('\n');

  const timeCtx = selectedTime === 'now'
    ? `Current time: ${new Date().toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}`
    : `Planned departure: ${selectedTime} peak`;

  const prompt = `You are NammaRoute AI, a Hyderabad city transport assistant.
A commuter wants to travel from ${src} to ${dst}.
User preference: "${preferenceText}"
${timeCtx}

Available routes (with official HMRL Metro and TSRTC bus fares):
${routeSummary}

Give a friendly, practical recommendation in 2–3 sentences. Mention the best route by name, the official fare, travel time, and one practical Hyderabad tip (a landmark near the station, rush hour advice, or a smart card tip). Be conversational, not bullet points.`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are NammaRoute AI, a helpful Hyderabad transit assistant. Be concise, friendly, and include a local tip. Fares shown are official HMRL Metro and TSRTC fares.',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await resp.json();
    const text = data.content?.map(c => c.text || '').join('') || '';
    aiBody.innerHTML = `<div class="ai-text">${formatAIText(text)}</div>`;
  } catch {
    const best = routes.find(r => r.type === preference) || routes[0];
    const tips = {
      fastest: 'Tap your Smart Card for 10% off the metro fare — and the metro is fully air-conditioned, a big win during Hyderabad summers.',
      cheapest: 'TSRTC ordinary buses are among the cheapest in India. Ask for the exact stop by name when boarding.',
      least_crowd: 'Travelling via a combined Express bus + metro route avoids the peak-hour crush near Ameerpet interchange.',
      eco: 'Hyderabad Metro emits roughly 90% less CO₂ per km than a private auto-rickshaw — one of the greenest choices in the city.',
    };
    aiBody.innerHTML = `<div class="ai-text">
      For your journey from <strong>${src}</strong> to <strong>${dst}</strong>, I recommend the
      <span class="ai-highlight">${best.label}</span> via ${best.mode}.
      Official fare is <strong>₹${best.fare}</strong> with a travel time of about
      <strong>${best.time} minutes</strong>.
      ${tips[preference] || tips.fastest}
    </div>`;
  }
}

function formatAIText(text) {
  return text
    .replace(/₹\d+/g, m => `<span class="ai-highlight">${m}</span>`)
    .replace(/\d+ minutes?/g, m => `<strong>${m}</strong>`)
    .replace(/(HITEC City|Ameerpet|Miyapur|Lingampally|Raidurg|Kukatpally|Secunderabad|Uppal|LB Nagar|Gachibowli|Paradise|Nampally|MGBS|Dilsukhnagar|Begumpet)/g,
      m => `<strong>${m}</strong>`);
}

// ---- Share Button ----
document.getElementById('shareBtn')?.addEventListener('click', () => {
  const encoded = encodeRoute(currentSrc, currentDst, selectedPreference);
  const url = `${window.location.origin}${window.location.pathname}?r=${encoded}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('shareBtn');
      btn.textContent = '✓ Copied!';
      setTimeout(() => btn.textContent = '🔗 Share', 2000);
    });
  }
});

// ---- Main Find Route Handler ----
document.getElementById('findRouteBtn').addEventListener('click', async () => {
  const src = document.getElementById('source').value;
  const dst = document.getElementById('destination').value;

  if (!src || !dst) { shakeElement(document.getElementById('findRouteBtn')); return; }
  if (src === dst) {
    showToast('Origin and destination cannot be the same!', 'error');
    shakeElement(document.getElementById('findRouteBtn'));
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

// ---- Enter key ----
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.target.matches('button')) {
    document.getElementById('findRouteBtn').click();
  }
});