import type { Metadata } from 'next';
import './globals.css';
import NavigationHeader from '@/components/lib/NavigationHeader';
import NavigationFooter from '@/components/lib/NavigationFooter';
import { ubisoftSansFont } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Bright Egwuogu',
    description: 'Musician, pastor, husband, and father.',
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
                    <NavigationHeader />
                    {children}
                    <NavigationFooter />
                </div>
            </body>
        </html>
    );
}
