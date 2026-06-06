"use client";

import { motion } from "framer-motion";
import { Calendar, MessageSquare, Phone } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ContactHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank"); // Replace with actual WhatsApp number
  };

  return (
    <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-block">
            <span className="badge badge-primary px-4 py-2 text-sm">
              Contact Us
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
          >
            Let&apos;s Talk About <br />
            <span className="gradient-text">Your Business</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary mb-12"
          >
            No sales pitch. Just a real conversation about what you&apos;re trying to build.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => scrollTo("contact-form")}
              className="w-full sm:w-auto glass-card px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/5 transition-all group"
            >
              <Calendar className="w-5 h-5 text-primary-light group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary">Book a Call</span>
            </button>
            
            <button 
              onClick={() => scrollTo("contact-form")}
              className="w-full sm:w-auto glass-card px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-primary/50 hover:bg-white/5 transition-all group"
            >
              <MessageSquare className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary">Send a Message</span>
            </button>

            <button 
              onClick={openWhatsApp}
              className="w-full sm:w-auto glass-card px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-[#25D366]/50 hover:bg-white/5 transition-all group"
            >
              <Phone className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span className="font-medium text-text-primary">WhatsApp Us</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
