/* ==========================================================================
   content.js — todo o texto do portfólio.
   Um único portfólio (sem narrativas por versão), idiomas: pt | en.
   ========================================================================== */

const NAV = {
  pt: { projects: 'Projetos', certs: 'Formação', contact: 'Contato' },
  en: { projects: 'Projects', certs: 'Education', contact: 'Contact' },
};

const STATS = {
  pt: [
    { num: '4',  label: 'Projetos completos entregues' },
    { num: '10+', label: 'Certificações técnicas' },
    { num: '8+', label: 'Tecnologias na stack' },
    { num: '∞', label: 'Commits de aprendizado' },
  ],
  en: [
    { num: '4',  label: 'Complete projects shipped' },
    { num: '10+', label: 'Technical certifications' },
    { num: '8+', label: 'Technologies in the stack' },
    { num: '∞', label: 'Commits of learning' },
  ],
};

/* WhatsApp: canal mais rápido de contato. Número + texto pré-preenchido por
   idioma; o href final é montado no app.js. */
const WHATSAPP_PHONE = '5527992029310';
const WHATSAPP_TEXT = {
  pt: 'Oi Ryan! Vi seu portfólio e queria conversar.',
  en: "Hi Ryan! I saw your portfolio and I'd like to talk.",
};

const SKILLS_TEXT = {
  pt: { tag: '// habilidades', title: 'Stack técnica', subtitle: 'Tecnologias com as quais trabalho ativamente em projetos reais.' },
  en: { tag: '// skills', title: 'Technical stack', subtitle: 'Technologies I actively work with on real projects.' },
};

const CERTS_TEXT = {
  pt: { tag: '// formação', title: 'Certificações & Formação', subtitle: 'Aprendizado contínuo, do fundamento à aplicação prática.' },
  en: { tag: '// education', title: 'Certifications & Education', subtitle: 'Continuous learning, from fundamentals to practical application.' },
};

/* ── SKILLS ──────────────────────────────────────────────────────────────
   Estrutura canônica de grupos + chips. Nomes de tecnologia (React, Python,
   PostgreSQL...) são universais e não traduzem. Rótulos descritivos usam `tr`
   e são traduzidos por idioma em SKILL_I18N, evitando texto em PT vazando no
   EN e evitando que o navegador "traduza" nomes técnicos por conta própria. */
const SKILL_GROUPS = [
  { key: 'backend', chips: [
    { t: 'Python',       i: 'devicon-python-plain colored' },
    { t: 'Java 21',      i: 'devicon-java-plain colored' },
    { t: 'Spring Boot',  i: 'devicon-spring-plain colored' },
    { t: 'FastAPI',      i: 'devicon-fastapi-plain colored' },
    { t: 'Hibernate ORM',i: 'devicon-hibernate-plain colored' },
    { t: 'SQLAlchemy' },
  ]},
  { key: 'frontend', chips: [
    { t: 'React',      i: 'devicon-react-original colored' },
    { t: 'TypeScript', i: 'devicon-typescript-plain colored' },
    { t: 'JavaScript', i: 'devicon-javascript-plain colored' },
    { t: 'HTML5',      i: 'devicon-html5-plain colored' },
    { t: 'CSS3',       i: 'devicon-css3-plain colored' },
  ]},
  { key: 'database', chips: [
    { t: 'PostgreSQL', i: 'devicon-postgresql-plain colored' },
    { t: 'MySQL',      i: 'devicon-mysql-plain colored' },
    { t: 'Window Functions' },
    { t: 'CTEs' },
    { t: 'Triggers & Procedures' },
    { t: 'Materialized Views' },
    { tr: 'partitioning' },
    { t: 'Full-Text Search' },
    { tr: 'relationalModeling' },
  ]},
  { key: 'devops', chips: [
    { t: 'Docker',         i: 'devicon-docker-plain colored' },
    { t: 'Docker Compose' },
    { t: 'Git',            i: 'devicon-git-plain colored' },
    { t: 'GitHub',         i: 'devicon-github-original' },
    { t: 'Linux',          i: 'devicon-linux-plain' },
  ]},
  { key: 'ai', chips: [
    { t: 'Claude API (Anthropic)' },
    { t: 'LLaMA 70B (Groq API)' },
    { t: 'Google Gemini API' },
    { tr: 'multiLLM' },
    { tr: 'tokenCost' },
    { t: 'Prompt Engineering' },
    { tr: 'genAI' },
    { t: 'BeautifulSoup4' },
  ]},
  { key: 'data', chips: [
    { t: 'Power BI', i: 'devicon-microsoftsqlserver-plain colored' },
    { tr: 'exploratory' },
    { tr: 'dashboards' },
    { t: 'SQL Analytics' },
  ]},
];

