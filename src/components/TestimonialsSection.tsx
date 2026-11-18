// TestimonialsSection.tsx
import { useEffect, useState, type ReactNode } from "react";
import { Quote, Star, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { recommendations, LINKEDIN_RECOMMENDATIONS_URL } from "@/data/recommendations";

interface Testimonial {
  id: number;
  title: string;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  testimonialText: string | null;
  testimonialRating: number | null;
  testimonialPhoto: string | null;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Textos acima disso começam recolhidos, com botão "Ler mais"
const LONG_TEXT = 320;

const initials = (name: string) =>
  name.split(/[\s,]+/).filter(w => /^[A-ZÀ-Ú]/.test(w)).slice(0, 2).map(w => w[0]).join("");

const ExpandableText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > LONG_TEXT;

  return (
    <div className="flex-1">
      <blockquote className={`text-foreground/90 leading-relaxed whitespace-pre-line ${isLong && !expanded ? "line-clamp-6" : ""}`}>
        "{text}"
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          className="mt-1 min-h-11 text-sm text-primary hover:underline"
        >
          {expanded ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
};

interface TestimonialCardProps {
  /** Canto superior direito: nota em estrelas (cliente) ou data (LinkedIn) */
  meta?: ReactNode;
  text: string;
  photo?: string | null;
  author?: string | null;
  /** Linha de apoio: cargo, empresa ou título no LinkedIn */
  detail?: ReactNode;
  /** Relação com o André: projeto do cliente ou vínculo de trabalho */
  relation?: ReactNode;
}

// Cartão único de depoimento (prancha de identidade › Componentes › Cartões)
const TestimonialCard = ({ meta, text, photo, author, detail, relation }: TestimonialCardProps) => (
  <figure className="h-full flex flex-col bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Quote className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      {meta}
    </div>

    <ExpandableText text={text} />

    <figcaption className="mt-6 pt-4 border-t border-border flex items-center gap-3">
      {photo ? (
        <img
          src={photo}
          alt={author ?? "Cliente"}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 flex-shrink-0"
        />
      ) : author ? (
        <div aria-hidden="true" className="w-12 h-12 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center flex-shrink-0 font-bold text-primary">
          {initials(author)}
        </div>
      ) : null}
      <div className="min-w-0">
        {author && <p className="font-semibold text-foreground">{author}</p>}
        {detail && <p className="text-sm text-muted-foreground line-clamp-1">{detail}</p>}
        {relation && <p className="text-xs text-primary">{relation}</p>}
      </div>
    </figcaption>
  </figure>
);

const TestimonialsSection = () => {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setItems(Array.isArray(data) ? data.filter((p: Testimonial) => p.testimonialText) : []);
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-title">Depoimentos</span>
            <h2 className="heading-md">
              O que dizem sobre o <span className="text-gradient">meu trabalho</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Clientes (vêm dos projetos) */}
        {items.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-lg font-semibold mb-6 text-center">Clientes</h3>
            <div className={`grid gap-6 mx-auto items-stretch ${
              items.length === 1 ? "max-w-2xl" : items.length === 2 ? "md:grid-cols-2 max-w-5xl" : "md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {items.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 100} className="h-full">
                  <TestimonialCard
                    meta={item.testimonialRating ? (
                      <div className="flex gap-0.5" role="img" aria-label={`Nota ${item.testimonialRating} de 5`}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <Star key={n} aria-hidden="true" className={`w-4 h-4 ${n <= item.testimonialRating! ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                        ))}
                      </div>
                    ) : undefined}
                    text={item.testimonialText!}
                    photo={item.testimonialPhoto}
                    author={item.testimonialAuthor}
                    detail={item.testimonialRole}
                    relation={item.title}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Recomendações do LinkedIn */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold mb-6 text-center flex items-center justify-center gap-2">
            <Linkedin className="w-5 h-5 text-primary" aria-hidden="true" />
            Recomendações no LinkedIn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {recommendations.map((item, i) => (
              <ScrollReveal key={item.author} delay={i * 100} className="h-full">
                <TestimonialCard
                  meta={<span className="text-xs font-mono text-muted-foreground">{item.date}</span>}
                  text={item.text}
                  photo={item.photo}
                  author={item.author}
                  detail={<span title={item.headline}>{item.headline}</span>}
                  relation={item.relation}
                />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={LINKEDIN_RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Ver todas no LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
