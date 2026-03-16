import JSZip from "jszip";
import { Product } from "@/data/products";

interface FileEntry {
  path: string;
  content: string;
}

function getSaaSDashboardFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({
      name: "saas-admin-dashboard",
      version: "1.0.0",
      private: true,
      type: "module",
      scripts: { dev: "vite", build: "tsc && vite build", preview: "vite preview" },
      dependencies: {
        react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0",
        typescript: "^5.5.0", tailwindcss: "^3.4.0", recharts: "^2.12.0",
        "@tanstack/react-query": "^5.50.0", "lucide-react": "^0.400.0",
        "class-variance-authority": "^0.7.0", "clsx": "^2.1.0"
      },
      devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" }
    }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
    { path: "vite.config.ts", content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
});` },
    { path: "tailwind.config.js", content: `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
      }
    }
  },
  plugins: []
};` },
    { path: "index.html", content: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>SaaS Dashboard</title></head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --card: 222 47% 9%;
  --primary: 160 60% 50%;
  --primary-foreground: 222 47% 6%;
  --muted: 222 30% 14%;
  --muted-foreground: 215 20% 55%;
  --border: 222 30% 16%;
}

body { @apply bg-background text-foreground antialiased; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}` },
    { path: "src/components/Sidebar.tsx", content: `import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">SaaS Admin</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) => \`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors \${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}\`}
          >
            <Icon className="w-5 h-5" />{label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
}` },
    { path: "src/components/StatsCards.tsx", content: `import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const stats = [
  { title: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: 'text-emerald-500' },
  { title: 'Active Users', value: '2,350', change: '+15.3%', icon: Users, color: 'text-blue-500' },
  { title: 'Conversion Rate', value: '3.2%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-500' },
  { title: 'Active Sessions', value: '573', change: '+12.5%', icon: Activity, color: 'text-orange-500' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className={\`p-2 rounded-lg bg-muted\`}><stat.icon className={\`w-5 h-5 \${stat.color}\`} /></div>
            <span className="text-sm text-emerald-500 font-medium">{stat.change}</span>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}` },
    { path: "src/components/RevenueChart.tsx", content: `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000 }, { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 }, { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 }, { month: 'Jun', revenue: 5500 },
  { month: 'Jul', revenue: 7000 }, { month: 'Aug', revenue: 8000 },
];

export function RevenueChart() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 55%)" />
          <YAxis stroke="hsl(215 20% 55%)" />
          <Tooltip contentStyle={{ background: 'hsl(222 47% 9%)', border: '1px solid hsl(222 30% 16%)', borderRadius: '12px' }} />
          <Area type="monotone" dataKey="revenue" stroke="hsl(160 60% 50%)" fill="hsl(160 60% 50% / 0.1)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}` },
    { path: "src/components/UserGrowthChart.tsx", content: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', users: 400 }, { month: 'Feb', users: 600 },
  { month: 'Mar', users: 550 }, { month: 'Apr', users: 780 },
  { month: 'May', users: 890 }, { month: 'Jun', users: 1100 },
];

