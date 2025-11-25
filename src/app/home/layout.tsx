import PageLayout from '@/components/lib/layout/PageLayout';

export default function HomeLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}


