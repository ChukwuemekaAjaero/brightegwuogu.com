'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { antonFont } from '@/lib/utils';
import { useMediaPreloader } from '@/hooks/useMediaPreloader';
import { criticalMediaAssets } from '@/lib/mediaAssets';
import SplashScreen from '@/components/lib/SplashScreen';
import { TypewriterText } from '@/components/lib/TypewriterText';

const MESSAGE_DURATION_MS = 3000;
const SPLASH_FADE_OUT_MS = 500;

export default function RootPage() {
    const [hoveredSection, setHoveredSection] = useState<'ministry' | 'music' | null>(null);
    const { loading, progress } = useMediaPreloader(criticalMediaAssets);

    const wasPreloaded = typeof window !== 'undefined' && localStorage.getItem('mediaPreloaded') === 'true';

    const [showMessage, setShowMessage] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [splashVisible, setSplashVisible] = useState(!wasPreloaded);
    const [splashMounted, setSplashMounted] = useState(!wasPreloaded);
    const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const preloaderDoneRef = useRef(false);

    // 1) Preloader finishes → hide splash (fade out) → unmount splash → show "Select a side of Bright" → after 3s show Ministry/Music
    useEffect(() => {
        if (loading || progress < 100 || preloaderDoneRef.current) return;
        preloaderDoneRef.current = true;
        localStorage.setItem('mediaPreloaded', 'true');

        // Step 1: Start preloader fade out
        setSplashVisible(false);

        // Step 2: After splash has fully faded, unmount it and show "Select a side of Bright" (no overlap)
        const showMsg = setTimeout(() => {
            setSplashMounted(false);
            setShowMessage(true);
            messageTimerRef.current = setTimeout(() => {
                messageTimerRef.current = null;
                setShowMessage(false);
                setShowContent(true);
            }, MESSAGE_DURATION_MS);
        }, SPLASH_FADE_OUT_MS);

        return () => {
            clearTimeout(showMsg);
            if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
        };
    }, [loading, progress]);

    return (
        <>
            {/* Persistent black background for splash and message */}
            <div
                className={`fixed inset-0 z-50 bg-[#010308] transition-opacity duration-500 ease-in-out ${
                    showContent ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
            >
                {/* Splash: mounted until fade completes, then unmounted so message can show without overlap */}
                {splashMounted && (
                    <div
                        className={`flex h-full items-center justify-center transition-opacity duration-500 ease-in-out ${
                            splashVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                        }`}
                    >
                        <SplashScreen progress={progress} isVisible={true} />
                    </div>
                )}
                {/* Message text - only shown after splash is unmounted */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                        showMessage ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                >
                    <p className={`text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${antonFont.className} uppercase`}>
                        Select a side of Bright
                    </p>
                </div>
            </div>
            <div
                className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#010308] transition-opacity duration-500 ease-in-out ${
                    showContent ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="relative z-10 flex h-full w-full flex-col gap-4 p-4 md:flex-row">
                    {/* Left Section - Ministry */}
                    <Link
                        href="/ministry"
                        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-sm bg-[#142557] bg-cover bg-position-[50%_30%] bg-no-repeat transition-all duration-[750ms] ease-in-out ${
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
                            className={`absolute inset-0 rounded-sm transition-all duration-[750ms] ${
                                hoveredSection === 'music' ? 'bg-black/80' : 'bg-black/50'
                            }`}
                        ></div>
                        <div className="relative z-10">
                            <TypewriterText
                                text="Ministry"
                                className={`mb-8 font-bold transition-all duration-[750ms] ${antonFont.className} text-5xl uppercase md:text-6xl lg:text-7xl xl:text-8xl ${
                                    hoveredSection === 'music' ? 'text-white/40' : 'text-white'
                                }`}
                            />
                        </div>
                    </Link>

                    {/* Right Section - Music */}
                    <Link
                        href="/music"
                        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-sm bg-red-900 bg-cover bg-position-[50%_30%] bg-no-repeat transition-all duration-[750ms] ease-in-out ${
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
                            className={`absolute inset-0 rounded-sm transition-all duration-[750ms] ${
                                hoveredSection === 'ministry' ? 'bg-black/80' : 'bg-black/30'
                            }`}
                        ></div>
                        <div className="relative z-10">
                            <TypewriterText
                                text="Music"
                                className={`mb-8 font-bold transition-all duration-[750ms] ${antonFont.className} text-5xl uppercase md:text-6xl lg:text-7xl xl:text-8xl ${
                                    hoveredSection === 'ministry' ? 'text-white/40' : 'text-white'
                                }`}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
