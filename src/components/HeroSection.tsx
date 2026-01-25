import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail, Download, Sparkles, Play, FileText, Globe, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import introVideo from "@/assets/intro-video.mp4";
import memojiJoia from "@/assets/memoji-joia.png";
import memojiHello from "@/assets/memoji-hello.png";
import apresentacao from "@/assets/André Ruperto - Apresentação.pdf";
import site from "@/assets/Importância de um Site.pdf";

const HeroSection = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setShowPlayButton(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowPlayButton(false);
      setHasPlayed(false);
    }
  };

  const handleVideoEnded = () => {
    setHasPlayed(true);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ff00' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Vamos construir algo incrível juntos!</span>
            </div>

            {/* Name */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h1 className="heading-lg">
                <span className="text-gradient">André Ruperto</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground tracking-wider">
                Desenvolvedor & Cientista de Dados 
              </h2>
            </div>

            {/* Description */}
            <p className="text-muted-foreground max-w-md mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Formado em Ciência da Computação focado em Desenvolvimento, Ciência de Dados, 
              Machine Learning e Automação de Processos. Transformando dados em decisões inteligentes.
            </p>

            {/* Buttons */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg" asChild>
                  <a href={apresentacao} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4" />
                    Apresentação
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href={site} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                    Importância de um Site
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="heroOutline" size="lg">
                  <DollarSign className="w-4 h-4" />
                  Valores
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="https://drive.google.com/uc?export=download&id=1xpgYelvpG66mXmI7kdhxr_4kGh00t6VQ" download>
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <a
                href="https://github.com/AndreRuperto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/andrerup"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:andreruperto@gmail.com"
                className="p-3 rounded-full bg-secondary border border-border hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right content - Video/Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />
              
              {/* Video/Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30">
                {!hasPlayed ? (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-cover"
                    >
                      <source src={introVideo} type="video/mp4" />
                    </video>
                    
                    {showPlayButton && (
                      <button
                        onClick={handlePlayClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110">
                          <Play className="w-10 h-10 text-background ml-1" fill="currentColor" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <img 
                    src={memojiJoia} 
                    alt="André Ruperto" 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;