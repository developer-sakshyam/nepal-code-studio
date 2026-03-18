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
    { path: "tailwind.config.js", content: `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{ts,tsx}'],\n  theme: {\n    extend: {\n      colors: {\n        background: 'hsl(var(--background))',\n        foreground: 'hsl(var(--foreground))',\n        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },\n        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },\n        border: 'hsl(var(--border))',\n        card: 'hsl(var(--card))',\n      }\n    }\n  },\n  plugins: []\n};` },
    { path: "postcss.config.js", content: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };` },
    { path: ".gitignore", content: "node_modules\ndist\n.env\n*.log" },
    { path: "index.html", content: `<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>ShopVault - Modern E-Commerce</title></head>\n<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>\n</html>` },
    { path: "src/main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode><App /></React.StrictMode>\n);` },
    { path: "src/index.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222 47% 11%;\n  --card: 0 0% 100%;\n  --primary: 160 60% 45%;\n  --primary-foreground: 0 0% 100%;\n  --muted: 210 40% 96%;\n  --muted-foreground: 215 20% 45%;\n  --border: 214 32% 91%;\n  --radius: 0.75rem;\n}\n\nbody { @apply bg-background text-foreground antialiased; }\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --background: 222 47% 6%;\n    --foreground: 210 40% 98%;\n    --card: 222 47% 9%;\n    --primary: 160 60% 50%;\n    --primary-foreground: 222 47% 6%;\n    --muted: 222 30% 14%;\n    --muted-foreground: 215 20% 55%;\n    --border: 222 30% 16%;\n  }\n}` },
    { path: "src/App.tsx", content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

interface WishlistStore {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist((set, get) => ({
    items: [],
    toggle: (id) => set((s) => ({
      items: s.items.includes(id) ? s.items.filter(i => i !== id) : [...s.items, id]
    })),
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

export function Navbar() {
  const itemCount = useCartStore(s => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-tight">Shop<span className="text-primary">Vault</span></Link>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({ isActive }) => \`text-sm font-medium transition-colors \${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => \`text-sm font-medium transition-colors \${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}\`}>Shop</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-full hover:bg-muted"><Search className="w-5 h-5" /></button>
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-muted"><Heart className="w-5 h-5" /></Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">{itemCount}</span>}
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <input autoFocus placeholder="Search products..." className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none focus:border-primary" />
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Home</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Shop</Link>
          </div>
        )}
      </div>
    </nav>
  );
}` },
    { path: "src/components/Footer.tsx", content: `import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg">Shop<span className="text-primary">Vault</span></h3>
          <p className="text-sm text-muted-foreground mt-2">Premium products for modern lifestyle.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Shop</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/shop" className="block hover:text-foreground">All Products</Link>
            <a href="#" className="block hover:text-foreground">New Arrivals</a>
            <a href="#" className="block hover:text-foreground">Sale</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Support</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#" className="block hover:text-foreground">Contact Us</a>
            <a href="#" className="block hover:text-foreground">Shipping</a>
            <a href="#" className="block hover:text-foreground">Returns</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Newsletter</h4>
          <div className="flex gap-2">
            <input placeholder="Enter email" className="flex-1 px-3 py-2 rounded-lg border border-border text-sm bg-muted" />
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2024 ShopVault. All rights reserved. Built by Sakshyam Kharel | CodeVault
      </div>
    </footer>
  );
}` },
    { path: "src/components/ProductCard.tsx", content: `import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { Product } from '../data/products';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const isWished = has(product.id);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} className="rounded-2xl overflow-hidden bg-card border border-border group relative">
      <Link to={\`/product/\${product.id}\`} className="block relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">{product.badge}</span>}
      </Link>
      <button onClick={() => toggle(product.id)} className={\`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors \${isWished ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white text-foreground'}\`}>
        <Heart className={\`w-4 h-4 \${isWished ? 'fill-current' : ''}\`} />
      </button>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to={\`/product/\${product.id}\`}><h3 className="font-semibold group-hover:text-primary transition-colors">{product.name}</h3></Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary font-bold text-lg">\${product.price}</span>
          {product.originalPrice && <span className="text-sm text-muted-foreground line-through">\${product.originalPrice}</span>}
        </div>
        <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
          className="mt-3 w-full py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}` },
    { path: "src/pages/Home.tsx", content: `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
];

export default function Home() {
  return (
    <div>
      <section className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl relative z-10">
          <span className="text-sm text-primary font-medium mb-4 block">New Season Collection</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Discover Your<br /><span className="text-primary">Style</span></h1>
          <p className="text-lg text-muted-foreground mb-8">Curated collections for the modern lifestyle. Quality pieces that last.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all">Shop Now <ArrowRight className="w-5 h-5" /></Link>
            <a href="#featured" className="px-8 py-4 rounded-full border border-border font-medium hover:bg-muted transition-colors">View Collection</a>
          </div>
        </motion.div>
      </section>

      <section className="py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10"><f.icon className="w-6 h-6 text-primary" /></div>
              <div><h3 className="font-semibold">{f.title}</h3><p className="text-sm text-muted-foreground">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="featured" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/shop" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-primary/5 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">Get 10% off your first order and stay updated on new arrivals.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input placeholder="Your email address" className="flex-1 px-4 py-3 rounded-full border border-border text-sm bg-background" />
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}` },
    { path: "src/pages/Shop.tsx", content: `import { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-primary bg-muted" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={\`px-4 py-2 rounded-full text-sm capitalize font-medium transition-colors \${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}\`}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 rounded-xl border border-border text-sm bg-muted">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}` },
    { path: "src/pages/ProductDetail.tsx", content: `import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const { toggle, has } = useWishlistStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) return <div className="p-12 text-center"><h1 className="text-2xl font-bold mb-4">Product not found</h1><Link to="/shop" className="text-primary hover:underline">Back to shop</Link></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground"><ArrowLeft className="w-4 h-4" /> Back to Shop</Link>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img src={product.images[selectedImg]} alt={product.name} className="w-full rounded-2xl aspect-square object-cover" />
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)} className={\`w-20 h-20 rounded-xl overflow-hidden border-2 \${selectedImg === i ? 'border-primary' : 'border-transparent'}\`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.badge && <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{product.badge}</span>}
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">{Array.from({ length: 5 }, (_, i) => <Star key={i} className={\`w-4 h-4 \${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}\`} />)}</div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-primary">\${product.price}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">\${product.originalPrice}</span>}
          </div>
          <p className="text-muted-foreground mt-4">{product.description}</p>

          {product.sizes && (
            <div className="mt-6">
              <h3 className="font-medium text-sm mb-2">Size</h3>
              <div className="flex gap-2">{product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} className={\`px-4 py-2 rounded-lg text-sm border \${selectedSize === s ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-foreground'}\`}>{s}</button>
              ))}</div>
            </div>
          )}

          {product.colors && (
            <div className="mt-4">
              <h3 className="font-medium text-sm mb-2">Color</h3>
              <div className="flex gap-2">{product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} className={\`px-4 py-2 rounded-lg text-sm border \${selectedColor === c ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-foreground'}\`}>{c}</button>
              ))}</div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted">-</button>
              <span className="px-4 py-2 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-muted">+</button>
            </div>
            <button onClick={() => { for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, image: product.image }); }}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button onClick={() => toggle(product.id)} className={\`p-3 rounded-xl border \${has(product.id) ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border hover:border-foreground'}\`}>
              <Heart className={\`w-5 h-5 \${has(product.id) ? 'fill-current' : ''}\`} />
            </button>
          </div>

          <div className="mt-8 space-y-3">
            {[{ icon: Truck, text: 'Free shipping on orders over $50' }, { icon: Shield, text: '2-year warranty included' }, { icon: RefreshCw, text: '30-day hassle-free returns' }].map(f => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-muted-foreground"><f.icon className="w-4 h-4" /> {f.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Cart.tsx", content: `import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
      <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet.</p>
      <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">Start Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-foreground"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary font-bold mt-1">\${item.price}</p>
              </div>
              <div className="flex items-center gap-1 border border-border rounded-lg">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-muted rounded"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-muted rounded"><Plus className="w-4 h-4" /></button>
              </div>
              <p className="font-bold w-20 text-right">\${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItem(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-xl bg-card border border-border h-fit sticky top-20">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>\${total().toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{total() > 50 ? 'Free' : '$5.99'}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border"><span>Total</span><span>\${(total() > 50 ? total() : total() + 5.99).toFixed(2)}</span></div>
          </div>
          <Link to="/checkout" className="mt-4 block w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-medium">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}` },
    { path: "src/pages/Checkout.tsx", content: `import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { Check, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-primary" /></div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-2">Order #ORD-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
      <p className="text-sm text-muted-foreground">We'll send you a confirmation email shortly.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">Shipping Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="First Name" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <input placeholder="Last Name" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <input placeholder="Email" type="email" className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <input placeholder="Address" className="sm:col-span-2 px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <input placeholder="City" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <input placeholder="ZIP Code" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">Payment</h2>
          <div className="space-y-4">
            <input placeholder="Card Number" className="w-full px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="MM / YY" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
              <input placeholder="CVC" className="px-4 py-2.5 rounded-xl border border-border text-sm bg-muted" />
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-2"><span>{item.name} x{item.quantity}</span><span>\${(item.price * item.quantity).toFixed(2)}</span></div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-4 mt-4 border-t border-border"><span>Total</span><span>\${total().toFixed(2)}</span></div>
        </div>
        <button onClick={() => { clearCart(); setDone(true); }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" /> Place Order — \${total().toFixed(2)}
        </button>
      </div>
    </div>
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
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
      <p className="text-muted-foreground mb-6">Save items you love for later.</p>
      <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">Browse Products</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Wishlist ({wishedProducts.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishedProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}` },
    { path: "README.md", content: `# E-Commerce Storefront

A modern, full-featured e-commerce storefront built with React, TypeScript, Zustand, and Tailwind CSS.

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## ✨ Features

- 🛒 **Shopping Cart** — Persistent cart with Zustand + localStorage
- ❤️ **Wishlist** — Save favorite products
- 🔍 **Search & Filter** — Category filters, search, and sorting
- 📦 **Product Detail** — Image gallery, sizes, colors, quantity picker
- 💳 **Checkout** — Multi-step form with order summary
- 📱 **Responsive** — Mobile-first design
- ⭐ **Ratings & Reviews** — Product rating display
- 📧 **Newsletter** — Email signup section
- 🏠 **Landing Page** — Hero, featured products, trust badges

## 🛠 Tech Stack

React 18 • TypeScript • Tailwind CSS • Zustand • Framer Motion • React Router v6 • Lucide Icons

## 📁 Structure

\`\`\`
src/
├── components/     # Navbar, Footer, ProductCard
├── store/          # Zustand stores (cart, wishlist)
├── data/           # Product data
├── pages/          # Home, Shop, ProductDetail, Cart, Checkout, Wishlist
└── App.tsx
\`\`\`

Built with ❤️ by Sakshyam Kharel | CodeVault
` },
  ];
}
