import { useState, useEffect } from "react";
import profilePhoto from "@/assets/images/foto-profissional-cortada.jpeg";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [dots, setDots] = useState("");

  // Configurações - ajuste o número de telefone
  const phone = "5561999570838";
  const message = "Olá André! Gostaria de conversar sobre um projeto.";

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setShowMessage(false);
      setIsTyping(true);

      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setShowMessage(true);
      }, 2500);

      return () => clearTimeout(typingTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTyping) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev === "..." ? "" : prev + "."));
      }, 500);

      return () => clearInterval(dotsInterval);
    } else {
      setDots("");
    }
  }, [isTyping]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShouldRender(false);
      setShowMessage(false);
      setIsTyping(false);
    }, 300);
  };

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Abrir chat WhatsApp"
      >
        <div
          className={`relative flex items-center justify-center bg-[#25D366] text-white w-14 h-14 rounded-full shadow-xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 ${
            !isOpen ? "animate-bounce" : ""
          }`}
          style={{ animationDuration: "2s" }}
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

          <svg className="h-7 w-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>

          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      {shouldRender && (
        <div
          className={`fixed bottom-24 right-6 w-[370px] max-w-[calc(100vw-3rem)] z-50 transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="rounded-2xl shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Fechar chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-11 h-11 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden border-2 border-primary-foreground/30">
                <img
                  src={profilePhoto}
                  alt="André Ruperto"
                  className="w-11 h-11 object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-primary-foreground font-semibold text-sm">André Ruperto</h3>
                <p className="text-primary-foreground/70 text-xs flex items-center gap-1">
                  {isTyping ? (
                    <span className="flex items-center">
                      digitando<span className="inline-block w-6 text-left">{dots}</span>
                    </span>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                      Online
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Messages Area - com fundo do zap */}
            <div
              className="p-5 min-h-[220px] max-h-[350px] overflow-y-auto"
              style={{
                backgroundImage: "url('/fundo-zap.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Timestamp */}
              <div className="text-center mb-4">
                <span className="bg-secondary text-muted-foreground text-xs px-4 py-1.5 rounded-full font-medium shadow-sm">
                  Hoje
                </span>
              </div>

              {/* Indicador de digitação */}
              {isTyping && (
                <div className="flex gap-2 max-w-[85%]">
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-4 relative">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Message bubble */}
              {showMessage && (
                <div className="flex gap-2 max-w-[85%] animate-fade-in">
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-4 relative">
                    <p className="text-foreground text-sm leading-relaxed mb-1.5 font-medium">
                      E aí! Tudo bem?
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Me conta sobre seu projeto que a gente conversa sobre a melhor solução pra você!
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <span className="text-muted-foreground text-[10px]">
                        {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer com CTA */}
            <div className="bg-card p-4 border-t border-border">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Iniciar Conversa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
