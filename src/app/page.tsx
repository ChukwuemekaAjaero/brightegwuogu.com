'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { modernizFont } from '@/lib/utils';
import { useMusic, useSermons } from '@/hooks/useContentful';
import { FaApple, FaYoutube, FaSpotify, FaDeezer } from 'react-icons/fa';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { SiAmazonmusic } from 'react-icons/si';
import { TypingEffectText } from '@/components/lib/TypingEffectText';
import ZoomParallax from '@/components/lib/ZoomParallax';

// Format date to "Year" format for music
const formatMusicDate = (dateString: string) => {
    // Handle date string parsing to avoid timezone issues
    const date = new Date(dateString + 'T00:00:00');
    return date.getFullYear().toString();
};

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

export default function HomePage() {
    const [activeSection, setActiveSection] = useState('hero');
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();

    // Text carousel state
    const carouselTexts = ['Bright Egwuogu', 'Pastor', 'Musician'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Section refs for scroll-triggered animations
    const aboutMeRef = useRef<HTMLElement>(null);
    const aboutMeInView = useInView(aboutMeRef, { once: true, margin: '-100px' });

    const musicRef = useRef(null);
    const musicInView = useInView(musicRef, { once: true, margin: '-100px' });

    const sermonsRef = useRef(null);
    const sermonsInView = useInView(sermonsRef, { once: true, margin: '-100px' });

    useEffect(() => {
        const sections = ['hero', 'about-me', 'music', 'sermons'];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset for better detection

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Text carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, [carouselTexts.length]);

    return (
        <div className="relative scroll-smooth">
            {/* TABLE OF CONTENTS */}
            {/* <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform 2xl:block">
                <div className="p-4">
                    <nav className="space-y-2">
                        <a
                            href="#hero"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'hero' ? 'text-whitr bg-red-700' : 'text-white'
                            }`}
                        >
                            Home
                        </a>
                        <a
                            href="#about-me"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'about-me' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            About
                        </a>
                        <a
                            href="#music"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'music' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Music
                        </a>
                        <a
                            href="#sermons"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'sermons' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Sermons
                        </a>
                    </nav>
                </div>
            </div> */}

            {/* HORIZONTAL TABLE OF CONTENTS - Mobile/Tablet */}
            {/* <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform 2xl:hidden">
                <div className="rounded-lg bg-black/60 p-2 backdrop-blur-md">
                    <nav className="flex space-x-1">
                        <a
                            href="#hero"
                            className={`rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'hero' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Home
                        </a>
                        <a
                            href="#about-me"
                            className={`rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'about-me' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            About
                        </a>
                        <a
                            href="#music"
                            className={`rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'music' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Music
                        </a>
                        <a
                            href="#sermons"
                            className={`rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'sermons' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Sermons
                        </a>
                    </nav>
                </div>
            </div> */}

            {/* HERO SECTION */}
            <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
                {/* Background Image */}
                <div className="absolute inset-0 mask-b-from-50%">
                    <Image
                        src="/images/heroImage.jpg"
                        alt="Home Page Image"
                        fill
                        sizes="100vw"
                        className="z-0 animate-[zoom_20s_ease-in-out_infinite] object-cover object-[75%_50%]"
                        priority
                    />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 z-2 bg-black/30"></div>

                {/* Text content */}
                <div className="relative z-2 flex min-h-screen items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white sm:px-8">
                        <motion.div
                            key={currentTextIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className={`mb-6 ${modernizFont.className}`}
                        >
                            <TypingEffectText text={carouselTexts[currentTextIndex]} />
                        </motion.div>
                        <motion.p
                            className="mb-8 text-xl"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.8 }}
                        >
                            On a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.
                        </motion.p>

                        {/* Scroll Down Animation */}
                        <motion.div
                            className="mt-12 flex flex-col items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <span className="mb-2 text-sm text-white/80">Scroll down</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="text-white/60"
                            >
                                <FiArrowDown className="h-6 w-6" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about-me" ref={aboutMeRef} className="bg-black">
                <div className="relative h-[370vh] overflow-visible md:h-[400vh] lg:h-[330vh] xl:h-[300vh]">
                    <div className="sticky top-0 z-3 flex h-[100vh] items-center justify-center px-4 text-center sm:px-8">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={aboutMeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
                                className={`text-6xl font-bold text-white ${modernizFont.className}`}
                            >
                                About
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={aboutMeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                className="mt-8 max-w-2xl text-lg text-white md:text-xl"
                            >
                                Bright Egwuogu, known as P.B., is a Toronto-based pastor at Celebration Church International and a passionate
                                contemporary Christian musician whose songs inspire audiences globally. He balances ministry and music with a career
                                in cybersecurity across various industries, and enjoys life with his wife Ibiye and their son.
                            </motion.p>
                        </div>
                    </div>
                    <div className="z-10 container mx-auto mt-8 mb-8 px-4 sm:px-8">
                        {/* Masonry Grid */}
                        <div className="mx-auto columns-2 gap-4 lg:columns-3 xl:columns-4">
                            {/* Image 1 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <Image
                                    src="/images/homeGallery/heroImage2.jpg"
                                    alt="About Me Image 1"
                                    width={400}
                                    height={600}
                                    className="w-full object-cover"
                                />
                            </motion.div>

                            {/* Video 3 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.1
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <video className="w-full" autoPlay muted loop playsInline>
                                    <source src="/videos/InstagramReel3.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>

                            {/* Video */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.2
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <video className="w-full" autoPlay muted loop playsInline>
                                    <source src="/videos/InstagramReel1.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>

                            {/* Image 5 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.25
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <Image
                                    src="/images/homeGallery/heroImage5.jpg"
                                    alt="About Me Image 5"
                                    width={400}
                                    height={500}
                                    className="w-full object-cover"
                                />
                            </motion.div>

                            {/* Image 3 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.3
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <Image
                                    src="/images/homeGallery/heroImage1.jpg"
                                    alt="About Me Image 3"
                                    width={400}
                                    height={700}
                                    className="w-full object-cover"
                                />
                            </motion.div>

                            {/* Image 2 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.4
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <Image
                                    src="/images/homeGallery/heroImage3.jpg"
                                    alt="About Me Image 2"
                                    width={400}
                                    height={500}
                                    className="w-full object-cover"
                                />
                            </motion.div>

                            {/* Image 5 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.5
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <Image
                                    src="/images/homeGallery/heroImage8.jpg"
                                    alt="About Me Image 5"
                                    width={400}
                                    height={650}
                                    className="w-full object-cover"
                                />
                            </motion.div>

                            {/* Video 2 */}
                            <motion.div
                                className="mb-4 break-inside-avoid"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                        mass: 1,
                                        delay: 0.6
                                    }
                                }}
                                viewport={{ once: true, margin: '-100px' }}
                            >
                                <video className="w-full" autoPlay muted loop playsInline>
                                    <source src="/videos/InstagramReel2.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MUSIC PREVIEW SECTION */}
            <section id="music" ref={musicRef} className="bg-black px-4 sm:px-8">
                <div className="container mx-auto sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
                                className={`text-6xl font-bold text-white ${modernizFont.className}`}
                            >
                                Music
                            </motion.h1>
                            <br />
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                className="text-white"
                            >
                                Discover the latest songs of hope, faith, and inspiration.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {musicLoading ? (
                                // Loading state
                                Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className="group">
                                        {/* Music Thumbnail Skeleton */}
                                        <div className="relative aspect-square h-[200px] overflow-hidden bg-gray-700 sm:h-[250px]">
                                            <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                        </div>

                                        {/* Song Information Skeleton */}
                                        <div className="mt-4 text-center">
                                            {/* Song Name Skeleton */}
                                            <div className="mx-auto mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-700"></div>

                                            {/* Artist and Release Date Skeleton */}
                                            <div className="mx-auto mb-3 h-4 w-1/2 animate-pulse rounded bg-gray-700"></div>

                                            {/* Music Platform Buttons Skeleton */}
                                            <div className="flex justify-center gap-2">
                                                {Array.from({ length: 4 }, (_, btnIndex) => (
                                                    <div key={btnIndex} className="h-8 w-8 animate-pulse rounded-lg bg-gray-700"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : musicError ? (
                                // Error state
                                <div className="col-span-full text-center text-red-700">Error loading music: {musicError}</div>
                            ) : (
                                // Music items
                                music.slice(0, 3).map((song, index) => (
                                    <motion.div
                                        key={song.name}
                                        className="group"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                        transition={{ delay: 0.75 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        {/* Music Thumbnail */}
                                        <a
                                            href={song.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block overflow-hidden transition-all duration-300 hover:scale-103"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-gray-800">
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <Image
                                                        src={`https:${song.musicThumbnail.fields.file.url}`}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-cover object-center transition-transform duration-300 group-hover:scale-103 group-hover:blur-sm"
                                                    />
                                                )}
                                                {/* Play Icon Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <div className="rounded-full border-4 border-white p-4">
                                                        <svg className="h-20 w-20 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        {/* Song Information - Below thumbnail */}
                                        <div className="mt-4 text-center text-white">
                                            {/* Song Name */}
                                            <h3 className="mb-2 text-xl font-semibold">{song.name}</h3>

                                            {/* Artist and Release Date */}
                                            <div className="text-sm font-medium text-white/90">
                                                <span className="font-bold">{song.artists?.join(', ')}</span>
                                                {song.releaseDate && (
                                                    <>
                                                        {' • '}
                                                        <span>{formatMusicDate(song.releaseDate)}</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Streaming Service Buttons */}
                                            <div className="mt-4 flex justify-center gap-3">
                                                <a
                                                    href={song.spotifyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Spotify"
                                                >
                                                    <FaSpotify className="h-6 w-6 text-green-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={song.appleMusicLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Apple Music"
                                                >
                                                    <FaApple className="h-6 w-6 text-white md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={song.amazonMusicLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Amazon Music"
                                                >
                                                    <SiAmazonmusic className="h-6 w-6 text-orange-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={song.deezerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Deezer"
                                                >
                                                    <FaDeezer className="h-6 w-6 text-blue-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={song.youTubeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Watch on YouTube"
                                                >
                                                    <FaYoutube className="h-6 w-6 text-red-500 md:h-8 md:w-8" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/music"
                                className="group inline-flex items-center bg-red-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-800 hover:text-white"
                            >
                                More
                                <FiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERMONS PREVIEW SECTION */}
            <section id="sermons" ref={sermonsRef} className="bg-black px-4 sm:px-8">
                <div className="container mx-auto sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
                                className={`text-4xl font-bold text-white sm:text-5xl md:text-6xl ${modernizFont.className}`}
                            >
                                Sermons
                            </motion.h1>
                            <br />
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                                className="text-white"
                            >
                                Discover the latest messages of hope, faith, and inspiration.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sermonsLoading ? (
                                // Loading state
                                Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className="group relative block overflow-hidden">
                                        {/* Image skeleton */}
                                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-700">
                                            <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                        </div>

                                        {/* Text content skeleton */}
                                        <div className="py-4">
                                            {/* Title skeleton */}
                                            <div className="mb-2 h-5 w-full animate-pulse rounded bg-gray-700"></div>
                                            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>

                                            {/* Tags skeleton */}
                                            <div className="mb-2 flex gap-2">
                                                <div className="h-3 w-16 animate-pulse rounded bg-gray-700"></div>
                                                <div className="h-3 w-20 animate-pulse rounded bg-gray-700"></div>
                                            </div>

                                            {/* Date skeleton */}
                                            <div className="h-4 w-24 animate-pulse rounded bg-gray-700"></div>
                                        </div>
                                    </div>
                                ))
                            ) : sermonsError ? (
                                // Error state
                                <div className="col-span-full text-center text-red-700">Error loading sermons: {sermonsError}</div>
                            ) : (
                                // Sermon items
                                sermons.slice(0, 3).map((sermon, index) => (
                                    <motion.a
                                        key={sermon.name}
                                        href={sermon.youTubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block overflow-hidden transition-all duration-300 hover:scale-103"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                        transition={{ delay: 0.75 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
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
                                                        <p className="text-lg leading-relaxed whitespace-pre-line">{sermon.sermonDescription}</p>
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
                                        <div className="py-4">
                                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-700">
                                                {sermon.name}
                                            </h3>

                                            {/* Sermon Tags */}
                                            {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                <div className="mb-2 flex flex-wrap items-center gap-1 text-xs text-gray-400">
                                                    {sermon.sermonTags.slice(0, 3).map((tag, index) => (
                                                        <span key={index} className="flex items-center text-sm">
                                                            {index > 0 && <span className="mr-1 text-sm text-gray-500">•</span>}
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {sermon.sermonTags.length > 3 && (
                                                        <span className="text-gray-500">+{sermon.sermonTags.length - 3} more</span>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-300 transition-colors duration-300">
                                                {formatSermonDate(sermon.sermonDate)}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/sermons"
                                className="group inline-flex items-center bg-red-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-800 hover:text-white"
                            >
                                More
                                <FiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
