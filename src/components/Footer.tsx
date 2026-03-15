import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail, MapPin, Heart } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const techStack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/compare", label: "Compare" },
  { href: "/contact", label: "Contact" },
  { href: "/policies", label: "Policies" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/30 bg-background/40 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 rounded-xl liquid-glass-solid"
                >
                  <Code2 className="w-5 h-5 text-foreground" />
                </motion.div>
                <span className="font-display font-bold text-xl gradient-text">
                  CodeVault
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Premium software source code crafted with precision and modern best practices.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Nepal</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.2}>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-foreground">Built With</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.3}>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-foreground">Developer</h4>
              <div className="space-y-3">
                <p className="text-foreground font-medium">Sakshyam Kharel</p>
                <p className="text-muted-foreground text-sm">
                  Independent Software Developer — Nepal
                </p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="mailto:contact@example.com"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 rounded-xl liquid-glass-btn"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 rounded-xl liquid-glass-btn"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 rounded-xl liquid-glass-btn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CodeVault. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-destructive animate-pulse" /> in Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
