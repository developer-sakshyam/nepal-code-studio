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
        "framer-motion": "^11.3.0",
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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
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
      keyframes: {
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'shimmer': { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.2)' }, '50%': { boxShadow: '0 0 20px 5px hsl(var(--primary) / 0.1)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
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

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

@layer base {
  :root {
    --background: 228 20% 5%;
    --foreground: 210 40% 98%;
    --card: 228 18% 8%;
    --card-foreground: 210 40% 98%;
    --primary: 152 68% 50%;
    --primary-foreground: 228 20% 5%;
    --secondary: 262 60% 58%;
    --secondary-foreground: 210 40% 98%;
    --muted: 228 15% 12%;
    --muted-foreground: 215 20% 50%;
    --accent: 38 95% 55%;
    --accent-foreground: 228 20% 5%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 228 15% 14%;
    --ring: 152 68% 50%;
    --radius: 0.75rem;
  }

  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased font-sans; }
}

/* Animated cursor */
.custom-cursor {
  width: 20px; height: 20px;
  border: 2px solid hsl(var(--primary));
  border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9999;
  transition: transform 0.15s ease, opacity 0.15s ease, width 0.2s, height 0.2s, border-color 0.2s;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.custom-cursor.hovering {
  width: 44px; height: 44px;
  background: hsl(var(--primary) / 0.15);
  border-color: hsl(var(--primary) / 0.6);
}
.cursor-dot {
  width: 5px; height: 5px;
  background: hsl(var(--primary));
  border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.15s;
}

/* Glass card */
.glass-card {
  background: linear-gradient(135deg, hsl(0 0% 100% / 0.04), hsl(0 0% 100% / 0.01));
  backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid hsl(0 0% 100% / 0.06);
  box-shadow: 0 8px 32px hsl(228 20% 2% / 0.4);
}
.glass-card:hover {
  border-color: hsl(0 0% 100% / 0.1);
  box-shadow: 0 16px 48px hsl(228 20% 2% / 0.5), 0 0 24px hsl(var(--primary) / 0.04);
}

/* Skeleton loading */
.skeleton {
  background: linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--muted-foreground) / 0.08) 50%, hsl(var(--muted)) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)); }

/* Scroll progress */
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
  background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)));
  transform-origin: left;
}

