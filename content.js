/* ==========================================================================
   content.js — todo o texto do portfólio.
   Um único portfólio (sem narrativas por versão), idiomas: pt | en.
   ========================================================================== */

const NAV = {
  pt: { projects: 'Projetos', about: 'Sobre', certs: 'Formação', contact: 'Contato' },
  en: { projects: 'Projects', about: 'About', certs: 'Education', contact: 'Contact' },
};

/* ?v=estagio: única versão além do portfólio padrão. Ajusta apenas as meta
   tags (título/descrição da aba e SEO) para o contexto de busca de estágio;
   o conteúdo visível da página continua o mesmo. */
const ESTAGIO_META = {
  pt: {
    metaTitle: 'Ryan Duarte Quintão, Candidato a Estágio em Desenvolvimento',
    metaDesc: 'Portfólio de Ryan Duarte Quintão, candidato a estágio em desenvolvimento de software. Projetos reais em Python, Java, React e IA generativa.',
  },
  en: {
    metaTitle: 'Ryan Duarte Quintão, Software Development Internship Candidate',
    metaDesc: "Ryan Duarte Quintão's portfolio, a software development internship candidate. Real projects in Python, Java, React and generative AI.",
  },
};

/* num de "Certificações técnicas" é calculado em tempo real por
   countCertifications() (app.js), a partir das tags .cert-chip da seção
   Formação — isCertCount marca qual entrada usa o valor dinâmico, o num
   aqui nunca é lido pra essa linha. */
const STATS = {
  pt: [
    { num: '4',  label: 'Projetos completos entregues' },
    { num: null, label: 'Certificações técnicas', isCertCount: true },
    { num: '9',  label: 'Tecnologias na stack' },
  ],
  en: [
    { num: '4',  label: 'Complete projects shipped' },
    { num: null, label: 'Technical certifications', isCertCount: true },
    { num: '9',  label: 'Technologies in the stack' },
  ],
};

/* WhatsApp: canal mais rápido de contato. Número + texto pré-preenchido por
   idioma; o href final é montado no app.js. */
const WHATSAPP_PHONE = '5527992029310';
const WHATSAPP_TEXT = {
  pt: 'Oi Ryan! Vi seu portfólio e queria conversar.',
  en: "Hi Ryan! I saw your portfolio and I'd like to talk.",
};

/* Datas de 2026 confirmadas via data de criação dos repositórios no GitHub
   (todolist-spring-postgres e candidatrack: 22/06; ledgerx: 30/06). GloWay é
   anterior e não tem repositório público; MediStudy ainda não foi publicado. */
const TIMELINE = {
  pt: [
    { year: '2025', label: 'Jul', title: 'GloWay', desc: 'Produto completo validado com 15 usuários reais e apresentado no SEBRAE.' },
    { year: '2026', label: 'Jun', title: 'Multivix', desc: 'Início da graduação em Análise e Desenvolvimento de Sistemas.' },
    { year: '2026', label: 'Jun', title: 'To-Do List API', desc: 'Primeiro projeto de backend: Java, Spring Boot, PostgreSQL e Docker.' },
    { year: '2026', label: 'Jun', title: 'CandidaTrack', desc: 'Segundo projeto, nascido da própria busca de vaga.' },
    { year: '2026', label: 'Jun', title: 'LedgerX', desc: 'Estudo aprofundado de PostgreSQL aplicado à própria vida financeira.' },
    { year: '2026', label: 'Em andamento', title: 'MediStudy', desc: 'Projeto atual, em fase de arquitetura.' },
  ],
  en: [
    { year: '2025', label: 'Jul', title: 'GloWay', desc: 'Full product validated with 15 real users and presented at SEBRAE.' },
    { year: '2026', label: 'Jun', title: 'Multivix', desc: 'Started a degree in Systems Analysis and Development.' },
    { year: '2026', label: 'Jun', title: 'To-Do List API', desc: 'First backend project: Java, Spring Boot, PostgreSQL and Docker.' },
    { year: '2026', label: 'Jun', title: 'CandidaTrack', desc: 'Second project, born out of my own job search.' },
    { year: '2026', label: 'Jun', title: 'LedgerX', desc: 'In-depth PostgreSQL study applied to my own finances.' },
    { year: '2026', label: 'Ongoing', title: 'MediStudy', desc: 'Current project, in the architecture phase.' },
  ],
};

const CERTS_TEXT = {
  pt: { tag: '// formação', title: 'Certificações & Formação', subtitle: 'Aprendizado contínuo, do fundamento à aplicação prática.' },
  en: { tag: '// education', title: 'Certifications & Education', subtitle: 'Continuous learning, from fundamentals to practical application.' },
};

