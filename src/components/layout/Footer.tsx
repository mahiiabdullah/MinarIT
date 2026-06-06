"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { FOOTER_LINKS, SITE_CONFIG } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-background">
      {/* Top Section — Large CTA */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 overflow-hidden rounded-3xl bg-secondary/80 p-8 sm:p-12 text-center backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Animated Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-50 blur-xl animate-pulse pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl max-w-3xl">
              Ready to Stop Managing and Start Growing?
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-text-muted">
              Book a free 30-minute audit. We&apos;ll map exactly what automation could do for your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button href="/contact" variant="gradient" size="lg" className="w-full sm:w-auto font-medium">
                Book Free Audit
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto group">
                Generate AI Proposal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-6 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent">
                Minar<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              We build intelligent systems and mobile applications that replace repetitive tasks and scale operations. Stop managing. Start growing.
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-accent/20 hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href={SITE_CONFIG.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-accent/20 hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-text-muted hover:bg-green-500/20 hover:text-green-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Services</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Industries */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Industries</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.industries.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Company</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
           <a href={`mailto:${SITE_CONFIG.email}`} className="group flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-white">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
               <Mail className="h-4 w-4 text-accent" />
             </div>
             <span>{SITE_CONFIG.email}</span>
           </a>
           <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-white">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
               <Phone className="h-4 w-4 text-[#25D366]" />
             </div>
             <span>{SITE_CONFIG.phone}</span>
           </a>
           <div className="group flex items-center gap-3 text-sm text-text-muted">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
               <MapPin className="h-4 w-4 text-primary" />
             </div>
             <span>San Francisco, CA</span>
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#080D18]/80 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <span className="flex items-center gap-1 opacity-50">
              Built with AI Systems
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
