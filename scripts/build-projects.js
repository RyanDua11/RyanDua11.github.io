/* ==========================================================================
   scripts/build-projects.js — gera projetos/<slug>/index.html a partir de
   project-template.html + projects-content.js. O conteúdo real é renderizado
   no cliente por project.js; este script só cria a rota estática e injeta
   meta tags específicas do projeto (title, description, og:url).
   Uso: node scripts/build-projects.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { PROJECTS_CONTENT, PROJECT_ORDER } = require(path.join(ROOT, 'projects-content.js'));

const template = fs.readFileSync(path.join(ROOT, 'project-template.html'), 'utf8');

for (const slug of PROJECT_ORDER) {
  const project = PROJECTS_CONTENT[slug];
  const data = project.pt;
  const intro = project.intro.pt;

  const title = `${data.name} — Case Study — ryan.dev`;
  const description = intro.motivation.slice(0, 155);
  const ogUrl = `https://ryandua11.github.io/projetos/${slug}/`;

  const html = template
    .replaceAll('{{TITLE}}', title)
    .replaceAll('{{DESCRIPTION}}', description)
    .replaceAll('{{OG_URL}}', ogUrl)
    .replaceAll('{{SLUG}}', slug);

  const dir = path.join(ROOT, 'projetos', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`gerado: projetos/${slug}/index.html`);
}
