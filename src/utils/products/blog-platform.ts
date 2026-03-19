import { FileEntry } from "../generateProductCode";

export function getBlogPlatformFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({ name: "blog-platform", version: "1.0.0", private: true, type: "module", scripts: { dev: "vite", build: "tsc && vite build" }, dependencies: { react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0", "date-fns": "^3.6.0", "lucide-react": "^0.400.0" }, devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" } }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
    { path: "vite.config.ts", content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport path from 'path';\nexport default defineConfig({ plugins: [react()], resolve: { alias: { '@': path.resolve(__dirname, './src') } } });` },
    { path: "tailwind.config.js", content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
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
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="DevBlog - Thoughts on code, design, and building for the web"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
  <title>DevBlog</title>
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 40 20% 98%;
  --foreground: 20 15% 10%;
  --card: 40 20% 100%;
  --primary: 24 80% 50%;
  --primary-foreground: 40 20% 98%;
  --muted: 40 10% 94%;
  --muted-foreground: 20 10% 45%;
  --border: 40 10% 88%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 228 20% 5%;
    --foreground: 40 10% 95%;
    --card: 228 18% 8%;
    --primary: 24 80% 55%;
    --primary-foreground: 228 20% 5%;
    --muted: 228 15% 12%;
    --muted-foreground: 40 10% 55%;
    --border: 228 15% 14%;
  }
}

body { @apply bg-background text-foreground antialiased font-sans; cursor: none; }
html { scroll-behavior: smooth; }

.custom-cursor {
  width: 18px; height: 18px; border: 2px solid hsl(var(--primary)); border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9999;
  transition: transform 0.15s, width 0.2s, height 0.2s, background 0.2s;
  transform: translate(-50%, -50%);
}
.custom-cursor.hovering { width: 44px; height: 44px; background: hsl(var(--primary) / 0.1); }
.cursor-dot { width: 4px; height: 4px; background: hsl(var(--primary)); border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); }

.reading-progress { position: fixed; top: 0; left: 0; height: 3px; z-index: 9999; background: hsl(var(--primary)); transform-origin: left; }

@media (max-width: 768px) { .custom-cursor, .cursor-dot { display: none !important; } body { cursor: auto; } }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }

/* Prose styles */
.prose h1, .prose h2, .prose h3 { @apply font-display font-bold mt-8 mb-4; }
.prose h1 { @apply text-3xl; }
.prose h2 { @apply text-2xl; }
.prose h3 { @apply text-xl; }
.prose p { @apply mb-4 leading-relaxed; }
.prose ul, .prose ol { @apply mb-4 pl-6; }
.prose li { @apply mb-2; }
.prose code { @apply px-1.5 py-0.5 rounded bg-muted text-sm font-mono; }
.prose pre { @apply p-4 rounded-xl bg-muted overflow-x-auto mb-4; }
.prose pre code { @apply bg-transparent p-0; }
.prose blockquote { @apply border-l-4 border-primary pl-4 italic text-muted-foreground my-6; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatedCursor } from './components/AnimatedCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedCursor />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}` },
    { path: "src/components/AnimatedCursor.tsx", content: `import { useEffect, useRef, useState } from 'react';

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current, dot = dotRef.current;
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; };
    const anim = () => { cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; requestAnimationFrame(anim); };
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    document.addEventListener('mousemove', move); anim();
    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener('mousemove', move); obs.disconnect(); };
  }, []);

  return (<><div ref={cursorRef} className={\`custom-cursor \${hovering ? 'hovering' : ''}\`} /><div ref={dotRef} className="cursor-dot" /></>);
}` },
    { path: "src/data/posts.ts", content: `export interface Post {
  slug: string; title: string; excerpt: string; content: string;
  author: string; date: string; category: string; tags: string[];
  readTime: number; image: string;
}

export const posts: Post[] = [
  {
    slug: 'getting-started-react', title: 'Getting Started with React in 2024',
    excerpt: 'A comprehensive guide to starting your React journey with modern tooling and best practices.',
    content: '# Getting Started with React\\n\\nReact remains the most popular frontend library in 2024. Let\\'s explore how to get started.\\n\\n## Prerequisites\\n\\n- Node.js 18+ installed\\n- A code editor (VS Code recommended)\\n- Basic HTML, CSS, and JavaScript knowledge\\n\\n## Creating Your First Project\\n\\n\\\`\\\`\\\`bash\\nnpm create vite@latest my-react-app -- --template react-ts\\ncd my-react-app\\nnpm install\\nnpm run dev\\n\\\`\\\`\\\`\\n\\n## Understanding Components\\n\\nReact apps are built from components — reusable pieces of UI that manage their own state.\\n\\n\\\`\\\`\\\`tsx\\nfunction Welcome({ name }: { name: string }) {\\n  return <h1>Hello, {name}!</h1>;\\n}\\n\\\`\\\`\\\`\\n\\n## State Management\\n\\nFor local state, use useState. For global state, consider Zustand or React Context.\\n\\n## Next Steps\\n\\n- Learn React Router for navigation\\n- Explore TanStack Query for data fetching\\n- Try Tailwind CSS for styling',
    author: 'Sakshyam Kharel', date: '2024-03-15', category: 'Tutorial', tags: ['React', 'JavaScript', 'TypeScript'], readTime: 8, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
  },
  {
    slug: 'tailwind-css-tips', title: '10 Tailwind CSS Tips You Need to Know',
    excerpt: 'Level up your Tailwind CSS skills with these professional tips and design patterns.',
    content: '# 10 Tailwind CSS Tips\\n\\n## 1. Use @apply Sparingly\\nOverusing @apply defeats utility-first CSS.\\n\\n## 2. Custom Design Tokens\\nExtend tailwind.config.js with custom colors and typography.\\n\\n## 3. Dark Mode\\nUse the dark: variant for easy theming.\\n\\n## 4. Responsive Design\\nStart mobile-first with sm:, md:, lg: breakpoints.\\n\\n## 5. Group Hover\\nUse group and group-hover: for parent-child effects.\\n\\n## 6. Arbitrary Values\\nBracket notation for one-offs: w-[calc(100%-2rem)]\\n\\n## 7. Animations\\nLeverage animate-pulse, animate-spin, custom keyframes.\\n\\n## 8. Container Queries\\n@container for component-level responsive design.\\n\\n## 9. Typography Plugin\\n@tailwindcss/typography for beautiful prose.\\n\\n## 10. VS Code Extension\\nTailwind CSS IntelliSense for autocomplete.',
    author: 'Sakshyam Kharel', date: '2024-03-10', category: 'Tips', tags: ['CSS', 'Tailwind', 'Design'], readTime: 5, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800'
  },
  {
    slug: 'typescript-best-practices', title: 'TypeScript Best Practices for 2024',
    excerpt: 'Write better TypeScript with proven patterns and techniques used by top teams.',
    content: '# TypeScript Best Practices\\n\\n## Enable Strict Mode\\nAlways enable strict in tsconfig.json.\\n\\n## Discriminated Unions\\n\\\`\\\`\\\`typescript\\ntype Result<T> = \\n  | { success: true; data: T }\\n  | { success: false; error: string };\\n\\\`\\\`\\\`\\n\\n## Prefer Interfaces\\nUse interfaces for object shapes, types for unions.\\n\\n## Avoid \\'any\\'\\nUse \\'unknown\\' instead when type is truly unknown.\\n\\n## Leverage Generics\\nWrite reusable, type-safe functions.\\n\\n## Utility Types\\nMaster Partial, Required, Pick, Omit, Record.',
    author: 'Sakshyam Kharel', date: '2024-03-05', category: 'Tutorial', tags: ['TypeScript', 'JavaScript'], readTime: 7, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800'
  },
  {
    slug: 'building-rest-apis-node', title: 'Building REST APIs with Node.js and Express',
    excerpt: 'Learn how to build production-ready REST APIs with proper architecture and error handling.',
    content: '# Building REST APIs\\n\\nNode.js with Express remains a popular choice for REST APIs.\\n\\n## Setup\\nInitialize project and install deps.\\n\\n## Routing\\nOrganize routes by resource.\\n\\n## Middleware\\nAuth, logging, error handling.\\n\\n## Database\\nPostgreSQL or MongoDB for persistence.\\n\\n## Validation\\nValidate with Zod or Joi.\\n\\n## Error Handling\\nGlobal error handler for consistent responses.',
    author: 'Sakshyam Kharel', date: '2024-02-28', category: 'Tutorial', tags: ['Node.js', 'Express', 'API'], readTime: 10, image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800'
  },
];

export const categories = [...new Set(posts.map(p => p.category))];` },
    { path: "src/components/Navbar.tsx", content: `import { Link } from 'react-router-dom';
import { Menu, X, Rss } from 'lucide-react';
import { useState, useEffect } from 'react';
import { categories } from '../data/posts';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={\`sticky top-0 z-50 transition-all duration-300 \${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-background'}\`}>
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Rss className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold">Dev<span className="text-primary">Blog</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {categories.map(c => (
            <Link key={c} to={\`/category/\${c}\`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
              {c}
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
        <button className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-border">
            <div className="px-6 py-3 space-y-1">
              {categories.map(c => <Link key={c} to={\`/category/\${c}\`} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium hover:text-primary transition-colors">{c}</Link>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `export function Footer() {
  return (
    <footer className="py-12 border-t border-border mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>© 2024 DevBlog. Crafted with care by Sakshyam Kharel</p>
      </div>
    </footer>
  );
}` },
    { path: "src/components/PostCard.tsx", content: `import { Link } from 'react-router-dom';
import { Post } from '../data/posts';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function PostCard({ post, featured = false, index = 0 }: { post: Post; featured?: boolean; index?: number }) {
  if (featured) return (
    <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="group">
      <Link to={\`/post/\${post.slug}\`} className="block rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5">
        <div className="aspect-[21/9] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{post.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors mb-3">{post.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );

  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="group">
      <Link to={\`/post/\${post.slug}\`} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-border hover:bg-muted/30 px-4 -mx-4 rounded-xl transition-colors">
        <img src={post.image} alt={post.title} loading="lazy" className="w-full sm:w-52 h-40 sm:h-36 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{post.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
            <span>{post.date}</span>
          </div>
          <h2 className="text-lg font-display font-bold group-hover:text-primary transition-colors mb-2">{post.title}</h2>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
          <span className="text-sm text-primary flex items-center gap-1 font-semibold">Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
        </div>
      </Link>
    </motion.article>
  );
}` },
    { path: "src/pages/Home.tsx", content: `import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [search, setSearch] = useState('');
  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
  const [featured, ...rest] = filtered;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">DevBlog</h1>
        <p className="text-lg text-muted-foreground mt-2 font-serif italic">Thoughts on code, design, and building for the web.</p>
      </motion.div>

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts by title or tag..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm bg-card transition-all" />
      </div>

      {featured && <div className="mb-16"><PostCard post={featured} featured /></div>}
      <div>{rest.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}</div>
    </div>
  );
}` },
    { path: "src/pages/PostPage.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const h = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (!post) return <div className="p-16 text-center"><h1 className="text-xl font-bold">Post not found</h1></div>;

  const related = posts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <>
      <div className="reading-progress" style={{ transform: \`scaleX(\${progress})\` }} />
      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>

        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="flex gap-2 mb-10">
          {post.tags.map(t => <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{t}</span>)}
        </div>

        <div className="prose font-serif text-foreground/85 text-[17px] leading-[1.8] whitespace-pre-line">{post.content}</div>

        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border">
            <h2 className="text-2xl font-display font-bold mb-8">Related Posts</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map(r => (
                <Link key={r.slug} to={\`/post/\${r.slug}\`} className="group rounded-2xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all">
                  <img src={r.image} alt={r.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-5">
                    <span className="text-xs text-primary font-semibold">{r.category}</span>
                    <h3 className="font-display font-bold mt-1 group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.readTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </>
  );
}` },
    { path: "src/pages/CategoryPage.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { PostCard } from '../components/PostCard';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { category } = useParams();
  const filtered = posts.filter(p => p.category === category);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> All Posts
      </Link>
      <h1 className="text-3xl font-display font-bold mb-2">{category}</h1>
      <p className="text-muted-foreground mb-10">{filtered.length} post{filtered.length !== 1 ? 's' : ''} in this category</p>
      <div>{filtered.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}</div>
    </motion.div>
  );
}` },
    { path: "README.md", content: `# DevBlog — Blog Platform

A beautiful, content-focused blog with editorial typography, animated cursor, reading progress, and smooth transitions.

## ✨ Features

- 🎯 Custom animated cursor
- 📖 Reading progress indicator on articles
- 🔍 Full-text search by title & tags
- 📂 Category pages with filtering
- ⏱ Reading time estimation
- 🔗 Related posts section
- 📱 Fully responsive design
- ✨ Framer Motion page transitions
- 🎨 Editorial serif typography for content
- 🌗 Light & dark mode support

Built by Sakshyam Kharel | CodeVault` },
  ];
}
