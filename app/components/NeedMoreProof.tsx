"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function ZoomWord({
  word,
  scrollYProgress,
  start,
  end,
  isFirst,
  stopAtEnd,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  isFirst: boolean;
  stopAtEnd?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const segment = end - start;
  // Scale: Mobile (2.5) or Desktop (8) -> 1 (Readable) -> 0 (Vanish)
  const initialScale = isMobile ? 2.5 : 8;
  const scale = useTransform(
    scrollYProgress,
    [start, start + segment * 0.4, end],
    [initialScale, 1, stopAtEnd ? 1 : 0],
    { clamp: true }
  );

  // Strict Opacity Gating
  const opacity = useTransform(scrollYProgress, (p) => {
    if (isFirst && p <= start) return 1;
    if (stopAtEnd && p >= start) return 1;
    if (p >= start && p < end) return 1;
    return 0;
  });

  return (
    <motion.div
      style={{
        scale,
        opacity,
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <span
        className="text-white text-[3rem] md:text-[4rem] leading-none tracking-[-0.01em] select-none whitespace-nowrap stabilize-text"
        style={{
          fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700,
        }}
      >
        {word}
      </span>
    </motion.div>
  );
}

export default function NeedMoreProof() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="proof" ref={containerRef} className="relative z-0 h-[400vh]" style={{ backgroundColor: "#0a1a3a" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#0a1a3a" }}>
        <ZoomWord word="NEED" scrollYProgress={scrollYProgress} start={0} end={0.333} isFirst={true} />
        <ZoomWord word="MORE" scrollYProgress={scrollYProgress} start={0.333} end={0.666} isFirst={false} />
        <ZoomWord word="PROOF?" scrollYProgress={scrollYProgress} start={0.666} end={1} isFirst={false} stopAtEnd />
      </div>
    </section>
  );
}
