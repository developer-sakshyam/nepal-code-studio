import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Zap, 
  Shield, 
  Sparkles,
  Package,
  Star,
  ChevronDown,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { products, Product } from "@/data/products";
import { HeroParticles } from "@/components/HeroParticles";
import { FloatingScene } from "@/components/FloatingScene";
import { ProductPreviewModal } from "@/components/ProductPreviewModal";

const HeroSection = () => {
  const titleWords = ["Premium", "Source", "Code", "for", "Modern", "Developers"];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated particles background */}
      <HeroParticles />
      
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">By an independent developer from Nepal</span>
        </motion.div>

        {/* Title with staggered animation */}
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-3 ${
                index < 3 ? "gradient-text" : "text-foreground"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          High-quality, production-ready React projects with modern tech stacks. 
          Build faster, launch sooner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/products" className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16"
        >
          {[
            { value: "6+", label: "Products" },
            { value: "100%", label: "React & TypeScript" },
            { value: "NPR", label: "Local Pricing" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display font-bold text-2xl md:text-3xl text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Well-structured, documented, and following best practices for maintainability.",
    },
    {
      icon: Zap,
      title: "Modern Stack",
      description: "Built with React, TypeScript, Tailwind CSS, and other cutting-edge technologies.",
    },
    {
      icon: Shield,
      title: "Production Ready",
      description: "Tested, optimized, and ready to deploy to your preferred hosting platform.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Why Choose <span className="gradient-text">CodeVault</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every project is crafted with attention to detail and professional standards.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <GlassCard className="h-full text-center group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular source code packages, ready to accelerate your development.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1}>
              <Link to={`/products/${product.id}`}>
                <GlassCard className="h-full overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/90 text-primary-foreground font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.tagline}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.techStack.slice(0, 3).map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <span className="font-display font-bold text-2xl text-primary">
                        NPR {product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        (~${product.priceUSD})
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-primary"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </GlassCard>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="w-6 h-6 text-primary fill-primary" />
              </motion.div>
            ))}
          </div>
          <blockquote className="font-display text-2xl md:text-3xl font-medium mb-6 text-foreground">
            "Clean code, modern design, and excellent documentation. 
            Saved me weeks of development time."
          </blockquote>
          <p className="text-muted-foreground">
            — A satisfied developer
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <GlassCard className="text-center py-12 md:py-16 relative overflow-hidden">
            {/* Background elements */}
            <motion.div
              className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />

            <div className="relative z-10">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Ready to <span className="gradient-text">accelerate</span> your project?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Browse our collection of premium source code and start building today.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/products" className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
