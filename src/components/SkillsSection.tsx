const skills = {
  languages: [
    { name: "Python", icon: "🐍" },
    { name: "SQL", icon: "🗄️" },
    { name: "JavaScript", icon: "⚡" },
    { name: "TypeScript", icon: "📘" },
    { name: "C/C++", icon: "⚙️" },
    { name: "HTML/CSS", icon: "🎨" },
  ],
  data: [
    { name: "Power BI", icon: "📊" },
    { name: "Qlik Sense", icon: "📈" },
    { name: "Pandas", icon: "🐼" },
    { name: "NumPy", icon: "🔢" },
    { name: "Scikit-learn", icon: "🤖" },
    { name: "TensorFlow", icon: "🧠" },
  ],
  tools: [
    { name: "Git/GitHub", icon: "🔀" },
    { name: "Databricks", icon: "🧱" },
    { name: "Apache Airflow", icon: "🌬️" },
    { name: "Postman", icon: "📬" },
    { name: "Docker", icon: "🐳" },
    { name: "FastAPI", icon: "🚀" },
  ],
  databases: [
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MySQL", icon: "🐬" },
    { name: "MongoDB", icon: "🍃" },
    { name: "SQLite", icon: "📁" },
  ],
};

const SkillsSection = () => {
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
              {skills.languages.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Science */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Data Science</h3>
            <div className="space-y-3">
              {skills.data.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Ferramentas</h3>
            <div className="space-y-3">
              {skills.tools.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Bancos de Dados</h3>
            <div className="space-y-3">
              {skills.databases.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
