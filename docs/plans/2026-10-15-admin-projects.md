# Admin Projects Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a `/admin/projects` page to create, edit, delete and reorder portfolio projects, with automatic screenshot capture via Puppeteer on the server.

**Architecture:** Frontend page `AdminProjects.tsx` protected by existing JWT auth, communicating with new backend endpoints. Drag-and-drop reordering via `@dnd-kit/core`. Screenshot triggered server-side via Puppeteer when a site URL is provided.

**Tech Stack:** React + TypeScript, @dnd-kit/core, Express.js, Puppeteer (backend), Prisma/PostgreSQL

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json` (frontend)
- Modify: `backend/package.json`

**Step 1: Install @dnd-kit in frontend**

```bash
cd d:/Projetos/Portfolio-AndreRuperto
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

Expected: packages added to `node_modules`

**Step 2: Install puppeteer in backend**

```bash
cd d:/Projetos/Portfolio-AndreRuperto/backend
npm install puppeteer
```

Expected: puppeteer added to backend `node_modules`

**Step 3: Commit**

```bash
git add package.json package-lock.json backend/package.json backend/package-lock.json
git commit -m "chore: add dnd-kit and puppeteer dependencies for admin projects"
```

---

### Task 2: Update .env and auth to support username + password

**Files:**
- Modify: `backend/.env`
- Modify: `backend/src/server.js` (auth login endpoint, lines ~247-261)

**Step 1: Add ADMIN_USER to .env**

Add to `backend/.env`:
```
ADMIN_USER=admin
```

**Step 2: Update login endpoint to validate username too**

In `backend/src/server.js`, replace the login handler:

```js
app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, success: true });
  } else {
    res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});
```

**Step 3: Update AdminLogin.tsx to include username field**

In `src/pages/AdminLogin.tsx`:
- Add `username` state: `const [username, setUsername] = useState("");`
- Add username input above password field:
```tsx
<div>
  <label htmlFor="username" className="block text-sm font-medium mb-2">Usuário</label>
  <input
    type="text"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary/50 focus:outline-none transition-colors"
    placeholder="Digite o usuário"
    autoFocus
  />
</div>
```
- Update fetch body: `body: JSON.stringify({ username, password })`
- Update redirect: `navigate("/admin/projects")`
- Update subtitle: `"Acesso restrito ao painel de administração"`

**Step 4: Commit**

```bash
git add backend/src/server.js src/pages/AdminLogin.tsx backend/.env
git commit -m "feat: add username field to admin login"
```

---

### Task 3: Add backend endpoints for reorder and screenshot

**Files:**
- Modify: `backend/src/server.js`

**Step 1: Add reorder endpoint (after existing PUT /api/projects/:id)**

```js
app.put('/api/projects/reorder', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body; // [{ id, order }]
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items deve ser um array' });
    }
    await Promise.all(
      items.map(({ id, order }) =>
        prisma.project.update({ where: { id }, data: { order } })
      )
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao reordenar:', error);
    res.status(500).json({ error: 'Erro ao reordenar projetos' });
  }
});
```

> ⚠️ This route MUST be defined BEFORE `PUT /api/projects/:id` to avoid Express matching "reorder" as an `:id`.

**Step 2: Add screenshot endpoint**

Add after the reorder endpoint:

```js
app.post('/api/projects/:id/screenshot', authMiddleware, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL é obrigatória' });

  const id = parseInt(req.params.id);
  const fileName = `site-project-${id}.png`;
  const outputPath = path.join(__dirname, '../../public', fileName);

  try {
    const { default: puppeteer } = await import('puppeteer');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: outputPath, fullPage: false });
    await browser.close();

    const imagePath = `/${fileName}`;
    await prisma.project.update({ where: { id }, data: { image: imagePath } });

    res.json({ success: true, image: imagePath });
  } catch (error) {
    console.error('Erro ao capturar screenshot:', error);
    res.status(500).json({ error: 'Erro ao capturar screenshot' });
  }
});
```

**Step 3: Commit**

```bash
git add backend/src/server.js
git commit -m "feat: add reorder and screenshot endpoints to backend"
```

---

### Task 4: Create ProtectedRoute component

**Files:**
- Create: `src/components/ProtectedRoute.tsx`

**Step 1: Create the component**

```tsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
```

**Step 2: Wrap admin routes in App.tsx**

In `src/App.tsx`, add import and wrap admin routes:

```tsx
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProjects from "./pages/AdminProjects";

// Inside Routes:
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
<Route path="/admin/email-preview" element={<ProtectedRoute><EmailPreview /></ProtectedRoute>} />
```

**Step 3: Commit**

```bash
git add src/components/ProtectedRoute.tsx src/App.tsx
git commit -m "feat: add ProtectedRoute and register /admin/projects route"
```

---

### Task 5: Create ProjectFormModal component

**Files:**
- Create: `src/components/admin/ProjectFormModal.tsx`

**Step 1: Create the modal**

```tsx
import { useState, useEffect } from "react";
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
```

**Step 2: Commit**

```bash
git add src/components/admin/ProjectFormModal.tsx
git commit -m "feat: create ProjectFormModal component"
```

---

### Task 6: Create AdminProjects page

**Files:**
- Create: `src/pages/AdminProjects.tsx`

**Step 1: Create the page**

```tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
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

  const authHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

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

  const handleSave = async (form: { title: string; description: string; tags: string[]; links: { url: string; label: string }[]; github: string; siteUrl: string }) => {
    const { siteUrl, ...projectData } = form;
    const isEdit = !!modal.project;
    const url = isEdit ? `${API_URL}/projects/${modal.project!.id}` : `${API_URL}/projects`;
    const method = isEdit ? "PUT" : "POST";

    const body = {
      ...projectData,
      github: projectData.github || null,
      order: isEdit ? modal.project!.order : projects.length + 1,
    };

    const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(body) });
    const saved = await res.json();

    setModal({ open: false });
    await fetchProjects();

    // Trigger screenshot if siteUrl provided
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
        {/* Header */}
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

        {/* List */}
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
```

**Step 2: Commit**

```bash
git add src/pages/AdminProjects.tsx
git commit -m "feat: create AdminProjects page with drag-and-drop reordering"
```

---

### Task 7: Fix reorder route order in server.js

**Files:**
- Modify: `backend/src/server.js`

**Step 1: Ensure `/api/projects/reorder` is defined BEFORE `/api/projects/:id`**

In `server.js`, move the reorder endpoint so it appears before the `PUT /api/projects/:id` handler. Express matches routes top-down — if `:id` comes first, "reorder" gets matched as an id.

**Step 2: Test locally**

```bash
npm run deploy:local
```

- Go to `http://localhost:8080/admin/login`
- Login with username + password
- Create a project with a site URL → screenshot should be captured
- Drag projects to reorder → order should persist on refresh

**Step 3: Commit**

```bash
git add backend/src/server.js
git commit -m "fix: ensure reorder route is registered before :id wildcard"
```

---

### Task 8: Final cleanup and full commit

**Step 1: Update seed.ts to include siteUrl awareness note**

No changes needed — seed.ts is for initial data only.

**Step 2: Final verification**

- [ ] Login with username + password works
- [ ] Can create a project with screenshot capture
- [ ] Can edit a project
- [ ] Can delete a project
- [ ] Drag-and-drop reorders and persists
- [ ] Recapture screenshot button works

**Step 3: Full commit**

```bash
git add -A
git commit -m "feat: admin projects page with CRUD, drag-and-drop reorder and screenshot capture"
```
