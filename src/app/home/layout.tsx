import PageLayout from '@/components/lib/PageLayout';

export default function HomeLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}


