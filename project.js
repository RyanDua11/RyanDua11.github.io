/* ==========================================================================
   project.js — página de case study de cada projeto. Storytelling curto
   (motivação -> construção -> números) no topo, botão de convite pro README
   completo (blocks), que fica logo abaixo âncora #readme.
   ========================================================================== */

const LANG_STORAGE_KEY = 'portfolio-lang';
const LANG_HTML_TAG = { pt: 'pt-BR', en: 'en' };
const AVAILABLE_LANGS = ['pt', 'en'];

const UI_TEXT = {
  pt: { back: 'Voltar ao portfólio', visionBadge: 'Visão futura, ainda não implementado', prev: 'Anterior', next: 'Próximo', notFoundTitle: 'Projeto não encontrado', notFoundDesc: 'Esse case study não existe.', readmeCta: 'Ver histórico técnico completo', readmeGithub: 'Ver README completo no GitHub', motivation: 'Motivação', built: 'O que foi construído', numbers: 'Números de impacto', skipLink: 'Pular para o conteúdo', lightboxClose: 'Fechar' },
  en: { back: 'Back to portfolio', visionBadge: 'Future vision, not built yet', prev: 'Previous', next: 'Next', notFoundTitle: 'Project not found', notFoundDesc: "This case study doesn't exist.", readmeCta: 'See the full technical history', readmeGithub: 'View full README on GitHub', motivation: 'Motivation', built: 'What was built', numbers: 'Impact numbers', skipLink: 'Skip to content', lightboxClose: 'Close' },
};

function getLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && AVAILABLE_LANGS.includes(urlLang)) return urlLang;
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && AVAILABLE_LANGS.includes(saved)) return saved;
  return 'pt';
}

function getSlugFromUrl() {
  const fromBody = document.body.getAttribute('data-project-slug');
  if (fromBody && fromBody !== '{{SLUG}}') return fromBody;
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('slug');
  if (fromQuery) return fromQuery;
  const segments = window.location.pathname.split('/').filter(Boolean);
  const projIndex = segments.indexOf('projetos');
  if (projIndex !== -1 && segments[projIndex + 1]) return segments[projIndex + 1];
  return null;
}

function setUrlParam(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url);
}

let currentLang = getLangFromUrl();
const slug = getSlugFromUrl();
const project = PROJECTS_CONTENT[slug];

function renderBlockInner(block) {
  switch (block.t) {
    case 'h2':
      return `<h2 class="cs-h2">${block.text}</h2>`;
    case 'p':
      return `<p class="cs-p">${block.text}</p>`;
    case 'visual':
      return `<div class="cs-visual"><span class="cs-visual-label">${block.label}</span><p>${block.text}</p></div>`;
    case 'stats':
      return `<div class="cs-stats">${block.items.map(i => {
        const numeric = /^\d+$/.test(i.num);
        return `
        <div class="cs-stat">
          <div class="cs-stat-num"${numeric ? ` data-count-to="${i.num}"` : ''}>${numeric ? '0' : i.num}</div>
          <div class="cs-stat-label">${i.label}</div>
        </div>`;
      }).join('')}</div>`;
    case 'vision':
      return `<div class="cs-vision"><span class="cs-vision-badge">${UI_TEXT[currentLang].visionBadge}</span><p>${block.text}</p></div>`;
    case 'status':
      return `<div class="cs-status-block"><p>${block.text}</p></div>`;
    case 'gallery':
      return `<div class="cs-gallery"><span class="cs-gallery-label">${block.label}</span><div class="cs-gallery-grid">${block.items.map(item => `
        <a class="cs-shot" href="${item.src}" data-lightbox-src="${item.src}" data-lightbox-caption="${item.caption}">
          <img src="${item.src}" alt="${item.caption}" loading="lazy" />
          <span class="cs-shot-caption">${item.caption}</span>
        </a>`).join('')}</div></div>`;
    case 'diagram':
      return `<div class="cs-diagram"><span class="cs-diagram-label">${block.label}</span><div class="cs-diagram-flow">${block.nodes.map((node, i) => `
        ${i > 0 ? `<span class="cs-diagram-arrow" aria-hidden="true" style="--stagger-i:${i * 2 - 1}"></span>` : ''}
        <div class="cs-diagram-node" style="--stagger-i:${i * 2}">
          <span class="cs-diagram-node-title">${node.title}</span>
          <span class="cs-diagram-node-desc">${node.desc}</span>
        </div>`).join('')}</div></div>`;
    default:
      return '';
  }
}

