// src/components/ProjectsSection.tsx
import { ExternalLink, Github, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import memojiFist from "@/assets/memoji-fist.png";
import { useState, useEffect } from "react";

interface ProjectLink {
  url: string;
  label: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  links: ProjectLink[];
  github: string | null;
  order: number;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {project.image && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-border/50 relative group/image">
                    <img 
                      src={project.image} 
                      alt={`Screenshot de ${project.title}`}
                      className="w-full h-100 object-cover"
                    />
                    <button
                      onClick={() => setOpenImage(project.image)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      aria-label="Ver imagem em tamanho completo"
                    >
                      <Eye className="w-8 h-8 text-primary" />
                    </button>
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
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

      {openImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setOpenImage(null)}
        >
          <button
            onClick={() => setOpenImage(null)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            aria-label="Fechar"
          >
            <X className="w-8 h-8 text-primary" />
          </button>
          <img 
            src={openImage} 
            alt="Visualização em tamanho completo"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;