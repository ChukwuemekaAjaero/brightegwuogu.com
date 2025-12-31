'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { modernizFont } from '@/lib/utils';
import { useMediaPreloader } from '@/hooks/useMediaPreloader';
import { criticalMediaAssets } from '@/lib/mediaAssets';
import SplashScreen from '@/components/lib/SplashScreen';

export default function RootPage() {
    const [hoveredSection, setHoveredSection] = useState<'ministry' | 'music' | null>(null);
    const { loading, progress } = useMediaPreloader(criticalMediaAssets);
    const [showMessage, setShowMessage] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [splashVisible, setSplashVisible] = useState(true);

    // Handle transitions: splash -> message -> content
    useEffect(() => {
        if (!loading && progress >= 100) {
            // Fade out splash screen after a brief delay
            const splashFadeOut = setTimeout(() => {
                setSplashVisible(false);
            }, 500);

            // Fade in message after splash fades out
            const messageFadeIn = setTimeout(() => {
                setShowMessage(true);
            }, 1000); // 500ms delay + 500ms transition

            // Fade out message and fade in content after 3 seconds
            const messageFadeOut = setTimeout(() => {
                setShowMessage(false);
            }, 4000); // 1000ms start + 3000ms display

            // Fade in content after message fades out
            const contentFadeIn = setTimeout(() => {
                setShowContent(true);
            }, 4500); // 4000ms + 500ms transition

            return () => {
                clearTimeout(splashFadeOut);
                clearTimeout(messageFadeIn);
                clearTimeout(messageFadeOut);
                clearTimeout(contentFadeIn);
            };
        }
    }, [loading, progress]);

    return (
        <>
            {/* Persistent black background for splash and message */}
            <div
                className={`fixed inset-0 z-50 bg-[#030712] transition-opacity duration-500 ease-in-out ${
                    showContent ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
            >
                {/* Splash screen content - fades out */}
                <div
                    className={`flex h-full items-center justify-center transition-opacity duration-500 ease-in-out ${
                        splashVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                >
                    <SplashScreen progress={progress} isVisible={true} />
                </div>
                {/* Message text - fades in */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                        showMessage ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                >
                    <p className={`text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>
                        Select a side of Bright
                    </p>
                </div>
            </div>
            <div
                className={`flex h-screen w-full flex-col overflow-hidden bg-[#030712] transition-opacity duration-500 ease-in-out ${
                    showContent ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="flex h-full w-full flex-col gap-4 p-4 md:flex-row">
                    {/* Left Section - Ministry */}
                    <Link
                        href="/ministry"
                        className={`durration-750 relative flex cursor-pointer flex-col items-center justify-center rounded-sm bg-[#142557] bg-cover bg-position-[50%_30%] bg-no-repeat transition-all ease-in-out ${
                            hoveredSection === 'ministry'
                                ? 'h-2/3 w-full md:h-full md:w-2/3'
                                : hoveredSection === 'music'
                                  ? 'h-1/3 w-full md:h-full md:w-1/3'
                                  : 'h-1/2 w-full md:h-full md:w-1/2'
                        }`}
                        style={{
                            backgroundImage: `url('/images/rootPage/MinistryBackgroundImage.jpg')`
                        }}
                        onMouseEnter={() => setHoveredSection('ministry')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        {/* Overlay for text readability */}
                        <div
                            className={`durration-750 absolute inset-0 rounded-sm transition-all ${
                                hoveredSection === 'music' ? 'bg-black/80' : 'bg-black/50'
                            }`}
                        ></div>
                        <div className="relative z-10">
                            <h1
                                className={`durration-750 mb-8 font-bold text-white transition-all ${modernizFont.className} ${
                                    hoveredSection === 'music'
                                        ? 'text-2xl md:text-3xl lg:text-4xl'
                                        : hoveredSection === 'ministry'
                                          ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                          : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                }`}
                            >
                                Ministry
                            </h1>
                        </div>
                    </Link>

                    {/* Right Section - Music */}
                    <Link
                        href="/music"
                        className={`durration-750 relative flex cursor-pointer flex-col items-center justify-center rounded-sm bg-red-900 bg-cover bg-position-[50%_30%] bg-no-repeat transition-all ease-in-out ${
                            hoveredSection === 'music'
                                ? 'h-2/3 w-full md:h-full md:w-2/3'
                                : hoveredSection === 'ministry'
                                  ? 'h-1/3 w-full md:h-full md:w-1/3'
                                  : 'h-1/2 w-full md:h-full md:w-1/2'
                        }`}
                        style={{
                            backgroundImage: `url('/images/rootPage/MusicBackgroundImage.jpg')`
                        }}
                        onMouseEnter={() => setHoveredSection('music')}
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        {/* Overlay for text readability */}
                        <div
                            className={`durration-750 absolute inset-0 rounded-sm transition-all ${
                                hoveredSection === 'ministry' ? 'bg-black/80' : 'bg-black/30'
                            }`}
                        ></div>
                        <div className="relative z-10">
                            <h1
                                className={`durration-750 mb-8 font-bold text-white transition-all ${modernizFont.className} ${
                                    hoveredSection === 'ministry'
                                        ? 'text-2xl md:text-3xl lg:text-4xl'
                                        : hoveredSection === 'music'
                                          ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                          : 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                                }`}
                            >
                                Music
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
