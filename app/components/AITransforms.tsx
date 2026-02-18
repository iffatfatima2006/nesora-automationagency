"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const caseStudies = [
  {
    id: 0,
    brand: "EXERRA",
    isIntro: true,
    statement: "HOW AI TRANSFORMS BUSINESSES",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&q=75&auto=format&fit=crop",
    description: "Discover how our intelligent ecosystem is redefining the enterprise landscape through strategic AI integration.",
    color: "#0a0a0a"
  },
  {
    id: 1,
    brand: "BRITTALENT",
    statement: "SALESFORCE & CRM INTEGRATION",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&q=75&auto=format&fit=crop",
    description: "Unified customer data across multiple platforms, reducing manual entry by 80% and increasing productivity.",
    color: "#111827"
  },
  {
    id: 2,
    brand: "SYNCURALECACY",
    statement: "AI-POWERED AUTOMATION",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&q=75&auto=format&fit=crop",
    description: "Intelligent document processing and patient data management reduced processing time from hours to minutes.",
    color: "#022c22"
  },
  {
    id: 3,
    brand: "BRIGHTEDGE",
    statement: "SMART ANALYTICS TRANSFORMATION",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&q=75&auto=format&fit=crop",
    description: "Real-time SEO insights and automated recommendations drove 300% increase in organic traffic.",
    color: "#2e1065"
  },
  {
    id: 4,
    brand: "HAZEN.AI",
    statement: "MACHINE LEARNING ACCELERATION",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1400&q=75&auto=format&fit=crop",
    description: "Advanced AI algorithms enabled real-time decision-making and reduced operational costs by 60%.",
    color: "#000000"
  }
];

export default function AITransforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = sectionsRef.current;
      const images = imagesRef.current;
      const headings = headingsRef.current;

      // Initial State
      // Stack all sections with permanent Z-indexing
      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1, autoAlpha: 1, force3D: true });

        // Setup translateX for reveal (slides > 0 start off-screen to the right)
        if (i !== 0) {
          gsap.set(section, { xPercent: 100, autoAlpha: 0 });
        }
      });

      // First slide is fully visible
      gsap.set(sections[0], { xPercent: 0, autoAlpha: 1 });
      gsap.set(images[0], { xPercent: 0, scale: 1, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(caseStudies.length) * 120}%`, // Added buffer for smoother transitions
          pin: true,
          scrub: 0.8, // Slightly more responsive scrub
          anticipatePin: 1,
          fastScrollEnd: true, // Enable fast scroll end for better performance
        }
      });

      caseStudies.forEach((_, i) => {
        if (i === 0) return;

        const currentSection = sections[i];
        const prevSection = sections[i - 1];
        const currentImage = images[i];
        const prevImage = images[i - 1];
        const currentHeading = headings[i];

        tl.addLabel(`slide-${i}`);

        // Reveal next slide using xPercent (Composited)
        tl.set(currentSection, { autoAlpha: 1 }, `slide-${i}`);
        tl.to(currentSection, {
          xPercent: 0,
          duration: 1,
          ease: "none",
          immediateRender: false,
        }, `slide-${i}`);

        // Hide previous slide after it's covered to reduce paint area
        if (prevSection) {
          tl.to(prevSection, { autoAlpha: 0, duration: 0.1 }, `slide-${i}+=1`);
        }

        if (currentImage) {
          tl.fromTo(currentImage,
            { scale: 1.15, xPercent: 10, force3D: true }, // Reduced initial values for smoother start
            { scale: 1, xPercent: 0, duration: 1, ease: "none", immediateRender: false },
            `slide-${i}`
          );
        }

        if (prevImage) {
          tl.to(prevImage,
            { xPercent: -5, scale: 0.98, duration: 1, ease: "none", force3D: true },
            `slide-${i}`
          );
        }

        if (currentHeading) {
          const words = currentHeading.querySelectorAll('.word');
          tl.fromTo(words,
            { yPercent: 40, autoAlpha: 0 }, // Reduced distance for faster paint
            { yPercent: 0, autoAlpha: 1, stagger: 0.015, duration: 0.4, ease: "power1.out", immediateRender: false },
            `slide-${i}+=0.3`
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-sans z-20">
      <header className="absolute top-0 left-0 w-full px-4 md:px-12 h-28 flex items-center justify-between z-[100] pointer-events-none">
        <div className="text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.5em] text-white/90 uppercase font-bold">AI Case Studies</div>
        <div className="text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.5em] text-white/90 uppercase font-bold">Refined Experience</div>
      </header>

      {caseStudies.map((study, index) => (
        <div
          key={study.id}
          ref={(el) => { sectionsRef.current[index] = el; }}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform transform-gpu backface-hidden"
          style={{ pointerEvents: index === 0 ? "auto" : "none" }}
        >
          <div
            ref={(el) => { imagesRef.current[index] = el; }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-24 will-change-transform transform-gpu backface-hidden"
          >
             <div className="absolute inset-0 z-[-1]">
                <Image
                  src={study.image}
                  alt={study.brand}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/40" />
             </div>

            <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center space-y-12 relative z-10">
              <div className="flex flex-col items-center space-y-6">
                {!study.isIntro && (
                  <span className="text-[#60a5fa] font-black tracking-[0.5em] text-[14px] md:text-[16px] uppercase">{study.brand}</span>
                )}
                <h2
                  ref={(el) => { headingsRef.current[index] = el; }}
                  className={`text-white font-black tracking-tighter leading-[0.9] flex flex-wrap justify-center uppercase stabilize-text ${study.isIntro ? "text-6xl md:text-9xl" : "text-4xl md:text-7xl"}`}
                >
                  {study.statement.split(" ").map((word, i) => (
                    <span key={i} className="word inline-block mr-[0.2em]">{word}</span>
                  ))}
                </h2>
              </div>

              <p className="text-white/85 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                {study.description}
              </p>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
