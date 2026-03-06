'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpotlightBackgroundProps {
    className?: string;
    /** Spotlight color(s) - can be a single color or array for multiple spotlights */
    colors?: string | string[];
    /** Size of the spotlight gradient in pixels */
    size?: number;
    /** Blur amount for softer edges */
    blur?: number;
    /** Smoothing factor for cursor tracking (0-1, lower = smoother) */
    smoothing?: number;
    /** Enable ambient drift when no mouse activity */
    ambient?: boolean;
    /** Opacity of the spotlight */
    opacity?: number;
}

interface SpotlightPosition {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
}

const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

/**
 * Renders only the cursor-following spotlight gradient(s) as a fixed, pointer-events-none layer.
 * Uses ref-based transform updates (no React state in the animation loop) for better performance.
 */
export function SpotlightBackground({
    className,
    colors = ['rgba(120, 119, 198, 0.3)'],
    size = 400,
    blur = 80,
    smoothing = 0.1,
    ambient = true,
    opacity = 1
}: SpotlightBackgroundProps) {
    const colorArray = Array.isArray(colors) ? colors : [colors];
    const spotlightsRef = useRef<SpotlightPosition[]>([]);
    const layerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const lastMouseMoveRef = useRef<number>(0);
    const viewportRef = useRef({ width: 0, height: 0 });

    // Size of each spotlight div (gradient + room for blur)
    const blobSize = size * 2 + blur * 2;
    const halfBlob = blobSize / 2;

    // Viewport and init
    useEffect(() => {
        const updateViewport = () => {
            viewportRef.current = { width: window.innerWidth, height: window.innerHeight };
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);

        const { width, height } = viewportRef.current;
        if (width > 0 && height > 0) {
            const centerX = width / 2;
            const centerY = height / 2;
            spotlightsRef.current = colorArray.map((_, i) => ({
                x: centerX + (i - (colorArray.length - 1) / 2) * 50,
                y: centerY,
                targetX: centerX + (i - (colorArray.length - 1) / 2) * 50,
                targetY: centerY
            }));
        }

        return () => window.removeEventListener('resize', updateViewport);
    }, [colorArray.length]);

    // Animation loop: update refs and DOM transform only (no setState)
    useEffect(() => {
        const width = viewportRef.current.width;
        const height = viewportRef.current.height;
        if (width === 0 || height === 0) return;

        const container = layerRef.current;
        if (!container) return;

        let tick = 0;

        const animate = () => {
            tick++;
            const now = Date.now();
            const timeSinceMouseMove = now - lastMouseMoveRef.current;
            const isAmbient = ambient && timeSinceMouseMove > 2000;

            const spots = spotlightsRef.current;
            for (let i = 0; i < spots.length; i++) {
                let { x, y, targetX, targetY } = spots[i];

                if (isAmbient) {
                    const offset = i * 0.5;
                    targetX = width / 2 + Math.sin(tick * 0.005 + offset) * (width * 0.2);
                    targetY = height / 2 + Math.cos(tick * 0.003 + offset) * (height * 0.15);
                }

                x = lerp(x, targetX, smoothing);
                y = lerp(y, targetY, smoothing);

                spots[i] = { x, y, targetX, targetY };

                const el = container.children[i] as HTMLElement;
                if (el?.style) {
                    el.style.transform = `translate(${x - halfBlob}px, ${y - halfBlob}px)`;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Initial position update
        const spots = spotlightsRef.current;
        for (let i = 0; i < spots.length; i++) {
            const el = container.children[i] as HTMLElement;
            if (el?.style) {
                el.style.transform = `translate(${spots[i].x - halfBlob}px, ${spots[i].y - halfBlob}px)`;
            }
        }

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [ambient, smoothing, colorArray.length, halfBlob]);

    // Mouse/touch: update targets only (no React state)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            lastMouseMoveRef.current = Date.now();
            const spots = spotlightsRef.current;
            const n = colorArray.length;
            const half = (n - 1) / 2;
            for (let i = 0; i < n; i++) {
                spots[i].targetX = x + (i - half) * 30;
                spots[i].targetY = y + (i - half) * 20;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) return;
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            lastMouseMoveRef.current = Date.now();
            const spots = spotlightsRef.current;
            const n = colorArray.length;
            const half = (n - 1) / 2;
            for (let i = 0; i < n; i++) {
                spots[i].targetX = x + (i - half) * 30;
                spots[i].targetY = y + (i - half) * 20;
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, [colorArray.length]);

    return (
        <div
            ref={layerRef}
            className={cn(
                'pointer-events-none fixed inset-0 z-0',
                className
            )}
            aria-hidden
        >
            {colorArray.map((color, i) => (
                <div
                    key={i}
                    className="absolute left-0 top-0 will-change-transform"
                    style={{
                        width: blobSize,
                        height: blobSize,
                        opacity,
                        background: `radial-gradient(${size}px circle at ${halfBlob}px ${halfBlob}px, ${color}, transparent 70%)`,
                        filter: `blur(${blur}px)`,
                    }}
                />
            ))}
        </div>
    );
}
