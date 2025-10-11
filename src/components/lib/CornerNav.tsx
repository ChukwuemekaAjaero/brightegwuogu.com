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
                        className={`px-4 py-2 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                            pathname === '/music' ? 'text-red-500' : 'text-white'
                        }`}
                    >
                        Music
                    </Link>
                    <Link
                        href="/sermons"
                        className={`px-4 py-2 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                            pathname === '/sermons' ? 'text-red-500' : 'text-white'
                        }`}
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
            <Logo />
            <LinksContainer />
            <FooterCTAs />
        </nav>
    );
};

const LinksContainer = () => {
    return (
        <motion.div className="space-y-4 p-12 pl-4 md:pl-20">
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
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.75 + idx * 0.125,
                    duration: 0.5,
                    ease: 'easeInOut'
                }
            }}
            exit={{ opacity: 0, y: -8 }}
        >
            <Link
                href={href}
                className={`block text-5xl font-semibold text-red-400 transition-colors hover:text-red-50 md:text-7xl ${modernizFont.className}`}
            >
                {children}.
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
                transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut' }
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
                className="group fixed top-4 right-4 z-50 h-20 w-20 bg-white/0 transition-all hover:bg-white/20"
            >
                <motion.span
                    variants={HAMBURGER_VARIANTS.top}
                    className="absolute block h-1 w-10 bg-white"
                    style={{ y: '-50%', left: '50%', x: '-50%' }}
                />
                <motion.span
                    variants={HAMBURGER_VARIANTS.middle}
                    className="absolute block h-1 w-10 bg-white"
                    style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
                />
                <motion.span variants={HAMBURGER_VARIANTS.bottom} className="absolute block h-1 w-5 bg-white" style={{ x: '-50%', y: '50%' }} />
            </motion.button>
        </>
    );
};

const FooterCTAs = () => {
    return (
        <>
            <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
                {SOCIAL_CTAS.map((l, idx) => {
                    return (
                        <motion.a
                            key={idx}
                            href={l.href}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 1 + idx * 0.125,
                                    duration: 0.5,
                                    ease: 'easeInOut'
                                }
                            }}
                            exit={{ opacity: 0, y: -8 }}
                        >
                            <l.Component className="text-3xl text-white transition-colors hover:text-red-300" />
                        </motion.a>
                    );
                })}
            </div>

            <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 1.125,
                        duration: 0.5,
                        ease: 'easeInOut'
                    }
                }}
                exit={{ opacity: 0, y: 8 }}
                className={`absolute right-2 bottom-2 flex items-center gap-2 bg-red-700 px-3 py-3 text-4xl text-red-200 uppercase transition-colors hover:bg-white hover:text-red-600 md:right-4 md:bottom-4 md:px-6 md:text-2xl ${modernizFont.className}`}
            >
                <span className="hidden md:block">contact us</span> <FiArrowRight />
            </motion.button>
        </>
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
    },
    {
        title: 'about',
        href: '/about'
    }
];

const SOCIAL_CTAS: SocialCTA[] = [
    {
        Component: SiInstagram,
        href: 'https://www.instagram.com/britegwu/'
    },
    {
        Component: FaYoutube,
        href: 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg'
    },
    {
        Component: SiSpotify,
        href: 'https://open.spotify.com/artist/your-spotify-id'
    },
    {
        Component: FaApple,
        href: 'https://music.apple.com/us/artist/bright-egwuogu/your-apple-music-id'
    },
    {
        Component: FaDeezer,
        href: 'https://www.deezer.com/en/artist/159926162'
    },
    {
        Component: SiAmazonmusic,
        href: 'https://music.amazon.com/artists/your-amazon-music-id/bright-egwuogu'
    }
];

const UNDERLAY_VARIANTS: Variants = {
    open: {
        width: 'calc(100% - 32px)',
        height: 'calc(100vh - 32px)',
        transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 }
    },
    closed: {
        width: '80px',
        height: '80px',
        transition: {
            delay: 0.75,
            type: 'spring',
            mass: 3,
            stiffness: 400,
            damping: 50
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
            left: 'calc(50% + 10px)'
        }
    }
};
