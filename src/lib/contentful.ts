import { createClient, Entry, Asset } from 'contentful';

// Contentful client configuration

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
    host: 'cdn.contentful.com'
});

// Types for your content models
export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    order: number;
}

export interface Sermon {
    name: string;
    sermonDate: string;
    youTubeLink: string;
    thumbnailImage: Asset;
}

const getClient = () => {
    return client;
};

// Fetch sermons
export async function getSermons(limit: number = 10): Promise<Sermon[]> {
    try {
        const client = getClient();
        const response = await client.getEntries({
            content_type: 'sermons',
            include: 1
        });

        return response.items.map((item: Entry<any>) => ({
            name: item.fields.name,
            sermonDate: item.fields.sermonDate,
            youTubeLink: item.fields.youTubeLink,
            thumbnailImage: item.fields.thumbnailImage
        }));
    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}

export default client;
