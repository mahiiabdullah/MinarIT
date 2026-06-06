"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  BrainCircuit, 
  MessageSquare, 
  BarChart3, 
  Smartphone, 
  FileText,
  ArrowRight
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// Icons specifically chosen for the services
const services = [
  {
    title: "Custom Business Systems",
    description: "ERP-style management systems built for your exact workflow",
    icon: Layers,
    size: "large",
  },
  {
    title: "AI Automation",
    description: "Replace repetitive tasks with intelligent automation",
    icon: BrainCircuit,
    size: "large",
  },
  {
    title: "WhatsApp AI Agents",
    description: "24/7 customer service on the app your customers already use",
    icon: MessageSquare,
    size: "medium",
  },
  {
    title: "Analytics Dashboards",
    description: "Real-time visibility into every corner of your business",
    icon: BarChart3,
    size: "medium",
  },
  {
    title: "Mobile Applications",
    description: "Native apps for your team and customers",
    icon: Smartphone,
    size: "medium",
  },
  {
    title: "AI Proposal & Document Generation",
    description: "Automated proposals, invoices, reports in seconds",
    icon: FileText,
    size: "medium",
  },
];

export default function Services() {
  return (
    <section className="section-container section-padding" id="services">
      <SectionHeading
        badge="Our Services"
        title="Solutions Built for Scale"
        subtitle="We build intelligent systems that help you stop managing and start growing."
        centered
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isLarge = service.size === "large";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 ${
                isLarge ? "md:col-span-2 lg:col-span-2" : "col-span-1"
              }`}
            >
              {/* Subtle Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-accent/5 group-hover:via-accent/5 group-hover:to-primary/10 group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-full flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 sm:mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] group-hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)] transition-shadow duration-300 mx-auto sm:mx-0">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                
                <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
                  {service.title}
                </h3>
                <p className="text-text-muted">
                  {service.description}
                </p>

                <div className="mt-auto pt-6 sm:pt-8">
                  <a href="#contact" className="inline-flex items-center text-sm font-medium text-accent opacity-100 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100 touch-target">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Mini-illustration for large cards */}
              {isLarge && (
                <div className="absolute -bottom-10 -right-10 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20 pointer-events-none">
                  <Icon className="h-32 w-32 sm:h-64 sm:w-64" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
