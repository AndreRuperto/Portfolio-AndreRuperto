// ContactSection.tsx
import { useState } from "react";
import { Mail, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import memojiThinking from "@/assets/memoji-thinking.png";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Substitua pelos seus IDs do EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'andrerupertodev@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Limpa a mensagem de sucesso após 5 segundos
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
      
      // Limpa a mensagem de erro após 5 segundos
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-title">Contato</span>
          <h2 className="heading-md">
            Vamos trabalhar <span className="text-gradient">juntos?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Estou disponível para projetos freelance de desenvolvimento web, análise de dados e automação. 
            Entre em contato e vamos transformar suas ideias em realidade!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Assunto do projeto"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Descreva seu projeto ou ideia..."
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span>Mensagem enviada com sucesso! Responderei em breve.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                  <XCircle className="w-5 h-5" />
                  <span>Erro ao enviar mensagem. Tente novamente ou use o email direto.</span>
                </div>
              )}
            </form>

            {/* Direct contact */}
            <div className="p-6 rounded-xl bg-secondary border border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm">Email direto</p>
                  <a
                    href="mailto:andrerupertodev@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    andrerupertodev@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-card rounded-3xl p-8 border border-border">
                <img
                  src={memojiThinking}
                  alt="Contato"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain mx-auto animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;