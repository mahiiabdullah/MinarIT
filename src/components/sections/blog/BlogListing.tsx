"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import GlassCard from "@/components/ui/GlassCard";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "AI & Automation", "Case Studies", "Industry Insights", "How-To Guides"];

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = blogPosts.find(p => p.featured);
  
  // Filter logic
  const filteredPosts = blogPosts.filter(post => {
    // Exclude featured post from grid if we want it strictly at the top, or keep it. 
    // Let's keep it in the grid too if it matches filters, or exclude if it's "All" and no search?
    // The prompt says "FEATURED POST (first/top)" then "POSTS GRID". We'll exclude the featured post from the grid unless searching/filtering.
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    // If no active search/filter, exclude the featured post from the grid to avoid duplication
    if (searchQuery === "" && activeCategory === "All" && post.slug === featuredPost?.slug) {
      return false;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-padding bg-background relative pt-0">
      <div className="section-container max-w-6xl">
        
        {/* FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-surface-border pb-8">
          
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    : "bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-full py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

        </div>

        {/* FEATURED POST (Only show if no search/filter is active) */}
        {searchQuery === "" && activeCategory === "All" && featuredPost && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <GlassCard className="p-8 md:p-12 relative overflow-hidden border-primary/20" hover={false}>
                {/* Gradient Mesh Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-accent/10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/30 transition-colors duration-700" />
                
                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="badge badge-primary">{featuredPost.category}</span>
                    <span className="text-sm font-medium text-text-muted flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {featuredPost.publishDate}
                    </span>
                    <span className="text-sm font-medium text-text-muted flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-primary-light transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
                    {featuredPost.excerpt}
                  </p>

                  <div className="inline-flex items-center text-primary-light font-bold group-hover:text-white transition-colors">
                    Read Article <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        )}

        {/* POSTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, index) => {
              
              // Render the Newsletter CTA after the 3rd post
              const isAfterFirstRow = index === 3;

              return (
                <div key={post.slug} className="contents">
                  
                  {/* INLINE NEWSLETTER CTA */}
                  {isAfterFirstRow && (
                    <div className="md:col-span-2 lg:col-span-3 mb-8 mt-4">
                      <GlassCard className="p-8 md:p-10 border-accent/20 bg-accent/5 flex flex-col md:flex-row items-center justify-between gap-8" hover={false}>
                        <div className="flex-1">
                          <h3 className="text-2xl font-display font-bold text-white mb-2">Get automation insights every week.</h3>
                          <p className="text-text-secondary">Join 500+ business owners receiving practical guides on scaling with AI.</p>
                        </div>
                        <div className="w-full md:w-auto flex-1 max-w-md flex flex-col gap-3">
                          <NewsletterForm />
                        </div>
                      </GlassCard>
                    </div>
                  )}

                  {/* STANDARD POST CARD */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full group">
                      <GlassCard className="h-full p-6 lg:p-8 flex flex-col border-surface-border group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1" hover={false}>
                        
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-transparent group-hover:from-primary/5 transition-colors duration-500 pointer-events-none" />

                        <div className="mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-light bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary-light transition-colors leading-snug">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-text-secondary line-clamp-2 mb-6 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-6 border-t border-surface-border flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishDate}</span>
                            <span className="w-1 h-1 rounded-full bg-surface-border" />
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-light transform group-hover:translate-x-1 transition-all" />
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-surface border border-surface-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">No articles found</h3>
            <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
          </div>
        )}

      </div>
    </section>
  );
}
