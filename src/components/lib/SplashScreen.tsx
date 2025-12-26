'use client';

import { modernizFont } from '@/lib/utils';

interface SplashScreenProps {
    progress: number;
    isVisible: boolean;
}

export default function SplashScreen({ progress, isVisible }: SplashScreenProps) {
    return (
        <div className="flex flex-col items-center gap-8">
            {/* Logo or Title */}
            <h1 className={`text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>Bright Egwuogu</h1>

            {/* Loading Bar */}
            <div className="w-64 overflow-hidden rounded-full bg-gray-800 md:w-80">
                <div className="h-2 bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
            </div>

            {/* Progress Text */}
            <p className="text-sm text-white/70 md:text-base">{Math.round(progress)}%</p>
        </div>
    );
}
