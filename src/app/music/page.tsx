'use client';

import { modernizFont } from '@/lib/utils';
import { FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap'
});

export default function Music() {
    const [isLoading, setIsLoading] = useState(true);

    // Handle loading logic
    useEffect(() => {
        // Simulate loading for hero video
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            <section id="hero" className="relative bg-[#030712]">
                {/* Hero Section */}
                <div className="relative min-h-screen overflow-hidden rounded-lg mask-b-from-50%">
                    {/* Loading Screen */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 bg-black">
                            {/* Video Background Skeleton */}
                            <div
                                className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2 animate-pulse bg-gray-800"
                                style={{ minWidth: '100vw' }}
                            ></div>

                            {/* Dark Overlay Skeleton */}
                            <div className="absolute inset-0 bg-black/30"></div>

                            {/* Content Skeleton */}
                            <div className="relative z-10 flex min-h-screen items-center justify-center">
                                <div className="text-center">
                                    {/* Title Skeleton */}
                                    <div className="mx-auto mb-4 h-16 w-3/4 animate-pulse rounded-lg bg-gray-700 md:h-24"></div>

                                    {/* Subtitle Skeleton */}
                                    <div className="mx-auto mb-8 h-6 w-64 animate-pulse rounded-lg bg-gray-700"></div>

                                    {/* Buttons Skeleton */}
                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded-lg bg-gray-700"></div>
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded-lg bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Video Background */}
                    <video
                        className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2 object-cover"
                        style={{ minWidth: '100vw' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/videos/NoOtherGodHeroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="text-center">
                            <h1 className={`text-6xl font-bold text-white md:text-8xl ${modernizFont.className}`}>No Other God</h1>
                            <p className="mt-4 text-xl text-white">featuring Rhema Onuoha</p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="https://www.youtube.com/watch?v=_uUzAETf9TE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                                >
                                    <svg className="mr-3 h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Watch on YouTube
                                </a>

                                <a
                                    href="/music/discography"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                                >
                                    <FaPlay className="mr-3 h-5 w-5" />
                                    View Discography
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bible Verse Section */}
            <section className="relative min-h-screen bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <div className="text-center">
                            <blockquote className={`mb-6 text-3xl text-white md:text-5xl lg:text-6xl ${playfairDisplay.className}`}>
                                "My heart is steadfast, O God, my heart is steadfast; I will sing and make music."
                            </blockquote>
                            <p className="mb-8 text-lg text-gray-400 md:text-xl">— Psalms 57:7</p>

                            {/* About Text */}
                            <p className="text-sm text-red-500 md:text-base">NOTE: Change the width on different screen sizes</p>
                            <p className="mx-auto my-8 max-w-5xl text-base leading-relaxed text-gray-300 md:text-xl">
                                Bright Egwuogu is the resident pastor of Celebration Church International’s Toronto campus, part of the global
                                ministry led by Apostle Emmanuel Iren. He is passionate about helping people grow spiritually and is also a
                                contemporary Christian musician whose songs have impacted listeners around the world. Based in Toronto, he combines
                                his pastoral and musical callings with a career in cybersecurity, and is married to his wife, Ibiye; they have a son.
                            </p>

                            {/* Read My Story Button */}
                            <Link
                                href="/music/about"
                                className="group inline-flex items-center justify-center rounded bg-gradient-to-br from-blue-900 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:from-blue-800 hover:to-teal-500"
                            >
                                Read my story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
