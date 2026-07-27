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

const EASE = 0.06;
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

  const r = Math.max(W, H) * RADIUS_RATIO;
  const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, r);
  const PEAK = 0.11;
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
