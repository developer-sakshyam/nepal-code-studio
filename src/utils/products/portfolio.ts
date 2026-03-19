import { FileEntry } from "../generateProductCode";

export function getPortfolioFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "developer-portfolio", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" } }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
    { path: "vite.config.ts", content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport path from 'path';\nexport default defineConfig({ plugins: [react()], resolve: { alias: { '@': path.resolve(__dirname, './src') } } });` },
    { path: "tailwind.config.js", content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
        secondary: 'hsl(var(--secondary))',
      },
      keyframes: {
        'morph': { '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }, '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' } },
        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
      },
      animation: {
        'morph': 'morph 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    }
  },
  plugins: []
};` },
    { path: "postcss.config.js", content: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };` },
    { path: ".gitignore", content: "node_modules\ndist\n.env\n*.log" },
    { path: "index.html", content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="Full-Stack Developer Portfolio - Building modern web experiences"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <title>Portfolio - Full Stack Developer</title>
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 240 10% 4%;
  --foreground: 0 0% 95%;
  --primary: 152 68% 50%;
  --primary-foreground: 240 10% 4%;
  --secondary: 262 60% 58%;
  --muted: 240 6% 10%;
  --muted-foreground: 240 5% 48%;
  --border: 240 6% 14%;
  --card: 240 8% 7%;
}

body { @apply bg-background text-foreground antialiased font-sans; cursor: none; }
html { scroll-behavior: smooth; }

/* Animated cursor */
.custom-cursor {
  width: 20px; height: 20px;
  border: 2px solid hsl(var(--primary));
  border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9999;
  transition: transform 0.15s ease, width 0.2s, height 0.2s, border-color 0.2s;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.custom-cursor.hovering {
  width: 48px; height: 48px;
  background: hsl(var(--primary) / 0.12);
  border-color: hsl(var(--primary) / 0.5);
}
.cursor-dot {
  width: 5px; height: 5px;
  background: hsl(var(--primary));
  border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
}

/* Glass */
.glass { background: hsl(0 0% 100% / 0.03); backdrop-filter: blur(24px); border: 1px solid hsl(0 0% 100% / 0.06); }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }

/* Scroll progress */
.scroll-progress { position: fixed; top: 0; left: 0; height: 2px; z-index: 9999; background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary))); transform-origin: left; }

/* Noise texture */
.noise::before {
  content: ''; position: absolute; inset: 0; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}

@media (max-width: 768px) { .custom-cursor, .cursor-dot { display: none !important; } body { cursor: auto; } }

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}` },
    { path: "src/App.tsx", content: `import { AnimatedCursor } from './components/AnimatedCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative noise">
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}` },
    { path: "src/components/AnimatedCursor.tsx", content: `import { useEffect, useRef, useState } from 'react';

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; };
    const animate = () => { cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; requestAnimationFrame(animate); };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener('mousemove', move);
    animate();

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => { document.removeEventListener('mousemove', move); observer.disconnect(); };
  }, []);

  return (<><div ref={cursorRef} className={\`custom-cursor \${hovering ? 'hovering' : ''}\`} /><div ref={dotRef} className="cursor-dot" /></>);
}` },
    { path: "src/components/ScrollProgress.tsx", content: `import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const s = window.scrollY; const t = document.documentElement.scrollHeight - window.innerHeight; setP(t > 0 ? s / t : 0); };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return <div className="scroll-progress" style={{ transform: \`scaleX(\${p})\` }} />;
}` },
    { path: "src/components/Navbar.tsx", content: `import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''}\`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-display font-bold tracking-tight">
          <span className="gradient-text">&lt;Dev /&gt;</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={\`#\${link.toLowerCase()}\`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
              {link}
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
          <a href="/resume.pdf" className="px-5 py-2 rounded-full glass text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
            Resume
          </a>
        </div>
        <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden">
            <div className="px-6 py-4 space-y-1">
              {links.map(l => (
                <a key={l} href={\`#\${l.toLowerCase()}\`} onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium hover:text-primary transition-colors">{l}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> using React & Tailwind CSS
        </p>
        <div className="flex gap-2">
          {[{ icon: Github, href: '#' }, { icon: Linkedin, href: '#' }, { icon: Twitter, href: '#' }, { icon: Mail, href: 'mailto:hello@example.com' }].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} className="p-2.5 rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/20 transition-all">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}` },
    { path: "src/sections/Hero.tsx", content: `import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[150px] animate-morph" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[120px] animate-morph" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">Available for work</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95]">
            Hi, I'm<br />
            <span className="gradient-text">Sakshyam</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl leading-relaxed">
            Full-Stack Developer crafting performant, accessible web experiences with <span className="text-foreground font-medium">React</span>, <span className="text-foreground font-medium">TypeScript</span> & <span className="text-foreground font-medium">Node.js</span>
          </p>

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Kathmandu, Nepal</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a href="#projects" className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/25 transition-all">
              View Projects
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-full glass text-sm font-medium hover:bg-muted/60 transition-colors">
              Contact Me
            </a>
            <a href="#" className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#about" className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors">
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}` },
    { path: "src/sections/About.tsx", content: `import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';

const cards = [
  { icon: Code2, title: 'Clean Architecture', desc: 'SOLID principles, modular code, thorough testing', gradient: 'from-blue-500/10 to-cyan-500/10' },
  { icon: Palette, title: 'Design Systems', desc: 'Consistent, accessible, pixel-perfect interfaces', gradient: 'from-violet-500/10 to-purple-500/10' },
  { icon: Rocket, title: 'Performance First', desc: 'Core Web Vitals optimized, lazy loading, caching', gradient: 'from-amber-500/10 to-orange-500/10' },
  { icon: Zap, title: 'DX Matters', desc: 'TypeScript, CI/CD, automated testing pipelines', gradient: 'from-emerald-500/10 to-teal-500/10' },
];

export function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-mono text-primary mb-3 block">// about me</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">What I Bring to the Table</h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with 3+ years of experience building scalable web applications. I specialize in the React ecosystem and love turning complex problems into elegant, user-friendly solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me contributing to open source, writing technical articles, or exploring the intersection of design and engineering.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {cards.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={\`p-4 rounded-2xl glass bg-gradient-to-br \${item.gradient} group hover:border-primary/20 transition-all\`}>
                  <item.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Projects.tsx", content: `import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'E-Commerce Platform', desc: 'Full-stack store with cart, Stripe payments, and admin panel. Built for a fashion brand with 10k+ monthly users.', tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', live: '#', github: '#', featured: true },
  { title: 'Task Manager Pro', desc: 'Kanban board with drag-and-drop, real-time sync via WebSocket, and team collaboration.', tech: ['React', 'TypeScript', 'DnD Kit', 'Socket.io'], image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800', live: '#', github: '#', featured: true },
  { title: 'Analytics Dashboard', desc: 'Real-time data visualization with interactive charts, custom reports, and CSV export.', tech: ['React', 'D3.js', 'Recharts', 'TanStack Query'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', live: '#', github: '#', featured: false },
  { title: 'SaaS Landing Page', desc: 'High-converting landing with 95+ Lighthouse score, animations, and A/B tested CTAs.', tech: ['React', 'Framer Motion', 'Tailwind'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', live: '#', github: '#', featured: false },
];

export function Projects() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-sm font-mono text-primary mb-3 block">// featured work</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">Selected Projects</h2>

        <div className="space-y-16">
          {projects.filter(p => p.featured).map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={\`flex flex-col \${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center\`}>
              <div className="flex-1 rounded-2xl overflow-hidden glass group">
                <img src={p.image} alt={p.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-display font-bold">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map(t => <span key={t} className="px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground">{t}</span>)}
                </div>
                <div className="flex gap-4 pt-2">
                  <a href={p.github} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </a>
                  <a href={p.live} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                    <ArrowUpRight className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {projects.filter(p => !p.featured).map((p, i) => (
            <motion.a key={p.title} href={p.live} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl glass group hover:border-primary/20 transition-all">
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                {p.title} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tech.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full bg-muted text-xs">{t}</span>)}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Skills.tsx", content: `import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux / Zustand'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'] },
  { category: 'Tools & DevOps', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Jest / Vitest'] },
];

export function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="text-sm font-mono text-primary mb-3 block">// tech stack</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">Skills & Technologies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.1 }}
              className="p-6 rounded-2xl glass hover:border-primary/15 transition-all">
              <h3 className="font-display font-semibold text-primary mb-5 text-sm tracking-wide uppercase">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-muted/80 text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-default">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Experience.tsx", content: `import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  { role: 'Senior Frontend Developer', company: 'TechCorp', period: '2023 — Present', desc: 'Leading frontend team of 5. Built design system serving 12 products. Improved Core Web Vitals by 40%.', tags: ['React', 'TypeScript', 'Design Systems'] },
  { role: 'Full Stack Developer', company: 'StartupXYZ', period: '2022 — 2023', desc: 'Architected microservices backend. Implemented CI/CD pipeline reducing deploy time by 60%.', tags: ['Node.js', 'PostgreSQL', 'Docker'] },
  { role: 'Frontend Developer', company: 'WebAgency', period: '2021 — 2022', desc: 'Developed 15+ responsive websites and SPAs for clients across fintech, healthcare, and e-commerce.', tags: ['React', 'Vue', 'WordPress'] },
];

export function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-sm font-mono text-primary mb-3 block">// experience</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-16">Where I've Worked</h2>
        <div className="space-y-6 relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border" />
          {experiences.map((exp, i) => (
            <motion.div key={exp.role} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-6 relative group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl glass text-primary flex items-center justify-center z-10 group-hover:border-primary/30 transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex-1 p-5 rounded-2xl glass group-hover:border-primary/15 transition-all">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-display font-bold">{exp.role}</h3>
                  <span className="text-sm text-primary font-medium">@ {exp.company}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-3">{exp.period}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {exp.tags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full bg-muted text-xs">{t}</span>)}
                </div>
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
import { Send, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-mono text-primary mb-3 block">// get in touch</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-10">I'm always open to new opportunities and interesting projects.</p>

          <div className="flex flex-wrap gap-4 mb-10">
            {[{ icon: Mail, text: 'hello@example.com' }, { icon: MapPin, text: 'Kathmandu, Nepal' }, { icon: Phone, text: '+977-9800000000' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" /> {text}
              </div>
            ))}
          </div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center p-10 rounded-2xl glass border-primary/20">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-display font-bold">Message sent!</p>
              <p className="text-sm text-muted-foreground mt-1">I'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="Your Name" required className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50" />
                <input type="email" placeholder="Email" required className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50" />
              </div>
              <input placeholder="Subject" className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50" />
              <textarea placeholder="Your message..." rows={5} required className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm resize-none focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50" />
              <button type="submit" className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}` },
    { path: "README.md", content: `# Developer Portfolio

A stunning, professional portfolio with animated cursor, glassmorphism, scroll progress, and smooth Framer Motion animations.

## ✨ Features

- 🎯 Custom animated cursor with hover effects
- 📊 Scroll progress indicator
- 🌊 Ambient gradient morphing backgrounds
- 🪟 Glassmorphism card design
- ✨ Framer Motion scroll-triggered animations
- 📱 Fully responsive with mobile-optimized UX
- 🎨 Noise texture overlay for depth
- 🧭 Smooth-scrolling navigation
- 💼 Timeline experience section
- 📬 Animated contact form with success state

## 🚀 Getting Started

\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`

Built by Sakshyam Kharel | CodeVault` },
  ];
}
