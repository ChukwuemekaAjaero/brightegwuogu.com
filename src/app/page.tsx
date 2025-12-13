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
                {/* Top Section - Select a side */}
                <div className="flex h-[15vh] w-full items-center justify-center">
                    <h2 className={`text-2xl font-bold md:text-3xl lg:text-4xl ${modernizFont.className}`}>Select a side of Bright</h2>
                </div>

                {/* Bottom Sections Container */}
                <div className="flex h-[85vh] w-full gap-4 px-4 pb-4">
                    {/* Left Section - Ministry */}
                    <div
                        className={`flex h-full flex-col items-center justify-center rounded-xl bg-[#142557] transition-all duration-300 ease-in-out ${
                            hoveredSection === 'ministry' ? 'w-2/3' : hoveredSection === 'music' ? 'w-1/3' : 'w-1/2'
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
                        className={`flex h-full flex-col items-center justify-center rounded-xl bg-red-900 transition-all duration-300 ease-in-out ${
                            hoveredSection === 'music' ? 'w-2/3' : hoveredSection === 'ministry' ? 'w-1/3' : 'w-1/2'
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
