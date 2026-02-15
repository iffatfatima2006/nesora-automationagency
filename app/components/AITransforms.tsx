"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const caseStudies = [
  {
    id: 0,
    brand: "EXERRA",
    isIntro: true,
    statement: "HOW AI TRANSFORMS BUSINESSES",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    description: "Discover how our intelligent ecosystem is redefining the enterprise landscape through strategic AI integration.",
    color: "#0a0a0a"
  },
  {
    id: 1,
    brand: "BRITTALENT",
    statement: "SALESFORCE & CRM INTEGRATION",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2670&auto=format&fit=crop",
    description: "Unified customer data across multiple platforms, reducing manual entry by 80% and increasing productivity.",
    color: "#111827"
  },
  {
    id: 2,
    brand: "SYNCURALECACY",
    statement: "AI-POWERED AUTOMATION",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    description: "Intelligent document processing and patient data management reduced processing time from hours to minutes.",
    color: "#022c22"
  },
  {
    id: 3,
    brand: "BRIGHTEDGE",
    statement: "SMART ANALYTICS TRANSFORMATION",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: "Real-time SEO insights and automated recommendations drove 300% increase in organic traffic.",
    color: "#2e1065"
  },
  {
    id: 4,
    brand: "HAZEN.AI",
    statement: "MACHINE LEARNING ACCELERATION",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop",
    description: "Advanced AI algorithms enabled real-time decision-making and reduced operational costs by 60%.",
    color: "#000000"
  }
];

export default function AITransforms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = sectionsRef.current;
    const images = imagesRef.current;
    const outerWrappers = outerWrappersRef.current;
    const innerWrappers = innerWrappersRef.current;
    const headings = headingsRef.current;

    // Pin the entire container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(caseStudies.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        // snap: 1 / (caseStudies.length - 1), // Optional: Snaps to each section
      }
    });

    // Initial State: First section is visible
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
    gsap.set(outerWrappers[0], { xPercent: 0 });
    gsap.set(innerWrappers[0], { xPercent: 0 });
    gsap.set(images[0], { xPercent: 0 });

    // Subsequent sections
    caseStudies.forEach((_, i) => {
      if (i === 0) return;

      // Animate entry of next section
      tl.fromTo(
        [outerWrappers[i], innerWrappers[i]],
        { xPercent: (index) => (index ? -100 : 100) },
        { xPercent: 0, duration: 1 },
        `section-${i}`
      )
        .fromTo(images[i], { xPercent: 15 }, { xPercent: 0, duration: 1 }, `section-${i}`)
        .set(sections[i], { autoAlpha: 1, zIndex: i + 1 }, `section-${i}`)

      // Animate exit of previous section (parallax)
      if (i > 0) {
        tl.to(images[i - 1], { xPercent: -15, duration: 1 }, `section-${i}`);
      }

      // Heading animation
      const currentHeading = headings[i];
      if (currentHeading) {
        const words = currentHeading.querySelectorAll('.word');
        tl.fromTo(
          words,
          { autoAlpha: 0, yPercent: 40 },
          { autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" },
          `section-${i}+=0.3`
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="case-studies" ref={containerRef} className="relative w-full bg-black overflow-hidden font-sans z-20">
      {/* Dynamic height spacer for ScrollTrigger pinning */}
      <div style={{ height: `${caseStudies.length * 100}vh` }} className="absolute inset-0 pointer-events-none" />

      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <header className="absolute top-0 left-0 w-full px-12 h-28 flex items-center justify-between z-[100] pointer-events-none">
          <div className="text-[11px] tracking-[0.5em] text-white/90 uppercase font-bold">AI Case Studies</div>
          <div className="text-[11px] tracking-[0.5em] text-white/90 uppercase font-bold">Refined Experience</div>
        </header>

        {caseStudies.map((study, index) => (
          <div
            key={study.id}
            ref={(el) => { if (el) sectionsRef.current[index] = el; }}
            className={`absolute inset-0 w-full h-full invisible overflow-hidden ${index === 0 ? "!visible opacity-100" : ""}`}
            style={{ zIndex: index }}
          >
            <div
              ref={(el) => { if (el) outerWrappersRef.current[index] = el; }}
              className="w-full h-full overflow-hidden"
            >
              <div
                ref={(el) => { if (el) innerWrappersRef.current[index] = el; }}
                className="w-full h-full overflow-hidden"
              >
                <div
                  ref={(el) => { if (el) imagesRef.current[index] = el; }}
                  className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 md:p-24"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(${study.image})`,
                  }}
                >
                  <div className="max-w-7xl w-full flex flex-col items-center justify-center text-center space-y-12">
                    <div className="flex flex-col items-center space-y-6">
                      {!study.isIntro && (
                        <span className="text-[#60a5fa] font-black tracking-[0.5em] text-[14px] md:text-[16px] uppercase">{study.brand}</span>
                      )}
                      <h2
                        ref={(el) => { if (el) headingsRef.current[index] = el; }}
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
            </div>
          </div>
        ))}


      </div>
    </section>
  );
}
