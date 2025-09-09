'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { modernizFont } from '@/lib/utils';
import { useMusic, useSermons } from '@/hooks/useContentful';

// Format date to "Day, Month Year" format
const formatDate = (dateString: string) => {
    // Handle date string parsing to avoid timezone issues
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default function HomePage() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const imageCount = 7;
    const [activeSection, setActiveSection] = useState('hero');
    const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();

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

            // Check if navbar is over white sections (music or sermons)
            const musicElement = document.getElementById('music');
            const sermonsElement = document.getElementById('sermons');
            const navbarPosition = window.scrollY + window.innerHeight / 2; // Center of viewport

            let isOverWhite = false;

            if (musicElement) {
                const musicTop = musicElement.offsetTop;
                const musicBottom = musicTop + musicElement.offsetHeight;
                isOverWhite = navbarPosition >= musicTop && navbarPosition <= musicBottom;
            }

            if (!isOverWhite && sermonsElement) {
                const sermonsTop = sermonsElement.offsetTop;
                const sermonsBottom = sermonsTop + sermonsElement.offsetHeight;
                isOverWhite = navbarPosition >= sermonsTop && navbarPosition <= sermonsBottom;
            }

            setIsOverWhiteSection(isOverWhite);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative scroll-smooth">
            {/* TABLE OF CONTENTS */}
            <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform 2xl:block">
                <div className="bg-transparent p-4">
                    <nav className="space-y-2">
                        <a
                            href="#hero"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'hero' ? 'bg-blue-600 text-white' : isOverWhiteSection ? 'text-black' : 'text-white'
                            }`}
                        >
                            Home
                        </a>
                        <a
                            href="#about-me"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'about-me' ? 'bg-blue-600 text-white' : isOverWhiteSection ? 'text-black' : 'text-white'
                            }`}
                        >
                            About Me
                        </a>
                        <a
                            href="#gallery"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'gallery' ? 'bg-blue-600 text-white' : isOverWhiteSection ? 'text-black' : 'text-white'
                            }`}
                        >
                            Gallery
                        </a>
                        <a
                            href="#music"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'music' ? 'bg-blue-600 text-white' : isOverWhiteSection ? 'text-black' : 'text-white'
                            }`}
                        >
                            Music
                        </a>
                        <a
                            href="#sermons"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'sermons' ? 'bg-blue-600 text-white' : isOverWhiteSection ? 'text-black' : 'text-white'
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
                        className="z-0 animate-[zoom_20s_ease-in-out_infinite] object-cover object-[75%_50%]"
                        priority
                    />
                </div>

                {/* Text content */}
                <div className="flex h-full w-full max-w-[1600px] items-end justify-start px-4 sm:px-8">
                    <h1 className={`relative z-20 max-w-[500px] text-4xl font-bold text-white`}>
                        On a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.
                    </h1>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about-me" className="flex min-h-screen justify-center bg-black transition-colors duration-300">
                <div className="h-max max-w-[1600px] px-4 sm:px-8">
                    <div className="flex h-max flex-col items-center gap-8 md:flex-row">
                        {/* Text Content */}

                        <div className="w-full md:w-[40%]">
                            <h1 className={`text-6xl font-bold text-white ${modernizFont.className} mb-8`}>About Me</h1>
                            <p className="text-white">
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

                        {/* Image Content */}
                        <div
                            className="relative min-h-[100vh] w-full overflow-hidden md:w-[60%]"
                            onMouseEnter={() => {
                                const section = document.getElementById('about-me-section');
                                if (section) section.style.backgroundColor = '#271b1b';
                            }}
                            onMouseLeave={() => {
                                const section = document.getElementById('about-me-section');
                                if (section) section.style.backgroundColor = 'rgb(0, 0, 0)';
                            }}
                        >
                            <Image
                                src="/images/aboutMeImage.jpg"
                                alt="About Me Image"
                                fill
                                className="mask-t-from-70% mask-r-from-90% object-cover object-[75%_50%] grayscale-30 transition-all duration-300 hover:scale-105 hover:grayscale-0"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="gallery" ref={targetRef} className="relative h-[200vh] min-h-screen bg-black">
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
                                    className="scale-102 mask-b-from-90% object-contain transition-all group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/0" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* MUSIC PREVIEW SECTION */}
            <section id="music" className="bg-white px-4 sm:px-8">
                <div className="mx-auto max-w-[1600px] sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <h1 className={`text-6xl font-bold text-black ${modernizFont.className}`}>Music</h1>
                            <br />
                            <p className="text-black">Discover the latest songs of hope, faith, and inspiration.</p>
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
                                <div className="col-span-full text-center text-red-500">Error loading music: {musicError}</div>
                            ) : (
                                // Music items
                                music.slice(0, 3).map((song, index) => (
                                    <div
                                        key={song.name}
                                        className="group relative aspect-square overflow-hidden bg-gray-800 transition-colors duration-300 hover:bg-blue-500"
                                        onMouseEnter={(e) => {
                                            const section = e.currentTarget.closest('section');
                                            if (section) {
                                                // Change text colors to secondary color
                                                const textElements = section.querySelectorAll('h1, h2, h3, p, a');
                                                textElements.forEach((element) => {
                                                    (element as HTMLElement).style.color = song.secondaryColor || '#000000';
                                                    (element as HTMLElement).style.transition = 'color 0.3s ease';
                                                });
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const section = e.currentTarget.closest('section');
                                            if (section) {
                                                // Reset text colors
                                                const textElements = section.querySelectorAll('h1, h2, h3, p, a');
                                                textElements.forEach((element) => {
                                                    (element as HTMLElement).style.color = '';
                                                });
                                            }
                                        }}
                                    >
                                        {song.musicThumbnail?.fields?.file?.url && (
                                            <Image
                                                src={`https:${song.musicThumbnail.fields.file.url}`}
                                                alt={song.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
                                            />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                            <div className="p-4 text-center text-white">
                                                <h3 className="mb-2 text-xl font-semibold">{song.name}</h3>
                                                <p className="mb-1 text-base opacity-90">{song.artists?.join(', ')}</p>
                                                <p className="text-sm opacity-75">{formatDate(song.releaseDate)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/music"
                                className="group inline-flex items-center bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:text-white"
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
            <section id="sermons" className="bg-blue-100 px-4 sm:px-8">
                <div className="mx-auto max-w-[1600px] sm:px-8">
                    <div className="h-max py-20">
                        <div className="mb-12 text-center">
                            <h1 className={`text-5xl font-bold text-black md:text-6xl ${modernizFont.className}`}>Sermons</h1>
                            <br />
                            <p className="text-black">Discover the latest messages of hope, faith, and inspiration.</p>
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
                                <div className="col-span-full text-center text-red-500">Error loading sermons: {sermonsError}</div>
                            ) : (
                                // Sermon items
                                sermons.slice(0, 3).map((sermon, index) => (
                                    <div
                                        key={sermon.name}
                                        className="group cursor-pointer overflow-hidden transition-colors duration-300"
                                        onClick={() => window.open(sermon.youTubeLink, '_blank')}
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            {sermon.thumbnailImage?.fields?.file?.url && (
                                                <Image
                                                    src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                    alt={sermon.name}
                                                    fill
                                                    className="object-cover object-[50%_10%] transition-transform duration-300 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                <div className="flex justify-center">
                                                    <svg className="h-30 w-30 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="mb-2 text-xl font-semibold">{sermon.name}</h3>
                                            <p className="text-sm opacity-75">{formatDate(sermon.sermonDate)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/sermons"
                                className="group inline-flex items-center bg-black px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:text-white"
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
