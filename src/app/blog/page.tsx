import { Metadata } from "next";
import BlogListing from "@/components/sections/blog/BlogListing";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog & Insights | Minar Agency",
  description: "Read the latest insights on business automation, AI agents, and scaling operations from the engineers at Minar Agency.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="section-container relative z-10 text-center">
          <div className="mb-6 inline-block">
            <span className="badge badge-primary px-4 py-2 text-sm">
              Our Thoughts
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-white max-w-4xl mx-auto">
            Insights on Business <br className="hidden md:block" />
            <span className="gradient-text">Automation & AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Practical guides, case studies, and engineering deep-dives on how to replace manual work permanently.
          </p>
        </div>
      </section>

      <BlogListing />

      <Footer />
    </main>
  );
}
