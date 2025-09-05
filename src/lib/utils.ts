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
