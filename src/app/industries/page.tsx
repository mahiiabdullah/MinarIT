import { Metadata } from "next";
import IndustriesHero from "@/components/sections/industries/IndustriesHero";
import IndustryDeepDives from "@/components/sections/industries/IndustryDeepDives";
import IndustryComparison from "@/components/sections/industries/IndustryComparison";
import IndustrySelector from "@/components/sections/industries/IndustrySelector";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Industries | Minar Agency",
  description: "We build tailored software and AI operating systems for restaurants, hospitals, e-commerce, NGOs, education, and manufacturing.",
};

export default function IndustriesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <IndustriesHero />
      <IndustryDeepDives />
      <IndustryComparison />
      <IndustrySelector />
      <Footer />
    </main>
  );
}
