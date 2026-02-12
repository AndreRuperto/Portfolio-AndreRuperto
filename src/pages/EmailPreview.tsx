import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, CheckCircle, ArrowLeft } from "lucide-react";

const EmailPreview = () => {
  const [activeTemplate, setActiveTemplate] = useState<"notification" | "confirmation">("notification");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const getIframeSrc = () => {
    const token = localStorage.getItem("admin_token");
    const endpoint = activeTemplate === "notification"
      ? "/api/admin/email-preview/notification"
      : "/api/admin/email-preview/confirmation";

    return `${endpoint}?token=${token}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Voltar para o portfolio"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Preview de Templates de Email</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Template Selector */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTemplate("notification")}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                activeTemplate === "notification"
                  ? "bg-primary/10 border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeTemplate === "notification" ? "bg-primary/20" : "bg-secondary"
                }`}>
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Email de Notificação</h3>
                  <p className="text-sm text-muted-foreground">
                    Email que você recebe quando alguém envia uma mensagem
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTemplate("confirmation")}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                activeTemplate === "confirmation"
                  ? "bg-primary/10 border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeTemplate === "confirmation" ? "bg-primary/20" : "bg-secondary"
                }`}>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Email de Confirmação</h3>
                  <p className="text-sm text-muted-foreground">
                    Email automático enviado para quem enviou a mensagem
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Email Preview */}
          <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
            <div className="bg-secondary/50 p-4 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2">
                  {activeTemplate === "notification"
                    ? "contato@andreruperto.dev"
                    : "joao@exemplo.com"}
                </span>
              </div>
            </div>
            <div className="bg-white" style={{ height: "calc(100vh - 300px)" }}>
              <iframe
                key={activeTemplate}
                src={getIframeSrc()}
                className="w-full h-full border-0"
                title={`Preview do template ${activeTemplate}`}
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <strong>💡 Dica:</strong> Estes são os templates que serão enviados automaticamente
              quando alguém preencher o formulário de contato do seu portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
