import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Sobre", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/AndreRuperto",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/andrerup",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/andreruperto.dev",
      label: "Instagram",
    },
    {
      icon: Mail,
      href: "mailto:contato@andreruperto.dev",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / Nome */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="text-xl font-bold">
              André<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Desenvolvedor Full Stack & Cientista de Dados
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="p-2.5 rounded-full bg-secondary border border-border hover:border-primary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} André Ruperto. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
