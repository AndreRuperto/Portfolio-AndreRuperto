import { useState } from "react";

const skills = {
  languages: [
    { name: "Python", icon: "py", custom: false },
    { name: "JavaScript", icon: "js", custom: false },
    { name: "TypeScript", icon: "ts", custom: false },
    { name: "C/C++", icon: "cpp", custom: false },
    { name: "HTML/CSS", icon: "html", custom: false },
    { name: "Node.js", icon: "nodejs", custom: false },
  ],
  data: [
    { name: "TensorFlow", icon: "tensorflow", custom: false },
    { name: "PyTorch", icon: "pytorch", custom: false },
    { name: "Scikit-learn", icon: "sklearn", custom: false },
    { name: "OpenCV", icon: "opencv", custom: false },
    { name: "Selenium", icon: "selenium", custom: false },
  ],
  tools: [
    { name: "Git", icon: "git", custom: false },
    { name: "GitHub", icon: "github", custom: false },
    { name: "Docker", icon: "docker", custom: false },
    { name: "Postman", icon: "postman", custom: false },
    { name: "VS Code", icon: "vscode", custom: false },
    { name: "Figma", icon: "figma", custom: false },
    { name: "Vercel", icon: "vercel", custom: false },
    { name: "Power BI", icon: "/src/assets/powerbi.svg", custom: true },
    { name: "Qlik", icon: "/src/assets/qlik.svg", custom: true },
    { name: "Airflow", icon: "/src/assets/airflow.svg", custom: true },
  ],
  databases: [
    { name: "PostgreSQL", icon: "postgres", custom: false },
    { name: "MySQL", icon: "mysql", custom: false },
    { name: "SQLite", icon: "sqlite", custom: false },
  ],
};

const SkillsSection = () => {
  const [expandedSections, setExpandedSections] = useState({
    languages: false,
    data: false,
    tools: false,
    databases: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSkills = (skillsArray, sectionKey, limit = 5) => {
    const displayedSkills = expandedSections[sectionKey] 
      ? skillsArray 
      : skillsArray.slice(0, limit);

    return (
      <>
        {displayedSkills.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <img 
              src={skill.custom ? skill.icon : `https://skillicons.dev/icons?i=${skill.icon}`}
              alt={skill.name}
              className="w-8 h-8"
            />
            <span className="font-medium">{skill.name}</span>
          </div>
        ))}
        {skillsArray.length > limit && (
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full p-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {expandedSections[sectionKey] ? "Ver menos ↑" : `Ver mais (${skillsArray.length - limit}) ↓`}
          </button>
        )}
      </>
    );
  };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Habilidades</span>
          <h2 className="heading-md">
            Tecnologias & <span className="text-gradient">Ferramentas</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Linguagens</h3>
            <div className="space-y-3">
              {renderSkills(skills.languages, 'languages')}
            </div>
          </div>

          {/* Data Science & ML */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Machine Learning & IA</h3>
            <div className="space-y-3">
              {renderSkills(skills.data, 'data')}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Ferramentas</h3>
            <div className="space-y-3">
              {renderSkills(skills.tools, 'tools')}
            </div>
          </div>

          {/* Databases */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Bancos de Dados</h3>
            <div className="space-y-3">
              {renderSkills(skills.databases, 'databases')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;