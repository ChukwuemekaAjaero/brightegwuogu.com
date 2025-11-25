'use client';

import React, { useState, useEffect } from 'react';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';
import { FaYoutube } from 'react-icons/fa';

export default function MinistryPage() {
    const { sermons, loading: sermonsLoading } = useSermons();
    const [isLoading, setIsLoading] = useState(true);

    // Handle loading logic
    useEffect(() => {
        if (!sermonsLoading) {
            setIsLoading(false);
        }
    }, [sermonsLoading]);
    return (
        <div className="relative scroll-smooth">
            {/* HERO SECTION */}
            <section id="hero" className="relative bg-[#030712]">
                <div className="relative min-h-screen overflow-hidden rounded mask-b-from-50%">
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
                                <div className="container mx-auto px-4 text-center text-white sm:px-8">
                                    {/* Title Skeleton */}
                                    <div className="mx-auto mb-6 h-16 w-3/4 animate-pulse rounded bg-gray-700 md:h-24"></div>

                                    {/* Tags Skeleton */}
                                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                                        <div className="h-8 w-20 animate-pulse rounded-full bg-gray-700"></div>
                                        <div className="h-8 w-24 animate-pulse rounded-full bg-gray-700"></div>
                                        <div className="h-8 w-16 animate-pulse rounded-full bg-gray-700"></div>
                                    </div>

                                    {/* Date Skeleton */}
                                    <div className="mx-auto mb-6 h-6 w-64 animate-pulse rounded bg-gray-700"></div>

                                    {/* Button Skeleton */}
                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded bg-gray-700"></div>
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
                        <source src="/videos/SermonsHeroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="container mx-auto px-4 text-center text-white sm:px-8">
                            <h1 className={`mb-6 text-5xl font-bold md:text-8xl ${modernizFont.className}`}>{sermons[0]?.name || 'Sermons'}</h1>

                            {/* Sermon Tags */}
                            {sermons[0]?.sermonTags && sermons[0].sermonTags.length > 0 && (
                                <div className="mb-4 flex flex-wrap justify-center gap-2">
                                    {sermons[0].sermonTags.map((tag, index) => (
                                        <span key={index} className="rounded-full bg-red-600/40 px-3 py-1 text-sm text-white backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Sermon Date */}
                            {sermons[0]?.sermonDate && (
                                <p className="mb-6 text-lg text-gray-300">
                                    {new Date(sermons[0].sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}

                            {/* Buttons */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href={sermons[0]?.youTubeLink}
                                    target="_blank"
                                    rel="noopener   noreferrer"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/60 px-6 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                >
                                    <FaYoutube size={24} className="mr-3 text-red-600" />
                                    Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filler Section */}
            <section className="relative min-h-screen bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <div className="text-center">
                            <h2 className={`mb-4 text-4xl font-bold text-white md:text-6xl ${modernizFont.className}`}>Welcome to Ministry</h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                                Explore our sermons, resources, and more to grow in your faith journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
