/* ==========================================================================
   content.js — todo o texto do portfólio, organizado por versão (?v=) e idioma (?lang=)
   Versões: default | estagio | freela-quickfix | freela-ai
   Idiomas: pt | en | (es apenas nas versões freela-*)
   ========================================================================== */

const NAV = {
  pt: { about: 'Sobre', skills: 'Skills', projects: 'Projetos', certs: 'Formação', contact: 'Contato' },
  en: { about: 'About', skills: 'Skills', projects: 'Projects', certs: 'Education', contact: 'Contact' },
  es: { about: 'Sobre mí', skills: 'Skills', projects: 'Proyectos', certs: 'Formación', contact: 'Contacto' },
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
  es: [
    { num: '4',  label: 'Proyectos completos entregados' },
    { num: '10+', label: 'Certificaciones técnicas' },
    { num: '8+', label: 'Tecnologías en el stack' },
    { num: '∞', label: 'Commits de aprendizaje' },
  ],
};

/* Stats orientados a CLIENTE (freela). "10+ certificações / ∞ commits" fala de
   estudante; o cliente quer valor entregue: produtos no ar, IA em produção,
   custo real, tempo de resposta. As versões default/estagio seguem com STATS. */
const STATS_CLIENT = {
  pt: [
    { num: '5',        label: 'Projetos reais no portfólio' },
    { num: '3',        label: 'LLMs em produção (Claude · Groq · Gemini)' },
    { num: '&lt;R$0,05', label: 'Por roteiro de IA no GloWay' },
    { num: '24h',      label: 'Tempo médio de resposta' },
  ],
  en: [
    { num: '5',       label: 'Real projects in the portfolio' },
    { num: '3',       label: 'LLMs in production (Claude · Groq · Gemini)' },
    { num: '&lt;$0.01', label: 'Per AI itinerary on GloWay' },
    { num: '24h',     label: 'Average response time' },
  ],
  es: [
    { num: '5',       label: 'Proyectos reales en el portafolio' },
    { num: '3',       label: 'LLMs en producción (Claude · Groq · Gemini)' },
    { num: '&lt;$0.01', label: 'Por itinerario de IA en GloWay' },
    { num: '24h',     label: 'Tiempo medio de respuesta' },
  ],
};

/* WhatsApp: canal preferido pra freela no Brasil. Número + texto pré-preenchido
   por idioma; o href final é montado no app.js. */
const WHATSAPP_PHONE = '5527992029310';
const WHATSAPP_TEXT = {
  pt: 'Oi Ryan! Vi seu portfólio e queria conversar sobre um projeto.',
  en: "Hi Ryan! I saw your portfolio and I'd like to talk about a project.",
  es: '¡Hola Ryan! Vi tu portafolio y me gustaría hablar sobre un proyecto.',
};

const SKILLS_TEXT = {
  pt: { tag: '// habilidades', title: 'Stack técnica', subtitle: 'Tecnologias com as quais trabalho ativamente em projetos reais.' },
  en: { tag: '// skills', title: 'Technical stack', subtitle: 'Technologies I actively work with on real projects.' },
  es: { tag: '// habilidades', title: 'Stack técnico', subtitle: 'Tecnologías con las que trabajo activamente en proyectos reales.' },
};

const CERTS_TEXT = {
  pt: { tag: '// formação', title: 'Certificações & Formação', subtitle: 'Aprendizado contínuo, do fundamento à aplicação prática.' },
  en: { tag: '// education', title: 'Certifications & Education', subtitle: 'Continuous learning, from fundamentals to practical application.' },
  es: { tag: '// formación', title: 'Certificaciones & Formación', subtitle: 'Aprendizaje continuo, del fundamento a la aplicación práctica.' },
};

/* ── SKILLS ──────────────────────────────────────────────────────────────
   Estrutura canônica de grupos + chips. Nomes de tecnologia (React, Python,
   PostgreSQL...) são universais e não traduzem. Rótulos descritivos usam `tr`
   e são traduzidos por idioma em SKILL_I18N, evitando texto em PT vazando no
   EN/ES e evitando que o navegador "traduza" nomes técnicos por conta própria. */
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
  es: {
    groups: { backend: 'Backend', frontend: 'Frontend', database: 'Bases de Datos', devops: 'DevOps & Herramientas', ai: 'Inteligencia Artificial', data: 'Datos & Análisis' },
    terms: { partitioning: 'Particionamiento', relationalModeling: 'Modelado Relacional', multiLLM: 'Orquestación Multi-LLM', tokenCost: 'Ingeniería de Costo de Tokens', genAI: 'IA Generativa', exploratory: 'Análisis Exploratorio', dashboards: 'Dashboards' },
  },
};