export function UserGrowthChart() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-semibold mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 55%)" />
          <YAxis stroke="hsl(215 20% 55%)" />
          <Tooltip contentStyle={{ background: 'hsl(222 47% 9%)', border: '1px solid hsl(222 30% 16%)', borderRadius: '12px' }} />
          <Bar dataKey="users" fill="hsl(270 50% 60%)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}` },
    { path: "src/components/RecentActivity.tsx", content: `const activities = [
  { user: 'John Doe', action: 'Created new project', time: '2 min ago', avatar: 'JD' },
  { user: 'Sarah Smith', action: 'Updated billing info', time: '15 min ago', avatar: 'SS' },
  { user: 'Mike Johnson', action: 'Invited team member', time: '1 hour ago', avatar: 'MJ' },
  { user: 'Emily Davis', action: 'Deployed to production', time: '3 hours ago', avatar: 'ED' },
  { user: 'Alex Wilson', action: 'Upgraded plan to Pro', time: '5 hours ago', avatar: 'AW' },
];

export function RecentActivity() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{activity.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.user}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
            </div>
            <span className="text-xs text-muted-foreground">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}` },
    { path: "src/components/DataTable.tsx", content: `import { useState } from 'react';

interface Column<T> { key: keyof T; label: string; sortable?: boolean; }

export function DataTable<T extends Record<string, any>>({ data, columns }: { data: T[]; columns: Column<T>[] }) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey], bVal = b[sortKey];
    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => { setSortDir(sortKey === col.key && sortDir === 'asc' ? 'desc' : 'asc'); setSortKey(col.key); }}>
                {col.label} {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-4 text-sm">{String(row[col.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}` },
    { path: "src/pages/Dashboard.tsx", content: `import { StatsCards } from '../components/StatsCards';
import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';
import { RecentActivity } from '../components/RecentActivity';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <RecentActivity />
    </div>
  );
}` },
    { path: "src/pages/Users.tsx", content: `import { DataTable } from '../components/DataTable';
import { Search } from 'lucide-react';
import { useState } from 'react';

const users = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
  { name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'Active', joined: '2024-01-28' },
  { name: 'Alex Wilson', email: 'alex@example.com', role: 'Editor', status: 'Active', joined: '2024-04-05' },
];

const columns = [
  { key: 'name' as const, label: 'Name', sortable: true },
  { key: 'email' as const, label: 'Email', sortable: true },
  { key: 'role' as const, label: 'Role', sortable: true },
  { key: 'status' as const, label: 'Status', sortable: true },
  { key: 'joined' as const, label: 'Joined', sortable: true },
];

export default function Users() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Add User</button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary" />
      </div>
      <DataTable data={filtered} columns={columns} />
    </div>
  );
}` },
    { path: "src/pages/Analytics.tsx", content: `import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
        <div className="space-y-4">
          {[{ source: 'Direct', value: 42 }, { source: 'Google', value: 28 }, { source: 'Social Media', value: 18 }, { source: 'Referral', value: 12 }].map(item => (
            <div key={item.source} className="flex items-center gap-4">
              <span className="text-sm w-28">{item.source}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: \`\${item.value}%\` }} />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Settings.tsx", content: `import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
        <h2 className="text-lg font-semibold">General</h2>
        <div className="flex items-center justify-between py-3 border-b border-border/50">
          <div><p className="font-medium">Dark Mode</p><p className="text-sm text-muted-foreground">Toggle dark theme</p></div>
          <button onClick={() => setDarkMode(!darkMode)} className={\`w-12 h-6 rounded-full transition-colors \${darkMode ? 'bg-primary' : 'bg-muted'}\`}>
            <div className={\`w-5 h-5 rounded-full bg-white transition-transform \${darkMode ? 'translate-x-6' : 'translate-x-0.5'}\`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-3">
          <div><p className="font-medium">Notifications</p><p className="text-sm text-muted-foreground">Email notifications</p></div>
          <button onClick={() => setNotifications(!notifications)} className={\`w-12 h-6 rounded-full transition-colors \${notifications ? 'bg-primary' : 'bg-muted'}\`}>
            <div className={\`w-5 h-5 rounded-full bg-white transition-transform \${notifications ? 'translate-x-6' : 'translate-x-0.5'}\`} />
          </button>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div><label className="text-sm text-muted-foreground">Display Name</label><input defaultValue="Admin User" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-sm" /></div>
        <div><label className="text-sm text-muted-foreground">Email</label><input defaultValue="admin@example.com" className="w-full mt-1 px-4 py-2.5 rounded-xl bg-muted border border-border text-sm" /></div>
        <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Save Changes</button>
      </div>
    </div>
  );
}` },
    { path: "README.md", content: `# SaaS Admin Dashboard

A modern admin dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
- 📊 Interactive charts (Revenue, User Growth)
- 👥 User management with sortable data table
- 📈 Analytics with traffic sources
- ⚙️ Settings with dark mode toggle
- 🎨 Fully responsive design

## Tech Stack
React 18 • TypeScript • Tailwind CSS • Recharts • React Router • TanStack Query

Built by Sakshyam Kharel | CodeVault` },
  ];
}

function getEcommerceFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({
      name: "ecommerce-storefront", version: "1.0.0", private: true, type: "module",
      scripts: { dev: "vite", build: "tsc && vite build" },
      dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0", zustand: "^4.5.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" },
      devDependencies: { "@types/react": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" }
    }, null, 2) },
    { path: "index.html", content: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>E-Commerce Store</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --background: 0 0% 100%; --foreground: 222 47% 11%; --card: 0 0% 100%; --primary: 160 60% 45%; --primary-foreground: 0 0% 100%; --muted: 210 40% 96%; --muted-foreground: 215 20% 45%; --border: 214 32% 91%; }\nbody { @apply bg-background text-foreground antialiased; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}` },
    { path: "src/store/cartStore.ts", content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem { id: string; name: string; price: number; quantity: number; image: string; }

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    items: [],
    addItem: (item) => set((s) => {
      const existing = s.items.find(i => i.id === item.id);
      if (existing) return { items: s.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
      return { items: [...s.items, { ...item, quantity: 1 }] };
    }),
    removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
    updateQuantity: (id, qty) => set((s) => ({ items: s.items.map(i => i.id === id ? { ...i, quantity: qty } : i) })),
    clearCart: () => set({ items: [] }),
    total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  }), { name: 'cart-storage' })
);` },
    { path: "src/components/Navbar.tsx", content: `import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

export function Navbar() {
  const items = useCartStore(s => s.items);
  const [open, setOpen] = useState(false);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold">ShopName</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-sm hover:text-primary transition-colors">Shop</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{count}</span>}
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}><Menu className="w-5 h-5" /></button>
      </div>
      {open && <div className="md:hidden px-4 pb-4 space-y-2"><Link to="/shop" className="block py-2">Shop</Link><Link to="/cart" className="block py-2">Cart ({count})</Link></div>}
    </nav>
  );
}` },
    { path: "src/components/ProductCard.tsx", content: `import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

interface Product { id: string; name: string; price: number; image: string; category: string; }

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem);

  return (
    <motion.div whileHover={{ y: -8 }} className="rounded-2xl overflow-hidden bg-card border border-border group">
      <Link to={\`/product/\${product.id}\`} className="block relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-primary font-bold text-lg mt-1">\${product.price}</p>
        <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })} className="mt-3 w-full py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}` },
    { path: "src/data/products.ts", content: `export const products = [
  { id: '1', name: 'Classic White Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'clothing' },
  { id: '2', name: 'Leather Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', category: 'accessories' },
  { id: '3', name: 'Running Shoes', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 'shoes' },
  { id: '4', name: 'Denim Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', category: 'clothing' },
  { id: '5', name: 'Sunglasses', price: 49.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', category: 'accessories' },
  { id: '6', name: 'Canvas Sneakers', price: 59.99, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', category: 'shoes' },
];` },
    { path: "src/pages/Home.tsx", content: `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Discover Your Style</h1>
          <p className="text-lg text-muted-foreground mb-8">Curated collections for the modern lifestyle.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}` },
    { path: "src/pages/Shop.tsx", content: `import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  const [category, setCategory] = useState('all');
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="flex gap-2 mb-8">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={\`px-4 py-2 rounded-full text-sm capitalize \${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted'}\`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  );
}` },
    { path: "src/pages/ProductDetail.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  if (!product) return <div className="p-12 text-center">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground"><ArrowLeft className="w-4 h-4" /> Back to Shop</Link>
      <div className="grid md:grid-cols-2 gap-12">
        <img src={product.image} alt={product.name} className="w-full rounded-2xl aspect-square object-cover" />
        <div>
          <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-4">\${product.price}</p>
          <p className="text-muted-foreground mt-4">Premium quality product crafted with attention to detail.</p>
          <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })} className="mt-8 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Cart.tsx", content: `import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
      <Link to="/shop" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground">Browse Shop</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary font-bold">\${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 rounded bg-muted"><Minus className="w-4 h-4" /></button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-muted"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 rounded-xl bg-card border border-border">
        <div className="flex justify-between text-lg font-bold"><span>Total</span><span>\${total().toFixed(2)}</span></div>
        <Link to="/checkout" className="mt-4 block w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-medium">Checkout</Link>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Checkout.tsx", content: `import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-primary" /></div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground">Thank you for your purchase.</p>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm"><span>{item.name} x{item.quantity}</span><span>\${(item.price * item.quantity).toFixed(2)}</span></div>
        ))}
        <div className="flex justify-between font-bold text-lg pt-4 border-t border-border"><span>Total</span><span>\${total().toFixed(2)}</span></div>
      </div>
      <button onClick={() => { clearCart(); setDone(true); }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium">Place Order</button>
    </div>
  );
}` },
    { path: "README.md", content: `# E-Commerce Storefront\n\nA modern e-commerce storefront with cart, filtering, and checkout.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n- 🛒 Cart with Zustand (persisted)\n- 🔍 Category filtering\n- 📱 Fully responsive\n- ✨ Framer Motion animations\n\nBuilt by Sakshyam Kharel | CodeVault` },
  ];
}

function getPortfolioFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "developer-portfolio", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" } }, null, 2) },
    { path: "index.html", content: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Developer Portfolio</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --background: 240 10% 4%; --foreground: 0 0% 95%; --primary: 160 60% 50%; --primary-foreground: 240 10% 4%; --muted: 240 6% 12%; --muted-foreground: 240 5% 50%; --border: 240 6% 16%; --card: 240 8% 7%; }\nbody { @apply bg-background text-foreground antialiased; }\nhtml { scroll-behavior: smooth; }` },
    { path: "src/App.tsx", content: `import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}` },
    { path: "src/components/Navbar.tsx", content: `import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['About', 'Projects', 'Skills', 'Contact'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all \${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : ''}\`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold text-primary">Dev.</a>
        <div className="hidden md:flex gap-8">
          {links.map(l => <a key={l} href={\`#\${l.toLowerCase()}\`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>)}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="md:hidden px-4 pb-4 space-y-2 bg-background/95 backdrop-blur-lg">{links.map(l => <a key={l} href={\`#\${l.toLowerCase()}\`} className="block py-2 text-muted-foreground" onClick={() => setOpen(false)}>{l}</a>)}</div>}
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `export function Footer() {
  return (
    <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
    </footer>
  );
}` },
    { path: "src/sections/Hero.tsx", content: `import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center z-10 px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-primary font-mono mb-4">Hi, my name is</motion.p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Your Name Here.</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground mb-8">I build things for the web.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-12">A software developer specializing in building exceptional digital experiences with modern technologies.</p>
        <div className="flex gap-4 justify-center">
          <a href="#projects" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium">View My Work</a>
          <a href="#contact" className="px-8 py-4 rounded-full border border-border hover:border-primary/50 transition-colors">Get in Touch</a>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10"><ArrowDown className="w-5 h-5 text-muted-foreground" /></motion.div>
    </section>
  );
}` },
    { path: "src/sections/About.tsx", content: `import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 text-muted-foreground">
            <p>I'm a passionate developer who loves creating beautiful, performant web applications.</p>
            <p>With expertise in React, TypeScript, and modern CSS, I build user experiences that are both functional and delightful.</p>
            <p>When I'm not coding, I enjoy exploring new technologies and contributing to open source.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4">Quick Facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📍 Based in Nepal</li>
              <li>💼 3+ years of experience</li>
              <li>🎓 Computer Science graduate</li>
              <li>🌐 Remote-friendly</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}` },
    { path: "src/sections/Projects.tsx", content: `import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  { title: 'E-Commerce Platform', desc: 'Full-stack store with cart, payments, and admin panel.', tech: ['React', 'Node.js', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600' },
  { title: 'Task Manager', desc: 'Kanban board with drag-and-drop and real-time sync.', tech: ['React', 'TypeScript', 'DnD Kit'], image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600' },
  { title: 'Analytics Dashboard', desc: 'Real-time data visualization with interactive charts.', tech: ['React', 'D3.js', 'WebSocket'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600' },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
        <div className="space-y-20">
          {projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={\`flex flex-col \${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center\`}>
              <div className="flex-1 rounded-2xl overflow-hidden"><img src={p.image} alt={p.title} className="w-full aspect-video object-cover" /></div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="text-muted-foreground">{p.desc}</p>
                <div className="flex gap-2">{p.tech.map(t => <span key={t} className="px-3 py-1 rounded-full bg-muted text-xs">{t}</span>)}</div>
                <div className="flex gap-4 pt-2">
                  <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><Github className="w-4 h-4" /> Code</a>
                  <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ExternalLink className="w-4 h-4" /> Live</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Skills.tsx", content: `import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Docker', 'Vercel'] },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Skills & Technologies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map(group => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border">
              <h3 className="font-semibold text-primary mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(s => <span key={s} className="px-3 py-1.5 rounded-lg bg-muted text-sm">{s}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Contact.tsx", content: `import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-12">I'm always open to new opportunities and interesting projects.</p>
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="w-4 h-4" /> hello@example.com</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> Nepal</div>
          </div>
          {sent ? (
            <p className="text-primary font-medium">Thanks! I'll get back to you soon.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 text-left">
              <input placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:border-primary" />
              <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:border-primary" />
              <textarea placeholder="Your message..." rows={4} required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:border-primary resize-none" />
              <button type="submit" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 mx-auto"><Send className="w-4 h-4" /> Send Message</button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}` },
    { path: "README.md", content: `# Developer Portfolio\n\nA modern, animated developer portfolio built with React, Framer Motion, and Tailwind CSS.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n- ✨ Smooth scroll animations\n- 📱 Fully responsive\n- 🎨 Dark theme\n- 📝 Contact form\n- 🚀 Fast & lightweight\n\nBuilt by Sakshyam Kharel | CodeVault` },
  ];
}

function getBlogPlatformFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "blog-platform", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0", tailwindcss: "^3.4.0", "date-fns": "^3.6.0", "lucide-react": "^0.400.0", "react-markdown": "^9.0.0" }, devDependencies: { "@types/react": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" } }, null, 2) },
    { path: "index.html", content: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Blog Platform</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --background: 0 0% 100%; --foreground: 222 47% 11%; --primary: 160 60% 45%; --primary-foreground: 0 0% 100%; --muted: 210 40% 96%; --muted-foreground: 215 20% 45%; --border: 214 32% 91%; --card: 0 0% 100%; }\nbody { @apply bg-background text-foreground antialiased; font-family: 'Georgia', serif; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}` },
    { path: "src/data/posts.ts", content: `export interface Post {
  slug: string; title: string; excerpt: string; content: string;
  author: string; date: string; category: string; tags: string[];
  readTime: number; image: string;
}

export const posts: Post[] = [
  {
    slug: 'getting-started-react', title: 'Getting Started with React in 2024',
    excerpt: 'A comprehensive guide to starting your React journey.',
    content: '# Getting Started with React\\n\\nReact is the most popular frontend library...\\n\\n## Setting Up\\n\\nFirst, create a new project:\\n\\n\\\`\\\`\\\`bash\\nnpm create vite@latest my-app -- --template react-ts\\n\\\`\\\`\\\`\\n\\n## Components\\n\\nReact is all about components. Each component is a reusable piece of UI...\\n\\n## State Management\\n\\nUse useState for local state and useContext for global state...',
    author: 'Sakshyam', date: '2024-03-15', category: 'Tutorial', tags: ['React', 'JavaScript'], readTime: 5, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600'
  },
  {
    slug: 'tailwind-css-tips', title: '10 Tailwind CSS Tips You Need to Know',
    excerpt: 'Level up your Tailwind CSS skills with these pro tips.',
    content: '# Tailwind CSS Tips\\n\\n## 1. Use @apply wisely\\n\\nDon\\'t overuse @apply - it defeats the purpose...\\n\\n## 2. Custom utilities\\n\\nExtend your config for project-specific utilities...\\n\\n## 3. Dark mode\\n\\nUse the dark: variant for easy theming...',
    author: 'Sakshyam', date: '2024-03-10', category: 'Tips', tags: ['CSS', 'Tailwind'], readTime: 4, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600'
  },
  {
    slug: 'typescript-best-practices', title: 'TypeScript Best Practices for 2024',
    excerpt: 'Write better TypeScript with these proven patterns.',
    content: '# TypeScript Best Practices\\n\\n## Strict Mode\\n\\nAlways enable strict mode...\\n\\n## Discriminated Unions\\n\\nUse discriminated unions for type-safe state management...\\n\\n## Generics\\n\\nMaster generics for reusable, type-safe code...',
    author: 'Sakshyam', date: '2024-03-05', category: 'Tutorial', tags: ['TypeScript'], readTime: 6, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600'
  },
];` },
    { path: "src/components/Navbar.tsx", content: `import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-border">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold">Blog</Link>
        <div className="flex items-center gap-6">
          <Link to="/category/Tutorial" className="text-sm text-muted-foreground hover:text-foreground">Tutorials</Link>
          <Link to="/category/Tips" className="text-sm text-muted-foreground hover:text-foreground">Tips</Link>
          <Search className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}` },
    { path: "src/components/PostCard.tsx", content: `import { Link } from 'react-router-dom';
import { Post } from '../data/posts';
import { Clock, ArrowRight } from 'lucide-react';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link to={\`/post/\${post.slug}\`} className="flex flex-col md:flex-row gap-6">
        <img src={post.image} alt={post.title} className="w-full md:w-48 h-48 md:h-32 rounded-xl object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</span>
            <span>{post.date}</span>
          </div>
          <h2 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{post.title}</h2>
          <p className="text-muted-foreground text-sm mb-2">{post.excerpt}</p>
          <span className="text-sm text-primary flex items-center gap-1">Read more <ArrowRight className="w-3 h-3" /></span>
        </div>
      </Link>
    </article>
  );
}` },
    { path: "src/pages/Home.tsx", content: `import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');
  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-muted-foreground mb-8">Thoughts on code, design, and building for the web.</p>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none focus:border-primary text-sm" />
      </div>
      <div className="space-y-8">{filtered.map(p => <PostCard key={p.slug} post={p} />)}</div>
    </div>
  );
}` },
    { path: "src/pages/PostPage.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowLeft, Clock, User } from 'lucide-react';

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  if (!post) return <div className="p-12 text-center">Post not found</div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <img src={post.image} alt={post.title} className="w-full rounded-2xl aspect-video object-cover mb-8" />
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
        <span>{post.date}</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
      </div>
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div className="flex gap-2 mb-8">{post.tags.map(t => <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">{t}</span>)}</div>
      <div className="prose prose-lg max-w-none text-foreground/80 whitespace-pre-line">{post.content.replace(/\\\\n/g, '\\n')}</div>
    </article>
  );
}` },
    { path: "src/pages/CategoryPage.tsx", content: `import { useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';

export default function CategoryPage() {
  const { category } = useParams();
  const filtered = posts.filter(p => p.category === category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{category}</h1>
      <div className="space-y-8">{filtered.map(p => <PostCard key={p.slug} post={p} />)}</div>
    </div>
  );
}` },
    { path: "README.md", content: `# Blog Platform\n\nA clean, content-focused blog platform with search, categories, and reading time.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n- 🔍 Full-text search\n- 📂 Category filtering\n- ⏱ Reading time estimation\n- 📱 Responsive design\n\nBuilt by Sakshyam Kharel | CodeVault` },
  ];
}

function getLandingSaaSFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "saas-landing-page", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" } }, null, 2) },
    { path: "index.html", content: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>SaaS Landing</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --background: 222 47% 6%; --foreground: 210 40% 98%; --primary: 160 60% 50%; --primary-foreground: 222 47% 6%; --muted: 222 30% 14%; --muted-foreground: 215 20% 55%; --border: 222 30% 16%; }\nbody { @apply bg-background text-foreground antialiased; }` },
    { path: "src/App.tsx", content: `import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Pricing } from './sections/Pricing';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { CTA } from './sections/CTA';
