import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  Package,
  Code2,
  FileCode,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display font-bold text-3xl mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <AnimatedSection>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <AnimatedSection animation="slide-left">
            <div className="relative rounded-2xl overflow-hidden group">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full aspect-video object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-4 py-2 rounded-lg bg-primary/90 text-primary-foreground font-medium text-sm">
                  {product.category}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection animation="slide-right">
            <div className="space-y-6">
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <GlassCard className="inline-flex items-baseline gap-3">
                <span className="font-display font-bold text-4xl text-primary">
                  NPR {product.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  (~${product.priceUSD} USD)
                </span>
              </GlassCard>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Tech Stack */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium text-sm border border-border/50"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link
                    to={`/checkout/${product.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now — NPR {product.price.toLocaleString()}
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* What You Get Section */}
        <section className="mt-16">
          <AnimatedSection>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <Package className="w-7 h-7 text-primary" />
              What You Get
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/30"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary" />
                  </motion.div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Code2,
              title: "Clean Code",
              description: "Well-organized and documented codebase",
            },
            {
              icon: FileCode,
              title: "Full Source",
              description: "Complete source code with no restrictions",
            },
            {
              icon: Layers,
              title: "Modern Stack",
              description: "Built with latest technologies and best practices",
            },
          ].map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <GlassCard className="text-center h-full">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
