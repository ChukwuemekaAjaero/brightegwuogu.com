import type { Metadata, Viewport } from 'next';
import './globals.css';
import NavigationHeader from '@/components/lib/NavigationHeader';
import NavigationFooter from '@/components/lib/NavigationFooter';
import { ubisoftSansFont } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Bright Egwuogu',
    description: 'Musician, pastor, husband, and father.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubisoftSansFont.className}`}>
                <div className="relative">
                    <NavigationHeader />
                    {children}
                    <NavigationFooter />
                </div>
            </body>
        </html>
    );
}
