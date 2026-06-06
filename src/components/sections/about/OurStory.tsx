"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const timelineEvents = [
  {
    year: "2022",
    title: "The First Restaurant",
    description: "We started by automating a single struggling restaurant. They were drowning in paperwork and inventory mismatches. After we deployed our first custom system, their food waste dropped by 30% in two weeks.",
  },
  {
    year: "2023",
    title: "Expanding Horizons",
    description: "Word spread. Soon, hospitals and NGOs were asking for our help to solve their operational bottlenecks. We grew our team and built specialized operating systems for healthcare and non-profit sectors.",
  },
  {
    year: "2024",
    title: "The AI Revolution",
    description: "We deeply integrated AI into every system we built. Instead of just tracking data, our systems began predicting demand, automating customer service, and actively solving problems without human intervention.",
  },
  {
    year: "2025",
    title: "40+ Businesses Strong",
    description: "Today, we power operations for over 40 organizations across 6 major industries, saving them thousands of hours monthly and fundamentally changing how they do business.",
  },
];

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-padding bg-background-secondary relative" ref={containerRef}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Narrative */}
          <div className="sticky top-32">
            <SectionHeading
              badge="Our Story"
              title="Born Out of"
              highlight="Frustration"
              align="left"
            />
            
            <div className="space-y-6 text-lg text-text-secondary">
              <p>
                It started in the back office of a bustling local restaurant. The owner was 
                exhausted, surrounded by stacks of invoices, Excel spreadsheets that didn&apos;t match, 
                and a scheduling whiteboard that was a constant source of stress. We saw firsthand 
                how manual processes were bleeding the business dry.
              </p>
              <p>
                We realized that most businesses aren&apos;t failing because of bad products; they&apos;re 
                failing because they are suffocated by bad operations. Off-the-shelf software 
                rarely fits, forcing teams to duct-tape 10 different subscriptions together. 
                So, we built them a single, unified operating system.
              </p>
              <p>
                What started as a mission to save one restaurant has evolved into an agency 
                that transforms how entire organizations function. By combining bespoke software 
                architecture with cutting-edge AI, we replace chaos with clarity. We don&apos;t just 
                build software — we build the engines that run modern businesses.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative pt-12 lg:pt-0">
            {/* SVG Line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-surface-border rounded-full overflow-hidden hidden md:block">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-accent transform origin-top"
                style={{ scaleY: pathLength }}
              />
            </div>

            <div className="space-y-12 relative">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex gap-6 md:gap-12 group">
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex flex-col items-center mt-1 z-10 relative">
                    <div className="w-14 h-14 rounded-full bg-background border-4 border-surface-border flex items-center justify-center transition-colors duration-500 group-hover:border-primary">
                      <div className="w-3 h-3 rounded-full bg-surface-border group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(139,92,246,0)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-1 glass-card p-6 md:p-8 hover:border-primary/50"
                  >
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary-light rounded-full text-sm font-bold mb-4 border border-primary/20">
                      {event.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-3">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
