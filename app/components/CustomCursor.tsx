"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ isHovering }: { isHovering: boolean }) {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 450 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Offset by half width to center (6px if width is 12)
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
        };

        window.addEventListener("mousemove", moveCursor);

        // Hide default cursor
        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.style.cursor = "auto";
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed left-0 top-0 pointer-events-none z-[100] flex items-center justify-center rounded-full border border-white mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                width: 12,
                height: 12,
            }}
            animate={{
                scale: isHovering ? 4 : 1, // Larger expansion on hover
                borderWidth: isHovering ? "0.5px" : "1.5px",
                opacity: isHovering ? 0.8 : 1,
            }}
            transition={{
                scale: { duration: 0.2 },
                borderWidth: { duration: 0.2 },
            }}
        >
            {/* Optional center dot, removed for minimal look */}
        </motion.div>
    );
}
