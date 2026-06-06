import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactOptions from "@/components/sections/contact/ContactOptions";
import ContactForm from "@/components/forms/ContactForm";
import FAQSection from "@/components/sections/contact/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Minar Agency",
  description: "Let's talk about your business. No sales pitch, just a real conversation about what you're trying to build and how AI automation can help.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <FAQSection />
      <Footer />
    </main>
  );
}
