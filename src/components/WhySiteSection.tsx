// src/components/WhySiteSection.tsx
import { Globe, TrendingUp, Shield, Search, Users, Zap } from "lucide-react";

const WhySiteSection = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Visibilidade 24/7",
      description: "Sua empresa acessível a qualquer hora, em qualquer lugar. 94,5% dos brasileiros usam ferramentas de busca para encontrar negócios."
    },
    {
      icon: Shield,
      title: "Credibilidade",
      description: "84% dos clientes confiam mais em empresas com site próprio. Transmita profissionalismo e confiança."
    },
    {
      icon: TrendingUp,
      title: "Novas Oportunidades",
      description: "70% das empresas brasileiras já vendem online. Expanda seu mercado e alcance novos clientes."
    },
    {
      icon: Search,
      title: "Marketing Digital",
      description: "Base para SEO, anúncios e redes sociais. Apareça nas buscas e atraia clientes qualificados."
    },
    {
      icon: Users,
      title: "Controle da Marca",
      description: "Conte sua história do seu jeito. Não fique refém de algoritmos de terceiros."
    },
    {
      icon: Zap,
      title: "Vantagem Competitiva",
      description: "Destaque-se da concorrência. Quem não é visto online, não é lembrado."
    }
  ];

  return (
    <section id="why-site" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Presença Digital</span>
          <h2 className="heading-md">
            Por que sua empresa precisa de um{" "}
            <span className="text-gradient">site próprio?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            No Brasil, 93% dos consumidores pesquisam online antes de comprar. 
            Sem presença digital, sua empresa é invisível para boa parte do mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para transformar sua presença digital?
            </h3>
            <p className="text-muted-foreground mb-6">
              Desenvolvo sites profissionais, responsivos e otimizados para SEO. 
              Não fique para trás na era digital.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <b>Solicitar Orçamento</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySiteSection;