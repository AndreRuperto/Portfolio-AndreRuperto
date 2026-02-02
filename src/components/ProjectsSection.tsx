// src/components/ProjectsSection.tsx
import { ExternalLink, Github, Eye, X, ChevronsDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import memojiFist from "@/assets/images/memoji-fist.png";
import { useState, useEffect, useRef, useCallback } from "react";

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

const SLOW_SPEED = 2;  // px por frame
const FAST_SPEED = 8;  // px por frame

function FullPageViewer({ src, onClose }: { src: string; onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const maxScrollRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const speedRef = useRef(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const handleImageLoad = useCallback(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (img && container && img.offsetHeight > container.offsetHeight) {
      maxScrollRef.current = img.offsetHeight - container.offsetHeight;
    }
  }, []);

  const startScroll = useCallback((speed: number) => {
    speedRef.current = speed;
    const tick = () => {
      scrollRef.current = Math.min(scrollRef.current + speedRef.current, maxScrollRef.current);
      setCurrentScroll(scrollRef.current);
      setAtBottom(scrollRef.current >= maxScrollRef.current);
      if (scrollRef.current < maxScrollRef.current && speedRef.current > 0) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const stopScroll = useCallback(() => {
    speedRef.current = 0;
    cancelAnimationFrame(animFrameRef.current);
    // Se chegou no final, volta ao topo
    if (scrollRef.current >= maxScrollRef.current) {
      scrollRef.current = 0;
      setCurrentScroll(0);
      setAtBottom(false);
    }
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-20"
        aria-label="Fechar"
      >
        <X className="w-8 h-8 text-primary" />
      </button>

      {showTip && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-medium shadow-lg flex items-center gap-3 max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Segure os botões abaixo para navegar pela página. Ao chegar no final e soltar, volta ao topo.</span>
          <button
            onClick={() => setShowTip(false)}
            className="shrink-0 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg max-w-6xl w-full"
        style={{ height: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Visualização do projeto"
          className="w-full absolute top-0 left-0"
          style={{ transform: `translateY(${-currentScroll}px)` }}
          onLoad={handleImageLoad}
        />
      </div>

      {/* Controles de scroll */}
      <div
        className="flex gap-4 mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onMouseDown={() => startScroll(SLOW_SPEED)}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
            atBottom
              ? "bg-muted text-muted-foreground cursor-default"
              : "bg-card border border-border text-foreground hover:border-primary/50"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
          Devagar
        </button>
        <button
          onMouseDown={() => startScroll(FAST_SPEED)}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
            atBottom
              ? "bg-muted text-muted-foreground cursor-default"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <ChevronsDown className="w-5 h-5" />
          Rápido
        </button>
      </div>
    </div>
  );
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
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
                      className="w-full h-60 object-cover object-top"
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
        <FullPageViewer src={openImage} onClose={() => setOpenImage(null)} />
      )}
    </section>
  );
};

export default ProjectsSection;
