'use client';

import { modernizFont } from '@/lib/utils';

export default function Music() {
    return (
        <div>
            <section className="relative bg-black">
                {/* Hero Section */}
                <div className="relative min-h-screen overflow-hidden">
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

            <section className="relative min-h-screen overflow-hidden bg-black">
                <div className="container mx-auto px-4 sm:px-8"></div>
            </section>
        </div>
    );
}
