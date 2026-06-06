import { Metadata } from "next";
import CaseStudiesList from "@/components/sections/case-studies/CaseStudiesList";
import Footer from "@/components/layout/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "Case Studies | Minar Agency",
  description: "Read how Minar Agency builds custom software and AI systems to solve complex operational bottlenecks for real businesses.",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="section-container relative z-10 text-center">
          <div className="mb-6 inline-block">
            <span className="badge badge-primary px-4 py-2 text-sm">
              Our Portfolio
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-white">
            Results We&apos;ve <span className="gradient-text">Delivered</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary mb-16 max-w-2xl mx-auto">
            Real businesses. Real problems. Real automation.
          </p>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-b border-surface-border py-10 mb-8 bg-surface-elevated/20 backdrop-blur-sm rounded-3xl">
            <AnimatedCounter value="40+" label="Custom Systems Built" />
            <div className="hidden md:block w-px h-16 bg-surface-border mx-auto" />
            <AnimatedCounter value="6" label="Core Industries Served" />
            <div className="hidden md:block w-px h-16 bg-surface-border mx-auto" />
            <AnimatedCounter value="$2M+" label="Saved for Clients" />
          </div>
        </div>
      </section>

      {/* Main Listing */}
      <CaseStudiesList />

      <Footer />
    </main>
  );
}
