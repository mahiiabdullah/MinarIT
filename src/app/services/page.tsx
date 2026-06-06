import { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServiceDetails from "@/components/sections/services/ServiceDetails";
import ProcessTimeline from "@/components/sections/services/ProcessTimeline";
import ServicePackages from "@/components/sections/services/ServicePackages";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services | Minar Agency",
  description: "Everything your business needs to run on autopilot. We build bespoke management systems, AI workflows, and advanced analytics.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ServicesHero />
      <ServiceDetails />
      <ProcessTimeline />
      <ServicePackages />
      <Footer />
    </main>
  );
}
