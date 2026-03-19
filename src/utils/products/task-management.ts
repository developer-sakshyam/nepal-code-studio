import { FileEntry } from "../generateProductCode";

export function getTaskManagementFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "taskflow-app", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0", zustand: "^4.5.0", "framer-motion": "^11.3.0", "date-fns": "^3.6.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" } }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
    { path: "vite.config.ts", content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport path from 'path';\nexport default defineConfig({ plugins: [react()], resolve: { alias: { '@': path.resolve(__dirname, './src') } } });` },
    { path: "tailwind.config.js", content: `export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui'], display: ['Plus Jakarta Sans', 'system-ui'] },
      colors: {
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))', card: 'hsl(var(--card))',
        destructive: 'hsl(var(--destructive))',
      },
    }
  },
  plugins: []
};` },
    { path: "postcss.config.js", content: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };` },
    { path: ".gitignore", content: "node_modules\ndist\n*.log" },
    { path: "index.html", content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="TaskFlow - Professional task management with Kanban, List, and Calendar views"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
  <title>TaskFlow</title>
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 228 20% 5%;
  --foreground: 210 40% 98%;
  --primary: 152 68% 50%;
  --primary-foreground: 228 20% 5%;
  --muted: 228 15% 10%;
  --muted-foreground: 215 20% 48%;
  --border: 228 15% 13%;
  --card: 228 18% 8%;
  --destructive: 0 84% 60%;
}

body { @apply bg-background text-foreground antialiased font-sans; cursor: none; }

.custom-cursor { width: 18px; height: 18px; border: 2px solid hsl(var(--primary)); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transition: transform 0.15s, width 0.2s, height 0.2s, background 0.2s; transform: translate(-50%, -50%); mix-blend-mode: difference; }
.custom-cursor.hovering { width: 44px; height: 44px; background: hsl(var(--primary) / 0.12); }
.cursor-dot { width: 4px; height: 4px; background: hsl(var(--primary)); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); }

.drop-zone-active { background: hsl(var(--primary) / 0.05) !important; border-color: hsl(var(--primary) / 0.3) !important; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }

@media (max-width: 768px) { .custom-cursor, .cursor-dot { display: none !important; } body { cursor: auto; } }` },
    { path: "src/types.ts", content: `export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  labels: string[];
  createdAt: string;
}

export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatedCursor } from './components/AnimatedCursor';
import { Navbar } from './components/Navbar';
import Board from './pages/Board';
import ListView from './pages/ListView';
import CalendarView from './pages/CalendarView';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
    </BrowserRouter>
  );
}` },
    { path: "src/components/AnimatedCursor.tsx", content: `import { useEffect, useRef, useState } from 'react';
