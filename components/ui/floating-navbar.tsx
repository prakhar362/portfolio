"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

/* ─── Magnetic wrapper ───────────────────────────────────────── */
const MagneticItem = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 22 });
  const y = useSpring(0, { stiffness: 300, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
};

/* ─── Scroll progress bar ────────────────────────────────────── */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#7c3aed] via-[#CBACF9] to-[#7c3aed]"
    />
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════════════════════════════ */
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");

  /* hide/show on scroll direction */
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;
    const prev = scrollYProgress.getPrevious() ?? 0;
    setScrolled(current > 0.02);
    if (current < 0.05) {
      setVisible(true);
    } else {
      setVisible(current - prev < 0);
    }
  });

  /* active section via IntersectionObserver */
  useEffect(() => {
    const ids = navItems.map((n) => n.link.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn("fixed top-8 inset-x-0 z-[5000] flex justify-center pointer-events-none", className)}
      >
        {/* pill */}
        <motion.nav
          animate={{
            backgroundColor: scrolled ? "rgba(6,4,18,0.92)" : "rgba(6,4,18,0.65)",
            borderColor: scrolled ? "rgba(203,172,249,0.14)" : "rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(124,58,237,0.15), 0 0 0 1px rgba(203,172,249,0.06)"
              : "0 2px 12px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto relative flex items-center gap-1 px-2 py-2 rounded-2xl border backdrop-blur-xl overflow-hidden"
        >
          {/* scroll progress */}
          <ScrollBar />

          {/* top highlight line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#CBACF9]/20 to-transparent pointer-events-none" />

          {navItems.map((item, idx) => {
            const isActive = activeSection === item.link.replace("#", "");
            const isHovered = hoveredIdx === idx;

            return (
              <MagneticItem key={item.link}>
                <Link
                  href={item.link}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium select-none"
                >
                  {/* hover bg */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.span
                        key="hbg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 rounded-xl bg-white/[0.05] border border-white/[0.07]"
                      />
                    )}
                  </AnimatePresence>

                  {/* active pill — spring-slides between links */}
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-[#CBACF9]/10 border border-[#CBACF9]/22"
                    />
                  )}

                  {/* active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="relative z-10 w-1 h-1 rounded-full bg-[#CBACF9] shadow-[0_0_5px_#CBACF9]"
                    />
                  )}

                  {/* label */}
                  <motion.span
                    animate={{
                      color: isActive ? "#CBACF9" : isHovered ? "#ffffff" : "rgba(255,255,255,0.5)",
                    }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10"
                  >
                    {item.name}
                  </motion.span>

                  {/* underline */}
                  <motion.span
                    animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                    className={cn(
                      "absolute bottom-0.5 left-4 right-4 h-px rounded-full",
                      isActive
                        ? "bg-gradient-to-r from-[#7c3aed] to-[#CBACF9]"
                        : "bg-white/15"
                    )}
                  />
                </Link>
              </MagneticItem>
            );
          })}
        </motion.nav>
      </motion.div>
    </AnimatePresence>
  );
};
