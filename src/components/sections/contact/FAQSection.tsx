"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "How long does it take to build a system?",
    answer: "Most custom systems take between 4 to 12 weeks to build and deploy. We work in agile sprints, meaning you'll often see usable components within the first 3 weeks. Complex enterprise architectures with custom ML models may take longer."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes. Our 'Starter' packages are specifically designed for small businesses that need to automate one major bottleneck—like a WhatsApp booking agent or a basic inventory tracker—without the enterprise price tag."
  },
  {
    question: "What happens after the system is built?",
    answer: "We don't just hand over the code and disappear. We handle the deployment, train your staff, and provide continuous monitoring. You'll have an SLA (Service Level Agreement) ensuring 99.9% uptime and rapid bug fixes."
  },
  {
    question: "Can you integrate with our existing tools?",
    answer: "Absolutely. We build via APIs. Whether you use QuickBooks, Shopify, existing legacy databases, or proprietary hardware, we can build custom connectors to ensure data flows seamlessly into your new system."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we structure our payments based on project milestones (e.g., 30% upfront, 40% at beta launch, 30% upon final delivery). For long-term maintenance and AI hosting, we offer predictable monthly retainers."
  },
  {
    question: "Can the system work in Bengali?",
    answer: "Yes. Our WhatsApp AI agents and dashboard interfaces can be fully localized. We train the AI to understand natural Bengali, English, and Banglish (Romanized Bengali) so your local customers and staff can interact naturally."
  },
  {
    question: "What if we need changes after launch?",
    answer: "Business operations evolve, and your software should too. Our continuous optimization phase allows us to easily tweak AI prompts, add new fields to your database, or adjust workflows as your business grows."
  },
  {
    question: "How do you handle data security?",
    answer: "We use bank-grade encryption (AES-256) for data at rest and in transit. We deploy to secure, isolated cloud environments (AWS/GCP), and can even offer on-premise deployments for highly sensitive healthcare or financial data. We also sign NDAs."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-background-secondary relative border-t border-surface-border">
      <div className="section-container max-w-4xl">
        <SectionHeading
          badge="Clear Answers"
          title="Frequently Asked"
          highlight="Questions"
          description="Everything you need to know about working with us, how we price, and how we ensure your data is secure."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="bg-surface border border-surface-border rounded-xl overflow-hidden transition-colors hover:border-primary/40"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-display font-bold text-lg transition-colors ${isOpen ? "text-primary-light" : "text-text-primary"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-primary/20 text-primary-light" : "bg-surface-elevated text-text-muted"}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