const CONTENT = {
  pt: {
    metaTitle: 'Ryan Duarte Quintão, Desenvolvedor Full Stack',
    metaDesc: 'Portfólio de Ryan Duarte Quintão. Projetos reais em Python, Java, React e IA generativa, com certificação Anthropic Academy em Claude Code e Claude API.',
    skipLink: 'Pular para o conteúdo',
    nav: NAV.pt,
    hero: {
      badge: 'Disponível para novos projetos',
      role: 'Desenvolvedor Full Stack',
      ctaPrimary: 'Ver Projetos',
    },
    stats: STATS.pt,
    projects: {
      tag: '// projetos',
      title: 'O que eu construí',
      subtitle: 'Projetos reais, com código real. Cada um resolve um problema concreto.',
    },
    about: {
      tag: '// sobre',
      title: 'Sobre mim',
      bodyHtml: '<p>Sou Ryan, tenho 22 anos, e há uns meses decidi aprofundar meus estudos em desenvolvimento de verdade.</p><p>O que mudou foi perceber um padrão: toda vez que eu precisava de alguma ferramenta, nunca achava uma completa. Sempre faltava um pedaço, sempre eram duas ou três coisas diferentes pra resolver um problema só. Foi assim com o MediStudy, o LedgerX, o CandidaTrack e o GloWay: cada um começou porque eu vivia esse problema de perto, na minha vida ou na de alguém próximo, e resolvi construir o que faltava em vez de continuar procurando.</p><p>Estudo Análise e Desenvolvimento de Sistemas na Multivix, e complemento isso com formação direto na fonte: Anthropic Academy, pra dominar Claude Code e a construção de agentes de IA na prática, e AWS Educate, pra entender infraestrutura de nuvem por trás do que eu construo. No GloWay isso já apareceu de forma concreta: cheguei a rodar o produto com custo de infraestrutura abaixo de R$0,005 por roteiro gerado por IA, e engenharia de custo de IA virou algo que eu penso desde o design da arquitetura, não só depois que o produto já está no ar.</p><p>Gosto de aprender testando na prática. Os projetos abaixo mostram isso em ação.</p>',
    },
    certs: CERTS_TEXT.pt,
    contact: {
      tag: '// contato',
      title: 'Vamos conversar?',
      subtitleHtml: 'Estou disponível para novas oportunidades em desenvolvimento de software.<br/>Me manda uma mensagem, respondo rápido.',
      cvLabel: 'Baixar Currículo',
    },
  },
  en: {
    metaTitle: 'Ryan Duarte Quintão, Full Stack Developer',
    metaDesc: "Ryan Duarte Quintão's portfolio. Real projects in Python, Java, React and generative AI, with an Anthropic Academy certification in Claude Code and the Claude API.",
    skipLink: 'Skip to content',
    nav: NAV.en,
    hero: {
      badge: 'Available for new projects',
      role: 'Full Stack Developer',
      ctaPrimary: 'View Projects',
    },
    stats: STATS.en,
    projects: {
      tag: '// projects',
      title: 'What I built',
      subtitle: 'Real projects, with real code. Each one solves a concrete problem.',
    },
    about: {
      tag: '// about',
      title: 'About me',
      bodyHtml: "<p>I'm Ryan, 22 years old, and a few months ago I decided to dive deeper into real software development.</p><p>What changed was noticing a pattern: every time I needed some tool, I could never find one that was complete. There was always a missing piece, always two or three different things needed to solve one problem. That's how MediStudy, LedgerX, CandidaTrack and GloWay started: each one began because I was living that problem up close, in my own life or someone close to me, and I decided to build what was missing instead of continuing to search for it.</p><p>I study Systems Analysis and Development at Multivix, and I complement that with training straight from the source: Anthropic Academy, to master Claude Code and building AI agents in practice, and AWS Educate, to understand the cloud infrastructure behind what I build. That already showed up concretely in GloWay: I got the product running at an infrastructure cost below R$0.005 per AI-generated itinerary, and AI cost engineering became something I think about from the architecture design, not just after the product is already live.</p><p>I like learning by testing things in practice. The projects below show that in action.</p>",
    },
    certs: CERTS_TEXT.en,
    contact: {
      tag: '// contact',
      title: "Let's talk?",
      subtitleHtml: "I'm available for new opportunities in software development.<br/>Send me a message, I reply fast.",
      cvLabel: 'Download Resume',
    },
  },
};

/* variação de cor do halo (tema único agora que há uma só narrativa) */
const HALO_THEME = {
  accent: '#F4D06F', accent2: '#F4D06F', coreSaturation: 1,
};
