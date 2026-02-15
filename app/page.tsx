"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import BenefitsSection from "./components/BenefitsSection";
import OurProcess from "./components/OurProcess";
import AITransforms from "./components/AITransforms";
import NeedMoreProof from "./components/NeedMoreProof";
import NameDrops from "./components/NameDrops";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
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
