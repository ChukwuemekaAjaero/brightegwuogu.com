import type { Metadata } from 'next';
import './globals.css';
import { Example as CornerNav } from '@/components/lib/CornerNav';
import NavigationFooter from '@/components/lib/NavigationFooter';
import ConditionalCursor from '@/components/lib/ConditionalCursor';
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
                <ConditionalCursor />
                <div className="relative">
                    <CornerNav />
                    {children}
                    <NavigationFooter />
                </div>
            </body>
        </html>
    );
}
