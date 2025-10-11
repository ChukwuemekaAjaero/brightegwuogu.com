'use client';

import { SiInstagram, SiSpotify, SiAmazonmusic } from 'react-icons/si';
import { FaYoutube, FaApple, FaDeezer } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { AiFillInstagram } from 'react-icons/ai';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modernizFont } from '@/lib/utils';

// Type definitions
interface Link {
    title: string;
    href: string;
}

interface SocialCTA {
    Component: React.ComponentType<{ className?: string }>;
    href: string;
    name: string;
}

interface NavLinkProps {
    children: React.ReactNode;
    href: string;
    idx: number;
}

interface HamburgerButtonProps {
    active: boolean;
    setActive: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const Example = () => {
    return (
        <>
            {/* Desktop Header - lg and above */}
            <DesktopHeader />
            {/* Mobile Corner Nav - below lg */}
            <div className="lg:hidden">
                <Nav />
            </div>
        </>
    );
};

const DesktopHeader = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-30 -mb-30 hidden w-full overflow-visible mask-b-from-50% backdrop-blur-md lg:block">
            <div className="container mx-auto flex h-30 w-full -translate-y-3 items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className={`text-2xl font-bold text-white no-underline transition-colors hover:text-red-500 ${modernizFont.className}`}
                >
                    Bright Egwuogu
                </Link>

                {/* Navigation Links - Center */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    <Link
                        href="/music"
                        className={`px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500`}
                    >
                        Music
                    </Link>
                    <Link
                        href="/sermons"
                        className={`px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500`}
                    >
                        Sermons
                    </Link>
                </div>

                {/* Social Media Links - Right */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.instagram.com/britegwu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-colors hover:text-red-500"
                    >
                        <AiFillInstagram size={24} />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-colors hover:text-red-500"
                    >
                        <FaYoutube size={24} />
                    </a>
                </div>
            </div>
        </nav>
    );
};

const Nav = () => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();

    // Close the menu when the route changes
    useEffect(() => {
        setActive(false);
    }, [pathname]);

    // Disable scrollbar when menu is open
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scrollbar when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [active]);

    return (
        <>
            <HamburgerButton active={active} setActive={setActive} />
            <AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
        </>
    );
};

const LinksOverlay = () => {
    return (
        <nav className="fixed top-4 right-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
            <div className="flex h-full flex-col justify-between">
                <LinksContainer />
                <FooterCTAs />
            </div>
        </nav>
    );
};

const LinksContainer = () => {
    return (
        <motion.div className="flex flex-1 flex-col justify-center space-y-4 p-12 pl-4 md:pl-20">
            {LINKS.map((l, idx) => {
                return (
                    <NavLink key={l.title} href={l.href} idx={idx}>
                        {l.title}
                    </NavLink>
                );
            })}
        </motion.div>
    );
};

const NavLink: React.FC<NavLinkProps> = ({ children, href, idx }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.75 + idx * 0.125,
                    duration: 0.3,
                    ease: 'easeInOut'
                }
            }}
            exit={{ opacity: 0, y: -8 }}
        >
            <Link
                href={href}
                className={`block text-5xl font-semibold transition-colors hover:text-black md:text-7xl ${modernizFont.className} ${
                    isActive ? 'text-black' : 'text-white'
                }`}
            >
                {children}
            </Link>
        </motion.div>
    );
};

