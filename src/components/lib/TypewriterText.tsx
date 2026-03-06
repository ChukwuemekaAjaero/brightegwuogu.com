'use client';

import { useState, useEffect, useRef } from 'react';

const CHAR_DELAY_MS = 80;
const CYCLE_MS = 10000;

export function TypewriterText({
    text,
    className
}: {
    text: string;
    className?: string;
}) {
    const [visibleLength, setVisibleLength] = useState(0);
    const cycleStartRef = useRef(Date.now());

    useEffect(() => {
        if (visibleLength < text.length) {
            const t = setTimeout(() => setVisibleLength((n) => n + 1), CHAR_DELAY_MS);
            return () => clearTimeout(t);
        }
        // Full text shown: wait until 10s from cycle start, then reset
        const elapsed = Date.now() - cycleStartRef.current;
        const waitMs = Math.max(0, CYCLE_MS - elapsed);
        const t = setTimeout(() => {
            cycleStartRef.current = Date.now();
            setVisibleLength(0);
        }, waitMs);
        return () => clearTimeout(t);
    }, [text.length, visibleLength]);

    return (
        <h1 className={className}>
            {text.slice(0, visibleLength)}
            {visibleLength < text.length && (
                <span className="animate-pulse" aria-hidden>
                    |
                </span>
            )}
        </h1>
    );
}