import { Footer } from './components/Footer';

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
}` },
    { path: "src/components/Navbar.tsx", content: `import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <span className="text-xl font-bold text-primary">SaaSify</span>
        <div className="hidden md:flex items-center gap-8">
          {['Features','Pricing','FAQ'].map(l => <a key={l} href={\`#\${l.toLowerCase()}\`} className="text-sm text-muted-foreground hover:text-foreground">{l}</a>)}
          <a href="#cta" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">Get Started</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xl font-bold text-primary">SaaSify</span>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SaaSify. All rights reserved.</p>
      </div>
    </footer>
  );
}` },
    { path: "src/sections/Hero.tsx", content: `import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4 z-10 max-w-3xl">
        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">🚀 Now in Beta</motion.span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Build faster.<br/>Ship smarter.</h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">The all-in-one platform that helps teams collaborate, build, and deploy applications 10x faster.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#cta" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2">Start Free Trial <ArrowRight className="w-5 h-5" /></a>
          <button className="px-8 py-4 rounded-full border border-border hover:border-primary/50 flex items-center gap-2 transition-colors"><Play className="w-5 h-5" /> Watch Demo</button>
        </div>
      </motion.div>
    </section>
  );
}` },
    { path: "src/sections/Features.tsx", content: `import { motion } from 'framer-motion';
import { Zap, Shield, Globe, BarChart3, Code, Users } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed with edge computing.' },
  { icon: Shield, title: 'Secure by Default', desc: 'Enterprise-grade security built in.' },
  { icon: Globe, title: 'Global CDN', desc: 'Content delivered from 200+ edge locations.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Real-time insights into your application.' },
  { icon: Code, title: 'Developer First', desc: 'APIs and SDKs for every language.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built-in tools for team productivity.' },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
        <p className="text-center text-muted-foreground mb-16">Powerful features to help you build and scale.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors">
              <f.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Pricing.tsx", content: `import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  { name: 'Starter', price: 9, features: ['5 Projects', '10GB Storage', 'Basic Analytics', 'Email Support'] },
  { name: 'Pro', price: 29, features: ['Unlimited Projects', '100GB Storage', 'Advanced Analytics', 'Priority Support', 'Custom Domain', 'Team Access'], popular: true },
  { name: 'Enterprise', price: 99, features: ['Everything in Pro', 'Unlimited Storage', 'Custom Integrations', 'Dedicated Manager', 'SLA', 'On-premise'] },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-center text-muted-foreground mb-16">Choose the plan that's right for you.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <motion.div key={plan.name} whileHover={{ y: -8 }} className={\`p-8 rounded-2xl border \${plan.popular ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border'}\`}>
              {plan.popular && <span className="text-xs font-bold text-primary uppercase">Most Popular</span>}
              <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
              <p className="text-4xl font-bold my-4">\${plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
              <ul className="space-y-3 mb-8">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-primary" />{f}</li>)}</ul>
              <button className={\`w-full py-3 rounded-xl font-medium \${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}>Get Started</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Testimonials.tsx", content: `import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Alex Chen', role: 'CTO at TechCo', text: 'This platform cut our development time in half. Absolutely game-changing.', avatar: 'AC' },
  { name: 'Sarah Miller', role: 'Founder at StartupX', text: 'The best developer experience I\\'ve ever had. Simple, fast, reliable.', avatar: 'SM' },
  { name: 'James Park', role: 'Lead Dev at AgencyY', text: 'Our entire team switched over. The collaboration features are unmatched.', avatar: 'JP' },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Loved by developers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border">
              <p className="text-sm text-muted-foreground mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{t.avatar}</div>
                <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/FAQ.tsx", content: `import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does the free trial work?', a: 'You get 14 days of full access to all Pro features. No credit card required.' },
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time with no questions asked.' },
  { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee on all paid plans.' },
  { q: 'What support options are available?', a: 'We offer email support for all plans, with priority and dedicated support for Pro and Enterprise.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-medium">
                {faq.q} <ChevronDown className={\`w-4 h-4 transition-transform \${open === i ? 'rotate-180' : ''}\`} />
              </button>
              {open === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/CTA.tsx", content: `import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section id="cta" className="py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of developers building with SaaSify.</p>
        <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium">Start Free Trial <ArrowRight className="w-5 h-5" /></a>
      </motion.div>
    </section>
  );
}` },
    { path: "README.md", content: `# SaaS Landing Page\n\nA conversion-optimized SaaS landing page with hero, features, pricing, testimonials, FAQ, and CTA.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Sections\n- 🚀 Animated hero with CTA\n- ⚡ Feature grid\n- 💰 Pricing table\n- 💬 Testimonials\n- ❓ FAQ accordion\n- 📢 Final CTA\n\nBuilt by Sakshyam Kharel | CodeVault` },
  ];
}

function getTaskManagementFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "task-management-app", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0", "@dnd-kit/core": "^6.1.0", "@dnd-kit/sortable": "^8.0.0", "date-fns": "^3.6.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0", zustand: "^4.5.0" }, devDependencies: { "@types/react": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0" } }, null, 2) },
    { path: "index.html", content: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>TaskFlow</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root { --background: 222 47% 6%; --foreground: 210 40% 98%; --primary: 160 60% 50%; --primary-foreground: 222 47% 6%; --muted: 222 30% 14%; --muted-foreground: 215 20% 55%; --border: 222 30% 16%; --card: 222 47% 9%; }\nbody { @apply bg-background text-foreground antialiased; }` },
    { path: "src/types.ts", content: `export interface Task {
  id: string; title: string; description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string; dueDate?: string; labels: string[];
  createdAt: string;
}

export interface Column { id: string; title: string; taskIds: string[]; }
export interface Board { id: string; title: string; columns: Column[]; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Board from './pages/Board';
import ListView from './pages/ListView';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/list" element={<ListView />} />
      </Routes>
    </BrowserRouter>
  );
}` },
    { path: "src/store/taskStore.ts", content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: Task['status']) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist((set) => ({
    tasks: [
      { id: '1', title: 'Design landing page', description: 'Create the hero section and feature grid', status: 'todo', priority: 'high', assignee: 'Alex', labels: ['design'], createdAt: '2024-03-01', dueDate: '2024-03-15' },
      { id: '2', title: 'Implement auth system', description: 'Set up JWT authentication with refresh tokens', status: 'in-progress', priority: 'urgent', assignee: 'Sarah', labels: ['backend'], createdAt: '2024-03-02' },
      { id: '3', title: 'Write API docs', description: 'Document all REST endpoints', status: 'review', priority: 'medium', assignee: 'Mike', labels: ['docs'], createdAt: '2024-03-03' },
      { id: '4', title: 'Fix mobile nav', description: 'Hamburger menu not closing on route change', status: 'done', priority: 'low', assignee: 'Alex', labels: ['bug', 'frontend'], createdAt: '2024-02-28' },
      { id: '5', title: 'Add dark mode', description: 'Implement theme toggle with system preference', status: 'todo', priority: 'medium', labels: ['frontend'], createdAt: '2024-03-05' },
    ],
    addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
    updateTask: (id, updates) => set((s) => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates } : t) })),
    deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter(t => t.id !== id) })),
    moveTask: (id, status) => set((s) => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, status } : t) })),
  }), { name: 'task-storage' })
);` },
    { path: "src/components/Navbar.tsx", content: `import { NavLink } from 'react-router-dom';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddTaskModal } from './AddTaskModal';

export function Navbar() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <>
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="text-lg font-bold text-primary">TaskFlow</span>
          <div className="flex items-center gap-4">
            <NavLink to="/" className={({ isActive }) => \`p-2 rounded-lg \${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}\`}><LayoutGrid className="w-5 h-5" /></NavLink>
            <NavLink to="/list" className={({ isActive }) => \`p-2 rounded-lg \${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}\`}><List className="w-5 h-5" /></NavLink>
            <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Add Task</button>
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
import { Task } from '../types';

export function AddTaskModal({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore(s => s.addTask);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ id: Date.now().toString(), title, description: desc, status: 'todo', priority, labels: [], createdAt: new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold">New Task</h2><button type="button" onClick={onClose}><X className="w-5 h-5" /></button></div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border mb-4 text-sm" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border mb-4 text-sm resize-none" />
        <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border mb-6 text-sm">
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
        </select>
        <button type="submit" className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium">Create Task</button>
      </form>
    </div>
  );
}` },
    { path: "src/components/TaskCard.tsx", content: `import { Task } from '../types';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors: Record<string, string> = { low: 'bg-blue-500', medium: 'bg-yellow-500', high: 'bg-orange-500', urgent: 'bg-red-500' };

export function TaskCard({ task, onDragStart }: { task: Task; onDragStart?: () => void }) {
  return (
    <div draggable onDragStart={onDragStart} className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 cursor-grab active:cursor-grabbing transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className={\`w-2 h-2 rounded-full \${priorityColors[task.priority]}\`} />
        <span className="text-xs text-muted-foreground capitalize">{task.priority}</span>
      </div>
      <h4 className="font-medium mb-1">{task.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        {task.dueDate && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(task.dueDate), 'MMM d')}</span>}
        {task.assignee && <span className="flex items-center gap-1"><User className="w-3 h-3" />{task.assignee}</span>}
      </div>
      {task.labels.length > 0 && <div className="flex gap-1 mt-2 flex-wrap">{task.labels.map(l => <span key={l} className="px-2 py-0.5 rounded-full bg-muted text-xs">{l}</span>)}</div>}
    </div>
  );
}` },
    { path: "src/components/KanbanColumn.tsx", content: `import { Task } from '../types';
import { TaskCard } from './TaskCard';

const statusLabels: Record<string, string> = { 'todo': 'To Do', 'in-progress': 'In Progress', 'review': 'Review', 'done': 'Done' };
const statusColors: Record<string, string> = { 'todo': 'bg-blue-500', 'in-progress': 'bg-yellow-500', 'review': 'bg-purple-500', 'done': 'bg-green-500' };

export function KanbanColumn({ status, tasks, onDrop }: { status: string; tasks: Task[]; onDrop: (taskId: string) => void }) {
  return (
    <div className="flex-1 min-w-[280px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { const id = e.dataTransfer.getData('taskId'); if (id) onDrop(id); }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={\`w-2.5 h-2.5 rounded-full \${statusColors[status]}\`} />
        <h3 className="font-semibold text-sm">{statusLabels[status]}</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDragStart={() => {
            const event = window.event as DragEvent;
            event?.dataTransfer?.setData('taskId', task.id);
          }} />
        ))}
      </div>
    </div>
  );
}` },
    { path: "src/pages/Board.tsx", content: `import { useTaskStore } from '../store/taskStore';
import { KanbanColumn } from '../components/KanbanColumn';
import { Task } from '../types';

const statuses: Task['status'][] = ['todo', 'in-progress', 'review', 'done'];

export default function Board() {
  const { tasks, moveTask } = useTaskStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Project Board</h1>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {statuses.map(status => (
          <KanbanColumn key={status} status={status} tasks={tasks.filter(t => t.status === status)} onDrop={(id) => moveTask(id, status)} />
        ))}
      </div>
    </div>
  );
}` },
    { path: "src/pages/ListView.tsx", content: `import { useTaskStore } from '../store/taskStore';
import { Trash2 } from 'lucide-react';

const priorityColors: Record<string, string> = { low: 'text-blue-500', medium: 'text-yellow-500', high: 'text-orange-500', urgent: 'text-red-500' };

export default function ListView() {
  const { tasks, deleteTask, moveTask } = useTaskStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">All Tasks</h1>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-muted/50 border-b border-border">
            <th className="text-left p-3 text-sm font-medium">Task</th>
            <th className="text-left p-3 text-sm font-medium">Priority</th>
            <th className="text-left p-3 text-sm font-medium">Status</th>
            <th className="text-left p-3 text-sm font-medium">Assignee</th>
            <th className="p-3"></th>
          </tr></thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-3"><p className="font-medium text-sm">{task.title}</p><p className="text-xs text-muted-foreground">{task.description}</p></td>
                <td className="p-3"><span className={\`text-sm capitalize font-medium \${priorityColors[task.priority]}\`}>{task.priority}</span></td>
                <td className="p-3">
                  <select value={task.status} onChange={e => moveTask(task.id, e.target.value as any)} className="text-sm bg-muted rounded-lg px-2 py-1 border border-border">
                    <option value="todo">To Do</option><option value="in-progress">In Progress</option><option value="review">Review</option><option value="done">Done</option>
                  </select>
                </td>
                <td className="p-3 text-sm text-muted-foreground">{task.assignee || '—'}</td>
                <td className="p-3"><button onClick={() => deleteTask(task.id)} className="p-1 text-red-500 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}` },
    { path: "README.md", content: `# TaskFlow - Task Management App\n\nA Kanban-style task management app with drag-and-drop, list view, and persistent storage.\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n- 📋 Kanban board with drag-and-drop\n- 📝 List view with inline editing\n- 🎯 Priority levels & labels\n- 💾 Persistent storage (Zustand)\n- ➕ Add/delete tasks\n\nBuilt by Sakshyam Kharel | CodeVault` },
  ];
}

