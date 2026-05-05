"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data";
import { projectCaseStudies } from "@/data/projectDetails";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find project by slug
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") === slug
  );

  // Get case study details
  const caseStudy = projectCaseStudies[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-black-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-[#CBACF9] hover:underline">
                ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black-100 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#CBACF9] transition-colors mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/70 mb-8 leading-relaxed"
          >
            {project.des}
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#CBACF9]/10 border border-[#CBACF9]/30 text-[#CBACF9] font-semibold hover:bg-[#CBACF9]/20 transition-all"
            >
              <span>View Live Site</span>
              <FaExternalLinkAlt size={14} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/[0.05] border border-white/10 text-white hover:border-white/20 transition-all"
              >
                <span>View Code</span>
                <FaGithub size={16} />
              </a>
            )}
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {caseStudy ? (
            <>
              {/* The Problem */}
              <ContentSection
                title="The Problem"
                content={caseStudy.problem}
              />

              {/* My Role & Constraints */}
              <ContentSection
                title="My Role & Constraints"
                content={caseStudy.role}
              />

              {/* System Design */}
              <ContentSection
                title="System Design / Architecture"
                content={caseStudy.architecture}
              />

              {/* Key Engineering Decisions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative">
                  Key Engineering Decisions
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CBACF9] to-transparent rounded-full" />
                </h2>
                <ul className="space-y-6">
                  {caseStudy.decisions.map((decision, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <span className="text-[#CBACF9] mt-1 font-bold text-xl group-hover:scale-125 transition-transform">•</span>
                      <span className="text-white/70 leading-relaxed text-lg">{decision}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Business / Product Thinking */}
              <ContentSection
                title="Business / Product Thinking"
                content={caseStudy.businessThinking}
              />

              {/* Results & Impact */}
              <ContentSection
                title="Results & Impact"
                content={caseStudy.results}
              />

              {/* What I'd Do Differently */}
              <ContentSection
                title="What I'd Do Differently"
                content={caseStudy.reflections}
              />

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative">
                  Tech Stack
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CBACF9] to-transparent rounded-full" />
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.iconLists.map((icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 hover:border-[#CBACF9]/30 hover:bg-[#CBACF9]/5 transition-colors cursor-pointer"
                    >
                      <img src={icon} alt="tech" className="w-5 h-5 object-contain" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/50 text-lg">
                Case study details coming soon...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Want to see more?
          </h2>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#CBACF9]/10 border border-[#CBACF9]/30 text-[#CBACF9] font-semibold hover:bg-[#CBACF9]/20 transition-all text-lg"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ─── Content Section Component ─────────────────────────────── */
const ContentSection = ({ title, content }: { title: string; content: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative">
      {title}
      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CBACF9] to-transparent rounded-full" />
    </h2>
    <div className="text-white/70 leading-relaxed text-lg space-y-4">
      {content.split('\n\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
    </div>
  </motion.div>
);
