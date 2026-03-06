'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';
import { antonFont, ubisoftSansFont } from '@/lib/utils';
import { FaYoutube, FaPlay, FaEnvelope } from 'react-icons/fa';
import { LiaBibleSolid } from 'react-icons/lia';
import { BiMailSend } from 'react-icons/bi';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlipLink } from '@/components/lib/FlipLink';
import { TypewriterText } from '@/components/lib/TypewriterText';
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
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const heroSectionRef = useRef<HTMLElement>(null);
    const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    // Contact form state
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Handle loading logic
    useEffect(() => {
        if (!sermonsLoading) {
            setIsLoading(false);
        }
    }, [sermonsLoading]);

    // Hero video: only start play after the loading overlay is removed. Browsers block or
    // pause autoplay when the video is covered (e.g. by the loading screen), so we wait
    // for isLoading to be false so the video is visible, then play.
    // Dependency array is [isLoading, true] so the array length stays constant (React requirement).
    useEffect(() => {
        if (isLoading) return;

        const video = heroVideoRef.current;
        const section = heroSectionRef.current;
        if (!video || !section) return;

        const play = () => {
            video
                .play()
                .then(() => setHeroVideoPlaying(true))
                .catch((e: unknown) => {
                    if (process.env.NODE_ENV === 'development') {
                        const err = e as { name?: string; message?: string };
                        console.warn('[Ministry hero video] play() failed:', err?.name ?? 'Error', err?.message ?? e);
                    }
                });
        };

        const onPlaying = () => setHeroVideoPlaying(true);
        play();

        video.addEventListener('canplay', play);
        video.addEventListener('playing', onPlaying);
        video.addEventListener('pause', play);

        const observer = new IntersectionObserver(
            (entries) => {
                const [e] = entries;
                if (e?.isIntersecting && heroVideoRef.current) heroVideoRef.current.play().catch(() => {});
            },
            { threshold: 0.25 }
        );
        observer.observe(section);

        const retryId = setInterval(play, 600);
        const stopId = setTimeout(() => clearInterval(retryId), 5000);

        return () => {
            video.removeEventListener('canplay', play);
            video.removeEventListener('playing', onPlaying);
            video.removeEventListener('pause', play);
            observer.disconnect();
            clearInterval(retryId);
            clearTimeout(stopId);
        };
    }, [isLoading, true]);

    // Carousel navigation functions
    const scrollCarousel = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;

        const container = carouselRef.current;
        const cardWidth = 274; // 250px card + 24px gap
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
            // Each card is approximately 250px + 24px gap = 274px
            const cardWidth = 274;
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
        const cardWidth = 274; // 250px card + 24px gap
        const targetScroll = pageIndex * cardWidth;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setCurrentPage(pageIndex);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simulate form submission
        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ title: '', name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="relative overflow-x-hidden scroll-smooth">
            <div className="relative z-10">
                {/* HERO SECTION */}
                <section id="hero" ref={heroSectionRef} className="relative z-20">
                    <div className="relative h-screen min-h-screen w-full overflow-hidden rounded mask-b-from-90%">
                        {/* Loading Screen */}
                        {isLoading && (
                            <div className="absolute inset-0 z-20 bg-black">
                                {/* Video Background Skeleton */}
                                <div
                                    className="absolute top-0 left-1/2 h-full w-[177.78vh] min-w-full -translate-x-1/2 animate-pulse bg-gray-800"
                                ></div>

                                {/* Dark Overlay Skeleton */}
                                <div className="absolute inset-0 top-30 bg-black/30"></div>

                                {/* Content Skeleton */}
                                <div className="relative z-10 flex min-h-screen items-center justify-center">
                                    <div className="container mx-auto px-4 text-center text-white sm:px-8">
                                        {/* Title Skeleton */}
                                        <div className="mx-auto mb-6 h-16 w-3/4 animate-pulse rounded bg-gray-700 md:h-24"></div>

                                        {/* Description Skeleton - Only on lg+ screens */}
                                        <div className="mx-auto mb-6 hidden max-w-3xl lg:block">
                                            <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-700"></div>
                                            <div className="mb-2 h-4 w-5/6 animate-pulse rounded bg-gray-700"></div>
                                            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-700"></div>
                                        </div>

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

                        {/* Video Background - explicit z-index so it stays above any fixed background layers */}
                        <video
                            ref={heroVideoRef}
                            className="absolute top-0 left-1/2 z-[1] h-full w-[177.78vh] min-w-full -translate-x-1/2 object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                        >
                            <source src="/videos/SermonsHeroVideo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Click-to-play overlay for browsers that block autoplay */}
                        {!heroVideoPlaying && (
                            <button
                                type="button"
                                className="absolute inset-0 z-[15] flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30 focus:ring-2 focus:ring-white/50 focus:outline-none focus:ring-inset"
                                onClick={() => {
                                    heroVideoRef.current
                                        ?.play()
                                        .then(() => setHeroVideoPlaying(true))
                                        .catch(() => {});
                                }}
                                aria-label="Play video"
                            >
                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                                    Tap to play video
                                </span>
                            </button>
                        )}

                        {/* Dark Overlay - offset below nav header */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="relative z-10 flex min-h-screen items-center justify-center">
                            <div className="container mx-auto px-4 text-center text-white sm:px-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                >
                                    <TypewriterText
                                        key={sermons[0]?.name ?? 'sermons'}
                                        text={sermons[0]?.name || 'Sermons'}
                                        className={`mb-6 text-5xl font-bold md:text-8xl ${antonFont.className} uppercase`}
                                    />
                                </motion.div>

                                {/* Sermon Description - Only on lg+ screens */}
                                {sermons[0]?.sermonDescription && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                        className="mx-auto mb-6 hidden max-w-3xl text-base leading-relaxed text-gray-200 lg:block lg:text-lg"
                                    >
                                        {sermons[0].sermonDescription}
                                    </motion.p>
                                )}

                                {/* Sermon Tags */}
                                {sermons[0]?.sermonTags && sermons[0].sermonTags.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                                        className="mb-4 flex flex-wrap justify-center gap-2"
                                    >
                                        {sermons[0].sermonTags.map((tag, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
                                                className="rounded-full bg-red-600/40 px-3 py-1 text-sm text-white backdrop-blur-sm"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Sermon Date */}
                                {sermons[0]?.sermonDate && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                        className="mb-6 text-lg text-gray-300"
                                    >
                                        {new Date(sermons[0].sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </motion.p>
                                )}

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                                    className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                                >
                                    <a
                                        href={sermons[0]?.youTubeLink}
                                        target="_blank"
                                        rel="noopener   noreferrer"
                                        className="group inline-flex cursor-pointer items-center justify-center rounded-xs bg-[#010308]/80 px-6 py-4 font-semibold text-white uppercase transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
                                    >
                                        Watch on YouTube
                                        <FaYoutube size={24} className="ml-3 text-red-600" />
                                    </a>
                                    <Link
                                        href="/ministry/sermons"
                                        className="group inline-flex cursor-pointer items-center justify-center rounded-xs bg-[#010308]/80 px-6 py-4 font-semibold text-white uppercase transition-all duration-300 hover:scale-105 hover:bg-red-800/80"
                                    >
                                        View Sermons
                                        <LiaBibleSolid className="ml-3 h-6 w-6" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="relative py-20">
                    <div className="container mx-auto flex items-center justify-center px-4 sm:px-8">
                        <div className="mx-auto w-full max-w-6xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`relative z-10 mb-12 text-center text-6xl font-bold text-white sm:text-7xl md:text-8xl ${antonFont.className} uppercase`}
                            >
                                About
                            </motion.h2>

                            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                                {/* Left Column - Image */}
                                <div className="flex flex-col">
                                    {/* Image */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                        className="flex justify-start"
                                    >
                                        <div className="relative z-0 aspect-[3/4] w-full max-w-lg overflow-hidden rounded-xs shadow-lg md:max-w-xl">
                                            <Image
                                                src="/images/ministry/MinistryAboutImage.jpg"
                                                alt="Pastor Bright Egwuogu"
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Column - Description and Learn More Button */}
                                <div className="flex flex-col justify-center">
                                    <div className="space-y-4">
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                            className="text-center text-base leading-relaxed text-gray-300 md:text-lg"
                                        >
                                            Pastor Bright Egwuogu is the resident pastor of Celebration Church International's Toronto campus, serving
                                            with a heart for God's people and a passion for spreading the Gospel.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                            className="text-center text-base leading-relaxed text-gray-300 md:text-lg"
                                        >
                                            His ministry is characterized by a deep commitment to teaching God's Word with clarity and authenticity,
                                            helping believers grow in their relationship with Christ.
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                                            className="text-center text-base leading-relaxed text-gray-300 md:text-lg"
                                        >
                                            Based in Toronto, he combines his pastoral calling with a heart for worship and music, creating a unique
                                            blend of ministry that touches lives both locally and globally.
                                        </motion.p>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                                        className="mt-8 flex justify-center"
                                    >
                                        <Link
                                            href="/ministry/about"
                                            className="group inline-flex cursor-pointer items-center justify-center rounded-xs bg-gray-700 px-8 py-4 font-semibold text-white uppercase shadow-lg transition-all duration-300 hover:bg-gray-600"
                                        >
                                            Learn More
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Sermons Section */}
                <section className="relative overflow-visible py-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="mx-auto max-w-6xl overflow-visible">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`mb-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${antonFont.className} uppercase`}
                            >
                                Latest Sermons
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="mx-auto mb-8 max-w-2xl text-center text-lg text-gray-300 md:text-xl"
                            >
                                Explore recent teachings and messages that will inspire, challenge, and encourage you in your faith journey.
                            </motion.p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        className="container mx-auto mb-6 flex w-full justify-end gap-4 px-4 sm:px-8"
                    >
                        <button
                            onClick={() => scrollCarousel('left')}
                            disabled={!canScrollLeft}
                            className="cursor-pointer rounded-full bg-gray-700 p-3 text-white shadow-lg transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Scroll left"
                        >
                            <FiChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => scrollCarousel('right')}
                            disabled={!canScrollRight}
                            className="cursor-pointer rounded-full bg-gray-700 p-3 text-white shadow-lg transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Scroll right"
                        >
                            <FiChevronRight className="h-6 w-6" />
                        </button>
                    </motion.div>

                    {/* Sermon Carousel - Full Width */}
                    <div className="relative w-full overflow-x-auto">
                        {/* Carousel Container - Aligned left, overflow right */}
                        <div className="px-4 sm:px-8">
                            <div
                                ref={carouselRef}
                                className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-visible pb-16"
                                style={{
                                    scrollBehavior: 'smooth',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    paddingLeft: 'max(1rem, calc((100vw - 72rem) / 2 + 1rem))',
                                    paddingRight: '1rem'
                                }}
                            >
                                {sermonsLoading ? (
                                    <>
                                        {[...Array(8)].map((_, index) => (
                                            <div key={index} className="w-[250px] flex-shrink-0">
                                                <div className="relative aspect-[4/5] animate-pulse overflow-hidden rounded-sm bg-gray-800"></div>
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
                                            <a
                                                key={sermon.name}
                                                href={sermon.youTubeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative block w-[250px] flex-shrink-0 cursor-pointer overflow-visible transition-all duration-300 hover:scale-103"
                                            >
                                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                                                    {sermon.thumbnailImage?.fields?.file?.url && (
                                                        <Image
                                                            src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                            alt={sermon.name}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                            className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-xs"
                                                        />
                                                    )}
                                                    {/* Black Overlay */}
                                                    <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                                    {/* Play Icon Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                        <div className="rounded-full border-4 border-white p-3">
                                                            <svg
                                                                className="h-12 w-12 text-white drop-shadow-lg"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
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
                                            </a>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
                                            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                                                index === currentPage ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-gray-400'
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
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                className="mt-16 flex justify-center"
                            >
                                <Link
                                    href="/ministry/sermons"
                                    className="group inline-flex cursor-pointer items-center justify-center rounded-xs bg-gray-700 px-8 py-4 font-semibold text-white uppercase shadow-lg transition-all duration-300 hover:bg-gray-600"
                                >
                                    View All Sermons
                                    <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Resources Section */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="mx-auto max-w-6xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`mb-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${antonFont.className} uppercase`}
                            >
                                CCI Resources
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-300 md:text-xl"
                            >
                                Discover helpful resources, provided by Celebration Church International, to deepen your faith and grow in your walk
                                with Christ.
                            </motion.p>

                            <div className="grid grid-cols-1 gap-8">
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
                                    <motion.a
                                        key={index}
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                                        className={`group flex cursor-pointer gap-6 border-b border-gray-600 py-8 transition-all duration-300 md:gap-8 md:py-10 ${
                                            index === 0 ? 'border-t border-gray-600' : ''
                                        }`}
                                    >
                                        {/* Image on the left */}
                                        <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden md:h-56 md:w-56 lg:h-64 lg:w-64">
                                            <Image
                                                src={resource.image}
                                                alt={resource.title}
                                                fill
                                                sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Content on the right */}
                                        <div className="flex flex-1 flex-col justify-center pr-8 md:pr-10">
                                            <h3
                                                className={`mb-4 text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-gray-300 md:text-2xl xl:text-3xl ${antonFont.className} uppercase`}
                                            >
                                                {resource.title}
                                            </h3>
                                            <p className="text-base leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-400 md:text-lg">
                                                {resource.description}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get In Touch Section */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="mx-auto max-w-6xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`mb-12 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${antonFont.className} uppercase`}
                            >
                                Get In Touch
                            </motion.h2>

                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                onSubmit={handleSubmit}
                                className="mx-auto max-w-2xl space-y-6"
                            >
                                <div>
                                    <label htmlFor="title" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xs border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Subject or title"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xs border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xs border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full resize-none rounded-xs border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Your message"
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs bg-gray-700 px-8 py-4 font-semibold text-white uppercase shadow-lg transition-all duration-300 hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <BiMailSend className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 md:h-6 md:w-6" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded bg-green-100 px-4 py-3 text-sm text-green-800"
                                    >
                                        Message sent successfully! We'll get back to you soon.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded bg-red-100 px-4 py-3 text-sm text-red-800"
                                    >
                                        Something went wrong. Please try again.
                                    </motion.div>
                                )}
                            </motion.form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
