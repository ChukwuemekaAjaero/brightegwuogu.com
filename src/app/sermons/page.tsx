'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';

export default function SermonsPage() {
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sections = ['hero', ...sermons.map((sermon, index) => `sermon-${index}`)];

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop } = element;

                    // Highlight section when the anchor's href point (section top) is hit
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sermons]);

    return (
        <div className="relative scroll-smooth">
            {/* TABLE OF CONTENTS */}
            <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform 2xl:block">
                <div className="bg-transparent p-4">
                    <nav className="space-y-2">
                        <a
                            href="#hero"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'hero' ? 'bg-blue-600 text-white' : 'text-white'
                            }`}
                        >
                            Hero
                        </a>
                        {sermons.map((sermon, index) => (
                            <a
                                key={sermon.name}
                                href={`#sermon-${index}`}
                                className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                    activeSection === `sermon-${index}` ? 'bg-blue-600 text-white' : 'text-white'
                                }`}
                            >
                                {sermon.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* HERO SECTION */}
            <section id="hero" className="relative bg-black">
                <div className="relative min-h-screen overflow-hidden mask-b-from-50%">
                    {/* Video Background */}
                    <iframe
                        className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2"
                        style={{ minWidth: '100vw' }}
                        src="https://www.youtube.com/embed/xO4-ydr5Ttc?autoplay=1&mute=1&loop=1&playlist=xO4-ydr5Ttc&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=3594&end=3694"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className={`mb-6 text-6xl font-bold ${modernizFont.className}`}>Sermons</h1>
                            <p className="mb-8 text-xl">Inspiring messages of hope, faith, and transformation</p>

                            {/* Buttons */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="https://www.youtube.com/live/xO4-ydr5Ttc?t=3594s"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex w-full max-w-[300px] items-center justify-center bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                >
                                    <svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Watch on YouTube
                                </a>
                                <a
                                    href="#sermon-0"
                                    className="group inline-flex w-full max-w-[300px] items-center justify-center bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                                >
                                    <svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Browse Sermons
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERMONS LIST SECTION */}
            <section className="relative min-h-screen overflow-hidden bg-black">
                <div className="py-20">
                    <div className="mb-12 text-center">
                        <h2 className={`text-5xl font-bold text-white md:text-6xl ${modernizFont.className}`}>All Sermons</h2>
                        <p className="mt-4 text-xl text-gray-300">Complete collection of inspiring messages</p>
                    </div>

                    {sermonsLoading ? (
                        // Loading state
                        <div className="space-y-8">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="mx-auto max-w-[1600px]">
                                    <div className="flex flex-col gap-6 p-6 md:flex-row">
                                        <div className="aspect-square min-h-[300px] w-full min-w-[300px] animate-pulse bg-gray-700 md:w-1/2 lg:w-1/4"></div>
                                        <div className="flex flex-1 flex-col justify-end">
                                            <div className="mb-2 h-8 w-3/4 animate-pulse bg-gray-700"></div>
                                            <div className="mb-1 h-6 w-1/2 animate-pulse bg-gray-600"></div>
                                            <div className="mb-4 h-4 w-1/4 animate-pulse bg-gray-600"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sermonsError ? (
                        // Error state
                        <div className="text-center text-red-500">Error loading sermons: {sermonsError}</div>
                    ) : (
                        // Sermons list
                        <div className="space-y-0">
                            {sermons.map((sermon, index) => (
                                <section
                                    key={sermon.name}
                                    id={`sermon-${index}`}
                                    className="w-screen space-y-6 py-16"
                                    style={{ backgroundColor: '#1a1a1a' }}
                                >
                                    <div className="mx-auto max-w-[1600px]">
                                        {/* Main Content Container */}
                                        <div className="flex flex-col gap-6 p-6 transition-all duration-3000 md:flex-row">
                                            {/* Sermon Thumbnail */}
                                            <div className="group relative aspect-square min-h-[300px] w-full min-w-[300px] overflow-hidden md:w-1/2 lg:w-1/4">
                                                {/* YouTube Video iframe - hidden by default, shown on hover */}
                                                {sermon.youTubeLink && (
                                                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                        <iframe
                                                            src={`${sermon.youTubeLink.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${sermon.youTubeLink.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=0&end=30`}
                                                            className="absolute inset-0 h-full min-h-full w-full"
                                                            style={{
                                                                minHeight: '100%',
                                                                minWidth: '100%',
                                                                width: '177.78vh',
                                                                height: '100%',
                                                                left: '50%',
                                                                transform: 'translateX(-50%)',
                                                                objectFit: 'cover'
                                                            }}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            loading="lazy"
                                                        />
                                                        {/* Black overlay with 60% opacity */}
                                                        <div className="absolute inset-0 bg-black/60"></div>
                                                    </div>
                                                )}

                                                {/* Image - visible by default, hidden on hover */}
                                                {sermon.thumbnailImage?.fields?.file?.url && (
                                                    <a
                                                        href={sermon.youTubeLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/image relative block h-full w-full"
                                                    >
                                                        <Image
                                                            src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                            alt={sermon.name}
                                                            fill
                                                            className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-0"
                                                        />
                                                        {/* Play Icon Overlay */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                                                            <div className="rounded-full border-4 border-white p-4">
                                                                <svg
                                                                    className="h-20 w-20 text-white drop-shadow-lg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </a>
                                                )}
                                            </div>

                                            {/* Sermon Information */}
                                            <div className="flex flex-1 flex-col justify-end">
                                                <h3
                                                    className={`mb-2 text-xl font-bold break-words text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl ${modernizFont.className}`}
                                                >
                                                    {sermon.name}
                                                </h3>
                                                <p className="text-md text-gray-300">
                                                    <span className="font-bold">Sermon</span>
                                                    <span className="mx-2">•</span>
                                                    <span>
                                                        {new Date(sermon.sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Buttons Container */}
                                        <div className="flex flex-wrap gap-3 p-6">
                                            {/* YouTube Video Link */}
                                            {sermon.youTubeLink && (
                                                <a
                                                    href={sermon.youTubeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                                >
                                                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122-2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                    </svg>
                                                    Watch Sermon
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
