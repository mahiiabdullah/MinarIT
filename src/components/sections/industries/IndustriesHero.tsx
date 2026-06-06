"use client";

import { motion } from "framer-motion";
import { Utensils, HeartPulse, Globe2, ShoppingCart, GraduationCap, Factory } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const industries = [
  { id: "restaurant", name: "Restaurants", icon: Utensils, color: "hover:border-amber-500 hover:text-amber-500" },
  { id: "healthcare", name: "Healthcare", icon: HeartPulse, color: "hover:border-emerald-500 hover:text-emerald-500" },
  { id: "ngo", name: "NGOs", icon: Globe2, color: "hover:border-blue-500 hover:text-blue-500" },
  { id: "ecommerce", name: "E-Commerce", icon: ShoppingCart, color: "hover:border-pink-500 hover:text-pink-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "hover:border-yellow-500 hover:text-yellow-500" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "hover:border-slate-400 hover:text-slate-400" },
];

export default function IndustriesHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
      </div>

      <div className="section-container relative z-10 w-full flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-block">
            <span className="badge badge-primary px-4 py-2 text-sm">
              Industry Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-balance"
          >
            We Speak Your <br className="hidden md:block" />
            <span className="gradient-text">Industry&apos;s Language</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 text-balance leading-relaxed"
          >
            Generic software fails businesses because it doesn&apos;t understand their specific operations. We build tailored operating systems for your world.
          </motion.p>
          
          {/* Interactive Industry Cards */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
          >
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => scrollTo(ind.id)}
                  className={`glass-card p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group cursor-pointer ${ind.color}`}
                >
                  <Icon className="w-8 h-8 text-text-muted transition-colors duration-300 group-hover:text-inherit" />
                  <span className="text-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-inherit">
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
