"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showPercentage, setShowPercentage] = useState(false);

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const hasVisited = sessionStorage.getItem("exerra_visited");

    // Show percentage first
    setTimeout(() => {
      setShowPercentage(true);
    }, hasVisited ? 0 : 300);

    // Animate progress from 0 to 100
    const duration = hasVisited ? 1200 : 1800; // Increased to 1.2s on refresh for better visibility
    const startTime = Date.now();

    if (!hasVisited) {
      sessionStorage.setItem("exerra_visited", "true");
    }

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      const currentProgress = Math.floor(rawProgress);
      setProgress(currentProgress);

      if (rawProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        // Trigger completion animation immediately
        setIsComplete(true);
        setTimeout(() => {
          onComplete(); // Triggers unmount in parent
        }, 800);
      }
    };

    // Start after showing percentage
    const startDelay = hasVisited ? 50 : 600;
    setTimeout(() => {
      requestAnimationFrame(animateProgress);
    }, startDelay);

    return () => {
      clearInterval(timeInterval);
    };
  }, [onComplete]);

  const lineScale = Math.min(progress / 60, 1);

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden"
    >
      {/* Top Shutter */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-black z-40"
        initial={{ height: "50%" }}
        animate={{ height: isComplete ? "0%" : "50%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom Shutter */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-black z-40"
        initial={{ height: "50%" }}
        animate={{ height: isComplete ? "0%" : "50%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        key="loading-content"
        className="absolute inset-0 flex items-center justify-center z-50"
      >
        {/* Four corner texts - Using Climate Crisis Font */}
        <motion.div
          className="absolute left-6 top-6 text-[10px] text-white/80 md:left-10 md:top-10 md:text-xs font-[family-name:var(--font-climate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showPercentage && !isComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="uppercase tracking-[0.3em]">EXERRA</div>
        </motion.div>

        <motion.div
          className="absolute right-6 top-6 text-right text-[10px] text-white/80 md:right-10 md:top-10 md:text-xs font-[family-name:var(--font-climate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showPercentage && !isComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="uppercase tracking-[0.3em]">AGENCY</div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-6 text-[9px] text-white/70 md:bottom-10 md:left-10 md:text-[10px] font-[family-name:var(--font-climate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showPercentage && !isComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="tracking-wider">LAHORE, PAKISTAN</div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 right-6 text-right text-[10px] text-white/80 md:bottom-10 md:right-10 md:text-xs font-[family-name:var(--font-climate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showPercentage && !isComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="uppercase tracking-[0.3em]">{currentTime}</div>
        </motion.div>

        {/* Scale Line (Visual only, behind percentage) */}
        {!isComplete && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative h-[1px] w-screen overflow-visible"
              initial={{ opacity: 0 }}
              animate={{ opacity: showPercentage ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full w-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                style={{
                  transformOrigin: "center",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: lineScale }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        )}

        {/* Percentage display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {showPercentage && !isComplete && (
              <motion.div
                className="mt-8 pt-4 tabular-nums tracking-[0.15em] text-white md:mt-10 font-[family-name:var(--font-climate)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-base md:text-lg">{progress}</span>
                <span className="text-sm text-white/60 md:text-base ml-1">%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
