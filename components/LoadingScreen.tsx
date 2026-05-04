"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animate progress from 0 to 100 over ~2.2 seconds
    const duration = 1200;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Brief pause at 100 before exit
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600); // wait for exit animation
        }, 300);
      } else {
        setProgress(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* Name */}
          <div className="flex flex-col items-center leading-none select-none">
            {/* "Prakhar" — white, large */}
            Portfolio of 
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-white font-light tracking-tight"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
            >
              Prakhar
            </motion.span>

            {/* "Shrivastava" — purple gradient */}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="bg-gradient-to-r from-[#a855f7] via-[#9333ea] to-[#7c3aed] text-transparent bg-clip-text font-light tracking-tight"
              style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
            >
              Shrivastava
            </motion.span>
          </div>

          {/* Progress bar + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-12 left-0 right-0 px-10 md:px-16"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/30 text-xs tracking-[0.25em] uppercase font-mono">
                Loading
              </span>
              <motion.span
                className="text-white font-mono font-bold text-xl tabular-nums"
                key={progress}
              >
                {progress}
              </motion.span>
            </div>

            {/* Track */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#a855f7] to-[#7c3aed]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
