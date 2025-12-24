import { Briefcase, GraduationCap } from "lucide-react";
import memojiIdea from "@/assets/memoji-idea.png";

const ResumeSection = () => {
  const education = [
    {
      period: "2022 - 2025",
      title: "Graduação em Ciência da Computação",
      institution: "UDF (Centro Universitário do Distrito Federal)",
      description: "Cursando o 7º semestre com foco em Ciência de Dados e Machine Learning.",
    },
  ];

  const experience = [
    {
      period: "2024 - Atual",
      title: "Estagiário - Equipe de Dados",
      company: "Ministério da Gestão e da Inovação (MGI)",
      description: "Desenvolvimento de scripts em Python, extração de dados com SQL, criação de dashboards com Power BI e Qlik Sense.",
    },
    {
      period: "2022 - 2024",
      title: "Recepcionista",
      company: "Academia Blue+",
      description: "Atendimento ao público, gestão de pagamentos e implementação de melhorias nos processos internos.",
    },
  ];

  const courses = [
    "Banco de Dados e SQL - Udemy",
    "Git e GitHub - Curso Em Vídeo",
    "Python - Mundo 1, 2 e 3 - Curso Em Vídeo",
    "JavaScript - Curso Em Vídeo",
    "Análise de Dados - Hashtag Treinamentos",
  ];

  return (
    <section id="resume" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Currículo</span>
          <h2 className="heading-md">
            Educação & <span className="text-gradient">Experiência</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Educação</h3>
            </div>

            <div className="space-y-6">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                  <span className="text-sm text-primary font-mono">{item.period}</span>
                  <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.institution}</p>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Courses */}
            <div className="mt-12">
              <h4 className="text-lg font-semibold mb-4">Cursos Complementares</h4>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-secondary border border-border rounded-full text-muted-foreground hover:border-primary/50 transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Experiência</h3>
            </div>

            <div className="space-y-6">
              {experience.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                  <span className="text-sm text-primary font-mono">{item.period}</span>
                  <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.company}</p>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Memoji decoration */}
            <div className="mt-12 flex justify-center">
              <img
                src={memojiIdea}
                alt="Memoji"
                className="w-32 h-32 object-contain opacity-80 animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
