import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a question about a product or want to discuss a custom project? 
              I'd love to hear from you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <AnimatedSection
              animation="slide-left"
              className="lg:col-span-2 space-y-6"
            >
              <GlassCard>
                <h3 className="font-display font-semibold text-xl mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Sakshyam Kharel</p>
                      <p className="text-muted-foreground text-sm">
                        Independent Software Developer
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">Nepal</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">
                        hello@codevault.com
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-muted-foreground text-sm">
                    I typically respond within 24-48 hours. For urgent inquiries, 
                    please mention it in your message.
                  </p>
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="slide-right" className="lg:col-span-3">
              <GlassCard>
                <h3 className="font-display font-semibold text-xl mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <motion.label
                      animate={{
                        y: focusedField === "name" || formData.name ? -24 : 0,
                        scale:
                          focusedField === "name" || formData.name ? 0.85 : 1,
                        color:
                          focusedField === "name"
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground))",
                      }}
                      className="absolute left-3 top-3 origin-left pointer-events-none transition-all"
                    >
                      Your Name
                    </motion.label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary pt-4"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <motion.label
                      animate={{
                        y: focusedField === "email" || formData.email ? -24 : 0,
                        scale:
                          focusedField === "email" || formData.email ? 0.85 : 1,
                        color:
                          focusedField === "email"
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground))",
                      }}
                      className="absolute left-3 top-3 origin-left pointer-events-none transition-all"
                    >
                      Email Address
                    </motion.label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="bg-muted/50 border-border/50 focus:border-primary pt-4"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <motion.label
                      animate={{
                        y:
                          focusedField === "message" || formData.message
                            ? -24
                            : 0,
                        scale:
                          focusedField === "message" || formData.message
                            ? 0.85
                            : 1,
                        color:
                          focusedField === "message"
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground))",
                      }}
                      className="absolute left-3 top-3 origin-left pointer-events-none transition-all"
                    >
                      Your Message
                    </motion.label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="bg-muted/50 border-border/50 focus:border-primary pt-6 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
