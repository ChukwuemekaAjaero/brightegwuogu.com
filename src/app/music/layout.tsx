import PageLayout from '@/components/lib/PageLayout';

export default function MusicLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}


