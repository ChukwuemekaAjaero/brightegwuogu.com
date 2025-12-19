'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { modernizFont } from '@/lib/utils';
import { FiArrowRight } from 'react-icons/fi';
import { useMediaPreloader } from '@/hooks/useMediaPreloader';
import { criticalMediaAssets } from '@/lib/mediaAssets';
import SplashScreen from '@/components/lib/SplashScreen';

export default function RootPage() {
    const [hoveredSection, setHoveredSection] = useState<'ministry' | 'music' | null>(null);
    const { loading, progress } = useMediaPreloader(criticalMediaAssets);

    return (
        <>
            <SplashScreen progress={progress} isVisible={loading} />
            <div className={`flex h-screen w-full flex-col overflow-hidden transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {/* Bottom Sections Container */}
                <div className="flex h-full w-full flex-col md:flex-row">
                    {/* Left Section - Ministry */}
                    <div
                        className={`flex flex-col items-center justify-center bg-[#142557] transition-all duration-300 ease-in-out ${
                            hoveredSection === 'ministry'
                                ? 'h-2/3 w-full md:h-full md:w-2/3'
                                : hoveredSection === 'music'
                                  ? 'h-1/3 w-full md:h-full md:w-1/3'
                                  : 'h-1/2 w-full md:h-full md:w-1/2'
                        }`}
                        onMouseEnter={() => setHoveredSection('ministry')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        <h1
                            className={`mb-8 font-bold text-white transition-all duration-300 ${modernizFont.className} ${
                                hoveredSection === 'music'
                                    ? 'text-2xl md:text-3xl lg:text-4xl'
                                    : hoveredSection === 'ministry'
                                      ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                      : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                            }`}
                        >
                            Ministry
                        </h1>
                        <Link
                            href="/ministry"
                            className={`group inline-flex items-center rounded bg-red-900 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:scale-105 hover:bg-red-800 ${
                                hoveredSection === 'music' ? 'px-4 py-2 text-sm' : 'px-8 py-4'
                            }`}
                        >
                            Explore
                            <FiArrowRight
                                className={`ml-2 transition-transform duration-300 group-hover:translate-x-2 ${
                                    hoveredSection === 'music' ? 'h-4 w-4' : 'h-5 w-5'
                                }`}
                            />
                        </Link>
                    </div>

                    {/* Right Section - Music */}
                    <div
                        className={`flex flex-col items-center justify-center bg-red-900 transition-all duration-300 ease-in-out ${
                            hoveredSection === 'music'
                                ? 'h-2/3 w-full md:h-full md:w-2/3'
                                : hoveredSection === 'ministry'
                                  ? 'h-1/3 w-full md:h-full md:w-1/3'
                                  : 'h-1/2 w-full md:h-full md:w-1/2'
                        }`}
                        onMouseEnter={() => setHoveredSection('music')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        <h1
                            className={`mb-8 font-bold text-white transition-all duration-300 ${modernizFont.className} ${
                                hoveredSection === 'ministry'
                                    ? 'text-2xl md:text-3xl lg:text-4xl'
                                    : hoveredSection === 'music'
                                      ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                      : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                            }`}
                        >
                            Music
                        </h1>
                        <Link
                            href="/music"
                            className={`group inline-flex items-center rounded bg-blue-900 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800 ${
                                hoveredSection === 'ministry' ? 'px-4 py-2 text-sm' : 'px-8 py-4'
                            }`}
                        >
                            Explore
                            <FiArrowRight
                                className={`ml-2 transition-transform duration-300 group-hover:translate-x-2 ${
                                    hoveredSection === 'ministry' ? 'h-4 w-4' : 'h-5 w-5'
                                }`}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
