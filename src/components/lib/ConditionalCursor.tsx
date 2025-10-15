'use client';

import { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

const ConditionalCursor: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [shouldRender, setShouldRender] = useState<boolean>(false);

    useEffect(() => {
        // Set client-side flag
        setIsClient(true);

        // Detect touch device
        const checkTouchDevice = () => {
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(hasTouch);

            // Only render cursor if we're on client and not a touch device
            setShouldRender(!hasTouch);
        };

        checkTouchDevice();
    }, []);

    // Always return null on server-side to prevent hydration mismatch
    // Only render on client after useEffect runs
    if (!isClient || !shouldRender) {
        return null;
    }

    return <CustomCursor />;
};

export default ConditionalCursor;
