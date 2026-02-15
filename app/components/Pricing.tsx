"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";

function ArrowLabel({ label }: { label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "-20%"
    });

    return (
        <div ref={ref} className="flex flex-col items-start gap-4">
            <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-white text-sm uppercase tracking-[0.35em] font-semibold"
                style={{ fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif" }}
            >
                {label}
            </motion.span>
            <motion.svg
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                width="20"
                height="44"
                viewBox="0 0 20 44"
                fill="none"
                className="text-white/60"
            >
                <path
                    d="M10 0L10 40M10 40L2 30M10 40L18 30"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </motion.svg>
        </div>
    );
}

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "-15%"
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className="stabilize-text"
        >
            {children}
        </motion.div>
    );
}

interface PricingPlan {
    name: string;
    price: { monthly: string; annually: string };
    description: string;
    cta: string;
    features: string[];
    isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    {
        name: "Starter",
        price: { monthly: "$37", annually: "$30" },
        description: "Perfect for small businesses starting with AI automation.",
        cta: "Choose this plan",
        features: [
            "Basic workflow automation",
            "AI-powered personal assistant",
            "Standard analytics & reporting",
            "Email & chat support",
            "Up to 3 AI integrations"
        ]
    },
    {
        name: "Professional",
        price: { monthly: "$75", annually: "$60" },
        description: "Perfect for small businesses starting with AI automation.",
        cta: "Choose this plan",
        features: [
            "Advanced workflow automation",
            "AI-driven sales & marketing tools",
            "Enhanced data analytics & insights",
            "Priority customer support",
            "Up to 10 AI integrations"
        ],
        isPopular: true
    },
    {
        name: "Enterprise",
        price: { monthly: "Custom", annually: "Custom" },
        description: "Perfect for small businesses starting with AI automation.",
        cta: "Schedule a call",
        features: [
            "Fully customizable AI automation",
            "Dedicated AI business consultant",
            "Enterprise-grade compliance",
            "24/7 VIP support",
            "Unlimited AI integrations"
        ]
    }
];

function PricingCard({ plan, isAnnually, index }: { plan: PricingPlan; isAnnually: boolean; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const isMiddleCard = index === 1;

    return (
        <FadeInWhenVisible delay={index * 0.15}>
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`relative bg-black border rounded-2xl p-8 transition-all duration-500 ${plan.isPopular ? 'border-blue-500/50' : 'border-white/10'
                    } overflow-hidden group max-w-sm mx-auto min-h-[520px] flex flex-col`}
                style={{
                    boxShadow: isHovered
                        ? '0 20px 60px rgba(59, 130, 246, 0.3)'
                        : '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
            >
                {/* Circular Blue Hue */}
                <div
                    className={`absolute w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-[100px] transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        [isMiddleCard ? 'top' : 'bottom']: '-150px',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                />

                {/* Popular Badge */}
                {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">
                        Popular
                    </div>
                )}

                <div className="relative z-10 flex-1 flex flex-col">
                    {/* Plan Name */}
                    <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>{plan.name}</h3>

                    {/* Price */}
                    <div className="mb-3">
                        <span className="text-3xl font-bold text-white">
                            {isAnnually ? plan.price.annually : plan.price.monthly}
                        </span>
                        {plan.price.monthly !== "Custom" && (
                            <span className="text-white/60 text-sm ml-1">/month</span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/70 mb-4 min-h-[40px] flex-grow">{plan.description}</p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="w-full bg-white/20 hover:bg-white text-white hover:text-black font-semibold py-3 px-5 rounded-xl mb-6 border border-white/30 text-sm transition-colors duration-200"
                    >
                        {plan.cta}
                    </motion.button>

                    {/* Features */}
                    <div>
                        <h4 className="text-white/50 text-xs font-semibold mb-3 uppercase tracking-wider">
                            What's Included:
                        </h4>
                        <ul className="space-y-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                                    <svg
                                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </FadeInWhenVisible>
    );
}

export default function Pricing() {
    const [isAnnually, setIsAnnually] = useState(false);

    return (
        <section id="pricing" className="bg-black pt-16 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Arrow Label */}
                <div className="mb-12">
                    <ArrowLabel label="Our Pricing" />
                </div>

                {/* Heading */}
                <FadeInWhenVisible>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>
                        The Best AI Automation,<br />at the Right Price
                    </h2>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.1}>
                    <p className="text-base text-white/70 mb-10 max-w-3xl" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>
                        Choose a plan that fits your business needs and start automating with AI
                    </p>
                </FadeInWhenVisible>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-3 mb-14">
                    <span className={`text-sm font-medium transition-colors ${!isAnnually ? 'text-white' : 'text-white/40'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsAnnually(!isAnnually)}
                        className="relative w-12 h-6 bg-white/10 rounded-full border border-white/20 transition-colors hover:bg-white/20"
                    >
                        <motion.div
                            animate={{ x: isAnnually ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-blue-500 rounded-full"
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${isAnnually ? 'text-white' : 'text-white/40'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}>
                        Annually
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={plan.name} plan={plan} isAnnually={isAnnually} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
