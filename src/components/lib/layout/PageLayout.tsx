import { ReactNode } from 'react';
import { NavigationHeader } from '@/components/lib/NavigationHeader';
import NavigationFooter from '@/components/lib/NavigationFooter';
import { SpotlightBackground } from '@/components/lib/SpotlightBackground';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="relative min-h-screen bg-[#010308]">
            {/* Scrolling texture layer – scrolls with the page */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/InkPaintTexture.jpg')" }}
                aria-hidden
            />
            {/* Transparent #010308 overlay on texture only (not on the spotlight) */}
            <div
                className="pointer-events-none absolute inset-0 z-0 bg-[#010308]/70"
                aria-hidden
            />
            <SpotlightBackground
                className="bg-transparent"
                colors={['rgba(34, 90, 255, 0.5)', 'rgba(255, 100, 20, 0.28)']}
                size={600}
                blur={80}
                smoothing={0.1}
                ambient
                opacity={1}
            />
            <div className="relative z-10">
                <NavigationHeader />
                {children}
                <NavigationFooter />
            </div>
        </div>
    );
}