function renderBlock(block) {
  return `<div class="cs-reveal">${renderBlockInner(block)}</div>`;
}

function renderIntro(intro, t) {
  if (!intro) return '';
  return `
    <div class="cs-intro-item cs-reveal">
      <span class="cs-intro-label">${t.motivation}</span>
      <p>${intro.motivation}</p>
    </div>
    <div class="cs-intro-item cs-reveal">
      <span class="cs-intro-label">${t.built}</span>
      <p>${intro.built}</p>
    </div>
    <div class="cs-intro-item cs-reveal">
      <span class="cs-intro-label">${t.numbers}</span>
      <p>${intro.numbers}</p>
    </div>`;
}

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count-to'), 10);
  if (!target && target !== 0) return;
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

let revealObserver = null;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('[data-count-to]').forEach(el => {
        if (prefersReduced) { el.textContent = el.getAttribute('data-count-to'); }
        else animateCount(el);
      });
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .2, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.cs-reveal').forEach(el => {
    if (prefersReduced) { el.classList.add('visible'); return; }
    revealObserver.observe(el);
  });
}

function linkIconSvg(type) {
  if (type === 'github') {
    return '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
  }
  if (type === 'external') {
    return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>';
  }
  return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2M22 12a10 10 0 11-20 0 10 10 0 0120 0z"/></svg>';
}

function renderNotFound() {
  const t = UI_TEXT[currentLang];
  document.getElementById('meta-title').textContent = `${t.notFoundTitle} — ryan.dev`;
  document.getElementById('cs-hero').style.display = 'none';
  const intro = document.getElementById('cs-intro');
  if (intro) intro.innerHTML = '';
  const cta = document.getElementById('readme-cta');
  if (cta) cta.style.display = 'none';
  const readmeGithubEl = document.getElementById('cs-readme-github');
  if (readmeGithubEl) readmeGithubEl.style.display = 'none';
  document.getElementById('cs-body').innerHTML = `<p class="cs-p">${t.notFoundDesc}</p>`;
  document.getElementById('cs-footer-links').innerHTML = '';
  const adjacent = document.getElementById('cs-adjacent');
  if (adjacent) adjacent.innerHTML = '';
}

