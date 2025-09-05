import type { Metadata } from 'next';
import './globals.css';
import NavigationHeader from '@/components/lib/NavigationHeader';
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
            <body className={ubisoftSansFont.className}>
                <NavigationHeader />
                {children}
            </body>
        </html>
    );
}
