'use client';

import { modernizFont } from '@/lib/utils';
import { FaPlay } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap'
});

export default function Music() {
    const heroVideoRef = useRef<HTMLVideoElement>(null);
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

    return (
        <div className="relative">
            <section id="hero" className="relative bg-[#030712]">
                {/* Hero Section */}
                <div className="relative min-h-screen overflow-hidden rounded-lg mask-b-from-50%">
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

                                <a
                                    href="/music/discography"
                                    className="group inline-flex items-center justify-center rounded bg-[#030712]/80 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                                >
                                    <FaPlay className="mr-3 h-5 w-5" />
                                    View Discography
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bible Verse Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <div className="text-center">
                            <blockquote className={`mb-6 text-3xl text-white md:text-5xl lg:text-6xl ${playfairDisplay.className}`}>
                                "My heart is steadfast, O God, my heart is steadfast; I will sing and make music."
                            </blockquote>
                            <p className="mb-8 text-lg text-gray-400 md:text-xl">— Psalms 57:7</p>

                            {/* About Text */}
                            <p className="text-sm text-red-500 md:text-base">NOTE: Change the width on different screen sizes</p>
                            <p className="mx-auto my-8 max-w-5xl text-base leading-relaxed text-gray-300 md:text-xl">
                                Bright Egwuogu is the resident pastor of Celebration Church International’s Toronto campus, part of the global
                                ministry led by Apostle Emmanuel Iren. He is passionate about helping people grow spiritually and is also a
                                contemporary Christian musician whose songs have impacted listeners around the world. Based in Toronto, he combines
                                his pastoral and musical callings with a career in cybersecurity, and is married to his wife, Ibiye; they have a son.
                            </p>

                            {/* Read My Story Button */}
                            <Link
                                href="/music/about"
                                className="group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800"
                            >
                                Read My Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* No Other God Video Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <h2
                            className={`relative z-10 mb-0 text-5xl font-bold text-white transition-all duration-200 md:text-7xl lg:text-9xl ${modernizFont.className} ${
                                noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            No Other God
                        </h2>

                        {/* Video */}
                        <div
                            className={`max-w-9xl relative z-0 mx-auto -mt-6 transition-all duration-200 ease-in-out md:-mt-12 lg:-mt-24 ${noOtherGodVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
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
                                    className={`h-full w-full transition-opacity duration-300 ${noOtherGodVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setNoOtherGodVideoLoaded(true)}
                                    onFocus={() => setNoOtherGodVideoActive(true)}
                                    onBlur={() => setNoOtherGodVideoActive(false)}
                                ></iframe>
                            </div>
                        </div>
                        {/* Album Cover - Bottom Left */}
                        <div className="absolute -right-8 -bottom-8 z-20 hidden aspect-square w-40 overflow-hidden rounded shadow-lg md:w-60 lg:block lg:w-80">
                            {/* Skeleton - shown until image loads */}
                            {!noOtherGodImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                src="/images/music/NoOtherGod.jpg"
                                alt="No Other God Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    noOtherGodImageLoaded ? (noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100') : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setNoOtherGodImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <p
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu, Rhema Onuoha
                        </p>
                        <p
                            className={`mb-8 text-base text-gray-400 transition-all duration-200 md:text-lg ${
                                noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            2025
                        </p>
                        <p
                            className={`mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-300 transition-all duration-200 md:text-lg ${
                                noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            "Jesus, No Other God" is more than a song, it's a sound from a strange place. It's a declaration and a reminder that in a
                            world full of names and options, there is still only One true God and He's different from the rest.
                        </p>

                        {/* Learn More Button */}
                        <button
                            className={`group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-200 hover:scale-105 hover:bg-blue-800 ${
                                noOtherGodVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Joy Unspeakable Video Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <h2
                            className={`relative z-10 mb-0 text-3xl font-bold text-white transition-all duration-200 sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${modernizFont.className} ${
                                joyUnspeakableVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Joy Unspeakable
                        </h2>

                        {/* Video */}
                        <div
                            className={`max-w-9xl relative z-0 mx-auto -mt-6 transition-all duration-200 ease-in-out md:-mt-12 lg:-mt-16 ${joyUnspeakableVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
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
                                    className={`h-full w-full transition-opacity duration-300 ${joyUnspeakableVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setJoyUnspeakableVideoLoaded(true)}
                                    onFocus={() => setJoyUnspeakableVideoActive(true)}
                                    onBlur={() => setJoyUnspeakableVideoActive(false)}
                                ></iframe>
                            </div>
                        </div>
                        {/* Album Cover - Bottom Left */}
                        <div className="absolute -right-8 -bottom-8 z-20 hidden aspect-square w-40 overflow-hidden rounded shadow-lg md:w-60 lg:block lg:w-80">
                            {/* Skeleton - shown until image loads */}
                            {!joyUnspeakableImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                src="/images/music/JoyUnspeakable.jpg"
                                alt="Joy Unspeakable Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    joyUnspeakableImageLoaded
                                        ? joyUnspeakableVideoActive
                                            ? 'opacity-40 blur-xs'
                                            : 'blur-0 opacity-100'
                                        : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setJoyUnspeakableImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <p
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                joyUnspeakableVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu, Daniel Ike
                        </p>
                        <p
                            className={`mb-8 text-base text-gray-400 transition-all duration-200 md:text-lg ${
                                joyUnspeakableVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            2025
                        </p>
                        <p
                            className={`mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-300 transition-all duration-200 md:text-lg ${
                                joyUnspeakableVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex
                            sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis
                            tempus leo eu aenean.
                        </p>

                        {/* Learn More Button */}
                        <button
                            className={`group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-200 hover:scale-105 hover:bg-blue-800 ${
                                joyUnspeakableVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Never Lost (Live) Video Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="relative text-center">
                        <h2
                            className={`relative z-10 mb-0 text-5xl font-bold text-white transition-all duration-200 md:text-7xl lg:text-9xl ${modernizFont.className} ${
                                neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Never Lost (Live)
                        </h2>

                        {/* Video */}
                        <div
                            className={`max-w-9xl relative z-0 mx-auto -mt-6 transition-all duration-200 ease-in-out md:-mt-12 lg:-mt-24 ${neverLostVideoActive ? 'z-[100] scale-[1.01]' : 'scale-100'}`}
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
                                    className={`h-full w-full transition-opacity duration-300 ${neverLostVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setNeverLostVideoLoaded(true)}
                                    onFocus={() => setNeverLostVideoActive(true)}
                                    onBlur={() => setNeverLostVideoActive(false)}
                                ></iframe>
                            </div>
                        </div>
                        {/* Album Cover - Bottom Left */}
                        <div className="absolute -right-8 -bottom-8 z-20 hidden aspect-square w-40 overflow-hidden rounded shadow-lg md:w-60 lg:block lg:w-80">
                            {/* Skeleton - shown until image loads */}
                            {!neverLostImageLoaded && <div className="absolute inset-0 animate-pulse bg-gray-500"></div>}
                            {/* Image */}
                            <img
                                src="/images/music/NeverLost.jpg"
                                alt="Never Lost (Live) Album Cover"
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                    neverLostImageLoaded ? (neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100') : 'blur-0 opacity-0'
                                }`}
                                onLoad={() => setNeverLostImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Song Information */}
                    <div className="mt-12 text-center">
                        <p
                            className={`mb-2 text-lg text-white transition-all duration-200 md:text-xl ${
                                neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Brite Egwuogu
                        </p>
                        <p
                            className={`mb-8 text-base text-gray-400 transition-all duration-200 md:text-lg ${
                                neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            2023
                        </p>
                        <p
                            className={`mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-300 transition-all duration-200 md:text-lg ${
                                neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex
                            sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis
                            tempus leo eu aenean.
                        </p>

                        {/* Learn More Button */}
                        <button
                            className={`group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-200 hover:scale-105 hover:bg-blue-800 ${
                                neverLostVideoActive ? 'opacity-40 blur-xs' : 'blur-0 opacity-100'
                            }`}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="relative bg-[#030712] py-20">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="mx-auto max-w-2xl">
                        <h2 className={`mb-8 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>
                            Get In Touch
                        </h2>
                        <p className="mb-12 text-center text-lg text-gray-300 md:text-xl">
                            Have a question or want to connect? Send me a message and I'll get back to you as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xs border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xs border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="flex w-full min-w-0 rounded-xs border border-gray-700 bg-gray-900/50 px-3 py-2 text-base text-white shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    placeholder="Your message..."
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="rounded-xs border border-green-700 bg-green-900/30 px-4 py-3 text-green-300">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="rounded-xs border border-red-700 bg-red-900/30 px-4 py-3 text-red-300">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
