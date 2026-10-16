import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Pencil, Trash2, GripVertical, LogOut, Loader2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface ProjectLink { url: string; label: string; }
interface Project {
  id: number; title: string; description: string; tags: string[];
  image: string | null; links: ProjectLink[]; github: string | null; order: number;
}

interface ProjectFormData {
  title: string; description: string; tags: string[];
  links: ProjectLink[]; github: string; siteUrl: string;
}

function SortableProjectRow({
  project, onEdit, onDelete, onScreenshot, screenshotLoading,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onScreenshot: () => void;
  screenshotLoading: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-4 p-4 bg-card border border-border rounded-xl transition-shadow ${isDragging ? "shadow-2xl opacity-80 z-50" : ""}`}
    >
      <button {...attributes} {...listeners} className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
        <GripVertical className="w-5 h-5" />
      </button>

      {project.image ? (
        <img src={project.image} alt={project.title} className="w-16 h-10 object-cover rounded-lg border border-border flex-shrink-0" />
      ) : (
        <div className="w-16 h-10 bg-secondary rounded-lg border border-border flex items-center justify-center flex-shrink-0">
          <Image className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{project.title}</p>
        <div className="flex gap-1 mt-1 flex-wrap">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={onScreenshot} disabled={screenshotLoading}
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
          title="Recapturar screenshot">
          {screenshotLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
        </button>
        <button onClick={onEdit} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; project?: Project }>({ open: false });
  const [screenshotLoading, setScreenshotLoading] = useState<number | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  const sensors = useSensors(useSensor(PointerSensor));

  const authHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    setProjects(Array.isArray(data) ? data.sort((a: Project, b: Project) => a.order - b.order) : []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex).map((p, i) => ({ ...p, order: i + 1 }));
    setProjects(reordered);

    await fetch(`${API_URL}/projects/reorder`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({ items: reordered.map(p => ({ id: p.id, order: p.order })) }),
    });
  };

  const handleSave = async (form: ProjectFormData) => {
    const { siteUrl, ...projectData } = form;
    const isEdit = !!modal.project;
    const url = isEdit ? `${API_URL}/projects/${modal.project!.id}` : `${API_URL}/projects`;
    const method = isEdit ? "PUT" : "POST";

    const links = [...projectData.links.filter(l => l.url && l.label)];
    if (siteUrl && !links.some(l => l.url === siteUrl)) {
      links.unshift({ url: siteUrl, label: "Ver site" });
    }

    const body = {
      ...projectData,
      links,
      github: projectData.github || null,
      order: isEdit ? modal.project!.order : projects.length + 1,
    };

    const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(body) });
    const saved = await res.json();

    setModal({ open: false });
    await fetchProjects();

    if (siteUrl) {
      setScreenshotLoading(saved.id);
      await fetch(`${API_URL}/projects/${saved.id}/screenshot`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ url: siteUrl }),
      });
      setScreenshotLoading(null);
      await fetchProjects();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
    await fetch(`${API_URL}/projects/${id}`, { method: "DELETE", headers: authHeaders });
    setProjects(p => p.filter(pr => pr.id !== id));
  };

  const handleScreenshot = async (project: Project) => {
    const siteUrl = project.links.find(l => l.label.toLowerCase().includes("site"))?.url;
    const url = siteUrl || prompt("URL do site para capturar screenshot:");
    if (!url) return;

    setScreenshotLoading(project.id);
    await fetch(`${API_URL}/projects/${project.id}/screenshot`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ url }),
    });
    setScreenshotLoading(null);
    await fetchProjects();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Projetos</h1>
            <p className="text-muted-foreground text-sm mt-1">Arraste para reordenar</p>
          </div>
          <div className="flex gap-3">
            <Button variant="hero" onClick={() => setModal({ open: true })}>
              <Plus className="w-4 h-4" /> Novo Projeto
            </Button>
            <button onClick={handleLogout} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Carregando...</div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {projects.map(project => (
                  <SortableProjectRow
                    key={project.id}
                    project={project}
                    onEdit={() => setModal({ open: true, project })}
                    onDelete={() => handleDelete(project.id)}
                    onScreenshot={() => handleScreenshot(project)}
                    screenshotLoading={screenshotLoading === project.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <div className="mt-8 text-center">
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar ao portfolio
          </button>
        </div>
      </div>

      {modal.open && (
        <ProjectFormModal
          initial={modal.project ? {
            id: modal.project.id,
            title: modal.project.title,
            description: modal.project.description,
            tags: modal.project.tags,
            links: modal.project.links,
            github: modal.project.github ?? "",
            siteUrl: "",
          } : undefined}
          onSave={handleSave}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
};

export default AdminProjects;
