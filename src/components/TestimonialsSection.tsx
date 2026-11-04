// TestimonialsSection.tsx
import { useEffect, useState } from "react";
import { Quote, Star, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { recommendations, LINKEDIN_RECOMMENDATIONS_URL, type Recommendation } from "@/data/recommendations";

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
          onClick={() => setExpanded(e => !e)}
          className="mt-2 text-sm text-primary hover:underline"
        >
          {expanded ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
};

const RecommendationCard = ({ item }: { item: Recommendation }) => (
  <figure className="h-full flex flex-col bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Quote className="w-5 h-5 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{item.date}</span>
    </div>

    <ExpandableText text={item.text} />

    <figcaption className="mt-6 pt-4 border-t border-border flex items-center gap-3">
      {item.photo ? (
        <img
          src={item.photo}
          alt={item.author}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center flex-shrink-0 font-bold text-primary">
          {initials(item.author)}
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-foreground">{item.author}</p>
        <p className="text-sm text-muted-foreground line-clamp-1" title={item.headline}>{item.headline}</p>
        <p className="text-xs text-primary">{item.relation}</p>
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
                  <figure className="h-full flex flex-col bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>
                      {item.testimonialRating && (
                        <div className="flex gap-0.5" aria-label={`Nota ${item.testimonialRating} de 5`}>
                          {[1, 2, 3, 4, 5].map(n => (
                            <Star key={n} className={`w-4 h-4 ${n <= item.testimonialRating! ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                          ))}
                        </div>
                      )}
                    </div>

                    <ExpandableText text={item.testimonialText!} />

                    <figcaption className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                      {item.testimonialPhoto && (
                        <img
                          src={item.testimonialPhoto}
                          alt={item.testimonialAuthor ?? "Cliente"}
                          loading="lazy"
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 flex-shrink-0"
                        />
                      )}
                      <div>
                        {item.testimonialAuthor && (
                          <p className="font-semibold text-foreground">{item.testimonialAuthor}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.testimonialRole ? `${item.testimonialRole} · ` : ""}
                          <span className="text-primary">{item.title}</span>
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Recomendações do LinkedIn */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold mb-6 text-center flex items-center justify-center gap-2">
            <Linkedin className="w-5 h-5 text-primary" />
            Recomendações no LinkedIn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {recommendations.map((item, i) => (
              <ScrollReveal key={item.author} delay={i * 100} className="h-full">
                <RecommendationCard item={item} />
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
