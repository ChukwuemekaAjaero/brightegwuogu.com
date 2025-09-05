import { useState, useEffect } from 'react';
import { getSermons, Sermon } from '@/lib/contentful';

// Hook for fetching sermons
export function useSermons(limit: number = 10) {
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
    }, [limit]);

    return { sermons, loading, error };
}
