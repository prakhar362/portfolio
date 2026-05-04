"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import GithubStats from "./GithubStats";
import { FaLocationArrow } from "react-icons/fa6";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import MagicButton from "./MagicButton";
import { desc } from "motion/react-client";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─── Live IST Clock ─────────────────────────────────────────── */
const ISTClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-mono">
        Based in Mumbai, India
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-white font-mono font-bold text-3xl tabular-nums tracking-tight">
          {time}
        </span>
        <span className="text-white/40 text-xs font-mono">(IST)</span>
      </div>
    </div>
  );
};

/* ─── Animated counter ───────────────────────────────────────── */
const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration: 1.6,
      ease: "power3.out",
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
};

/* ─── Toolkit data ───────────────────────────────────────────── */
const toolkit = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, C++, Java",
  },
  {
    label: "Web / Mobile",
    items: "React, Next.js, React Native, Node.js, Express",
  },
  {
    label: "Tools & DB",
    items: "MongoDB, PostgreSQL, Redis, Docker, AWS",
  },
];

/* ─── Social links (same as Hero) ───────────────────────────── */
const people = [
  {
    id: 1,
    name: "Twitter(X)",
    designation: "prakharshri2005",
    image:
      "https://i.pinimg.com/736x/91/8b/20/918b20dc0aa716e09fd0a58f9dd8e720.jpg",
    link: "https://twitter.com/prakharshri2005",
  },
  {
    id: 2,
    name: "LinkedIn",
    designation: "Prakhar Shrivastava",
    image:
      "https://www.citypng.com/public/uploads/preview/hd-vector-flat-linkedin-in-round-icon-png-701751695046390m4phkuuiqm.png",
    link: "https://www.linkedin.com/in/prakhar-shrivastava-a4927b2b5/",
  },
  {
    id: 3,
    name: "Github",
    designation: "prakhar362",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAikO6HfgCm0CRT5sSRBlYIwdPk7-08utow&s",
    link: "https://github.com/prakhar362",
  },
  {
    id: 4,
    name:"Codolio",
    designation:"prakhar15",
    image:"https://images.sftcdn.net/images/t_app-icon-s/p/6b211da4-a749-455a-bff4-af07dfb22b1c/860392068/codolio-logo",
    link:"https://codolio.com/profile/prakhar15"
  }
];

