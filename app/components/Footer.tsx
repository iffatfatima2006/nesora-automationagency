"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LiquidEther from "./LiquidEther";

// Scrolling headline component - CSS keyframes for smooth perf
function ScrollingHeadline() {
    const text = "LET'S TALK ▲ LET'S TALK ▲ ";
    const repeatedText = text.repeat(4);

    return (
        <div className="overflow-hidden mb-20">
            <div
                className="whitespace-nowrap text-7xl md:text-8xl lg:text-9xl font-bold text-white"
                style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    animation: 'footerMarquee 25s linear infinite',
                }}
            >
                {repeatedText}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes footerMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}} />
        </div>
    );
}

export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer id="contact" className="relative min-h-screen bg-[#050816] overflow-hidden">
            {/* LiquidEther Background */}
            <div className="absolute inset-0">
                <LiquidEther
                    colors={['#0B3D91', '#155DFC', '#1E6BFF']}
                    mouseForce={12}
                    cursorSize={80}
                    isViscous
                    viscous={20}
                    iterationsViscous={16}
                    iterationsPoisson={16}
                    resolution={0.3}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.3}
                    autoIntensity={1.5}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen justify-between py-16 px-6 md:px-12">
                {/* Top Section - Scrolling Headline */}
                <div className="pt-16">
                    <ScrollingHeadline />
                </div>

                {/* Main Content Section */}
                <div className="flex-1 max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                        {/* Left Column - Brand & Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 space-y-8"
                        >
                            {/* Brand */}
                            <div className="space-y-4">
                                <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    EXERRA
                                </h3>
                                <p className="text-white/70 text-base leading-relaxed max-w-md" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    EXERRA – Automate Smarter, Optimize Faster, and Grow Stronger.
                                </p>
                            </div>

                            {/* Newsletter */}
                            <div className="space-y-4">
                                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    Join our newsletter
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@email.com"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-[#155DFC] hover:bg-[#1E6BFF] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(30,107,255,0.5)]"
                                    >
                                        Subscribe
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Columns - Links */}
                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                            {/* Links Column */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="space-y-4"
                            >
                                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Links</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Benefits", href: "#benefits" },
                                        { label: "Our Process", href: "#process" },
                                        { label: "Case Studies", href: "#case-studies" },
                                        { label: "Testimonials", href: "#testimonials" },
                                        { label: "Pricing", href: "#pricing" },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                                                }}
                                                className="text-white/70 hover:text-white transition-colors text-sm"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Pages Column */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-4"
                            >
                                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Pages</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Home", href: "#home" },
                                        { label: "Process", href: "#process" },
                                        { label: "Proof", href: "#proof" },
                                        { label: "Pricing", href: "#pricing" },
                                        { label: "Contact", href: "#contact" },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                                                }}
                                                className="text-white/70 hover:text-white transition-colors text-sm"
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Socials Column */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="space-y-4"
                            >
                                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Socials</h4>
                                <ul className="space-y-3">
                                    {[
                                        { name: "LinkedIn", url: "https://www.linkedin.com/in/iffat-fatima66/" },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="max-w-7xl mx-auto w-full">
                    <div className="pt-8 text-center">
                        <div className="text-white text-2xl font-medium" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            EXERRA ©
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
