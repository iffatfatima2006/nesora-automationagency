"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// --- Data & Assets ---
const panels = [
    {
        id: "productivity",
        category: "Automation",
        title: "Productivity",
        description: "Automate repetitive work and reclaim hours every week. Your team focuses on thinking — systems handle the rest.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", // Modern Office/Desk
        layout: "text-left"
    },
    {
        id: "cost",
        category: "Efficiency",
        title: "Cost Efficiency",
        description: "Reduce operational overhead without cutting capability. Automation replaces manual bottlenecks with systems that scale.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Data/Analytics Dashboard
        layout: "text-right"
    },
    {
        id: "availability",
        category: "Reliability",
        title: "24/7 Availability",
        description: "Your business runs even when your team is offline. Support, workflows, and data flows operate continuously.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop", // Tech/Server/Abstract
        layout: "image-dominant" // Special layout
    },
    {
        id: "scale",
        category: "Growth",
        title: "Built to Scale",
        description: "Infrastructure designed for growth from day one. Add complexity without adding chaos.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Stylized Globe/Network
        layout: "minimal"
    }
];

// --- Components ---

// 1. Productivity Panel (Text Left, Image Right)
const ProductivityPanel = ({ data }: { data: typeof panels[0] }) => (
    <div className="w-screen h-full flex flex-col md:flex-row items-center justify-center px-8 md:px-24 gap-12 relative overflow-hidden">
        <div className="w-full md:w-1/2 space-y-8 z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3"
            >
                <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">{data.category}</span>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tighter stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
                {data.title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 max-w-lg leading-relaxed font-light stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
                {data.description}
            </motion.p>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative">
            <motion.div
                className="absolute inset-0 bg-slate-900"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-80 grayscale-[0.2]" />
            </motion.div>
        </div>
    </div>
);

// 2. Cost Panel (Diagram Left, Text Right)
const CostPanel = ({ data }: { data: typeof panels[1] }) => (
    <div className="w-screen h-full flex flex-col-reverse md:flex-row items-center justify-center px-8 md:px-24 gap-12 relative overflow-hidden bg-[#050A14]">
        <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] relative flex items-center justify-center p-12">
            {/* Abstract Diagram Visual - Removed Box Container */}
            <div className="relative w-full h-full flex items-end justify-between gap-4 max-w-lg mx-auto">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                    <motion.div
                        key={i}
                        className="w-full bg-slate-800 relative group overflow-hidden rounded-t-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-500/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>
        </div>
        <div className="w-full md:w-1/2 space-y-8 z-10 text-right md:items-end flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 self-end"
            >
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">{data.category}</span>
                <div className="w-8 h-[1px] bg-slate-700" />
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tighter stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
                Cost<br /><span className="text-slate-600">Efficiency</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 max-w-lg leading-relaxed font-light stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
                {data.description}
            </motion.p>
        </div>
    </div>
);

// 3. Availability Panel (Dark image dominant, Text overlay)
const AvailabilityPanel = ({ data }: { data: typeof panels[2] }) => (
    <div className="w-screen h-full relative flex items-center justify-center overflow-hidden bg-[#050A14]">
        <div className="absolute inset-0 z-0">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-8 md:px-24 flex flex-col justify-end h-full pb-32">
            <div className="border-l-4 border-cyan-500 pl-8 space-y-4">
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-cyan-400 font-mono text-sm tracking-widest uppercase block stabilize-text"
                >
                    {data.category} // SYSTEM_ACTIVE
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none stabilize-text"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                    24/7<br />ALWAYS ON
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl text-slate-400 max-w-xl font-light stabilize-text"
                >
                    {data.description}
                </motion.p>
            </div>
        </div>
    </div>
);

// 4. Scale Panel (Minimal, Architectural)
const ScalePanel = ({ data }: { data: typeof panels[3] }) => (
    <div className="w-screen h-full flex flex-col items-center justify-center bg-[#050A14] relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 text-center space-y-12 max-w-4xl px-8">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block border border-slate-700 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md will-change-transform"
            >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 stabilize-text">{data.category}</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl md:text-9xl font-bold text-white tracking-tighter stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
                BUILT TO<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">SCALE</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-12">
                {[
                    { label: "Uptime", val: "99.9%" },
                    { label: "Latency", val: "<50ms" },
                    { label: "Capacity", val: "∞" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                        className="border-t border-slate-800 pt-4"
                    >
                        <div className="text-4xl font-bold text-white stabilize-text">{stat.val}</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider mt-1 stabilize-text">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);


export default function BenefitsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Horizontal Scroll Logic
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section id="benefits" ref={containerRef} className="relative h-[400vh] bg-[#050A14]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">

                {/* Horizontal Track */}
                <motion.div style={{ x }} className="flex h-full w-[400vw] will-change-transform">
                    <ProductivityPanel data={panels[0]} />
                    <CostPanel data={panels[1]} />
                    <AvailabilityPanel data={panels[2]} />
                    <ScalePanel data={panels[3]} />
                </motion.div>

                {/* Global Progress Indicator (Pinned Bottom) */}
                <div className="absolute bottom-12 left-0 w-full px-8 md:px-24 flex justify-between items-end pointer-events-none z-50 mix-blend-difference text-white">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-50">
                        02 — Benefits
                    </div>
                    <div className="flex gap-2">
                        <motion.div
                            className="w-20 h-1 bg-white/20 rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="h-full bg-white"
                                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                            />
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
