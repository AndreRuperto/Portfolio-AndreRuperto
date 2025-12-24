const MarqueeSection = () => {
  const items = [
    "CIENTISTA DE DADOS",
    "AUTOMAÇÃO DE PROCESSOS", 
    "MACHINE LEARNING",
    "PYTHON",
    "SQL",
    "POWER BI",
  ];

  return (
    <section className="py-4 bg-primary overflow-hidden">
      <div className="marquee whitespace-nowrap">
        <span className="inline-flex">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="mx-8 text-primary-foreground font-semibold text-sm tracking-wider">
              {item} <span className="mx-4">✦</span>
            </span>
          ))}
        </span>
      </div>
    </section>
  );
};

export default MarqueeSection;
