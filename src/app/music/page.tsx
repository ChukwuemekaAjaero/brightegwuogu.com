'use client';

import { modernizFont } from '@/lib/utils';
import { FaApple, FaDeezer, FaEnvelope } from 'react-icons/fa';
import { IoIosMusicalNotes } from 'react-icons/io';
import { SiSpotify, SiAmazonmusic } from 'react-icons/si';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Helper function to format seconds into "min s" format
const formatSongLength = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
};

export default function Music() {
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const noOtherGodImageRef = useRef<HTMLImageElement>(null);
    const joyUnspeakableImageRef = useRef<HTMLImageElement>(null);
    const neverLostImageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [noOtherGodVideoLoaded, setNoOtherGodVideoLoaded] = useState(false);
    const [noOtherGodVideoActive, setNoOtherGodVideoActive] = useState(false);
    const [noOtherGodImageLoaded, setNoOtherGodImageLoaded] = useState(false);
    const [joyUnspeakableVideoLoaded, setJoyUnspeakableVideoLoaded] = useState(false);
    const [joyUnspeakableVideoActive, setJoyUnspeakableVideoActive] = useState(false);
    const [joyUnspeakableImageLoaded, setJoyUnspeakableImageLoaded] = useState(false);
    const [neverLostVideoLoaded, setNeverLostVideoLoaded] = useState(false);
    const [neverLostVideoActive, setNeverLostVideoActive] = useState(false);
    const [neverLostImageLoaded, setNeverLostImageLoaded] = useState(false);
    const [formData, setFormData] = useState({
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
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle loading logic for hero video
    useEffect(() => {
        const video = heroVideoRef.current;
        if (!video) return;

        // Check if video is already loaded (cached from preloader)
        if (video.readyState >= 3) {
            // HAVE_FUTURE_DATA (3) or HAVE_ENOUGH_DATA (4) means video is ready
            setIsLoading(false);
            return;
        }

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        const handleLoadedData = () => {
            // Video has loaded enough data to start playing
            setIsLoading(false);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);

        // Fallback timeout in case events don't fire
        const fallbackTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            clearTimeout(fallbackTimer);
        };
    }, []);

    // Handle image loading - check if already cached
    useEffect(() => {
        const cleanupFunctions: (() => void)[] = [];

        const checkImageLoaded = (imgRef: React.RefObject<HTMLImageElement | null>, setLoaded: (value: boolean) => void) => {
            if (imgRef.current) {
                // Check if image is already loaded (cached from preloader)
                if (imgRef.current.complete && imgRef.current.naturalHeight !== 0) {
                    setLoaded(true);
                } else {
                    const handleLoad = () => setLoaded(true);
                    const handleError = () => setLoaded(true); // Show image even if error to avoid skeleton forever
                    imgRef.current.addEventListener('load', handleLoad);
                    imgRef.current.addEventListener('error', handleError);
                    cleanupFunctions.push(() => {
                        imgRef.current?.removeEventListener('load', handleLoad);
                        imgRef.current?.removeEventListener('error', handleError);
                    });
                }
            }
        };

        checkImageLoaded(noOtherGodImageRef, setNoOtherGodImageLoaded);
        checkImageLoaded(joyUnspeakableImageRef, setJoyUnspeakableImageLoaded);
        checkImageLoaded(neverLostImageRef, setNeverLostImageLoaded);

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }, []);

    return (
        <div className="relative">
            <section id="hero" className="relative bg-[#010308]">
                {/* Hero Section */}
                <div className="relative min-h-screen overflow-hidden rounded-lg mask-b-from-80%">
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
                                    <div className="mx-auto mb-4 h-16 w-3/4 animate-pulse rounded-lg bg-gray-700 md:h-24"></div>

                                    {/* Subtitle Skeleton */}
                                    <div className="mx-auto mb-8 h-6 w-64 animate-pulse rounded-lg bg-gray-700"></div>

                                    {/* Buttons Skeleton */}
                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded-lg bg-gray-700"></div>
                                        <div className="h-12 w-full max-w-[300px] animate-pulse rounded-lg bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Video Background */}
                    <video
                        ref={heroVideoRef}
                        className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2 object-cover"
                        style={{ minWidth: '100vw' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src="/videos/NoOtherGodHeroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className={`text-6xl font-bold text-white md:text-8xl ${modernizFont.className}`}
                            >
                                No Other God
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="mt-4 text-xl text-white"
                            >
                                featuring Rhema Onuoha
                            </motion.p>

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
                                    className="group inline-flex cursor-pointer items-center justify-center rounded bg-[#010308]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-900/80"
                                >
                                    <svg className="mr-3 h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Watch on YouTube
                                </a>

                                <a
                                    href="/music/discography"
                                    className="group inline-flex cursor-pointer items-center justify-center rounded bg-[#010308]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-900/80"
                                >
                                    <IoIosMusicalNotes className="mr-3 h-5 w-5" />
                                    View Discography
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative bg-[#010308]">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <div className="text-center">
                            {/* About Text */}

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="mx-auto my-8 max-w-5xl text-base leading-relaxed text-gray-300 md:text-xl"
                            >
                                Bright Egwuogu (fondly called PB) serves as the Resident Pastor of the Toronto campus of Celebration Church
                                International, a global apostolic ministry led by Apostle Emmanuel Iren with a vision to see all men celebrating
                                endless life in Christ Jesus. He is passionate about spiritual growth and discipleship, committed to helping believers
                                understand Christ, mature in faith, and live out the realities of the Gospel with clarity and confidence. His teaching
                                ministry is marked by sound doctrine, practical insight, and a heart for raising believers who walk in purpose and
                                spiritual depth.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                                className="mx-auto my-8 max-w-5xl text-base leading-relaxed text-gray-300 md:text-xl"
                            >
                                A gifted musician, PB has released multiple contemporary Christian songs that inspire and encourage listeners around
                                the world through worship and sound biblical expression. Beyond ministry, he is a cybersecurity professional serving
                                Canada's financial, retail, and insurance industries, and he currently resides in Toronto, Canada, with his wife,
                                Ibiye, and their son.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* No Other God Video Section */}
            <section className="relative bg-[#010308] pt-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`relative z-10 mb-0 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${modernizFont.className} ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            No Other God
                        </motion.h2>

                        {/* Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className={`relative z-0 mx-auto -mt-6 max-w-5xl transition-all duration-200 ease-in-out md:-mt-8 lg:-mt-12 ${noOtherGodVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
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
                                    className={`h-full w-full transition-all duration-300 ${noOtherGodVideoLoaded ? 'opacity-100' : 'opacity-0'} ${noOtherGodVideoActive ? 'blur-0' : joyUnspeakableVideoActive || neverLostVideoActive ? 'blur-sm' : 'blur-0'}`}
                                    onLoad={() => setNoOtherGodVideoLoaded(true)}
                                    onFocus={() => setNoOtherGodVideoActive(true)}
                                    onBlur={() => setNoOtherGodVideoActive(false)}
                                ></iframe>
                            </div>
                        </motion.div>
                        {/* Album Cover - Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className="absolute right-32 -bottom-8 z-20 hidden aspect-square w-32 overflow-hidden rounded shadow-lg md:w-40 lg:block lg:w-48"
                        >
                            {/* Skeleton - shown until image loads */}
                            {!noOtherGodImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                ref={noOtherGodImageRef}
                                src="/images/music/NoOtherGod.jpg"
                                alt="No Other God Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    noOtherGodImageLoaded
                                        ? noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                            ? 'opacity-40 blur-xs'
                                            : 'blur-0 opacity-100'
                                        : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setNoOtherGodImageLoaded(true)}
                                onError={() => setNoOtherGodImageLoaded(true)}
                            />
                        </motion.div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu, Rhema Onuoha
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className={`mb-8 transition-all duration-200 ${noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'}`}
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
                            className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-200 ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            <a
                                href="https://open.spotify.com/track/6FCgNzCMwvYqEVwlyU3uYl?si=a50ed64ea8ea46aa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Spotify"
                            >
                                <SiSpotify className="h-6 w-6 text-green-400" />
                            </a>
                            <a
                                href="https://music.apple.com/us/song/no-other-god-feat-rhema-onuoha/1823930988"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Apple Music"
                            >
                                <FaApple className="h-6 w-6 text-white" />
                            </a>
                            <a
                                href="https://amazon.com/music/player/albums/B0FG7J681F?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_6dJgC1ZLuqn2jKSnYbUYlBQeN"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Amazon Music"
                            >
                                <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                            </a>
                            <a
                                href="https://link.deezer.com/s/31278uhdrGzCshgIS9jRN"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Deezer"
                            >
                                <FaDeezer className="h-6 w-6 text-blue-400" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Joy Unspeakable Video Section */}
            <section className="relative bg-[#010308] pt-20 lg:pt-40">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`relative z-10 mb-0 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${modernizFont.className} ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            Joy Unspeakable
                        </motion.h2>

                        {/* Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className={`relative z-0 mx-auto -mt-6 max-w-5xl transition-all duration-200 ease-in-out md:-mt-8 lg:-mt-12 ${joyUnspeakableVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
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
                                    className={`h-full w-full transition-all duration-300 ${joyUnspeakableVideoLoaded ? 'opacity-100' : 'opacity-0'} ${joyUnspeakableVideoActive ? 'blur-0' : noOtherGodVideoActive || neverLostVideoActive ? 'blur-sm' : 'blur-0'}`}
                                    onLoad={() => setJoyUnspeakableVideoLoaded(true)}
                                    onFocus={() => setJoyUnspeakableVideoActive(true)}
                                    onBlur={() => setJoyUnspeakableVideoActive(false)}
                                ></iframe>
                            </div>
                        </motion.div>
                        {/* Album Cover - Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className="absolute right-32 -bottom-8 z-20 hidden aspect-square w-32 overflow-hidden rounded shadow-lg md:w-40 lg:block lg:w-48"
                        >
                            {/* Skeleton - shown until image loads */}
                            {!joyUnspeakableImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                ref={joyUnspeakableImageRef}
                                src="/images/music/JoyUnspeakable.jpg"
                                alt="Joy Unspeakable Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    joyUnspeakableImageLoaded
                                        ? noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                            ? 'opacity-40 blur-xs'
                                            : 'blur-0 opacity-100'
                                        : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setJoyUnspeakableImageLoaded(true)}
                                onError={() => setJoyUnspeakableImageLoaded(true)}
                            />
                        </motion.div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu, Daniel Ike
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className={`mb-8 transition-all duration-200 ${noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'}`}
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
                            className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-200 ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            <a
                                href="https://open.spotify.com/track/0GbVNSPa8I6nPGxYKS5jsU?si=90f05dbd51c14034"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Spotify"
                            >
                                <SiSpotify className="h-6 w-6 text-green-400" />
                            </a>
                            <a
                                href="https://music.apple.com/us/song/joy-unspeakable-feat-daniel-ike/1802768269"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Apple Music"
                            >
                                <FaApple className="h-6 w-6 text-white" />
                            </a>
                            <a
                                href="https://amazon.com/music/player/tracks/B0F1QXX8NQ?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_GVHr0mQtDnmTFETZzKQ2n7CcZ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Amazon Music"
                            >
                                <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                            </a>
                            <a
                                href="https://link.deezer.com/s/3127DbiZuf95BQxH7nnlR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Deezer"
                            >
                                <FaDeezer className="h-6 w-6 text-blue-400" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Never Lost (Live) Video Section */}
            <section className="relative bg-[#010308] pt-20 lg:pt-40">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`relative z-10 mb-0 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${modernizFont.className} ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            Never Lost (Live)
                        </motion.h2>

                        {/* Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className={`relative z-0 mx-auto -mt-6 max-w-5xl transition-all duration-200 ease-in-out md:-mt-8 lg:-mt-12 ${neverLostVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
                            onMouseEnter={() => setNeverLostVideoActive(true)}
                            onMouseLeave={() => setNeverLostVideoActive(false)}
                        >
                            <div
                                className={`relative aspect-video w-full overflow-visible rounded-xs bg-gray-800 transition-all duration-200 ease-in-out ${neverLostVideoActive ? 'shadow-2xl shadow-black/50' : 'shadow-none'}`}
                            >
                                {/* Skeleton - shown until video loads */}
                                {!neverLostVideoLoaded && <div className="absolute inset-0 animate-pulse bg-gray-700"></div>}
                                {/* YouTube iframe */}
                                <iframe
                                    src="https://www.youtube.com/embed/4Se2Tt_FuVM"
                                    title="Never Lost (Live) - YouTube Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className={`h-full w-full transition-all duration-300 ${neverLostVideoLoaded ? 'opacity-100' : 'opacity-0'} ${neverLostVideoActive ? 'blur-0' : noOtherGodVideoActive || joyUnspeakableVideoActive ? 'blur-sm' : 'blur-0'}`}
                                    onLoad={() => setNeverLostVideoLoaded(true)}
                                    onFocus={() => setNeverLostVideoActive(true)}
                                    onBlur={() => setNeverLostVideoActive(false)}
                                ></iframe>
                            </div>
                        </motion.div>
                        {/* Album Cover - Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className="absolute right-32 -bottom-8 z-20 hidden aspect-square w-32 overflow-hidden rounded shadow-lg md:w-40 lg:block lg:w-48"
                        >
                            {/* Skeleton - shown until image loads */}
                            {!neverLostImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                ref={neverLostImageRef}
                                src="/images/music/NeverLost.jpg"
                                alt="Never Lost (Live) Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    neverLostImageLoaded
                                        ? noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                            ? 'opacity-40 blur-xs'
                                            : 'blur-0 opacity-100'
                                        : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setNeverLostImageLoaded(true)}
                                onError={() => setNeverLostImageLoaded(true)}
                            />
                        </motion.div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            className={`mb-8 transition-all duration-200 ${noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'}`}
                        >
                            <p className="mb-1 text-lg text-gray-300 md:text-xl">2023</p>
                            <p className="text-sm text-gray-500 md:text-base">{formatSongLength(436)}</p>
                        </motion.div>
                        {/* Streaming Service Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                            className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-200 ${
                                noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive
                                    ? 'opacity-40 blur-xs'
                                    : 'blur-0 opacity-100'
                            }`}
                        >
                            <a
                                href="https://open.spotify.com/track/7KIFgCFh0W3aaOe2KL6J2j?si=21d0e9c4d2604c47"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Spotify"
                            >
                                <SiSpotify className="h-6 w-6 text-green-400" />
                            </a>
                            <a
                                href="https://music.apple.com/us/song/never-lost-live/1687272944"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Apple Music"
                            >
                                <FaApple className="h-6 w-6 text-white" />
                            </a>
                            <a
                                href="https://amazon.com/music/player/tracks/B0C5PJYTS4?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_6Ib6NCtyloUQvclBxjqZRZ27G"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Amazon Music"
                            >
                                <SiAmazonmusic className="h-6 w-6 text-orange-400" />
                            </a>
                            <a
                                href="https://link.deezer.com/s/3127oFPuVWyzeTtPIwGXV"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center justify-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
                                title="Listen on Deezer"
                            >
                                <FaDeezer className="h-6 w-6 text-blue-400" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Discography Link Section */}
            <section className="relative bg-[#010308] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`mx-auto max-w-4xl text-center transition-all duration-200 ${
                            noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                        }`}
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
                            className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800"
                        >
                            <IoIosMusicalNotes className="h-5 w-5" />
                            View Discography
                        </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="relative bg-[#010308] pb-20 lg:pt-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`mx-auto max-w-2xl transition-all duration-200 ${
                            noOtherGodVideoActive || joyUnspeakableVideoActive || neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                        }`}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className={`mb-12 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}
                        >
                            Get In Touch
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                            className="flex justify-center"
                        >
                            <a
                                href="mailto:bright.egwuogu@gmail.com"
                                className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xs bg-blue-900 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800 md:px-12 md:py-6 md:text-xl"
                            >
                                <FaEnvelope className="h-5 w-5 md:h-6 md:w-6" />
                                bright.egwuogu@gmail.com
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
