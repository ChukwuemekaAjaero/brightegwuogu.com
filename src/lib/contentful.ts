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
    sermonDescription: string;
    youTubeLink: string;
    thumbnailImage: Asset;
}

export interface Music {
    name: string;
    youTubeLink: string;
    musicThumbnail: Asset;
    releaseDate: string;
    hasMusicVideo: boolean;
    secondaryMusicThumbnail: Asset;
    artists: string[];
    primaryColor: string;
    secondaryColor: string;
    songLength?: number;
    albumName?: string;
    recordType?: string; // EP, Single, Album, etc.
}

const getClient = () => {
    return client;
};

// Fetch sermons
export async function getSermons(): Promise<Sermon[]> {
    try {
        const client = getClient();
        const response = await client.getEntries({
            content_type: 'sermons',
            include: 1,
            order: ['-fields.sermonDate'] // Order by release date, newest first
        });

        return response.items.map((item: Entry) => ({
            name: item.fields.name as string,
            sermonDate: item.fields.sermonDate as string,
            youTubeLink: item.fields.youTubeLink as string,
            thumbnailImage: item.fields.thumbnailImage as Asset,
            sermonDescription: item.fields.sermonDescription as string
        }));
    } catch (error) {
        console.error('Error fetching sermons:', error);
        return [];
    }
}

// Fetch music

// TODO: Add the link for the music link tree in the entries.
export async function getMusic(): Promise<Music[]> {
    try {
        const client = getClient();
        const response = await client.getEntries({
            content_type: 'music',
            include: 1,
            order: ['-fields.releaseDate'] // Order by release date, newest first
        });

        return response.items.map((item: Entry) => ({
            name: item.fields.name as string,
            youTubeLink: item.fields.youTubeLink as string,
            musicThumbnail: item.fields.musicThumbnail as Asset,
            secondaryMusicThumbnail: item.fields?.secondaryMusicThumbnail as Asset,
            releaseDate: item.fields.releaseDate as string,
            hasMusicVideo: item.fields.hasMusicVideo as boolean,
            artists: item.fields.artists as string[],
            primaryColor: item.fields.primaryColor as string,
            secondaryColor: item.fields.secondaryColor as string,
            songLength: item.fields?.songLength as number,
            albumName: item.fields?.albumName as string,
            recordType: item.fields?.recordType as string
        }));
    } catch (error) {
        console.error('Error fetching music:', error);
        return [];
    }
}

export default client;
