import type { Metadata } from 'next';
import './globals.css';
import { latoFont, ubisoftSansFont, oswaldFont, karlaFont, lexendFont, alegreyaSansFont } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Bright Egwuogu - On a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.',
    description: 'Musician, pastor, husband, and father on a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.',
    other: { 'color-scheme': 'dark' }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubisoftSansFont.className}`} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
