"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { BlogPost, blogPosts } from "@/lib/blog-data";
import GlassCard from "@/components/ui/GlassCard";
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

export default function BlogArticle({ post }: { post: BlogPost }) {
  // Read progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // TOC active state
  const [activeSection, setActiveSection] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Very basic intersection logic based on scroll position for TOC
      const headings = document.querySelectorAll("h2.article-heading");
      let currentActive = 0;
      
      headings.forEach((heading, index) => {
        const top = heading.getBoundingClientRect().top;
        // If heading is near the top of the viewport
        if (top >= 0 && top <= 300) {
          currentActive = index;
        } else if (top < 0) {
          currentActive = index;
        }
      });
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine related posts (max 3)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.tags.filter(t => post.tags.includes(t)).length;
      const bMatch = b.tags.filter(t => post.tags.includes(t)).length;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const sidebarRelated = relatedPosts.slice(0, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-50"
        style={{ scaleX }}
      />

      <div className="section-container py-12 lg:py-20 relative z-10">
        
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-primary-light transition-colors mb-10">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Content (Left) */}
          <div className="lg:col-span-8">
            
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="badge badge-primary">{post.category}</span>
                <span className="text-sm font-medium text-text-muted flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {post.publishDate}
                </span>
                <span className="text-sm font-medium text-text-muted flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-surface border border-surface-border rounded-full text-xs text-text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Body */}
            <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary-light hover:prose-a:text-primary transition-colors">
              {post.content.sections.map((section, idx) => (
                <div key={idx} className="mb-12">
                  <h2 
                    id={`section-${idx}`} 
                    className="article-heading text-2xl md:text-3xl font-bold text-white mb-6 scroll-mt-24"
                  >
                    <span className="gradient-text">{section.heading}</span>
                  </h2>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </article>

            {/* Footer / Share / Author */}
            <div className="mt-16 pt-8 border-t border-surface-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Author Card */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg border border-white/20">
                    M
                  </div>
                  <div>
                    <div className="text-white font-bold">Written by the Minar Team</div>
                    <div className="text-text-muted text-sm">Engineering & Strategy</div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-muted mr-2">Share:</span>
                  <button onClick={copyToClipboard} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
                  </button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all">
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-primary/50 transition-all">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
            
            {/* Table of Contents */}
            <GlassCard className="p-6 border-surface-border" hover={false}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">In this article</h4>
              <nav className="space-y-3">
                {post.content.sections.map((section, idx) => (
                  <a 
                    key={idx} 
                    href={`#section-${idx}`}
                    className={cn(
                      "block text-sm transition-colors",
                      activeSection === idx ? "text-primary-light font-medium" : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </GlassCard>

            {/* Lead-Gen CTA */}
            <GlassCard className="p-6 border-accent/20 bg-accent/5 flex flex-col items-center text-center">
              <h3 className="text-xl font-display font-bold text-white mb-2">Need help automating your business?</h3>
              <p className="text-sm text-text-secondary mb-6">
                Stop managing by spreadsheets. We build custom operating systems for growing companies.
              </p>
              <Link href="/contact" className="btn-gradient w-full py-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Book a Free Call
              </Link>
            </GlassCard>

            {/* Sidebar Related Posts */}
            <div>
              <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Related Reads</h4>
              <div className="space-y-4">
                {sidebarRelated.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block group">
                    <GlassCard className="p-4 border-surface-border group-hover:border-primary/50 transition-colors">
                      <div className="text-xs text-primary-light mb-1">{rel.category}</div>
                      <div className="font-bold text-white text-sm group-hover:text-primary-light transition-colors line-clamp-2">{rel.title}</div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Related Articles & Full-width CTA */}
      <div className="border-t border-surface-border bg-background-secondary pt-20 pb-12">
        <div className="section-container">
          
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-8">Keep Reading</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block h-full group">
                  <GlassCard className="h-full p-6 flex flex-col border-surface-border group-hover:border-primary/50 transition-colors" hover={false}>
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-light bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                        {rel.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-grow">
                      {rel.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-surface-border text-xs text-text-muted font-medium">
                      {rel.readTime}
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>

          {/* Full width CTA */}
          <GlassCard className="p-10 md:p-16 border-primary/20 bg-surface-elevated/40 text-center relative overflow-hidden" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to automate your operations?</h2>
              <p className="text-lg text-text-secondary mb-8">
                Let&apos;s map out your exact workflows and discover where a custom system can save you the most time and money.
              </p>
              <Link href="/contact" className="btn-gradient px-8 py-4 text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Start the Conversation
              </Link>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
