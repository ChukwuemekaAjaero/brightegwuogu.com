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
        <nav className="max-w-[1600px] mx-auto px-4 sm:px-8 bg-white border-b border-gray-200 relative">
            <div className="flex items-center w-full h-16">
                {/* Container 1: Logo */}
                <div className="flex-1 flex justify-start">
                    <Link
                        href="/"
                        className={`${modernizFont.className} text-2xl font-bold text-gray-800 no-underline hover:text-blue-600 transition-colors`}
                    >
                        Bright Egwuogu
                    </Link>
                </div>

                {/* Container 2: Navigation Links - Hidden on mobile */}
                <div className="flex-1 hidden md:flex justify-center">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/sermons"
                            className="text-gray-600 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        >
                            Sermons
                        </Link>
                        <Link
                            href="/music"
                            className="text-gray-600 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        >
                            Music
                        </Link>
                    </div>
                </div>

                {/* Container 3: Social Links - Hidden on mobile */}
                <div className="flex-1 hidden md:flex justify-end">
                    <div className="flex items-center gap-4">
                        <Link
                            href={instagramLink}
                            className="text-gray-600 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        >
                            <AiFillInstagram className="w-8 h-8" />
                        </Link>
                        <Link
                            href={youTubeLink}
                            className="text-gray-600 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        >
                            <FaYoutube className="w-8 h-8" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    className={`md:hidden bg-none border-none cursor-pointer p-2 flex flex-col gap-1 ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span
                        className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                    ></span>
                    <span className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span
                        className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 ${
                    isMobileMenuOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="flex flex-col p-4 sm:p-8 gap-2">
                    <Link
                        href="/sermons"
                        className="text-gray-600 no-underline font-medium px-4 py-3 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        onClick={toggleMobileMenu}
                    >
                        Sermons
                    </Link>
                    <Link
                        href="/music"
                        className="text-gray-600 no-underline font-medium px-4 py-3 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        onClick={toggleMobileMenu}
                    >
                        Music
                    </Link>
                    <Link
                        href={instagramLink}
                        className="text-gray-600 no-underline font-medium px-4 py-3 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        onClick={toggleMobileMenu}
                    >
                        Instagram
                    </Link>
                    <Link
                        href={youTubeLink}
                        className="text-gray-600 no-underline font-medium px-4 py-3 rounded-md transition-all duration-200 hover:text-blue-600 hover:bg-gray-100"
                        onClick={toggleMobileMenu}
                    >
                        YouTube
                    </Link>
                </div>
            </div>
        </nav>
    );
}
