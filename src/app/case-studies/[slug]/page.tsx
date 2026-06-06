import { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies-data";
import CaseStudyContent from "@/components/sections/case-studies/CaseStudyContent";
import Footer from "@/components/layout/Footer";

// Generate static params at build time
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = caseStudies.find((s) => s.slug === params.slug);
  
  if (!study) {
    return {
      title: "Case Study Not Found | Minar Agency",
    };
  }

  return {
    title: `${study.title} Case Study | Minar Agency`,
    description: study.headline,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      
      {/* Dynamic Header */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-surface-border">
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="badge badge-primary">{study.industry}</div>
              <div className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <span>{study.client_type}</span>
                <span className="w-1 h-1 rounded-full bg-surface-border" />
                <span>{study.location}</span>
                <span className="w-1 h-1 rounded-full bg-surface-border" />
                <span>{study.duration}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              {study.title}: <span className="gradient-text">{study.headline}</span>
            </h1>

            <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
              {study.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <CaseStudyContent study={study} />

      <Footer />
    </main>
  );
}
