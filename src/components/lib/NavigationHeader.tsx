'use client';

import * as React from 'react';
import Link from 'next/link';
import styles from './NavigationHeader.module.css';
import { Instagram, Youtube } from 'lucide-react';

//TODO: Use Contentful to store these links
const youTubeLink = 'https://www.youtube.com/channel/UCH-O0drzAagoobTUuIT4vDg';
const instagramLink = 'https://www.instagram.com/britegwu/';

export default function NavigationHeader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={styles.navigationHeader}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    Bright Egwuogu
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <div className={styles.navLinks}>
                        <Link href="/sermons" className={styles.navLink}>
                            Sermons
                        </Link>
                        <Link href="/music" className={styles.navLink}>
                            Music
                        </Link>
                    </div>
                </div>

                <div className={styles.desktopNav}>
                    <div className={styles.socialLinks}>
                        <Link href={instagramLink} className={styles.navLink}>
                            <Instagram />
                        </Link>
                        <Link href={youTubeLink} className={styles.navLink}>
                            <YouTube />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
                <div className={styles.mobileNavLinks}>
                    <Link href="/sermons" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                        Sermons
                    </Link>
                    <Link href="/music" className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                        Music
                    </Link>
                    <Link href={instagramLink} className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                        Instagram
                    </Link>
                    <Link href={youTubeLink} className={styles.mobileNavLink} onClick={toggleMobileMenu}>
                        YouTube
                    </Link>
                </div>
            </div>
        </nav>
    );
}
