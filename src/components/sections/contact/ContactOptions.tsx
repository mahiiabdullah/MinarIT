"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function ContactOptions() {
  return (
    <section className="section-padding bg-background relative pt-0">
      <div className="section-container">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Email */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8 h-full flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-primary-light" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Email Us</h3>
              <a href="mailto:hello@minar.agency" className="text-primary-light hover:underline mb-2">
                hello@minar.agency
              </a>
              <p className="text-sm text-text-secondary mt-auto pt-4">
                We respond within 4 hours
              </p>
            </GlassCard>
          </motion.div>

          {/* WhatsApp */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8 h-full flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Chat on WhatsApp</h3>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-text-primary hover:text-white mb-4">
                +880 1234-567890
              </a>
              <button 
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                className="btn-ghost text-sm mt-auto"
              >
                Start Chat →
              </button>
              <p className="text-xs text-text-muted mt-4">
                Usually responds in minutes
              </p>
            </GlassCard>
          </motion.div>

          {/* Office Hours */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8 h-full flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Business Hours</h3>
              <p className="text-text-primary mb-1">Saturday – Thursday</p>
              <p className="text-text-secondary mb-4">9:00 AM – 6:00 PM (GMT+6)</p>
              <p className="text-sm text-red-400 mt-auto pt-4 font-medium">
                Closed Friday
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
