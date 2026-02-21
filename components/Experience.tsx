"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { TracingBeam } from "./ui/tracing-beam";
import { workExperience } from "@/data";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Experience = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bulletOffsets, setBulletOffsets] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const calculateOffsets = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const offsets = rowRefs.current.slice(0, workExperience.length - 1).map((ref) => {
        if (!ref) return 0;
        return ref.getBoundingClientRect().top - containerTop;
      });
      setBulletOffsets(offsets);
    };

    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);
    return () => window.removeEventListener("resize", calculateOffsets);
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black-100">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full bg-[radial-gradient(circle_at_center,rgba(203,172,249,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white"
          >
            My Work {" "}
            <span className="bg-gradient-to-r from-[#d9a7ff] to-[#9b74ff] text-transparent bg-clip-text">
              Experience
            </span>
          </motion.h1>
          <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(203,172,249,0.3)]" />
        </div>

        <div className="max-w-4xl mx-auto relative" ref={containerRef}>
          <TracingBeam bulletOffsets={bulletOffsets}>
            <div className="space-y-24 py-10">
              {workExperience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative group"
                >
                  <div className="relative bg-[#000319]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-purple/40 transition-all duration-500 shadow-2xl group-hover:shadow-purple/10">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Logo & Company */}
                      <div
                        className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0"
                        ref={(el) => {
                          rowRefs.current[index] = el;
                        }}
                      >
                        <div className="relative w-16 h-16 mb-4">
                          <div className="absolute inset-0 bg-purple/20 rounded-2xl blur-md scale-110 group-hover:scale-125 transition-transform duration-500" />
                          <div className="relative h-full w-full bg-black-200 border border-white/10 rounded-2xl p-3 flex items-center justify-center overflow-hidden">
                            <Image
                              src={exp.orgThumbnail}
                              alt={exp.organization}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight min-w-[150px]">
                          {exp.organization}
                        </h3>
                      </div>

                      {/* Right: Role & Description */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <h2 className="text-2xl font-extrabold text-[#CBACF9] group-hover:text-white transition-colors">
                            {exp.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-400">
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                              <FaCalendarAlt className="text-purple/70" /> {exp.timeline}
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                              <FaMapMarkerAlt className="text-purple/70" /> {exp.location}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-base italic mb-8">
                          "{exp.desc}"
                        </p>

                        {/* Tech Stack - Always Vivid Color */}
                        <div className="flex flex-wrap gap-3">
                          {exp.techStack.map((tech, i) => (
                            <div key={i} className="relative group/tech">
                              <div className="absolute inset-0 bg-purple/10 rounded-xl blur-sm opacity-0 group-hover/tech:opacity-100 transition-opacity" />
                              <div className="relative w-10 h-10 bg-[#10132E] border border-white/10 rounded-xl p-2 flex items-center justify-center hover:border-purple/50 transition-all">
                                <Image
                                  src={tech}
                                  alt="tech"
                                  width={24}
                                  height={24}
                                  className="object-contain saturate-150"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner Element */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <div className="w-12 h-12 border-t-2 border-r-2 border-purple rounded-tr-2xl" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
};

export default Experience;
