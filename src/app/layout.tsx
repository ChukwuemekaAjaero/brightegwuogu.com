import type { Metadata } from 'next';
import './globals.css';
import { Example as CornerNav } from '@/components/lib/CornerNav';
import NavigationFooter from '@/components/lib/NavigationFooter';
import { ubisoftSansFont } from '@/lib/utils';

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
                <div className="relative">
                    <CornerNav />
                    {children}
                    <NavigationFooter />
                </div>
            </body>
        </html>
    );
}
