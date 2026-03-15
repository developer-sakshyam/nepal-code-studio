import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Plus, Trash2, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { products, allCapabilities, Product } from "@/data/products";

const Compare = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    setShowSelector(false);
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const availableProducts = products.filter(
    (p) => !selectedProducts.find((sp) => sp.id === p.id)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Compare <span className="gradient-text">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select up to 3 products to compare capabilities, tech stacks, and pricing side by side.
            </p>
          </AnimatedSection>

          {/* Product Selector */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 mb-12 justify-center">
              {selectedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <GlassCard className="flex items-center gap-3 !p-3 pr-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-sm">{product.name}</span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-1 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </GlassCard>
                </motion.div>
              ))}
              {selectedProducts.length < 3 && (
                <motion.div layout>
                  <Button
                    variant="outline"
                    onClick={() => setShowSelector(!showSelector)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product ({3 - selectedProducts.length} left)
                  </Button>
                </motion.div>
              )}
            </div>
          </AnimatedSection>

          {/* Product Selector Dropdown */}
          <AnimatePresence>
            {showSelector && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-12"
              >
                <GlassCard>
                  <h3 className="font-display font-semibold text-lg mb-4">Select a product to compare</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableProducts.map((product) => (
                      <motion.button
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addProduct(product)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            NPR {product.price.toLocaleString()}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comparison Table */}
          {selectedProducts.length >= 2 ? (
            <AnimatedSection delay={0.2}>
              <div className="overflow-x-auto">
                <GlassCard className="min-w-[600px]">
                  {/* Header Row */}
                  <div className="grid gap-4 pb-6 border-b border-border/50 mb-6" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                    <div className="font-display font-semibold text-muted-foreground flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-primary" />
                      Compare
                    </div>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-24 rounded-xl object-cover mb-3"
                        />
                        <h3 className="font-display font-semibold">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price Row */}
                  <div className="grid gap-4 py-4 border-b border-border/30" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">Price</div>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <span className="font-display font-bold text-xl text-primary">
                          NPR {product.price.toLocaleString()}
                        </span>
                        <p className="text-xs text-muted-foreground">(~${product.priceUSD})</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="grid gap-4 py-4 border-b border-border/30" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                    <div className="font-medium text-muted-foreground">Tech Stack</div>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {product.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities - Real comparison */}
                  <div className="mt-4">
                    <h4 className="font-display font-semibold mb-4">Capabilities</h4>
                    {allCapabilities.map((capability, index) => (
                      <div
                        key={index}
                        className={`grid gap-4 py-3 ${index < allCapabilities.length - 1 ? 'border-b border-border/20' : ''}`}
                        style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                      >
                        <div className="text-sm text-muted-foreground">{capability}</div>
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="text-center">
                            {product.capabilities.includes(capability) ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                              >
                                <Check className="w-5 h-5 text-primary mx-auto" />
                              </motion.div>
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* CTA Row */}
                  <div className="grid gap-4 pt-6 mt-6 border-t border-border/50" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                    <div />
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <Button variant="hero" size="sm" asChild className="w-full">
                          <Link to={`/products/${product.id}`} className="flex items-center justify-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.2}>
              <GlassCard className="text-center py-16">
                <GitCompare className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2">
                  Select at least 2 products
                </h3>
                <p className="text-muted-foreground mb-6">
                  Choose products from above to see a detailed side-by-side comparison.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </GlassCard>
            </AnimatedSection>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
