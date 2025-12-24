// AboutSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import memojiJoia from "@/assets/memoji-joia.png";

const AboutSection = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState("1.5");
  const [projectsCount, setProjectsCount] = useState("15");

  useEffect(() => {
    const startDate = new Date("2024-01-01");
    const currentDate = new Date();
    
    const diffInMonths = 
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
      (currentDate.getMonth() - startDate.getMonth());
    
    const years = (diffInMonths / 12).toFixed(1);
    setYearsOfExperience(years);
  }, []);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/AndreRuperto');
        const user = await response.json();
        setProjectsCount(user.public_repos);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        setProjectsCount("15");
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Main image */}
              <div className="relative bg-card rounded-3xl p-8 border border-border">
                <img
                  src={memojiJoia}
                  alt="André Ruperto"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto animate-float"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="section-title">Sobre mim</span>
            
            <h2 className="heading-md">
              Transformando Dados em{" "}
              <span className="text-gradient">Soluções Inteligentes</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Sou o André, recém-formado em <strong className="text-foreground">Ciência da Computação</strong> pelo 
                Centro Universitário UDF, com foco em <strong className="text-foreground">Ciência de Dados</strong> e 
                <strong className="text-foreground"> Automatização de Processos</strong>.
              </p>
              
              <p>
                Atualmente atuo como <strong className="text-foreground">Analista de Dados Júnior</strong> na 
                <strong className="text-foreground"> Resende Mori Hutchison</strong>, onde desenvolvo soluções de análise 
                de dados, automação de processos e criação de dashboards para suporte à tomada de decisões estratégicas.
              </p>

              <p>
                Nos últimos 6 meses, <strong className="text-foreground">desenvolvi um sistema interno completo</strong> para 
                o escritório, o que despertou ainda mais minha paixão pela área de desenvolvimento. Essa experiência me motivou 
                a expandir minha atuação como <strong className="text-foreground">desenvolvedor freelancer</strong>, criando 
                soluções personalizadas para diferentes necessidades.
              </p>

              <p>
                Sou co-criador do projeto <strong className="text-foreground">Capi3D</strong> e apaixonado por 
                transformar dados em decisões inteligentes através de Machine Learning e análise de dados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                <div className="text-3xl font-bold text-primary">+{yearsOfExperience}</div>
                <div className="text-sm text-muted-foreground">Anos Exp.</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                <div className="text-3xl font-bold text-primary">{projectsCount}</div>
                <div className="text-sm text-muted-foreground">Projetos</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Disponível para Freelas
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;