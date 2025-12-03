'use client';

import { modernizFont } from '@/lib/utils';
import { useMusic } from '@/hooks/useContentful';
import { FaApple, FaYoutube, FaSpotify, FaDeezer } from 'react-icons/fa';
import { SiAmazonmusic } from 'react-icons/si';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function MusicDiscography() {
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
            {/* Music List Section */}
            <section id="music-section" className="relative min-h-screen overflow-hidden rounded-lg bg-[#030712]">
                <div className="py-20">
                    {musicLoading ? (
                        // Loading state
                        <div className="container mx-auto px-4 sm:px-8">
                            {/* Music Section Header Skeleton */}
                            <div className="mx-auto mb-16 max-w-4xl text-center">
                                <div className="mx-auto mb-6 h-16 w-48 animate-pulse rounded-lg bg-gray-700 md:h-20"></div>
                                <div className="mx-auto mb-4 h-6 w-full max-w-3xl animate-pulse rounded-lg bg-gray-700"></div>
                                <div className="mx-auto h-6 w-3/4 max-w-3xl animate-pulse rounded-lg bg-gray-700"></div>
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
                                        <div className="relative aspect-square h-[330px] overflow-hidden rounded-lg bg-gray-700 sm:h-[500px]">
                                            <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                        </div>

                                        {/* Song Information Skeleton */}
                                        <div className="mt-4 text-center">
                                            {/* Song Name Skeleton */}
                                            <div className="mx-auto mb-2 h-6 w-3/4 animate-pulse rounded-lg bg-gray-700"></div>

                                            {/* Artist and Release Date Skeleton */}
                                            <div className="mx-auto mb-4 h-4 w-1/2 animate-pulse rounded-lg bg-gray-700"></div>

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
                        <div className="container mx-auto mt-16 px-4 sm:px-8">
                            {/* Music Section Header */}
                            <div className="mx-auto mb-16 text-center">
                                <h2 className={`mb-6 text-4xl font-bold text-white sm:text-5xl md:text-7xl xl:text-8xl ${modernizFont.className}`}>
                                    Discography
                                </h2>
                                <p className="text-md mx-auto max-w-3xl text-center leading-relaxed text-gray-300 lg:text-lg">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque
                                    faucibus.
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
