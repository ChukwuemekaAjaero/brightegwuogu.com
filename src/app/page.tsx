import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            {/* Background Image */}
            <Image src="/images/OMV_8305.jpg" alt="Home Page Image" fill className="z-0 object-cover" priority />

            {/* Text content */}
            <h1 className="relative z-20 text-4xl font-bold text-white">Home</h1>
        </div>
    );
}
