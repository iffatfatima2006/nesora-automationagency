"use client";

import { motion } from "framer-motion";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  darkBg?: boolean;
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  subtitle = "Let's build the future together",
  buttonText = "Get Started",
  darkBg = false,
}: CTASectionProps) {
  const handleClick = () => {
    document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`relative py-24 md:py-32 overflow-hidden ${
        darkBg ? "bg-black" : "bg-[#050A14]"
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <motion.button
            onClick={handleClick}
            className="mt-8 px-10 py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-sm rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-white/20 group inline-flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
