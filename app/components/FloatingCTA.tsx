"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight;
      // Start appearing at Benefits start (2.5vh) consistent with GlobalHeader
      const benefitsStart = vh * 2.5; 
      
      if (latest >= benefitsStart) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  });

  const handleClick = () => {
    const pricingSection = document.querySelector("#pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.button
        onClick={handleClick}
        className="relative overflow-hidden bg-white text-black font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-white/20 transition-all duration-300 flex items-center gap-2"
        animate={{
          paddingLeft: isExpanded ? "20px" : "16px",
          paddingRight: isExpanded ? "20px" : "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gradient shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <span className="relative z-10 text-xs">Get Started</span>
        
        <motion.svg
          className="relative z-10"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          animate={{
            x: isExpanded ? 3 : 0,
          }}
        >
          <path
            d="M1 8H15M15 8L8 1M15 8L8 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}
