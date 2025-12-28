import React from 'react';

const GithubActivity: React.FC = () => {
  const username = 'AndreRuperto';
  const theme = 'merko';

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          Atividade GitHub
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Acompanhe meu progresso e contribuições na plataforma
        </p>

        <div className="flex flex-col items-center gap-8">
          {/* Gráfico de Atividade */}
          <div className="w-full glass rounded-lg p-4 hover-lift">
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme}`}
              alt="Gráfico de atividade do GitHub"
              className="w-full rounded-lg"
              onError={(e) => e.currentTarget.remove()}
            />
          </div>

          {/* GitHub Streak */}
          <div className="w-full max-w-2xl glass rounded-lg p-4 hover-lift">
            <a 
              href="https://git.io/streak-stats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://streak-stats.demolab.com?user=${username}&theme=${theme}`}
                alt="GitHub Streak"
                className="w-full rounded-lg"
                onError={(e) => e.currentTarget.remove()}
              />
            </a>
          </div>

          {/* Stats e Top Languages */}
          {/* <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <div className="glass rounded-lg p-4 hover-lift">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&include_all_commits=true&count_private=true&theme=${theme}&rank_icon=github&border_radius=10`}
                alt="Estatísticas GitHub"
                className="h-[150px] rounded-lg"
                onError={(e) => e.currentTarget.remove()}
              />
            </div>
            <div className="glass rounded-lg p-4 hover-lift">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=${theme}&border_radius=10`}
                alt="Linguagens mais usadas"
                className="h-[150px] rounded-lg"
                onError={(e) => e.currentTarget.remove()}
              />
            </div>
          </div> */}

          {/* Snake Animation */}
          <div className="w-full mt-8 glass rounded-lg p-6">
            <img
              src={`https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid.svg`}
              alt="Snake animation"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;