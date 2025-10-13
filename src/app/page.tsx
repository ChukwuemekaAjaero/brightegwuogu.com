'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { modernizFont } from '@/lib/utils';
import { useMusic, useSermons } from '@/hooks/useContentful';
import { Music } from '@/lib/contentful';
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
    const [selectedSong, setSelectedSong] = useState<Music | null>(null);
    const [dialogOrigin, setDialogOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
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

    // Handle song click with position tracking
    const handleSongClick = (song: Music, event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setDialogOrigin({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height
        });
        setSelectedSong(song);
    };

    return (
        <div className="relative scroll-smooth">
            {/* TABLE OF CONTENTS */}
            <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform 2xl:block">
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
            </div>

            {/* HORIZONTAL TABLE OF CONTENTS - Mobile/Tablet */}
            <div className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 transform 2xl:hidden">
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
            </div>

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

                        {/* Featured Song - No Other God */}
                        <motion.div
                            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                            transition={{ delay: 0.75, duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Left Column - Video */}
                            <div className="relative">
                                <div className="relative aspect-video overflow-hidden rounded-[2px] bg-gray-800">
                                    <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
                                        <source src="/videos/NoOtherGodHeroVideo.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            {/* Right Column - Song Information */}
                            <div className="flex flex-col justify-center text-white">
                                <div className="text-center lg:text-left">
                                    {/* Song Name */}
                                    <h3 className={`mb-6 text-2xl font-bold lg:text-3xl xl:text-4xl ${modernizFont.className}`}>No Other God</h3>

                                    {/* Artist and Release Date */}
                                    <div className="mb-8 text-base font-medium text-white/90 lg:text-lg">
                                        <span className="font-bold">Brite Egwuogu</span>
                                        <span className="mx-2">•</span>
                                        <span>2025</span>
                                    </div>

                                    {/* Song Description */}
                                    <p className="mb-10 text-base leading-relaxed text-white/80 lg:text-lg">
                                        &ldquo;Jesus, No Other God&rdquo; is more than a song, it&apos;s a sound from a strange place. It&apos;s a
                                        declaration and a reminder that in a world full of names and options, there is still only One true God and
                                        He&apos;s different from the rest.
                                    </p>

                                    {/* Streaming Service Buttons */}
                                    <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
                                        <a
                                            href="https://open.spotify.com/track/6FCgNzCMwvYqEVwlyU3uYl?si=a50ed64ea8ea46aa"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                            title="Listen on Spotify"
                                        >
                                            <FaSpotify className="flex h-6 w-6 items-center justify-center text-green-400 md:h-8 md:w-8" />
                                        </a>
                                        <a
                                            href="https://music.apple.com/us/song/no-other-god-feat-rhema-onuoha/1823930988"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                            title="Listen on Apple Music"
                                        >
                                            <FaApple className="flex h-6 w-6 items-center justify-center text-white md:h-8 md:w-8" />
                                        </a>
                                        <a
                                            href="https://www.youtube.com/watch?v=_uUzAETf9TE"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                            title="Watch on YouTube"
                                        >
                                            <FaYoutube className="flex h-6 w-6 items-center justify-center text-red-500 md:h-8 md:w-8" />
                                        </a>
                                        <a
                                            href="https://amazon.com/music/player/albums/B0FG7J681F?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_6dJgC1ZLuqn2jKSnYbUYlBQeN"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                            title="Listen on Amazon Music"
                                        >
                                            <SiAmazonmusic className="flex h-6 w-6 items-center justify-center text-orange-400 md:h-8 md:w-8" />
                                        </a>
                                        <a
                                            href="https://link.deezer.com/s/31278uhdrGzCshgIS9jRN"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                            title="Listen on Deezer"
                                        >
                                            <FaDeezer className="flex h-6 w-6 items-center justify-center text-blue-400 md:h-8 md:w-8" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Other Music Preview */}
                        <div className="mt-16">
                            <div className="mb-12 text-center">
                                <motion.h2
                                    className={`text-2xl font-bold text-white lg:text-3xl ${modernizFont.className}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                    transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                                >
                                    More Music
                                </motion.h2>
                            </div>
                            <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:mx-auto [&>*:nth-child(3)]:max-w-xs lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(3)]:mx-0 lg:[&>*:nth-child(3)]:max-w-none">
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
                                    music.slice(1, 3).map((song, index) => (
                                        <motion.div
                                            key={song.name}
                                            className="group"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                            transition={{ delay: 1.0 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                                        >
                                            {/* Music Thumbnail */}
                                            <div className="group block w-full overflow-hidden transition-all duration-300 hover:scale-103">
                                                {/* Mobile/Tablet - Dialog Overlay */}
                                                <button onClick={(e) => handleSongClick(song, e)} className="block w-full lg:hidden">
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
                                                                <svg
                                                                    className="h-20 w-20 text-white drop-shadow-lg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>

                                                {/* Desktop - Direct YouTube Link */}
                                                <a
                                                    href={song.youTubeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hidden w-full lg:block"
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
                                                                <svg
                                                                    className="h-20 w-20 text-white drop-shadow-lg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            {/* Song Information - Below thumbnail */}
                                            <div className="mt-6 text-center text-white">
                                                {/* Song Name */}
                                                <h3 className="mb-3 text-lg font-semibold lg:text-xl">{song.name}</h3>

                                                {/* Artist and Release Date */}
                                                <div className="mb-4 text-sm font-medium text-white/90 lg:text-base">
                                                    <span className="font-bold">{song.artists?.join(', ')}</span>
                                                    {song.releaseDate && (
                                                        <>
                                                            {' • '}
                                                            <span>{formatMusicDate(song.releaseDate)}</span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Streaming Service Buttons */}
                                                <div className="mt-6 hidden justify-center gap-4 lg:flex">
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
                                {/* Third song - only visible on lg+ screens */}
                                {music.length > 3 && (
                                    <motion.div
                                        className="group hidden lg:block"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={musicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        {/* Music Thumbnail */}
                                        <div className="group block w-full overflow-hidden transition-all duration-300 hover:scale-103">
                                            {/* Desktop - Direct YouTube Link */}
                                            <a href={music[3].youTubeLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                                                <div className="relative aspect-square overflow-hidden bg-gray-800">
                                                    {music[3].musicThumbnail?.fields?.file?.url && (
                                                        <Image
                                                            src={`https:${music[3].musicThumbnail.fields.file.url}`}
                                                            alt={music[3].name}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                            className="object-cover object-center transition-transform duration-300 group-hover:scale-103 group-hover:blur-sm"
                                                        />
                                                    )}
                                                    {/* Play Icon Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                                                </div>
                                            </a>
                                        </div>

                                        {/* Song Information - Below thumbnail */}
                                        <div className="mt-4 text-center text-white">
                                            {/* Song Name */}
                                            <h3 className="mb-3 text-lg font-semibold lg:text-xl">{music[3].name}</h3>

                                            {/* Artist and Release Date */}
                                            <div className="mb-4 text-sm font-medium text-white/90 lg:text-base">
                                                <span className="font-bold">{music[3].artists?.join(', ')}</span>
                                                {music[3].releaseDate && (
                                                    <>
                                                        {' • '}
                                                        <span>{formatMusicDate(music[3].releaseDate)}</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Streaming Service Buttons */}
                                            <div className="mt-6 flex justify-center gap-4">
                                                <a
                                                    href={music[3].spotifyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Spotify"
                                                >
                                                    <FaSpotify className="h-6 w-6 text-green-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={music[3].appleMusicLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Apple Music"
                                                >
                                                    <FaApple className="h-6 w-6 text-white md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={music[3].amazonMusicLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Amazon Music"
                                                >
                                                    <SiAmazonmusic className="h-6 w-6 text-orange-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={music[3].deezerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                                    title="Listen on Deezer"
                                                >
                                                    <FaDeezer className="h-6 w-6 text-blue-400 md:h-8 md:w-8" />
                                                </a>
                                                <a
                                                    href={music[3].youTubeLink}
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
                                )}
                            </div>
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
                                className={`text-5xl font-bold text-white md:text-6xl ${modernizFont.className}`}
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
                                Discover P.B.&apos;s latest sermons for your progress and joy in the faith.
                            </motion.p>
                        </div>

                        {/* Featured Sermon */}
                        <motion.div
                            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                            transition={{ delay: 0.75, duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Left Column - Video */}
                            <div className="relative">
                                <div className="relative aspect-video overflow-hidden rounded-[2px] bg-gray-800">
                                    <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
                                        <source src="/videos/SermonsHeroVideo.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                            {/* Right Column - Sermon Information */}
                            <div className="flex flex-col justify-center text-white">
                                <div className="text-center lg:text-left">
                                    {/* Sermon Name */}
                                    <h3 className={`mb-6 text-2xl font-bold lg:text-3xl xl:text-4xl ${modernizFont.className}`}>
                                        {sermons.length > 0 ? sermons[0].name : 'Latest Sermon'}
                                    </h3>

                                    {/* Sermon Date */}
                                    {sermons.length > 0 && sermons[0].sermonDate && (
                                        <div className="mb-8 text-base text-white/90 lg:text-lg">
                                            <span>{formatSermonDate(sermons[0].sermonDate)}</span>
                                        </div>
                                    )}

                                    {/* Sermon Tags */}
                                    {sermons.length > 0 && sermons[0].sermonTags && sermons[0].sermonTags.length > 0 && (
                                        <div className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                                            {sermons[0].sermonTags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-white">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Sermon Description */}
                                    <p className="mb-10 text-base leading-relaxed whitespace-pre-line text-white/80 lg:text-lg">
                                        {sermons.length > 0 && sermons[0].sermonDescription
                                            ? sermons[0].sermonDescription
                                            : 'Discover powerful messages of hope, faith, and inspiration that will strengthen your walk with God and transform your life.'}
                                    </p>

                                    {/* YouTube Button */}
                                    <div className="flex justify-center">
                                        <a
                                            href={sermons.length > 0 ? sermons[0].youTubeLink : '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex w-full max-w-[300px] items-center justify-center bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                            title="Watch on YouTube"
                                        >
                                            <FaYoutube size={30} className="mr-4" />
                                            Watch on YouTube
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Other Sermons Preview */}
                        <div className="mt-16">
                            <div className="mb-12 text-center">
                                <motion.h2
                                    className={`text-2xl font-bold text-white lg:text-3xl ${modernizFont.className}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                    transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                                >
                                    More Sermons
                                </motion.h2>
                            </div>
                            <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:mx-auto [&>*:nth-child(3)]:max-w-xs lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(3)]:mx-0 lg:[&>*:nth-child(3)]:max-w-none">
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
                                    // Sermon items (skip first one)
                                    sermons.slice(1, 3).map((sermon, index) => (
                                        <motion.a
                                            key={sermon.name}
                                            href={sermon.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block overflow-hidden transition-all duration-300 hover:scale-103"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                            transition={{ delay: 1.0 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
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
                                                            <svg
                                                                className="h-20 w-20 text-white drop-shadow-lg"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Sermon Info Below Thumbnail */}
                                            <div className="py-6">
                                                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-700 lg:text-xl">
                                                    {sermon.name}
                                                </h3>

                                                {/* Sermon Tags */}
                                                {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
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

                                                <p className="text-sm text-gray-300 transition-colors duration-300 lg:text-base">
                                                    {formatSermonDate(sermon.sermonDate)}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))
                                )}
                                {/* Third sermon - only visible on lg+ screens */}
                                {sermons.length > 3 && (
                                    <motion.a
                                        key={sermons[3].name}
                                        href={sermons[3].youTubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group hidden overflow-hidden transition-all duration-300 hover:scale-103 lg:block"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={sermonsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                                        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            {sermons[3].thumbnailImage?.fields?.file?.url && (
                                                <Image
                                                    src={`https:${sermons[3].thumbnailImage.fields.file.url}`}
                                                    alt={sermons[3].name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                                                />
                                            )}
                                            {/* Black Overlay */}
                                            <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:scale-120 group-hover:opacity-100"></div>

                                            {/* Play Icon Overlay or Description */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                {sermons[3].sermonDescription ? (
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
                                                        <p className="text-lg leading-relaxed whitespace-pre-line">{sermons[3].sermonDescription}</p>
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
                                            <h3 className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-700 lg:text-xl">
                                                {sermons[3].name}
                                            </h3>

                                            {/* Sermon Tags */}
                                            {sermons[3].sermonTags && sermons[3].sermonTags.length > 0 && (
                                                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                                    {sermons[3].sermonTags.slice(0, 3).map((tag, index) => (
                                                        <span key={index} className="flex items-center text-sm">
                                                            {index > 0 && <span className="mr-1 text-sm text-gray-500">•</span>}
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {sermons[3].sermonTags.length > 3 && (
                                                        <span className="text-gray-500">+{sermons[3].sermonTags.length - 3} more</span>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-300 transition-colors duration-300 lg:text-base">
                                                {formatSermonDate(sermons[3].sermonDate)}
                                            </p>
                                        </div>
                                    </motion.a>
                                )}
                            </div>
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

            {/* Song Dialog Overlay */}
            <AnimatePresence>
                {selectedSong && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.1,
                                x: dialogOrigin.x - window.innerWidth / 2,
                                y: dialogOrigin.y - window.innerHeight / 2
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.1,
                                x: dialogOrigin.x - window.innerWidth / 2,
                                y: dialogOrigin.y - window.innerHeight / 2
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                                mass: 0.8
                            }}
                            className="m-8 flex h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] max-w-2xl flex-col justify-center bg-gradient-to-br from-red-600 to-red-500 p-8 shadow-lg shadow-red-800/20"
                        >
                            {/* Song Info */}
                            <div className="mb-8 text-center text-white">
                                <motion.h3
                                    className={`mb-4 text-xl font-bold sm:text-2xl md:text-3xl ${modernizFont.className} break-words`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    {selectedSong.name}
                                </motion.h3>
                                <motion.div
                                    className="mb-4 text-lg text-white/90"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                >
                                    <span className="font-bold">{selectedSong.artists?.join(', ')}</span>
                                    {selectedSong.releaseDate && (
                                        <>
                                            {' • '}
                                            <span>{formatMusicDate(selectedSong.releaseDate)}</span>
                                        </>
                                    )}
                                </motion.div>
                            </div>

                            {/* Social Links */}
                            <motion.div
                                className="flex flex-wrap justify-center gap-4"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                            >
                                <a
                                    href={selectedSong.spotifyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-md bg-gray-950 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-900"
                                    title="Listen on Spotify"
                                >
                                    <FaSpotify className="mr-2 h-6 w-6 text-green-400" />
                                    <span className="font-medium">Spotify</span>
                                </a>
                                <a
                                    href={selectedSong.appleMusicLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-md bg-gray-950 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-900"
                                    title="Listen on Apple Music"
                                >
                                    <FaApple className="mr-2 h-6 w-6 text-white" />
                                    <span className="font-medium">Apple Music</span>
                                </a>
                                <a
                                    href={selectedSong.amazonMusicLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-md bg-gray-950 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-900"
                                    title="Listen on Amazon Music"
                                >
                                    <SiAmazonmusic className="mr-2 h-6 w-6 text-orange-400" />
                                    <span className="font-medium">Amazon Music</span>
                                </a>
                                <a
                                    href={selectedSong.deezerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-md bg-gray-950 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-900"
                                    title="Listen on Deezer"
                                >
                                    <FaDeezer className="mr-2 h-6 w-6 text-blue-400" />
                                    <span className="font-medium">Deezer</span>
                                </a>
                                <a
                                    href={selectedSong.youTubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-md bg-gray-950 px-3 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-900"
                                    title="Watch on YouTube"
                                >
                                    <FaYoutube className="mr-2 h-6 w-6 text-red-500" />
                                    <span className="font-medium">YouTube</span>
                                </a>
                            </motion.div>

                            {/* Close Button */}
                            <motion.button
                                onClick={() => setSelectedSong(null)}
                                className="fixed top-12 right-12 z-10 h-12 w-12 bg-white/0 transition-all hover:bg-white/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.2 }}
                            >
                                <motion.span
                                    className="absolute block h-1 w-6 bg-white"
                                    style={{ y: '-50%', left: '50%', x: '-50%' }}
                                    animate={{ rotate: 45 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="absolute block h-1 w-6 bg-white"
                                    style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
                                    animate={{ rotate: -45 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
