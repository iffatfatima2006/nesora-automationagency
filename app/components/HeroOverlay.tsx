"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function HeroOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Fade out the CTA button as user scrolls
    const ctaOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const ctaY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);
    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
            {/* Header Removed - Using GlobalHeader instead */}

            {/* Branding Container */}
            <motion.div
                className="w-full flex-1 flex flex-col justify-center md:justify-end items-center pb-12 md:pb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex flex-col items-center">
                    <h2
                        className="text-[14vw] md:text-[12vw] leading-none tracking-tight select-none text-white uppercase font-[family-name:var(--font-climate)] stabilize-text"
                    >
                        EXERRA
                    </h2>
                    <div className="mt-4 md:mt-2 text-center overflow-hidden flex flex-col items-center">
                        <p className="text-[3.2vw] md:text-[0.9vw] text-white/80 uppercase tracking-[0.4em] font-medium max-w-[85vw] md:max-w-none leading-relaxed font-[Helvetica,Arial,sans-serif]">
                            Next-Generation AI Automation & Digital Systems.
                        </p>
                        <p className="text-[3.2vw] md:text-[0.9vw] text-white/70 uppercase tracking-[0.4em] font-medium mt-1 leading-relaxed font-[Helvetica,Arial,sans-serif]">
                            Architecting the future of operational efficiency.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ opacity: ctaOpacity, y: ctaY }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => {
                            document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="mt-12 px-8 py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs md:text-sm rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-white/20 pointer-events-auto group"
                    >
                        <span className="flex items-center gap-3">
                            Get Started
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 16 16">
                                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
