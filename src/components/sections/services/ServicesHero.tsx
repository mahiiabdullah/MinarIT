"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const serviceSections = [
  { id: "custom-systems", label: "Custom Systems" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "whatsapp-agents", label: "WhatsApp Agents" },
  { id: "analytics", label: "Analytics" },
  { id: "mobile-apps", label: "Mobile Apps" },
  { id: "ai-documents", label: "Document Gen" },
];

export default function ServicesHero() {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  // Track scroll position to show/hide sticky nav and determine active section
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past hero
      if (window.scrollY > 400) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      // Determine active section based on scroll position
      let current = "";
      for (const section of serviceSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is somewhat near the top of the viewport
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky nav/header
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background pt-32 pb-20">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        </div>

        <div className="section-container relative z-10 w-full">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6 inline-block">
              <span className="badge badge-accent px-4 py-2 text-sm">
                Our Capabilities
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-balance"
            >
              Everything Your Business Needs to <br className="hidden md:block" />
              <span className="gradient-text">Run on Autopilot</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 text-balance leading-relaxed"
            >
              From the first line of code to the last automated report — we build and maintain systems that replace manual work permanently.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <button 
                onClick={() => scrollTo("custom-systems")}
                className="btn-gradient"
              >
                Explore Services
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Side Navigation (Desktop Only) */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block"
          >
            <div className="glass-card p-3 rounded-full flex flex-col gap-2">
              {serviceSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`relative group w-3 h-3 rounded-full transition-all duration-300 ${
                    activeSection === section.id ? "bg-primary scale-125" : "bg-surface-border hover:bg-text-secondary"
                  }`}
                  aria-label={section.label}
                >
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-surface-elevated border border-surface-border rounded text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md">
                    {section.label}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