const SKILL_I18N = {
  pt: {
    groups: { backend: 'Backend', frontend: 'Frontend', database: 'Banco de Dados', devops: 'DevOps & Ferramentas', ai: 'Inteligência Artificial', data: 'Dados & Análise' },
    terms: { partitioning: 'Particionamento', relationalModeling: 'Modelagem Relacional', multiLLM: 'Orquestração Multi-LLM', tokenCost: 'Engenharia de Custo de Tokens', genAI: 'IA Generativa', exploratory: 'Análise Exploratória', dashboards: 'Dashboards' },
  },
  en: {
    groups: { backend: 'Backend', frontend: 'Frontend', database: 'Databases', devops: 'DevOps & Tools', ai: 'Artificial Intelligence', data: 'Data & Analytics' },
    terms: { partitioning: 'Partitioning', relationalModeling: 'Relational Modeling', multiLLM: 'Multi-LLM Orchestration', tokenCost: 'Token Cost Engineering', genAI: 'Generative AI', exploratory: 'Exploratory Analysis', dashboards: 'Dashboards' },
  },
};

/* ── PROJETOS ────────────────────────────────────────────────────────────
   Conteúdo dos cards por idioma. Formato de mini case-study: contexto/
   problema, o que foi construído, resultado. Nomes de tecnologia ficam nas
   stack-tags do HTML (proper nouns, não traduzem). */
