"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";

// Lazy load heavy below-the-fold components
const BenefitsSection = dynamic(() => import("./components/BenefitsSection"), { ssr: true });
const OurProcess = dynamic(() => import("./components/OurProcess"), { ssr: true });
const AITransforms = dynamic(() => import("./components/AITransforms"), { ssr: true });
const NeedMoreProof = dynamic(() => import("./components/NeedMoreProof"), { ssr: true });
const NameDrops = dynamic(() => import("./components/NameDrops"), { ssr: true });
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: true });
const Pricing = dynamic(() => import("./components/Pricing"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });
const FloatingCTA = dynamic(() => import("./components/FloatingCTA"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <FloatingCTA />
      <Hero />
      <BenefitsSection />
      <OurProcess />
      <AITransforms />
      <NeedMoreProof />
      <NameDrops />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
