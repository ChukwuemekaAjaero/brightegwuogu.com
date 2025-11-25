'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { modernizFont } from '@/lib/utils';
import { FiArrowLeft, FiArrowRight, FiArrowRight as ExploreIcon } from 'react-icons/fi';
import { log } from 'console';

const slides = [
    { title: 'Ministry', href: '/ministry', disabled: false },
    { title: 'Music', href: '/music', disabled: false },
    { title: 'Home', href: '/home', disabled: false },
    { title: 'Career', href: '/career', disabled: true }
];

export default function RootPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const goToSlide = (index: number) => {
        const newDirection = index > currentIndex ? 'right' : 'left';
        setDirection(newDirection);
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        console.log('Left arrow clicked');
        setDirection('left');
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        console.log('Right arrow clicked');
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    // Handle swipe gestures
    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            goToPrevious();
        } else if (info.offset.x < -swipeThreshold) {
            goToNext();
        }
    };

    // Log initial render
    useEffect(() => {
        console.log('Component mounted. Initial direction:', direction);
    }, []);

    // Log component renders and direction state changes
    useEffect(() => {
        console.log('Component rendered. Direction:', direction);
    }, [direction]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        console.log('Component rendered Test', direction),
        (
            <div className="relative flex h-screen w-full overflow-hidden bg-[#030712]">
                {/* Carousel Container */}
                <div className="relative flex h-full w-full">
                    {/* Header Text - Above Page Title (outside AnimatePresence) */}
                    <div className="absolute top-[calc(45%-8rem)] left-1/2 z-20 -translate-x-1/2">
                        <p className={`text-center text-xl font-bold text-white`}>Select a side of Bright</p>
                    </div>

                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        {slides.map((slide, index) => {
                            if (index !== currentIndex) return null;

                            const slideVariants = {
                                enter: (custom: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: custom === 'right' ? 300 : -300
                                }),
                                center: {
                                    opacity: 1,
                                    x: 0
                                },
                                exit: (custom: 'left' | 'right') => ({
                                    opacity: 0,
                                    x: custom === 'right' ? -300 : 300,
                                    pointerEvents: 'none' as const
                                })
                            };

                            return (
                                <motion.div
                                    key={`${index}-${slide.title}`}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        opacity: { duration: 0.2, ease: 'easeInOut' },
                                        x: { type: 'spring', stiffness: 200, damping: 15, mass: 1 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    className="absolute inset-0 flex flex-col items-center justify-center gap-16 will-change-transform"
                                >
                                    {/* Page Title */}
                                    <div className="flex-shrink-0">
                                        <h1 className={`text-5xl font-bold text-white lg:text-9xl ${modernizFont.className}`}>{slide.title}</h1>
                                    </div>

                                    {/* Explore Button */}
                                    <div className="flex-shrink-0">
                                        {slide.disabled ? (
                                            <button
                                                disabled
                                                className="inline-flex cursor-not-allowed items-center rounded bg-gray-600 px-8 py-4 font-semibold text-gray-400 opacity-50 shadow-lg"
                                            >
                                                Explore
                                                <ExploreIcon className="ml-2 h-5 w-5" />
                                            </button>
                                        ) : (
                                            <Link
                                                href={slide.href}
                                                className="group inline-flex items-center rounded bg-gradient-to-br from-blue-900 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:from-blue-800 hover:to-teal-500"
                                            >
                                                Explore
                                                <ExploreIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20"
                    aria-label="Previous slide"
                >
                    <FiArrowLeft size={24} />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20"
                    aria-label="Next slide"
                >
                    <FiArrowRight size={24} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        )
    );
}
