"use client";

import { useRef } from "react";
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
  const segment = end - start;
  // Scale: 15 (Abstract) -> 1 (Readable) -> 0 (Vanish)
  const scale = useTransform(
    scrollYProgress,
    [start, start + segment * 0.4, end],
    [15, 1, stopAtEnd ? 1 : 0],
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
    <section id="proof" ref={containerRef} className="relative z-0 h-[250vh]" style={{ backgroundColor: "#0a1a3a" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#0a1a3a" }}>
        <ZoomWord word="NEED" scrollYProgress={scrollYProgress} start={0} end={0.333} isFirst={true} />
        <ZoomWord word="MORE" scrollYProgress={scrollYProgress} start={0.333} end={0.666} isFirst={false} />
        <ZoomWord word="PROOF?" scrollYProgress={scrollYProgress} start={0.666} end={1} isFirst={false} stopAtEnd />
      </div>
    </section>
  );
}
