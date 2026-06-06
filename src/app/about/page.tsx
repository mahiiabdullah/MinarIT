import { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import OurStory from "@/components/sections/about/OurStory";
import OurValues from "@/components/sections/about/OurValues";
import Team from "@/components/sections/about/Team";
import WhyChooseUs from "@/components/sections/about/WhyChooseUs";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | Minar Agency",
  description: "Minar was started by builders tired of watching businesses lose money to inefficiency. We build custom operating systems and AI automation.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      <OurStory />
      <OurValues />
      <Team />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