@media (max-width: 768px) {
  .custom-cursor, .cursor-dot { display: none !important; }
}` },

    // ─── App ───
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AnimatedCursor } from './components/AnimatedCursor';
import { ScrollProgress } from './components/ScrollProgress';
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
        <AnimatedCursor />
        <ScrollProgress />
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

    // ─── Animated Cursor ───
    { path: "src/components/AnimatedCursor.tsx", content: `import { useEffect, useRef, useState } from 'react';

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    };

    const handleHover = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    document.addEventListener('mousemove', move);
    animate();

    const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={\`custom-cursor \${hovering ? 'hovering' : ''}\`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}` },

    // ─── Scroll Progress ───
    { path: "src/components/ScrollProgress.tsx", content: `import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: \`scaleX(\${progress})\` }} />;
}` },

    // ─── Layouts ───
    { path: "src/layouts/DashboardLayout.tsx", content: `import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileSidebar(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <Sidebar isOpen={true} onToggle={() => setMobileSidebar(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setMobileSidebar(!mobileSidebar)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}` },

    // ─── Components ───
    { path: "src/components/Sidebar.tsx", content: `import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Package, ShoppingCart, ChevronLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <aside className={\`\${isOpen ? 'w-[260px]' : 'w-[72px]'} h-full bg-card/80 backdrop-blur-xl border-r border-border flex flex-col transition-all duration-300\`}>
      <div className="p-5 flex items-center gap-3 border-b border-border/50">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-display font-bold tracking-tight">
            SaaS<span className="text-primary">Admin</span>
          </motion.span>
        )}
        <button onClick={onToggle} className="ml-auto p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <ChevronLeft className={\`w-4 h-4 transition-transform duration-300 \${!isOpen ? 'rotate-180' : ''}\`} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }, i) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) => \`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden \${
              isActive
                ? 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }\`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {isOpen && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border/50">
        {isOpen && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border border-primary/10 mb-3">
            <p className="text-xs font-semibold text-primary mb-1">Pro Plan</p>
            <p className="text-[11px] text-muted-foreground">Upgrade for advanced features</p>
            <button className="mt-2 w-full py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        )}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full transition-all">
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}` },
    { path: "src/components/TopBar.tsx", content: `import { Bell, Search, Menu, User, Moon, Sun, Command } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New user registered — John Doe', time: '2m ago', unread: true },
    { id: 2, text: 'Server CPU at 90% utilization', time: '15m ago', unread: true },
    { id: 3, text: 'Payment received — $450.00', time: '1h ago', unread: false },
    { id: 4, text: 'Deployment v2.1.3 completed', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input placeholder="Search anything..." className="pl-10 pr-4 py-2 rounded-xl bg-muted/60 border border-border/50 text-sm w-56 md:w-72 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 placeholder:text-muted-foreground/60 transition-all" />
          <kbd className="hidden md:flex absolute right-3 items-center gap-0.5 px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
          <Sun className="w-[18px] h-[18px]" />
        </button>
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-card" />
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className={\`p-4 border-b border-border/50 hover:bg-muted/40 cursor-pointer transition-colors flex gap-3 \${n.unread ? '' : 'opacity-60'}\`}>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                    <div className={n.unread ? '' : 'ml-5'}>
                      <p className="text-sm">{n.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
                <div className="p-3 text-center">
                  <button className="text-xs text-primary font-medium hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 pl-3 ml-1 border-l border-border">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-tight">Admin User</p>
            <p className="text-[11px] text-muted-foreground">admin@company.io</p>
          </div>
        </div>
      </div>
    </header>
  );
}` },
    { path: "src/components/StatsCards.tsx", content: `import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stat {
  title: string; value: string; change: string; trend: 'up' | 'down';
  icon: typeof DollarSign; gradient: string;
}

const stats: Stat[] = [
  { title: 'Total Revenue', value: '$45,231', change: '+20.1% from last month', trend: 'up', icon: DollarSign, gradient: 'from-emerald-500/15 to-emerald-500/5' },
  { title: 'Active Users', value: '2,350', change: '+15.3% from last month', trend: 'up', icon: Users, gradient: 'from-blue-500/15 to-blue-500/5' },
  { title: 'Conversion', value: '3.24%', change: '-2.1% from last month', trend: 'down', icon: Activity, gradient: 'from-violet-500/15 to-violet-500/5' },
  { title: 'Total Orders', value: '1,247', change: '+12.5% from last month', trend: 'up', icon: ShoppingCart, gradient: 'from-amber-500/15 to-amber-500/5' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="group relative p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
        >
          <div className={\`absolute inset-0 bg-gradient-to-br \${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500\`} />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-muted group-hover:bg-background/50 transition-colors">
                <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className={\`flex items-center gap-1 text-xs font-semibold \${stat.trend === 'up' ? 'text-emerald-500' : 'text-destructive'}\`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {stat.change.split(' ')[0]}
              </div>
            </div>
            <p className="text-2xl font-display font-bold tracking-tight">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}` },
    { path: "src/components/RevenueChart.tsx", content: `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl bg-card border border-border"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-display font-bold">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue and profit breakdown</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> Revenue</div>
          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-secondary" /> Profit</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(152 68% 50%)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(152 68% 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(262 60% 58%)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="hsl(262 60% 58%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 15% 14%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 50%)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(215 20% 50%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => \`$\${v/1000}k\`} />
          <Tooltip
            contentStyle={{ background: 'hsl(228 18% 8%)', border: '1px solid hsl(228 15% 14%)', borderRadius: '12px', color: 'hsl(210 40% 98%)', fontSize: '12px' }}
            formatter={(value: number) => [\`$\${value.toLocaleString()}\`, '']}
          />
          <Area type="monotone" dataKey="revenue" stroke="hsl(152 68% 50%)" fill="url(#colorRevenue)" strokeWidth={2.5} dot={false} />
          <Area type="monotone" dataKey="profit" stroke="hsl(262 60% 58%)" fill="url(#colorProfit)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}` },
    { path: "src/components/UserGrowthChart.tsx", content: `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="p-6 rounded-2xl bg-card border border-border"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-display font-bold">User Growth</h3>
          <p className="text-sm text-muted-foreground">New vs returning users</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 15% 14%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 50%)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(215 20% 50%)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'hsl(228 18% 8%)', border: '1px solid hsl(228 15% 14%)', borderRadius: '12px', color: 'hsl(210 40% 98%)', fontSize: '12px' }} />
          <Bar dataKey="newUsers" fill="hsl(152 68% 50%)" radius={[6, 6, 0, 0]} name="New Users" />
          <Bar dataKey="returning" fill="hsl(262 60% 58%)" radius={[6, 6, 0, 0]} name="Returning" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}` },
    { path: "src/components/RecentActivity.tsx", content: `import { motion } from 'framer-motion';

const activities = [
  { user: 'John Doe', action: 'Created new project "Marketing Site"', time: '2 min ago', avatar: 'JD', gradient: 'from-blue-500 to-cyan-400' },
  { user: 'Sarah Smith', action: 'Updated billing — Visa ending 4242', time: '15 min ago', avatar: 'SS', gradient: 'from-emerald-500 to-teal-400' },
  { user: 'Mike Johnson', action: 'Invited team member emily@co.io', time: '1 hour ago', avatar: 'MJ', gradient: 'from-violet-500 to-purple-400' },
  { user: 'Emily Davis', action: 'Deployed v2.1.0 to production', time: '3 hours ago', avatar: 'ED', gradient: 'from-amber-500 to-orange-400' },
  { user: 'Alex Wilson', action: 'Upgraded plan from Starter → Pro', time: '5 hours ago', avatar: 'AW', gradient: 'from-pink-500 to-rose-400' },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className="p-6 rounded-2xl bg-card border border-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-bold">Recent Activity</h3>
        <button className="text-xs text-primary font-semibold hover:underline">View all</button>
      </div>
      <div className="space-y-1">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.06 }}
            className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer group"
          >
            <div className={\`w-9 h-9 rounded-xl bg-gradient-to-br \${activity.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg shadow-primary/5\`}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{activity.user}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
            </div>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}` },
    { path: "src/components/DataTable.tsx", content: `import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

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
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th key={String(col.key)} onClick={() => col.sortable && handleSort(col.key)}
                  className={\`text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider \${col.sortable ? 'cursor-pointer hover:text-foreground select-none' : ''}\`}>
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (sortKey === col.key
                      ? (sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)
                      : <ChevronsUpDown className="w-3.5 h-3.5 opacity-30" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-xs text-muted-foreground">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium disabled:opacity-40 hover:bg-muted/80 transition-colors">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors \${page === i ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
              className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium disabled:opacity-40 hover:bg-muted/80 transition-colors">Next</button>
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
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/60 border border-border text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Last 30 days</span>
        </div>
      </motion.div>

      <StatsCards />

      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      <RecentActivity />
    </div>
  );
}` },
    { path: "src/pages/Users.tsx", content: `import { DataTable } from '../components/DataTable';
import { motion } from 'framer-motion';
import { UserPlus, Download } from 'lucide-react';

const users = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-01-28' },
  { name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Active', joined: '2024-03-01' },
  { name: 'Alex Wilson', email: 'alex@example.com', role: 'Admin', status: 'Active', joined: '2024-03-10' },
  { name: 'Lisa Chen', email: 'lisa@example.com', role: 'Viewer', status: 'Active', joined: '2024-02-15' },
  { name: 'Tom Brown', email: 'tom@example.com', role: 'Editor', status: 'Pending', joined: '2024-03-18' },
];

export default function Users() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage team members and permissions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-muted text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      <DataTable data={users} columns={[
        { key: 'name', label: 'Name', sortable: true, render: (_, row) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold text-primary">
              {String(row.name).split(' ').map((n: string) => n[0]).join('')}
            </div>
            <span className="font-medium">{String(row.name)}</span>
          </div>
        )},
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true, render: (v) => (
          <span className={\`px-2.5 py-1 rounded-lg text-xs font-medium \${
            v === 'Admin' ? 'bg-primary/10 text-primary' : v === 'Editor' ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'
          }\`}>{String(v)}</span>
        )},
        { key: 'status', label: 'Status', sortable: true, render: (v) => (
          <div className="flex items-center gap-2">
            <div className={\`w-2 h-2 rounded-full \${v === 'Active' ? 'bg-emerald-500' : v === 'Pending' ? 'bg-amber-500' : 'bg-muted-foreground'}\`} />
            <span className="text-sm">{String(v)}</span>
          </div>
        )},
        { key: 'joined', label: 'Joined', sortable: true },
      ]} />
    </motion.div>
  );
}` },
    { path: "src/pages/Analytics.tsx", content: `import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';
import { motion } from 'framer-motion';

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep dive into your metrics and performance</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserGrowthChart />
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Products.tsx", content: `import { motion } from 'framer-motion';
import { Package, Plus } from 'lucide-react';

const products = [
  { name: 'Pro Plan', price: '$29/mo', sales: 1247, status: 'Active' },
  { name: 'Enterprise Plan', price: '$99/mo', sales: 342, status: 'Active' },
  { name: 'Starter Plan', price: 'Free', sales: 5891, status: 'Active' },
  { name: 'Legacy Plan', price: '$19/mo', sales: 89, status: 'Discontinued' },
];

export default function Products() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your subscription plans</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-2xl font-display font-bold mt-1">{p.price}</p>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>{p.sales.toLocaleString()} sales</span>
              <span className={\`px-2 py-0.5 rounded-full \${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}\`}>{p.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Orders.tsx", content: `import { DataTable } from '../components/DataTable';
import { motion } from 'framer-motion';

const orders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Pro Plan', amount: '$29.00', status: 'Completed', date: '2024-03-15' },
  { id: '#ORD-002', customer: 'Sarah Smith', product: 'Enterprise', amount: '$99.00', status: 'Processing', date: '2024-03-14' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'Pro Plan', amount: '$29.00', status: 'Completed', date: '2024-03-14' },
  { id: '#ORD-004', customer: 'Emily Davis', product: 'Pro Plan', amount: '$29.00', status: 'Refunded', date: '2024-03-13' },
  { id: '#ORD-005', customer: 'Alex Wilson', product: 'Enterprise', amount: '$99.00', status: 'Completed', date: '2024-03-12' },
];

export default function Orders() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage customer orders</p>
      </div>
      <DataTable data={orders} columns={[
        { key: 'id', label: 'Order ID', sortable: true, render: (v) => <span className="font-mono text-xs font-semibold text-primary">{String(v)}</span> },
        { key: 'customer', label: 'Customer', sortable: true },
        { key: 'product', label: 'Product', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true, render: (v) => <span className="font-semibold">{String(v)}</span> },
        { key: 'status', label: 'Status', sortable: true, render: (v) => {
          const colors: Record<string, string> = { Completed: 'bg-emerald-500/10 text-emerald-500', Processing: 'bg-amber-500/10 text-amber-500', Refunded: 'bg-destructive/10 text-destructive' };
          return <span className={\`px-2.5 py-1 rounded-lg text-xs font-medium \${colors[String(v)] || 'bg-muted'}\`}>{String(v)}</span>;
        }},
        { key: 'date', label: 'Date', sortable: true },
      ]} />
    </motion.div>
  );
}` },
    { path: "src/pages/Settings.tsx", content: `import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all \${
              activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }\`}>
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input defaultValue="Admin User" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input defaultValue="admin@company.io" className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Bio</label>
            <textarea rows={3} placeholder="Tell us about yourself..." className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save Changes</button>
        </div>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Login.tsx", content: `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your dashboard</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/'); }}
          className="p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" defaultValue="admin@company.io" required
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} defaultValue="password" required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-sm pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-border" /> Remember me
            </label>
            <a href="#" className="text-primary hover:underline text-xs font-medium">Forgot password?</a>
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}` },

    { path: "README.md", content: `# SaaS Admin Dashboard

A professional, production-ready admin dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

## ✨ Features

- 📊 Interactive analytics with revenue & user growth charts
- 👥 User management with sortable data tables
- 🔔 Real-time notification panel with animations
- 🎨 Custom animated cursor & scroll progress indicator
- 📱 Fully responsive — mobile sidebar with gesture support
- 🌙 Dark theme with glassmorphism design system
- ⚡ Framer Motion page transitions & micro-interactions
- 🔐 Login page with password visibility toggle
- 📋 Paginated, sortable data tables
- 🎯 Collapsible sidebar with active state animations

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## 🛠 Tech Stack

- React 18 + TypeScript
- Tailwind CSS + CSS Variables
- Recharts for data visualization
- Framer Motion for animations
- TanStack Query for data fetching
- React Router v6 for navigation

Built by Sakshyam Kharel | CodeVault` },
  ];
}
