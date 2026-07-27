/* ==========================================================================
   galaxy-bg.js — glow radial laranja (#FF6B35) seguindo o cursor, com
   easing suave (nunca 1:1 instantâneo). Sem partículas/estrelinhas.
   ========================================================================== */

const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H;

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

function draw() {
  ctx.clearRect(0, 0, W, H);

  glow.x += (glow.targetX - glow.x) * EASE;
  glow.y += (glow.targetY - glow.y) * EASE;

  const r = Math.max(W, H) * RADIUS_RATIO;
  const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, r);
  const PEAK = 0.11;
  const STEPS = 12;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const alpha = PEAK * Math.pow(1 - t, 2.6);
    g.addColorStop(t, `rgba(255,107,53,${alpha.toFixed(4)})`);
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  requestAnimationFrame(draw);
}
draw();
