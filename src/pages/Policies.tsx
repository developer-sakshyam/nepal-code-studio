import { motion } from "framer-motion";
import { Shield, FileText, Scale, HelpCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const policyCategories = [
  {
    id: "terms",
    icon: FileText,
    title: "Terms of Service",
    items: [
      {
        question: "Usage Rights",
        answer:
          "Upon purchase, you receive a single license to use the source code for personal or commercial projects. You may modify the code as needed for your projects. Reselling or redistributing the original source code is not permitted.",
      },
      {
        question: "License Scope",
        answer:
          "Each purchase grants you a license for one end product. If you wish to use the code in multiple projects, additional licenses must be purchased. The license is non-transferable.",
      },
      {
        question: "Updates & Support",
        answer:
          "Purchases include access to any updates released within 6 months of purchase. Basic email support is provided for installation and setup questions.",
      },
    ],
  },
  {
    id: "refund",
    icon: Scale,
    title: "Refund Policy",
    items: [
      {
        question: "Refund Eligibility",
        answer:
          "Due to the digital nature of our products, refunds are generally not provided once the source code has been delivered. However, we may consider refunds on a case-by-case basis for valid reasons.",
      },
      {
        question: "Requesting a Refund",
        answer:
          "To request a refund, please contact us within 7 days of purchase with a detailed explanation of your issue. We will review your request and respond within 3-5 business days.",
      },
      {
        question: "Non-Refundable Situations",
        answer:
          "Refunds will not be provided if you have downloaded the source code, if you changed your mind after purchase, or if your project requirements have changed.",
      },
    ],
  },
  {
    id: "privacy",
    icon: Shield,
    title: "Privacy Policy",
    items: [
      {
        question: "Data Collection",
        answer:
          "We collect only essential information required to process your purchase, including name, email address, and payment information. We do not sell or share your personal data with third parties.",
      },
      {
        question: "Data Security",
        answer:
          "Your information is protected using industry-standard security measures. Payment processing is handled by secure third-party providers (eSewa) and we do not store your payment details.",
      },
      {
        question: "Cookies & Analytics",
        answer:
          "We use essential cookies to maintain your session and may use analytics to improve our website. You can disable non-essential cookies in your browser settings.",
      },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What format is the source code delivered in?",
        answer:
          "Source code is delivered as a ZIP file containing the complete project files, including all dependencies, configuration files, and documentation.",
      },
      {
        question: "Do I need technical knowledge to use the products?",
        answer:
          "Basic knowledge of React, JavaScript/TypeScript, and npm/yarn is recommended. Each product includes setup instructions and documentation.",
      },
      {
        question: "Can I request custom modifications?",
        answer:
          "Yes! Contact us through the contact page to discuss custom modification requests. Additional fees may apply depending on the scope of work.",
      },
      {
        question: "How do I receive the source code after purchase?",
        answer:
          "After payment is confirmed, you will receive a download link via email. The link remains active for 30 days and allows up to 3 downloads.",
      },
    ],
  },
];

const Policies = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Policies & <span className="gradient-text">FAQ</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Important information about terms, refunds, privacy, and frequently asked questions.
            </p>
          </AnimatedSection>

          {/* Policy Sections */}
          <div className="space-y-8">
            {policyCategories.map((category, categoryIndex) => (
              <AnimatedSection key={category.id} delay={categoryIndex * 0.1}>
                <GlassCard>
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                    >
                      <category.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h2 className="font-display font-bold text-2xl">
                      {category.title}
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`${category.id}-${itemIndex}`}
                        className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-muted/30"
                      >
                        <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact CTA */}
          <AnimatedSection delay={0.5} className="mt-12 text-center">
            <GlassCard>
              <h3 className="font-display font-semibold text-xl mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Feel free to reach out and I'll be happy to help.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
              >
                Contact Me
              </motion.a>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Policies;
