import { useState, useEffect } from 'react';
import { getSermons, getMusic, Sermon, Music } from '@/lib/contentful';

// Hook for fetching sermons
export function useSermons() {
    const [sermons, setSermons] = useState<Sermon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSermons = async () => {
            try {
                setLoading(true);
                setError(null);
                const sermonsData = await getSermons();
                setSermons(sermonsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch sermons');
                console.error('Error fetching sermons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSermons();
    }, []);

    return { sermons, loading, error };
}

// Hook for fetching music
export function useMusic() {
    const [music, setMusic] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                setLoading(true);
                setError(null);
                const musicData = await getMusic();
                setMusic(musicData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch music');
                console.error('Error fetching music:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMusic();
    }, []);

    return { music, loading, error };
}
