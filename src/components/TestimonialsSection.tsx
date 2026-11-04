// TestimonialsSection.tsx
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  id: number;
  title: string;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  testimonialText: string | null;
  testimonialRating: number | null;
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

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

  // Sem depoimentos cadastrados, a seção não aparece
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-title">Depoimentos</span>
            <h2 className="heading-md">
              O que dizem os <span className="text-gradient">clientes</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className={`grid gap-6 mx-auto items-stretch ${
          items.length === 1 ? "max-w-2xl" : items.length === 2 ? "md:grid-cols-2 max-w-5xl" : "md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
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

                <blockquote className="flex-1 text-foreground/90 leading-relaxed whitespace-pre-line">
                  "{item.testimonialText}"
                </blockquote>

                <figcaption className="mt-6 pt-4 border-t border-border">
                  {item.testimonialAuthor && (
                    <p className="font-semibold text-foreground">{item.testimonialAuthor}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {item.testimonialRole ? `${item.testimonialRole} · ` : ""}
                    <span className="text-primary">{item.title}</span>
                  </p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
