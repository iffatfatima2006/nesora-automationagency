"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import ParticleWaveScene from "./ParticleWaveScene";
import HeroOverlay from "./HeroOverlay";
import CustomCursor from "./CustomCursor";
import LightRays from "./LightRays";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const scrollProgressRef = useRef(0); // Mutable ref for R3F to read without re-renders

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        scrollProgressRef.current = latest;
    });

    // We let the browser manage scroll restoration or rely on the parent's control.
    // Explicitly removing window.scrollTo(0, 0) to avoid "snap" hitches on slow reloads.

    return (
        <div id="home" ref={containerRef} className="relative h-[250vh] w-full bg-[#040814]">
            <CustomCursor isHovering={isHovering} />

            {/* Sticky Container for 3D Scene and Content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Deep Blue Background with Gradient Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(14, 42, 71, 0.6), transparent 70%),
                            radial-gradient(ellipse 100% 100% at 50% 0%, rgba(14, 42, 71, 0.15), transparent),
                            linear-gradient(180deg, 
                                #0E2A47 0%, 
                                #071427 40%, 
                                #040814 70%, 
                                #030611 100%
                            ),
                            #040814
                        `
                    }}
                />

                {/* Subtle Noise Texture */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '128px 128px'
                    }}
                />

                {/* Light Rays */}
                <div className="absolute inset-0 z-1 pointer-events-none">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#F0F8FF"
                        raysSpeed={0.8}
                        lightSpread={0.6}
                        rayLength={2.5}
                        followMouse={true}
                        mouseInfluence={0.08}
                        noiseAmount={0}
                        distortion={0}
                        pulsating={false}
                        fadeDistance={1.2}
                        saturation={0.9}
                    />
                </div>

                <div className="absolute inset-0 z-5">
                    <ParticleWaveScene
                        scrollRef={scrollProgressRef}
                        setHovering={setIsHovering}
                    />
                </div>

                <HeroOverlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
