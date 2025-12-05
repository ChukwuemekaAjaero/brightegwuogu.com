'use client';

import { modernizFont } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MusicAbout() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselContentRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const lastScrollY = useRef(0);
    const accumulatedScroll = useRef(0);
    const isInitialized = useRef(false);

    // Initialize carousel with first image off-screen to the left
    useEffect(() => {
        if (!carouselRef.current || !carouselContentRef.current || isInitialized.current) return;

        const initializeCarousel = () => {
            const viewportWidth = window.innerWidth;
            // Position carousel so first image is way off-screen to the left
            // This ensures no empty space when scrolling down (images move right)
            const initialOffset = -2000; // Position far to the left

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
                accumulatedScroll.current += scrollDelta * 0.5; // Adjust speed multiplier as needed
                setTranslateX(accumulatedScroll.current);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className="min-h-screen bg-[#030712]">
            <div className="container mx-auto px-4 py-20 pt-62 sm:px-8">
                <div className="flex flex-col items-center justify-center">
                    {/* Large Header */}
                    <h1 className={`z-1000 text-center text-3xl font-bold text-white md:text-5xl lg:text-7xl xl:text-9xl ${modernizFont.className}`}>
                        Brite
                        <br />
                        Egwuogu
                    </h1>

                    {/* Profile Image Skeleton */}
                    <div className="relative -mt-16 aspect-[3/4] w-80 overflow-hidden rounded-xs bg-gray-800 shadow-lg md:w-96 lg:w-[28rem] xl:w-[32rem]">
                        <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
                    </div>

                    {/* Lorem Ipsum Paragraphs */}
                    <div className="mt-16 max-w-3xl space-y-6 text-center">
                        <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut
                            perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                            quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll-Triggered Image Carousel - Full Width */}
            <div ref={carouselRef} className="relative mt-20 w-full overflow-hidden">
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
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            className="relative aspect-[3/4] w-64 flex-shrink-0 overflow-hidden rounded-xs bg-gray-800 md:w-80 lg:w-96"
                        >
                            <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{index + 1}</span>
                            </div>
                        </div>
                    ))}
                    {/* Duplicate set for seamless scrolling */}
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={`skeleton-duplicate-${index}`}
                            className="relative aspect-[3/4] w-64 flex-shrink-0 overflow-hidden rounded-xs bg-gray-800 md:w-80 lg:w-96"
                        >
                            <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Additional Lorem Ipsum Paragraphs */}
            <div className="container mx-auto px-4 py-20 sm:px-8">
                <div className="mx-auto max-w-3xl space-y-6 text-center">
                    <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos
                        dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                        mollitia animi, id est laborum et dolorum fuga.
                    </p>
                    <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                        impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                    </p>
                    <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                        molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                        consequatur aut perferendis doloribus asperiores repellat.
                    </p>
                    <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                        ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                </div>
            </div>
        </div>
    );
}
