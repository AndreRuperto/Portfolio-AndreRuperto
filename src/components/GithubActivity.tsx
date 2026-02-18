import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const GithubActivity: React.FC = () => {
  const username = 'AndreRuperto';
  const theme = 'merko';

  const [showGraph, setShowGraph] = useState(true);
  const [showSnake, setShowSnake] = useState(true);

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="section-title">Github</span>
            <h2 className="heading-md">
              Atividade <span className="text-gradient">Github</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center gap-8">
          {showGraph && (
            <ScrollReveal className="w-full" delay={100}>
              <div className="w-full glass rounded-lg p-4 hover-lift">
                <img
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme}`}
                  alt="Gráfico de atividade do GitHub"
                  className="w-full rounded-lg"
                  onError={() => setShowGraph(false)}
                />
              </div>
            </ScrollReveal>
          )}

          {showSnake && (
            <ScrollReveal delay={200}>
              <div className="w-full max-w-2xl glass rounded-lg p-4 hover-lift">
                <a
                  href="https://git.io/streak-stats"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://randolph-santos.vercel.app?user=${username}&theme=${theme}`}
                    alt="GitHub Streak"
                    className="w-full rounded-lg"
                  />
                </a>
              </div>
            </ScrollReveal>
          )}

          {showSnake && (
            <ScrollReveal delay={300}>
              <div className="w-full mt-8 glass rounded-lg p-6">
                <img
                  src={`https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid.svg`}
                  alt="Snake animation"
                  className="w-full"
                  onError={() => setShowSnake(false)}
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;