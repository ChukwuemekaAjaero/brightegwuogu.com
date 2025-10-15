import { modernizFont } from '@/lib/utils';
import Link from 'next/link';
import { FaYoutube, FaSpotify, FaApple, FaDeezer } from 'react-icons/fa';
import { SiAmazonmusic } from 'react-icons/si';
import { AiFillInstagram } from 'react-icons/ai';

// Social media and music platform links
const youTubeLink = 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg';
const instagramLink = 'https://www.instagram.com/britegwu/';
const spotifyLink = 'https://open.spotify.com/artist/2YsaAFq1fn9w2aiBcvURmn';
const appleMusicLink = 'https://music.apple.com/us/artist/brite-egwuogu/1561427540';
const deezerLink = 'https://www.deezer.com/en/artist/159926162';
const amazonMusicLink = 'https://www.amazon.com/music/player/artists/B09RY3QB5K/brite-egwuogu';

export default function NavigationFooter() {
    return (
        <>
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

            <footer className="bg-[#030712] py-16 text-white">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <h2 className={`text-3xl font-bold ${modernizFont.className} mb-4`}>Bright Egwuogu</h2>
                            <p className="text-sm leading-relaxed text-gray-300">
                                Pastor, musician, and cybersecurity professional dedicated to advancing God&apos;s kingdom through faith, music, and
                                service.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Celebration Church International</p>
                                <p>Toronto Campus</p>
                                <p>Toronto, Canada</p>
                                <p className="mt-3">
                                    <a href="mailto:contact@brightegwuogu.com" className="transition-colors duration-200 hover:text-sky-700">
                                        contact@brightegwuogu.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
                            <nav className="space-y-2">
                                <Link href="/" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700">
                                    Home
                                </Link>
                                <Link href="/music" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700">
                                    Music
                                </Link>
                                <Link href="/sermons" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700">
                                    Sermons
                                </Link>
                            </nav>
                        </div>

                        {/* Follow Me Links */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Follow</h3>
                            <div className="space-y-3">
                                <a
                                    href={instagramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <AiFillInstagram className="mr-2 h-5 w-5" />
                                    Instagram
                                </a>
                                <a
                                    href={youTubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <FaYoutube className="mr-2 h-5 w-5" />
                                    YouTube
                                </a>
                                <a
                                    href={spotifyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <FaSpotify className="mr-2 h-5 w-5" />
                                    Spotify
                                </a>
                                <a
                                    href={appleMusicLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <FaApple className="mr-2 h-5 w-5" />
                                    Apple Music
                                </a>
                                <a
                                    href={deezerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <FaDeezer className="mr-2 h-5 w-5" />
                                    Deezer
                                </a>
                                <a
                                    href={amazonMusicLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-sky-700"
                                >
                                    <SiAmazonmusic className="mr-2 h-5 w-5" />
                                    Amazon Music
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Legal and Copyright */}
                    <div className="mt-12 border-t border-gray-800 pt-8">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <div className="text-sm text-gray-400">© {new Date().getFullYear()} Bright Egwuogu. All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
