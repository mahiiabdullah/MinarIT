"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Can I pay in installments?",
    answer: "Yes. For one-time projects, we typically structure payments in milestones: 30% to kick off the project, 40% upon beta delivery, and 30% upon final launch and successful training."
  },
  {
    question: "What if the project goes over scope?",
    answer: "We map the exact scope before writing a single line of code. The price we quote is the price you pay. If you want to add entirely new features mid-project, we will scope them separately as a Phase 2."
  },
  {
    question: "Do I own the code at the end?",
    answer: "Absolutely. Once the final invoice is paid, you own 100% of the source code, data, and infrastructure. You are not locked into our ecosystem."
  },
  {
    question: "Is hosting included in the price?",
    answer: "Hosting and 3rd-party API costs (like OpenAI or Twilio) are billed directly to you at cost so you own the accounts. However, if you are on our Monthly Retainer, basic cloud hosting is included in the fee."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes! Many clients start with the Starter package to automate a single bottleneck, and then upgrade to Growth or Enterprise once they see the ROI."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, major credit cards (via Stripe), and mobile financial services (bKash/Nagad) for local clients."
  }
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-background-secondary relative border-t border-surface-border">
      <div className="section-container max-w-4xl">
        <SectionHeading
          badge="Clear Answers"
          title="Pricing"
          highlight="FAQ"
          description="Everything you need to know about how we structure our contracts and handle payments."
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
