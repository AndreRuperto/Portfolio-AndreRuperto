import { Briefcase, Target, GraduationCap, Code2, TrendingUp, MessageSquare } from "lucide-react";

const differentials = [
  {
    icon: Briefcase,
    title: "Desenvolvedor Full Stack Freelancer",
    description: "Crio sites e sistemas completos do zero. Portfólio real com Blue + e Advocacia Ruperto.",
  },
  {
    icon: Target,
    title: "Soluções Personalizadas para Seu Negócio",
    description: "Landing pages, sites corporativos, dashboards, automações e sistemas web sob medida para suas necessidades.",
  },
  {
    icon: GraduationCap,
    title: "Formação Sólida em Desenvolvimento",
    description: "Ciência da Computação (UDF) com nota máxima no trabalho de conclusão de curso. Base técnica forte para entregar projetos profissionais.",
  },
  {
    icon: Code2,
    title: "Tecnologias Modernas",
    description: "React, TypeScript, Tailwind, Python, PostgreSQL. Seu site com as ferramentas mais atuais do mercado.",
  },
  {
    icon: TrendingUp,
    title: "Sites Rápidos e Responsivos",
    description: "Performance otimizada, design responsivo e código limpo. Seu site funcionando perfeitamente em todos os dispositivos.",
  },
  {
    icon: MessageSquare,
    title: "Atendimento Direto e Transparente",
    description: "Você fala diretamente comigo. Acompanhamento do projeto, updates constantes e prazos cumpridos.",
  },
];

const DifferentialsSection = () => {
  return (
    <section id="differentials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Diferenciais</span>
          <h2 className="heading-md">
            Por que trabalhar <span className="text-gradient">comigo?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Desenvolvedor freelancer especializado em criar sites e sistemas web 
            personalizados com qualidade profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentials.map((item, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;