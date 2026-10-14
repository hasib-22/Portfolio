import { ProjectsListing } from './_components/ProjectsListing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects | Portfolio",
    description: "Browse all projects — full-stack apps built with React, Node.js, and modern web technologies.",
};

export default function ProjectsPage() {
    return (
        <main>
            <ProjectsListing />
        </main>
    );
}
