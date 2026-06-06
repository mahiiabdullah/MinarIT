import { Metadata } from "next";
import PricingTiers from "@/components/sections/pricing/PricingTiers";
import FeatureComparison from "@/components/sections/pricing/FeatureComparison";
import MiniCalculator from "@/components/sections/pricing/MiniCalculator";
import PricingFAQ from "@/components/sections/pricing/PricingFAQ";
import PricingCTA from "@/components/sections/pricing/PricingCTA";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing | Minar Agency",
  description: "Transparent pricing for custom software, AI automation, and business management systems. No hidden costs. No surprise invoices.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <PricingTiers />
      <FeatureComparison />
      <MiniCalculator />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </main>
  );
}
