// ============================================
// Navbar — Top Bar + Fixed navigation with glassmorphism & dropdowns
// ============================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks";
import { NAV_LINKS, TOP_BAR_LINKS, SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { 
  ChevronDown, MessageCircle, Layers, Bot, BarChart, 
  Smartphone, Utensils, Activity, Heart, ShoppingCart, 
  Book, Factory 
} from "lucide-react";

// ── Icon Mapping Helper ──────────────────────────────────────────
function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'layers': return Layers;
    case 'bot': return Bot;
    case 'message-circle': return MessageCircle;
    case 'bar-chart': return BarChart;
    case 'smartphone': return Smartphone;
    case 'utensils': return Utensils;
    case 'activity': return Activity;
    case 'heart': return Heart;
    case 'shopping-cart': return ShoppingCart;
    case 'book': return Book;
    case 'factory': return Factory;
    default: return Layers;
  }
}

// ── Logo with animated AI dot ──────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Minar Home">
      <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-4 h-4 lg:w-5 lg:h-5"
        >
          <path d="M10 2L3 7V13L10 18L17 13V7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          <path d="M10 8L7 10V12L10 14L13 12V10L10 8Z" fill="currentColor" opacity="0.6" />
        </svg>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-primary-400 ai-dot" />
      </div>
      <span className="text-lg lg:text-xl font-display font-bold text-text-primary tracking-tight group-hover:text-primary-400 transition-colors duration-300">
        {SITE_CONFIG.name}
      </span>
    </Link>
  );
}

// ── Hamburger / X toggle button ─────────────────────────────────
function MenuToggle({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors touch-target"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="w-5 h-4 relative flex flex-col justify-between">
        <motion.span
          className="block w-full h-[2px] bg-text-primary rounded-full origin-center"
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="block w-full h-[2px] bg-text-primary rounded-full"
          animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-full h-[2px] bg-text-primary rounded-full origin-center"
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </button>
  );
}

// ── Dropdown Menu Component ─────────────────────────────────────
function DropdownMenu({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
        )}
      >
        {item.label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
        {isActive && (
          <motion.div
            layoutId="nav-active-indicator"
            className="absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 w-[550px]"
          >
            <div className="bg-secondary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2">
              {item.children.map((child: any) => {
                const Icon = getIconComponent(child.icon);
                return (
                  <Link 
                    key={child.href} 
                    href={child.href}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary-400 group-hover:bg-primary/20 group-hover:text-primary-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-primary-300 transition-colors">{child.label}</div>
                      <div className="text-xs text-text-muted mt-0.5">{child.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ─────────────────────────────────────────────────
export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Track scroll direction for Top Bar hiding
  const [hiddenTopBar, setHiddenTopBar] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setHiddenTopBar(true);
      } else {
        setHiddenTopBar(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: hiddenTopBar ? "-36px" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* ── Top Bar (Utility Links) ── */}
        <div className="hidden md:flex items-center justify-between h-[36px] px-4 sm:px-6 lg:px-8 bg-[#080D18] border-b border-white/[0.05]">
          <div className="text-xs text-text-muted/80 hidden lg:block">
            ⚡ AI-Powered Systems for South Asian Businesses
          </div>
          <div className="flex items-center gap-5 text-xs text-text-muted ml-auto">
            <div className="hidden lg:flex items-center gap-5">
              {TOP_BAR_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-3 bg-white/10" />
            </div>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors flex items-center gap-1.5 touch-target">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <span className="hidden lg:inline">{SITE_CONFIG.email}</span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors touch-target">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* ── Main Navigation ── */}
        <div
          className={cn(
            "transition-all duration-500",
            isScrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
            aria-label="Main navigation"
          >
            {/* Left: Logo */}
            <Logo />

            {/* Center: Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link: any) => {
                if (link.children) {
                  return <DropdownMenu key={link.href} item={link} />;
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-indicator"
                        className="absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 btn-gradient btn-shimmer px-6 py-2.5 text-sm rounded-xl font-semibold touch-target"
              >
                Get Free Audit
              </Link>
              <MenuToggle
                isOpen={isMobileOpen}
                toggle={() => setIsMobileOpen(!isMobileOpen)}
              />
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <MobileMenu
        isOpen={isMobileOpen}
        pathname={pathname}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