/* ─── Stat pill ──────────────────────────────────────────────── */
const stats = [
  { value: 9, suffix: "+", label: "Projects" },
  { value: 4, suffix: "+", label: "Internships" },
  { value: 2, suffix: "+", label: "Years Coding" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  /* ── GSAP: section-level scroll animations ── */
  useGSAP(() => {
    if (!sectionRef.current) return;

    // Photo parallax
    gsap.to(photoRef.current, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Accent line draw
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Bio text split reveal
    if (bioRef.current) {
      const split = new SplitText(bioRef.current.querySelectorAll(".split-text"), {
        type: "lines",
        linesClass: "overflow-hidden",
      });
      gsap.fromTo(
        split.lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, { scope: sectionRef });

  /* ── Framer variants ── */
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 w-full overflow-hidden bg-black-200"
    >
      {/* ── ambient glows ── */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#CBACF9]/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px]" />

      {/* ── section label ── */}
      <motion.p
        ref={labelRef}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 left-6 md:left-12 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-mono"
      >
       About Me
      </motion.p>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ════════════════════════════════════════
            TOP ROW — Photo + Main Content
        ════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[38%] flex-shrink-0"
          >
            <div ref={photoRef} className="relative group">
              {/* glow behind photo */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#CBACF9]/20 to-blue-600/10 blur-2xl opacity-100 transition-opacity duration-700" />

              {/* photo frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-[3/4] max-h-[520px]">
                <img
                  src="/psprofile.jpg"
                  alt="Prakhar Shrivastava"
                  className="w-full h-full object-cover object-top   transition-all duration-1000 scale-100 group-hover:scale-105"
                />
                {/* subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010312]/60 via-transparent to-transparent" />
              </div>

              {/* floating "Available" badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 left-4 flex items-center gap-2 bg-[#010312]/90 backdrop-blur border border-[#CBACF9]/30 rounded-full px-4 py-2 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-semibold tracking-wide">Available for Hire</span>
              </motion.div>
            </div>

            
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <div className="flex-1 flex flex-col gap-8 pt-2 lg:pt-10">

            {/* accent line + bio */}
            <div className="flex gap-6 items-start">
              {/* vertical accent line */}
              <div
                ref={lineRef}
                className="hidden md:block w-[2px] min-h-[160px] self-stretch bg-gradient-to-b from-[#CBACF9] to-[#7c3aed] rounded-full flex-shrink-0 mt-1"
              />

              {/* bio text */}
              <div ref={bioRef} className="flex flex-col gap-5">
                <p className="split-text text-white/80 text-base md:text-lg leading-relaxed">
                  I&apos;m a{" "}
                  <strong className="text-white font-semibold">pre-final year IT Engineering student at VESIT</strong>{" "}
                  passionate about{" "}
                  <strong className="text-[#CBACF9] underline decoration-[#CBACF9]/40 underline-offset-2">
                    Full Stack Development
                  </strong>{" "}
                  and{" "}
                  <strong className="text-[#CBACF9] underline decoration-[#CBACF9]/40 underline-offset-2">
                    AI/ML
                  </strong>
                  . I specialize in building scalable applications that solve real operational problems.
                </p>
                <p className="split-text text-white/60 text-sm md:text-base leading-relaxed">
                  My passion lies in architecting{" "}
                  <strong className="text-white/90">enterprise-grade MERN stacks</strong> and innovating with{" "}
                  <strong className="text-white/90">AI/ML</strong> to solve critical issues — transforming
                  complexity into clarity.
                </p>
              </div>
            </div>

            {/* ── Technical Toolkit ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/[0.07] pt-6"
            >
              <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-4 font-mono">
                Technical Toolkit
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {toolkit.map((t, i) => (
                  <motion.div
                    key={t.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <p className="text-white/90 text-xs font-semibold mb-1">
                      {t.label}
                      <span className="text-[#CBACF9]">:</span>
                    </p>
                    <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                      {t.items}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Clock + Socials row ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <ISTClock />

             <div className="flex items-stretch gap-4 mt-8 justify-center md:justify-start">

              <a
                href="https://drive.google.com/file/d/1ZvgRzNubkhKfJKwzrMK3XK9Wqef6e6Pz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg md:-mt-10"
              >
                <MagicButton
                  title="View My Resume"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </a>

              <div className="flex items-center">
                <AnimatedTooltip items={people} />
              </div>

            </div>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            BOTTOM ROW — Education + GitHub
        ════════════════════════════════════════ */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 group hover:border-[#CBACF9]/25 transition-colors duration-500 relative overflow-hidden"
          >
            {/* corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#CBACF9]/5 rounded-bl-[3rem] group-hover:bg-[#CBACF9]/10 transition-colors duration-500" />

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono mb-4">Academic</p>
            <h3 className="text-white font-bold text-xl mb-1">B.Tech Information Technology</h3>
            <p className="text-[#CBACF9]/80 text-sm font-medium mb-3">VESIT, Mumbai · Class of 2027</p>
            <p className="text-white/40 text-sm leading-relaxed">
              Focused on Software Engineering, Data Structures & Cloud Computing.
            </p>

            {/* skill tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["DSA", "Cloud", "OS", "DBMS", "Networks"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 group-hover:text-white/70 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* GitHub calendar */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 overflow-hidden hover:border-[#CBACF9]/20 transition-colors duration-500"
          >
            <div className="w-full overflow-x-auto custom-scrollbar">
              <GithubStats />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;
