import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import memojiFist from "@/assets/memoji-fist.png";

const projects = [
  {
    title: "Modelo de Credenciamento - PNCP",
    description: "Modelo de Machine Learning para automatizar análise de credenciamento no PNCP. Redução de 93,5% no volume de análises manuais (de 1494 para 97 pedidos), com acurácia de 94,65% e F1-score de 0.97 para rejeições.",
    tags: ["Python", "ML", "Random Forest", "XGBoost"],
    links: [],
    github: null,
  },
  {
    title: "Integração Alice ao ComprasGov",
    description: "Pipeline de integração entre ComprasGov e o robô de auditoria Alice (CGU). Desenvolvimento de ETL com Apache Airflow para envio automatizado de documentos, persistência no DaaS e recuperação de alertas via API REST.",
    tags: ["Python", "Airflow", "APIs REST", "Databricks"],
    links: [
      { url: "https://www.youtube.com/watch?v=234EGymqotI", label: "Vídeo" }
    ],
    github: null,
  },
  {
    title: "Documentação API ComprasGov",
    description: "Desenvolvimento e manutenção da documentação oficial da API do Compras.gov.br. Estruturação de endpoints, parâmetros e exemplos de uso com foco em acessibilidade e segurança.",
    tags: ["APIs REST", "Swagger", "Postman", "Documentação"],
    links: [
      { url: "https://documenter.getpostman.com/view/13166820/2sA3XJjPpR#3ebf5e2c-67dd-45dd-b942-3a093eaa2e64", label: "Manual Técnico" },
      { url: "https://www.gov.br/compras/pt-br/acesso-a-informacao/manuais/manual-dados-abertos/manual-api-compras.pdf", label: "Manual do Usuário" }
    ],
    github: null,
  },
  {
    title: "Painel de Portais Integrados ao PNCP",
    description: "Ferramenta interativa para monitorar a adesão dos entes federativos ao Portal Nacional de Compras Públicas (PNCP), com visualização de dados em tempo real.",
    tags: ["Python", "SQL", "Airflow", "Data Viz"],
    links: [
      { url: "https://www.gov.br/pncp/pt-br/pncp/portais-integrados-ao-pncp", label: "Painel" }
    ],
    github: null,
  },
  {
    title: "Dashboards Interativos",
    description: "Painéis de visualização de dados com Power BI e Qlik Sense para análise de contratações públicas e indicadores governamentais.",
    tags: ["Power BI", "Qlik Sense", "Data Viz"],
    links: [
      { url: "https://www.gov.br/pncp/pt-br/pncp/portais-integrados-ao-pncp", label: "Ver dashboard" }
    ],
    github: null,
  },
  {
    title: "Gráfico de Contribuições Pac-Man",
    description: "Transformação do gráfico de contribuições do GitHub em jogo animado de Pac-Man. Sistema com 3 estilos de jogabilidade, integração via GitHub Actions e exportação SVG otimizada.",
    tags: ["TypeScript", "Node.js", "SVG", "GitHub Actions"],
    links: [],
    github: "https://github.com/AndreRuperto/svg-pacman-contributions",
  },
  {
    title: "Sistema de Controle Financeiro via WhatsApp",
    description: "Bot para registro e gerenciamento de despesas via WhatsApp, com categorização automática, controle de parcelas, alertas de vencimento e integração com APIs de cotação de moedas.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Node.js"],
    links: [],
    github: "https://github.com/AndreRuperto/whatsapp_gastos_ai",
  },
  {
    title: "Capi3D",
    description: "Plataforma de visualização e modelagem 3D. Co-criador do projeto.",
    tags: ["Python", "3D", "Web"],
    links: [
      { url: "https://capi3d.com.br/", label: "Site" }
    ],
    github: null,
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Portfólio</span>
          <h2 className="heading-md">
            Projetos <span className="text-gradient">Recentes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-xs font-mono bg-secondary rounded-full text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link, j) => (
                    <Button key={j} variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                  {project.github && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4">
            <img src={memojiFist} alt="Memoji" className="w-16 h-16 object-contain" />
            <div className="text-left">
              <p className="text-muted-foreground">Quer ver mais projetos?</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <a href="https://github.com/AndreRuperto" target="_blank" rel="noopener noreferrer">
                  Acesse meu GitHub →
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;