import memojiThumbsUp from "@/assets/memoji-thumbsup.png";

const AboutSection = () => {
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
                  src={memojiThumbsUp}
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
                Sou o André, estudante de <strong className="text-foreground">Ciência da Computação</strong> no 
                Centro Universitário UDF, com foco em <strong className="text-foreground">Ciência de Dados</strong> e 
                <strong className="text-foreground"> Automatização de Processos</strong>.
              </p>
              
              <p>
                Atualmente atuo como Estagiário na equipe de dados do <strong className="text-foreground">Ministério da Gestão 
                e da Inovação em Serviços Públicos (MGI)</strong>, onde desenvolvo scripts em Python para automação 
                de processos de contratações públicas e crio dashboards interativos com Power BI e Qlik Sense.
              </p>

              <p>
                Sou co-criador do projeto <strong className="text-foreground">Capi3D</strong> e apaixonado por 
                transformar dados em decisões inteligentes através de Machine Learning e análise de dados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                <div className="text-3xl font-bold text-primary">7º</div>
                <div className="text-sm text-muted-foreground">Semestre</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                <div className="text-3xl font-bold text-primary">+1</div>
                <div className="text-sm text-muted-foreground">Ano Exp.</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Projetos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
