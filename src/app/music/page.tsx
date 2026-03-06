'use client';

import { antonFont } from '@/lib/utils';
import { FaApple, FaDeezer } from 'react-icons/fa';
import { TbDisc } from 'react-icons/tb';
import { BiMailSend } from 'react-icons/bi';
import { SiSpotify, SiAmazonmusic } from 'react-icons/si';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/lib/TypewriterText';

// Helper function to format seconds into "min s" format
const formatSongLength = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
};

export default function Music() {
    const [isLoading, setIsLoading] = useState(true);
    const [noOtherGodVideoLoaded, setNoOtherGodVideoLoaded] = useState(false);
    const [noOtherGodVideoActive, setNoOtherGodVideoActive] = useState(false);
    const [joyUnspeakableVideoLoaded, setJoyUnspeakableVideoLoaded] = useState(false);
    const [joyUnspeakableVideoActive, setJoyUnspeakableVideoActive] = useState(false);
    const [ebenezerVideoLoaded, setEbenezerVideoLoaded] = useState(false);
    const [ebenezerVideoActive, setEbenezerVideoActive] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

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

    const handleHeroImageLoad = () => setIsLoading(false);

    return (
        <div className="relative">
            <div className="relative z-10">
                <section id="hero" className="relative">
                    {/* Hero Section */}
                    <div className="relative min-h-screen overflow-hidden rounded-sm mask-b-from-80%">
                        {/* Loading Screen */}
                        {isLoading && (
                            <div className="absolute inset-0 z-20 bg-black">
                                {/* Image Background Skeleton */}
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
                                        <div className="mx-auto mb-4 h-16 w-3/4 animate-pulse rounded-sm bg-gray-700 md:h-24"></div>

                                        {/* Subtitle Skeleton */}
                                        <div className="mx-auto mb-8 h-6 w-64 animate-pulse rounded-sm bg-gray-700"></div>

                                        {/* Buttons Skeleton */}
                                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                            <div className="h-12 w-full max-w-[300px] animate-pulse rounded-sm bg-gray-700"></div>
                                            <div className="h-12 w-full max-w-[300px] animate-pulse rounded-sm bg-gray-700"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hero Image Background */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/music/EbenezerHeroImage.png"
                                alt=""
                                fill
                                className="object-cover"
                                sizes="100vw"
                                onLoad={handleHeroImageLoad}
                                priority
                            />
                        </div>
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="relative z-10 flex min-h-screen items-center justify-center">
                            <div className="text-center">
                                <TypewriterText
                                    text="Ebenezer"
                                    className={`text-center text-6xl font-bold text-white md:text-8xl ${antonFont.className} uppercase`}
                                />

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                    className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                                >
                                    <a
                                        href="https://www.youtube.com/watch?v=_uUzAETf9TE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-[#010308]/80 px-6 py-4 font-semibold text-white uppercase transition-all duration-300 hover:scale-105 hover:bg-[#a46a39]/80"
                                    >
                                        Watch on YouTube
                                        <svg className="ml-3 h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>

                                    <a
                                        href="/music/discography"
                                        className="group inline-flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-[#010308]/80 px-6 py-4 font-semibold text-white uppercase transition-all duration-300 hover:scale-105 hover:bg-[#a46a39]/80"
                                    >
                                        View Discography
                                        <TbDisc className="ml-3 h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ebenezer Video Section */}
                <section className="relative pt-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="relative text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`relative z-10 mb-8 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${antonFont.className} uppercase`}
                            >
                                Ebenezer
                            </motion.h2>

                            {/* Video */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="relative z-0 mx-auto max-w-5xl scale-100 transition-all duration-200 ease-in-out"
                                onMouseEnter={() => setEbenezerVideoActive(true)}
                                onMouseLeave={() => setEbenezerVideoActive(false)}
                            >
                                <div
                                    className={`relative aspect-video w-full overflow-visible rounded-xs bg-gray-800 transition-all duration-200 ease-in-out ${ebenezerVideoActive ? 'shadow-2xl shadow-black/50' : 'shadow-none'}`}
                                >
                                    {/* Skeleton - shown until video loads */}
                                    {!ebenezerVideoLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700"></div>}
                                    {/* YouTube iframe */}
                                    <iframe
                                        src="https://www.youtube.com/embed/uw2t2Vjfyvw"
                                        title="Ebenezer - YouTube Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className={`h-full w-full transition-all duration-300 ${ebenezerVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setEbenezerVideoLoaded(true)}
                                        onFocus={() => setEbenezerVideoActive(true)}
                                        onBlur={() => setEbenezerVideoActive(false)}
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>

                        {/* Song Information */}
                        <div className="mt-12 text-center">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                                className="mb-2 text-lg text-white transition-all duration-200 md:text-xl"
                            >
                                Brite Egwuogu
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                className="mb-8 transition-all duration-200"
                            >
                                <p className="mb-1 text-lg text-gray-300 md:text-xl">2025</p>
                                <p className="text-sm text-gray-500 md:text-base">{formatSongLength(244)}</p>
                            </motion.div>

                            {/* Streaming Service Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                className="flex flex-wrap items-center justify-center gap-4 transition-all duration-200"
                            >
                                <a
                                    href="https://open.spotify.com/track/3p2IjgHE6uOm0e4nmGga7Z?si=64a75b8b7e714f7e"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Spotify"
                                >
                                    <SiSpotify className="h-6 w-6 text-green-400" />
                                </a>
                                <a
                                    href="https://music.apple.com/us/song/ebenezer/1878847463"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Apple Music"
                                >
                                    <FaApple className="h-6 w-6 text-white" />
                                </a>
                                <a
                                    href="https://music.amazon.ca/albums/B0GNS12RZ7?marketplaceId=ART4WZ8MWBX2Y&musicTerritory=CA&ref=dm_sh_pXz3Bf1C6Ebqenz07vxKaPWSd&trackAsin=B0GNQYP89Z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Amazon Music"
                                >
                                    <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                                </a>
                                <a
                                    href="https://link.deezer.com/s/32AsgrkIokASKyh2AXxOD"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Deezer"
                                >
                                    <FaDeezer className="h-6 w-6 text-blue-400" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* No Other God Video Section */}
                <section className="relative pt-20 lg:pt-40">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="relative text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`relative z-10 mb-8 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${antonFont.className} uppercase`}
                            >
                                No Other God
                            </motion.h2>

                            {/* Video */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="relative z-0 mx-auto max-w-5xl scale-100 transition-all duration-200 ease-in-out"
                                onMouseEnter={() => setNoOtherGodVideoActive(true)}
                                onMouseLeave={() => setNoOtherGodVideoActive(false)}
                            >
                                <div
                                    className={`relative aspect-video w-full overflow-visible rounded-xs bg-gray-800 transition-all duration-200 ease-in-out ${noOtherGodVideoActive ? 'shadow-2xl shadow-black/50' : 'shadow-none'}`}
                                >
                                    {/* Skeleton - shown until video loads */}
                                    {!noOtherGodVideoLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700"></div>}
                                    {/* YouTube iframe */}
                                    <iframe
                                        src="https://www.youtube.com/embed/_uUzAETf9TE"
                                        title="No Other God - YouTube Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className={`h-full w-full transition-all duration-300 ${noOtherGodVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setNoOtherGodVideoLoaded(true)}
                                        onFocus={() => setNoOtherGodVideoActive(true)}
                                        onBlur={() => setNoOtherGodVideoActive(false)}
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>

                        {/* Song Information */}
                        <div className="mt-12 text-center">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                                className="mb-2 text-lg text-white transition-all duration-200 md:text-xl"
                            >
                                Brite Egwuogu, Rhema Onuoha
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                className="mb-8 transition-all duration-200"
                            >
                                <p className="mb-1 text-lg text-gray-300 md:text-xl">2025</p>
                                <p className="text-sm text-gray-500 md:text-base">{formatSongLength(480)}</p>
                            </motion.div>

                            {/* Streaming Service Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                className="flex flex-wrap items-center justify-center gap-4 transition-all duration-200"
                            >
                                <a
                                    href="https://open.spotify.com/track/6FCgNzCMwvYqEVwlyU3uYl?si=a50ed64ea8ea46aa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Spotify"
                                >
                                    <SiSpotify className="h-6 w-6 text-green-400" />
                                </a>
                                <a
                                    href="https://music.apple.com/us/song/no-other-god-feat-rhema-onuoha/1823930988"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Apple Music"
                                >
                                    <FaApple className="h-6 w-6 text-white" />
                                </a>
                                <a
                                    href="https://amazon.com/music/player/albums/B0FG7J681F?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_6dJgC1ZLuqn2jKSnYbUYlBQeN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Amazon Music"
                                >
                                    <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                                </a>
                                <a
                                    href="https://link.deezer.com/s/31278uhdrGzCshgIS9jRN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Deezer"
                                >
                                    <FaDeezer className="h-6 w-6 text-blue-400" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Joy Unspeakable Video Section */}
                <section className="relative pt-20 lg:pt-40">
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="relative text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className={`relative z-10 mb-8 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${antonFont.className} uppercase`}
                            >
                                Joy Unspeakable
                            </motion.h2>

                            {/* Video */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="relative z-0 mx-auto max-w-5xl scale-100 transition-all duration-200 ease-in-out"
                                onMouseEnter={() => setJoyUnspeakableVideoActive(true)}
                                onMouseLeave={() => setJoyUnspeakableVideoActive(false)}
                            >
                                <div
                                    className={`relative aspect-video w-full overflow-visible rounded-xs bg-gray-800 transition-all duration-200 ease-in-out ${joyUnspeakableVideoActive ? 'shadow-2xl shadow-black/50' : 'shadow-none'}`}
                                >
                                    {/* Skeleton - shown until video loads */}
                                    {!joyUnspeakableVideoLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700"></div>}
                                    {/* YouTube iframe */}
                                    <iframe
                                        src="https://www.youtube.com/embed/I4h5s5ppu7g"
                                        title="Joy Unspeakable - YouTube Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className={`h-full w-full transition-all duration-300 ${joyUnspeakableVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => setJoyUnspeakableVideoLoaded(true)}
                                        onFocus={() => setJoyUnspeakableVideoActive(true)}
                                        onBlur={() => setJoyUnspeakableVideoActive(false)}
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>

                        {/* Song Information */}
                        <div className="mt-12 text-center">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                                className="mb-2 text-lg text-white transition-all duration-200 md:text-xl"
                            >
                                Brite Egwuogu, Daniel Ike
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                className="mb-8 transition-all duration-200"
                            >
                                <p className="mb-1 text-lg text-gray-300 md:text-xl">2025</p>
                                <p className="text-sm text-gray-500 md:text-base">{formatSongLength(363)}</p>
                            </motion.div>

                            {/* Streaming Service Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                className="flex flex-wrap items-center justify-center gap-4 transition-all duration-200"
                            >
                                <a
                                    href="https://open.spotify.com/track/0GbVNSPa8I6nPGxYKS5jsU?si=90f05dbd51c14034"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Spotify"
                                >
                                    <SiSpotify className="h-6 w-6 text-green-400" />
                                </a>
                                <a
                                    href="https://music.apple.com/us/song/joy-unspeakable-feat-daniel-ike/1802768269"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Apple Music"
                                >
                                    <FaApple className="h-6 w-6 text-white" />
                                </a>
                                <a
                                    href="https://amazon.com/music/player/tracks/B0F1QXX8NQ?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_GVHr0mQtDnmTFETZzKQ2n7CcZ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Amazon Music"
                                >
                                    <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                                </a>
                                <a
                                    href="https://link.deezer.com/s/3127DbiZuf95BQxH7nnlR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex cursor-pointer items-center justify-center rounded-xs border border-gray-500/40 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                    title="Listen on Deezer"
                                >
                                    <FaDeezer className="h-6 w-6 text-blue-400" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Discography Link Section */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="mx-auto max-w-4xl text-center transition-all duration-200"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="text-md mb-8 text-gray-300 md:text-lg lg:text-xl"
                            >
                                Want to discover more? Explore the full collection of songs and dive deeper into the music.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            >
                                <Link
                                    href="/music/discography"
                                    className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs border border-gray-500/40 bg-gray-700 px-8 py-4 font-semibold text-white uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-600"
                                >
                                    View Discography
                                    <TbDisc className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="relative pb-20 lg:pt-20">
                    <div className="container mx-auto px-4 sm:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="mx-auto max-w-2xl transition-all duration-200"
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
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
                                    <label htmlFor="music-title" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="music-title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xs border border-gray-500/40 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Subject or title"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="music-name" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="music-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xs border border-gray-500/40 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="music-email" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="music-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xs border border-gray-500/40 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="music-message" className="mb-2 block text-sm font-semibold text-white uppercase">
                                        Message
                                    </label>
                                    <textarea
                                        id="music-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full resize-none rounded-xs border border-gray-500/40 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                        placeholder="Your message"
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs border border-gray-500/40 bg-gray-700 px-8 py-4 font-semibold text-white uppercase shadow-lg transition-all duration-300 hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 group"
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
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
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
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}
