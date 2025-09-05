import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image */}
            <Image src="/images/OMV_8305.jpg" alt="Home Page Image" fill className="object-cover z-0" priority />

            {/* Text content */}
            <h1 className="text-4xl font-bold text-white relative z-20">Home</h1>
        </div>
    );
}
