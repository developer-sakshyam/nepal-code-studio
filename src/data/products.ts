export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceUSD: number;
  techStack: string[];
  features: string[];
  capabilities: string[];
  category: string;
  image: string;
  featured: boolean;
}

// Shared capability keys used for real comparison
export const allCapabilities = [
  "Fully Responsive Design",
  "Dark/Light Mode",
  "Authentication System",
  "User Management",
  "Analytics Dashboard",
  "Data Tables",
  "Form Validation",
  "Shopping Cart",
  "Search & Filters",
  "Drag & Drop",
  "Animations & Transitions",
  "SEO Optimized",
  "Markdown/MDX Support",
  "API Integration Ready",
  "Performance Optimized",
  "Clean Documented Code",
];

export const products: Product[] = [
  {
    id: "saas-dashboard",
    name: "SaaS Admin Dashboard",
    tagline: "Complete admin panel with analytics and user management",
    description: "A fully responsive admin dashboard built with React and TypeScript. Includes authentication, user management, analytics charts, data tables, and a clean modern UI. Perfect for SaaS applications.",
    price: 4999,
    priceUSD: 38,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "React Query"],
    features: [
      "Fully responsive design",
      "Dark/Light mode support",
      "Authentication system",
      "User management module",
      "Analytics dashboard",
      "Data tables with sorting/filtering",
      "Form components with validation",
      "Clean, documented code"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Dark/Light Mode",
      "Authentication System",
      "User Management",
      "Analytics Dashboard",
      "Data Tables",
      "Form Validation",
      "API Integration Ready",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "ecommerce-storefront",
    name: "E-Commerce Storefront",
    tagline: "Modern online store with cart and checkout",
    description: "A sleek e-commerce frontend with product listings, categories, shopping cart, wishlist, and checkout flow. Built with performance and conversion optimization in mind.",
    price: 5999,
    priceUSD: 46,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    features: [
      "Product catalog with categories",
      "Advanced search and filters",
      "Shopping cart functionality",
      "Wishlist feature",
      "Checkout flow UI",
      "Order confirmation pages",
      "Responsive mobile design",
      "SEO optimized structure"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Shopping Cart",
      "Search & Filters",
      "Animations & Transitions",
      "SEO Optimized",
      "Form Validation",
      "API Integration Ready",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "portfolio-developer",
    name: "Developer Portfolio",
    tagline: "Stunning portfolio with animations and project showcase",
    description: "A creative developer portfolio template with smooth scroll animations, project gallery, skills section, blog integration, and contact form. Make a lasting impression.",
    price: 2999,
    priceUSD: 23,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX"],
    features: [
      "Hero section with animations",
      "Project showcase gallery",
      "Skills and experience section",
      "Blog/writing section",
      "Contact form with validation",
      "Social media integration",
      "Performance optimized",
      "Easy to customize"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Dark/Light Mode",
      "Animations & Transitions",
      "SEO Optimized",
      "Markdown/MDX Support",
      "Form Validation",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "blog-platform",
    name: "Blog Platform",
    tagline: "Clean blogging platform with markdown support",
    description: "A minimalist blog platform with markdown rendering, categories, tags, search, and reading time estimates. Perfect for personal blogs or content marketing.",
    price: 3499,
    priceUSD: 27,
    techStack: ["React", "TypeScript", "Tailwind CSS", "MDX", "Fuse.js"],
    features: [
      "Markdown/MDX support",
      "Category and tag system",
      "Full-text search",
      "Reading time estimates",
      "Related posts",
      "Newsletter signup",
      "RSS feed ready",
      "SEO optimized"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Search & Filters",
      "Markdown/MDX Support",
      "SEO Optimized",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "Blog",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: "landing-saas",
    name: "SaaS Landing Page",
    tagline: "High-converting landing page template",
    description: "A conversion-focused SaaS landing page with hero section, features grid, pricing table, testimonials, FAQ accordion, and CTA sections. Designed to convert visitors.",
    price: 1999,
    priceUSD: 15,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Animated hero section",
      "Feature highlights grid",
      "Pricing table component",
      "Testimonial carousel",
      "FAQ accordion",
      "CTA sections",
      "Mobile responsive",
      "Fast load times"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Animations & Transitions",
      "SEO Optimized",
      "Form Validation",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "Landing Page",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: "task-management",
    name: "Task Management App",
    tagline: "Kanban-style project management interface",
    description: "A Trello-inspired task management UI with drag-and-drop boards, task cards, labels, due dates, and team assignment features. Clean and intuitive interface.",
    price: 4499,
    priceUSD: 35,
    techStack: ["React", "TypeScript", "Tailwind CSS", "DnD Kit", "Date-fns"],
    features: [
      "Kanban board layout",
      "Drag-and-drop functionality",
      "Task cards with details",
      "Labels and priorities",
      "Due date management",
      "Team member assignment",
      "Board customization",
      "Activity timeline"
    ],
    capabilities: [
      "Fully Responsive Design",
      "Drag & Drop",
      "Search & Filters",
      "Animations & Transitions",
      "API Integration Ready",
      "Performance Optimized",
      "Clean Documented Code",
    ],
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    featured: false,
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
