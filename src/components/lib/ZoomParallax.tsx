import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ZoomParallaxProps {
    src: string;
    alt?: string;
    targetRef?: React.RefObject<HTMLElement | null>;
}

export default function ZoomParallax({ src, alt = 'image', targetRef }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef || container,
        offset: ['start start', 'end end']
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

    return (
        <div ref={container} className="sticky top-0 z-4 h-screen overflow-hidden">
            <motion.div style={{ scale }} className="absolute top-0 flex h-full w-full items-center justify-center">
                <div className="relative h-[25vh] w-[50vw]">
                    <Image src={src} fill alt={alt} className="object-cover object-[75%_50%]" />
                </div>
            </motion.div>
        </div>
    );
}
