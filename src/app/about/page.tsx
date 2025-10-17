import Image from 'next/image';

export default function AboutMePage() {
    return (
        <div className="min-h-screen bg-black px-4 py-16">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-16 text-center text-6xl font-bold text-white">About</h1>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="grid gap-4">
                        <div className="relative h-[35vh] w-full">
                            <Image src="/images/homeGallery/galleryP1.jpg" alt="Gallery Image 1" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[25vh] w-full">
                            <Image src="/images/homeGallery/galleryL2.jpg" alt="Gallery Image 2" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[40vh] w-full">
                            <Image src="/images/homeGallery/galleryP3.jpg" alt="Gallery Image 3" fill className="rounded object-cover" />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="relative h-[20vh] w-full">
                            <Image src="/images/homeGallery/galleryL4.jpg" alt="Gallery Image 4" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[35vh] w-full">
                            <Image src="/images/homeGallery/galleryP5.jpg" alt="Gallery Image 5" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[25vh] w-full">
                            <Image src="/images/homeGallery/galleryL6.jpg" alt="Gallery Image 6" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[20vh] w-full">
                            <Image src="/images/homeGallery/galleryP1.jpg" alt="Gallery Image 7" fill className="rounded object-cover" />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="relative h-[25vh] w-full">
                            <Image src="/images/homeGallery/galleryL1.jpg" alt="Gallery Image 7" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[40vh] w-full">
                            <Image src="/images/homeGallery/galleryP2.jpg" alt="Gallery Image 8" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[35vh] w-full">
                            <Image src="/images/homeGallery/galleryL3.jpg" alt="Gallery Image 9" fill className="rounded object-cover" />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="relative h-[45vh] w-full">
                            <Image src="/images/homeGallery/galleryP4.jpg" alt="Gallery Image 10" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[35vh] w-full">
                            <Image src="/images/homeGallery/galleryP6.jpg" alt="Gallery Image 12" fill className="rounded object-cover" />
                        </div>
                        <div className="relative h-[20vh] w-full">
                            <Image src="/images/homeGallery/galleryL5.jpg" alt="Gallery Image 11" fill className="rounded object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
