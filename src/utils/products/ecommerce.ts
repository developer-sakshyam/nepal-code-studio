import { FileEntry } from "../generateProductCode";

export function getEcommerceFiles(): FileEntry[] {
  return [
    { path: "package.json", content: JSON.stringify({
      name: "ecommerce-storefront", version: "1.0.0", private: true, type: "module",
      scripts: { dev: "vite", build: "tsc && vite build", preview: "vite preview" },
      dependencies: {
        react: "^18.3.0", "react-dom": "^18.3.0", "react-router-dom": "^6.26.0",
        zustand: "^4.5.0", "framer-motion": "^11.3.0", tailwindcss: "^3.4.0",
        "lucide-react": "^0.400.0", "clsx": "^2.1.0"
      },
      devDependencies: { "@types/react": "^18.3.0", "@types/react-dom": "^18.3.0", vite: "^5.4.0", "@vitejs/plugin-react": "^4.3.0", autoprefixer: "^10.4.0", postcss: "^8.4.0" }
    }, null, 2) },
    { path: "tsconfig.json", content: JSON.stringify({ compilerOptions: { target: "ES2020", module: "ESNext", lib: ["ES2020","DOM","DOM.Iterable"], jsx: "react-jsx", strict: true, moduleResolution: "bundler", allowImportingTsExtensions: true, noEmit: true, paths: { "@/*": ["./src/*"] } }, include: ["src"] }, null, 2) },
    { path: "vite.config.ts", content: `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport path from 'path';\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: { alias: { '@': path.resolve(__dirname, './src') } }\n});` },
    { path: "tailwind.config.js", content: `/** @type {import('tailwindcss').Config} */
export default {
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
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
      },
      keyframes: {
        'slide-in': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
      animation: { 'slide-in': 'slide-in 0.3s ease-out' },
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
  <meta name="description" content="ShopVault - Premium curated products for modern lifestyle"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"/>
  <title>ShopVault - Modern E-Commerce</title>
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode><App /></React.StrictMode>\n);` },
    { path: "src/index.css", content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 8%;
  --card: 0 0% 100%;
  --primary: 152 68% 42%;
  --primary-foreground: 0 0% 100%;
  --muted: 220 14% 96%;
  --muted-foreground: 215 20% 42%;
  --border: 220 13% 91%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 228 20% 5%;
    --foreground: 210 40% 98%;
    --card: 228 18% 8%;
    --primary: 152 68% 50%;
    --primary-foreground: 228 20% 5%;
    --muted: 228 15% 12%;
    --muted-foreground: 215 20% 50%;
    --border: 228 15% 14%;
  }
}

body { @apply bg-background text-foreground antialiased font-sans; cursor: none; }

/* Animated cursor */
.custom-cursor {
  width: 18px; height: 18px;
  border: 2px solid hsl(var(--foreground));
  border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999;
  transition: transform 0.15s, width 0.2s, height 0.2s, border-color 0.2s, background 0.2s;
  transform: translate(-50%, -50%);
}
.custom-cursor.hovering {
  width: 44px; height: 44px;
  background: hsl(var(--primary) / 0.1);
  border-color: hsl(var(--primary));
}
.cursor-dot {
  width: 4px; height: 4px; background: hsl(var(--foreground));
  border-radius: 50%; position: fixed; pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
}

/* Scroll progress */
.scroll-progress { position: fixed; top: 0; left: 0; height: 2px; z-index: 9999; background: hsl(var(--primary)); transform-origin: left; }

@media (max-width: 768px) { .custom-cursor, .cursor-dot { display: none !important; } body { cursor: auto; } }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatedCursor } from './components/AnimatedCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedCursor />
      <ScrollProgress />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
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
    const anim = () => { cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; requestAnimationFrame(anim); };
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    document.addEventListener('mousemove', move);
    anim();
    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, select, [role="button"]').forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener('mousemove', move); obs.disconnect(); };
  }, []);

  return (<><div ref={cursorRef} className={\`custom-cursor \${hovering ? 'hovering' : ''}\`} /><div ref={dotRef} className="cursor-dot" /></>);
}` },
    { path: "src/components/ScrollProgress.tsx", content: `import { useEffect, useState } from 'react';
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => setP(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return <div className="scroll-progress" style={{ transform: \`scaleX(\${p})\` }} />;
}` },
    { path: "src/store/cartStore.ts", content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; name: string; price: number; quantity: number; image: string; size?: string; color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
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
    updateQuantity: (id, qty) => set((s) => ({
      items: qty <= 0 ? s.items.filter(i => i.id !== id) : s.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
    })),
    clearCart: () => set({ items: [] }),
    total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  }), { name: 'shop-cart' })
);` },
    { path: "src/store/wishlistStore.ts", content: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore { items: string[]; toggle: (id: string) => void; has: (id: string) => boolean; }

export const useWishlistStore = create<WishlistStore>()(
  persist((set, get) => ({
    items: [],
    toggle: (id) => set((s) => ({ items: s.items.includes(id) ? s.items.filter(i => i !== id) : [...s.items, id] })),
    has: (id) => get().items.includes(id),
  }), { name: 'shop-wishlist' })
);` },
    { path: "src/data/products.ts", content: `export interface Product {
  id: string; name: string; price: number; originalPrice?: number;
  image: string; images: string[]; category: string;
  description: string; rating: number; reviews: number;
  sizes?: string[]; colors?: string[]; inStock: boolean; badge?: string;
}

export const products: Product[] = [
  { id: '1', name: 'Classic White Tee', price: 29.99, originalPrice: 39.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800'], category: 'clothing', description: 'Premium cotton t-shirt with a relaxed fit. Perfect for everyday wear.', rating: 4.5, reviews: 128, sizes: ['S','M','L','XL'], colors: ['White','Black','Gray'], inStock: true, badge: 'Sale' },
  { id: '2', name: 'Leather Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'], category: 'accessories', description: 'Handcrafted genuine leather backpack with multiple compartments.', rating: 4.8, reviews: 64, inStock: true, badge: 'Best Seller' },
  { id: '3', name: 'Running Shoes Pro', price: 119.99, originalPrice: 149.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'], category: 'shoes', description: 'Lightweight performance running shoes with responsive cushioning.', rating: 4.7, reviews: 256, sizes: ['8','9','10','11','12'], colors: ['Red','Black','Blue'], inStock: true },
  { id: '4', name: 'Denim Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800'], category: 'clothing', description: 'Classic denim jacket with a modern slim fit.', rating: 4.3, reviews: 89, sizes: ['S','M','L','XL'], inStock: true },
  { id: '5', name: 'Aviator Sunglasses', price: 49.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'], category: 'accessories', description: 'UV400 protected aviator sunglasses with metal frame.', rating: 4.6, reviews: 312, colors: ['Gold','Silver','Black'], inStock: true },
  { id: '6', name: 'Canvas Sneakers', price: 59.99, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800'], category: 'shoes', description: 'Comfortable everyday canvas sneakers with rubber sole.', rating: 4.4, reviews: 176, sizes: ['7','8','9','10','11'], colors: ['White','Navy','Red'], inStock: true },
  { id: '7', name: 'Wool Beanie', price: 24.99, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400', images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800'], category: 'accessories', description: 'Warm merino wool beanie for cold weather.', rating: 4.2, reviews: 45, colors: ['Black','Gray','Navy'], inStock: true, badge: 'New' },
  { id: '8', name: 'Slim Fit Chinos', price: 64.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800'], category: 'clothing', description: 'Comfortable stretch chinos with a modern slim fit.', rating: 4.5, reviews: 203, sizes: ['28','30','32','34','36'], colors: ['Khaki','Navy','Black','Olive'], inStock: true },
];

export const categories = ['all', ...new Set(products.map(p => p.category))];` },
    { path: "src/components/Navbar.tsx", content: `import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, Search, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const itemCount = useCartStore(s => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-display font-bold tracking-tight">
            Shop<span className="text-primary">Vault</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }].map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) => \`text-sm font-medium transition-colors relative group \${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Link to="/wishlist" className="p-2.5 rounded-xl hover:bg-muted transition-colors"><Heart className="w-5 h-5" /></Link>
            <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-muted transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {itemCount}
                </motion.span>
              )}
            </Link>
            <button className="md:hidden p-2.5 rounded-xl hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden">
              <div className="pb-4 space-y-1">
                {[{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }].map(l => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium hover:text-primary transition-colors">{l.label}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display font-bold text-lg">Shop<span className="text-primary">Vault</span></h3>
          <p className="text-sm text-muted-foreground mt-2">Premium products for modern lifestyle.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Shop</h4>
          <div className="space-y-2.5 text-sm text-muted-foreground">
            <Link to="/shop" className="block hover:text-foreground transition-colors">All Products</Link>
            <a href="#" className="block hover:text-foreground transition-colors">New Arrivals</a>
            <a href="#" className="block hover:text-foreground transition-colors">Sale</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Support</h4>
          <div className="space-y-2.5 text-sm text-muted-foreground">
            <a href="#" className="block hover:text-foreground transition-colors">Contact Us</a>
            <a href="#" className="block hover:text-foreground transition-colors">Shipping & Returns</a>
            <a href="#" className="block hover:text-foreground transition-colors">FAQ</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4">Newsletter</h4>
          <p className="text-xs text-muted-foreground mb-3">Get 10% off your first order</p>
          <div className="flex gap-2">
            <input placeholder="Enter email" className="flex-1 px-3 py-2 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
            <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © 2024 ShopVault. All rights reserved. Built by Sakshyam Kharel | CodeVault
      </div>
    </footer>
  );
}` },
    { path: "src/components/ProductCard.tsx", content: `import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { Product } from '../data/products';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const isWished = has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="rounded-2xl overflow-hidden bg-card border border-border group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      <Link to={\`/product/\${product.id}\`} className="block relative aspect-[4/5] overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={(e) => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, image: product.image }); }}
            className="flex-1 py-2.5 rounded-xl bg-white/90 backdrop-blur text-foreground text-sm font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          <button onClick={(e) => { e.preventDefault(); toggle(product.id); }}
            className={\`p-2.5 rounded-xl backdrop-blur transition-colors \${isWished ? 'bg-red-500 text-white' : 'bg-white/90 text-foreground hover:bg-white'}\`}>
            <Heart className={\`w-4 h-4 \${isWished ? 'fill-current' : ''}\`} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={\`w-3 h-3 \${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted'}\`} />)}</div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to={\`/product/\${product.id}\`}><h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{product.name}</h3></Link>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-primary font-display font-bold text-lg">\${product.price}</span>
          {product.originalPrice && <span className="text-xs text-muted-foreground line-through">\${product.originalPrice}</span>}
        </div>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Home.tsx", content: `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', desc: '256-bit encryption' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center max-w-3xl relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary font-medium mb-6">
            <Sparkles className="w-4 h-4" /> New Season Collection
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.95]">
            Discover Your<br /><span className="text-primary">Style</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-lg mx-auto">
            Curated collections of premium products for the modern lifestyle. Quality pieces that last.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all">
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#featured" className="px-8 py-4 rounded-full border border-border font-medium hover:bg-muted transition-colors">
              View Collection
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0"><f.icon className="w-6 h-6 text-primary" /></div>
              <div><h3 className="font-semibold text-sm">{f.title}</h3><p className="text-xs text-muted-foreground">{f.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold">Featured Products</h2>
            <p className="text-sm text-muted-foreground mt-1">Hand-picked for you</p>
          </div>
          <Link to="/shop" className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-12 md:p-16 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Join the Club</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Get 10% off your first order and stay updated on new arrivals and exclusive offers.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input placeholder="Your email address" className="flex-1 px-5 py-3 rounded-full border border-border text-sm bg-background focus:outline-none focus:border-primary transition-colors" />
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all">Subscribe</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}` },
    { path: "src/pages/Shop.tsx", content: `import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Shop() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let result = category === 'all' ? products : products.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-8">Shop All Products</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary bg-muted transition-colors" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={\`px-4 py-2 rounded-full text-sm capitalize font-medium transition-all \${
                  category === c ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted hover:bg-muted/80'
                }\`}>{c}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-2 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </motion.div>
    </div>
  );
}` },
    { path: "src/pages/ProductDetail.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, Shield, RefreshCw, Minus, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center"><h1 className="text-xl font-bold mb-2">Product not found</h1>
        <Link to="/shop" className="text-primary hover:underline text-sm">← Back to Shop</Link>
      </div>
    </div>
  );

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize, color: selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="rounded-2xl overflow-hidden bg-muted aspect-square">
            <img src={product.images[activeImg] || product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={\`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors \${activeImg === i ? 'border-primary' : 'border-border hover:border-muted-foreground'}\`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.badge && <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{product.badge}</span>}
          <h1 className="text-3xl font-display font-bold">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={\`w-4 h-4 \${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted'}\`} />)}</div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-display font-bold text-primary">\${product.price}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">\${product.originalPrice}</span>}
          </div>
          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          {product.colors && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Color</p>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={\`px-4 py-2 rounded-xl border text-sm font-medium transition-all \${selectedColor === c ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-muted-foreground'}\`}>{c}</button>
                ))}
              </div>
            </div>
          )}
          {product.sizes && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={\`w-12 h-12 rounded-xl border text-sm font-medium transition-all \${selectedSize === s ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-muted-foreground'}\`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 border border-border rounded-xl">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted transition-colors rounded-l-xl"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-muted transition-colors rounded-r-xl"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={handleAdd}
              className={\`flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all \${
                added ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20'
              }\`}>
              {added ? <><Check className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <button onClick={() => toggle(product.id)}
              className={\`p-3.5 rounded-xl border transition-all \${has(product.id) ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border hover:border-muted-foreground'}\`}>
              <Heart className={\`w-5 h-5 \${has(product.id) ? 'fill-current' : ''}\`} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-border">
            {[{ icon: Truck, text: 'Free Shipping' }, { icon: Shield, text: 'Secure Pay' }, { icon: RefreshCw, text: '30d Returns' }].map(f => (
              <div key={f.text} className="flex flex-col items-center gap-1.5 text-center">
                <f.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Cart.tsx", content: `import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
      <h1 className="text-xl font-display font-bold mb-2">Your cart is empty</h1>
      <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">Start Shopping</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>
      <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
              <motion.div key={item.id} layout exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 rounded-2xl border border-border hover:border-primary/15 transition-colors">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  {(item.size || item.color) && <p className="text-xs text-muted-foreground mt-0.5">{[item.size, item.color].filter(Boolean).join(' / ')}</p>}
                  <p className="text-primary font-display font-bold mt-1">\${item.price}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-border rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors rounded-l-lg"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors rounded-r-lg"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="p-6 rounded-2xl border border-border h-fit sticky top-24">
          <h3 className="font-display font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>\${total().toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary font-medium">Free</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
              <span>Total</span><span className="text-primary">\${total().toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm text-center mt-6 hover:shadow-lg hover:shadow-primary/20 transition-all">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Checkout.tsx", content: `import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
        <CheckCircle2 className="w-20 h-20 text-primary mb-4" />
      </motion.div>
      <h1 className="text-2xl font-display font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-6">Thank you for your purchase.</p>
      <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">Continue Shopping</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
      <form onSubmit={(e) => { e.preventDefault(); clearCart(); setDone(true); }} className="space-y-6">
        <div className="p-6 rounded-2xl border border-border space-y-4">
          <h3 className="font-semibold">Shipping Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="First Name" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
            <input placeholder="Last Name" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
          </div>
          <input placeholder="Address" required className="w-full px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
          <div className="grid sm:grid-cols-3 gap-4">
            <input placeholder="City" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
            <input placeholder="State" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
            <input placeholder="ZIP" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border space-y-4">
          <h3 className="font-semibold">Payment</h3>
          <input placeholder="Card Number" required className="w-full px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="MM/YY" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
            <input placeholder="CVC" required className="px-4 py-3 rounded-xl border border-border text-sm bg-muted focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-border">
          <div className="flex justify-between mb-2"><span className="text-muted-foreground">Items ({items.length})</span><span>\${total().toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
          <div className="border-t border-border pt-3 flex justify-between font-bold text-lg mt-2"><span>Total</span><span className="text-primary">\${total().toFixed(2)}</span></div>
        </div>
        <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-xl hover:shadow-primary/20 transition-all">
          Place Order — \${total().toFixed(2)}
        </button>
      </form>
    </motion.div>
  );
}` },
    { path: "src/pages/Wishlist.tsx", content: `import { useWishlistStore } from '../store/wishlistStore';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { items } = useWishlistStore();
  const wishedProducts = products.filter(p => items.includes(p.id));

  if (wishedProducts.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
      <h1 className="text-xl font-display font-bold mb-2">Your wishlist is empty</h1>
      <p className="text-sm text-muted-foreground mb-6">Save items you love for later.</p>
      <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">Browse Products</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Wishlist ({wishedProducts.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}` },
    { path: "README.md", content: `# ShopVault — E-Commerce Storefront

A professional, modern e-commerce storefront with animated cursor, responsive design, and smooth animations.

## ✨ Features

- 🛒 Full shopping cart with Zustand state management
- ❤️ Wishlist with persistent storage
- 🎯 Custom animated cursor with hover effects
- 📊 Scroll progress indicator
- 🔍 Product search, filter, and sort
- 📱 Fully responsive with mobile navigation
- 🎨 Framer Motion staggered card animations
- ✅ Animated checkout success state
- 📦 Product detail with image gallery & size/color selection

## 🚀 Getting Started

\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`

Built by Sakshyam Kharel | CodeVault` },
  ];
}
