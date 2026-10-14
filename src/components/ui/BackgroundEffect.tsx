'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#8A2BE2', '#00BFFF'];
const LINK_DIST_SQ = 80 * 80;
const MAX_PARTICLES = 75;

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    c: number; // color index
    tx: number; // target x
    ty: number; // target y
};

// Pre-render the glowing dot once per color, then just drawImage it.
// This replaces the expensive per-particle shadowBlur.
function makeSprite(color: string) {
    const r = 16;
    const el = document.createElement('canvas');
    el.width = el.height = r * 2;
    const g = el.getContext('2d')!;
    const grad = g.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, color);
    grad.addColorStop(0.5, color);
    grad.addColorStop(1, color + '00');
    g.fillStyle = grad;
    g.fillRect(0, 0, r * 2, r * 2);
    return el;
}

export const BackgroundEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const sprites = COLORS.map(makeSprite);
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let w = window.innerWidth;
        let h = window.innerHeight;
        let raf = 0;
        let resizeTimer: ReturnType<typeof setTimeout>;

        const retarget = (p: Particle) => {
            p.tx = w / 2 + (Math.random() - 0.5) * w * 0.6;
            p.ty = h / 2 + (Math.random() - 0.5) * h * 0.6;
        };

        // Fewer particles on small screens
        const count = Math.min(MAX_PARTICLES, Math.round((w * h) / 18000));

        const particles: Particle[] = Array.from({ length: count }, () => {
            const p: Particle = {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.4 + 0.2,
                c: Math.random() > 0.5 ? 0 : 1,
                tx: 0,
                ty: 0,
            };
            retarget(p);
            return p;
        });

        // dt = 1 means "one frame at 60fps", so speed is the same on any refresh rate
        const step = (dt: number) => {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                // Drift toward target
                p.vx += (p.tx - p.x) * 0.00005 * dt;
                p.vy += (p.ty - p.y) * 0.00005 * dt;

                // Clamp speed to 0.5
                const s2 = p.vx * p.vx + p.vy * p.vy;
                if (s2 > 0.25) {
                    const k = 0.5 / Math.sqrt(s2);
                    p.vx *= k;
                    p.vy *= k;
                }

                p.x += p.vx * dt;
                p.y += p.vy * dt;

                // Wrap around edges
                if (p.x < 0) p.x = w;
                else if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                else if (p.y > h) p.y = 0;

                if (Math.random() < 0.001 * dt) retarget(p);

                // Draw glowing dot from sprite
                const s = p.size * 3.5;
                ctx.globalAlpha = p.alpha;
                ctx.drawImage(sprites[p.c], p.x - s / 2, p.y - s / 2, s, s);
            }

            // Links: one path and one stroke per color
            ctx.globalAlpha = 0.15;
            ctx.lineWidth = 0.6;
            for (let ci = 0; ci < COLORS.length; ci++) {
                ctx.strokeStyle = COLORS[ci];
                ctx.beginPath();
                for (let i = 0; i < particles.length; i++) {
                    const a = particles[i];
                    if (a.c !== ci) continue;
                    for (let j = i + 1; j < particles.length; j++) {
                        const b = particles[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        if (dx * dx + dy * dy < LINK_DIST_SQ) {
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                        }
                    }
                }
                ctx.stroke();
            }
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            particles.forEach(retarget);
            if (reduced) step(0); // setting canvas.width clears it, so redraw the static frame
        };

        resize();

        let last = performance.now();
        const tick = (now: number) => {
            raf = requestAnimationFrame(tick);
            const dt = Math.min((now - last) / 16.667, 3); // cap so tab-switching doesn't cause jumps
            last = now;
            step(dt);
        };

        if (reduced) step(0);
        else raf = requestAnimationFrame(tick);

        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 200);
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="bg-orb left-[10%] top-[5%]" style={{ ['--h' as string]: 270 }} />
            <div
                className="bg-orb bottom-[5%] right-[5%]"
                style={{ ['--h' as string]: 300, animationDelay: '-20s' }}
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" />
        </div>
    );
};