/* ==========================================================================
   app.js — roteamento por ?v=, idioma por ?lang=/localStorage, montagem do DOM
   ========================================================================== */

const VALID_VERSIONS = ['default', 'estagio', 'freela-quickfix', 'freela-ai', 'freelance'];
const REVIEW_VERSIONS = ['freela-quickfix', 'freelance'];
// Os cards dos 3 bugs (CSS/autofill/login) só fazem sentido na versão de
// correção rápida, onde debugar É o produto. Nas outras, o processo em 4 passos
// já sinaliza método sem soar irrelevante pro cliente.
const BUGS_VERSIONS = ['freela-quickfix'];
// Currículo (.docx) só faz sentido nas versões acadêmicas; nas de freela o portfólio já é a prova.
const CV_VERSIONS = ['default', 'estagio'];
// datas/semestre da faculdade só fazem sentido nas versões acadêmicas; pro cliente
// de freela, "cursando 2º semestre" enfraquece a percepção de profissional experiente.
const ACADEMIC_DETAIL_VERSIONS = ['default', 'estagio'];
const LANG_STORAGE_KEY = 'portfolio-lang';

const FACT_ICONS = [
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 17h16M4 12h10M4 7h13"/></svg>', // projetos
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5"/></svg>', // certificações
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>', // tecnologias
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 12a3 3 0 106 0 3 3 0 106 0 3 3 0 10-6 0 3 3 0 10-6 0z"/></svg>', // commits (infinito)
];

function getVersionFromUrl() {
  const v = new URLSearchParams(window.location.search).get('v');
  return VALID_VERSIONS.includes(v) ? v : 'default';
}

function getAvailableLangs(version) {
  return Object.keys(CONTENT[version]);
}

function getLangFromUrl(version) {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  const available = getAvailableLangs(version);
  if (urlLang && available.includes(urlLang)) return urlLang;

  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && available.includes(saved)) return saved;

  const def = DEFAULT_LANG[version];
  return available.includes(def) ? def : available[0];
}

function resolvePath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function setUrlParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url);
}

const LANG_HTML_TAG = { pt: 'pt-BR', en: 'en', es: 'es' };

let currentVersion = getVersionFromUrl();
let currentLang = getLangFromUrl(currentVersion);

function setMeta(data) {
  document.getElementById('meta-title').textContent = data.metaTitle;
  document.getElementById('meta-description').setAttribute('content', data.metaDesc);
  document.getElementById('meta-og-title').setAttribute('content', data.metaTitle);
  document.getElementById('meta-og-description').setAttribute('content', data.metaDesc);
}

function applyHaloTheme(version) {
  const theme = HALO_THEME[version] || HALO_THEME.default;
  const root = document.documentElement;
  root.style.setProperty('--halo-accent', theme.accent);
  root.style.setProperty('--halo-accent2', theme.accent2);
  root.style.setProperty('--halo-core-saturation', theme.coreSaturation);
}

function renderStats(container, stats) {
  container.innerHTML = stats.map((s, i) => `
    <div class="hero-stat">
      <div class="hero-stat-num">${s.num}</div>
      <div class="hero-stat-label">${s.label}</div>
    </div>`).join('');
}

function renderProjects(lang) {
  const items = PROJECT_ITEMS[lang] || PROJECT_ITEMS.pt;
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    const item = items[card.getAttribute('data-project')];
    if (!item) return;
    const set = (sel, val) => {
      const el = card.querySelector(sel);
      if (el && val != null) el.textContent = val;
    };
    set('[data-proj-desc]', item.desc);
    set('[data-proj-badge]', item.typeBadge);
    set('[data-proj-status]', item.status);
    set('[data-proj-link]', item.linkText);
  });
}

function renderProjectLearned(version, data) {
  const learned = data.projects && data.projects.learned;
  document.querySelectorAll('[data-learned]').forEach(el => {
    const key = el.getAttribute('data-learned');
    if (version === 'estagio' && learned && learned[key]) {
      el.textContent = learned[key];
      el.classList.add('show');
    } else {
      el.classList.remove('show');
      el.textContent = '';
    }
  });
}

function renderSkills(lang) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  const i18n = SKILL_I18N[lang] || SKILL_I18N.pt;
  grid.innerHTML = SKILL_GROUPS.map(group => {
    const chips = group.chips.map(c => {
      const label = c.tr ? (i18n.terms[c.tr] || c.tr) : c.t;
      const icon = c.i ? `<i class="${c.i}"></i>` : '';
      return `<span class="chip">${icon}${label}</span>`;
    }).join('');
    return `
      <div class="skill-group fade-up">
        <div class="skill-group-title">${i18n.groups[group.key] || group.key}</div>
        <div class="skill-chips">${chips}</div>
      </div>`;
  }).join('');
}

