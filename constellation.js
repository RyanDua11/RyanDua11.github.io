/* ==========================================================================
   constellation.js — "O que eu construí" como 4 corpos celestes orbitando
   um centro, em vez de grid de cards. Fase 3: mecânica de hover (gancho de
   uma linha) e clique (transição "warp") substituindo o grid antigo.
   ========================================================================== */

function planetSignature(slug) {
  switch (slug) {
    case 'medistudy':
      return `
        <svg class="planet-ecg" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="planet-ring"/>
          <polyline class="planet-ecg-line" points="10,60 38,60 46,60 52,38 58,86 64,46 70,60 96,60 110,60"/>
        </svg>`;
    case 'candidatrack':
      return `
        <svg class="planet-neural" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="planet-ring"/>
          <circle class="planet-pulse-ring" cx="60" cy="60" r="20"/>
          <circle class="planet-pulse-ring planet-pulse-ring-2" cx="60" cy="60" r="20"/>
          <text x="60" y="72" text-anchor="middle" class="planet-emoji">🧠</text>
        </svg>`;
    case 'gloway':
      return `
        <svg class="planet-globe" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="planet-ring"/>
          <g class="planet-globe-spin">
            <ellipse cx="60" cy="60" rx="34" ry="34" class="planet-globe-outline"/>
            <ellipse cx="60" cy="60" rx="34" ry="12" class="planet-globe-outline"/>
            <ellipse cx="60" cy="60" rx="34" ry="22" class="planet-globe-outline"/>
            <line x1="26" y1="60" x2="94" y2="60" class="planet-globe-outline"/>
          </g>
        </svg>`;
    case 'ledgerx':
      return `
        <svg class="planet-bars" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" class="planet-ring"/>
          <rect x="34" y="66" width="10" height="20" class="planet-bar planet-bar-1"/>
          <rect x="50" y="54" width="10" height="32" class="planet-bar planet-bar-2"/>
          <rect x="66" y="42" width="10" height="44" class="planet-bar planet-bar-3"/>
          <rect x="82" y="60" width="10" height="26" class="planet-bar planet-bar-4"/>
        </svg>`;
    default:
      return '';
  }
}

function onPlanetClick(e) {
  e.preventDefault();
  const a = e.currentTarget;
  const href = a.getAttribute('href');
  const container = document.getElementById('constellation');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !container) {
    window.location.href = href;
    return;
  }

  container.classList.add('warping');
  a.classList.add('warp-target');
  setTimeout(() => { window.location.href = href; }, 480);
}

function renderConstellation(lang) {
  const container = document.getElementById('constellation');
  if (!container || typeof PROJECTS_CONTENT === 'undefined') return;

  container.querySelectorAll('.planet').forEach(p => p.remove());
  container.classList.remove('warping');

  PROJECT_ORDER.forEach(slug => {
    const proj = PROJECTS_CONTENT[slug];
    const data = proj[lang] || proj.pt;
    const hook = (proj.hook && (proj.hook[lang] || proj.hook.pt)) || '';

    const a = document.createElement('a');
    a.className = `planet planet-${slug}`;
    a.href = `project.html?slug=${slug}`;
    a.style.setProperty('--planet-accent', proj.accent);
    a.style.setProperty('--planet-accent2', proj.accent2 || proj.accent);
    a.innerHTML = `
      <span class="planet-body">${planetSignature(slug)}</span>
      <span class="planet-label">${data.name}</span>
      <span class="planet-hook">${hook}</span>
    `;
    a.addEventListener('click', onPlanetClick);
    container.appendChild(a);
  });
}
