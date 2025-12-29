// backend/scripts/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    title: "Blue Mais",
    description: "Plataforma web desenvolvida com tecnologias modernas para gestão e visualização de dados.",
    tags: ["React", "TypeScript", "Web"],
    image: "/assets/site-bluemais.png",
    links: [{ url: "https://bluemais.up.railway.app", label: "Ver site" }],
    github: null,
    order: 1
  },
  {
    title: "Ruperto & Ruperto - Advocacia",
    description: "Website institucional moderno para escritório de advocacia, com design profissional, seções de experiência e expertise, desenvolvido com React e Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: "/assets/site-advocaciaruperto.png",
    links: [{ url: "https://advocaciaruperto.up.railway.app", label: "Ver site" }],
    github: null,
    order: 2
  },
  {
    title: "Modelo de Credenciamento - PNCP",
    description: "Modelo de Machine Learning para automatizar análise de credenciamento no PNCP. Redução de 93,5% no volume de análises manuais (de 1494 para 97 pedidos), com acurácia de 94,65% e F1-score de 0.97 para rejeições.",
    tags: ["Python", "ML", "Random Forest", "XGBoost"],
    image: null,
    links: [],
    github: null,
    order: 3
  },
  {
    title: "Integração Alice ao ComprasGov",
    description: "Pipeline de integração entre ComprasGov e o robô de auditoria Alice (CGU). Desenvolvimento de ETL com Apache Airflow para envio automatizado de documentos, persistência no DaaS e recuperação de alertas via API REST.",
    tags: ["Python", "Airflow", "APIs REST", "Databricks"],
    image: null,
    links: [
      { url: "https://www.youtube.com/watch?v=234EGymqotI", label: "Vídeo" }
    ],
    github: null,
    order: 4
  },
  {
    title: "Documentação API ComprasGov",
    description: "Desenvolvimento e manutenção da documentação oficial da API do Compras.gov.br. Estruturação de endpoints, parâmetros e exemplos de uso com foco em acessibilidade e segurança.",
    tags: ["APIs REST", "Swagger", "Postman", "Documentação"],
    image: null,
    links: [
      { url: "https://documenter.getpostman.com/view/13166820/2sA3XJjPpR#3ebf5e2c-67dd-45dd-b942-3a093eaa2e64", label: "Manual Técnico" },
      { url: "https://www.gov.br/compras/pt-br/acesso-a-informacao/manuais/manual-dados-abertos/manual-api-compras.pdf", label: "Manual do Usuário" }
    ],
    github: null,
    order: 5
  },
  {
    title: "Painel de Portais Integrados ao PNCP",
    description: "Ferramenta interativa para monitorar a adesão dos entes federativos ao Portal Nacional de Compras Públicas (PNCP), com visualização de dados em tempo real.",
    tags: ["Python", "SQL", "Airflow", "Data Viz"],
    image: null,
    links: [
      { url: "https://www.gov.br/pncp/pt-br/pncp/portais-integrados-ao-pncp", label: "Painel" }
    ],
    github: null,
    order: 6
  },
  {
    title: "Dashboards Interativos",
    description: "Painéis de visualização de dados com Power BI e Qlik Sense para análise de contratações públicas e indicadores governamentais.",
    tags: ["Power BI", "Qlik Sense", "Data Viz"],
    image: null,
    links: [
      { url: "https://www.gov.br/pncp/pt-br/pncp/portais-integrados-ao-pncp", label: "Ver dashboard" }
    ],
    github: null,
    order: 7
  },
  {
    title: "Gráfico de Contribuições Pac-Man",
    description: "Transformação do gráfico de contribuições do GitHub em jogo animado de Pac-Man. Sistema com 3 estilos de jogabilidade, integração via GitHub Actions e exportação SVG otimizada.",
    tags: ["TypeScript", "Node.js", "SVG", "GitHub Actions"],
    image: null,
    links: [],
    github: "https://github.com/AndreRuperto/svg-pacman-contributions",
    order: 8
  },
  {
    title: "Sistema de Controle Financeiro via WhatsApp",
    description: "Bot para registro e gerenciamento de despesas via WhatsApp, com categorização automática, controle de parcelas, alertas de vencimento e integração com APIs de cotação de moedas.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Node.js"],
    image: null,
    links: [],
    github: "https://github.com/AndreRuperto/whatsapp_gastos_ai",
    order: 9
  },
  {
    title: "Capi3D",
    description: "Plataforma de visualização e modelagem 3D. Co-criador do projeto.",
    tags: ["Python", "3D", "Web"],
    image: null,
    links: [
      { url: "https://capi3d.com.br/", label: "Site" }
    ],
    github: null,
    order: 10
  }
];

async function main() {
  console.log('Iniciando seed do banco de dados...');
  
  for (const project of projects) {
    await prisma.project.create({
      data: project
    });
    console.log(`✓ Projeto "${project.title}" criado`);
  }
  
  console.log('\n✓ Todos os projetos foram criados com sucesso!');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });