'use client';

import { motion } from 'framer-motion';

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({ children, href }: { children: string; href: string }) => {
    return (
        <motion.a
            initial="initial"
            whileHover="hovered"
            href={href}
            className="relative block cursor-pointer overflow-hidden text-4xl font-black whitespace-nowrap uppercase sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
                lineHeight: 0.75
            }}
        >
            <div>
                {children.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: 0
                            },
                            hovered: {
                                y: '-100%'
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {children.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: '100%'
                            },
                            hovered: {
                                y: 0
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    );
};
