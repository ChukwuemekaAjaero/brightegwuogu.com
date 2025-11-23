import { ReactNode } from 'react';
import { Example as CornerNav } from '@/components/lib/CornerNav';
import NavigationFooter from '@/components/lib/NavigationFooter';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="relative">
            <CornerNav />
            {children}
            <NavigationFooter />
        </div>
    );
}


