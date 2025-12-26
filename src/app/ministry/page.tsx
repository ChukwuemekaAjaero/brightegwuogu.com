'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';
import { FaYoutube, FaPlay, FaEnvelope } from 'react-icons/fa';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Format date to "Month Day, Year" format for sermons
const formatSermonDate = (dateString: string) => {
    // Handle date string parsing to avoid timezone issues
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

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
        const cardWidth = 374; // 350px card + 24px gap
        const currentScroll = container.scrollLeft;
        const newPosition = direction === 'left' ? currentScroll - cardWidth : currentScroll + cardWidth;

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
            // Calculate which card is currently most visible based on scroll position
            const pageIndex = Math.round(scrollLeft / cardWidth);
            const maxPages = Math.min(7, (sermons.length || 8) - 1); // 8 sermons (0-7)
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
                                    className="group inline-flex cursor-pointer items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
                                >
                                    <FaYoutube size={24} className="mr-3 text-red-600" />
                                    Watch on YouTube
                                </a>
                                <Link
                                    href="/ministry/sermons"
                                    className="group inline-flex cursor-pointer items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
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
                                className="group inline-flex cursor-pointer items-center justify-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800"
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
                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible pr-4 pb-16 pl-4 sm:pr-8 sm:pl-72"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {sermonsLoading ? (
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="w-[350px] flex-shrink-0">
                                        <div className="relative aspect-[4/5] animate-pulse overflow-hidden rounded bg-gray-800"></div>
                                        <div className="py-6">
                                            {/* Title Skeleton */}
                                            <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-700"></div>
                                            {/* Tags Skeleton */}
                                            <div className="mb-3 flex gap-2">
                                                <div className="h-4 w-16 animate-pulse rounded bg-gray-700"></div>
                                                <div className="h-4 w-20 animate-pulse rounded bg-gray-700"></div>
                                            </div>
                                            {/* Date Skeleton */}
                                            <div className="h-4 w-32 animate-pulse rounded bg-gray-700"></div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {sermons.slice(0, 8).map((sermon, index) => (
                                    <motion.a
                                        key={sermon.name}
                                        href={sermon.youTubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block w-[350px] flex-shrink-0 cursor-pointer overflow-hidden rounded transition-all duration-300 hover:scale-103"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden rounded">
                                            {sermon.thumbnailImage?.fields?.file?.url && (
                                                <Image
                                                    src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                    alt={sermon.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                                                />
                                            )}
                                            {/* Black Overlay */}
                                            <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:scale-120 group-hover:opacity-100"></div>

                                            {/* Play Icon Overlay or Description */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                {sermon.sermonDescription ? (
                                                    <div className="p-4 text-center text-white">
                                                        <div className="mb-4 flex justify-center">
                                                            <div className="rounded-full border-2 border-white p-2">
                                                                <svg
                                                                    className="h-8 w-8 text-white drop-shadow-lg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm leading-relaxed whitespace-pre-line">{sermon.sermonDescription}</p>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-full border-4 border-white p-4">
                                                        <svg className="h-20 w-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Sermon Info Below Thumbnail */}
                                        <div className="py-6">
                                            <h3 className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 lg:text-xl">
                                                {sermon.name}
                                            </h3>

                                            {/* Sermon Tags */}
                                            {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                                    {sermon.sermonTags.slice(0, 3).map((tag, tagIndex) => (
                                                        <span key={tagIndex} className="flex items-center text-sm">
                                                            {tagIndex > 0 && <span className="mr-1 text-sm text-gray-500">•</span>}
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {sermon.sermonTags.length > 3 && (
                                                        <span className="text-gray-500">+{sermon.sermonTags.length - 3} more</span>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-300 transition-colors duration-300 lg:text-base">
                                                {sermon.sermonDate ? formatSermonDate(sermon.sermonDate) : ''}
                                            </p>
                                        </div>
                                    </motion.a>
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
                                className="group inline-flex cursor-pointer items-center justify-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800"
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
                            CCI Resources
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300 md:text-xl">
                            Discover helpful resources, provided by Celebration Church International, to deepen your faith and grow in your walk with
                            Christ.
                        </p>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: 'Meet & Pray (MAP)',
                                    description:
                                        'MAP - Meet and Pray is an initiative designed to bring church members together in smaller, more intimate groups for prayer, fellowship, and meaningful connection.',
                                    link: 'http://joincci.org/map',
                                    image: '/images/ministry/map-connect.jpg'
                                },
                                {
                                    title: 'Membership Classes',
                                    description:
                                        'Our Membership Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth.',
                                    link: 'https://joincci.org/membership-class',
                                    image: '/images/ministry/map-study.jpg'
                                },
                                {
                                    title: 'Counseling',
                                    description: `"In the multitude of counsellors there is safety". Don't go through life alone. Get some counsel today!`,
                                    link: 'https://joincci.org/counselling',
                                    image: '/images/ministry/map-pray.jpg'
                                }
                            ].map((resource, index) => (
                                <a
                                    key={index}
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block cursor-pointer overflow-hidden rounded-xs bg-gray-800 bg-cover bg-center p-8 transition-all duration-300 hover:scale-105 md:p-10"
                                    style={{
                                        backgroundImage: `url(${resource.image})`
                                    }}
                                >
                                    {/* Transparent black overlay */}
                                    <div className="absolute inset-0 bg-black/70"></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className={`mb-6 text-2xl font-semibold text-white md:text-2xl xl:text-3xl ${modernizFont.className}`}>
                                            {resource.title}
                                        </h3>
                                        <p className="text-base leading-relaxed text-gray-300 md:text-lg">{resource.description}</p>
                                    </div>
                                </a>
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
                                className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs bg-red-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800 md:px-12 md:py-6 md:text-xl"
                            >
                                <FaEnvelope className="h-5 w-5 md:h-6 md:w-6" />
                                bright.egwuogu@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