const productFileGenerators: Record<string, () => FileEntry[]> = {
  "saas-dashboard": getSaaSDashboardFiles,
  "ecommerce-storefront": getEcommerceFiles,
  "portfolio-developer": getPortfolioFiles,
  "blog-platform": getBlogPlatformFiles,
  "landing-saas": getLandingSaaSFiles,
  "task-management": getTaskManagementFiles,
};

export async function generateProductZip(product: Product): Promise<Blob> {
  const zip = new JSZip();
  const generator = productFileGenerators[product.id];

  if (generator) {
    const files = generator();
    for (const file of files) {
      zip.file(file.path, file.content);
    }
  } else {
    // Fallback for unknown products
    zip.file("README.md", `# ${product.name}\n\nSource code for ${product.name}.\nTech Stack: ${product.techStack.join(", ")}\n\nBuilt by Sakshyam Kharel | CodeVault`);
    zip.file("package.json", JSON.stringify({ name: product.id, version: "1.0.0", dependencies: {} }, null, 2));
    zip.file("src/main.tsx", `// ${product.name} entry point\nconsole.log("Hello from ${product.name}!");`);
  }

  return zip.generateAsync({ type: "blob" });
}

export async function downloadProductCode(product: Product) {
  const blob = await generateProductZip(product);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${product.id}-source-code.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
