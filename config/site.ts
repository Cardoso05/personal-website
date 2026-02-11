export const siteConfig = {
  name: "Matheus Cardoso",
  title: "Matheus Cardoso | SaaS, Automação & Growth",
  description: "Hub de conteúdo sobre SaaS, automação, RPA, marketing e growth. Transformando ideias em produtos digitais.",
  url: "https://cardosomatheus.com.br",
  author: "Matheus Cardoso",
  
  // Bio curta para o hero
  headline: "Construindo produtos digitais",
  subheadline: "SaaS, automação e growth — compartilho o que aprendo no caminho.",
  
  // Bio completa para /sobre
  bio: `Empreendedor digital focado em construir micro-SaaS e automatizar processos. 
  Compartilho aqui tudo o que aprendo sobre produto, automação, marketing e operação.`,
  
  // Links sociais (deixe vazio para não exibir)
  social: {
    instagram: "https://www.instagram.com/cardoso.founder/",
    youtube: "https://www.youtube.com/@cardoso_mth",
    linkedin: "https://www.linkedin.com/in/matheus-antonio-95667b202",
    github: "https://github.com/Cardoso05",
    tiktok: "https://www.tiktok.com/@cardoso.mth?_r=1&_t=ZS-93GfBCJuLhd",
    twitter: "", // vazio = não exibe
  },
  
  // Email de contato
  email: "matheus@delmat.com.br",
  
  // Projetos em destaque
  projects: [
    {
      name: "Delmat Engenharia & Tecnologia",
      slug: "delmat-engenharia",
      description: "Empresa de engenharia focada em obras corporativas rápidas, infraestrutura elétrica e tecnologia.",
      url: "#",
      status: "ativo",
    },
    {
      name: "Wipr",
      slug: "wipr",
      description: "Minha Empresa de Desenvolvimento de Ferramentas de Automação",
      url: "https://wipr.com.br",
      status: "ativo",
    },
    {
      name: "BeAlive App",
      slug: "bealiveapp",
      description: "Plataforma de acompanhamento psicológico que economiza tempo do profissional e melhora a continuidade do cuidado.",
      url: "https://bealiveapp.com.br",
      status: "em validação",
    },
    {
      name: "InspireAI",
      slug: "inspireai",
      description: "Inteligencia Artificial para Criadores de Conteúdo",
      url: "https://inspireai.com.br",
      status: "em desenvolvimento",
    },
    {
      name: "MyNewsToday",
      slug: "mynewstoday",
      description: "Plataforma de curadoria automatizada de notícias sobre tecnologia, negócios e mercado digital.",
      url: "https://mynewstoday.com.br",
      status: "ativo",
    },
  ],
  
  // Cards "Comece por aqui"
  startHere: [
    {
      title: "Novo por aqui?",
      description: "Conheça minha jornada e o que você vai encontrar",
      href: "/sobre",
    },
    {
      title: "Do Zero ao MVP",
      description: "Série completa sobre criar seu primeiro produto",
      href: "/series/do-zero-ao-mvp",
    },
    {
      title: "RPA na prática",
      description: "Aprenda automação com casos reais",
      href: "/series/rpa-na-pratica",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
