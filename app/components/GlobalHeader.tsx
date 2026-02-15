"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

export default function GlobalHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [variant, setVariant] = useState("visible");

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight;

      // THRESHOLDS based on section stack:
      // Hero: 0-250 | Benefits: 250-650 | Process: 650-1050 | CaseStudies (4th): 1050-1550
      // Proof: 1550-1800 | NameDrops: 1800-1900 | Testimonials: 1900-2150 | Pricing: 2150-2250 | Footer: 2250+

      const heroHide = vh * 1.0;
      const benefitsStart = vh * 2.5;
      const processEnd = vh * 10.3;      // End of Our Process
      const proofStart = vh * 15.6;     // Start of Need More Proof
      const proofEnd = vh * 17.8;       // End of Need More Proof
      const pricingStart = vh * 21.5;   // Start of Pricing

      if (latest < heroHide) {
        setVariant("visible");
      } else if (latest >= heroHide && latest < benefitsStart) {
        setVariant("hidden");
      } else if (latest >= benefitsStart && latest < processEnd) {
        setVariant("visible"); // Benefits & Process (Window 2 & 3)
      } else if (latest >= processEnd && latest < proofStart) {
        setVariant("hidden"); // Case Studies (4th Window)
      } else if (latest >= proofStart && latest < proofEnd) {
        setVariant("visible"); // Need More Proof
      } else if (latest >= proofEnd && latest < pricingStart) {
        setVariant("hidden"); // Name Drops & Testimonials
      } else {
        setVariant("visible"); // Pricing & Footer
      }
    }
  });

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0px",
      backgroundColor: "rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
      top: 0
    },
    hidden: {
      y: -100,
      opacity: 0,
      width: "100%",
      maxWidth: "100%",
      borderRadius: "0px",
      backgroundColor: "rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
      top: 0
    }
  };

  return (
    <motion.header
      ref={headerRef}
      initial="visible"
      animate={variant}
      variants={variants}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="fixed left-1/2 -translate-x-1/2 z-[100] pointer-events-auto overflow-hidden flex items-center justify-center border border-transparent stabilize-text"
    >
      <div className="w-full max-w-7xl px-6 md:px-12 py-5 flex items-center justify-between font-sans">

        {/* Left - Logo */}
        <div className="flex-1 flex justify-start">
          <div className="select-none h-10 w-10 flex items-center justify-center rounded-full border border-white">
            <span className="text-lg font-normal text-white pt-[1px]" style={{ fontFamily: "var(--font-bodoni), serif" }}>N</span>
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-12 font-bold transition-all duration-300">
          {[
            { label: "Home", href: "#home" },
            { label: "Benefits", href: "#benefits" },
            { label: "Process", href: "#process" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] text-white hover:text-white/80 transition-colors uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right - Contact Button */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 text-[10px] font-bold text-white bg-transparent hover:bg-white hover:text-black rounded-full border border-white transition-all duration-300 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white hover:text-white/80 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
