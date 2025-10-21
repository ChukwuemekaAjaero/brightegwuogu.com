'use client';

import { SiInstagram, SiSpotify, SiAmazonmusic } from 'react-icons/si';
import { FaYoutube, FaApple, FaDeezer } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { AiFillInstagram } from 'react-icons/ai';
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
                <Link href="/" className={`text-2xl font-bold text-white no-underline transition-colors ${modernizFont.className}`}>
                    Bright Egwuogu
                </Link>

                {/* Navigation Links - Center */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    <Link
                        href="/music"
                        className={`px-4 py-2 font-medium transition-all duration-200 ${pathname === '/music' ? 'text-black' : 'text-white'}`}
                    >
                        Music
                    </Link>
                    <Link
                        href="/sermons"
                        className={`px-4 py-2 font-medium transition-all duration-200 ${pathname === '/sermons' ? 'text-black' : 'text-white'}`}
                    >
                        Sermons
                    </Link>
                </div>

                {/* Social Media Links - Right */}
                <div className="flex items-center gap-4">
                    <a href="https://www.instagram.com/britegwu/" target="_blank" rel="noopener noreferrer" className="text-white transition-colors">
                        <AiFillInstagram size={24} />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-colors"
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
        <>
            {/* Backdrop blur for content underneath */}
            <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="fixed inset-0 z-5 bg-black/20"
            />

            <nav className="fixed top-4 right-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
                <div className="flex h-full flex-col justify-between">
                    <LinksContainer />
                    <FooterCTAs />
                </div>
            </nav>
        </>
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
            <div className="flex items-center gap-4">
                <Link
                    href={href}
                    className={`xs:text-5xl text-4xl font-semibold transition-colors hover:text-[#030712] md:text-7xl ${modernizFont.className} ${
                        isActive ? 'text-[#030712]' : 'text-white'
                    }`}
                >
                    {children}
                </Link>
                {isActive && (
                    <motion.div
                        className="h-3 w-3 rounded-full bg-[#030712]"
                        animate={{
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                )}
            </div>
        </motion.div>
    );
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ active, setActive }) => {
    return (
        <>
            {/* Background blur for closed state */}
            {!active && (
                <div className="fixed top-0 right-0 left-0 z-10 h-30 mask-b-from-50% backdrop-blur-md">
                    <Link
                        href="/"
                        className={`absolute top-6 left-8 z-50 text-2xl font-bold text-white transition-colors hover:text-sky-700 ${modernizFont.className}`}
                    >
                        P.B.
                    </Link>
                </div>
            )}

            <motion.div
                initial={false}
                animate={active ? 'open' : 'closed'}
                variants={UNDERLAY_VARIANTS}
                style={{ top: 16, right: 16 }}
                className="fixed z-20 rounded bg-gradient-to-br from-blue-900 to-teal-600 shadow-lg shadow-blue-800/20"
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
                            className="flex items-center gap-3 text-white transition-colors hover:text-sky-700"
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