export function AnimatedCursor() {
  const c = useRef<HTMLDivElement>(null), d = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(false);
  useEffect(() => {
    const cur = c.current, dot = d.current; if (!cur || !dot) return;
    let mx=0,my=0,cx=0,cy=0;
    const move = (e: MouseEvent) => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; };
    const anim = () => { cx+=(mx-cx)*0.12; cy+=(my-cy)*0.12; cur.style.left=cx+'px'; cur.style.top=cy+'px'; requestAnimationFrame(anim); };
    document.addEventListener('mousemove', move); anim();
    const obs = new MutationObserver(() => { document.querySelectorAll('a,button,input,select,textarea,[role="button"]').forEach(el => { el.addEventListener('mouseenter', () => setH(true)); el.addEventListener('mouseleave', () => setH(false)); }); });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener('mousemove', move); obs.disconnect(); };
  }, []);
  return (<><div ref={c} className={\`custom-cursor \${h?'hovering':''}\`}/><div ref={d} className="cursor-dot"/></>);
}` },
    { path: "src/store/taskStore.ts", content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterPriority: string;
  setFilterPriority: (p: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist((set) => ({
    tasks: [
      { id: '1', title: 'Design landing page', description: 'Create hero section, feature grid, and CTA following brand guidelines.', status: 'todo', priority: 'high', assignee: 'Alex', labels: ['design', 'frontend'], createdAt: '2024-03-01', dueDate: '2024-03-15' },
      { id: '2', title: 'Implement auth system', description: 'JWT auth with refresh tokens, password reset, and OAuth providers.', status: 'in-progress', priority: 'urgent', assignee: 'Sarah', labels: ['backend', 'security'], createdAt: '2024-03-02', dueDate: '2024-03-10' },
      { id: '3', title: 'Write API documentation', description: 'Document all REST endpoints with examples and request/response schemas.', status: 'review', priority: 'medium', assignee: 'Mike', labels: ['docs'], createdAt: '2024-03-03' },
      { id: '4', title: 'Fix mobile navigation', description: 'Hamburger menu not closing on route change. Test iOS and Android.', status: 'done', priority: 'low', assignee: 'Alex', labels: ['bug', 'frontend'], createdAt: '2024-02-28' },
      { id: '5', title: 'Add dark mode toggle', description: 'Theme toggle with system preference detection and localStorage persistence.', status: 'todo', priority: 'medium', labels: ['frontend', 'design'], createdAt: '2024-03-05' },
      { id: '6', title: 'Set up CI/CD pipeline', description: 'GitHub Actions for testing, linting, and auto-deployment to staging.', status: 'todo', priority: 'high', assignee: 'Sarah', labels: ['devops'], createdAt: '2024-03-06', dueDate: '2024-03-20' },
      { id: '7', title: 'Performance audit', description: 'Lighthouse audit, identify bottlenecks, optimize bundle and images.', status: 'in-progress', priority: 'medium', assignee: 'Mike', labels: ['performance'], createdAt: '2024-03-07' },
    ],
    addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
    updateTask: (id, updates) => set((s) => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates } : t) })),
    deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter(t => t.id !== id) })),
    moveTask: (id, status) => set((s) => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, status } : t) })),
    searchQuery: '',
    setSearchQuery: (q) => set({ searchQuery: q }),
    filterPriority: 'all',
    setFilterPriority: (p) => set({ filterPriority: p }),
  }), { name: 'taskflow-storage' })
);` },
    { path: "src/components/Navbar.tsx", content: `import { NavLink } from 'react-router-dom';
import { LayoutGrid, List, Calendar, Plus, Search, Zap } from 'lucide-react';
import { useState } from 'react';
import { AddTaskModal } from './AddTaskModal';
import { useTaskStore } from '../store/taskStore';
import { motion } from 'framer-motion';

