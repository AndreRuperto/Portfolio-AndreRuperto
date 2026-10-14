import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import formatura1 from "@/assets/images/formatura-1.jpg";
import formatura2 from "@/assets/images/formatura-2.jpg";

const graduationPhotos = [
  { src: formatura1, alt: "André recebendo o certificado de Láurea Acadêmica na cerimônia de formatura" },
  { src: formatura2, alt: "Certificado de Láurea Acadêmica - UDF" },
];

const Lightbox = ({ initialIndex, onClose }: { initialIndex: number; onClose: () => void }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + graduationPhotos.length) % graduationPhotos.length), []);
  const next = useCallback(() => setCurrent(i => (i + 1) % graduationPhotos.length), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        onClick={e => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <img
        src={graduationPhotos[current].src}
        alt={graduationPhotos[current].alt}
        className="max-h-[90vh] max-w-[80vw] object-contain rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        onClick={e => { e.stopPropagation(); next(); }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 flex gap-2">
        {graduationPhotos.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setCurrent(i); }}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>,
    document.body
  );
};

const GraduationGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setLightboxIndex(0)}
        className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Images className="w-4 h-4" />
        Ver fotos da formatura
      </button>

      {lightboxIndex !== null && (
        <Lightbox initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
};

const BULLETS_PREVIEW = 2;

const ExperienceCard = ({ item, calculateDuration }: {
  item: { period: string; startDate: string; endDate: string | null; title: string; company: string; bullets?: string[]; description?: string };
  calculateDuration: (s: string, e: string | null) => string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const bullets = item.bullets ?? [];
  const hasMore = bullets.length > BULLETS_PREVIEW;
  const visible = expanded ? bullets : bullets.slice(0, BULLETS_PREVIEW);

  return (
    <div className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors text-justify">
      <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
      <span className="text-sm text-primary font-mono">
        {item.period} {calculateDuration(item.startDate, item.endDate)}
      </span>
      <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
      <p className="text-muted-foreground text-sm">{item.company}</p>
      {bullets.length > 0 ? (
        <>
          <ul className="mt-2 space-y-1 list-disc list-outside pl-4">
            {visible.map((bullet, j) => (
              <li key={j} className="text-muted-foreground text-sm">{bullet}</li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {expanded ? <><ChevronUp className="w-3 h-3" /> Ler menos</> : <><ChevronDown className="w-3 h-3" /> Ler mais</>}
            </button>
          )}
        </>
      ) : (
        <p className="text-muted-foreground mt-2">{item.description ?? ''}</p>
      )}
    </div>
  );
};

const ResumeSection = () => {
  // Função para calcular a duração
  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `(${months} ${months === 1 ? 'mês' : 'meses'})`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `(${years} ${years === 1 ? 'ano' : 'anos'})`;
    }
    
    return `(${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'})`;
  };

  const education = [
    {
      period: "2022 - 2025",
      startDate: "2022-01-01",
      endDate: "2025-12-31",
      title: "Graduação em Ciência da Computação",
      institution: "UDF (Centro Universitário do Distrito Federal)",
      description: "Láurea Acadêmica com média 9,38 e nota 10 no TCC, focado em Ciência de Dados e Machine Learning.",
    },
  ];

  const experience = [
    {
      period: "Mai/2025 - Out/2025",
      startDate: "2025-05-12",
      endDate: "2025-10-09",
      title: "Desenvolvedor FullStack Júnior",
      company: "Resende Mori Hutchison",
      bullets: [
        "Desenvolvimento de sistema interno fullstack completo para escritório de advocacia, com React 18 + TypeScript no frontend e Node.js + Express + PostgreSQL no backend, cobrindo mais de 30 módulos funcionais (CRM, gestão de metas, KPIs, agenda, portal do cliente, suporte, documentos).",
        "Implementação de RBAC granular com JWT (HTTP-only cookie), sistema de impersonação de usuários, proteção CSRF (double-submit cookie), rate limiting por rota, sanitização de XSS recursiva e CSP via Helmet.js.",
        "Integração com APIs externas como Autentique (assinatura eletrônica via GraphQL), Google Calendar/Drive/Sheets, Blip/WhatsApp, Twilio (SMS OTP), Power BI Embedded (Azure AD) e sistema legado MySQL via Apache Airflow.",
        "Modelagem e otimização de banco de dados PostgreSQL com mais de 330 migrações sequenciais, views materializadas para KPIs de alto volume (com refresh concorrente e índices funcionais/parciais) e parser de tipos customizado para correção de fuso horário (UTC-3).",
        "Construção de portal do cliente com fluxo de autenticação próprio (CPF + OTP SMS + verificação de e-mail), acompanhamento de status de documentos, onboarding e integração com software jurídico externo (EV Doc API).",
        "Automação de fluxos de trabalho como pipeline CRM com 16 estágios (DnD Kanban), engine de apuração automática de metas mensais, geração de documentos DOCX → PDF via Gotenberg e kit de assinatura eletrônica com reconciliação por cron.",
      ],
    },
    {
      period: "Mai/2025 - Out/2025",
      startDate: "2025-05-12",
      endDate: "2025-10-09",
      title: "Analista de Dados Júnior",
      company: "Resende Mori Hutchison",
      bullets: [
        "Desenvolvimento e manutenção de dashboards interativos para apoio à tomada de decisão com Power BI e Qlik, com foco em indicadores operacionais e estratégicos.",
        "Modelagem, tratamento e integração de dados de diferentes fontes (planilhas, bancos SQL e sistemas internos), garantindo consistência e qualidade da informação.",
        "Automação de rotinas de coleta, atualização e validação de dados, reduzindo retrabalho e aumentando a confiabilidade das análises.",
      ],
    },
    {
      period: "Jan/2024 - Mai/2025",
      startDate: "2024-01-01",
      endDate: "2025-05-09",
      title: "Estagiário - Equipe de Dados",
      company: "Ministério da Gestão e da Inovação (MGI)",
      bullets: [
        "Desenvolvimento de scripts em Python para automação de processos de contratações públicas.",
        "Extração e tratamento de informações de bases de dados governamentais utilizando SQL.",
        "Elaboração de documentações técnicas e guias para usuários com uso do Postman.",
        "Análise de dados e criação de dashboards/painéis interativos com Power BI e Qlik Sense.",
      ],
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
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-title">Currículo</span>
            <h2 className="heading-md">
              Educação & <span className="text-gradient">Experiência</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Education + Courses row */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <ScrollReveal variant="fade-right" delay={100}>
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
                    className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors text-justify"
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                    <span className="text-sm text-primary font-mono">
                      {item.period} {calculateDuration(item.startDate, item.endDate)}
                    </span>
                    <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.institution}</p>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Graduation photos */}
              <GraduationGallery />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={200}>
            <div>
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
          </ScrollReveal>
        </div>

        {/* Experience full-width */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Experiência</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {experience.map((item, i) => (
                <ExperienceCard key={i} item={item} calculateDuration={calculateDuration} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResumeSection;