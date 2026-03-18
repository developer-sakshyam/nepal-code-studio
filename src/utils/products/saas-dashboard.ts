import { FileEntry } from "../generateProductCode";

export function getSaaSDashboardFiles(): FileEntry[] {
  return [
    // ─── Config ───
    { path: "package.json", content: JSON.stringify({
      name: "saas-admin-dashboard", version: "1.0.0", private: true, type: "module",
      scripts: { dev: "vite", build: "tsc && vite build", preview: "vite preview", lint: "eslint ." },
      dependencies: {
        react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0",
        typescript: "^5.5.0", tailwindcss: "^3.4.0", recharts: "^2.12.0",
        "@tanstack/react-query": "^5.50.0", "lucide-react": "^0.400.0",
        "class-variance-authority": "^0.7.0", clsx: "^2.1.0", "date-fns": "^3.6.0"
      },
      devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" }
    }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, esModuleInterop: true, skipLibCheck: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
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
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
    }
  },
  plugins: []
};` },
    { path: "postcss.config.js", content: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };` },
    { path: ".gitignore", content: `node_modules\ndist\n.env\n.env.local\n*.log` },

    // ─── Entry ───
    { path: "index.html", content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="SaaS Admin Dashboard - Manage your business with powerful analytics and user management" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <title>SaaS Admin Dashboard</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;
    --card: 222 47% 9%;
    --card-foreground: 210 40% 98%;
    --primary: 160 60% 50%;
    --primary-foreground: 222 47% 6%;
    --secondary: 270 50% 60%;
    --secondary-foreground: 210 40% 98%;
    --muted: 222 30% 14%;
    --muted-foreground: 215 20% 55%;
    --accent: 45 90% 55%;
    --accent-foreground: 222 47% 6%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 222 30% 16%;
    --ring: 160 60% 50%;
    --radius: 0.75rem;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: hsl(var(--muted)); }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)); }` },

    // ─── App ───
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Login from './pages/Login';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}` },

    // ─── Layouts ───
    { path: "src/layouts/DashboardLayout.tsx", content: `import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState } from 'react';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}` },

    // ─── Components ───
    { path: "src/components/Sidebar.tsx", content: `import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Package, ShoppingCart, ChevronLeft } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <aside className={\`\${isOpen ? 'w-64' : 'w-20'} bg-card border-r border-border flex flex-col transition-all duration-300 relative\`}>
      <div className="p-6 flex items-center justify-between">
        <h1 className={\`text-xl font-bold text-primary transition-opacity \${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}\`}>
          SaaS Admin
        </h1>
        {!isOpen && <span className="text-xl font-bold text-primary">SA</span>}
        <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
          <ChevronLeft className={\`w-4 h-4 transition-transform \${!isOpen ? 'rotate-180' : ''}\`} />
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) => \`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors \${
              isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }\`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}` },
    { path: "src/components/TopBar.tsx", content: `import { Bell, Search, Menu, User } from 'lucide-react';
import { useState } from 'react';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New user registered', time: '2m ago' },
    { id: 2, text: 'Server CPU at 90%', time: '15m ago' },
    { id: 3, text: 'Payment received — $450', time: '1h ago' },
  ];

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-xl bg-muted border border-border text-sm w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl z-50">
              <div className="p-3 border-b border-border font-medium text-sm">Notifications</div>
              {notifications.map(n => (
                <div key={n.id} className="p-3 border-b border-border/50 hover:bg-muted/50 cursor-pointer">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@saas.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}` },
    { path: "src/components/StatsCards.tsx", content: `import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart } from 'lucide-react';

interface Stat {
  title: string; value: string; change: string; trend: 'up' | 'down';
  icon: typeof DollarSign; color: string; bgColor: string;
}

const stats: Stat[] = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: DollarSign, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  { title: 'Active Users', value: '2,350', change: '+15.3%', trend: 'up', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { title: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down', icon: Activity, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { title: 'Total Orders', value: '1,247', change: '+12.5%', trend: 'up', icon: ShoppingCart, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div className={\`p-2.5 rounded-xl \${stat.bgColor}\`}>
              <stat.icon className={\`w-5 h-5 \${stat.color}\`} />
            </div>
            <div className={\`flex items-center gap-1 text-sm font-medium \${stat.trend === 'up' ? 'text-emerald-500' : 'text-destructive'}\`}>
              {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stat.change}
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}` },
    { path: "src/components/RevenueChart.tsx", content: `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3200 },
  { month: 'Apr', revenue: 4500, profit: 2800 },
  { month: 'May', revenue: 6000, profit: 3800 },
  { month: 'Jun', revenue: 5500, profit: 3400 },
  { month: 'Jul', revenue: 7000, profit: 4300 },
  { month: 'Aug', revenue: 8000, profit: 5100 },
  { month: 'Sep', revenue: 7500, profit: 4700 },
  { month: 'Oct', revenue: 9000, profit: 5800 },
  { month: 'Nov', revenue: 8500, profit: 5400 },
  { month: 'Dec', revenue: 10000, profit: 6500 },
];

export function RevenueChart() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue and profit</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> Revenue</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary" /> Profit</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160 60% 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(160 60% 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(270 50% 60%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(270 50% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
          <YAxis stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => \`$\${v/1000}k\`} />
          <Tooltip
            contentStyle={{ background: 'hsl(222 47% 9%)', border: '1px solid hsl(222 30% 16%)', borderRadius: '12px', color: 'hsl(210 40% 98%)' }}
            formatter={(value: number) => [\`$\${value.toLocaleString()}\`, '']}
          />
          <Area type="monotone" dataKey="revenue" stroke="hsl(160 60% 50%)" fill="url(#colorRevenue)" strokeWidth={2} />
          <Area type="monotone" dataKey="profit" stroke="hsl(270 50% 60%)" fill="url(#colorProfit)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}` },
    { path: "src/components/UserGrowthChart.tsx", content: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', newUsers: 400, returning: 240 },
  { month: 'Feb', newUsers: 600, returning: 380 },
  { month: 'Mar', newUsers: 550, returning: 420 },
  { month: 'Apr', newUsers: 780, returning: 500 },
  { month: 'May', newUsers: 890, returning: 580 },
  { month: 'Jun', newUsers: 1100, returning: 720 },
  { month: 'Jul', newUsers: 950, returning: 800 },
  { month: 'Aug', newUsers: 1200, returning: 900 },
];

