import PageLayout from '@/components/lib/PageLayout';

export default function CareerLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageLayout>{children}</PageLayout>;
}
