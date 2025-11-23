'use client';

import { modernizFont } from '@/lib/utils';

export default function CareerPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#030712]">
            <h1 className={`text-4xl font-bold text-white md:text-6xl ${modernizFont.className}`}>Coming Soon</h1>
        </div>
    );
}
