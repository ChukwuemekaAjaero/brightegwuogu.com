'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { modernizFont } from '@/lib/utils';
import { useMusic, useSermons } from '@/hooks/useContentful';
import { FaApple, FaYoutube, FaSpotify, FaDeezer } from 'react-icons/fa';
import { SiAmazonmusic } from 'react-icons/si';

// Format date to "Year" format
const formatDate = (dateString: string) => {
    // Handle date string parsing to avoid timezone issues
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export default function HomePage() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const imageCount = 7;
    const [activeSection, setActiveSection] = useState('hero');
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();

    // Text carousel state
    const carouselTexts = ['Bright Egwuogu', 'Pastor', 'Musician'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const sections = ['hero', 'about-me', 'gallery', 'music', 'sermons'];

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
        }, 5000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, [carouselTexts.length]);

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
                            About Me
                        </a>
                        <a
                            href="#gallery"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'gallery' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Gallery
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
            <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform 2xl:hidden">
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
                            href="#gallery"
                            className={`rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:bg-red-800 hover:text-white ${
                                activeSection === 'gallery' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Gallery
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
                <div className="absolute inset-0 z-10 bg-black/30"></div>

                {/* Text content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white sm:px-8">
                        <motion.h1
                            key={currentTextIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className={`mb-6 text-5xl font-bold md:text-8xl ${modernizFont.className}`}
                        >
                            {carouselTexts[currentTextIndex]}
                        </motion.h1>
                        <p className="mb-8 text-xl">On a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.</p>

                        {/* Scroll Down Animation */}
                        <motion.div
                            className="mt-12 flex flex-col items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
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
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about-me" className="flex min-h-screen justify-center bg-black transition-colors duration-300">
                <div className="container h-max px-4 sm:px-8">
                    <div className="flex h-max flex-col items-center gap-8 lg:flex-row">
                        {/* Image Content - First on mobile, second on desktop */}
                        <div className="group relative min-h-[50vh] w-full overflow-hidden lg:order-2 lg:min-h-[100vh] lg:w-[60%]">
                            <Image
                                src="/images/aboutMeImage.jpg"
                                alt="About Me Image"
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="mask-t-from-70% mask-r-from-95% mask-l-from-95% object-cover object-[65%_50%] transition-all duration-300 group-hover:scale-105 lg:mask-l-from-100%"
                            />
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
                        </div>

                        {/* Text Content - Second on mobile, first on desktop */}
                        <div className="w-full lg:order-1 lg:w-[40%]">
                            <h1 className={`text-6xl font-bold text-white ${modernizFont.className} mb-8`}>About Me</h1>
                            <p className="xs:py-0 py-4 text-white md:text-lg">
                                Bright Egwuogu serves as a pastor at Celebration Church International, a global apostolic ministry under the
                                leadership of Apostle Emmanuel Iren, committed to the vision of guiding all individuals to celebrate eternal life in
                                Christ Jesus. He currently fulfills the role of resident pastor at the Toronto campus, where he is dedicated to
                                fostering spiritual growth among believers.
                                <br />
                                <br />
                                Affectionately known as P.B., he is also an accomplished musician with a collection of contemporary Christian songs
                                that have positively impacted thousands worldwide.
                                <br />
                                <br />
                                Residing in Toronto, Canada, P.B. balances his pastoral and musical callings with a career as a cybersecurity
                                professional serving the financial, retail, and insurance sectors. He is married to his supportive wife, Ibiye, and
                                together they are blessed with a son.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="gallery" ref={targetRef} className="relative h-[300vh] min-h-screen bg-black">
                <div className="sticky top-0 z-10 overflow-hidden">
                    <motion.div style={{ x }} className="flex w-max">
                        {Array.from({ length: imageCount }, (_, i) => `${i + 1}`).map((_, index) => (
                            <div
                                key={index}
                                className={`group relative h-[100vh] w-[80vh] flex-shrink-0 overflow-hidden ${index === imageCount - 1 ? 'mask-r-from-90%' : ''}`}
                            >
                                <Image
                                    src={`/images/homeGallery/heroImage${index + 1}.jpg`}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="scale-102 mask-b-from-90% object-contain transition-all group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* MUSIC PREVIEW SECTION */}
            <section id="music" className="bg-black px-4 sm:px-8">
                <div className="container mx-auto sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <h1 className={`text-6xl font-bold text-white ${modernizFont.className}`}>Music</h1>
                            <br />
                            <p className="text-white">Discover the latest songs of hope, faith, and inspiration.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {musicLoading ? (
                                // Loading state
                                Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className="aspect-square animate-pulse bg-gray-200">
                                        <div className="flex h-full w-full items-center justify-center">
                                            <span className="text-gray-500">Loading...</span>
                                        </div>
                                    </div>
                                ))
                            ) : musicError ? (
                                // Error state
                                <div className="col-span-full text-center text-red-700">Error loading music: {musicError}</div>
                            ) : (
                                // Music items
                                music.slice(0, 3).map((song) => (
                                    <div key={song.name} className="group">
                                        {/* Music Thumbnail */}
                                        <a
                                            href={song.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block overflow-hidden transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="relative aspect-square overflow-hidden bg-gray-800">
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <Image
                                                        src={`https:${song.musicThumbnail.fields.file.url}`}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
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
                                                        <span>{formatDate(song.releaseDate)}</span>
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
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/music"
                                className="group inline-flex items-center bg-red-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-800 hover:text-white"
                            >
                                More
                                <svg
                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERMONS PREVIEW SECTION */}
            <section id="sermons" className="bg-black px-4 sm:px-8">
                <div className="container mx-auto sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <h1 className={`text-4xl font-bold text-white sm:text-5xl md:text-6xl ${modernizFont.className}`}>Sermons</h1>
                            <br />
                            <p className="text-white">Discover the latest messages of hope, faith, and inspiration.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sermonsLoading ? (
                                // Loading state
                                Array.from({ length: 3 }, (_, index) => (
                                    <div key={index} className="aspect-square animate-pulse bg-gray-200">
                                        <div className="flex h-full w-full items-center justify-center">
                                            <span className="text-gray-500">Loading...</span>
                                        </div>
                                    </div>
                                ))
                            ) : sermonsError ? (
                                // Error state
                                <div className="col-span-full text-center text-red-700">Error loading sermons: {sermonsError}</div>
                            ) : (
                                // Sermon items
                                sermons.slice(0, 3).map((sermon) => (
                                    <a
                                        key={sermon.name}
                                        href={sermon.youTubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block overflow-hidden transition-all duration-300"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            {sermon.thumbnailImage?.fields?.file?.url && (
                                                <Image
                                                    src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                    alt={sermon.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
                                                />
                                            )}
                                            {/* Black Overlay */}
                                            <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

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
                                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors duration-300">
                                                {sermon.name}
                                            </h3>

                                            {/* Sermon Tags */}
                                            {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                <div className="mb-2 flex flex-wrap items-center gap-1 text-xs text-gray-400">
                                                    {sermon.sermonTags.slice(0, 3).map((tag, index) => (
                                                        <span key={index} className="flex items-center">
                                                            {index > 0 && <span className="mr-1 text-gray-500">•</span>}
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {sermon.sermonTags.length > 3 && (
                                                        <span className="text-gray-500">+{sermon.sermonTags.length - 3} more</span>
                                                    )}
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-300 transition-colors duration-300">{formatDate(sermon.sermonDate)}</p>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/sermons"
                                className="group inline-flex items-center bg-red-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-800 hover:text-white"
                            >
                                More
                                <svg
                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
