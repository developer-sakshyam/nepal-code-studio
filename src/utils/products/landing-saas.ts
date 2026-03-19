import { FileEntry } from "../generateProductCode";

export function getLandingSaaSFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "saas-landing-page", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" } }, null, 2) },
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
        secondary: 'hsl(var(--secondary))',
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
      },
      keyframes: {
        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'count': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'float': 'float 6s ease-in-out infinite', 'count': 'count 0.5s ease-out forwards' },
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
  <meta name="description" content="SaaSify - The all-in-one platform to build products 10x faster"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet"/>
  <title>SaaSify - Build Faster</title>
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
  --secondary: 262 60% 58%;
  --muted: 228 15% 10%;
  --muted-foreground: 215 20% 48%;
  --border: 228 15% 13%;
}

body { @apply bg-background text-foreground antialiased font-sans; cursor: none; }
html { scroll-behavior: smooth; }

.custom-cursor { width: 20px; height: 20px; border: 2px solid hsl(var(--primary)); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transition: transform 0.15s, width 0.2s, height 0.2s, background 0.2s; transform: translate(-50%, -50%); mix-blend-mode: difference; }
.custom-cursor.hovering { width: 48px; height: 48px; background: hsl(var(--primary) / 0.12); }
.cursor-dot { width: 5px; height: 5px; background: hsl(var(--primary)); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); }

.gradient-text { background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary))); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.glass { background: hsl(0 0% 100% / 0.03); backdrop-filter: blur(20px); border: 1px solid hsl(0 0% 100% / 0.06); }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }

@media (max-width: 768px) { .custom-cursor, .cursor-dot { display: none !important; } body { cursor: auto; } }` },
    { path: "src/App.tsx", content: `import { AnimatedCursor } from './components/AnimatedCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { LogoCloud } from './sections/LogoCloud';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { Stats } from './sections/Stats';
import { Pricing } from './sections/Pricing';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { CTA } from './sections/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <AnimatedCursor />
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}` },
    { path: "src/components/AnimatedCursor.tsx", content: `import { useEffect, useRef, useState } from 'react';
