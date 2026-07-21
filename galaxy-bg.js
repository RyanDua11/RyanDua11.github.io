/* ==========================================================================
   galaxy-bg.js — fundo animado (estrelas, nébulas, código flutuante)
   Adaptado do canvas original do portfólio, recolorido para a paleta dourada.
   ========================================================================== */

const canvas = document.getElementById('canvas-bg');
const ctx    = canvas.getContext('2d');
let W, H, cx, cy, mouse = { x: 0, y: 0 };

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  cx = W / 2; cy = H / 2;
}
resize();
window.addEventListener('resize', () => { resize(); initAll(); });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

// ── STARS ──
const STAR_COUNT = 120;
let stars = [];

class Star {
  constructor() { this.init(); }
  init() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.size  = Math.random() * 1.8 + .2;
    this.baseA = Math.random() * .7 + .1;
    this.a     = this.baseA;
    this.twinkleSpeed = Math.random() * .02 + .005;
    this.twinkleOff   = Math.random() * Math.PI * 2;
    this.color = Math.random() > .85
      ? `rgba(255,220,160,`
      : Math.random() > .5
        ? `rgba(255,245,225,`
        : `rgba(255,235,200,`;
    if (Math.random() > .94) this.color = `rgba(244,208,111,`;
  }
  update(t) { this.a = this.baseA * (.6 + .4 * Math.sin(t * this.twinkleSpeed * 60 + this.twinkleOff)); }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.a + ')';
    ctx.fill();
    if (this.size > 1.3) {
      ctx.shadowBlur  = 6;
      ctx.shadowColor = this.color + this.a + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.a + ')';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

// ── SHOOTING STARS ──
let shooters = [];
class Shooter {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H * .5;
    this.len = Math.random() * 120 + 60;
    this.spd = Math.random() * 6 + 4;
    this.a = 1;
    this.angle = Math.PI / 4 + (Math.random() - .5) * .3;
    this.life = 0;
    this.maxLife = this.len / this.spd;
    this.active = false;
  }
  update() {
    if (!this.active) return;
    this.x += Math.cos(this.angle) * this.spd;
    this.y += Math.sin(this.angle) * this.spd;
    this.life++;
    this.a = 1 - (this.life / this.maxLife);
    if (this.life >= this.maxLife) { this.active = false; this.reset(); }
  }
  draw() {
    if (!this.active) return;
    const tx = this.x - Math.cos(this.angle) * this.len * (1 - this.a);
    const g = ctx.createLinearGradient(tx, this.y - Math.sin(this.angle) * this.len * (1-this.a), this.x, this.y);
    g.addColorStop(0, `rgba(244,208,111,0)`);
    g.addColorStop(1, `rgba(244,208,111,${this.a * .8})`);
    ctx.beginPath();
    ctx.moveTo(tx, this.y - Math.sin(this.angle) * this.len * (1-this.a));
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
for (let i = 0; i < 3; i++) shooters.push(new Shooter());
let nextShoot = 0;

// ── NEBULA ──
let nebulae = [];
class Nebula {
  constructor(x, y, r, color) {
    this.ox = x; this.oy = y; this.x = x; this.y = y; this.r = r; this.color = color;
    this.phase = Math.random() * Math.PI * 2;
  }
  update(t) {
    this.x = this.ox + Math.sin(t * .0003 + this.phase) * 40;
    this.y = this.oy + Math.cos(t * .0002 + this.phase) * 25;
  }
  draw() {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0, this.color.replace('A', '.16'));
    g.addColorStop(.4, this.color.replace('A', '.07'));
    g.addColorStop(1, this.color.replace('A', '0'));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
}

// ── GALAXY SPIRAL ──
let galaxyParticles = [];
class GalaxyParticle {
  constructor() { this.init(); }
  init() {
    const arm = Math.floor(Math.random() * 3);
    const dist = Math.random() * Math.min(W, H) * .38 + 20;
    const angle = arm * (Math.PI * 2 / 3) + dist * .012 + (Math.random() - .5) * .8;
    const spread = Math.random() * dist * .18;
    this.dist = dist + (Math.random() - .5) * spread;
    this.speed = (.0003 + Math.random() * .0002) * (Math.random() > .5 ? 1 : -1) * .3;
    this.angle = angle + (Math.random() - .5) * .5;
    this.size = Math.random() * 1.2 + .3;
    this.a = Math.random() * .6 + .15;
    const t = dist / (Math.min(W, H) * .38);
    if (t < .2) this.color = `rgba(255,210,140,`;
    else if (t < .5) this.color = `rgba(244,208,111,`;
    else if (Math.random() > .7) this.color = `rgba(230,180,110,`;
    else this.color = `rgba(210,190,150,`;
  }
  update() { this.angle += this.speed; }
  draw() {
    const mx = cx + Math.cos(this.angle) * this.dist + (mouse.x - cx) * .01;
    const my = cy + Math.sin(this.angle) * this.dist + (mouse.y - cy) * .01;
    ctx.beginPath();
    ctx.arc(mx, my, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.a + ')';
    ctx.fill();
  }
}

// ── CODE FRAGMENTS ──
const CODE_SNIPPETS = [
  '@app.get("/tasks")', 'SELECT * FROM tasks', 'docker-compose up -d',
  'git commit -m "feat"', 'async def analyze():', 'useState<Task[]>([])',
  'Spring Boot 4.1', 'Hibernate ORM', 'FastAPI + PostgreSQL',
  'docker build -t api .', 'npm run build', 'psql -U postgres',
  'score = sum(weights)', 'response.json()', 'useEffect(() => {',
  'Bearer {token}', '@Entity @Table', 'curl -X POST /api',
  'CREATE INDEX ON tasks', '.filter(t => t.done)', 'Promise.all([',
  'from fastapi import', 'import java.util.*', 'const router = useRouter()',
  '@RestController', 'volumes:\n  - pgdata', 'LLaMA 70B via Groq',
  'gemini-pro', 'supabase.auth.signIn', 'stripe.checkout',
  'BeautifulSoup(html)', 'res.status(200).json', 'ON CONFLICT DO UPDATE',
  'LAG() OVER (PARTITION BY)', 'AVG() OVER (ROWS 2 PRECEDING)',
  'REFRESH MATERIALIZED VIEW', 'PARTITION BY RANGE (data)',
  'CREATE INDEX USING GIN', 'RANK() OVER (ORDER BY)',
];

let codeFragments = [];
class CodeFragment {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : H + 30;
    this.vy = -(Math.random() * .3 + .1);
    this.vx = (Math.random() - .5) * .12;
    this.a = 0;
    this.maxA = Math.random() * .18 + .08;
    this.phase = 'in';
    this.life = 0;
    this.maxLife = Math.random() * 600 + 400;
    this.size = Math.random() * 2 + 9;
    const colors = ['244,208,111', '227,181,63', '201,168,76', '245,224,170'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    if (init) { this.a = Math.random() * this.maxA; this.life = Math.random() * this.maxLife; }
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    if (this.phase === 'in') {
      this.a = Math.min(this.a + .001, this.maxA);
      if (this.a >= this.maxA) this.phase = 'hold';
    }
    if (this.phase === 'hold' && this.life > this.maxLife * .7) this.phase = 'out';
    if (this.phase === 'out') {
      this.a = Math.max(this.a - .001, 0);
      if (this.a <= 0) this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.font = `${this.size}px 'Fira Code', monospace`;
    ctx.fillStyle = `rgba(${this.color},${this.a})`;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

function drawCore(t) {
  const pulse = .8 + .2 * Math.sin(t * .001);
  const r = Math.min(W, H) * .05 * pulse;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0,  `rgba(255,225,170,.14)`);
  g.addColorStop(.4, `rgba(244,208,111,.06)`);
  g.addColorStop(1,  `rgba(0,0,0,0)`);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
}

function initAll() {
  stars = Array.from({ length: STAR_COUNT }, () => new Star());
  galaxyParticles = Array.from({ length: 140 }, () => new GalaxyParticle());
  codeFragments = Array.from({ length: 14 }, () => new CodeFragment());
  nebulae = [
    new Nebula(W * .25, H * .3,  Math.min(W,H)*.22, 'rgba(230,180,90,A)'),
    new Nebula(W * .75, H * .6,  Math.min(W,H)*.18, 'rgba(200,150,70,A)'),
    new Nebula(W * .5,  H * .5,  Math.min(W,H)*.3,  'rgba(244,208,111,A)'),
    new Nebula(W * .15, H * .75, Math.min(W,H)*.15, 'rgba(180,140,90,A)'),
    new Nebula(W * .85, H * .2,  Math.min(W,H)*.13, 'rgba(220,170,100,A)'),
  ];
}
initAll();

let t = 0;
function animate() {
  ctx.clearRect(0, 0, W, H);
  t++;
  nebulae.forEach(n => { n.update(t); n.draw(); });
  stars.forEach(s => { s.update(t); s.draw(); });
  drawCore(t);
  galaxyParticles.forEach(p => { p.update(); p.draw(); });
  if (t > nextShoot) {
    const s = shooters.find(s => !s.active);
    if (s) s.active = true;
    nextShoot = t + Math.random() * 300 + 150;
  }
  shooters.forEach(s => { s.update(); s.draw(); });
  codeFragments.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(animate);
}
animate();
