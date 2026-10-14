'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ProjectImage } from '../ui/ProjectImage';
import { BiDetail } from 'react-icons/bi';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import type { Project } from '@/data/projectsData';

interface ProjectCardMobileProps {
    project: Project;
    index: number;
}

export function ProjectCardMobile({ project, index }: ProjectCardMobileProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                mass: 0.6,
                delay: 0.1
            }}
            className="bg-neutral-900/95 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white/5"
        >
            {/* Image */}
            <ProjectImage
                src={project.image}
                alt={`${project.title} screenshot`}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mb-4"
            />

            <span className="text-primary/70 text-xs font-mono tracking-widest uppercase">
                Project {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="text-xl font-bold text-white leading-tight mt-1">
                {project.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed mt-2">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-white/10"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
                {project.live_link && (
                    <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-500 active:scale-95"
                    >
                        <HiMiniArrowTopRightOnSquare size={18} />
                        Live Demo
                    </a>
                )}
                {project.slug && (
                    <Link href={`/projects/${project.slug}`}>
                        <Button className="h-9 rounded-xl flex gap-2 text-xs px-4" glow>
                            <BiDetail />
                            Details
                        </Button>
                    </Link>
                )}
                <a
                    href={project.gitHub_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/40 px-4 text-xs font-semibold text-neutral-200 transition-all hover:bg-neutral-800 active:scale-95"
                >
                    <span className="material-symbols-outlined text-base">code</span>
                    GitHub
                </a>
            </div>
        </motion.div>
    );
}
