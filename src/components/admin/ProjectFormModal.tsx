import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectLink { url: string; label: string; }
interface ProjectFormData {
  title: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  github: string;
  siteUrl: string;
}

interface Props {
  initial?: Partial<ProjectFormData> & { id?: number };
  onSave: (data: ProjectFormData) => void;
  onClose: () => void;
}

const EMPTY: ProjectFormData = {
  title: "", description: "", tags: [], links: [], github: "", siteUrl: "",
};

const ProjectFormModal = ({ initial, onSave, onClose }: Props) => {
  const [form, setForm] = useState<ProjectFormData>({ ...EMPTY, ...initial });
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  const addLink = () =>
    setForm(f => ({ ...f, links: [...f.links, { url: "", label: "" }] }));

  const updateLink = (i: number, field: keyof ProjectLink, value: string) =>
    setForm(f => {
      const links = [...f.links];
      links[i] = { ...links[i], [field]: value };
      return { ...f, links };
    });

  const removeLink = (i: number) =>
    setForm(f => ({ ...f, links: f.links.filter((_, idx) => idx !== i) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{initial?.id ? "Editar Projeto" : "Novo Projeto"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3} className="w-full px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none resize-none" />
          </div>

          {/* Site URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL do site <span className="text-muted-foreground text-xs">(gera screenshot automaticamente)</span></label>
            <input value={form.siteUrl} onChange={e => setForm(f => ({ ...f, siteUrl: e.target.value }))}
              placeholder="https://exemplo.com"
              className="w-full px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none" />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 border border-primary/20 rounded-full text-primary">
                  {tag}
                  <button onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Ex: React — pressione Enter"
                className="flex-1 px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none text-sm" />
              <button onClick={addTag} className="px-3 py-2 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm font-medium mb-1">Links</label>
            <div className="space-y-2">
              {form.links.map((link, i) => (
                <div key={i} className="flex gap-2">
                  <input value={link.label} onChange={e => updateLink(i, "label", e.target.value)}
                    placeholder="Label (ex: Ver site)"
                    className="w-32 px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none text-sm" />
                  <input value={link.url} onChange={e => updateLink(i, "url", e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none text-sm" />
                  <button onClick={() => removeLink(i)} className="text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={addLink} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
                <Plus className="w-4 h-4" /> Adicionar link
              </button>
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium mb-1">GitHub <span className="text-muted-foreground text-xs">(opcional)</span></label>
            <input value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none" />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button variant="hero" className="flex-1" onClick={() => onSave(form)}>Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
