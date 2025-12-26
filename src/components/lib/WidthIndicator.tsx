'use client';

import { useState, useEffect } from 'react';

export default function WidthIndicator() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getBreakpoint = () => {
        if (width >= 1536) return '2xl';
        if (width >= 1280) return 'xl';
        if (width >= 1024) return 'lg';
        if (width >= 768) return 'md';
        if (width >= 640) return 'sm';
        return 'default';
    };

    return (
        <div className="fixed top-4 right-4 z-[100] rounded bg-black/80 px-4 py-2 font-mono text-sm text-white">
            <div>Width: {width}px</div>
            <div>Breakpoint: {getBreakpoint()}</div>
        </div>
    );
}

