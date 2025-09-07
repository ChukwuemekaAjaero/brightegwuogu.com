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
