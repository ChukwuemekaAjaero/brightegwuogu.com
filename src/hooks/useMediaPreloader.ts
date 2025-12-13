import { useEffect, useState } from 'react';

interface MediaItem {
    src: string;
    type: 'image' | 'video';
}

/**
 * Hook to preload images and videos
 * Returns loading state and progress
 */
export function useMediaPreloader(mediaItems: MediaItem[]) {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        if (mediaItems.length === 0) {
            setLoading(false);
            return;
        }

        let completed = 0;
        const total = mediaItems.length;

        const loadMedia = (item: MediaItem): Promise<void> => {
            return new Promise((resolve, reject) => {
                if (item.type === 'image') {
                    const img = new Image();
                    img.onload = () => {
                        completed++;
                        setLoadedCount(completed);
                        setProgress((completed / total) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        // Continue even if image fails to load
                        completed++;
                        setLoadedCount(completed);
                        setProgress((completed / total) * 100);
                        resolve();
                    };
                    img.src = item.src;
                } else if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.preload = 'auto';
                    
                    const handleCanPlay = () => {
                        completed++;
                        setLoadedCount(completed);
                        setProgress((completed / total) * 100);
                        video.removeEventListener('canplay', handleCanPlay);
                        video.removeEventListener('error', handleError);
                        resolve();
                    };

                    const handleError = () => {
                        // Continue even if video fails to load
                        completed++;
                        setLoadedCount(completed);
                        setProgress((completed / total) * 100);
                        video.removeEventListener('canplay', handleCanPlay);
                        video.removeEventListener('error', handleError);
                        resolve();
                    };

                    video.addEventListener('canplay', handleCanPlay);
                    video.addEventListener('error', handleError);
                    video.src = item.src;
                    video.load();
                }
            });
        };

        // Load all media in parallel
        Promise.all(mediaItems.map(loadMedia)).then(() => {
            // Small delay to ensure everything is ready
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    }, [mediaItems]);

    return { loading, progress, loadedCount, total: mediaItems.length };
}

