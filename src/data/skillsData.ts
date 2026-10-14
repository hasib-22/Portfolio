import type { ComponentType } from 'react';
import { FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { GiPanda } from 'react-icons/gi';
import {
    SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiPostgresql, SiPrisma, SiMongodb, SiFramer, SiVercel, SiHtml5, SiCss, SiPostman, SiMongoose, SiNetlify,
    SiFirebase,
    SiTanstack,
    SiRedux,
    SiRedis,
    SiPandas,
} from 'react-icons/si';
import { TbCode, TbLayout, TbServer, TbDatabase, TbTools } from 'react-icons/tb';

export type IconComponent = ComponentType<{ className?: string; size?: number }>;

export interface SkillCategory {
    id: string;
    label: string;
    icon: IconComponent;
}

export interface Skill {
    name: string;
    category: string;
    icon: IconComponent;
}

export const skillCategories: SkillCategory[] = [
    { id: 'language', label: 'Language', icon: TbCode },
    { id: 'frontend', label: 'Frontend', icon: TbLayout },
    { id: 'backend', label: 'Backend', icon: TbServer },
    { id: 'database', label: 'Database', icon: TbDatabase },
    { id: 'tools', label: 'Tools', icon: TbTools },
];

export const skills: Skill[] = [
    // Language
    { name: 'JavaScript', category: 'language', icon: FaJs },
    { name: 'TypeScript', category: 'language', icon: SiTypescript },
    // Frontend
    { name: 'Next.js', category: 'frontend', icon: SiNextdotjs },
    { name: 'React.js', category: 'frontend', icon: FaReact },
    { name: 'Tanstack Query', category: 'frontend', icon: SiTanstack },
    { name: 'Redux', category: 'frontend', icon: SiRedux },
    { name: 'Zustand', category: 'frontend', icon: GiPanda },
    { name: 'Tailwind CSS', category: 'frontend', icon: SiTailwindcss },
    { name: 'HTML5', category: 'frontend', icon: SiHtml5 },
    { name: 'CSS3', category: 'frontend', icon: SiCss },
    { name: 'Framer Motion', category: 'frontend', icon: SiFramer },
    // Backend
    { name: 'Node.js', category: 'backend', icon: FaNodeJs },
    { name: 'Express.js', category: 'backend', icon: SiExpress },
    { name: 'Prisma', category: 'backend', icon: SiPrisma },
    { name: 'PostgreSQL', category: 'backend', icon: SiPostgresql },
    { name: 'Redis', category: 'backend', icon: SiRedis },
    { name: 'Mongoose', category: 'backend', icon: SiMongoose },
    { name: 'Firebase', category: 'backend', icon: SiFirebase },
    // Database
    { name: 'PostgreSQL', category: 'database', icon: SiPostgresql },
    { name: 'MongoDB', category: 'database', icon: SiMongodb },
    { name: 'Prisma', category: 'database', icon: SiPrisma },
    // Tools
    { name: 'Git', category: 'tools', icon: FaGitAlt },
    { name: 'GitHub', category: 'tools', icon: FaGithub },
    { name: 'Vercel', category: 'tools', icon: SiVercel },
    { name: 'Postman', category: 'tools', icon: SiPostman },
    { name: 'Netlify', category: 'tools', icon: SiNetlify },
];
