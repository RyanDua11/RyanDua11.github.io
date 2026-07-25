/* ==========================================================================
   content.js — todo o texto do portfólio.
   Um único portfólio (sem narrativas por versão), idiomas: pt | en.
   ========================================================================== */

const NAV = {
  pt: { projects: 'Projetos', certs: 'Formação', contact: 'Contato' },
  en: { projects: 'Projects', certs: 'Education', contact: 'Contact' },
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

const STATS = {
  pt: [
    { num: '4',  label: 'Projetos completos entregues' },
    { num: '11', label: 'Certificações técnicas' },
    { num: '9',  label: 'Tecnologias na stack' },
  ],
  en: [
    { num: '4',  label: 'Complete projects shipped' },
    { num: '11', label: 'Technical certifications' },
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

const CERTS_TEXT = {
  pt: { tag: '// formação', title: 'Certificações & Formação', subtitle: 'Aprendizado contínuo, do fundamento à aplicação prática.' },
  en: { tag: '// education', title: 'Certifications & Education', subtitle: 'Continuous learning, from fundamentals to practical application.' },
};

const CONTENT = {
  pt: {
    metaTitle: 'Ryan Duarte Quintão, Desenvolvedor Full Stack',
    metaDesc: 'Portfólio de Ryan Duarte Quintão. Projetos reais em Python, Java, React e IA generativa.',
    nav: NAV.pt,
    hero: {
      badge: 'Disponível para novos projetos',
      desc: 'Eu vejo um problema e penso no que poderia existir no lugar. Foi assim que eu cheguei à programação. Sempre fui fascinado por tecnologia, mas por muito tempo isso ficou só como curiosidade. O que mudou foi uma frustração que fui acumulando: toda vez que eu precisava de alguma ferramenta, nunca achava uma completa. Sempre faltava um pedaço, sempre eram dois ou três apps diferentes pra resolver uma coisa só. Quando entendi o que a inteligência artificial realmente é capaz de fazer, percebi que o mais interessante não era só usar o que já existia, mas construir aquilo que ainda estava faltando. Hoje é isso que me move: pegar um problema real e pensar no que poderia existir no lugar dele.',
      personal: 'Curso Análise e Desenvolvimento de Sistemas na Multivix, em Serra/ES. Tenho 22 anos, e meu jeito de ser curioso é assim: quando alguma área me interessa, eu busco um curso, tiro uma certificação, e procuro aplicar aquilo em algum projeto real. Hoje já são 11 certificações técnicas, cada uma com um pedaço implementado em algo que você vai ver abaixo. O padrão se repete em tudo que eu construo: encontro uma ferramenta que devia existir e não existe, ou existe espalhada em vários lugares, e em vez de continuar procurando, eu construo. Cada projeto abaixo é essa mesma pergunta aplicada a um problema diferente: e se isso tudo coubesse num lugar só?',
      ctaPrimary: 'Ver Projetos',
    },
    stats: STATS.pt,
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
      desc: "I see a problem and think about what could exist in its place. That's how I got into programming. I was always fascinated by technology, but for a long time that stayed just as curiosity. What changed was a frustration that kept building up: every time I needed some tool, I could never find a complete one. There was always a piece missing, always two or three different apps to solve one single thing. When I understood what artificial intelligence is actually capable of, I realized the interesting part wasn't just using what already existed, but building the thing that was still missing. That's what drives me today: taking a real problem and thinking about what could exist in its place.",
      personal: "I'm studying Systems Analysis and Development at Multivix, in Serra, Brazil. I'm 22, and this is how my curiosity works: when a field interests me, I look for a course, get a certification, and try to apply it in some real project. Today that's already 11 technical certifications, each one with a piece implemented in something you'll see below. The same pattern repeats in everything I build: I find a tool that should exist and doesn't, or exists scattered across several places, and instead of keep looking for it, I build it. Each project below is that same question applied to a different problem: what if all of this fit in one single place?",
      ctaPrimary: 'View Projects',
    },
    stats: STATS.en,
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
