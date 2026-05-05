"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, Variants } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

/* ─── Full-Width Tilted Marquee ──────────────────────────────── */
const TiltedMarquee = ({ reverse = false }: { reverse?: boolean }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const firstChild = content.children[0] as HTMLElement;
    if (!firstChild) return;

    // Calculate width of one complete set (we render items twice)
    const totalWidth = content.scrollWidth;
    const singleSetWidth = totalWidth / 2;

    gsap.fromTo(
      content,
      { x: reverse ? -singleSetWidth : 0 },
      {
        x: reverse ? 0 : -singleSetWidth,
        duration: 400,
        ease: "none",
        repeat: -1,
      }
    );
  }, { scope: marqueeRef, dependencies: [reverse] });

  const items = [
    "Problem Solver.",
    "Code Architect.",
    "Full Stack Dev.",
    "AI/ML Enthusiast.",
    "System Designer.",
    "Tech Innovator.",
  ];

  return (
    <div
      ref={marqueeRef}
      className={`overflow-hidden ${reverse ? "rotate-3" : "-rotate-3"}`}
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <div ref={contentRef} className="flex gap-10 whitespace-nowrap">
        {/* Render items twice for seamless loop */}
        {[...Array(2)].map((_, setIdx) =>
          Array.from({ length: 15 }).map((_, groupIdx) =>
            items.map((item, itemIdx) => {
              const isAlternate = (groupIdx + itemIdx) % 2 === 0;
              return (
                <div
                  key={`${setIdx}-${groupIdx}-${itemIdx}`}
                  className={`text-4xl md:text-7xl font-black tracking-tighter flex-shrink-0 ${
                    isAlternate ? "text-[#CBACF9]" : "text-white"
                  }`}
                >
                  {item}
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
};

/* ─── Animated Counter ───────────────────────────────────────── */
const AnimatedCounter = ({ to, suffix = "", duration = 2.5 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString() + suffix;
      },
    });
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ─── Stat Card ──────────────────────────────────────────────── */
interface StatCardProps {
  number: number;
  suffix?: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  delay?: number;
  duration?: number;
}

const StatCard = ({
  number,
  suffix = "",
  title,
  subtitle,
  icon,
  delay = 0,
  duration = 2.5,
}: StatCardProps) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl bg-transparent p-6 md:p-8 hover:bg-white/[0.03] transition-all duration-500"
    >
      {/* glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CBACF9]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CBACF9]/20 to-transparent" />

      {/* Codolio link icon — top right */}
      <motion.a
        href="https://codolio.com/profile/prakhar362"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 right-6 z-20 p-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-[#CBACF9]/60 hover:text-[#CBACF9] hover:border-[#CBACF9]/30 hover:bg-white/[0.08] transition-all duration-300"
        title="View on Codolio"
      >
        <FaExternalLinkAlt size={16} />
      </motion.a>

      {/* content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* number + icon */}
        <div className="flex items-baseline gap-3">
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CBACF9] to-[#9333ea] tabular-nums">
            <AnimatedCounter to={number} suffix={suffix} duration={duration} />
          </div>
          {icon && <div className="text-2xl text-[#CBACF9]/70">{icon}</div>}
        </div>

        {/* title */}
        <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{title}</h3>

        {/* subtitle */}
        <p className="text-white/50 text-sm leading-relaxed">{subtitle}</p>
      </div>

      {/* corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#7c3aed]/3 rounded-tl-3xl group-hover:bg-[#7c3aed]/6 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN STATS SECTION
═══════════════════════════════════════════════════════════════ */
const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // optional: add any GSAP animations here if needed
  }, { scope: sectionRef });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible bg-black-100"
      style={{ marginLeft: 0, marginRight: 0 }}
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/8 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#CBACF9]/5 blur-[140px]" />

      {/* ── Top Marquee (full width) ── */}
      <div className="w-screen relative" style={{ left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
        <TiltedMarquee reverse={false} />
      </div>

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          {/* Left: Title */}
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none mb-2">
              PROOF
            </h2>
            <h3 className="text-5xl md:text-7xl font-black leading-none">
              <span className="text-[#CBACF9]">OVER</span>{" "}
              <span className="text-white">PROMISES.</span>
            </h3>
          </div>

          {/* Right: Description */}
          <div className="max-w-md">
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Behind every stat is a late-night grind, a "finally works" moment after the 47th attempt, 
              and the quiet satisfaction of cracking what seemed impossible. This is what consistency looks like in code.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["LeetCode", "Codolio", "HackerRank", "GitHub"].map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1 text-xs font-mono text-white/40 border border-white/10 rounded-md hover:text-[#CBACF9] hover:border-[#CBACF9]/30 transition-colors duration-300"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Stats Grid (constrained width, centered) ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <StatCard
            number={7}
            suffix="+"
            title="Enterprise Grade Production Systems"
            subtitle="Proven ability to optimize complex problems into feasible solutions."
            delay={0}
            duration={2.8}
          />
          <StatCard
            number={120}
            suffix="+"
            title="Days of Continuous Coding"
            subtitle="Consistent dedication to mastering software engineering fundamentals."
            delay={0.1}
            duration={2.6}
          />
          <StatCard
            number={325}
            suffix="+"
            title="DSA Problems Solved"
            subtitle="Extensive practice across Arrays, Dynamic Programming, and Graph traversal."
            delay={0.2}
            duration={2.7}
          />
          <StatCard
            number={5}
            title="Language Mastery Stars"
            subtitle="Verified expertise in Python, Java, and modern backend technologies."
            delay={0.3}
            duration={2.5}
          />
        </motion.div>
      </div>

      {/* ── Bottom Marquee (full width) ── */}
      <div className="w-screen relative" style={{ left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
        <TiltedMarquee reverse={true} />
      </div>
    </section>
  );
};

export default StatsSection;
