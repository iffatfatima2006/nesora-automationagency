"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import DarkVeil from "./DarkVeil";

// Custom Visual Components for each step
// Custom Icons as SVGs
const Icons = {
  Scan: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /><path d="M12 7v10" /></svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Refresh: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
  Chart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  ),
  Rocket: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" /><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" /></svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  Tension: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  )
};

const Step1Visual = () => {
  return (
    <div className="flex h-full gap-8 p-8">
      {/* LHS: Scanner */}
      <div className="flex-1 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
        <div className="w-48 h-48 rounded-full border border-blue-500/30 relative flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/80 animate-spin"
            style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', animationDuration: '4s' }}
          />
          <div
            className="w-32 h-32 rounded-full bg-blue-500/10 animate-pulse"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
          <div className="text-blue-400 opacity-50"><Icons.Scan /></div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold"
            style={{ fontFamily: 'var(--font-climate)' }}>
            NEXORA
          </span>
        </div>
      </div>

      {/* RHS: Checklist */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        {[
          { icon: <Icons.Zap />, text: "Analysis" },
          { icon: <Icons.Refresh />, text: "Mapping" },
          { icon: <Icons.Shield />, text: "Security" },
          { icon: <Icons.Chart />, text: "Flow Check" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-lg border border-white/10"
          >
            <div className="text-blue-400">{item.icon}</div>
            <span className="text-sm font-medium text-white/80">{item.text}</span>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Step2Visual = () => {
  const codeLines = [
    "import { Solution } from '@nexora/core';",
    "",
    "const architecture = new Solution({",
    "  cloud: 'aws',",
    "  scale: 'auto',",
    "  security: 'enterprise'",
    "});",
    "",
    "await architecture.deploy();"
  ];

  return (
    <div className="h-full p-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 text-sm"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Editor Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-4 text-[11px] text-white/60 font-black uppercase tracking-[-0.02em]"
            style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif', transform: 'scaleX(0.85)', transformOrigin: 'left' }}>
            Solution_Architecture.sys
          </span>
        </div>

        {/* Editor Body */}
        <div className="p-6 space-y-1 font-mono">
          {codeLines.map((line, i) => (
            <div key={i} className="overflow-hidden flex">
              <motion.div
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.625, 0.05, 0, 1]
                }}
                className="flex"
              >
                <span className="w-6 text-white/20 select-none mr-4">{i + 1}</span>
                <span className={line.startsWith("import") ? "text-purple-400" : line.includes("const") ? "text-blue-400" : "text-gray-300"}>
                  {line || "\u00A0"}
                </span>
              </motion.div>
            </div>
          ))}
          <div
            className="w-2 h-4 bg-blue-500 mt-1 ml-10 animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

const Step3Visual = () => {
  return (
    <div className="h-full p-8 flex items-center gap-4 justify-between relative overflow-hidden">
      {/* Background Grid Pattern (Overlay) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Connecting Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path
          d="M 160 250 Q 250 150, 360 250"
          fill="none"
          stroke="rgba(59, 130, 246, 0.4)"
          strokeWidth="1"
          strokeDasharray="10 5"
        />
        <defs>
          <linearGradient id="gradient-line-3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
      </svg>

      {/* LHS: Solution */}
      <div className="w-1/2 z-10 flex flex-col items-center">
        <div
          className="w-32 h-32 bg-blue-600/10 rounded-full border border-blue-500/30 flex items-center justify-center mb-6 relative group animate-bounce"
          style={{ animationDuration: '4s' }}
        >
          <div className="absolute inset-0 rounded-full bg-blue-500/10" />
          <div className="text-blue-500 relative z-10 scale-125"><Icons.Rocket /></div>

          <div
            className="absolute inset-[-10px] border border-dashed border-white/5 rounded-full animate-spin"
            style={{ animationDuration: '20s' }}
          />
          <div
            className="absolute inset-[-25px] border border-dashed border-white/10 rounded-full animate-spin"
            style={{ animationDuration: '30s', animationDirection: 'reverse' }}
          />
        </div>
        <span className="text-white/40 text-[11px] tracking-[-0.02em] uppercase font-black"
          style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif', transform: 'scaleX(0.8)', display: 'inline-block' }}>
          Core_Engine_V.2
        </span>
      </div>

      {/* RHS: Integration Network */}
      <div className="w-1/2 z-10 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Center Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center z-20">
            <div className="text-white/20"><Icons.Layers /></div>
          </div>

          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent" />
              </div>
            </div>
          ))}

          {/* Orbiting Ring */}
          <div className="absolute inset-[-20px] rounded-full border border-white/[0.05] border-dashed animate-[spin_20s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};

const Step4Visual = () => (
  <div className="h-full relative overflow-hidden bg-black font-mono">
    {/* Video Overlay Effect (Scanning Beam) - CSS only */}
    <div
      className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-1/2 animate-pulse"
      style={{ animationDuration: '3s' }}
    />

    {/* Recording UI */}
    <div className="absolute top-6 left-6 z-40 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
      <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">REC</span>
      <span className="text-[10px] text-white/40 ml-2">CH-01 // LIVE_FEED</span>
    </div>

    <div className="p-8 h-full flex flex-col relative z-20">
      <div className="flex items-center justify-between mb-8 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Network Topology</span>
          <span className="text-white/60 text-xs">A-CLUSTER // ACTIVE</span>
        </div>
        <div className="text-blue-500/40 scale-150"><Icons.Tension /></div>
      </div>

      {/* Grid of data points */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {[
          { label: "Flow Rate", value: "84.2%", p: 84 },
          { label: "Sync Status", value: "Optimal", p: 100 },
          { label: "Data Integrity", value: "99.9%", p: 99 },
          { label: "Load Balancer", value: "Active", p: 100 }
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[8px] uppercase text-white/20">{stat.label}</span>
              <div className="w-1 h-1 rounded-full bg-blue-500/50" />
            </div>
            <span className="text-lg text-white/70">{stat.value}</span>
            <div className="flex-1 mt-auto">
              <div className="w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full bg-blue-500/20"
                  style={{ width: `${stat.p}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Metadata */}
      <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-4 opacity-40 text-[9px]">
        <div className="flex flex-col gap-1">
          <span>LATENCY: 14MS</span>
          <span>PACKETS: 1.2M/SEC</span>
        </div>
        <div className="text-right">
          <span>TIMESTAMP: 2026.02.14</span>
          <br />
          <span>08:14:22:01</span>
        </div>
      </div>
    </div>

    {/* HUD Elements */}
    <div className="absolute inset-0 border border-white/5 pointer-events-none m-4 flex flex-col justify-between">
      <div className="flex justify-between p-2">
        <div className="w-4 h-4 border-t border-l border-white/20" />
        <div className="w-4 h-4 border-t border-r border-white/20" />
      </div>
      <div className="flex justify-between p-2">
        <div className="w-4 h-4 border-b border-l border-white/20" />
        <div className="w-4 h-4 border-b border-r border-white/20" />
      </div>
    </div>
  </div>
);

const steps = [
  {
    id: 1,
    title: "Discovery & Analysis",
    description: "We dive deep into your business goals, systems, and workflows to identify opportunities across automation, AI, cloud, and CRM tools.",
    checklist: [
      "Analyzing current workflow..",
      "System check",
      "Process check",
      "Speed check",
      "Manual work",
      "Repetitive task"
    ]
  },
  {
    id: 2,
    title: "Solution Architecture",
    description: "Our team designs a tailored solution — whether it's migrating to the cloud, building custom automations, or deploying AI agents — aligned with your goals.",
    code: `class AutomationTrigger:
    def __init__(self, threshold): 
        self.threshold = threshold 
        self.status = "inactive" 

    def check_trigger(self, value): 
        if value > self.threshold: 
            self.status = "active" 
            return "Automation triggered!" 
        else: 
            return "No action taken."
    
    def get_status(self): 
        return f"Status: {self.status}"`
  },
  {
    id: 3,
    title: "Build & Integrate",
    description: "We develop and deploy the solution, integrating seamlessly with your existing platforms like Salesforce, GoHighLevel, HubSpot, and more — with minimal disruption.",
    visual: "integration"
  },
  {
    id: 4,
    title: "Monitor & Optimize",
    description: "We continuously monitor performance, fine-tune workflows, and scale your systems as your business evolves — keeping everything fast, stable, and future-ready.",
    visual: "monitor"
  }
];

export default function OurProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end start"] // Delayed start - cards begin animating after scrolling 20% into view
  });

  // Fixed 3D Positions for the 4 slots
  // Slot 0: Front
  // Slot 1: Behind 0
  // Slot 2: Behind 1
  // Slot 3: Back (Bottom) of deck
  const POSITIONS = [
    { x: 0, y: 0, z: 0, scale: 1, zIndex: 4, rotateX: 5 },       // Front
    { x: 40, y: -50, z: -80, scale: 0.95, zIndex: 3, rotateX: 8 }, // 2nd
    { x: 80, y: -100, z: -160, scale: 0.9, zIndex: 2, rotateX: 12 }, // 3rd
    { x: 120, y: -150, z: -240, scale: 0.85, zIndex: 1, rotateX: 15 } // Back
  ];

  // Map 0-1 scroll to 0-4 total steps (cycles)
  // Animation starts after 25% scroll buffer
  const totalProgress = useTransform(scrollYProgress, [0.25, 1], [0, steps.length]);

  return (
    <section id="process" ref={containerRef} className="relative min-h-[400vh] bg-black">
      {/* DarkVeil Background Effect */}
      <div className="sticky top-0 h-screen z-0 pointer-events-none opacity-60">
        <DarkVeil
          hueShift={45}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={0.5}
        />
      </div>

      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
        }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-10 -mt-[100vh]"
      >
        <div className="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text Content - Moved Up */}
          <div className="relative h-[600px] z-10 -mt-24 flex flex-col justify-center">
            <motion.div
              className="mb-6 -mt-48"
            >
              {/* "How We Work" reveal animation with arrow */}
              <div className="flex items-center gap-4 mb-4">
                <motion.svg
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="white" strokeWidth="2" />
                </motion.svg>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="text-sm uppercase tracking-[0.3em] text-white/60 font-semibold"
                >
                  How We Work
                </motion.span>
              </div>

              {/* "Our Process" reveal animation */}
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] stabilize-text"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Our Process
              </motion.h2>
            </motion.div>

            <div className="relative mt-16 w-full">
              {steps.map((step, index) => {
                // Wider scroll ranges for ultra-smooth cross-fades
                const y = useTransform(totalProgress,
                  [index - 0.7, index - 0.2, index, index + 0.2, index + 0.7],
                  [40, 10, 0, -10, -40]
                );

                const opacity = useTransform(totalProgress,
                  [index - 0.7, index - 0.15, index, index + 0.15, index + 0.7],
                  [0, 0.8, 1, 0.8, 0]
                );

                // Pointer-events only, no display toggle (avoids layout thrash)
                const pointerEvents = useTransform(totalProgress, (t) => {
                  return Math.abs(t - index) < 0.8 ? "auto" : "none";
                });

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity, y, pointerEvents }}
                    className="absolute top-[-40px] left-0 w-full space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{step.id}</span>
                      </div>
                      <h3 className="text-3xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                      {step.description}
                    </p>

                    {/* Step-specific content */}
                    {step.checklist && (
                      <div className="space-y-2 mt-6">
                        {step.checklist.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 text-white/60"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-sm tracking-wide">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Cards Stack - Angled Left */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 -right-12" style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}>
              {steps.map((step, index) => (
                <ProcessCard
                  key={step.id}
                  step={step}
                  index={index}
                  totalProgress={totalProgress}
                  POSITIONS={POSITIONS}
                  stepsCount={steps.length}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Extracted Component to fix Rules of Hooks
interface ProcessCardProps {
  step: { id: number; title: string; description: string;[key: string]: any };
  index: number;
  totalProgress: any;
  POSITIONS: any[];
  stepsCount: number;
}

const ProcessCard = ({ step, index, totalProgress, POSITIONS, stepsCount }: ProcessCardProps) => {
  // Determine layout for this card based on global cycle progress
  const transform = useTransform(totalProgress, (t: number) => {
    // Current cycle step (0, 1, 2, 3) relative to total scroll
    // Ensure we don't exceed bounds
    const stepCount = stepsCount;
    const clampedT = Math.min(t, stepCount - 0.001);

    const currentStepIndex = Math.floor(clampedT);
    const stepProgress = clampedT - currentStepIndex;

    // Calculate which slot this card is currently in.
    // Logic: At step 0, card 0 is at slot 0.
    // At step 1, card 0 is at slot 3 (dropped). Card 1 is at slot 0.
    // Slot index = (CardIndex - StepIndex + TotalSteps) % TotalSteps
    const currentSlot = (index - currentStepIndex + stepCount) % stepCount;

    // Determine Target Slot
    // If currentSlot is 0 (Front), it drops to Slot 3 (Back)
    // Else, it simply moves forward to Slot - 1
    let nextSlot = currentSlot === 0 ? stepCount - 1 : currentSlot - 1;

    const startPos = POSITIONS[currentSlot];
    const endPos = POSITIONS[nextSlot];

    if (currentSlot === 0) {
      // DROP ANIMATION (Slot 0 -> Slot 3)
      // Non-linear path: Drop down -> Go Back -> Rise up to Slot 3

      // Phase 1 (0-50%): Drop down and start moving back
      if (stepProgress < 0.5) {
        const p = stepProgress * 2; // 0 to 1
        return {
          x: startPos.x + (p * -50), // Slight left
          y: startPos.y + (p * 400), // BIG DROP
          z: startPos.z + (p * -200), // Start moving back
          scale: startPos.scale * (1 - p * 0.1),
          rotateX: startPos.rotateX + (p * 20),
          zIndex: 4 // Stay on top initially? or drop behavior?
        };
      }
      // Phase 2 (50%-100%): Move to final Slot 3 Back Position
      else {
        const p = (stepProgress - 0.5) * 2; // 0 to 1
        // Interpolate from [Dropped State] to [EndPos]
        const droppedX = startPos.x - 50;
        const droppedY = startPos.y + 400;
        const droppedZ = startPos.z - 200;
        const droppedRot = startPos.rotateX + 20;

        return {
          x: droppedX + (endPos.x - droppedX) * p,
          y: droppedY + (endPos.y - droppedY) * p,
          z: droppedZ + (endPos.z - droppedZ) * p,
          scale: (startPos.scale * 0.9) + (endPos.scale - (startPos.scale * 0.9)) * p,
          rotateX: droppedRot + (endPos.rotateX - droppedRot) * p,
          zIndex: 0 // Drop behind
        };
      }
    } else {
      // SHIFT ANIMATION (Slot N -> Slot N-1)
      // Linear interpolation
      return {
        x: startPos.x + (endPos.x - startPos.x) * stepProgress,
        y: startPos.y + (endPos.y - startPos.y) * stepProgress,
        z: startPos.z + (endPos.z - startPos.z) * stepProgress,
        scale: startPos.scale + (endPos.scale - startPos.scale) * stepProgress,
        rotateX: startPos.rotateX + (endPos.rotateX - startPos.rotateX) * stepProgress,
        zIndex: startPos.zIndex // Usually keeps higher z-index until swaps? 
      };
    }
  });

  // RENDER CARD CONTENT BASED ON STEP ID
  const renderVisual = () => {
    switch (step.id) {
      case 1: return <Step1Visual />;
      case 2: return <Step2Visual />;
      case 3: return <Step3Visual />;
      default: return <Step4Visual />;
    }
  };

  // Single consolidated transform string — one useTransform instead of 6
  const cardStyle = useTransform(transform, (t) => ({
    transform: `translateX(${t.x}px) translateY(${t.y}px) translateZ(${t.z}px) scale(${t.scale}) rotateX(${t.rotateX}deg) rotateY(-10deg)`,
    zIndex: Math.round(t.zIndex),
  }));

  return (
    <motion.div
      style={{
        transform: useTransform(cardStyle, s => s.transform),
        zIndex: useTransform(cardStyle, s => s.zIndex),
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
        background: "rgba(0, 0, 0, 0.95)",
      }}
      className="absolute top-1/4 left-0 w-full h-[500px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Blueprint Grid */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Technical Metadata Strings */}
          <div className="absolute top-12 right-8 text-[8px] font-mono text-blue-400/30 rotate-90 origin-right whitespace-nowrap">
            SYS_PROCESS_INIT::{index} // BUFFER_LATENCY::14ms // CORE_SYNC_OK
          </div>
          <div className="absolute bottom-12 left-8 text-[8px] font-mono text-blue-400/30 -rotate-90 origin-left whitespace-nowrap">
            NEXORA_PROTOCOL_V4.2 // ENCRYPT_AES_256 // KEY_VERIFIED
          </div>

          {/* Floating Technical Particles - CSS only */}
          <div
            className="absolute bottom-0 left-1/4 w-[1px] h-20 bg-gradient-to-t from-transparent via-blue-500/40 to-transparent animate-pulse"
            style={{ animationDuration: '4s', animationDelay: `${index * 0.5}s` }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-[1px] h-32 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"
            style={{ animationDuration: '5s', animationDelay: `${index * 0.8}s` }}
          />
        </div>

        {/* HUD Corner Markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-white/10" />
          <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-white/10" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-white/10" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-white/10" />
        </div>

        {/* Glass Shine Effect - CSS only */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-12 pointer-events-none"
        />

        {/* Card Content Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{step.id}</span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Step {step.id}</span>
          </div>
          <h4 className="text-2xl font-semibold text-white mb-4">{step.title}</h4>
        </div>

        {/* Card Content - Custom Visuals */}
        <div className="flex-1 flex items-center justify-center">
          {renderVisual()}
        </div>
      </div>
    </motion.div>
  );
};
