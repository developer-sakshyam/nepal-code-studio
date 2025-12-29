import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { products, categories } from "@/data/products";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Browse <span className="gradient-text">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Production-ready source code packages to accelerate your development workflow.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sticky top-16 md:top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
              {selectedCategory && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
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
                          {product.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 text-xs rounded-full bg-secondary/90 text-secondary-foreground font-medium">
                                Featured
                              </span>
                            </div>
                          )}
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
                          {product.techStack.slice(0, 4).map((tech) => (
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
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
