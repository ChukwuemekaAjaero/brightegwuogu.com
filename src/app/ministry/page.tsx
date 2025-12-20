'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';
import { FaYoutube, FaPlay, FaEnvelope } from 'react-icons/fa';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Convert YouTube URL to embed URL with time parameter
const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    const videoId = match[1];

    // Extract time parameter (t=) from URL
    const timeMatch = url.match(/[?&]t=([\dhms]+)/);
    let startTime = 0;

    if (timeMatch) {
        const timeStr = timeMatch[1];
        // Parse time string (supports formats like: 123, 1m30s, 1h2m30s)
        const regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
        const [, hours, minutes, seconds] = timeStr.match(regex) || [];
        startTime = parseInt(hours || '0') * 3600 + parseInt(minutes || '0') * 60 + parseInt(seconds || timeStr || '0');
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return startTime > 0 ? `${embedUrl}?start=${startTime}` : embedUrl;
};

export default function MinistryPage() {
    const { sermons, loading: sermonsLoading } = useSermons();
    const [isLoading, setIsLoading] = useState(true);

    // Carousel state
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    // Handle loading logic
    useEffect(() => {
        if (!sermonsLoading) {
            setIsLoading(false);
        }
    }, [sermonsLoading]);

    // Carousel navigation functions
    const scrollCarousel = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;

        const container = carouselRef.current;
        const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
        const currentScroll = container.scrollLeft;
        const newPosition = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

        container.scrollTo({ left: newPosition, behavior: 'smooth' });
    };

    // Check scroll position and update current page
    useEffect(() => {
        const checkScrollPosition = () => {
            if (!carouselRef.current) return;
            const container = carouselRef.current;
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Calculate current page based on scroll position
            // Each card is approximately 350px + 24px gap = 374px
            const cardWidth = 374;
            const centerOffset = clientWidth / 2;
            const pageIndex = Math.round((scrollLeft + centerOffset) / cardWidth);
            const maxPages = 7; // 8 sermons (0-7)
            setCurrentPage(Math.max(0, Math.min(pageIndex, maxPages)));
        };

        const container = carouselRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, [sermonsLoading, sermons]);

    // Go to specific page
    const goToPage = (pageIndex: number) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const cardWidth = 374; // 350px card + 24px gap
        const targetScroll = pageIndex * cardWidth;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setCurrentPage(pageIndex);
    };
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
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
                                >
                                    <FaYoutube size={24} className="mr-3 text-red-600" />
                                    Watch on YouTube
                                </a>
                                <Link
                                    href="/ministry/sermons"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
                                >
                                    <FaPlay className="mr-3 h-5 w-5" />
                                    View Sermons
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-4xl">
                        <h2 className={`relative z-10 text-center text-6xl font-bold text-white sm:text-7xl md:text-8xl ${modernizFont.className}`}>
                            About
                        </h2>

                        {/* Image */}
                        <div className="-mt-8 mb-12 flex justify-center">
                            <div className="relative z-0 aspect-[3/4] w-64 overflow-hidden rounded-xs shadow-lg md:w-80 lg:w-96">
                                <Image
                                    src="/images/ministry/MinistryAboutImage.jpg"
                                    alt="Pastor Bright Egwuogu"
                                    fill
                                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
                                Pastor Bright Egwuogu is the resident pastor of Celebration Church International's Toronto campus, serving with a
                                heart for God's people and a passion for spreading the Gospel.
                            </p>
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
                                His ministry is characterized by a deep commitment to teaching God's Word with clarity and authenticity, helping
                                believers grow in their relationship with Christ.
                            </p>
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
                                Based in Toronto, he combines his pastoral calling with a heart for worship and music, creating a unique blend of
                                ministry that touches lives both locally and globally.
                            </p>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/ministry/about"
                                className="group inline-flex items-center justify-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Sermons Section */}
            <section className="relative overflow-visible bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-6xl overflow-visible">
                        <h2 className={`mb-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>
                            Latest Sermons
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300 md:text-xl">
                            Explore recent teachings and messages that will inspire, challenge, and encourage you in your faith journey.
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="container mx-auto flex w-full justify-end gap-4 px-4 pb-4">
                    <button
                        onClick={() => scrollCarousel('left')}
                        disabled={!canScrollLeft}
                        className="rounded-full bg-red-900 p-3 text-white shadow-lg shadow-red-800/20 transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => scrollCarousel('right')}
                        disabled={!canScrollRight}
                        className="rounded-full bg-red-900 p-3 text-white shadow-lg shadow-red-800/20 transition-all hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Scroll right"
                    >
                        <FiChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Sermon Carousel - Full Width */}
                <div className="relative w-full overflow-visible">
                    <p className="text-center text-red-500">NOTE: The left padding needs to match the breakpoints for the container class</p>
                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible pb-16 pl-4 sm:pl-72"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {sermonsLoading ? (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="relative h-[600px] w-[400px] flex-shrink-0 overflow-visible rounded-xs bg-gray-800 p-6 md:p-8"
                                    >
                                        <div className="flex h-full flex-col items-start justify-start">
                                            {/* Title Skeleton */}
                                            <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-700"></div>
                                            {/* Tags Skeleton */}
                                            <div className="mb-3 flex gap-2">
                                                <div className="h-5 w-16 animate-pulse rounded-full bg-gray-700"></div>
                                                <div className="h-5 w-20 animate-pulse rounded-full bg-gray-700"></div>
                                            </div>
                                            {/* Date Skeleton */}
                                            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gray-700"></div>
                                            {/* Description Skeleton */}
                                            <div className="mb-4 space-y-2">
                                                <div className="h-4 w-full animate-pulse rounded bg-gray-700"></div>
                                                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700"></div>
                                                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-700"></div>
                                            </div>
                                            {/* Image Skeleton - Centered */}
                                            <div className="mx-auto aspect-[3/4] w-48 rounded-xs bg-gray-700"></div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {sermons.slice(0, 8).map((sermon, index) => (
                                    <div
                                        key={index}
                                        className="relative h-[550px] w-[400px] flex-shrink-0 overflow-hidden rounded-xs bg-gray-800 p-6 md:p-8"
                                    >
                                        <div className="flex h-full flex-col items-start justify-between">
                                            <div className="flex flex-1 flex-col items-start justify-start">
                                                {/* Sermon Title */}
                                                <h3 className={`mb-4 text-xl font-semibold text-white`}>{sermon.name}</h3>
                                                {/* Sermon Tags */}
                                                {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap gap-2">
                                                        {sermon.sermonTags.slice(0, 2).map((tag, tagIndex) => (
                                                            <span key={tagIndex} className="rounded-full bg-red-600/40 px-2 py-1 text-xs text-white">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {/* Sermon Date */}
                                                {sermon.sermonDate && (
                                                    <p className="mb-4 text-xs text-gray-400">
                                                        {new Date(sermon.sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                )}
                                                {/* Sermon Description */}
                                                {sermon.sermonDescription && (
                                                    <p className="mb-4 line-clamp-3 text-xs leading-relaxed whitespace-pre-line text-gray-300">
                                                        {sermon.sermonDescription}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Sermon Image */}
                                            {sermon.thumbnailImage?.fields?.file?.url ? (
                                                <div className="relative ml-auto w-full pt-4">
                                                    <img
                                                        src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                        alt={sermon.name}
                                                        className="ml-auto h-auto w-[80%] rounded-xs object-contain transition-transform duration-300"
                                                        style={{
                                                            transform:
                                                                'perspective(1000px) rotateY(-10deg) rotateX(2deg) skewY(1deg) translateY(1rem)',
                                                            transformStyle: 'preserve-3d'
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="ml-auto aspect-[3/4] w-48 rounded-xs bg-gray-700"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                        {sermonsLoading ? (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <button
                                        key={index}
                                        disabled
                                        className="h-2 w-2 rounded-full bg-white/20 transition-all duration-300"
                                        aria-label={`Sermon ${index + 1}`}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {sermons.slice(0, 8).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === currentPage ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                                        }`}
                                        aria-label={`Go to sermon ${index + 1}`}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* View All Sermons Button */}
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mt-32 flex justify-center md:mt-40">
                            <Link
                                href="/ministry/sermons"
                                className="group inline-flex items-center justify-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800"
                            >
                                View All Sermons
                                <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-6xl">
                        <h2 className={`mb-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>
                            Resources
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300 md:text-xl">
                            Discover helpful resources to deepen your faith and grow in your walk with Christ.
                        </p>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                {
                                    title: 'Bible Study Guides',
                                    description:
                                        "Comprehensive study guides to help you dive deeper into God's Word. Each guide includes questions, reflections, and practical applications for your daily life."
                                },
                                {
                                    title: 'Prayer Resources',
                                    description:
                                        'Tools and guides to strengthen your prayer life. Learn different prayer methods, find prayer prompts, and discover how to develop a consistent prayer routine.'
                                },
                                {
                                    title: 'Devotional Materials',
                                    description:
                                        'Daily devotionals and spiritual growth materials designed to encourage and inspire you. Access daily readings, reflections, and practical wisdom for your journey.'
                                }
                            ].map((resource, index) => (
                                <div key={index} className="rounded-xs bg-gray-800 p-8 md:p-10">
                                    <h3 className={`mb-6 text-2xl font-semibold text-white md:text-3xl ${modernizFont.className}`}>
                                        {resource.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-300 md:text-lg">{resource.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-2xl">
                        <h2 className={`mb-12 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>
                            Get In Touch
                        </h2>

                        <div className="flex justify-center">
                            <a
                                href="mailto:bright.egwuogu@gmail.com"
                                className="group inline-flex items-center justify-center gap-4 rounded-xs bg-red-900 px-12 py-6 text-xl font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800 md:px-16 md:py-8 md:text-2xl"
                            >
                                <FaEnvelope className="h-6 w-6 md:h-8 md:w-8" />
                                bright.egwuogu@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
