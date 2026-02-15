"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const testimonials = [
    {
        id: 1,
        quote: "Nexora's AI transforms went beyond automation; they fundamentally reshaped our operational efficiency. The level of precision and strategic insight is unparalleled.",
        author: "Sarah Jensen",
        role: "COO at BritTalent",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        id: 2,
        quote: "The integration process was seamless. We saw a 40% increase in lead conversion within the first quarter. Nexora is the baseline for premium AI consulting.",
        author: "Marcus Chen",
        role: "VP of Growth, Syncura",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        id: 3,
        quote: "Working with Nexora felt like having an elite R&D team on demand. Their ability to translate complex data into actionable AI models is world-class.",
        author: "Elena Rodriguez",
        role: "CEO at Hazen.ai",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    },
];

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "-15% 0px -15% 0px"
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-black pt-16 pb-24 px-6 md:px-12 overflow-hidden" style={{ fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
            <div className="max-w-7xl mx-auto space-y-48">
                {testimonials.map((t, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div
                            key={t.id}
                            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <FadeInWhenVisible delay={0.2}>
                                    <div className="relative group">
                                        <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <Image
                                                src={t.image}
                                                alt={t.author}
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            </div>

                            {/* Text Side */}
                            <div className="w-full lg:w-1/2 space-y-8 pt-12 lg:pt-32">
                                <FadeInWhenVisible>
                                    <div className="relative">
                                        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight tracking-tight relative z-10">
                                            &ldquo;{t.quote}&rdquo;
                                        </blockquote>
                                    </div>
                                </FadeInWhenVisible>

                                <FadeInWhenVisible delay={0.1}>
                                    <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-6">
                                        <cite className="text-lg md:text-xl font-bold text-white not-italic uppercase tracking-wider">
                                            {t.author}
                                        </cite>
                                        <span className="text-blue-400 font-medium text-sm uppercase tracking-[0.2em]">
                                            {t.role}
                                        </span>
                                    </div>
                                </FadeInWhenVisible>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
