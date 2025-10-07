import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export const ParallaxVideo = ({ className, src, start, end }: { className?: string; src: string; start: number; end: number }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}vh end`, `end ${end * -1}vh`]
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [`${start}vh`, `${end}vh`]);
    const transform = useMotionTemplate`translateY(${y}) scale(${scale})`;

    return (
        <motion.div ref={ref} className={className} style={{ transform, opacity }}>
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </motion.div>
    );
};
