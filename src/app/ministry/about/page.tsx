'use client';

import { modernizFont } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MinistryAbout() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselContentRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const lastScrollY = useRef(0);
    const accumulatedScroll = useRef(0);
    const isInitialized = useRef(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Handle video loading
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;

            // Check if video is already loaded (cached)
            if (video.readyState >= 3) {
                setVideoLoaded(true);
                return;
            }

            const handleCanPlay = () => {
                setVideoLoaded(true);
            };

            const handleLoadedData = () => {
                setVideoLoaded(true);
            };

            // Fallback timer in case events don't fire
            const fallbackTimer = setTimeout(() => {
                setVideoLoaded(true);
            }, 2000);

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('loadeddata', handleLoadedData);

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('loadeddata', handleLoadedData);
                clearTimeout(fallbackTimer);
            };
        }
    }, []);

    // Initialize carousel with first image off-screen to the left
    useEffect(() => {
        if (!carouselRef.current || !carouselContentRef.current || isInitialized.current) return;

        const initializeCarousel = () => {
            const viewportWidth = window.innerWidth;
            // Position carousel so first image is way off-screen to the left
            // This ensures no empty space when scrolling down (images move right)
            const initialOffset = -2000; // Position fara to the left

            setTranslateX(initialOffset);
            accumulatedScroll.current = initialOffset;
            isInitialized.current = true;
        };

        // Wait for layout to be calculated
        const timeoutId = setTimeout(() => {
            initializeCarousel();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!carouselRef.current || !isInitialized.current) return;

            const currentScrollY = window.scrollY;
            const carouselRect = carouselRef.current.getBoundingClientRect();
            const carouselTop = carouselRect.top + window.scrollY;
            const carouselBottom = carouselTop + carouselRect.height;
            const viewportTop = window.scrollY;
            const viewportBottom = viewportTop + window.innerHeight;

            // Only animate when carousel is in or near viewport
            if (viewportBottom >= carouselTop && viewportTop <= carouselBottom) {
                const scrollDelta = currentScrollY - lastScrollY.current;

                // Scroll down -> move right (positive), Scroll up -> move left (negative)
                accumulatedScroll.current += scrollDelta * 0.9; // Adjust speed multiplier as needed
                setTranslateX(accumulatedScroll.current);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#010308]">
            {/* Container for Pastor Bright text and video */}
            <div className="container mx-auto flex max-h-screen flex-col items-center justify-center px-4 pt-30 pb-20 sm:px-8">
                {/* Large Header */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`relative z-[5] text-center text-6xl font-bold text-white md:text-7xl lg:text-8xl xl:text-9xl ${modernizFont.className}`}
                >
                    <span className="relative text-red-900">P</span>astor
                    <br />
                    <span className="relative text-red-900">B</span>right
                </motion.h1>

                {/* Profile Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="relative -mt-8 aspect-[3/4] w-80 overflow-hidden rounded-xs bg-gray-800 shadow-lg sm:-mt-8 md:w-96 lg:-mt-14 lg:w-[28rem] xl:-mt-16 xl:w-[32rem]"
                >
                    {/* Skeleton - shown until video loads */}
                    {!videoLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700"></div>}
                    {/* Video */}
                    <video
                        ref={videoRef}
                        className={`h-full w-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src="/videos/ministry/MinistryAboutMe.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onCanPlay={() => setVideoLoaded(true)}
                        onLoadedData={() => setVideoLoaded(true)}
                    />
                </motion.div>
            </div>

            {/* Lorem Ipsum Paragraphs */}
            <div className="container mx-auto px-4 pb-20 sm:px-8">
                <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-base leading-relaxed text-gray-300 md:text-lg"
                    >
                        Pastor Bright Egwuogu serves as the Resident Pastor of the Toronto campus of Celebration Church International (CCI) a global
                        apostolic ministry led by Apostle Emmanuel Iren, with a vision to see all men celebrating endless life in Christ Jesus.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="text-base leading-relaxed text-gray-300 md:text-lg"
                    >
                        Passionate about spiritual growth and discipleship, Pastor Bright is deeply committed to helping believers understand Christ,
                        mature in faith, and live out the realities of the Gospel with clarity and confidence. His teaching ministry is marked by
                        sound doctrine, practical insight, and a heart for raising believers who walk in purpose and spiritual depth.
                    </motion.p>
                </div>
            </div>

            {/* Scroll-Triggered Image Carousel - Full Width */}
            <div ref={carouselRef} className="relative -mt-20 w-full overflow-x-hidden py-20">
                <motion.div
                    ref={carouselContentRef}
                    className="flex gap-4"
                    style={{
                        translateX: `${translateX}px`,
                        width: 'fit-content'
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                >
                    {/* Duplicate images for seamless loop */}
                    {[...Array(7)].map((_, index) => (
                        <div
                            key={`image-${index}`}
                            className="relative aspect-[3/4] w-64 flex-shrink-0 overflow-hidden rounded-xs bg-gray-800 md:w-80 lg:w-96"
                        >
                            <Image
                                src={`/images/homeGallery/galleryP${index + 1}.jpg`}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless scrolling */}
                    {[...Array(7)].map((_, index) => (
                        <div
                            key={`image-duplicate-${index}`}
                            className="relative aspect-[3/4] w-64 flex-shrink-0 overflow-hidden rounded-xs bg-gray-800 md:w-80 lg:w-96"
                        >
                            <Image
                                src={`/images/homeGallery/galleryP${index + 1}.jpg`}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Additional Lorem Ipsum Paragraphs */}
            <div className="container mx-auto px-4 pb-20 sm:px-8">
                <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-base leading-relaxed text-gray-300 md:text-lg"
                    >
                        Fondly known as PB, he is also a gifted musician with multiple contemporary Christian songs to his credit, impacting and
                        encouraging thousands of listeners around the world through worship and sound biblical expression.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className="text-base leading-relaxed text-gray-300 md:text-lg"
                    >
                        Beyond ministry, Pastor Bright is a cybersecurity professional, working across Canada's financial, retail, and insurance
                        industries. He currently resides in Toronto, Canada.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                        className="text-base leading-relaxed text-gray-300 md:text-lg"
                    >
                        He is married to his beautiful wife, Ibiye, a strong pillar of support in his life and ministry, and together they are blessed
                        with a wonderful son.
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