/* ── PROJETOS ────────────────────────────────────────────────────────────
   Conteúdo dos cards por idioma (independe da versão/narrativa). Formato de
   mini case-study: contexto/problema, o que foi construído, resultado. Nomes
   de tecnologia ficam nas stack-tags do HTML (proper nouns, não traduzem). */
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
  es: {
    medistudy: {
      typeBadge: 'IA + Educación',
      status: 'En curso',
      linkText: 'En desarrollo',
      desc: 'MediStudy nació de acompañar de cerca la rutina exigente de mi novia en la carrera de Medicina. Ella usaba Claude para dudas, Anki para flashcards y NotebookLM para notas, tres herramientas separadas para resolver un solo problema. MediStudy junta todo eso en un solo lugar: flashcards con repetición espaciada, casos clínicos y simulador de anamnesis generados por IA, intérprete de exámenes, Pomodoro integrado y mapas mentales, con espacio para estudiar en grupo con sus amigas. Por detrás, orquesto Claude, Groq y Gemini con enrutamiento sensible al costo.',
      highlight: 'Sin él: Claude + Anki + NotebookLM, tres apps separadas. Con él: todo en un solo lugar.',
    },
    candidatrack: {
      typeBadge: 'IA + Backend',
      linkText: 'Código',
      desc: 'Resuelve un problema que todo el que busca empleo conoce: postulaciones dispersas en varios sitios, sin ninguna visión de conjunto. CandidaTrack centraliza todo, analiza currículum y portafolio contra la vacante, señala qué está bien y qué hay que mejorar, y devuelve un porcentaje de compatibilidad, además de un chat consultivo (LLaMA 70B) para dudas al instante. API asíncrona en FastAPI sobre PostgreSQL, todo vía Docker.',
      highlight: 'Currículum + portafolio + vacante analizados, con % de compatibilidad al instante.',
    },
    gloway: {
      typeBadge: 'Producto completo',
      linkText: 'Sitio en vivo',
      desc: 'Mi proyecto más grande hasta hoy. La idea nació sola, una madrugada, y se convirtió en un producto completo, de cero a prototipo funcional, sin cofundador, construido directamente en Google AI Studio. Una guía de Vitória/ES para turista y residente a la vez: itinerarios generados por IA, mapa 3D de evaluación urbana, comunidad LGBT+ y monitoreo de bicicletas compartidas. Se detuvo no por falla de producto, sino por falta de presupuesto de marketing. El prototipo funciona y sigue en línea hoy.',
      highlight: 'Menos de R$ 0,005 de costo de infraestructura por itinerario generado.',
    },
    ledgerx: {
      typeBadge: 'PostgreSQL avanzado',
      linkText: 'Código',
      desc: 'Lo construí por pura curiosidad, para aprender PostgreSQL de verdad y organizar mis propias finanzas. Hoy somos yo y dos personas más usándolo a diario. Window Functions, CTEs, Materialized Views, Triggers, particionamiento por mes y Full-Text Search resolviendo reportes financieros reales, con exportación a Excel con gráficos.',
      highlight: '3 personas usándolo a diario, yo incluido.',
    },
    todolist: {
      typeBadge: 'API REST',
      linkText: 'Código',
      desc: 'Mi primer proyecto, deliberadamente simple: una lista de tareas. Pero lo uso todos los días hasta hoy para anotar lo que necesito hacer. Fundamentos sólidos en Java 21, Spring Boot, Hibernate y PostgreSQL, todo vía Docker, con un entorno 100% reproducible.',
      highlight: 'Primer proyecto, todavía en uso diario hoy.',
    },
  },
};

/* Parágrafo pessoal do Hero (substitui a antiga seção "Sobre" solta).
   Traço pessoal, independe da versão; some no Hero como voz do Ryan. */
const HERO_PERSONAL = {
  pt: 'Tenho 22 anos e sigo nessa carreira porque gosto de verdade do desafio que a tecnologia traz. O MediStudy nasceu de acompanhar de perto a rotina puxada da minha namorada na Medicina; o CandidaTrack, porque eu mesmo precisava organizar minha busca por vaga. Prefiro construir algo que resolve o problema de gente de verdade a fazer exercício de portfólio.',
  en: "I'm 22, and I stay in this career because I genuinely enjoy the challenge tech brings. MediStudy came from watching my girlfriend's demanding routine in medical school up close; CandidaTrack, because I needed it myself to organize my own job search. I'd rather build something that solves a real person's problem than a portfolio exercise.",
  es: 'Tengo 22 años y sigo en esta carrera porque disfruto de verdad el desafío que trae la tecnología. MediStudy nació de acompañar de cerca la rutina exigente de mi novia en la carrera de Medicina; CandidaTrack, porque yo mismo lo necesitaba para organizar mi búsqueda de empleo. Prefiero construir algo que resuelve el problema de una persona real que un ejercicio de portafolio.',
};

