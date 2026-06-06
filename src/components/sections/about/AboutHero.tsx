"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background pt-24 sm:pt-32 pb-12 sm:pb-20">
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
            <span className="badge badge-glow px-4 py-2 text-sm">
              About Minar
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-balance"
          >
            We Don&apos;t Just Build Websites. <br />
            <span className="gradient-text">We Build The Systems Behind Them.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 text-balance"
          >
            Minar was started by builders who were tired of watching businesses lose money to inefficiency. We decided to fix that.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-surface-border max-w-3xl mx-auto"
          >
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-display font-bold text-text-primary">2022</span>
              <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Founded</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-display font-bold text-text-primary">40+</span>
              <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Systems Deployed</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-display font-bold text-text-primary">6</span>
              <span className="text-sm text-text-muted font-medium uppercase tracking-wider">Industries Served</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
