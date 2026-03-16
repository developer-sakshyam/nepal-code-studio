import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  AlertCircle,
  Download,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { products } from "@/data/products";
import { downloadProductCode } from "@/utils/generateProductCode";

const steps = [
  { id: 1, name: "Order Review" },
  { id: 2, name: "Payment" },
  { id: 3, name: "Complete" },
];

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display font-bold text-3xl mb-4">
            Product Not Found
          </h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleDownload = () => {
    downloadProductCode(product);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
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

        {/* Demo Notice */}
        <AnimatedSection delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/20 border border-secondary/30 mb-8"
          >
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">Demo Checkout</p>
              <p className="text-sm text-muted-foreground">
                This is a demo checkout flow. No real payment will be processed. You can download demo source code after completing.
              </p>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Progress Steps */}
        <AnimatedSection delay={0.2}>
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
              <motion.div
                className="absolute top-5 left-0 h-0.5 bg-primary"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    currentStep === 1
                      ? "0%"
                      : currentStep === 2
                      ? "50%"
                      : "100%",
                }}
                transition={{ duration: 0.5 }}
              />
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      backgroundColor:
                        step.id <= currentStep
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted))",
                      scale: step.id === currentStep ? 1.1 : 1,
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <span
                        className={
                          step.id <= currentStep
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {step.id}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`mt-2 text-sm ${
                      step.id <= currentStep
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {/* Step 1: Order Review */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <h2 className="font-display font-bold text-2xl mb-6">
                  Order Review
                </h2>
                <div className="flex items-start gap-4 pb-6 border-b border-border/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {product.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="py-6 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>NPR {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>NPR 0</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary">
                      NPR {product.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground text-right">
                    (~${product.priceUSD} USD)
                  </p>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Payment
                </Button>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <h2 className="font-display font-bold text-2xl mb-6">
                  Payment Method
                </h2>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer mb-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#60BB46] flex items-center justify-center">
                      <span className="font-bold text-white text-lg">eSewa</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">eSewa</h3>
                      <p className="text-muted-foreground text-sm">
                        Pay with eSewa digital wallet
                      </p>
                    </div>
                    <Check className="w-6 h-6 text-primary ml-auto" />
                  </div>
                </motion.div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                  <Lock className="w-4 h-4" />
                  <span>Demo mode — no actual payment will be processed</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-border/50 mb-6">
                  <span className="text-muted-foreground">Total to pay</span>
                  <span className="font-display font-bold text-2xl text-primary">
                    NPR {product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Pay Now (Demo)
                      </>
                    )}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Complete */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="text-center">
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <motion.svg
                    viewBox="0 0 50 50"
                    className="w-12 h-12"
                  >
                    <motion.path
                      d="M14 27l7 7 16-16"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="font-display font-bold text-2xl mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Demo Purchase Complete!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Your demo source code is ready to download. This contains sample code for <strong className="text-foreground">{product.name}</strong>.
                  </p>

                  {/* Download Button - Now functional */}
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleDownload}
                    className="group"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce-subtle" />
                    Download Source Code
                  </Button>

                  <p className="text-xs text-muted-foreground mt-4">
                    Demo source code file • {product.techStack.join(", ")}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button variant="outline" asChild>
                      <Link to="/products">Browse More Products</Link>
                    </Button>
                    <Button variant="glass" asChild>
                      <Link to="/">Return Home</Link>
                    </Button>
                  </div>
                </motion.div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Checkout;
