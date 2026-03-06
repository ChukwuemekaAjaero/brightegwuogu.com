'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

/**
 * Renders only the cursor-following spotlight gradient(s) as a fixed, pointer-events-none layer.
 * Does not wrap or contain children – place it as a sibling so the page can scroll normally.
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
    const spotlightsRef = useRef<SpotlightPosition[]>([]);
    const animationRef = useRef<number>();
    const lastMouseMoveRef = useRef<number>(0);
    const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
    const [viewport, setViewport] = useState({ width: 0, height: 0 });

    const colorArray = Array.isArray(colors) ? colors : [colors];

    // Use viewport for dimensions (no container ref)
    useEffect(() => {
        const updateViewport = () => {
            setViewport({ width: window.innerWidth, height: window.innerHeight });
        };
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Initialize spotlight positions when viewport is known
    useEffect(() => {
        if (viewport.width === 0 || viewport.height === 0) return;

        const centerX = viewport.width / 2;
        const centerY = viewport.height / 2;

        spotlightsRef.current = colorArray.map((_, i) => ({
            x: centerX + (i - (colorArray.length - 1) / 2) * 50,
            y: centerY,
            targetX: centerX + (i - (colorArray.length - 1) / 2) * 50,
            targetY: centerY
        }));

        setPositions(spotlightsRef.current.map((s) => ({ x: s.x, y: s.y })));
    }, [colorArray.length, viewport.width, viewport.height]);

    const lerp = useCallback((start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    }, []);

    // Animation loop
    useEffect(() => {
        const width = viewport.width;
        const height = viewport.height;
        if (width === 0 || height === 0) return;

        let tick = 0;

        const animate = () => {
            tick++;
            const now = Date.now();
            const timeSinceMouseMove = now - lastMouseMoveRef.current;
            const isAmbient = ambient && timeSinceMouseMove > 2000;

            spotlightsRef.current = spotlightsRef.current.map((spotlight, i) => {
                let { x, y, targetX, targetY } = spotlight;

                if (isAmbient) {
                    const offset = i * 0.5;
                    targetX = width / 2 + Math.sin(tick * 0.005 + offset) * (width * 0.2);
                    targetY = height / 2 + Math.cos(tick * 0.003 + offset) * (height * 0.15);
                }

                x = lerp(x, targetX, smoothing);
                y = lerp(y, targetY, smoothing);

                return { x, y, targetX, targetY };
            });

            setPositions(spotlightsRef.current.map((s) => ({ x: s.x, y: s.y })));
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [ambient, smoothing, lerp, viewport.width, viewport.height]);

    // Track mouse/touch on document so the layer can stay pointer-events-none (doesn't block scroll or clicks)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            lastMouseMoveRef.current = Date.now();
            spotlightsRef.current = spotlightsRef.current.map((spotlight, i) => ({
                ...spotlight,
                targetX: x + (i - (colorArray.length - 1) / 2) * 30,
                targetY: y + (i - (colorArray.length - 1) / 2) * 20
            }));
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) return;
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            lastMouseMoveRef.current = Date.now();
            spotlightsRef.current = spotlightsRef.current.map((spotlight, i) => ({
                ...spotlight,
                targetX: x + (i - (colorArray.length - 1) / 2) * 30,
                targetY: y + (i - (colorArray.length - 1) / 2) * 20
            }));
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
            className={cn(
                'pointer-events-none fixed inset-0 z-0',
                className
            )}
            aria-hidden
        >
            {colorArray.map((color, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        opacity,
                        background: positions[i]
                            ? `radial-gradient(${size}px circle at ${positions[i].x}px ${positions[i].y}px, ${color}, transparent 70%)`
                            : 'transparent',
                        filter: `blur(${blur}px)`
                    }}
                />
            ))}
        </div>
    );
}