function render() {
  document.getElementById('html-root').setAttribute('lang', LANG_HTML_TAG[currentLang] || currentLang);

  if (!project) { renderNotFound(); return; }

  const data = project[currentLang] || project.pt;
  const intro = project.intro && (project.intro[currentLang] || project.intro.pt);
  const t = UI_TEXT[currentLang];

  const root = document.documentElement;
  root.style.setProperty('--case-accent', project.accent);
  root.style.setProperty('--case-accent2', project.accent2);

  document.getElementById('meta-title').textContent = `${data.name} — Case Study — ryan.dev`;
  document.getElementById('meta-description').setAttribute('content', (intro && intro.motivation.slice(0, 155)) || '');

  document.getElementById('cs-icon').innerHTML = project.icon;
  document.getElementById('cs-type-badge').textContent = project.typeBadge[currentLang] || project.typeBadge.pt;
  document.getElementById('cs-name').textContent = data.name;
  document.getElementById('cs-status').innerHTML = `<span class="cs-status-dot"></span>${data.status}`;

  // botao dedicado pro README completo no GitHub, um destino por projeto
  const readmeGithubEl = document.getElementById('cs-readme-github');
  if (readmeGithubEl) {
    if (project.readme) {
      readmeGithubEl.href = project.readme;
      readmeGithubEl.innerHTML = `${linkIconSvg('github')}<span>${t.readmeGithub}</span>`;
      readmeGithubEl.style.display = '';
    } else {
      readmeGithubEl.style.display = 'none';
    }
  }

  document.getElementById('cs-intro').innerHTML = renderIntro(intro, t);

  // O id vira "readme" (âncora do CTA) já na primeira renderização, então
  // trocas de idioma seguintes precisam achar o elemento por esse id.
  const readmeBody = document.getElementById('cs-body') || document.getElementById('readme');
  readmeBody.innerHTML = data.blocks.map(b => renderBlock(b)).join('');
  readmeBody.id = 'readme';
  readmeBody.classList.add('cs-body');

  document.querySelectorAll('[data-i18n="readmeCta"]').forEach(el => { el.textContent = t.readmeCta; });

  // link externo (github/site/em desenvolvimento). type "hidden" oculta o
  // bloco inteiro: usado quando o botao dedicado de README (topo do rodape
  // do conteudo) ja leva pro mesmo destino, e o link do rodape ficaria duplicado.
  const linkWrap = document.getElementById('cs-footer-links');
  const link = project.link;
  if (link.type === 'hidden') {
    linkWrap.style.display = 'none';
  } else {
    linkWrap.style.display = '';
    const linkLabel = link.label[currentLang] || link.label.pt;
    if (link.type === 'none') {
      linkWrap.innerHTML = `<span class="cs-ext-link cs-ext-link-disabled">${linkIconSvg('none')}${linkLabel}</span>`;
    } else {
      linkWrap.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener" class="cs-ext-link">${linkIconSvg(link.type)}${linkLabel}</a>`;
    }
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('#lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });

  renderAdjacentNav(t);
  observeReveals();
}

function renderAdjacentNav(t) {
  const wrap = document.getElementById('cs-adjacent');
  if (!wrap) return;
  const i = PROJECT_ORDER.indexOf(slug);
  if (i === -1) { wrap.innerHTML = ''; return; }

  const prevSlug = PROJECT_ORDER[(i - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length];
  const nextSlug = PROJECT_ORDER[(i + 1) % PROJECT_ORDER.length];
  const prevProj = PROJECTS_CONTENT[prevSlug];
  const nextProj = PROJECTS_CONTENT[nextSlug];
  const prevName = (prevProj[currentLang] || prevProj.pt).name;
  const nextName = (nextProj[currentLang] || nextProj.pt).name;

  wrap.innerHTML = `
    <a href="../${prevSlug}/index.html" class="cs-adjacent-link cs-adjacent-prev" style="--adj-accent:${prevProj.accent}">
      <span class="cs-adjacent-dir">← ${t.prev}</span>
      <span class="cs-adjacent-name">${prevName}</span>
    </a>
    <a href="../${nextSlug}/index.html" class="cs-adjacent-link cs-adjacent-next" style="--adj-accent:${nextProj.accent}">
      <span class="cs-adjacent-dir">${t.next} →</span>
      <span class="cs-adjacent-name">${nextName}</span>
    </a>`;
}

function switchLang(lang) {
  if (lang === currentLang) return;
  document.body.classList.add('i18n-fading');
  setTimeout(() => {
    currentLang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    setUrlParam('lang', lang);
    render();
    document.body.classList.remove('i18n-fading');
  }, 180);
}

document.body.classList.add('i18n-fade');
render();

document.getElementById('lang-switch').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-lang]');
  if (btn) switchLang(btn.getAttribute('data-lang'));
});

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── LIGHTBOX: abre os prints da galeria em overlay, sem sair do site ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
let lastFocusedEl = null;

function openLightbox(src, caption) {
  lastFocusedEl = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = caption || '';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose.setAttribute('aria-label', UI_TEXT[currentLang].lightboxClose);
  document.documentElement.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('lightbox-open');
  lightboxImg.src = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.addEventListener('click', (e) => {
  const shot = e.target.closest('[data-lightbox-src]');
  if (shot) {
    e.preventDefault();
    openLightbox(shot.getAttribute('data-lightbox-src'), shot.getAttribute('data-lightbox-caption'));
    return;
  }
  if (lightbox.classList.contains('active') && (e.target === lightbox || e.target === lightboxClose)) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});
