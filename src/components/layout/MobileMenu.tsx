// ============================================
// MobileMenu — Fullscreen overlay navigation with grouped links
// ============================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, TOP_BAR_LINKS, SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  const containerVariants = {
    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20, filter: "blur(4px)" },
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  // Extract simple links from NAV_LINKS (ignoring children on mobile for simplicity, 
  // as they link to main pages /services, /industries anyway)
  const mainLinks = NAV_LINKS.map(link => ({ label: link.label, href: link.href }));
  
  const connectLinks = [
    { label: "WhatsApp", href: "https://wa.me/1234567890", external: true },
    { label: "Email", href: `mailto:${SITE_CONFIG.email}`, external: true },
    { label: "Book a Call", href: "/contact", external: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden bg-[#080D18] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Subtle gradient mesh background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
          </div>

          {/* Header Area */}
          <div className="relative z-10 flex items-center justify-end p-4 h-16 sm:h-20">
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center text-text-muted hover:text-white transition-colors bg-white/5 rounded-full backdrop-blur-md touch-target"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links Grouped */}
          <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-6">
            <motion.nav
              className="flex flex-col gap-10 max-w-sm mx-auto w-full pt-4"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* ── MAIN ── */}
              <div>
                <motion.div variants={itemVariants} className="text-xs font-bold text-primary-400/80 tracking-widest uppercase mb-4">
                  Navigation
                </motion.div>
                <div className="flex flex-col gap-4">
                  {mainLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "text-2xl font-display font-bold transition-all duration-300 relative flex items-center justify-center w-full min-h-[60px] rounded-xl",
                            isActive ? "text-white bg-white/5" : "text-text-secondary hover:text-white hover:bg-white/5"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ── RESOURCES ── */}
              <div>
                <motion.div variants={itemVariants} className="text-xs font-bold text-primary-400/80 tracking-widest uppercase mb-4">
                  Resources
                </motion.div>
                <div className="flex flex-col gap-3">
                  {TOP_BAR_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "text-xl font-medium transition-colors flex items-center justify-center w-full min-h-[60px] rounded-xl",
                            isActive ? "text-white bg-white/5" : "text-text-secondary hover:text-white hover:bg-white/5"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ── CONNECT ── */}
              <div>
                <motion.div variants={itemVariants} className="text-xs font-bold text-primary-400/80 tracking-widest uppercase mb-4">
                  Get in Touch
                </motion.div>
                <div className="flex flex-col gap-3">
                  {connectLinks.map((link) => (
                    <motion.div key={link.label} variants={itemVariants}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-xl font-medium w-full min-h-[60px] rounded-xl bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {link.label}
                          {link.label !== "WhatsApp" && <ArrowUpRight className="w-4 h-4 opacity-70" />}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-center gap-2 text-xl font-bold w-full min-h-[60px] rounded-xl bg-primary text-white hover:bg-primary-600 transition-colors shadow-lg shadow-primary/25"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </div>

          {/* Bottom Footer Area */}
          <motion.div 
            className="relative z-10 p-6 flex flex-col items-center gap-4 border-t border-white/5 bg-[#0A0F1E]/50 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {/* Socials */}
            <div className="flex items-center gap-6">
              <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary-light transition-colors"><TwitterIcon className="w-5 h-5" /></a>
              <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary-light transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
              <a href={SITE_CONFIG.socials.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary-light transition-colors"><GithubIcon className="w-5 h-5" /></a>
            </div>

            {/* AI Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
              <span className="text-[10px] font-medium text-text-muted tracking-wider uppercase">Powered by AI Systems</span>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
