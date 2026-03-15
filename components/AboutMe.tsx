"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { FaGraduationCap, FaCode, FaAward, FaBolt, FaCompass } from "react-icons/fa";
import GithubStats from "./GithubStats";

const AboutMe = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // easeOutExpo
            },
        },
    };

    return (
        <section id="about" className="py-20 w-full relative overflow-hidden bg-black-100">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -z-10 bg-purple/10 blur-[120px] w-96 h-96 rounded-full opacity-50" />
            <div className="absolute bottom-0 left-0 -z-10 bg-blue-500/10 blur-[120px] w-96 h-96 rounded-full opacity-50" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="max-w-7xl mx-auto px-6"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        The Story Behind{" "}
                        <span className="bg-gradient-to-r from-[#d9a7ff] via-[#9b74ff] to-[#CBACF9] text-transparent bg-clip-text">
                            the Code
                        </span>
                    </h1>
                    <div className="h-1.5 w-32 bg-purple-600 mx-auto rounded-full shadow-[0_0_15px_rgba(203,172,249,0.5)]" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto lg:auto-rows-[minmax(180px,auto)]">
                    {/* Main Profile Bento Box - Large */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-8 lg:row-span-2 bg-black-200 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-10 relative group overflow-hidden hover:border-purple/30 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative w-full md:w-2/3 aspect-square max-w-[280px] flex-shrink-0 mx-auto md:mx-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple to-blue-600 rounded-3xl rotate-3 scale-[1.05] opacity-20 blur-md group-hover:rotate-6 transition-all duration-700" />
                            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="/psprofile.jpg"
                                    alt="Prakhar Shrivastava"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                                <span className="px-4 py-1.5 bg-purple/10 border border-purple/20 rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(203,172,249,0.1)]">
                                    <FaBolt className="text-[10px] text-white animate-pulse" /> Available for Hire
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prakhar Shrivastava</h2>
                            <p className="text-gray-300 leading-relaxed text-lg mb-8">
                                I'm a Full-Stack Developer with a designer's heart. Based in Mumbai, I bridge the gap between complex backend logic and pixel-perfect UIs. I don't just build apps; I craft digital experiences that leave an impression.
                            </p>

                        </div>
                    </motion.div>

                    {/* Core Skills Bento Box */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 bg-black-200 border border-white/10 rounded-[2rem] p-8 relative group hover:border-blue-400/30 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-2xl shadow-inner">
                                <FaCode className="text-blue-400 text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Focus</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {["React", "Native", "Next.js", "Node.js", "AWS", "Three.js", "Tailwind", "Python", "DevOps", "AI/ML", "Kubernetes", "Docker"].map((skill) => (
                                <span key={skill} className="px-4 py-2 bg-white/5 border border-white/5 rounded-2xl text-sm font-medium text-gray-300 group-hover:border-blue-400/20 group-hover:text-white transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Bento Box */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-4 bg-black-200 border border-white/10 rounded-[2rem] p-8 relative group hover:border-purple/30 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple/10 rounded-2xl shadow-inner">
                                <FaGraduationCap className="text-purple text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Academic</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-white font-bold text-base">B.Tech IT @ VESIT</p>
                            <p className="text-white text-sm font-bold opacity-80 uppercase tracking-tighter">Class of 2027</p>
                            <p className="text-gray-300 text-sm mt-3 leading-snug">Focused on Software Engineering, Data Structures & Cloud Computing.</p>
                        </div>
                    </motion.div>

                    {/* GitHub Activity Bento Box */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-12 bg-black-200 rounded-[2rem] p-8 overflow-hidden group hover:border-purple/30 transition-colors duration-500 flex flex-col items-center justify-center min-h-[200px]"
                    >
                        <div className="w-full max-w-full overflow-x-auto flex justify-center custom-scrollbar">
                            <GithubStats />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutMe;
