// src/components/WhySiteSection.tsx
import { Globe, TrendingUp, Shield, Search, Users, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto custa para fazer um site?",
    answer:
      "Cada projeto é único e o valor depende da complexidade, quantidade de páginas e funcionalidades desejadas. Após uma conversa inicial para entender suas necessidades, envio uma proposta detalhada e transparente.",
  },
  {
    question: "Meu site vai aparecer no Google?",
    answer:
      "Sim! Todos os sites que desenvolvo seguem as melhores práticas de SEO desde a estrutura do código até a otimização de performance. Isso garante que seu site seja indexado corretamente pelos principais buscadores como Google, Bing e Yahoo.",
  },
  {
    question: "Como funciona o processo de criação?",
    answer:
      "O processo é simples e direto: (1) conversa inicial para entender o projeto, (2) envio da proposta e contrato, (3) briefing detalhado sobre conteúdo e identidade visual, (4) desenvolvimento com acompanhamento, (5) revisão e aprovação final.",
  },
  {
    question: "Existe algum custo mensal após a entrega?",
    answer:
      "Para sites de pagamento único, o único custo recorrente é o de hospedagem e domínio, que fica por conta do cliente. Também ofereço planos de manutenção mensal que incluem atualizações, backups e suporte técnico contínuo.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Sites institucionais de até 5 páginas são entregues em até 15 dias após a aprovação da proposta e recebimento do conteúdo. Projetos mais complexos, com funcionalidades específicas, podem levar de 15 a 30 dias.",
  },
  {
    question: "Domínio e hospedagem estão inclusos?",
    answer:
      "Não estão inclusos no valor do projeto, mas oriento na escolha da melhor opção de hospedagem e domínio de acordo com as necessidades do seu negócio, e faço toda a configuração técnica.",
  },
  {
    question: "O site funciona em celulares e tablets?",
    answer:
      "Com certeza! Todos os sites são desenvolvidos com design responsivo, garantindo uma experiência otimizada em qualquer dispositivo — desktop, tablet ou smartphone.",
  },
  {
    question: "Quais tecnologias você utiliza?",
    answer:
      "Trabalho com tecnologias modernas como React, TypeScript, Tailwind CSS e Node.js, o que garante sites rápidos, seguros e com excelente performance. Nada de templates prontos — cada projeto é desenvolvido do zero.",
  },
];

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

        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-base hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default WhySiteSection;