const PROJECT_ITEMS = {
  pt: {
    medistudy: {
      typeBadge: 'IA + Educação',
      status: 'Em andamento',
      linkText: 'Em desenvolvimento',
      desc: 'O MediStudy nasceu de acompanhar de perto a rotina puxada da minha namorada na Medicina. Ela usava o Claude pra tirar dúvida, o Anki pra flashcard e o NotebookLM pra organizar anotação, três ferramentas separadas pra resolver um único problema. O MediStudy junta tudo isso num só lugar: flashcards com repetição espaçada, casos clínicos e simulador de anamnese gerados por IA, interpretador de exames, Pomodoro integrado e mapas mentais, com espaço pra estudar em grupo com as amigas dela. Por trás, orquestro Claude, Groq e Gemini com roteamento sensível a custo.',
      highlight: 'Sem ele: Claude + Anki + NotebookLM, três apps separados. Com ele: tudo em um só lugar.',
    },
    candidatrack: {
      typeBadge: 'IA + Backend',
      linkText: 'Código',
      desc: 'Resolve um problema que todo mundo que procura vaga conhece: candidatura espalhada em vários sites, sem visão nenhuma do todo. O CandidaTrack centraliza tudo, analisa currículo e portfólio contra a vaga, aponta o que está bom e o que precisa melhorar, e devolve um percentual de compatibilidade, além de um chat consultivo (LLaMA 70B) pra tirar dúvida na hora. API assíncrona em FastAPI sobre PostgreSQL, tudo via Docker.',
      highlight: 'Currículo + portfólio + vaga analisados, com % de compatibilidade na hora.',
    },
    gloway: {
      typeBadge: 'Produto completo',
      linkText: 'Site no ar',
      desc: 'Meu maior projeto até hoje. A ideia nasceu sozinha, numa madrugada, e virou um produto completo do zero ao protótipo funcional, sem cofundador, direto no Google AI Studio. Um guia de Vitória/ES pra turista e morador ao mesmo tempo: roteiros gerados por IA, mapa 3D de avaliação urbana, comunidade LGBT+ e monitoramento de bike compartilhada. Parou não por falha de produto, mas por falta de verba de marketing. O protótipo funciona e está no ar até hoje.',
      highlight: 'Menos de R$ 0,005 de custo de infraestrutura por roteiro gerado.',
    },
    ledgerx: {
      typeBadge: 'PostgreSQL avançado',
      linkText: 'Código',
      desc: 'Construí por pura curiosidade, pra aprender PostgreSQL de verdade e organizar minha própria vida financeira. Hoje sou eu e mais duas pessoas usando ele no dia a dia. Window Functions, CTEs, Materialized Views, Triggers, particionamento por mês e Full-Text Search resolvendo relatório financeiro real, com exportação em Excel com gráficos.',
      highlight: '3 pessoas usando no dia a dia, eu incluído.',
    },
    todolist: {
      typeBadge: 'API REST',
      linkText: 'Código',
      desc: 'Meu primeiro projeto, de propósito simples: uma lista de tarefas. Mas uso ele todo santo dia até hoje pra anotar o que preciso fazer. Base sólida em Java 21, Spring Boot, Hibernate e PostgreSQL, tudo via Docker, com ambiente 100% reproduzível.',
      highlight: 'Primeiro projeto, ainda em uso diário até hoje.',
    },
  },
  en: {
    medistudy: {
      typeBadge: 'AI + Education',
      status: 'In progress',
      linkText: 'In development',
      desc: "MediStudy came from watching my girlfriend's demanding routine in medical school up close. She used Claude for questions, Anki for flashcards and NotebookLM for notes, three separate tools to solve one problem. MediStudy puts all of that in one place: spaced-repetition flashcards, AI-generated clinical cases and an anamnesis simulator, an exam interpreter, a built-in Pomodoro timer and mind maps, plus room to study together with her friends. Under the hood, I orchestrate Claude, Groq and Gemini with cost-aware routing.",
      highlight: 'Without it: Claude + Anki + NotebookLM, three separate apps. With it: all in one place.',
    },
    candidatrack: {
      typeBadge: 'AI + Backend',
      linkText: 'Code',
      desc: "Solves a problem every job seeker knows: applications scattered across a dozen sites, with zero overview. CandidaTrack centralizes everything, analyzes your résumé and portfolio against the job posting, flags what's strong and what needs work, and returns a compatibility percentage, plus a consultative chat (LLaMA 70B) for instant questions. Async API in FastAPI on top of PostgreSQL, all through Docker.",
      highlight: 'Résumé + portfolio + job posting analyzed, with an instant compatibility score.',
    },
    gloway: {
      typeBadge: 'Full product',
      linkText: 'Live site',
      desc: 'My biggest project to date. The idea came to me alone, overnight, and became a full product, from zero to a working prototype, no co-founder, built directly in Google AI Studio. A guide to Vitória, Brazil for tourists and residents alike: AI-generated itineraries, a 3D map for crowd-sourced urban ratings, an LGBT+ community and shared-bike monitoring. It stopped not from a product failure, but from a lack of marketing budget. The prototype works and is still live today.',
      highlight: 'Under R$0.005 (about $0.001) in infrastructure cost per itinerary generated.',
    },
    ledgerx: {
      typeBadge: 'Advanced PostgreSQL',
      linkText: 'Code',
      desc: "Built out of pure curiosity, to really learn PostgreSQL and organize my own personal finances. Today it's me and two other people using it day to day. Window Functions, CTEs, Materialized Views, Triggers, monthly partitioning and Full-Text Search solving real financial reporting, with Excel export including charts.",
      highlight: '3 people using it daily, myself included.',
    },
    todolist: {
      typeBadge: 'REST API',
      linkText: 'Code',
      desc: 'My first project, deliberately simple: a to-do list. I still use it every single day to jot down what I need to do. Solid fundamentals in Java 21, Spring Boot, Hibernate and PostgreSQL, all through Docker, with a 100% reproducible environment.',
      highlight: 'First project ever, still in daily use today.',
    },
  },
};