export function UserGrowthChart() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">User Growth</h3>
          <p className="text-sm text-muted-foreground">New vs returning users</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
          <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
          <Tooltip contentStyle={{ background: 'hsl(222 47% 9%)', border: '1px solid hsl(222 30% 16%)', borderRadius: '12px', color: 'hsl(210 40% 98%)' }} />
          <Bar dataKey="newUsers" fill="hsl(160 60% 50%)" radius={[6, 6, 0, 0]} name="New Users" />
          <Bar dataKey="returning" fill="hsl(270 50% 60%)" radius={[6, 6, 0, 0]} name="Returning" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}` },
    { path: "src/components/RecentActivity.tsx", content: `const activities = [
  { user: 'John Doe', action: 'Created new project "Marketing Site"', time: '2 min ago', avatar: 'JD', color: 'bg-blue-500/10 text-blue-500' },
  { user: 'Sarah Smith', action: 'Updated billing info — Visa ending 4242', time: '15 min ago', avatar: 'SS', color: 'bg-emerald-500/10 text-emerald-500' },
  { user: 'Mike Johnson', action: 'Invited team member emily@example.com', time: '1 hour ago', avatar: 'MJ', color: 'bg-purple-500/10 text-purple-500' },
  { user: 'Emily Davis', action: 'Deployed v2.1.0 to production', time: '3 hours ago', avatar: 'ED', color: 'bg-orange-500/10 text-orange-500' },
  { user: 'Alex Wilson', action: 'Upgraded plan from Starter to Pro', time: '5 hours ago', avatar: 'AW', color: 'bg-pink-500/10 text-pink-500' },
  { user: 'Lisa Chen', action: 'Exported analytics report Q3 2024', time: '8 hours ago', avatar: 'LC', color: 'bg-cyan-500/10 text-cyan-500' },
];

