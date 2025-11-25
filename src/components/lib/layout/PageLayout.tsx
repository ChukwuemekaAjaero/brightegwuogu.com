import { ReactNode } from 'react';
import { NavigationHeader } from '@/components/lib/NavigationHeader';
import NavigationFooter from '@/components/lib/NavigationFooter';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="relative">
            <NavigationHeader />
            {children}
            <NavigationFooter />
        </div>
    );
}
