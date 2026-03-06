'use client';

import React, { useEffect } from 'react';
import { motion, animate, useMotionTemplate, useMotionValue } from 'framer-motion';

export interface BeamBorderProps {
    children: React.ReactNode;
    className?: string;
    /** Duration in seconds for one full rotation. Default 20. */
    duration?: number;
    /** Color of the visible beam (hex or rgba). Default #e5e7eb. */
    color?: string;
    /** Delay in seconds before the rotation animation starts. Default 0. */
    delay?: number;
}

/** Rotating conic-gradient "light beam" border. Use around a relative container. */
export function BeamBorder({
    children,
    className,
    duration = 20,
    color = '#e5e7eb',
    delay = 0
}: BeamBorderProps) {
    const turn = useMotionValue(0);

    useEffect(() => {
        const startAnimation = () => {
            animate(turn, 1, {
                ease: 'linear',
                duration,
                repeat: Infinity
            });
        };

        if (delay <= 0) {
            startAnimation();
            return;
        }

        const timeoutId = setTimeout(startAnimation, delay * 1000);
        return () => clearTimeout(timeoutId);
    }, [turn, duration, delay]);

    const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #01030800 75%, ${color} 100%)`;

    return (
        <div className={`relative ${className ?? ''}`}>
            {children}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xs">
                <motion.div
                    style={{ backgroundImage }}
                    className="beam-border-mask absolute inset-0 rounded-xs"
                />
            </div>
        </div>
    );
}
