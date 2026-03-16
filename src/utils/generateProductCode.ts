import { Product } from "@/data/products";

// Generates a demo source code ZIP-like text file for each product
const productCodeTemplates: Record<string, string> = {
  "saas-dashboard": `
// ============================================
// SaaS Admin Dashboard - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "saas-admin-dashboard",
  "version": "1.0.0",
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "recharts": "^2.12.0",
    "@tanstack/react-query": "^5.50.0",
    "lucide-react": "^0.400.0"
  }
}

// --- src/App.tsx ---
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// --- src/pages/Dashboard.tsx ---
import { StatsCards } from "../components/StatsCards";
import { RevenueChart } from "../components/RevenueChart";
import { RecentActivity } from "../components/RecentActivity";
import { UserGrowthChart } from "../components/UserGrowthChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <RecentActivity />
    </div>
  );
}

// --- src/components/StatsCards.tsx ---
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$45,231", change: "+20.1%", icon: DollarSign },
  { title: "Active Users", value: "2,350", change: "+15.3%", icon: Users },
  { title: "Conversion Rate", value: "3.2%", change: "+2.1%", icon: TrendingUp },
  { title: "Active Sessions", value: "573", change: "+12.5%", icon: Activity },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <stat.icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-green-500">{stat.change}</span>
          </div>
          <p className="mt-4 text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}

// --- src/components/DataTable.tsx ---
import { useState } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

export function DataTable<T extends Record<string, any>>({ 
  data, columns, onSort 
}: { data: T[]; columns: Column<T>[]; onSort?: (key: keyof T) => void }) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T) => {
    setSortDir(sortKey === key && sortDir === "asc" ? "desc" : "asc");
    setSortKey(key);
    onSort?.(key);
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          {columns.map((col) => (
            <th key={String(col.key)} className="text-left p-3 cursor-pointer" onClick={() => col.sortable && handleSort(col.key)}>
              {col.label} {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-3">{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Full source includes 20+ components, auth system, and dark mode toggle.
// Thank you for purchasing from CodeVault!
`,

  "ecommerce-storefront": `
// ============================================
// E-Commerce Storefront - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "ecommerce-storefront",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.3.0",
    "tailwindcss": "^3.4.0"
  }
}

// --- src/store/cartStore.ts ---
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return { items: state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => i.id === id ? { ...i, quantity } : i),
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);

// --- src/pages/Shop.tsx ---
import { useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { FilterSidebar } from "../components/FilterSidebar";
import { SearchBar } from "../components/SearchBar";

export default function Shop() {
  const [filters, setFilters] = useState({ category: "all", priceRange: [0, 1000], sort: "popular" });
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-8">
      <FilterSidebar filters={filters} onChange={setFilters} />
      <div className="flex-1">
        <SearchBar value={search} onChange={setSearch} />
        <ProductGrid filters={filters} search={search} />
      </div>
    </div>
  );
}

// --- src/components/ProductCard.tsx ---
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  
  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      className="rounded-2xl overflow-hidden bg-card border border-border group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-primary font-bold text-lg">\${product.price}</p>
        <button onClick={() => addItem(product)} className="mt-3 w-full py-2 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// Full source includes checkout flow, wishlist, order history, and responsive navigation.
// Thank you for purchasing from CodeVault!
`,

  "portfolio-developer": `
// ============================================
// Developer Portfolio - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "developer-portfolio",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.0",
    "framer-motion": "^11.3.0",
    "tailwindcss": "^3.4.0",
    "@mdx-js/react": "^3.0.0"
  }
}

// --- src/App.tsx ---
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
    </div>
  );
}

// --- src/sections/Hero.tsx ---
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10 px-4"
      >
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-primary font-mono mb-4">
          Hi, my name is
        </motion.p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Your Name Here.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground mb-8">
          I build things for the web.
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-12">
          I'm a software developer specializing in building exceptional digital experiences.
        </p>
        <a href="#projects" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
          View My Work
        </a>
      </motion.div>
    </section>
  );
}

// --- src/sections/Projects.tsx ---
import { motion } from "framer-motion";

const projects = [
  { title: "Project One", description: "A full-stack web application", tech: ["React", "Node.js", "PostgreSQL"], image: "/project1.jpg", github: "#", live: "#" },
  { title: "Project Two", description: "Mobile-first e-commerce platform", tech: ["Next.js", "Stripe", "Tailwind"], image: "/project2.jpg", github: "#", live: "#" },
  { title: "Project Three", description: "Real-time data dashboard", tech: ["React", "D3.js", "WebSocket"], image: "/project3.jpg", github: "#", live: "#" },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
      <div className="max-w-5xl mx-auto space-y-24">
        {projects.map((project, i) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={\`flex flex-col \${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center\`}
          >
            <div className="flex-1 rounded-2xl overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex gap-2">{project.tech.map(t => <span key={t} className="px-3 py-1 rounded-full bg-muted text-sm">{t}</span>)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Full source includes animated skills section, blog with MDX, contact form, and dark mode.
// Thank you for purchasing from CodeVault!
`,

  "blog-platform": `
// ============================================
// Blog Platform - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "blog-platform",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "@mdx-js/react": "^3.0.0",
    "fuse.js": "^7.0.0",
    "tailwindcss": "^3.4.0",
    "date-fns": "^3.6.0"
  }
}

// --- src/utils/readingTime.ts ---
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// --- src/pages/BlogList.tsx ---
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { PostCard } from "../components/PostCard";
import { CategoryFilter } from "../components/CategoryFilter";

export default function BlogList({ posts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fuse = useMemo(() => new Fuse(posts, { keys: ["title", "excerpt", "tags"], threshold: 0.3 }), [posts]);

  const filtered = useMemo(() => {
    let result = search ? fuse.search(search).map(r => r.item) : posts;
    if (category !== "all") result = result.filter(p => p.category === category);
    return result;
  }, [search, category, posts, fuse]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-3 rounded-xl bg-muted border border-border mb-6" />
      <CategoryFilter selected={category} onChange={setCategory} />
      <div className="space-y-6 mt-8">
        {filtered.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}

// Full source includes MDX rendering, RSS feed generation, newsletter signup, and related posts.
// Thank you for purchasing from CodeVault!
`,

  "landing-saas": `
// ============================================
// SaaS Landing Page - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "saas-landing-page",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.0",
    "framer-motion": "^11.3.0",
    "tailwindcss": "^3.4.0"
  }
}

// --- src/App.tsx ---
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Pricing } from "./sections/Pricing";
import { Testimonials } from "./sections/Testimonials";
import { FAQ } from "./sections/FAQ";
import { CTA } from "./sections/CTA";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

// --- src/sections/Pricing.tsx ---
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  { name: "Starter", price: 9, features: ["5 Projects", "10GB Storage", "Basic Analytics", "Email Support"] },
  { name: "Pro", price: 29, features: ["Unlimited Projects", "100GB Storage", "Advanced Analytics", "Priority Support", "Custom Domain", "Team Access"], popular: true },
  { name: "Enterprise", price: 99, features: ["Everything in Pro", "Unlimited Storage", "Custom Integrations", "Dedicated Account Manager", "SLA", "On-premise Option"] },
];

export function Pricing() {
  return (
    <section className="py-24 px-4">
      <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
      <p className="text-center text-muted-foreground mb-16">Choose the plan that's right for you</p>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -8 }}
            className={\`p-8 rounded-2xl border \${plan.popular ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border"}\`}
          >
            {plan.popular && <span className="text-xs font-bold text-primary uppercase">Most Popular</span>}
            <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
            <p className="text-4xl font-bold my-4">\${plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
            <ul className="space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <button className={\`w-full py-3 rounded-xl font-medium \${plan.popular ? "bg-primary text-primary-foreground" : "bg-muted"}\`}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Full source includes animated hero, feature grid, testimonial carousel, FAQ accordion, and responsive nav.
// Thank you for purchasing from CodeVault!
`,

  "task-management": `
// ============================================
// Task Management App - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================

// --- package.json ---
{
  "name": "task-management-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "date-fns": "^3.6.0",
    "tailwindcss": "^3.4.0"
  }
}

// --- src/types.ts ---
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  dueDate?: string;
  labels: string[];
  createdAt: string;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

// --- src/components/KanbanBoard.tsx ---
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard({ board, tasks, onDragEnd }) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <SortableContext key={column.id} items={column.taskIds} strategy={verticalListSortingStrategy}>
            <KanbanColumn 
              column={column} 
              tasks={column.taskIds.map(id => tasks.find(t => t.id === id)).filter(Boolean)} 
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}

// --- src/components/TaskCard.tsx ---
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format } from "date-fns";
import { Calendar, Tag, User } from "lucide-react";

const priorityColors = { low: "bg-blue-500", medium: "bg-yellow-500", high: "bg-orange-500", urgent: "bg-red-500" };

export function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 cursor-grab active:cursor-grabbing transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={\`w-2 h-2 rounded-full \${priorityColors[task.priority]}\`} />
        <span className="text-xs text-muted-foreground capitalize">{task.priority}</span>
      </div>
      <h4 className="font-medium mb-2">{task.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {task.dueDate && (
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(task.dueDate), "MMM d")}</span>
        )}
        {task.assignee && (
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{task.assignee}</span>
        )}
      </div>
      {task.labels.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {task.labels.map(label => (
            <span key={label} className="px-2 py-0.5 rounded-full bg-muted text-xs">{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// Full source includes board management, activity timeline, team features, and search.
// Thank you for purchasing from CodeVault!
`,
};

export function generateProductCodeBlob(product: Product): Blob {
  const code = productCodeTemplates[product.id] || `
// ============================================
// ${product.name} - Source Code
// By Sakshyam Kharel | CodeVault
// ============================================
// 
// This is a demo download. The full source code would be delivered here.
// Tech Stack: ${product.techStack.join(", ")}
//
// Features:
${product.features.map(f => `//   - ${f}`).join("\n")}
//
// Thank you for purchasing from CodeVault!
`;

  return new Blob([code.trim()], { type: "text/plain" });
}

export function downloadProductCode(product: Product) {
  const blob = generateProductCodeBlob(product);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${product.id}-source-code.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
