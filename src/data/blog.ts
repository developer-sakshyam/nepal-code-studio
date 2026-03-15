export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "building-modern-react-apps",
    title: "Building Modern React Apps: Best Practices for 2026",
    excerpt: "Explore the latest patterns, tools, and techniques that make React development faster and more maintainable than ever.",
    content: `React continues to evolve, and staying up-to-date with modern practices is essential. In this guide, we explore the patterns that define professional React development in 2026.

## Component Architecture

The key to maintainable React apps is proper component architecture. Use composition over inheritance, keep components small and focused, and leverage custom hooks for shared logic.

## State Management

With React's built-in hooks and modern libraries like Zustand, state management has become much simpler. Choose the right tool based on your app's complexity — don't over-engineer.

## TypeScript First

TypeScript is no longer optional. It provides type safety, better IDE support, and serves as living documentation for your codebase.

## Performance Optimization

Use React.memo, useMemo, and useCallback wisely. Profile your app before optimizing — premature optimization is the root of all evil.

## Testing

Write tests that give you confidence. Focus on integration tests that test user behavior rather than implementation details.`,
    author: "Sakshyam Kharel",
    date: "2026-03-10",
    readTime: "6 min read",
    category: "Tutorial",
    tags: ["React", "TypeScript", "Best Practices"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: "tailwind-css-design-system",
    title: "Creating a Design System with Tailwind CSS",
    excerpt: "Learn how to build a consistent, scalable design system using Tailwind CSS custom tokens and component variants.",
    content: `A well-crafted design system is the foundation of any professional application. Tailwind CSS makes it easy to create one that's both flexible and consistent.

## Design Tokens

Start with CSS custom properties for your core design tokens — colors, spacing, typography, and shadows. This gives you a single source of truth.

## Component Variants

Use class-variance-authority (CVA) to create type-safe component variants. This ensures consistency across your entire application.

## Responsive Design

Tailwind's responsive utilities make it simple to create layouts that work on every device. Think mobile-first and progressively enhance.

## Dark Mode

With CSS custom properties, supporting dark mode is straightforward. Define your color palette for both modes in your design tokens.`,
    author: "Sakshyam Kharel",
    date: "2026-02-28",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Tailwind CSS", "Design System", "CSS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: "framer-motion-animations",
    title: "Smooth Animations with Framer Motion in React",
    excerpt: "Master the art of creating fluid, performant animations that enhance user experience without sacrificing performance.",
    content: `Animations can make or break a user interface. Framer Motion makes it easy to add smooth, performant animations to your React apps.

## Why Framer Motion?

Framer Motion provides a declarative API that integrates seamlessly with React. It handles spring physics, gesture recognition, and layout animations out of the box.

## Best Practices

Keep animations subtle and purposeful. Every animation should serve a function — guiding attention, providing feedback, or creating spatial context.

## Performance

Use the transform and opacity properties for animations — they're GPU-accelerated and won't cause layout reflows. Framer Motion handles this automatically.

## Accessibility

Always respect the prefers-reduced-motion media query. Framer Motion makes this easy with the useReducedMotion hook.`,
    author: "Sakshyam Kharel",
    date: "2026-02-15",
    readTime: "7 min read",
    category: "Tutorial",
    tags: ["Framer Motion", "Animation", "React"],
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: "selling-source-code-nepal",
    title: "My Journey Selling Source Code as a Solo Dev in Nepal",
    excerpt: "Lessons learned building a digital product business as an independent developer from Nepal.",
    content: `Building a sustainable business as a solo developer in Nepal comes with unique challenges and opportunities. Here's what I've learned.

## Finding Your Niche

Focus on what you know best. For me, that was React-based projects with modern tooling. Quality over quantity always wins.

## Pricing Strategy

Pricing in NPR while showing USD equivalents helps both local and international customers understand the value proposition.

## Building Trust

As a solo developer, your reputation is everything. Clean code, good documentation, and responsive support build long-term trust.

## The Tech Stack

I chose React, TypeScript, Tailwind CSS, and Vite because they represent the modern standard. Customers want code they can maintain.`,
    author: "Sakshyam Kharel",
    date: "2026-01-20",
    readTime: "4 min read",
    category: "Insights",
    tags: ["Business", "Solo Dev", "Nepal"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    id: "new-product-saas-dashboard",
    title: "Introducing: SaaS Admin Dashboard v2.0",
    excerpt: "Our most popular product just got a major update with new features, better performance, and a refreshed design.",
    content: `We're excited to announce the release of SaaS Admin Dashboard v2.0 — our most comprehensive update yet.

## What's New

- Completely redesigned analytics dashboard
- New user management module with role-based access
- Dark/Light mode with system preference detection
- 40% faster initial load time
- New chart components powered by Recharts

## Migration Guide

Upgrading from v1.x is straightforward. We've maintained backward compatibility for all core APIs while adding new features on top.

## What's Next

We're already working on v2.1, which will include real-time notifications, advanced filtering, and export functionality.`,
    author: "Sakshyam Kharel",
    date: "2026-03-01",
    readTime: "3 min read",
    category: "Product Update",
    tags: ["Dashboard", "SaaS", "Product Update"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    featured: true,
  },
];

export const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
