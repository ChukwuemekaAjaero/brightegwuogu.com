'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface MousePosition {
    x: number;
    y: number;
}

interface CursorVelocity {
    x: number;
    y: number;
    speed: number;
}

type CursorVariant = 'default' | 'project' | 'contact';

interface CursorVariants {
    default: any;
    project: any;
    contact: any;
}

// Extend the Window interface to include our custom cursor function
declare global {
    interface Window {
        updateCustomCursor?: (variant: CursorVariant, text?: string) => void;
    }
}

const CustomCursor: React.FC = () => {
    const [cursorText, setCursorText] = useState<string>('');
    const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState<CursorVelocity>({ x: 0, y: 0, speed: 0 });
    const cursorRef = useRef<HTMLDivElement>(null);
    const lastPositionRef = useRef<MousePosition>({ x: 0, y: 0 });
    const lastTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent): void => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTimeRef.current;
            const currentPosition = { x: e.clientX, y: e.clientY };

            if (deltaTime > 0) {
                const deltaX = currentPosition.x - lastPositionRef.current.x;
                const deltaY = currentPosition.y - lastPositionRef.current.y;
                const velocityX = deltaX / deltaTime;
                const velocityY = deltaY / deltaTime;
                const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

                setVelocity({ x: velocityX, y: velocityY, speed });
                setMousePosition(currentPosition);

                lastPositionRef.current = currentPosition;
                lastTimeRef.current = currentTime;
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Calculate sizes based on cursor speed
    const baseSize = 25;
    const maxSize = 50;
    const cursorSize = Math.min(baseSize + velocity.speed * 25, maxSize);
    const outlineSize = Math.min(30 + velocity.speed * 75, 150); // Min 30px, max 150px
    const outlineOpacity = Math.min(0.3 + velocity.speed * 0.1, 0.8); // Min 0.3, max 0.8

    const variants: Variants = {
        default: {
            opacity: 0.3,
            height: cursorSize,
            width: cursorSize,
            fontSize: '16px',
            backgroundColor: '#ffffff',
            x: mousePosition.x - cursorSize / 2,
            y: mousePosition.y - cursorSize / 2,
            transition: {
                type: 'spring',
                mass: 0.6
            }
        },
        project: {
            opacity: 1,
            backgroundColor: '#fff',
            color: '#000',
            height: 80,
            width: 80,
            fontSize: '18px',
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            transition: {
                type: 'spring',
                mass: 0.6
            }
        },
        contact: {
            opacity: 1,
            backgroundColor: '#FFBCBC',
            color: '#000',
            height: 64,
            width: 64,
            fontSize: '32px',
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            transition: {
                type: 'spring',
                mass: 0.6
            }
        }
    };

    const spring = {
        type: 'spring' as const,
        stiffness: 500,
        damping: 28
    };

    // Function to update cursor state (can be called from parent components)
    const updateCursor = (variant: CursorVariant, text: string = ''): void => {
        setCursorVariant(variant);
        setCursorText(text);
    };

    // Expose the update function to parent components
    useEffect(() => {
        window.updateCustomCursor = updateCursor;

        return () => {
            delete window.updateCustomCursor;
        };
    }, []);

    return (
        <>
            {/* Circle Outline */}
            <motion.div
                style={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: outlineSize,
                    height: outlineSize,
                    borderRadius: '50%',
                    border: '2px solid #ffffff',
                    pointerEvents: 'none',
                    x: mousePosition.x - outlineSize / 2,
                    y: mousePosition.y - outlineSize / 2,
                    opacity: outlineOpacity
                }}
                animate={{
                    width: outlineSize,
                    height: outlineSize,
                    x: mousePosition.x - outlineSize / 2,
                    y: mousePosition.y - outlineSize / 2,
                    opacity: outlineOpacity
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                }}
            />

            {/* Main Cursor */}
            <motion.div
                ref={cursorRef}
                variants={variants}
                className="custom-cursor"
                animate={cursorVariant}
                transition={spring}
                style={{
                    position: 'fixed',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 500
                }}
            >
                <span
                    style={{
                        fontSize: 'inherit',
                        pointerEvents: 'none',
                        userSelect: 'none'
                    }}
                >
                    {cursorText}
                </span>
            </motion.div>
        </>
    );
};

export default CustomCursor;
