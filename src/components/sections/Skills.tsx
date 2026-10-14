'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiPostgresql, SiPrisma, SiMongodb, SiFramer } from 'react-icons/si';
import type { ComponentType } from 'react';

type IconComponent = ComponentType<{ size?: number }>;

interface Skill {
    name: string;
    proficiency: number;
    category: string;
    icon: IconComponent;
}

interface FloatParams {
    y: number;
    duration: number;
    delay: number;
}

const skills: Skill[] = [
    // Frontend
    { name: "Next.js", proficiency: 90, category: "Frontend", icon: SiNextdotjs as IconComponent },
    { name: "React.js", proficiency: 90, category: "Frontend", icon: FaReact as IconComponent },
    { name: "TypeScript", proficiency: 85, category: "Frontend", icon: SiTypescript as IconComponent },
    { name: "JavaScript", proficiency: 80, category: "Frontend", icon: FaJs as IconComponent },
    { name: "Tailwind CSS", proficiency: 95, category: "Frontend", icon: SiTailwindcss as IconComponent },

    // Backend
    { name: "Node.js", proficiency: 85, category: "Backend", icon: FaNodeJs as IconComponent },
    { name: "Express.js", proficiency: 85, category: "Backend", icon: SiExpress as IconComponent },
    { name: "PostgreSQL", proficiency: 80, category: "Backend", icon: SiPostgresql as IconComponent },
    { name: "Prisma", proficiency: 80, category: "Backend", icon: SiPrisma as IconComponent },
    { name: "MongoDB", proficiency: 85, category: "Backend", icon: SiMongodb as IconComponent }
];

function getFloatParams(index: number): FloatParams {
    // Use index-based seeding to produce stable, varied values without Math.random in render
    const base = (index * 2654435761) >>> 0; // simple hash
    const y = (base % 60 + 40) / 10;          // 4.0 to 10.0
    const duration = (base % 20 + 30) / 10;   // 3.0 to 5.0
    const delay = (base % 15) / 10;            // 0.0 to 1.5
    return { y, duration, delay };
}

export function Skills() {
    const frontendSkills = skills.filter(s => s.category === "Frontend");
    const backendSkills = skills.filter(s => s.category === "Backend");

    return (
        <section id="skills" className="relative w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 overflow-hidden">
            {/* Global Gradient Definition for SVG progress borders */}
            <svg className="absolute w-0 h-0" width="0" height="0">
                <defs>
                    <linearGradient id="skill-progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary, #8A2BE2)" />
                        <stop offset="100%" stopColor="var(--color-secondary, #00BFFF)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Background decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-display">
                        Technologies & <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Skills</span>
                    </h2>
                </motion.div>

                {/* Skill Groups */}
                <div className="space-y-16 md:space-y-20">
                    {/* Frontend */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 text-center">
                            Frontend Development
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl px-4">
                            {frontendSkills.map((skill, index) => (
                                <SkillBubble key={skill.name} skill={skill} index={index} floatParams={getFloatParams(index)} />
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 text-center">
                            Backend & Databases
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl px-4">
                            {backendSkills.map((skill, index) => (
                                <SkillBubble key={skill.name} skill={skill} index={index} floatParams={getFloatParams(index)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface SkillBubbleProps {
    skill: Skill;
    index: number;
    floatParams: FloatParams;
}

function SkillBubble({ skill, index, floatParams }: SkillBubbleProps) {
    const Icon = skill.icon;

    // Circumference for strokeDasharray math: 2 * PI * R (where R = 41px) -> ~257.6
    const radius = 41;
    const circ = 2 * Math.PI * radius;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
                y: [0, -floatParams.y, 0]
            }}
            transition={{
                y: {
                    duration: floatParams.duration,
                    delay: floatParams.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            className="relative select-none"
        >
            <motion.div
                initial="initial"
                whileHover="hover"
                className="group relative w-24 h-24 rounded-full flex items-center justify-center bg-white/2 border border-white/4 backdrop-blur-md cursor-pointer transition-all duration-300 hover:bg-background-dark/85 hover:border-primary/10 hover:shadow-xl hover:shadow-primary/5"
            >
                {/* SVG Progress Circle Acting as Border */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10" viewBox="0 0 96 96">
                    {/* Base circle background */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.03)"
                        strokeWidth="2.5"
                        fill="transparent"
                    />
                    {/* Animated Progress circle */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="url(#skill-progress-gradient)"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        whileInView={{ strokeDashoffset: circ - (circ * skill.proficiency) / 100 }}
                        transition={{ duration: 1.2, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Inner Content */}
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-2 overflow-hidden">
                    {/* Default Logo View */}
                    <motion.div
                        variants={{
                            initial: { opacity: 1, scale: 1 },
                            hover: { opacity: 0, scale: 0.65 }
                        }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="text-gray-400 group-hover:text-primary transition-colors flex items-center justify-center"
                    >
                        <Icon size={28} />
                    </motion.div>

                    {/* Hover Detail View */}
                    <motion.div
                        variants={{
                            initial: { opacity: 0, scale: 0.7, y: 15 },
                            hover: { opacity: 1, scale: 1, y: 0 }
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center"
                    >
                        <span className="text-[10px] font-bold text-white leading-tight mb-0.5 max-w-20 truncate">
                            {skill.name}
                        </span>
                        <span className="text-[9px] font-extrabold text-primary uppercase tracking-wide">
                            {skill.proficiency}%
                        </span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-0.5">
                            Mastery
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
