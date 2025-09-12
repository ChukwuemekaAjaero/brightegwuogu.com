'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { modernizFont } from '@/lib/utils';

//TODO: Use Contentful to store these links
const youTubeLink = 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg';
const instagramLink = 'https://www.instagram.com/britegwu/';

export default function NavigationHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        console.log('Toggle clicked, current state:', isMobileMenuOpen);
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-30 -mb-20 w-full overflow-visible mask-b-from-50% backdrop-blur-md">
            <div className="container mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className={`${modernizFont.className} text-2xl font-bold text-white no-underline transition-colors hover:text-red-500`}
                >
                    <span className="lg:hidden">P.B.</span>
                    <span className="hidden lg:inline">Bright Egwuogu</span>
                </Link>

                {/* Navigation Links - Centered in viewport - Hidden on mobile */}
                <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
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

                {/* Social Media Links - Hidden on mobile */}
                <div className="hidden items-center gap-4 md:flex">
                    <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-red-500">
                        <AiFillInstagram size={24} />
                    </a>
                    <a href={youTubeLink} target="_blank" rel="noopener noreferrer" className="text-white transition-colors hover:text-red-500">
                        <FaYoutube size={24} />
                    </a>
                </div>

                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    className={`flex cursor-pointer flex-col gap-1 border-none bg-transparent p-2 md:hidden ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    type="button"
                >
                    <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                    <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span
                        className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-full right-0 left-0 z-[100] border-b border-white/20 bg-black/95 shadow-lg backdrop-blur-md md:hidden ${
                    isMobileMenuOpen ? 'block' : 'hidden'
                }`}
                style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
            >
                <div className="flex flex-col gap-2 p-4 sm:p-8">
                    <Link
                        href="/sermons"
                        className={`px-4 py-3 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                            pathname === '/sermons' ? 'bg-white/20 text-red-500' : 'text-white'
                        }`}
                        onClick={toggleMobileMenu}
                    >
                        Sermons
                    </Link>
                    <Link
                        href="/music"
                        className={`px-4 py-3 font-medium no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500 ${
                            pathname === '/music' ? 'bg-white/20 text-red-500' : 'text-white'
                        }`}
                        onClick={toggleMobileMenu}
                    >
                        Music
                    </Link>
                    <Link
                        href={instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500"
                        onClick={toggleMobileMenu}
                    >
                        Instagram
                    </Link>
                    <Link
                        href={youTubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-red-500"
                        onClick={toggleMobileMenu}
                    >
                        YouTube
                    </Link>
                </div>
            </div>
        </nav>
    );
}
