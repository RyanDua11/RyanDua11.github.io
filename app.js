/* ==========================================================================
   app.js — idioma por ?lang=/localStorage, montagem do DOM, scroll reveal
   e parallax leve entre texto (fixo) e fundo (glow/grain).
   ========================================================================== */

const LANG_STORAGE_KEY = 'portfolio-lang';
const LANG_HTML_TAG = { pt: 'pt-BR', en: 'en' };

function getAvailableLangs() {
  return Object.keys(CONTENT);
}

function getLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const available = getAvailableLangs();
  if (urlLang && available.includes(urlLang)) return urlLang;

  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && available.includes(saved)) return saved;

  return 'pt';
}

function getVersionFromUrl() {
  return new URLSearchParams(window.location.search).get('v');
}

function resolvePath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function setUrlParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url);
}

let currentLang = getLangFromUrl();

function setMeta(data) {
  document.getElementById('meta-title').textContent = data.metaTitle;
  document.getElementById('meta-description').setAttribute('content', data.metaDesc);
  document.getElementById('meta-og-title').setAttribute('content', data.metaTitle);
  document.getElementById('meta-og-description').setAttribute('content', data.metaDesc);
}

function renderStats(container, stats) {
  container.innerHTML = stats.map((s) => `
    <div class="hero-stat">
      <div class="hero-stat-num">${s.num}</div>
      <div class="hero-stat-label">${s.label}</div>
    </div>`).join('');
}

function renderProjectsGrid(lang) {
  const container = document.getElementById('projects-grid');
  if (!container || typeof PROJECTS_CONTENT === 'undefined') return;

  container.innerHTML = PROJECT_ORDER.map((slug) => {
    const proj = PROJECTS_CONTENT[slug];
    const data = proj[lang] || proj.pt;
    const metric = (proj.cardMetric && (proj.cardMetric[lang] || proj.cardMetric.pt)) || '';
    return `
      <a href="projetos/${slug}/index.html" class="project-card reveal-up" style="--project-accent:${proj.accent}">
        <span class="project-card-icon">${proj.icon}</span>
        <span class="project-card-badge">${proj.typeBadge[lang] || proj.typeBadge.pt}</span>
        <span class="project-card-name">${data.name}</span>
        <span class="project-card-metric">${metric}</span>
      </a>`;
  }).join('');

  observeReveals();
}

function renderAbout(lang) {
  const el = document.getElementById('about-body');
  const section = document.getElementById('about');
  if (!el) return;
  const html = CONTENT[lang]?.about?.bodyHtml || '';
  el.innerHTML = html;
  if (section) section.style.display = html ? '' : 'none';
}

function renderTimeline(lang) {
  const el = document.getElementById('about-timeline');
  if (!el || typeof TIMELINE === 'undefined') return;
  const items = TIMELINE[lang] || TIMELINE.pt;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal-up">
      <div class="timeline-marker"><span class="timeline-dot"></span></div>
      <div class="timeline-content">
        <span class="timeline-date">${item.year} &middot; ${item.label}</span>
        <span class="timeline-title">${item.title}</span>
        <span class="timeline-desc">${item.desc}</span>
      </div>
    </div>`).join('');
  observeReveals();
}

function renderLangSwitch(lang) {
  const available = getAvailableLangs();
  document.querySelectorAll('#lang-switch button').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    btn.style.display = available.includes(btnLang) ? '' : 'none';
    btn.classList.toggle('active', btnLang === lang);
  });
}

function applyContent(lang) {
  const data = CONTENT[lang];
  if (!data) return;

  document.getElementById('html-root').setAttribute('lang', LANG_HTML_TAG[lang] || lang);
  const estagioMeta = getVersionFromUrl() === 'estagio' ? ESTAGIO_META[lang] : null;
  setMeta(estagioMeta ? { ...data, ...estagioMeta } : data);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolvePath(data, el.getAttribute('data-i18n'));
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = resolvePath(data, el.getAttribute('data-i18n-html'));
    if (val !== undefined) el.innerHTML = val;
  });

  renderStats(document.getElementById('hero-stats'), data.stats);
  renderProjectsGrid(lang);
  renderAbout(lang);
  renderTimeline(lang);
  renderLangSwitch(lang);

  document.querySelectorAll('.cert-academic-detail').forEach(el => {
    el.style.display = '';
  });

  const wa = document.getElementById('whatsapp-link');
  if (wa) {
    const text = WHATSAPP_TEXT[lang] || WHATSAPP_TEXT.pt;
    wa.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }
}

function switchLang(lang) {
  if (lang === currentLang) return;
  const main = document.body;
  main.classList.add('i18n-fading');
  setTimeout(() => {
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    setUrlParam('lang', lang);
    applyContent(currentLang);
    main.classList.remove('i18n-fading');
  }, 180);
}

// ── SCROLL REVEAL: fade + sobe de baixo pra cima ──
// Declarado antes do primeiro applyContent() abaixo: renderProjectsGrid chama
// observeReveals(), que precisa de revealObserver já inicializado (senão
// "let" ainda em temporal dead zone quebra o applyContent inteiro em silêncio).
let revealObserver = null;
function observeReveals() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        if (prefersReduced) entry.target.classList.add('visible');
        else setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12 });
  }
  document.querySelectorAll('.reveal-up:not(.visible)').forEach(el => {
    if (prefersReduced) { el.classList.add('visible'); return; }
    revealObserver.observe(el);
  });
}

document.body.classList.add('i18n-fade');
applyContent(currentLang);
observeReveals();

// ── SPOTLIGHT + TILT: brilho e inclinação leve seguindo o mouse nos cards ──
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      card.style.setProperty('--spot-x', `${px * 100}%`);
      card.style.setProperty('--spot-y', `${py * 100}%`);
      card.style.setProperty('--tilt-y', `${(px - .5) * 6}deg`);
      card.style.setProperty('--tilt-x', `${(.5 - py) * 6}deg`);
    });
    projectsGrid.addEventListener('mouseleave', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    }, true);
  }
}

document.getElementById('lang-switch').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-lang]');
  if (btn) switchLang(btn.getAttribute('data-lang'));
});

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('open');
}));

// ── NAV ACTIVE SECTION (scroll spy) ──
const navSections = ['projects', 'about', 'certs', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinkFor = id => document.querySelector(`.nav-links a[href="#${id}"]`);
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = navLinkFor(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
navSections.forEach(s => spy.observe(s));

// ── PARALLAX: fundo (glow/grain) se move mais devagar que o conteúdo ──
const parallaxLayers = [document.getElementById('canvas-bg'), document.getElementById('grain')].filter(Boolean);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const offset = window.scrollY * 0.18;
      parallaxLayers.forEach(layer => {
        layer.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    });
  });
}
