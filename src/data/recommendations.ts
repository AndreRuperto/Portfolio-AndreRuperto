// Recomendações recebidas no LinkedIn (linkedin.com/in/andrerup)
export interface Recommendation {
  author: string;
  headline: string;
  relation: string;
  date: string;
  text: string;
}

export const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/andrerup/details/recommendations/";

export const recommendations: Recommendation[] = [
  {
    author: "Hugo Souto, MSc",
    headline: "AI Solutions Architect · Consultant & Advisor",
    relation: "Supervisionou André diretamente",
    date: "Out 2026",
    text: "Conheci o André primeiramente pelo seu trabalho antes mesmo de saber seu nome. Há alguns anos atrás, em meio a dezenas de candidatos a um vaga em Data Science e AI Engineering em um grande sistema do Governo Federal, um único trabalho se sobressaiu. O trabalho entregava o desafio que foi pedido, mas muito mais, com análise cuidadosa dos dados e uma apresentação impecável. Trabalhamos juntos por um bom tempo e posso dizer que tive com o André um dos melhores pares de trabalho. Curioso, responsável e comprometido com o resultado, ao mesmo tempo em que contribui positivamente com a harmonia da equipe (em outras palavras, muito gente boa :D). Recomendo demais esse cara!",
  },
  {
    author: "Júnior Melo",
    headline: "Senior Python Engineer | Django, FastAPI, Integração de Dados, Automação, PostgreSQL, Docker e IA Agentic",
    relation: "Trabalhou na mesma equipe",
    date: "Fev 2026",
    text: "Tive a oportunidade de trabalhar com o André na equipe da COTIN (Coordenação de Transparência e Informações Gerenciais) do MGI, onde ele atuou como estagiário. Desde o início, ficou evidente que ele é um profissional completamente diferenciado: organizado, participativo e com excelente senso de responsabilidade.\n\nO André encara desafios técnicos de frente, aprende com muita rapidez e mantém uma postura proativa no dia a dia — não espera as demandas “cair no colo”, ele antecipa, sugere melhorias e contribui de forma consistente com o time. Além disso, é alguém antenado com as tecnologias mais recentes do mercado, o que se reflete na qualidade das entregas e na maturidade técnica que demonstra.\n\nRecomendo fortemente o André para oportunidades na área de tecnologia. Tenho certeza de que ele vai agregar muito valor a qualquer equipe.",
  },
  {
    author: "Gabriel Borges",
    headline: "Desenvolvedor Full Stack | Node.js, TypeScript, React e PostgreSQL | APIs, Integrações e Automação",
    relation: "Trabalhou na mesma equipe",
    date: "Out 2026",
    text: "Um profissional extremamente competente, responsável, focado e dedicado em tudo o que faz. Sempre demonstrou comprometimento, instinto de liderança, profissionalismo e disposição para contribuir com a equipe, buscando entregar o melhor resultado possível. Tenho certeza de que sua competência e suas qualidades farão a diferença em qualquer equipe da qual venha a fazer parte. Recomendo de olhos fechados e desejo muito sucesso em sua carreira profissional!",
  },
  {
    author: "Caio Duarte",
    headline: "Desenvolvedor Full-Stack | Engenharia de Software @UnB",
    relation: "Trabalhou na mesma equipe",
    date: "Out 2026",
    text: "Tive o prazer de trabalhar com o André na mesma equipe e recomendo seu trabalho. Ele é um profissional extremamente dedicado, focado na qualidade das entregas e que sempre busca otimizar processos para trazer mais eficiência ao time. Além de competente tecnicamente, é uma pessoa colaborativa, respeitosa e atenta aos detalhes.",
  },
  {
    author: "Walter Baldez",
    headline: "Gestor de Recursos Humanos, cursando MBA em Gestão Financeira, Controladoria e Auditoria",
    relation: "Trabalhou com André em outra equipe",
    date: "Out 2026",
    text: "Excelente profissional, com visão e análise crítica, um bom planejamento estratégico e ótimo relacionamento interpessoal. Iniciou e desenvolveu um importante projeto para a empresa.",
  },
];
