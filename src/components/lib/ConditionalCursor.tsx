'use client';

import { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

const ConditionalCursor: React.FC = () => {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        // Set client-side flag
        setIsClient(true);

        // Detect touch device
        const checkTouchDevice = () => {
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(hasTouch);
        };

        checkTouchDevice();
    }, []);

    // Don't render on server or touch devices
    if (!isClient || isTouchDevice) {
        return null;
    }

    return <CustomCursor />;
};

export default ConditionalCursor;