const CONTENT = {

  /* ───────────────────────── DEFAULT / JÚNIOR ───────────────────────── */
  default: {
    pt: {
      metaTitle: 'Ryan Duarte Quintão, Desenvolvedor Full Stack',
      metaDesc: 'Portfólio de Ryan Duarte Quintão. Projetos reais em Python, Java, React e IA generativa.',
      nav: NAV.pt,
      hero: {
        badge: 'Disponível para novos projetos',
        headlineHtml: 'Construindo <span class="accent">soluções</span> reais.',
        desc: 'Sou Ryan Duarte Quintão, desenvolvedor full stack focado em entregar código limpo, funcional e com resultado real. Do backend ao frontend, cada projeto nasce de um problema concreto.',
        personal: HERO_PERSONAL.pt,
        ctaPrimary: 'Ver Projetos',
        metaRole: 'Full Stack',
        metaFocus: 'Código limpo & performance',
        metaAvailable: 'Para novos projetos',
      },
      stats: STATS.pt,
      about: {
        tag: '// sobre mim',
        titleHtml: 'Código, curiosidade<br/>e projetos reais.',
        p1: 'Sou <strong>desenvolvedor full stack</strong>. Minha trajetória é marcada pela <strong>autodidaxia</strong>. Aprendo construindo, e cada projeto nasce de uma necessidade real.',
        p2: 'Tenho sólida base em <strong>Python, Java, SQL, Docker</strong> e desenvolvimento web full-stack. Já integrei <strong>IA generativa</strong> em projetos funcionais, apliquei engenharia de custo em APIs de LLMs e levei produtos do zero ao protótipo com entrega real.',
        p3: 'Atualmente estou construindo o <strong>MediStudy</strong>, uma plataforma de estudos de medicina com IA. Nela orquestro múltiplos LLMs (Claude, Groq, Gemini) com engenharia de custo de tokens e métodos de aprendizado como repetição espaçada e active recall.',
        p4: 'Busco contribuir de verdade desde o primeiro dia, com código limpo, raciocínio técnico e muita vontade de crescer.',
      },
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
        desc: "I'm Ryan Duarte Quintão, a full stack developer focused on shipping clean, functional code with real results. From backend to frontend, every project starts from a concrete problem.",
        personal: HERO_PERSONAL.en,
        ctaPrimary: 'View Projects',
        metaRole: 'Full Stack',
        metaFocus: 'Clean code & performance',
        metaAvailable: 'For new projects',
      },
      stats: STATS.en,
      about: {
        tag: '// about me',
        titleHtml: 'Code, curiosity<br/>and real projects.',
        p1: "I'm a <strong>full stack developer</strong>. My path has been shaped by <strong>self-teaching</strong>. I learn by building, and every project starts from a real need.",
        p2: 'I have a solid base in <strong>Python, Java, SQL, Docker</strong> and full stack web development. I have integrated <strong>generative AI</strong> into working products, applied cost engineering to LLM APIs and taken products from zero to a working prototype.',
        p3: "I'm currently building <strong>MediStudy</strong>, an AI powered medical study platform. I orchestrate multiple LLMs (Claude, Groq, Gemini) there with token cost engineering and study methods like spaced repetition and active recall.",
        p4: 'I want to contribute for real from day one, with clean code, technical reasoning and a strong drive to grow.',
      },
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
  },

  /* ───────────────────────────── ESTÁGIO ───────────────────────────── */
  estagio: {
    pt: {
      metaTitle: 'Ryan Duarte Quintão, Estágio em Desenvolvimento',
      metaDesc: 'Estudante de ADS na Multivix buscando estágio em desenvolvimento de software. Projetos reais em Python, Java, React e IA.',
      nav: NAV.pt,
      hero: {
        badge: 'Disponível para estágio, início imediato',
        headlineHtml: 'Aprendendo a construir <span class="accent">soluções</span> reais.',
        desc: 'Sou Ryan Duarte Quintão, estudante de Análise e Desenvolvimento de Sistemas construindo projetos reais desde o início do curso. Cada entrega é uma chance de aprender fazendo.',
        personal: HERO_PERSONAL.pt,
        ctaPrimary: 'Ver Projetos',
        metaRole: 'Estagiário em formação',
        metaFocus: 'Aprendizado aplicado',
        metaAvailable: 'Estágio, início imediato',
      },
      stats: STATS.pt,
      about: {
        tag: '// sobre mim',
        titleHtml: 'Código, curiosidade<br/>e projetos reais.',
        p1: 'Sou <strong>desenvolvedor em formação</strong>, cursando o 2º semestre de Análise e Desenvolvimento de Sistemas na Multivix (Serra/ES). Minha trajetória é marcada pela <strong>autodidaxia</strong>. Aprendo construindo, e cada projeto nasce de uma necessidade real.',
        p2: 'Tenho sólida base em <strong>Python, Java, SQL, Docker</strong> e desenvolvimento web full-stack. Já integrei <strong>IA generativa</strong> em projetos funcionais, apliquei engenharia de custo em APIs de LLMs e levei produtos do zero ao protótipo com entrega real.',
        p3: 'Atualmente estou construindo o <strong>MediStudy</strong>, uma plataforma de estudos de medicina com IA. Nela orquestro múltiplos LLMs (Claude, Groq, Gemini) com engenharia de custo de tokens e métodos de aprendizado como repetição espaçada e active recall.',
        p4: 'Busco um estágio onde posso contribuir de verdade desde o primeiro dia, com código limpo, raciocínio técnico e muita vontade de crescer.',
      },
      skills: SKILLS_TEXT.pt,
      projects: {
        tag: '// projetos',
        title: 'O que eu construí',
        subtitle: 'Projetos reais, construídos enquanto aprendo. Cada um me ensinou algo novo.',
        learned: {
          medistudy: 'O que aprendi: a orquestrar múltiplos LLMs mantendo o custo por resposta abaixo de R$ 0,05.',
          candidatrack: 'O que aprendi: a estruturar uma API assíncrona real, com scoring e scraping automatizado.',
          gloway: 'O que aprendi: a levar um produto do zero à produção, com pagamento e geolocalização reais.',
          ledgerx: 'O que aprendi: window functions, CTEs e particionamento na prática, não só na teoria.',
          todolist: 'O que aprendi: a montar um ambiente 100% reprodutível com Docker desde a primeira linha.',
        },
      },
      certs: CERTS_TEXT.pt,
      contact: {
        tag: '// contato',
        title: 'Vamos conversar?',
        subtitleHtml: 'Estou disponível para estágio em desenvolvimento de software, carga horária flexível, início imediato.<br/>Me manda uma mensagem, respondo rápido.',
      },
    },
    en: {
      metaTitle: 'Ryan Duarte Quintão, Software Development Intern',
      metaDesc: 'Systems Analysis and Development student looking for a software development internship. Real projects in Python, Java, React and AI.',
      nav: NAV.en,
      hero: {
        badge: 'Available for internship, immediate start',
        headlineHtml: 'Learning to build real <span class="accent">solutions</span>.',
        desc: "I'm Ryan Duarte Quintão, a Systems Analysis and Development student building real projects since the start of the course. Every delivery is a chance to learn by doing.",
        personal: HERO_PERSONAL.en,
        ctaPrimary: 'View Projects',
        metaRole: 'Intern in training',
        metaFocus: 'Applied learning',
        metaAvailable: 'Internship, immediate start',
      },
      stats: STATS.en,
      about: {
        tag: '// about me',
        titleHtml: 'Code, curiosity<br/>and real projects.',
        p1: "I'm a <strong>developer in training</strong>, currently on the 2nd semester of Systems Analysis and Development at Multivix (Serra, Brazil). My path has been shaped by <strong>self-teaching</strong>. I learn by building, and every project starts from a real need.",
        p2: 'I have a solid base in <strong>Python, Java, SQL, Docker</strong> and full stack web development. I have integrated <strong>generative AI</strong> into working products, applied cost engineering to LLM APIs and taken products from zero to a working prototype.',
        p3: "I'm currently building <strong>MediStudy</strong>, an AI powered medical study platform. I orchestrate multiple LLMs (Claude, Groq, Gemini) there with token cost engineering and study methods like spaced repetition and active recall.",
        p4: 'I am looking for an internship where I can contribute for real from day one, with clean code, technical reasoning and a strong drive to grow.',
      },
      skills: SKILLS_TEXT.en,
      projects: {
        tag: '// projects',
        title: 'What I built',
        subtitle: 'Real projects, built while learning. Each one taught me something new.',
        learned: {
          medistudy: 'What I learned: orchestrating multiple LLMs while keeping cost per response under $0.01.',
          candidatrack: 'What I learned: structuring a real async API with scoring and automated scraping.',
          gloway: 'What I learned: taking a product from zero to production, with real payments and geolocation.',
          ledgerx: 'What I learned: window functions, CTEs and partitioning in practice, not just in theory.',
          todolist: 'What I learned: building a 100% reproducible environment with Docker from the first line.',
        },
      },
      certs: CERTS_TEXT.en,
      contact: {
        tag: '// contact',
        title: "Let's talk?",
        subtitleHtml: "I'm available for a software development internship, flexible hours, immediate start.<br/>Send me a message, I reply fast.",
      },
    },
  },

  /* ───────────────────────── FREELA QUICK-FIX ───────────────────────── */
  'freela-quickfix': {
    en: {
      metaTitle: 'Ryan Duarte Quintão, Fast Bug Fixes & Code Review',
      metaDesc: 'Fast, reliable fixes for React, CSS and JS bugs. Clear code review, quick turnaround.',
      nav: NAV.en,
      hero: {
        badge: 'Available now, fast turnaround',
        headlineHtml: 'Fast, reliable fixes for <span class="accent">React, CSS & JS</span> bugs.',
        desc: "I'm Ryan Duarte Quintão. I fix broken layouts, flaky JS, and CSS that fights you across browsers. Clear communication, quick diagnosis, code you can trust.",
        ctaPrimary: 'See My Work',
        metaRole: 'Bug fixes & code review',
        metaFocus: 'Speed & reliability',
        metaAvailable: 'Available now',
      },
      stats: STATS.en,
      about: {
        tag: '// about',
        titleHtml: 'Small fixes.<br/>Real impact.',
        p1: "I'm a full stack developer who specializes in fast, surgical fixes: broken layouts, state bugs, CSS that breaks between browsers.",
        p2: 'Recent example: a login screen where styles leaked between two containers because of a missing scope boundary. Found it, scoped it, shipped it the same day.',
        p3: "I write in plain, typed JS/TS and don't touch what isn't broken. You get a diff you can read, not a rewrite you didn't ask for.",
        p4: "Available now for quick turnarounds. Send me the bug, I'll send you the fix.",
      },
      skills: SKILLS_TEXT.en,
      projects: {
        tag: '// projects',
        title: 'What I built',
        subtitle: "Real fixes, real projects. Here's the kind of work I ship.",
      },
      certs: CERTS_TEXT.en,
      contact: {
        tag: '// contact',
        title: "Got a bug that's been sitting too long?",
        subtitleHtml: "Send me the repo or a screenshot, I'll tell you what's wrong before you pay for anything.",
      },
    },
    pt: {
      metaTitle: 'Ryan Duarte Quintão, Correção Rápida de Bugs',
      metaDesc: 'Correções rápidas e confiáveis para bugs de React, CSS e JS. Revisão de código clara, entrega rápida.',
      nav: NAV.pt,
      hero: {
        badge: 'Disponível agora, entrega rápida',
        headlineHtml: 'Correções rápidas e confiáveis para bugs de <span class="accent">React, CSS e JS</span>.',
        desc: 'Sou Ryan Duarte Quintão. Conserto layouts quebrados, JS instável e CSS que se comporta diferente entre navegadores. Comunicação clara, diagnóstico rápido, código em que você pode confiar.',
        ctaPrimary: 'Ver Meu Trabalho',
        metaRole: 'Correção de bugs & code review',
        metaFocus: 'Velocidade & confiabilidade',
        metaAvailable: 'Disponível agora',
      },
      stats: STATS.pt,
      about: {
        tag: '// sobre',
        titleHtml: 'Correções pequenas.<br/>Impacto real.',
        p1: 'Sou desenvolvedor full stack especializado em correções rápidas e cirúrgicas: layouts quebrados, bugs de estado, CSS que quebra entre navegadores.',
        p2: 'Exemplo recente: uma tela de login onde os estilos vazavam entre dois containers por falta de escopo. Encontrei, isolei e entreguei no mesmo dia.',
        p3: 'Escrevo em JS/TS simples e tipado, e não mexo no que não está quebrado. Você recebe um diff legível, não uma reescrita que não pediu.',
        p4: 'Disponível agora para entregas rápidas. Me manda o bug, eu te mando a correção.',
      },
      skills: SKILLS_TEXT.pt,
      projects: {
        tag: '// projetos',
        title: 'O que eu construí',
        subtitle: 'Correções reais, projetos reais. Esse é o tipo de trabalho que eu entrego.',
      },
      certs: CERTS_TEXT.pt,
      contact: {
        tag: '// contato',
        title: 'Tem um bug parado há tempo demais?',
        subtitleHtml: 'Me manda o repositório ou um print, eu te digo o que está errado antes de você pagar por qualquer coisa.',
      },
    },
    es: {
      metaTitle: 'Ryan Duarte Quintão, Corrección Rápida de Bugs',
      metaDesc: 'Correcciones rápidas y confiables para bugs de React, CSS y JS. Revisión de código clara, entrega rápida.',
      nav: NAV.es,
      hero: {
        badge: 'Disponible ahora, entrega rápida',
        headlineHtml: 'Correcciones rápidas y confiables para bugs de <span class="accent">React, CSS y JS</span>.',
        desc: 'Soy Ryan Duarte Quintão. Arreglo layouts rotos, JS inestable y CSS que se comporta distinto entre navegadores. Comunicación clara, diagnóstico rápido, código en el que puedes confiar.',
        ctaPrimary: 'Ver Mi Trabajo',
        metaRole: 'Corrección de bugs & code review',
        metaFocus: 'Velocidad & confiabilidad',
        metaAvailable: 'Disponible ahora',
      },
      stats: STATS.es,
      about: {
        tag: '// sobre',
        titleHtml: 'Correcciones pequeñas.<br/>Impacto real.',
        p1: 'Soy desarrollador full stack especializado en correcciones rápidas y quirúrgicas: layouts rotos, bugs de estado, CSS que se rompe entre navegadores.',
        p2: 'Ejemplo reciente: una pantalla de login donde los estilos se filtraban entre dos contenedores por falta de alcance. Lo encontré, lo aislé y lo entregué el mismo día.',
        p3: 'Escribo en JS/TS simple y tipado, y no toco lo que no está roto. Recibes un diff legible, no una reescritura que no pediste.',
        p4: 'Disponible ahora para entregas rápidas. Envíame el bug, yo te envío la corrección.',
      },
      skills: SKILLS_TEXT.es,
      projects: {
        tag: '// proyectos',
        title: 'Lo que construí',
        subtitle: 'Correcciones reales, proyectos reales. Este es el tipo de trabajo que entrego.',
      },
      certs: CERTS_TEXT.es,
      contact: {
        tag: '// contacto',
        title: '¿Tienes un bug pendiente hace demasiado tiempo?',
        subtitleHtml: 'Envíame el repositorio o una captura, te diré qué está mal antes de que pagues por nada.',
      },
    },
  },

  /* ───────────────────────── FREELA AI / FULL-STACK ───────────────────────── */
  'freela-ai': {
    en: {
      metaTitle: 'Ryan Duarte Quintão, AI Integration & Full Stack Developer',
      metaDesc: 'AI features that actually ship. Direct LLM API integration, no no-code platforms, lower cost, more control.',
      nav: NAV.en,
      hero: {
        badge: 'Available for AI integration & full stack builds',
        headlineHtml: 'AI features that <span class="accent">actually ship</span>.',
        desc: "I'm Ryan Duarte Quintão. I integrate LLMs directly via API, no dependency on no-code platforms. Lower cost, more control, and a system you actually own.",
        personal: HERO_PERSONAL.en,
        ctaPrimary: 'See My Work',
        metaRole: 'AI Integration & Full Stack',
        metaFocus: 'Direct API, no no-code',
        metaAvailable: 'For new projects',
      },
      stats: STATS.en,
      about: {
        tag: '// about',
        titleHtml: 'AI that costs<br/>less than a coffee.',
        p1: "I build full stack products with AI at the core, not bolted on. Direct API integration with Claude, Groq and Gemini, no Make, Zapier or n8n in the loop.",
        p2: 'That means lower cost per request, more control over prompts and fallbacks, and no dependency on a third-party automation platform staying online.',
        p3: 'GloWay, a full travel guide product, generates AI itineraries for under $0.01 each. MediStudy orchestrates three LLMs for medical study tools with cost-aware routing between them.',
        p4: 'For larger builds, I prefer starting with a smaller milestone to establish trust before scoping the full project.',
      },
      skills: SKILLS_TEXT.en,
      projects: {
        tag: '// projects',
        title: 'What I built',
        subtitle: 'AI in production, not in a demo. Cost, latency and reliability all considered.',
      },
      certs: CERTS_TEXT.en,
      contact: {
        tag: '// contact',
        title: 'Have an AI feature in mind?',
        subtitleHtml: "Tell me the scope, I'll tell you what's realistic and where to start.",
      },
    },
    pt: {
      metaTitle: 'Ryan Duarte Quintão, Integração de IA & Full Stack',
      metaDesc: 'Recursos de IA que realmente vão para produção. Integração direta com APIs de LLM, sem plataformas no-code, menor custo, mais controle.',
      nav: NAV.pt,
      hero: {
        badge: 'Disponível para integração de IA e projetos full stack',
        headlineHtml: 'Recursos de IA que <span class="accent">realmente vão ao ar</span>.',
        desc: 'Sou Ryan Duarte Quintão. Integro LLMs diretamente via API, sem depender de plataformas no-code. Menor custo, mais controle e um sistema que é realmente seu.',
        personal: HERO_PERSONAL.pt,
        ctaPrimary: 'Ver Meu Trabalho',
        metaRole: 'Integração de IA & Full Stack',
        metaFocus: 'API direta, sem no-code',
        metaAvailable: 'Para novos projetos',
      },
      stats: STATS.pt,
      about: {
        tag: '// sobre',
        titleHtml: 'IA que custa menos<br/>que um café.',
        p1: 'Construo produtos full stack com IA no centro, não como um adendo. Integração direta com Claude, Groq e Gemini, sem Make, Zapier ou n8n no meio do caminho.',
        p2: 'Isso significa menor custo por requisição, mais controle sobre prompts e fallbacks, e nenhuma dependência de uma plataforma de automação de terceiros continuar no ar.',
        p3: 'O GloWay, um produto completo de guia de viagens, gera roteiros com IA por menos de R$ 0,05 cada. O MediStudy orquestra três LLMs para ferramentas de estudo de medicina com roteamento sensível a custo entre eles.',
        p4: 'Para projetos maiores, prefiro começar com um marco menor para estabelecer confiança antes de escopar o projeto completo.',
      },
      skills: SKILLS_TEXT.pt,
      projects: {
        tag: '// projetos',
        title: 'O que eu construí',
        subtitle: 'IA em produção, não em demo. Custo, latência e confiabilidade, tudo considerado.',
      },
      certs: CERTS_TEXT.pt,
      contact: {
        tag: '// contato',
        title: 'Tem um recurso de IA em mente?',
        subtitleHtml: 'Me conta o escopo, eu te digo o que é realista e por onde começar.',
      },
    },
    es: {
      metaTitle: 'Ryan Duarte Quintão, Integración de IA & Full Stack',
      metaDesc: 'Funciones de IA que realmente salen a producción. Integración directa con APIs de LLM, sin plataformas no-code, menor costo, más control.',
      nav: NAV.es,
      hero: {
        badge: 'Disponible para integración de IA y proyectos full stack',
        headlineHtml: 'Funciones de IA que <span class="accent">realmente se publican</span>.',
        desc: 'Soy Ryan Duarte Quintão. Integro LLMs directamente vía API, sin depender de plataformas no-code. Menor costo, más control y un sistema que realmente te pertenece.',
        personal: HERO_PERSONAL.es,
        ctaPrimary: 'Ver Mi Trabajo',
        metaRole: 'Integración de IA & Full Stack',
        metaFocus: 'API directa, sin no-code',
        metaAvailable: 'Para nuevos proyectos',
      },
      stats: STATS.es,
      about: {
        tag: '// sobre',
        titleHtml: 'IA que cuesta menos<br/>que un café.',
        p1: 'Construyo productos full stack con IA en el centro, no como un añadido. Integración directa con Claude, Groq y Gemini, sin Make, Zapier ni n8n de por medio.',
        p2: 'Eso significa menor costo por solicitud, más control sobre prompts y fallbacks, y ninguna dependencia de que una plataforma de automatización de terceros siga en línea.',
        p3: 'GloWay, un producto completo de guía de viajes, genera itinerarios con IA por menos de $0.01 cada uno. MediStudy orquesta tres LLMs para herramientas de estudio de medicina con enrutamiento sensible al costo entre ellos.',
        p4: 'Para proyectos más grandes, prefiero empezar con un hito más pequeño para establecer confianza antes de definir el alcance completo.',
      },
      skills: SKILLS_TEXT.es,
      projects: {
        tag: '// proyectos',
        title: 'Lo que construí',
        subtitle: 'IA en producción, no en una demo. Costo, latencia y confiabilidad, todo considerado.',
      },
      certs: CERTS_TEXT.es,
      contact: {
        tag: '// contacto',
        title: '¿Tienes una función de IA en mente?',
        subtitleHtml: 'Cuéntame el alcance, te diré qué es realista y por dónde empezar.',
      },
    },
  },

  /* ───────────────────────── FREELANCE (pitch geral) ───────────────────────── */
  freelance: {
    en: {
      metaTitle: 'Ryan Duarte Quintão, Full Stack Developer for Hire',
      metaDesc: 'Full stack development and AI integration, built to ship. React, Python, Java, PostgreSQL, direct LLM API integration. Available now.',
      nav: NAV.en,
      hero: {
        badge: 'Available for freelance projects',
        headlineHtml: 'Full stack products, <span class="accent">built to ship</span>.',
        desc: "I'm Ryan Duarte Quintão. I build and fix real products end to end: React and TypeScript frontends, Python and Java backends, PostgreSQL at the core, and AI features integrated directly via API when a project actually needs it. Clear communication, realistic estimates, code you can maintain after I'm gone.",
        personal: HERO_PERSONAL.en,
        ctaPrimary: 'See My Work',
        metaRole: 'Full Stack Developer',
        metaFocus: 'Web apps & AI integration',
        metaAvailable: 'Available now',
      },
      stats: STATS.en,
      about: {
        tag: '// about',
        titleHtml: 'Code that ships,<br/>not code that impresses.',
        p1: "I'm a full stack developer. I work across the whole stack, from PostgreSQL schemas and FastAPI backends to React interfaces, and I integrate AI directly via API (Claude, Groq, Gemini) when a project actually needs it, not because it's trendy.",
        p2: 'Recent work includes fixing a CSS inheritance bug that was leaking styles between two containers in a login flow, and building a travel app that generates AI itineraries for under a cent each by controlling the prompt and model choice directly instead of paying for a no-code automation layer.',
        p3: "I don't pad estimates and I don't disappear mid-project. If something is going to take longer than I said, you hear about it before the deadline, not after.",
        p4: "Available now. Send me the scope, and I'll tell you honestly what it takes.",
      },
      skills: SKILLS_TEXT.en,
      projects: {
        tag: '// projects',
        title: "What I've built",
        subtitle: "Real products, real code, real users. Here's the proof.",
      },
      certs: CERTS_TEXT.en,
      contact: {
        tag: '// contact',
        title: "Let's talk about your project?",
        subtitleHtml: "Tell me what you need built or fixed. I reply fast, with a realistic scope and timeline.",
      },
    },
    pt: {
      metaTitle: 'Ryan Duarte Quintão, Desenvolvedor Full Stack Freelance',
      metaDesc: 'Desenvolvimento full stack e integração de IA, prontos para produção. React, Python, Java, PostgreSQL, integração direta com APIs de LLM. Disponível agora.',
      nav: NAV.pt,
      hero: {
        badge: 'Disponível para projetos freelance',
        headlineHtml: 'Produtos full stack, <span class="accent">prontos pra produção</span>.',
        desc: 'Sou Ryan Duarte Quintão. Construo e conserto produtos reais de ponta a ponta: frontend em React e TypeScript, backend em Python e Java, PostgreSQL como base, e IA integrada direto via API quando o projeto realmente precisa. Comunicação clara, prazos realistas, código que dá pra manter depois que eu terminar.',
        personal: HERO_PERSONAL.pt,
        ctaPrimary: 'Ver Meu Trabalho',
        metaRole: 'Desenvolvedor Full Stack',
        metaFocus: 'Apps web & integração de IA',
        metaAvailable: 'Disponível agora',
      },
      stats: STATS.pt,
      about: {
        tag: '// sobre',
        titleHtml: 'Código que entrega,<br/>não código que impressiona.',
        p1: 'Sou desenvolvedor full stack. Trabalho na stack inteira, de esquema de PostgreSQL e backend em FastAPI até interface em React, e integro IA direto via API (Claude, Groq, Gemini) quando o projeto realmente precisa, não porque está na moda.',
        p2: 'Trabalhos recentes incluem corrigir um bug de herança de CSS que vazava estilos entre dois containers numa tela de login, e construir um app de viagens que gera roteiros com IA por menos de cinco centavos cada, controlando prompt e escolha de modelo diretamente em vez de pagar por uma camada de automação no-code.',
        p3: 'Não infla prazo e não desaparece no meio do projeto. Se algo vai demorar mais do que eu disse, você fica sabendo antes do prazo, não depois.',
        p4: 'Disponível agora. Me manda o escopo que eu te digo com sinceridade o que precisa.',
      },
      skills: SKILLS_TEXT.pt,
      projects: {
        tag: '// projetos',
        title: 'O que eu construí',
        subtitle: 'Produtos reais, código real, usuários reais. Aqui está a prova.',
      },
      certs: CERTS_TEXT.pt,
      contact: {
        tag: '// contato',
        title: 'Vamos conversar sobre o seu projeto?',
        subtitleHtml: 'Me conta o que você precisa construir ou consertar. Eu te respondo rápido, com escopo e prazo realistas.',
      },
    },
    es: {
      metaTitle: 'Ryan Duarte Quintão, Desarrollador Full Stack Freelance',
      metaDesc: 'Desarrollo full stack e integración de IA, listos para producción. React, Python, Java, PostgreSQL, integración directa con APIs de LLM. Disponible ahora.',
      nav: NAV.es,
      hero: {
        badge: 'Disponible para proyectos freelance',
        headlineHtml: 'Productos full stack, <span class="accent">listos para producción</span>.',
        desc: 'Soy Ryan Duarte Quintão. Construyo y arreglo productos reales de principio a fin: frontend en React y TypeScript, backend en Python y Java, PostgreSQL como base, e IA integrada directamente vía API cuando el proyecto realmente lo necesita. Comunicación clara, plazos realistas, código que se puede mantener después de que yo termine.',
        personal: HERO_PERSONAL.es,
        ctaPrimary: 'Ver Mi Trabajo',
        metaRole: 'Desarrollador Full Stack',
        metaFocus: 'Apps web e integración de IA',
        metaAvailable: 'Disponible ahora',
      },
      stats: STATS.es,
      about: {
        tag: '// sobre',
        titleHtml: 'Código que se entrega,<br/>no código que impresiona.',
        p1: 'Soy desarrollador full stack. Trabajo en todo el stack, desde esquemas de PostgreSQL y backend en FastAPI hasta interfaces en React, e integro IA directamente vía API (Claude, Groq, Gemini) cuando el proyecto realmente lo necesita, no porque esté de moda.',
        p2: 'Trabajos recientes incluyen corregir un bug de herencia de CSS que filtraba estilos entre dos contenedores en una pantalla de login, y construir una app de viajes que genera itinerarios con IA por menos de un centavo cada uno, controlando el prompt y la elección de modelo directamente en vez de pagar por una capa de automatización no-code.',
        p3: 'No inflo plazos y no desaparezco a mitad de proyecto. Si algo va a tardar más de lo que dije, te enteras antes de la fecha límite, no después.',
        p4: 'Disponible ahora. Envíame el alcance y te diré con honestidad qué se necesita.',
      },
      skills: SKILLS_TEXT.es,
      projects: {
        tag: '// proyectos',
        title: 'Lo que construí',
        subtitle: 'Productos reales, código real, usuarios reales. Aquí está la prueba.',
      },
      certs: CERTS_TEXT.es,
      contact: {
        tag: '// contacto',
        title: '¿Hablamos de tu proyecto?',
        subtitleHtml: 'Cuéntame qué necesitas construir o arreglar. Te respondo rápido, con alcance y plazos realistas.',
      },
    },
  },
};

/* idioma default por versão, quando ?lang= não é informado nem salvo */
const DEFAULT_LANG = {
  default: 'pt',
  estagio: 'pt',
  'freela-quickfix': 'en',
  'freela-ai': 'en',
  freelance: 'en',
};

/* variação de cor do halo por versão — seção 4.3 do plano */
const HALO_THEME = {
  default:            { accent: '#F4D06F', accent2: '#F4D06F', coreSaturation: 1,   label: 'default' },
  estagio:            { accent: '#E3C878', accent2: '#E3C878', coreSaturation: .78, label: 'estagio' },
  'freela-quickfix':  { accent: '#F4D06F', accent2: '#BFE3F2', coreSaturation: 1,   label: 'freela-quickfix' },
  'freela-ai':        { accent: '#F4D06F', accent2: '#E8562F', coreSaturation: 1.1, label: 'freela-ai' },
  freelance:          { accent: '#FFE3A3', accent2: '#F4D06F', coreSaturation: 1.2, label: 'freelance' },
};
