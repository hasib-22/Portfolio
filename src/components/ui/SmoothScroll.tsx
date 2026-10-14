'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    // Re-enabling Lenis with optimized settings for a buttery smooth experience
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 0.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
