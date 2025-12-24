import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import memojiFist from "@/assets/memoji-fist.png";

const projects = [
  {
    title: "Capi3D",
    description: "Plataforma de visualização e modelagem 3D. Co-criador do projeto.",
    tags: ["Python", "3D", "Web"],
    link: "https://capi3d.com.br/",
    github: null,
  },
  {
    title: "Automação de Dados",
    description: "Scripts Python para automação de processos de contratações públicas no MGI.",
    tags: ["Python", "Automação", "ETL"],
    link: null,
    github: "https://github.com/AndreRuperto",
  },
  {
    title: "Dashboards Interativos",
    description: "Painéis de visualização de dados com Power BI e Qlik Sense.",
    tags: ["Power BI", "Qlik", "Data Viz"],
    link: null,
    github: null,
  },
  {
    title: "Machine Learning",
    description: "Projetos de análise preditiva e modelos de Machine Learning.",
    tags: ["Python", "Scikit-learn", "TensorFlow"],
    link: null,
    github: "https://github.com/AndreRuperto",
  },
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
                <div className="flex gap-3">
                  {project.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Ver projeto
                      </a>
                    </Button>
                  )}
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
