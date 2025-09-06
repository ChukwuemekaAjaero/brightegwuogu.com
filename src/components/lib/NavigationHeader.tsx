'use client';

import * as React from 'react';
import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { modernizFont } from '@/lib/utils';

//TODO: Use Contentful to store these links
const youTubeLink = 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg';
const instagramLink = 'https://www.instagram.com/britegwu/';

export default function NavigationHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-30 mx-auto -mb-20 max-w-[1600px] bg-transparent px-4 sm:px-8">
            <div className="flex h-20 w-full items-center">
                {/* Container 1: Logo */}
                <div className="flex flex-1 justify-start">
                    <Link
                        href="/"
                        className={`${modernizFont.className} text-2xl font-bold text-white no-underline transition-colors hover:text-blue-300`}
                    >
                        Bright Egwuogu
                    </Link>
                </div>

                {/* Container 2: Navigation Links - Hidden on mobile */}
                <div className="hidden flex-1 justify-center md:flex">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/music"
                            className="rounded-md px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        >
                            Music
                        </Link>
                        <Link
                            href="/sermons"
                            className="rounded-md px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        >
                            Sermons
                        </Link>
                    </div>
                </div>

                {/* Container 3: Social Links - Hidden on mobile */}
                <div className="hidden flex-1 justify-end md:flex">
                    <div className="flex items-center gap-4">
                        <Link
                            href={instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        >
                            <AiFillInstagram className="h-8 w-8" />
                        </Link>
                        <Link
                            href={youTubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md px-4 py-2 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        >
                            <FaYoutube className="h-8 w-8" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    className={`flex cursor-pointer flex-col gap-1 border-none bg-none p-2 md:hidden ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
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
                className={`absolute top-full right-0 left-0 z-50 border-b border-white/20 bg-black/80 shadow-lg backdrop-blur-sm md:hidden ${
                    isMobileMenuOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="flex flex-col gap-2 p-4 sm:p-8">
                    <Link
                        href="/sermons"
                        className="rounded-md px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        onClick={toggleMobileMenu}
                    >
                        Sermons
                    </Link>
                    <Link
                        href="/music"
                        className="rounded-md px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        onClick={toggleMobileMenu}
                    >
                        Music
                    </Link>
                    <Link
                        href={instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        onClick={toggleMobileMenu}
                    >
                        Instagram
                    </Link>
                    <Link
                        href={youTubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-4 py-3 font-medium text-white no-underline transition-all duration-200 hover:bg-white/20 hover:text-blue-300"
                        onClick={toggleMobileMenu}
                    >
                        YouTube
                    </Link>
                </div>
            </div>
        </nav>
    );
}
