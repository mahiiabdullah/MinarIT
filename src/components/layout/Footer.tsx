"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { FOOTER_LINKS, SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";

// Helper for Footer Column Accordion
function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 md:border-none py-4 md:py-0">
      {/* Desktop Header */}
      <h3 className="hidden md:block text-sm font-semibold text-white tracking-wider uppercase mb-6">
        {title}
      </h3>
      
      {/* Mobile Header (Button) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex md:hidden items-center justify-between w-full text-left touch-target"
      >
        <span className="text-sm font-semibold text-white tracking-wider uppercase">{title}</span>
        <ChevronDown className={cn("w-4 h-4 text-text-muted transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {/* Links List */}
      <ul className={cn(
        "flex-col gap-3 mt-4 md:mt-0 md:flex",
        isOpen ? "flex" : "hidden"
      )}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white block py-1">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-background">
      {/* Top Section — Large CTA */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 overflow-hidden rounded-3xl bg-secondary/80 py-10 px-4 sm:p-12 text-center backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Animated Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-50 blur-xl animate-pulse pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Ready to Stop Managing and Start Growing?
            </h2>
            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-lg text-text-muted">
              Book a free 30-minute audit. We&apos;ll map exactly what automation could do for your business.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              <Button href="/contact" variant="gradient" className="w-full sm:w-auto font-medium min-h-[52px]">
                Book Free Audit
              </Button>
              <Button href="/contact" variant="outline" className="w-full sm:w-auto group min-h-[52px]">
                Generate AI Proposal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 — Brand (Always visible) */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-6 lg:col-span-2 pr-0 lg:pr-8 mb-4 sm:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent">
                Minar<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              We build intelligent systems and mobile applications that replace repetitive tasks and scale operations. Stop managing. Start growing.
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-accent/20 hover:text-accent transition-colors touch-target flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-accent/20 hover:text-accent transition-colors touch-target flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-green-500/20 hover:text-green-500 transition-colors touch-target flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Accordion Columns for mobile */}
          <FooterColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterColumn title="Industries" links={FOOTER_LINKS.industries} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        </div>

        {/* Contact Strip (Always visible) */}
        <div className="mt-8 sm:mt-16 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
           <a href={`mailto:${SITE_CONFIG.email}`} className="group flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-white touch-target">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
               <Mail className="h-4 w-4 text-accent" />
             </div>
             <span>{SITE_CONFIG.email}</span>
           </a>
           <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-white touch-target">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors shrink-0">
               <Phone className="h-4 w-4 text-[#25D366]" />
             </div>
             <span>{SITE_CONFIG.phone}</span>
           </a>
           <div className="group flex items-center gap-3 text-sm text-text-muted">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
               <MapPin className="h-4 w-4 text-primary" />
             </div>
             <span>San Francisco, CA</span>
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#080D18]/80 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted text-center sm:text-left">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors py-1">
                {link.label}
              </Link>
            ))}
            <span className="flex items-center gap-1 opacity-50 text-center w-full sm:w-auto mt-2 sm:mt-0">
              Built with Claude AI ⚡
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
