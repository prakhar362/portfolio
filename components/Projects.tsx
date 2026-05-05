"use client";

import { motion } from "motion/react";
import { projects } from "@/data";
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-36 w-full overflow-hidden bg-black-100">
      {/* ambient glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#CBACF9]/5 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none mb-2">
            A SMALL SECTION OF MY 
          </h2>
          <h3 className="text-5xl md:text-7xl font-black leading-none">
            <span className="text-[#CBACF9]">RECENT WORK.</span>
          </h3>
          <p className="text-white/50 text-sm md:text-base mt-6 max-w-2xl">
            Real products solving real problems. From AI-powered learning tools to real-time collaboration platforms—each built with purpose, shipped with impact.
          </p>
        </motion.div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Project Card ──────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  github?: string;
  category?: string;
  outcome?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const slug = project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  return (
    <div className="group relative bg-transparent border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#CBACF9]/25 transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#13162D]">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-black-100/50 to-transparent opacity-60" />
        
        {/* Category Tag */}
        {project.category && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black backdrop-blur-sm border border-[#CBACF9]/30">
            <span className="text-white text-xs font-semibold">{project.category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-2 line-clamp-1">{project.title}</h3>
        
        {/* Outcome */}
        {project.outcome && (
          <p className="text-[#CBACF9] text-sm font-medium mb-3 line-clamp-1">
            → {project.outcome}
          </p>
        )}
        
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{project.des}</p>

        {/* Tech Stack */}
        <div className="flex items-center gap-0 mb-4">
          {project.iconLists.slice(0, 7).map((icon, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center"
            >
              <img src={icon} alt="tech" className="w-6 h-6 object-contain" />
            </div>
          ))}
          {project.iconLists.length > 4 && (
            <span className="text-white/30 text-xs">+{project.iconLists.length - 4}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
          <Link
            href={`/projects/${slug}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#CBACF9]/10 border border-[#CBACF9]/20 text-[#CBACF9] text-sm font-semibold hover:bg-[#CBACF9]/20 hover:border-[#CBACF9]/40 transition-all duration-300"
          >
            <span>Case Study</span>
            <FaArrowRight size={12} />
          </Link>
          
          <div className="flex flex-1 sm:flex-initial gap-2">
            
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/60 text-sm font-semibold hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <span>Live</span>
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CBACF9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default Projects;
