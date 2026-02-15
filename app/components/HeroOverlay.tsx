"use client";

import { motion } from "framer-motion";

export default function HeroOverlay() {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
            {/* Header Removed - Using GlobalHeader instead */}

            {/* Footer Branding - Technical Font, Moved Up */}
            <motion.div
                className="w-full text-center pointer-events-auto mt-auto pb-10 md:pb-16"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
                <div className="overflow-hidden w-full flex justify-center">
                    {/* Footer Branding - Climate Crisis Font */}
                    <h2
                        className="text-[12vw] leading-none tracking-normal select-none text-white uppercase font-[family-name:var(--font-climate)] stabilize-text"
                    >
                        EXERRA
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}
