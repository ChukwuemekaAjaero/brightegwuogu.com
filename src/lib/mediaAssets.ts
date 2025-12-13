/**
 * List of critical media assets to preload
 * These are the most important images and videos that users will see first
 */

export const criticalMediaAssets = [
    // Hero images
    { src: '/images/heroImage.jpg', type: 'image' as const },
    { src: '/images/aboutMeImage.jpg', type: 'image' as const },

    // Music section images
    { src: '/images/music/NoOtherGod.jpg', type: 'image' as const },
    { src: '/images/music/JoyUnspeakable.jpg', type: 'image' as const },
    { src: '/images/music/NeverLost.jpg', type: 'image' as const },
    { src: '/images/music/MusicAboutMe.jpg', type: 'image' as const },

    // Critical videos
    { src: '/videos/NoOtherGodHeroVideo.mp4', type: 'video' as const },
    { src: '/videos/SermonsHeroVideo.mp4', type: 'video' as const },
    { src: '/videos/ministry/MinistryAboutMe.mp4', type: 'video' as const },
    { src: '/images/music/ZealOfTheLordReel.mp4', type: 'video' as const },

    // Gallery images (first few critical ones)
    { src: '/images/homeGallery/galleryP1.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL1.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryP2.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL2.jpg', type: 'image' as const }
];

/**
 * All media assets (for comprehensive preloading)
 * Use this if you want to preload everything
 */
export const allMediaAssets = [
    ...criticalMediaAssets,
    // Additional gallery images
    { src: '/images/homeGallery/galleryP3.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryP4.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryP5.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryP6.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryP7.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL3.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL4.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL5.jpg', type: 'image' as const },
    { src: '/images/homeGallery/galleryL6.jpg', type: 'image' as const },
    // Additional videos
    { src: '/videos/InstagramReel1.mp4', type: 'video' as const },
    { src: '/videos/InstagramReel2.mp4', type: 'video' as const },
    { src: '/videos/InstagramReel3.mp4', type: 'video' as const }
];
