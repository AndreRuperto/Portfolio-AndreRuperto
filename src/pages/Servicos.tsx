import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import WhySiteSection from "@/components/WhySiteSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

// Página para clientes que querem um site. Saiu da home (v2 do sistema de design,
// docs/design/DESIGN.md: "Recrutador primeiro, cliente depois").
const Servicos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="container mx-auto px-4 pt-32 pb-8 md:pt-40">
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar ao portfólio
          </a>
          <p className="section-title mt-6">Serviços para negócios</p>
          <h1 className="heading-lg max-w-3xl">Sites com painel para o seu negócio</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Faço sites sob medida, com painel para você editar o conteúdo sem mexer no código.
            Veja os trabalhos já entregues e o que os clientes dizem.
          </p>
        </section>
        <WhySiteSection />
        <DifferentialsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Servicos;
