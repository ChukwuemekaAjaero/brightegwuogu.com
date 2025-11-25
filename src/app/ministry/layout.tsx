import PageLayout from '@/components/lib/layout/PageLayout';

export default function MinistryLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}


