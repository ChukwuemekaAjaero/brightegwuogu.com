import PageLayout from '@/components/lib/layout/PageLayout';

export default function CareerLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}
