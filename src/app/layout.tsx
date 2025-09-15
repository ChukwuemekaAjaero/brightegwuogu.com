import type { Metadata } from 'next';
import './globals.css';
import NavigationHeader from '@/components/lib/NavigationHeader';
import NavigationFooter from '@/components/lib/NavigationFooter';
import { ubisoftSansFont } from '@/lib/utils';
import ConditionalCursor from '@/components/lib/ConditionalCursor';

export const metadata: Metadata = {
    title: 'Bright Egwuogu',
    description: 'Musician, pastor, husband, and father.',
    themeColor: '#000000',
    colorScheme: 'dark'
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
                    <ConditionalCursor />
                    <NavigationFooter />
                </div>
            </body>
        </html>
    );
}
