'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { HiMenu, HiX } from 'react-icons/hi';
import { modernizFont } from '@/lib/utils';

//TODO: Use Contentful to store these links
const youTubeLink = 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg';
const instagramLink = 'https://www.instagram.com/britegwu/';

export default function NavigationHeader() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-30 -mb-30 w-full overflow-visible mask-b-from-50% backdrop-blur-md">
            <div className="container mx-auto flex h-30 w-full -translate-y-3 items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className={`${modernizFont.className} text-2xl font-bold text-white no-underline transition-colors hover:text-red-500`}
                >
                    <span className="lg:hidden">P.B.</span>
                    <span className="hidden lg:inline">Bright Egwuogu</span>
                </Link>

                {/* Navigation Links - Desktop Only */}
                <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:flex md:gap-8">
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

                {/* Right Side - Social Media Links (Desktop) + Hamburger Menu (Mobile) */}
                <div className="flex items-center gap-4">
                    {/* Social Media Links - Desktop Only */}
                    <div className="hidden items-center gap-4 md:flex">
                        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-red-500">
                            <AiFillInstagram size={24} />
                        </a>
                        <a href={youTubeLink} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-red-500">
                            <FaYoutube size={24} />
                        </a>
                    </div>

                    {/* Hamburger Menu Button - Mobile Only */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white transition-colors hover:text-red-500 md:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col space-y-4">
                            {/* Navigation Links */}

                            <Link
                                href="/music"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`rounded-lg px-4 py-3 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                                    pathname === '/music' ? 'bg-white/10 text-red-500' : 'text-white'
                                }`}
                            >
                                Music
                            </Link>
                            <Link
                                href="/sermons"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`rounded-lg px-4 py-3 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                                    pathname === '/sermons' ? 'bg-white/10 text-red-500' : 'text-white'
                                }`}
                            >
                                Sermons
                            </Link>

                            {/* Social Media Links */}
                            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                                <span className="text-sm text-white/70">Follow us:</span>
                                <a
                                    href={instagramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white transition-colors hover:text-red-500"
                                >
                                    <AiFillInstagram size={24} />
                                </a>
                                <a
                                    href={youTubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white transition-colors hover:text-red-500"
                                >
                                    <FaYoutube size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
