// app/(marketing)/page.tsx
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Showcase } from "@/components/landing/Showcase";
import { Integrations } from "@/components/landing/Integrations";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#000000]">
      <Navbar />
      <Hero />
      <LogoCloud />
      <HowItWorks />
      <Features />
      <Showcase />
      <Integrations />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}



