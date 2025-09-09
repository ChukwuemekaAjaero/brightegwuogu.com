import { modernizFont } from '@/lib/utils';

export default function NavigationFooter() {
    return (
        <footer className="bg-black py-16 text-white">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
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
                                <a href="mailto:contact@brightegwuogu.com" className="transition-colors duration-200 hover:text-white">
                                    contact@brightegwuogu.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
                        <nav className="space-y-2">
                            <a href="#hero" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                Home
                            </a>
                            <a href="#about-me" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                About Me
                            </a>
                            <a href="#gallery" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                Gallery
                            </a>
                            <a href="#music" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                Music
                            </a>
                            <a href="#sermons" className="block text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                Sermons
                            </a>
                        </nav>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Follow</h3>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                                Twitter
                            </a>
                            <a href="#" className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                                Facebook
                            </a>
                            <a href="#" className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                                </svg>
                                Instagram
                            </a>
                            <a href="#" className="flex items-center text-sm text-gray-300 transition-colors duration-200 hover:text-white">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                YouTube
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Legal and Copyright */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="text-sm text-gray-400">© {new Date().getFullYear()} Bright Egwuogu. All rights reserved.</div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="transition-colors duration-200 hover:text-white">
                                Privacy Policy
                            </a>
                            <a href="#" className="transition-colors duration-200 hover:text-white">
                                Terms of Service
                            </a>
                            <a href="#" className="transition-colors duration-200 hover:text-white">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
