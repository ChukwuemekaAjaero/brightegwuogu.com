'use client';

import { modernizFont, formatDuration } from '@/lib/utils';
import { useMusic } from '@/hooks/useContentful';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

export default function Music() {
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sections = ['hero', ...music.map((song, index) => `song-${index}`)];

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportMiddle = scrollPosition + viewportHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    const sectionMiddle = offsetTop + offsetHeight / 2;

                    // Highlight section when its middle crosses the viewport middle
                    if (viewportMiddle >= sectionMiddle) {
                        setActiveSection(section);
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
                            className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                activeSection === 'hero' ? 'bg-blue-600 text-white' : 'text-white'
                            }`}
                        >
                            Hero
                        </a>
                        {music.map((song, index) => (
                            <a
                                key={song.name}
                                href={`#song-${index}`}
                                className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                                    activeSection === `song-${index}` ? 'bg-blue-600 text-white' : 'text-white'
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
                    <iframe
                        className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2"
                        style={{ minWidth: '100vw' }}
                        src="https://www.youtube.com/embed/_uUzAETf9TE?autoplay=1&mute=1&loop=1&playlist=_uUzAETf9TE&start=52&end=82&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
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
                        <h2 className={`text-5xl font-bold text-white md:text-6xl ${modernizFont.className}`}>All Songs</h2>
                        <p className="mt-4 text-xl text-gray-300">Complete discography and latest releases</p>
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
                        // Music list
                        <div className="space-y-0">
                            {music.map((song, index) => (
                                <section
                                    key={song.name}
                                    id={`song-${index}`}
                                    className="w-screen space-y-6 py-16"
                                    style={{ backgroundColor: song.primaryColor }}
                                >
                                    <div className="mx-auto max-w-[1600px]">
                                        {/* Main Content Container */}
                                        <div className="flex flex-col gap-6 p-6 transition-all duration-3000 md:flex-row">
                                            {/* Music Thumbnail */}
                                            <div className="group relative aspect-square min-h-[500px] w-full min-w-[500px] overflow-hidden md:w-1/2 lg:w-1/4">
                                                {/* YouTube Video iframe - hidden by default, shown on hover */}
                                                {song.youTubeLink && (
                                                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                        <iframe
                                                            src={`${song.youTubeLink.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${song.youTubeLink.split('v=')[1]}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=0&end=30`}
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
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <a
                                                        href={song.youTubeLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/image relative block h-full w-full"
                                                    >
                                                        <Image
                                                            src={`https:${song.musicThumbnail.fields.file.url}`}
                                                            alt={song.name}
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

                                            {/* Song Information */}
                                            <div className="flex flex-1 flex-col justify-end">
                                                {song.recordType && (
                                                    <p className="mb-2 text-sm font-medium tracking-wider text-gray-400">{song.recordType}</p>
                                                )}
                                                <h3
                                                    className={`mb-2 text-3xl font-bold break-words text-white md:text-6xl ${modernizFont.className}`}
                                                >
                                                    {song.name}
                                                </h3>
                                                <p className="text-md text-gray-300">
                                                    <span className="font-bold">{song.artists?.join(', ')}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{new Date(song.releaseDate + 'T00:00:00').getFullYear()}</span>
                                                    {song.songLength && (
                                                        <>
                                                            <span className="mx-2">•</span>
                                                            <span>{formatDuration(song.songLength)}</span>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Buttons Container */}
                                        <div className="flex flex-wrap gap-3 p-6">
                                            {/* Streaming Platform Links */}
                                            <a
                                                href="#"
                                                className="inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                                                </svg>
                                                Spotify
                                            </a>
                                            <a
                                                href="#"
                                                className="inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                                YouTube Music
                                            </a>
                                            <a
                                                href="#"
                                                className="inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11h-2v6h2V8zm0 8h-2v2h2v-2z" />
                                                </svg>
                                                Apple Music
                                            </a>

                                            {/* YouTube Video Link (if available) */}
                                            {song.hasMusicVideo && song.youTubeLink && (
                                                <a
                                                    href={song.youTubeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                                >
                                                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                    </svg>
                                                    Watch Music Video
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
