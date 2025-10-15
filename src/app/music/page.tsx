'use client';

import { modernizFont } from '@/lib/utils';
import { useMusic } from '@/hooks/useContentful';
import { FaApple, FaYoutube, FaSpotify, FaDeezer, FaPlay } from 'react-icons/fa';
import { SiAmazonmusic } from 'react-icons/si';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Music() {
    const { music, loading: musicLoading, error: musicError } = useMusic();
    const [isLoading, setIsLoading] = useState(true);

    // Ref for music section animation
    const musicRef = useRef(null);
    const musicInView = useInView(musicRef, { margin: '-100px' });

    // Handle loading logic
    useEffect(() => {
        if (!musicLoading) {
            setIsLoading(false);
        }
    }, [musicLoading]);

    return (
        <div className="relative">
            <section id="hero" className="relative bg-[#030712]">
                {/* Hero Section */}
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
                                <div className="text-center">
                                    {/* Title Skeleton */}
                                    <div className="mx-auto mb-4 h-16 w-3/4 animate-pulse rounded bg-gray-700 md:h-24"></div>

                                    {/* Subtitle Skeleton */}
                                    <div className="mx-auto mb-8 h-6 w-64 animate-pulse rounded bg-gray-700"></div>

                                    {/* Buttons Skeleton */}
                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded bg-gray-700"></div>
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
                        <source src="/videos/NoOtherGodHeroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="text-center">
                            <h1 className={`text-6xl font-bold text-white md:text-8xl ${modernizFont.className}`}>No Other God</h1>
                            <p className="mt-4 text-xl text-white">featuring Rhema Onuoha</p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href="https://www.youtube.com/watch?v=_uUzAETf9TE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                                >
                                    <svg className="mr-3 h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Watch on YouTube
                                </a>

                                <button
                                    onClick={() => {
                                        document.getElementById('music-section')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                    className="group inline-flex items-center justify-center rounded bg-black/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                                >
                                    <FaPlay className="mr-3 h-5 w-5" />
                                    Stream on all platforms
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Music List Section */}
            <section id="music-section" className="relative min-h-screen overflow-hidden rounded bg-[#030712]">
                <div className="py-20">
                    {musicLoading ? (
                        // Loading state
                        <div className="container mx-auto px-4 sm:px-8">
                            {/* Music Section Header Skeleton */}
                            <div className="mx-auto mb-16 max-w-4xl text-center">
                                <div className="mx-auto mb-6 h-16 w-48 animate-pulse rounded bg-gray-700 md:h-20"></div>
                                <div className="mx-auto mb-4 h-6 w-full max-w-3xl animate-pulse rounded bg-gray-700"></div>
                                <div className="mx-auto h-6 w-3/4 max-w-3xl animate-pulse rounded bg-gray-700"></div>
                            </div>

                            {/* Streaming Platform Buttons Skeleton */}
                            <div className="mx-auto mb-12 flex max-w-[1000px] flex-wrap justify-center gap-4">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <div key={index} className="h-12 w-24 animate-pulse rounded-lg bg-gray-700"></div>
                                ))}
                            </div>

                            {/* Music Grid Skeleton */}
                            <div className="mx-auto grid max-w-[1000px] grid-cols-1 justify-items-center gap-8 xl:grid-cols-2">
                                {Array.from({ length: 4 }, (_, index) => (
                                    <div key={index} className="group">
                                        {/* Music Thumbnail Skeleton */}
                                        <div className="relative aspect-square h-[330px] overflow-hidden rounded bg-gray-700 sm:h-[500px]">
                                            <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                        </div>

                                        {/* Song Information Skeleton */}
                                        <div className="mt-4 text-center">
                                            {/* Song Name Skeleton */}
                                            <div className="mx-auto mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-700"></div>

                                            {/* Artist and Release Date Skeleton */}
                                            <div className="mx-auto mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-700"></div>

                                            {/* Music Platform Buttons Skeleton */}
                                            <div className="flex justify-center gap-3">
                                                {Array.from({ length: 5 }, (_, btnIndex) => (
                                                    <div key={btnIndex} className="h-12 w-12 animate-pulse rounded-lg bg-gray-700"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : musicError ? (
                        // Error state
                        <div className="text-center text-red-500">Error loading music: {musicError}</div>
                    ) : (
                        // Music Grid
                        <div className="container mx-auto px-4 sm:px-8">
                            {/* Music Section Header */}
                            <div className="mx-auto mb-16 max-w-4xl text-center">
                                <h2 className={`mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl ${modernizFont.className}`}>
                                    Music
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
                                    Experience the power of worship through music that bridges heaven and earth, bringing faith to life through every
                                    melody and every word.
                                </p>
                            </div>

                            {/* Streaming Platform Buttons */}
                            <div className="mx-auto mb-12 flex max-w-[1000px] flex-wrap justify-center gap-4">
                                <a
                                    href="https://open.spotify.com/artist/2YsaAFq1fn9w2aiBcvURmn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                >
                                    <FaSpotify className="mr-2 h-6 w-6 text-green-400" />
                                    <span className="font-medium text-white">Spotify</span>
                                </a>
                                <a
                                    href="https://music.apple.com/us/artist/brite-egwuogu/1561427540"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                >
                                    <FaApple className="mr-2 h-6 w-6 text-white" />
                                    <span className="font-medium text-white">Apple Music</span>
                                </a>
                                <a
                                    href="https://www.amazon.com/music/player/artists/B09RY3QB5K/brite-egwuogu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                >
                                    <SiAmazonmusic className="mr-2 h-6 w-6 text-orange-400" />
                                    <span className="font-medium text-white">Amazon Music</span>
                                </a>
                                <a
                                    href="https://www.deezer.com/en/artist/159926162"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                >
                                    <FaDeezer className="mr-2 h-6 w-6 text-blue-400" />
                                    <span className="font-medium text-white">Deezer</span>
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                >
                                    <FaYoutube className="mr-2 h-6 w-6 text-red-500" />
                                    <span className="font-medium text-white">YouTube</span>
                                </a>
                            </div>

                            <div
                                ref={musicRef}
                                id="music-grid"
                                className="mx-auto grid max-w-[1000px] grid-cols-1 justify-items-center gap-8 xl:grid-cols-2"
                            >
                                {music.map((song, index) => (
                                    <motion.div
                                        key={song.name}
                                        className="group"
                                        initial={{ opacity: 0 }}
                                        animate={musicInView ? { opacity: 0 } : { opacity: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                                    >
                                        {/* Music Thumbnail */}
                                        <a
                                            href={song.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group hidden overflow-hidden rounded transition-all duration-300 hover:scale-102 md:block"
                                        >
                                            <div className="relative aspect-square h-[330px] overflow-hidden rounded sm:h-[500px]">
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <Image
                                                        src={`https:${song.musicThumbnail.fields.file.url}`}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-xs"
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

                                        {/* Non-clickable version for mobile/tablet */}
                                        <div className="group block overflow-hidden rounded transition-all duration-300 hover:scale-102 md:hidden">
                                            <div className="relative aspect-square h-[330px] overflow-hidden rounded sm:h-[500px]">
                                                {song.musicThumbnail?.fields?.file?.url && (
                                                    <Image
                                                        src={`https:${song.musicThumbnail.fields.file.url}`}
                                                        alt={song.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
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
                                        </div>

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

                                            {/* Music Platform Buttons */}
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
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