export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null); const dotRef = useRef<HTMLDivElement>(null); const [h, setH] = useState(false);
  useEffect(() => {
    const c = cursorRef.current, d = dotRef.current; if (!c || !d) return;
    let mx=0,my=0,cx=0,cy=0;
    const move = (e: MouseEvent) => { mx=e.clientX; my=e.clientY; d.style.left=mx+'px'; d.style.top=my+'px'; };
    const anim = () => { cx+=(mx-cx)*0.1; cy+=(my-cy)*0.1; c.style.left=cx+'px'; c.style.top=cy+'px'; requestAnimationFrame(anim); };
    document.addEventListener('mousemove', move); anim();
    const obs = new MutationObserver(() => { document.querySelectorAll('a,button,input,[role="button"]').forEach(el => { el.addEventListener('mouseenter', () => setH(true)); el.addEventListener('mouseleave', () => setH(false)); }); });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener('mousemove', move); obs.disconnect(); };
  }, []);
  return (<><div ref={cursorRef} className={\`custom-cursor \${h?'hovering':''}\`}/><div ref={dotRef} className="cursor-dot"/></>);
}` },
    { path: "src/components/Navbar.tsx", content: `import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Features', 'Pricing', 'FAQ'];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''}\`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-display font-bold">Saas<span className="text-primary">ify</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l} href={\`#\${l.toLowerCase()}\`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>)}
          <a href="#cta" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all">Get Started</a>
        </div>
        <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} className="md:hidden overflow-hidden border-b border-border">
            <div className="px-6 py-4 space-y-1">{links.map(l => <a key={l} href={\`#\${l.toLowerCase()}\`} onClick={() => setOpen(false)} className="block py-2.5 text-sm">{l}</a>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div><h3 className="font-display font-bold text-lg">Saas<span className="text-primary">ify</span></h3><p className="text-sm text-muted-foreground mt-2">Build better products, faster.</p></div>
        {[{ title: 'Product', items: ['Features', 'Pricing', 'Changelog', 'Roadmap'] }, { title: 'Company', items: ['About', 'Blog', 'Careers', 'Press'] }, { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] }].map(col => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
            {col.items.map(item => <a key={item} href="#" className="block text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors">{item}</a>)}
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">© 2024 SaaSify. Built by Sakshyam Kharel | CodeVault</div>
    </footer>
  );
}` },
    { path: "src/sections/Hero.tsx", content: `import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-medium mb-8">
          <Sparkles className="w-4 h-4" /> Now with AI-powered analytics
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95]">
          Build products<br /><span className="gradient-text">10x faster</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
          The all-in-one platform for modern teams. Ship features, track metrics, and delight users — from one place.
        </motion.p>
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#cta" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-primary/25 transition-all">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </a>
          <button className="px-8 py-4 rounded-full glass font-medium flex items-center gap-2 hover:bg-muted/40 transition-colors">
            <Play className="w-5 h-5" /> Watch Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/LogoCloud.tsx", content: `export function LogoCloud() {
  return (
    <section className="py-14 border-y border-border/50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-8 font-medium">Trusted by 2,000+ teams worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {['Google', 'Microsoft', 'Stripe', 'Vercel', 'GitHub', 'Shopify'].map(l => (
            <span key={l} className="text-lg font-bold text-muted-foreground/25 hover:text-muted-foreground/40 transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Features.tsx", content: `import { motion } from 'framer-motion';
import { BarChart3, Zap, Shield, Users, Code2, Globe } from 'lucide-react';

const features = [
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track every metric that matters with real-time dashboards and custom reports.', gradient: 'from-blue-500/10 to-cyan-500/10' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second load times with edge computing and intelligent caching.', gradient: 'from-amber-500/10 to-orange-500/10' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 compliant with E2E encryption, SSO, and audit logging.', gradient: 'from-emerald-500/10 to-teal-500/10' },
  { icon: Users, title: 'Team Collaboration', desc: 'Real-time editing, comments, and shared workspaces for your team.', gradient: 'from-violet-500/10 to-purple-500/10' },
  { icon: Code2, title: 'Developer API', desc: 'Full REST & GraphQL API with SDKs in 10+ languages.', gradient: 'from-rose-500/10 to-pink-500/10' },
  { icon: Globe, title: 'Global CDN', desc: 'Content delivered from 200+ edge locations worldwide.', gradient: 'from-sky-500/10 to-indigo-500/10' },
];

export function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold">Everything you need</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Powerful features to help you build, launch, and scale.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ delay: i*0.08 }}
              className={\`p-6 rounded-2xl glass bg-gradient-to-br \${f.gradient} group hover:border-primary/15 transition-all\`}>
              <div className="p-3 rounded-xl bg-background/50 w-fit mb-5 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/HowItWorks.tsx", content: `import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your free account in under 60 seconds. No credit card required.' },
  { step: '02', title: 'Connect', desc: 'Integrate with your existing tools and import data seamlessly.' },
  { step: '03', title: 'Build', desc: 'Use our visual builder and templates to create your product fast.' },
  { step: '04', title: 'Launch', desc: 'Deploy to production with one click and start growing.' },
];

export function HowItWorks() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">How it works</h2>
          <p className="text-muted-foreground mt-4">Get started in 4 simple steps</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ delay: i*0.12 }}
              className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-display font-bold text-lg mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                {s.step}
              </div>
              <h3 className="font-display font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Stats.tsx", content: `import { motion } from 'framer-motion';

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '2M+', label: 'API Requests / Day' },
  { value: '150+', label: 'Countries Served' },
  { value: '4.9/5', label: 'Customer Rating' },
];

export function Stats() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl glass p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold gradient-text">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Pricing.tsx", content: `import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  { name: 'Starter', price: 0, desc: 'For individuals', features: ['1 project', '1,000 events/mo', 'Basic analytics', 'Email support'], cta: 'Get Started Free', popular: false },
  { name: 'Pro', price: 29, desc: 'For growing teams', features: ['Unlimited projects', '100K events/mo', 'Advanced analytics', 'Priority support', 'Team collaboration', 'Custom domains'], cta: 'Start Free Trial', popular: true },
  { name: 'Enterprise', price: 99, desc: 'For large orgs', features: ['Everything in Pro', 'Unlimited events', 'Dedicated support', 'SSO & SAML', 'Custom contracts', 'SLA guarantee'], cta: 'Contact Sales', popular: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold">Simple pricing</h2>
          <p className="text-muted-foreground mt-4">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className={\`p-8 rounded-2xl relative transition-all \${plan.popular ? 'glass border-primary/20 shadow-xl shadow-primary/5' : 'glass'}\`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-lg">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
              <div className="mb-6"><span className="text-4xl font-display font-bold">\${plan.price}</span><span className="text-muted-foreground">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => <li key={f} className="flex items-center gap-2.5 text-sm"><Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}</li>)}
              </ul>
              <button className={\`w-full py-3.5 rounded-xl font-semibold text-sm transition-all \${
                plan.popular ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25' : 'glass hover:bg-muted/40'
              }\`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}` },
    { path: "src/sections/Testimonials.tsx", content: `import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Chen', role: 'CTO at StartupX', text: 'SaaSify cut our development time in half. The analytics alone are worth the investment.', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Marcus Rodriguez', role: 'Product Lead at DesignCo', text: 'We migrated from three different tools to SaaSify. Best decision we made all year.', gradient: 'from-violet-500 to-purple-400' },
  { name: 'James Park', role: 'Lead Dev at AgencyY', text: 'The API is incredible. Our entire team switched over in a weekend.', gradient: 'from-amber-500 to-orange-400' },
];

export function Testimonials() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">Loved by developers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="p-6 rounded-2xl glass hover:border-primary/15 transition-all">
              <div className="flex gap-0.5 mb-4">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={\`w-10 h-10 rounded-xl bg-gradient-to-br \${t.gradient} flex items-center justify-center text-white text-xs font-bold\`}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
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
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'How does the free trial work?', a: '14 days of full Pro access. No credit card required. Downgrade to Starter anytime.' },
  { q: 'Can I cancel anytime?', a: 'Yes, cancel your subscription at any time with no questions asked.' },
  { q: 'Do you offer refunds?', a: '30-day money-back guarantee on all paid plans.' },
  { q: 'What support options are available?', a: 'Starter: email. Pro: priority (<4hr). Enterprise: dedicated Slack channel.' },
  { q: 'Can I switch plans?', a: 'Upgrade or downgrade anytime. Changes take effect immediately with prorated billing.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-sm hover:bg-muted/30 transition-colors">
                {faq.q}
                <ChevronDown className={\`w-4 h-4 text-muted-foreground transition-transform duration-300 \${open === i ? 'rotate-180' : ''}\`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }}>
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
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
    <section id="cta" className="py-28 px-6">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5 rounded-3xl" />
        <div className="absolute inset-0 glass rounded-3xl" />
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Join 2,000+ teams shipping faster with SaaSify. Start free — no credit card required.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-primary/25 transition-all">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#" className="px-8 py-4 rounded-full glass font-medium hover:bg-muted/40 transition-colors">Talk to Sales</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}` },
    { path: "README.md", content: `# SaaSify — SaaS Landing Page

A high-converting SaaS landing page with animated cursor, glassmorphism, gradient effects, and Framer Motion animations.

## ✨ Features

- 🎯 Custom animated cursor
- 🌊 Ambient gradient backgrounds
- 🪟 Glassmorphism design system
- ✨ Scroll-triggered Framer Motion animations
- 📱 Fully responsive
- 💰 Interactive pricing cards
- ❓ Animated FAQ accordion
- 📊 Stats counter section
- ⭐ Testimonial cards with gradients
- 🚀 CTA section with glass overlay

Built by Sakshyam Kharel | CodeVault` },
  ];
}