export function Navbar() {
  const [showAdd, setShowAdd] = useState(false);
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <>
      <nav className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-display font-bold tracking-tight">TaskFlow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search tasks..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-muted border border-border text-sm w-44 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
            </div>
            {[{ to: '/', icon: LayoutGrid, label: 'Board' }, { to: '/list', icon: List, label: 'List' }, { to: '/calendar', icon: Calendar, label: 'Cal' }].map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => \`p-2 rounded-lg text-sm transition-all \${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}\`}>
                <Icon className="w-4.5 h-4.5" />
              </NavLink>
            ))}
            <button onClick={() => setShowAdd(true)}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1 ml-1 hover:shadow-lg hover:shadow-primary/20 transition-all">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>
        </div>
      </nav>
      {showAdd && <AddTaskModal onClose={() => setShowAdd(false)} />}
    </>
  );
}` },
    { path: "src/components/AddTaskModal.tsx", content: `import { useState } from 'react';
import { X } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { TaskPriority, TaskStatus } from '../types';
import { motion } from 'framer-motion';

export function AddTaskModal({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore(s => s.addTask);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ id: Date.now().toString(), title, description: desc, status, priority, assignee: assignee || undefined, dueDate: dueDate || undefined, labels: [], createdAt: new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onSubmit={handleSubmit} onClick={e => e.stopPropagation()}
        className="w-full max-w-md p-6 rounded-2xl bg-card border border-border shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-bold">New Task</h2>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <div className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title *" required
            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-all">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-all">
                <option value="todo">To Do</option><option value="in-progress">In Progress</option><option value="review">Review</option><option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-muted-foreground mb-1 block font-medium">Assignee</label><input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Name" className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-all" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block font-medium">Due Date</label><input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-all" /></div>
          </div>
        </div>
        <button type="submit" className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold mt-6 hover:shadow-lg hover:shadow-primary/20 transition-all">
          Create Task
        </button>
      </motion.form>
    </div>
  );
}` },
    { path: "src/components/TaskCard.tsx", content: `import { Task } from '../types';
import { Calendar, User, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useTaskStore } from '../store/taskStore';
import { motion } from 'framer-motion';

const priorityConfig: Record<string, { color: string; bg: string; dot: string }> = {
  low: { color: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-500' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10', dot: 'bg-orange-500' },
  urgent: { color: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-500' },
};

export function TaskCard({ task, index = 0 }: { task: Task; index?: number }) {
  const deleteTask = useTaskStore(s => s.deleteTask);
  const config = priorityConfig[task.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      draggable
      onDragStart={(e) => (e as any).dataTransfer?.setData('taskId', task.id)}
      className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 cursor-grab active:cursor-grabbing transition-all group hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between mb-2">
        <span className={\`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize \${config.bg} \${config.color}\`}>
          <span className={\`w-1.5 h-1.5 rounded-full \${config.dot}\`} />
          {task.priority}
        </span>
        <button onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
      {task.labels.length > 0 && (
        <div className="flex gap-1 mb-3 flex-wrap">
          {task.labels.map(l => <span key={l} className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium">{l}</span>)}
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {task.dueDate ? <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(task.dueDate), 'MMM d')}</span> : <span />}
        {task.assignee && (
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-[9px] font-bold text-primary">
              {task.assignee.charAt(0)}
            </span>
            {task.assignee}
          </span>
        )}
      </div>
    </motion.div>
  );
}` },
    { path: "src/components/KanbanColumn.tsx", content: `import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { useState } from 'react';

const statusConfig: Record<string, { label: string; color: string }> = {
  'todo': { label: 'To Do', color: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', color: 'bg-amber-500' },
  'review': { label: 'Review', color: 'bg-violet-500' },
  'done': { label: 'Done', color: 'bg-emerald-500' },
};

export function KanbanColumn({ status, tasks, onDrop }: { status: TaskStatus; tasks: Task[]; onDrop: (taskId: string) => void }) {
  const config = statusConfig[status];
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={\`flex-1 min-w-[280px] rounded-xl p-3 transition-all \${dragOver ? 'drop-zone-active border border-dashed' : ''}\`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { setDragOver(false); const id = e.dataTransfer.getData('taskId'); if (id) onDrop(id); }}
    >
      <div className="flex items-center gap-2.5 mb-4 px-1">
        <div className={\`w-2.5 h-2.5 rounded-full \${config.color}\`} />
        <h3 className="font-display font-semibold text-sm">{config.label}</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto font-medium">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map((task, i) => <TaskCard key={task.id} task={task} index={i} />)}
        {tasks.length === 0 && (
          <div className="text-center py-10 text-xs text-muted-foreground border border-dashed border-border rounded-xl">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}` },
    { path: "src/pages/Board.tsx", content: `import { useTaskStore } from '../store/taskStore';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskStatus } from '../types';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];

export default function Board() {
  const { tasks, moveTask, searchQuery, filterPriority } = useTaskStore();

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
      return true;
    });
  }, [tasks, searchQuery, filterPriority]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">Board</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} tasks • Drag to reorder</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['all', 'urgent', 'high', 'medium', 'low'].map(p => (
            <button key={p} onClick={() => useTaskStore.getState().setFilterPriority(p)}
              className={\`px-3 py-1.5 rounded-lg text-xs capitalize font-medium transition-all \${
                filterPriority === p ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }\`}>{p}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {statuses.map(status => (
          <KanbanColumn key={status} status={status} tasks={filtered.filter(t => t.status === status)} onDrop={(id) => moveTask(id, status)} />
        ))}
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/ListView.tsx", content: `import { useTaskStore } from '../store/taskStore';
import { useMemo } from 'react';
import { Calendar, User, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const priorityColors: Record<string, string> = { low: 'bg-blue-500', medium: 'bg-amber-500', high: 'bg-orange-500', urgent: 'bg-red-500' };
const statusColors: Record<string, string> = { 'todo': 'text-blue-400', 'in-progress': 'text-amber-400', 'review': 'text-violet-400', 'done': 'text-emerald-400' };

export default function ListView() {
  const { tasks, deleteTask, searchQuery, filterPriority } = useTaskStore();

  const filtered = useMemo(() => tasks.filter(t => {
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  }), [tasks, searchQuery, filterPriority]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold mb-6">List View</h1>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Assignee</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Due</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task, i) => (
              <motion.tr key={task.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
                <td className="px-4 py-3">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">{task.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.description}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={\`text-xs font-semibold capitalize \${statusColors[task.status]}\`}>{task.status.replace('-', ' ')}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="flex items-center gap-1.5 text-xs capitalize">
                    <span className={\`w-2 h-2 rounded-full \${priorityColors[task.priority]}\`} />
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{task.assignee || '—'}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{task.dueDate ? format(new Date(task.dueDate), 'MMM d') : '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 text-red-400 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/CalendarView.tsx", content: `import { useTaskStore } from '../store/taskStore';
import { useMemo, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const priorityDot: Record<string, string> = { low: 'bg-blue-500', medium: 'bg-amber-500', high: 'bg-orange-500', urgent: 'bg-red-500' };

export default function CalendarView() {
  const { tasks } = useTaskStore();
  const [current, setCurrent] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(current);
    const end = endOfMonth(current);
    return eachDayOfInterval({ start, end });
  }, [current]);

  const startDay = days[0].getDay();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Calendar</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrent(subMonths(current, 1))} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-semibold min-w-[120px] text-center">{format(current, 'MMMM yyyy')}</span>
          <button onClick={() => setCurrent(addMonths(current, 1))} className="p-2 rounded-lg hover:bg-muted transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 border border-border rounded-xl overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="p-2 text-center text-xs font-semibold text-muted-foreground bg-muted/30 border-b border-border">{d}</div>
        ))}
        {Array.from({ length: startDay }).map((_, i) => <div key={\`e\${i}\`} className="p-2 border-b border-r border-border min-h-[80px]" />)}
        {days.map(day => {
          const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));
          return (
            <div key={day.toISOString()} className={\`p-2 border-b border-r border-border min-h-[80px] hover:bg-muted/20 transition-colors \${isToday(day) ? 'bg-primary/5' : ''}\`}>
              <span className={\`text-xs font-medium \${isToday(day) ? 'w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center' : 'text-muted-foreground'}\`}>
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map(t => (
                  <div key={t.id} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/50 text-[10px] truncate">
                    <span className={\`w-1.5 h-1.5 rounded-full flex-shrink-0 \${priorityDot[t.priority]}\`} />
                    <span className="truncate">{t.title}</span>
                  </div>
                ))}
                {dayTasks.length > 2 && <span className="text-[10px] text-muted-foreground">+{dayTasks.length - 2} more</span>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}` },
    { path: "README.md", content: `# TaskFlow — Task Management App

A professional task manager with Kanban board, list view, and calendar — featuring animated cursor, drag-and-drop, and responsive design.

## ✨ Features

- 📋 Kanban board with drag-and-drop
- 📊 List view with sortable table
- 📅 Calendar view with due dates
- 🎯 Custom animated cursor
- ➕ Modal task creation with full form
- 🔍 Search and priority filtering
- 💾 Persistent storage via Zustand + localStorage
- ⚡ Framer Motion animations
- 📱 Fully responsive
- 🎨 Priority color coding

Built by Sakshyam Kharel | CodeVault` },
  ];
}
