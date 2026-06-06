// ============================================
// Homepage — Main Landing Page
// ============================================

import Hero from "@/components/sections/Hero";
import Calculator from "@/components/sections/Calculator";
import IndustrySwitcher from "@/components/sections/IndustrySwitcher";
import AIConsultant from "@/components/sections/AIConsultant";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import WorkflowAnimation from "@/components/sections/WorkflowAnimation";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Calculator />
      <IndustrySwitcher />
      <AIConsultant />
      <BeforeAfterSlider />
      <WorkflowAnimation />
      <Services />
      <TechStack />
      <Footer />
    </main>
  );
}