function renderReview(version, data, lang) {
  const section = document.getElementById('review');
  if (!REVIEW_VERSIONS.includes(version) || !data.review) {
    section.classList.remove('show');
    return;
  }
  section.classList.add('show');
  const labels = (SKILL_I18N[lang] || SKILL_I18N.pt).bugLabels;
  const stepsEl = document.getElementById('review-steps');
  stepsEl.innerHTML = data.review.steps.map(s => `
    <div class="review-step">
      <div class="review-step-n">${s.n}</div>
      <div class="review-step-title">${s.title}</div>
      <div class="review-step-desc">${s.desc}</div>
    </div>`).join('');

  const bugsEl = document.getElementById('bugs-grid');
  const bugsTitle = document.querySelector('.bugs-title');
  const showBugs = BUGS_VERSIONS.includes(version) && data.review.bugs;
  if (bugsTitle) bugsTitle.style.display = showBugs ? '' : 'none';
  bugsEl.style.display = showBugs ? '' : 'none';
  bugsEl.innerHTML = showBugs ? data.review.bugs.map(b => `
    <div class="bug-card">
      <div class="bug-title">${b.title}</div>
      <div class="bug-label">${labels.problem}</div>
      <div class="bug-text">${b.problem}</div>
      <div class="bug-label bug-fix-label">${labels.fix}</div>
      <div class="bug-text">${b.fix}</div>
    </div>`).join('') : '';
}

function renderLangSwitch(version, lang) {
  const available = getAvailableLangs(version);
  document.querySelectorAll('#lang-switch button').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    btn.style.display = available.includes(btnLang) ? '' : 'none';
    btn.classList.toggle('active', btnLang === lang);
  });
}

function applyContent(version, lang) {
  const data = CONTENT[version][lang];
  if (!data) return;

  document.getElementById('html-root').setAttribute('lang', LANG_HTML_TAG[lang] || lang);
  setMeta(data);
  applyHaloTheme(version);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolvePath(data, el.getAttribute('data-i18n'));
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = resolvePath(data, el.getAttribute('data-i18n-html'));
    if (val !== undefined) el.innerHTML = val;
  });

  renderStats(document.getElementById('hero-stats'), data.stats);
  renderSkills(lang);
  renderProjects(lang);
  renderProjectLearned(version, data);
  renderReview(version, data, lang);
  renderLangSwitch(version, lang);

  const cv = document.getElementById('cv-cta');
  if (cv) cv.style.display = CV_VERSIONS.includes(version) ? 'flex' : 'none';

  const showAcademicDetail = ACADEMIC_DETAIL_VERSIONS.includes(version);
  document.querySelectorAll('.cert-academic-detail').forEach(el => {
    el.style.display = showAcademicDetail ? '' : 'none';
  });
}

function switchLang(lang) {
  if (lang === currentLang) return;
  const main = document.body;
  main.classList.add('i18n-fading');
  setTimeout(() => {
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    setUrlParam('lang', lang);
    applyContent(currentVersion, currentLang);
    main.classList.remove('i18n-fading');
  }, 180);
}

document.body.classList.add('i18n-fade');
applyContent(currentVersion, currentLang);

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
const navSections = ['projects', 'certs', 'contact']
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

// ── PROJECT SPOTLIGHT ──
const projectGrid = document.querySelector('.projects-grid');
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => projectGrid.classList.add('has-hover'));
  card.addEventListener('mouseleave', () => projectGrid.classList.remove('has-hover'));
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── CAMPO DE FAGULHAS DO BURACO NEGRO (leque de partículas do disco) ──
function seedBlackHoleSparks() {
  const g = document.getElementById('bh-sparks');
  if (!g) return;
  const NS = 'http://www.w3.org/2000/svg';
  const rand = (a, b) => a + Math.random() * (b - a);

  // fagulhas cintilantes espalhadas pelo leque (baixo/direita do disco)
  for (let i = 0; i < 22; i++) {
    // amostra num setor elíptico inclinado, mais denso perto do disco
    const t = Math.pow(Math.random(), 0.6);          // viés para o centro do disco
    const ang = rand(-0.35, Math.PI + 0.15);          // metade de baixo, abrindo à direita
    const rx = 178, ry = 116;
    let x = 236 + Math.cos(ang) * rx * t;
    let y = 250 + Math.sin(ang) * ry * t;
    x += rand(-10, 10); y += rand(-8, 8);
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x.toFixed(1));
    c.setAttribute('cy', y.toFixed(1));
    c.setAttribute('r', rand(0.4, 1.9).toFixed(2));
    c.setAttribute('class', 'bh-spark');
    c.style.animationDelay = (-rand(0, 3)).toFixed(2) + 's';
    c.style.animationDuration = rand(2.2, 4.5).toFixed(2) + 's';
    g.appendChild(c);
  }

  // embers que sobem/derivam do disco para fora (spray)
  for (let i = 0; i < 6; i++) {
    const x = rand(150, 340), y = rand(210, 250);
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x.toFixed(1));
    c.setAttribute('cy', y.toFixed(1));
    c.setAttribute('r', rand(0.6, 1.4).toFixed(2));
    c.setAttribute('class', 'bh-spark');
    c.style.setProperty('--dx', rand(20, 70).toFixed(0) + 'px');
    c.style.setProperty('--dy', rand(30, 90).toFixed(0) + 'px');
    c.style.animation = `bh-drift ${rand(4, 7).toFixed(1)}s linear ${(-rand(0, 6)).toFixed(1)}s infinite`;
    g.appendChild(c);
  }
}
seedBlackHoleSparks();