const CONTENT = {
  pt: {
    metaTitle: 'Ryan Duarte Quintão, Desenvolvedor Full Stack',
    metaDesc: 'Portfólio de Ryan Duarte Quintão. Projetos reais em Python, Java, React e IA generativa.',
    nav: NAV.pt,
    hero: {
      badge: 'Disponível para novos projetos',
      headlineHtml: 'Construindo <span class="accent">soluções</span> reais.',
      desc: 'Sou Ryan Duarte Quintão, desenvolvedor full stack autodidata, com base sólida em Python, Java, SQL e desenvolvimento web. Construo cada projeto do backend ao frontend, sempre a partir de um problema real, com código limpo e boas práticas de engenharia de software.',
      personal: 'Tenho 22 anos e sigo nessa carreira em constante aprendizado, movido pelo desafio genuíno que a tecnologia me traz desde o início. O MediStudy nasceu de acompanhar de perto a rotina puxada da minha namorada na Medicina; o CandidaTrack, porque eu mesmo precisava organizar minha busca por vaga. Prefiro construir algo que resolve o problema de gente de verdade a fazer exercício de portfólio, e é assim que quero contribuir desde o primeiro dia em qualquer time que eu entrar.',
      ctaPrimary: 'Ver Projetos',
      metaRole: 'Full Stack',
      metaFocus: 'Código limpo & performance',
    },
    stats: STATS.pt,
    skills: SKILLS_TEXT.pt,
    projects: {
      tag: '// projetos',
      title: 'O que eu construí',
      subtitle: 'Projetos reais, com código real. Cada um resolve um problema concreto.',
    },
    certs: CERTS_TEXT.pt,
    contact: {
      tag: '// contato',
      title: 'Vamos conversar?',
      subtitleHtml: 'Estou disponível para novas oportunidades em desenvolvimento de software.<br/>Me manda uma mensagem, respondo rápido.',
    },
  },
  en: {
    metaTitle: 'Ryan Duarte Quintão, Full Stack Developer',
    metaDesc: "Ryan Duarte Quintão's portfolio. Real projects in Python, Java, React and generative AI.",
    nav: NAV.en,
    hero: {
      badge: 'Available for new projects',
      headlineHtml: 'Building real <span class="accent">solutions</span>.',
      desc: "I'm Ryan Duarte Quintão, a self-taught full stack developer with a solid base in Python, Java, SQL and web development. I build every project from backend to frontend, always starting from a real problem, with clean code and solid software engineering practices.",
      personal: "I'm 22, and I'm in this career through constant, hands-on learning, driven by the genuine challenge tech has brought me from the start. MediStudy came from watching my girlfriend's demanding routine in medical school up close; CandidaTrack, because I needed it myself to organize my own job search. I'd rather build something that solves a real person's problem than a portfolio exercise, and that's how I want to contribute from day one on any team I join.",
      ctaPrimary: 'View Projects',
      metaRole: 'Full Stack',
      metaFocus: 'Clean code & performance',
    },
    stats: STATS.en,
    skills: SKILLS_TEXT.en,
    projects: {
      tag: '// projects',
      title: 'What I built',
      subtitle: 'Real projects, with real code. Each one solves a concrete problem.',
    },
    certs: CERTS_TEXT.en,
    contact: {
      tag: '// contact',
      title: "Let's talk?",
      subtitleHtml: "I'm available for new opportunities in software development.<br/>Send me a message, I reply fast.",
    },
  },
};

/* variação de cor do halo (tema único agora que há uma só narrativa) */
const HALO_THEME = {
  accent: '#F4D06F', accent2: '#F4D06F', coreSaturation: 1,
};
