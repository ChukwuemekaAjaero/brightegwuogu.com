import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import localFont from 'next/font/local';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const modernizFont = localFont({
    src: '../../public/fonts/Moderniz.otf',
    variable: '--font-moderniz',
    display: 'swap'
});

export const ubisoftSansFont = localFont({
    src: '../../public/fonts/UbisoftSansRegular.otf',
    variable: '--font-ubisoft-sans',
    display: 'swap'
});

// Format seconds to readable time format
export const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
        return `${seconds} sec`;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = '';

    if (hours > 0) {
        result += `${hours} hrs `;
    }

    if (minutes > 0) {
        result += `${minutes} min `;
    }

    if (remainingSeconds > 0) {
        result += `${remainingSeconds} sec`;
    }

    return result.trim();
};

// Convert YouTube URL to iframe embed source
export function youtubeToIframeSrc(url: string | null | undefined): string | null {
    // Handle falsey values
    if (!url) return null;

    // Extract video ID from various YouTube URL formats
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    const videoId = match[1];

    // Extract "t" start time (in seconds or format like 1m30s)
    const tMatch = url.match(/[?&]t=([\dhms]+)/);
    let start = 0;
    if (tMatch) {
        const tStr = tMatch[1];
        // Convert tStr to seconds (supports #t=Xs, #t=YmXs)
        const regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
        const [, h, m, s] = tStr.match(regex) || [];
        start = parseInt(h || '0') * 3600 + parseInt(m || '0') * 60 + (parseInt(s || tStr) || 0);
    }

    // Compose the embed URL with all required parameters
    const params = new URLSearchParams({
        autoplay: '1',
        mute: '1',
        loop: '1',
        playlist: videoId,
        controls: '0',
        showinfo: '0',
        rel: '0',
        modestbranding: '1',
        iv_load_policy: '3',
        fs: '0',
        disablekb: '1'
    });

    if (start > 0) {
        params.set('start', start.toString());
        params.set('end', (start + 30).toString()); // 30 seconds duration
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