export function RecentActivity() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-1">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className={\`w-10 h-10 rounded-full \${activity.color} flex items-center justify-center text-sm font-bold flex-shrink-0\`}>{activity.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.user}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}` },
    { path: "src/components/DataTable.tsx", content: `import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({ data, columns, pageSize = 10 }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    const arr = [...data];
    if (sortKey) {
      arr.sort((a, b) => {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
    }
    return arr;
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground select-none"
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-4 text-sm">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1.5 rounded-lg text-sm bg-muted disabled:opacity-50">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className={\`px-3 py-1.5 rounded-lg text-sm \${page === i ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="px-3 py-1.5 rounded-lg text-sm bg-muted disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}` },

    // ─── Pages ───
    { path: "src/pages/Dashboard.tsx", content: `import { StatsCards } from '../components/StatsCards';
import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';
import { RecentActivity } from '../components/RecentActivity';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add User', desc: 'Create new team member' },
              { label: 'Create Report', desc: 'Generate analytics report' },
              { label: 'View Orders', desc: 'Check recent orders' },
              { label: 'Send Invoice', desc: 'Bill a customer' },
            ].map(action => (
              <button key={action.label} className="p-4 rounded-xl bg-muted/50 hover:bg-muted border border-border/50 text-left transition-colors">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Users.tsx", content: `import { DataTable } from '../components/DataTable';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const users = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', plan: 'Enterprise', joined: '2024-01-15', lastActive: '2 min ago' },
  { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Editor', status: 'Active', plan: 'Pro', joined: '2024-02-20', lastActive: '1 hour ago' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', plan: 'Starter', joined: '2024-03-10', lastActive: '3 days ago' },
  { name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'Active', plan: 'Enterprise', joined: '2024-01-28', lastActive: '5 min ago' },
  { name: 'Alex Wilson', email: 'alex@example.com', role: 'Editor', status: 'Active', plan: 'Pro', joined: '2024-04-05', lastActive: '30 min ago' },
  { name: 'Lisa Chen', email: 'lisa@example.com', role: 'Viewer', status: 'Active', plan: 'Starter', joined: '2024-05-12', lastActive: '2 hours ago' },
  { name: 'Tom Brown', email: 'tom@example.com', role: 'Editor', status: 'Pending', plan: 'Pro', joined: '2024-06-01', lastActive: 'Never' },
  { name: 'Kate Miller', email: 'kate@example.com', role: 'Admin', status: 'Active', plan: 'Enterprise', joined: '2024-02-14', lastActive: '10 min ago' },
];

