'use client';

import { modernizFont } from '@/lib/utils';
import { useMusic } from '@/hooks/useContentful';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Music() {
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sections = ['hero', ...music.map((song, index) => `song-${index}`)];

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Process sections in reverse order to prioritize higher indexes
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop } = element;

                    // Highlight section when the anchor's href point (section top) is hit
                    if (scrollPosition >= offsetTop) {
                        // For song sections, prioritize the one 2 indexes above
                        if (section.startsWith('song-')) {
                            const currentIndex = parseInt(section.split('-')[1]);
                            const targetIndex = Math.max(0, currentIndex - 2);
                            const targetSection = `song-${targetIndex}`;

                            // Only highlight if the target section exists and we're past its top
                            const targetElement = document.getElementById(targetSection);
                            if (targetElement && scrollPosition >= targetElement.offsetTop) {
                                setActiveSection(targetSection);
                            } else {
                                setActiveSection(section);
                            }
                        } else {
                            setActiveSection(section);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [music]);

    return (
        <div className="relative scroll-smooth">
            {/* TABLE OF CONTENTS */}
            <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 transform 2xl:block">
                <div className="bg-transparent p-4">
                    <nav className="space-y-2">
                        <a
                            href="#hero"
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-700 hover:text-white ${
                                activeSection === 'hero' ? 'bg-red-700 text-white' : 'text-white'
                            }`}
                        >
                            Hero
                        </a>
                        {music.map((song, index) => (
                            <a
                                key={song.name}
                                href={`#song-${index}`}
                                className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-red-700 hover:text-white ${
                                    activeSection === `song-${index}` ? 'bg-red-600 text-white' : 'text-white'
                                }`}
                            >
                                {song.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
            <section id="hero" className="relative bg-black">
                {/* Hero Section */}
                <div className="relative min-h-screen overflow-hidden mask-b-from-50%">
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
                            <p className="mt-4 text-xl text-white">Out now on all platforms!</p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="https://www.youtube.com/watch?v=_uUzAETf9TE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex w-full max-w-[300px] items-center justify-center bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                >
                                    <svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Watch on YouTube
                                </a>

                                <a
                                    href="#"
                                    className="group inline-flex w-full max-w-[300px] items-center justify-center bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                                >
                                    <svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    Stream Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Music List Section */}
            <section className="relative min-h-screen overflow-hidden bg-black">
                <div className="py-20">
                    <div className="mb-12 text-center">
                        <h2 className={`text-4xl font-bold text-white md:text-6xl ${modernizFont.className}`}>All Songs</h2>
                        <p className="mt-4 text-lg text-gray-300">Complete discography and latest releases</p>
                    </div>

                    {musicLoading ? (
                        // Loading state
                        <div className="space-y-8">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="flex animate-pulse gap-6 bg-gray-800 p-6">
                                    <div className="h-32 w-32 flex-shrink-0 bg-gray-700"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 w-3/4 rounded bg-gray-700"></div>
                                        <div className="h-4 w-1/2 rounded bg-gray-700"></div>
                                        <div className="h-4 w-1/3 rounded bg-gray-700"></div>
                                        <div className="h-4 w-1/4 rounded bg-gray-700"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : musicError ? (
                        // Error state
                        <div className="text-center text-red-500">Error loading music: {musicError}</div>
                    ) : (
                        // Music Grid
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="mx-auto grid max-w-[1000px] grid-cols-1 justify-items-center gap-8 xl:grid-cols-2">
                                {music.map((song) => (
                                    <div key={song.name} className="group">
                                        {/* Music Thumbnail */}
                                        <a
                                            href={song.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block overflow-hidden transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="relative aspect-square h-[300px] overflow-hidden sm:h-[500px]">
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <Image
                                                        src={`https:${song.musicThumbnail.fields.file.url}`}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
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

                                        {/* Song Information - Always visible below thumbnail */}
                                        <div className="mt-4 text-center text-white">
                                            {/* Song Name */}
                                            <h3 className="mb-2 text-xl leading-tight font-bold">{song.name}</h3>

                                            {/* Artist and Release Date */}
                                            <div className="text-sm font-medium text-white/90">
                                                <span className="font-bold">{song.artists?.join(', ')}</span>
                                                {song.releaseDate && (
                                                    <>
                                                        {' • '}
                                                        <span>{new Date(song.releaseDate + 'T00:00:00').getFullYear()}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
