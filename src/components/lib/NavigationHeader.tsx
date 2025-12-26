'use client';

import { SiInstagram, SiSpotify, SiAmazonmusic } from 'react-icons/si';
import { FaYoutube, FaApple, FaDeezer } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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

export const NavigationHeader = () => {
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
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const logoRef = useRef<HTMLAnchorElement>(null);
    const [mounted, setMounted] = useState(false);

    // Determine logo href based on current route
    const getLogoHref = () => {
        if (pathname?.startsWith('/ministry/') && pathname !== '/ministry') {
            // On a ministry subpage, go to /ministry
            return '/ministry';
        } else if (pathname === '/ministry') {
            // On /ministry, go to root
            return '/';
        } else if (pathname?.startsWith('/music/') && pathname !== '/music') {
            // On a music subpage, go to /music
            return '/music';
        } else if (pathname === '/music') {
            // On /music, go to root
            return '/';
        }
        // Default to root
        return '/';
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isLogoHovered && logoRef.current) {
            const rect = logoRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 8,
                left: rect.left
            });
        }
    }, [isLogoHovered]);

    // Get navigation links based on current route
    const getDesktopNavLinks = () => {
        if (pathname?.startsWith('/music')) {
            return [{ title: 'Discography', href: '/music/discography' }];
        } else if (pathname?.startsWith('/ministry')) {
            return [
                { title: 'About', href: '/ministry/about' },
                { title: 'Sermons', href: '/ministry/sermons' }
            ];
        }
        // Default links for other routes
        return [
            { title: 'Music', href: '/music' },
            { title: 'Ministry', href: '/ministry' }
        ];
    };

    const navLinks = getDesktopNavLinks();

    const dropdownItems = [
        { title: 'Ministry', href: '/ministry' },
        { title: 'Music', href: '/music' }
    ];

    const dropdownContent = (
        <AnimatePresence>
            {isLogoHovered && mounted && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed z-[100] min-w-[180px] overflow-hidden rounded-sm border border-gray-700 bg-gray-800/20 shadow-lg backdrop-blur-sm"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`
                    }}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    {dropdownItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-3 text-white transition-colors hover:bg-gray-700/50 ${modernizFont.className}`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <nav className="sticky top-0 z-30 -mb-30 hidden w-full mask-b-from-50% backdrop-blur-md lg:block">
            <div className="container mx-auto flex h-30 w-full -translate-y-3 items-center justify-between px-4 sm:px-8">
                {/* Logo with Dropdown */}
                <div className="relative" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
                    <Link
                        ref={logoRef}
                        href={getLogoHref()}
                        className={`cursor-pointer text-2xl font-bold text-white no-underline transition-colors hover:text-gray-300 ${modernizFont.className}`}
                        className={`cursor-pointer text-2xl font-bold text-white no-underline transition-colors hover:text-gray-300 ${modernizFont.className}`}
                    >
                        Bright Egwuogu
                    </Link>
                </div>

                {/* Render dropdown via portal outside nav constraints */}
                {mounted && typeof window !== 'undefined' && createPortal(dropdownContent, document.body)}

                {/* Navigation Links - Center */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="cursor-pointer px-4 py-2 font-medium text-white">
                        <Link key={link.href} href={link.href} className="cursor-pointer px-4 py-2 font-medium text-white">
                            {link.title}
                        </Link>
                    ))}
                </div>

                {/* Social Media Links - Right */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.instagram.com/britegwu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-white transition-colors"
                    >
                        <AiFillInstagram size={24} />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-white transition-colors"
                        className="cursor-pointer text-white transition-colors"
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
    const pathname = usePathname();

    // Get navigation links based on current route
    const getMobileNavLinks = () => {
        if (pathname?.startsWith('/music')) {
            return [{ title: 'Discography', href: '/music/discography' }];
        } else if (pathname?.startsWith('/ministry')) {
            return [
                { title: 'About', href: '/ministry/about' },
                { title: 'Sermons', href: '/ministry/sermons' }
            ];
        }
        // Default links for other routes
        return LINKS;
    };

    const navLinks = getMobileNavLinks();

    return (
        <motion.div className="flex flex-1 flex-col items-center justify-center space-y-4 p-12">
            {navLinks.map((l, idx) => {
                return (
                    <NavLink key={l.href} href={l.href} idx={idx}>
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
            <div className="flex items-center justify-center gap-4">
                <Link
                    href={href}
                    className={`cursor-pointer text-2xl font-semibold transition-colors hover:text-[#030712] md:text-3xl ${modernizFont.className} ${
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
    const pathname = usePathname();
    const isMinistryRoute = pathname?.startsWith('/ministry');

    // Determine logo href based on current route
    const getLogoHref = () => {
        if (pathname?.startsWith('/ministry/') && pathname !== '/ministry') {
            // On a ministry subpage, go to /ministry
            return '/ministry';
        } else if (pathname === '/ministry') {
            // On /ministry, go to root
            return '/';
        } else if (pathname?.startsWith('/music/') && pathname !== '/music') {
            // On a music subpage, go to /music
            return '/music';
        } else if (pathname === '/music') {
            // On /music, go to root
            return '/';
        }
        // Default to root
        return '/';
    };

    return (
        <>
            {/* Background blur for closed state */}
            {!active && (
                <div className="fixed top-0 right-0 left-0 z-10 h-30 mask-b-from-50% backdrop-blur-md">
                    <Link
                        href={getLogoHref()}
                        className={`absolute top-6 left-8 z-50 cursor-pointer text-2xl font-bold text-white transition-colors ${modernizFont.className} ${
                        className={`absolute top-6 left-8 z-50 cursor-pointer text-2xl font-bold text-white transition-colors ${modernizFont.className} ${
                            isMinistryRoute ? 'hover:text-red-900' : 'hover:text-sky-700'
                        }`}
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
                className={`fixed z-20 rounded shadow-lg ${isMinistryRoute ? 'bg-red-900 shadow-red-800/20' : 'bg-blue-900 shadow-blue-800/20'}`}
            />

            <motion.button
                initial={false}
                animate={active ? 'open' : 'closed'}
                onClick={() => setActive((pv) => !pv)}
                className="group fixed top-4 right-4 z-50 h-12 w-12 cursor-pointer bg-white/0 transition-all hover:bg-white/20"
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
        <div className="flex justify-center p-6">
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
                            className="flex cursor-pointer items-center gap-3 text-white transition-colors hover:text-sky-700"
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
        href: '/home'
    },
    {
        title: 'music',
        href: '/music'
    },
    {
        title: 'ministry',
        href: '/ministry'
    },
    {
        title: 'career',
        href: '/career'
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