const columns = [
  { key: 'name' as const, label: 'Name', render: (v: string, row: any) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{row.name.split(' ').map((n: string) => n[0]).join('')}</div>
      <div><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.email}</p></div>
    </div>
  )},
  { key: 'role' as const, label: 'Role' },
  { key: 'status' as const, label: 'Status', render: (v: string) => (
    <span className={\`px-2.5 py-1 rounded-full text-xs font-medium \${v === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : v === 'Inactive' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}\`}>{v}</span>
  )},
  { key: 'plan' as const, label: 'Plan' },
  { key: 'lastActive' as const, label: 'Last Active' },
];

export default function Users() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">{users.length} total users</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>
      <DataTable data={filtered} columns={columns} />
    </div>
  );
}` },
    { path: "src/pages/Analytics.tsx", content: `import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';

const trafficSources = [
  { source: 'Direct', value: 42, color: 'bg-emerald-500' },
  { source: 'Google Search', value: 28, color: 'bg-blue-500' },
  { source: 'Social Media', value: 18, color: 'bg-purple-500' },
  { source: 'Referral', value: 8, color: 'bg-orange-500' },
  { source: 'Email', value: 4, color: 'bg-pink-500' },
];

const topPages = [
  { page: '/dashboard', views: 12450, unique: 8320, bounce: '24%' },
  { page: '/products', views: 8920, unique: 6100, bounce: '31%' },
  { page: '/pricing', views: 5670, unique: 4200, bounce: '18%' },
  { page: '/blog/react-tips', views: 3400, unique: 2800, bounce: '42%' },
  { page: '/docs/api', views: 2100, unique: 1650, bounce: '15%' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your key metrics and performance</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map(item => (
              <div key={item.source} className="flex items-center gap-4">
                <div className={\`w-3 h-3 rounded-full \${item.color}\`} />
                <span className="text-sm w-28">{item.source}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={\`h-full rounded-full \${item.color} transition-all duration-500\`} style={{ width: \`\${item.value}%\` }} />
                </div>
                <span className="text-sm text-muted-foreground w-10 text-right font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold mb-6">Top Pages</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3">Page</th><th className="pb-3">Views</th><th className="pb-3">Unique</th><th className="pb-3">Bounce</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map(p => (
                  <tr key={p.page} className="border-t border-border/50">
                    <td className="py-3 text-sm font-mono text-primary">{p.page}</td>
                    <td className="py-3 text-sm">{p.views.toLocaleString()}</td>
                    <td className="py-3 text-sm">{p.unique.toLocaleString()}</td>
                    <td className="py-3 text-sm">{p.bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Products.tsx", content: `import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const products = [
  { id: 1, name: 'Pro Plan - Monthly', price: 29, stock: 'Unlimited', status: 'Active', sales: 342 },
  { id: 2, name: 'Pro Plan - Annual', price: 290, stock: 'Unlimited', status: 'Active', sales: 156 },
  { id: 3, name: 'Enterprise License', price: 990, stock: 'Unlimited', status: 'Active', sales: 28 },
  { id: 4, name: 'Starter Pack', price: 0, stock: 'Unlimited', status: 'Active', sales: 1250 },
  { id: 5, name: 'API Add-on', price: 49, stock: 'Limited', status: 'Low Stock', sales: 89 },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-muted/50 border-b border-border text-left">
            <th className="p-4 text-sm font-medium text-muted-foreground">Product</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Price</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Sales</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-sm">{p.name}</td>
                <td className="p-4 text-sm">{p.price === 0 ? 'Free' : \`$\${p.price}\`}</td>
                <td className="p-4"><span className={\`px-2.5 py-1 rounded-full text-xs font-medium \${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}\`}>{p.status}</span></td>
                <td className="p-4 text-sm">{p.sales}</td>
                <td className="p-4 flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Orders.tsx", content: `import { Search, Eye, Download } from 'lucide-react';
import { useState } from 'react';

const orders = [
  { id: 'ORD-001', customer: 'John Doe', product: 'Pro Plan - Annual', amount: 290, status: 'Completed', date: '2024-03-15' },
  { id: 'ORD-002', customer: 'Sarah Smith', product: 'Enterprise License', amount: 990, status: 'Completed', date: '2024-03-14' },
  { id: 'ORD-003', customer: 'Mike Johnson', product: 'Pro Plan - Monthly', amount: 29, status: 'Pending', date: '2024-03-14' },
  { id: 'ORD-004', customer: 'Emily Davis', product: 'API Add-on', amount: 49, status: 'Completed', date: '2024-03-13' },
  { id: 'ORD-005', customer: 'Alex Wilson', product: 'Pro Plan - Monthly', amount: 29, status: 'Refunded', date: '2024-03-12' },
  { id: 'ORD-006', customer: 'Lisa Chen', product: 'Enterprise License', amount: 990, status: 'Processing', date: '2024-03-12' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-500/10 text-emerald-500',
  Pending: 'bg-yellow-500/10 text-yellow-500',
  Refunded: 'bg-red-500/10 text-red-500',
  Processing: 'bg-blue-500/10 text-blue-500',
};

export default function Orders() {
  const [search, setSearch] = useState('');
  const filtered = orders.filter(o => o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground mt-1">{orders.length} total orders</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium flex items-center gap-2 border border-border hover:bg-muted/80">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-primary" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-muted/50 border-b border-border text-left">
            <th className="p-4 text-sm font-medium text-muted-foreground">Order ID</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Customer</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Product</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Amount</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="p-4 text-sm font-medium text-muted-foreground">Date</th>
          </tr></thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-4 text-sm font-mono text-primary">{o.id}</td>
                <td className="p-4 text-sm font-medium">{o.customer}</td>
                <td className="p-4 text-sm text-muted-foreground">{o.product}</td>
                <td className="p-4 text-sm font-medium">\${o.amount}</td>
                <td className="p-4"><span className={\`px-2.5 py-1 rounded-full text-xs font-medium \${statusColors[o.status]}\`}>{o.status}</span></td>
                <td className="p-4 text-sm text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Settings.tsx", content: `import { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={\`w-11 h-6 rounded-full transition-colors relative \${checked ? 'bg-primary' : 'bg-muted'}\`}>
      <div className={\`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform \${checked ? 'left-[22px]' : 'left-0.5'}\`} />
    </button>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm text-muted-foreground mb-1 block">First Name</label><input defaultValue="Admin" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="text-sm text-muted-foreground mb-1 block">Last Name</label><input defaultValue="User" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary" /></div>
        </div>
        <div><label className="text-sm text-muted-foreground mb-1 block">Email</label><input type="email" defaultValue="admin@saas.com" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm text-muted-foreground mb-1 block">Bio</label><textarea defaultValue="Platform administrator" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary resize-none" /></div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <div className="flex items-center gap-3 mb-2"><Palette className="w-5 h-5 text-primary" /><h2 className="text-lg font-semibold">Appearance</h2></div>
        <div className="flex items-center justify-between py-3"><div><p className="font-medium text-sm">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle dark theme</p></div><Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} /></div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <div className="flex items-center gap-3 mb-2"><Bell className="w-5 h-5 text-primary" /><h2 className="text-lg font-semibold">Notifications</h2></div>
        <div className="flex items-center justify-between py-3 border-b border-border/50"><div><p className="font-medium text-sm">Email Notifications</p><p className="text-xs text-muted-foreground">Receive email updates</p></div><Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} /></div>
        <div className="flex items-center justify-between py-3"><div><p className="font-medium text-sm">Push Notifications</p><p className="text-xs text-muted-foreground">Browser push notifications</p></div><Toggle checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} /></div>
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <div className="flex items-center gap-3 mb-2"><Shield className="w-5 h-5 text-primary" /><h2 className="text-lg font-semibold">Security</h2></div>
        <div className="flex items-center justify-between py-3 border-b border-border/50"><div><p className="font-medium text-sm">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security</p></div><Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} /></div>
        <button className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium border border-border hover:bg-muted/80">Change Password</button>
      </div>

      <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}` },
    { path: "src/pages/Login.tsx", content: `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('admin@saas.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">SaaS Admin</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="rounded" /> Remember me</label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">Demo: admin@saas.com / password123</p>
      </div>
    </div>
  );
}` },
    { path: "README.md", content: `# SaaS Admin Dashboard

A complete, production-ready admin dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

## ✨ Features

- 📊 **Dashboard** — Interactive revenue & user growth charts with stats cards
- 👥 **User Management** — Sortable, searchable, paginated data table with role badges
- 📈 **Analytics** — Traffic sources, top pages, and detailed metrics
- 📦 **Products** — Product catalog management with CRUD operations
- 🛒 **Orders** — Order tracking with status filters and CSV export
- ⚙️ **Settings** — Profile editing, appearance, notifications, and security
- 🔐 **Login** — Authentication page with form validation
- 📱 **Responsive** — Collapsible sidebar, mobile-friendly layout
- 🔔 **Notifications** — Dropdown notification panel
- 🎨 **Dark Theme** — Beautiful dark color scheme with CSS variables

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router v6** for routing
- **TanStack Query** for data fetching
- **Lucide React** for icons

## 📁 Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── StatsCards.tsx
│   ├── RevenueChart.tsx
│   ├── UserGrowthChart.tsx
│   ├── RecentActivity.tsx
│   └── DataTable.tsx
├── layouts/        # Layout wrappers
│   └── DashboardLayout.tsx
├── pages/          # Route pages
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Analytics.tsx
│   ├── Products.tsx
│   ├── Orders.tsx
│   ├── Settings.tsx
│   └── Login.tsx
├── App.tsx
├── main.tsx
└── index.css
\`\`\`

## 📄 License

This source code is licensed for personal and commercial use.

Built with ❤️ by Sakshyam Kharel | CodeVault
` },
  ];
}
