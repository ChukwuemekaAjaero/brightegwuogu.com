'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { modernizFont } from '@/lib/utils';

export default function HomePage() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
    const imageCount = 5;

    return (
        <div>
            {/* HERO SECTION */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
                {/* Background Image */}
                <div className="absolute inset-0 mask-b-from-50%">
                    <Image
                        src="/images/heroImage.jpg"
                        alt="Home Page Image"
                        fill
                        className="z-0 animate-[zoom_20s_ease-in-out_infinite] object-cover object-[75%_50%]"
                        priority
                    />
                </div>

                {/* Text content */}
                <div className="flex h-full w-full max-w-[1600px] items-end justify-start px-4 sm:px-8">
                    <h1 className={`relative z-20 max-w-[500px] text-4xl font-bold text-white`}>
                        On a mission to know Christ deeply, make Him known, use my gifts to advance His kingdom.
                    </h1>
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about-me-section" className="flex min-h-screen justify-center bg-black transition-colors duration-300">
                <div className="h-max max-w-[1600px] px-4 sm:px-8">
                    <div className="flex h-max flex-col items-center gap-8 md:flex-row">
                        {/* Text Content */}

                        <div className="w-full md:w-[40%]">
                            <h1 className={`text-6xl font-bold text-white ${modernizFont.className} mb-8`}>About Me</h1>
                            <p className="text-white">
                                Bright Egwuogu serves as a pastor at Celebration Church International, a global apostolic ministry under the
                                leadership of Apostle Emmanuel Iren, committed to the vision of guiding all individuals to celebrate eternal life in
                                Christ Jesus. He currently fulfills the role of resident pastor at the Toronto campus, where he is dedicated to
                                fostering spiritual growth among believers.
                                <br />
                                <br />
                                Affectionately known as P.B., he is also an accomplished musician with a collection of contemporary Christian songs
                                that have positively impacted thousands worldwide.
                                <br />
                                <br />
                                Residing in Toronto, Canada, P.B. balances his pastoral and musical callings with a career as a cybersecurity
                                professional serving the financial, retail, and insurance sectors. He is married to his supportive wife, Ibiye, and
                                together they are blessed with a son.
                            </p>
                        </div>

                        {/* Image Content */}
                        <div
                            className="relative min-h-[100vh] w-full overflow-hidden md:w-[60%]"
                            onMouseEnter={() => {
                                const section = document.getElementById('about-me-section');
                                if (section) section.style.backgroundColor = '#271b1b';
                            }}
                            onMouseLeave={() => {
                                const section = document.getElementById('about-me-section');
                                if (section) section.style.backgroundColor = 'rgb(0, 0, 0)';
                            }}
                        >
                            <Image
                                src="/images/aboutMeImage.jpg"
                                alt="About Me Image"
                                fill
                                className="mask-t-from-70% mask-r-from-90% object-cover object-[75%_50%] opacity-80 transition-all duration-300 hover:scale-105 hover:opacity-100"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section ref={targetRef} className="relative h-[200vh] min-h-screen bg-black">
                <div className="sticky top-0 z-10 overflow-hidden">
                    <motion.div style={{ x }} className="flex w-max">
                        {Array.from({ length: imageCount }, (_, i) => `${i + 1}`).map((_, index) => (
                            <div
                                key={index}
                                className={`relative h-[100vh] w-[80vh] flex-shrink-0 ${index === imageCount - 1 ? 'mask-r-from-50%' : ''}`}
                            >
                                <Image
                                    src={`/images/homeGallery/heroImage${index + 1}.jpg`}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* MUSIC PREVIEW SECTION */}
                <div className="mx-auto max-w-[1600px] sm:px-8">
                    <section className="flex min-h-screen bg-black pt-20">
                        <div>
                            <h1 className={`text-6xl font-bold text-white ${modernizFont.className}`}>Music</h1>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}
