/* ==========================================================================
   galaxy-bg.js — mesh gradient: o glow laranja (#FF6B35) segue o cursor com
   easing suave, e dois blobs adicionais (dourado #C9A227 e vinho #7a2438,
   cores já usadas nos acentos dos projetos) derivam devagar em órbitas
   independentes, dando profundidade ao fundo sem partículas/estrelinhas.
   ========================================================================== */

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H;

const bgPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const glow = { x: 0, y: 0, targetX: 0, targetY: 0 };
let hasPointer = false;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (!hasPointer) {
    glow.x = glow.targetX = W / 2;
    glow.y = glow.targetY = H / 2;
  }
}
resize();
window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  hasPointer = true;
  glow.targetX = e.clientX;
  glow.targetY = e.clientY;
});

/* Spotlight: o glow intensifica levemente ao passar sobre algo clicável,
   confirmando "isso é interativo" sem precisar mudar o cursor. */
const HOVER_SELECTOR = 'a, button';
let hoverTarget = 0;
let hoverBoost = 0;

document.addEventListener('mouseover', (e) => {
  if (e.target.closest(HOVER_SELECTOR)) hoverTarget = 1;
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest(HOVER_SELECTOR)) hoverTarget = 0;
});

const EASE = 0.06;
const HOVER_EASE = 0.1;
const RADIUS_RATIO = 0.42;

/* Blobs de mesh: órbita elíptica lenta e independente entre si, só para
   dar textura de fundo (nunca competem com o glow do cursor em intensidade). */
const MESH_BLOBS = [
  { color: '201,162,39',  radiusRatio: .34, peak: .07, speed: .00011, phase: 0,    orbitX: .30, orbitY: .22, cx: .22, cy: .28 },
  { color: '122,36,56',   radiusRatio: .30, peak: .06, speed: .00008, phase: 2.4,  orbitX: .26, orbitY: .30, cx: .78, cy: .74 },
];

function drawBlob(t, blob) {
  const bx = (blob.cx + Math.sin(t * blob.speed + blob.phase) * blob.orbitX) * W;
  const by = (blob.cy + Math.cos(t * blob.speed * .8 + blob.phase) * blob.orbitY) * H;
  const r = Math.max(W, H) * blob.radiusRatio;
  const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
  const STEPS = 10;
  for (let i = 0; i <= STEPS; i++) {
    const s = i / STEPS;
    const alpha = blob.peak * Math.pow(1 - s, 2.6);
    g.addColorStop(s, `rgba(${blob.color},${alpha.toFixed(4)})`);
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function draw(t) {
  ctx.clearRect(0, 0, W, H);

  MESH_BLOBS.forEach(blob => drawBlob(t, blob));

  glow.x += (glow.targetX - glow.x) * EASE;
  glow.y += (glow.targetY - glow.y) * EASE;
  hoverBoost += (hoverTarget - hoverBoost) * HOVER_EASE;

  const r = Math.max(W, H) * RADIUS_RATIO * (1 + hoverBoost * 0.18);
  const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, r);
  const PEAK = 0.11 * (1 + hoverBoost * 0.9);
  const STEPS = 12;
  for (let i = 0; i <= STEPS; i++) {
    const s = i / STEPS;
    const alpha = PEAK * Math.pow(1 - s, 2.6);
    g.addColorStop(s, `rgba(255,107,53,${alpha.toFixed(4)})`);
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  if (!bgPrefersReducedMotion) requestAnimationFrame(draw);
}
draw(0);

/* Cursor magnético: botões (.btn) e links de ação (.cs-ext-link) se deslocam
   levemente na direção do cursor quando ele se aproxima, reforçando o alvo
   sem exagerar. Só em dispositivos com mouse de precisão (pointer: fine),
   pra não deixar "grudento" no touch, e desligado com reduced-motion. */
if (!bgPrefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const MAGNET_SELECTOR = '.btn, .cs-ext-link:not(.cs-ext-link-disabled)';
  const MAGNET_STRENGTH = 0.3;
  const MAGNET_MAX = 8;
  const MAGNET_LIFT = -2; // mesmo translateY(-2px) que o CSS já usa no hover
  let magnetEl = null;

  function resetMagnet(el) { el.style.transform = ''; }

  document.addEventListener('mousemove', (e) => {
    const target = e.target.closest(MAGNET_SELECTOR);
    if (target !== magnetEl) {
      if (magnetEl) resetMagnet(magnetEl);
      magnetEl = target;
    }
    if (!magnetEl) return;
    const rect = magnetEl.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const dx = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, relX * MAGNET_STRENGTH));
    const dy = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, relY * MAGNET_STRENGTH)) + MAGNET_LIFT;
    magnetEl.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  });

  document.addEventListener('mouseout', (e) => {
    if (magnetEl && e.target.closest(MAGNET_SELECTOR) === magnetEl && !magnetEl.contains(e.relatedTarget)) {
      resetMagnet(magnetEl);
      magnetEl = null;
    }
  });
}