const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 0.3, ease: 'easeInOut' }
            }}
            exit={{ opacity: 0, y: -12 }}
        >
            <Link href="/" className="grid h-20 w-20 place-content-center bg-white transition-colors hover:bg-red-50">
                <svg width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-red-600">
                    <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" stopColor="#FFFFFF"></path>
                    <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" stopColor="#FFFFFF"></path>
                </svg>
            </Link>
        </motion.div>
    );
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ active, setActive }) => {
    return (
        <>
            <motion.div
                initial={false}
                animate={active ? 'open' : 'closed'}
                variants={UNDERLAY_VARIANTS}
                style={{ top: 16, right: 16 }}
                className="fixed z-10 bg-gradient-to-br from-red-600 to-red-500 shadow-lg shadow-red-800/20"
            />

            <motion.button
                initial={false}
                animate={active ? 'open' : 'closed'}
                onClick={() => setActive((pv) => !pv)}
                className="group fixed top-4 right-4 z-50 h-12 w-12 bg-white/0 transition-all hover:bg-white/20"
            >
                <motion.span
                    variants={HAMBURGER_VARIANTS.top}
                    className="absolute block h-1 w-6 bg-white"
                    style={{ y: '-50%', left: '50%', x: '-50%' }}
                />
                <motion.span
                    variants={HAMBURGER_VARIANTS.middle}
                    className="absolute block h-1 w-6 bg-white"
                    style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
                />
                <motion.span variants={HAMBURGER_VARIANTS.bottom} className="absolute block h-1 w-6 bg-white" style={{ x: '-50%', y: '50%' }} />
            </motion.button>
        </>
    );
};

const FooterCTAs = () => {
    return (
        <div className="flex justify-start p-6 pl-4 md:pl-20">
            <div className="flex flex-col gap-4">
                {SOCIAL_CTAS.map((l, idx) => {
                    return (
                        <motion.a
                            key={idx}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 1 + idx * 0.125,
                                    duration: 0.3,
                                    ease: 'easeInOut'
                                }
                            }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-3 text-white transition-colors hover:text-red-300"
                        >
                            <l.Component className="text-3xl" />
                            <span className={`text-lg ${modernizFont.className}`}>{l.name}</span>
                        </motion.a>
                    );
                })}
            </div>
        </div>
    );
};

const LINKS: Link[] = [
    {
        title: 'home',
        href: '/'
    },
    {
        title: 'music',
        href: '/music'
    },
    {
        title: 'sermons',
        href: '/sermons'
    }
];

const SOCIAL_CTAS: SocialCTA[] = [
    {
        Component: SiInstagram,
        href: 'https://www.instagram.com/britegwu/',
        name: 'Instagram'
    },
    {
        Component: FaYoutube,
        href: 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg',
        name: 'YouTube'
    },
    {
        Component: SiSpotify,
        href: 'https://open.spotify.com/artist/2YsaAFq1fn9w2aiBcvURmn',
        name: 'Spotify'
    },
    {
        Component: FaApple,
        href: 'https://music.apple.com/us/artist/brite-egwuogu/1561427540',
        name: 'Apple Music'
    },
    {
        Component: FaDeezer,
        href: 'https://www.deezer.com/en/artist/159926162',
        name: 'Deezer'
    },
    {
        Component: SiAmazonmusic,
        href: 'https://www.amazon.com/music/player/artists/B09RY3QB5K/brite-egwuogu',
        name: 'Amazon Music'
    }
];

const UNDERLAY_VARIANTS: Variants = {
    open: {
        width: 'calc(100% - 32px)',
        height: 'calc(100vh - 32px)',
        transition: { type: 'spring', mass: 2, stiffness: 500, damping: 40 }
    },
    closed: {
        width: '50px',
        height: '50px',
        transition: {
            delay: 0.5,
            type: 'spring',
            mass: 2,
            stiffness: 500,
            damping: 40
        }
    }
};

const HAMBURGER_VARIANTS: {
    top: Variants;
    middle: Variants;
    bottom: Variants;
} = {
    top: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            top: ['35%', '50%', '50%']
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            top: ['50%', '50%', '35%']
        }
    },
    middle: {
        open: {
            rotate: ['0deg', '0deg', '-45deg']
        },
        closed: {
            rotate: ['-45deg', '0deg', '0deg']
        }
    },
    bottom: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            bottom: ['35%', '50%', '50%'],
            left: '50%'
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            bottom: ['50%', '50%', '35%'],
            left: '50%'
        }
    }
};
