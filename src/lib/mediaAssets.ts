/**
 * List of critical media assets to preload
 * These are the most important images and videos that users will see first
 */

export const criticalMediaAssets = [
    // Root page background images
    { src: '/images/rootPage/MinistryBackgroundImage.jpg', type: 'image' as const },
    { src: '/images/rootPage/MusicBackgroundImage.jpg', type: 'image' as const },

    // Critical videos
    { src: '/videos/SermonsHeroVideo.mp4', type: 'video' as const },
    { src: '/videos/NoOtherGodHeroVideo.mp4', type: 'video' as const }
];
