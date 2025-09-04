import { NextResponse } from 'next/server';

export async function GET() {
    // Server-side environment variables test
    const envVars = {
        NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'NOT_FOUND',
        NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? 'FOUND (hidden)' : 'NOT_FOUND',
        CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ? 'FOUND (hidden)' : 'NOT_FOUND',
        NODE_ENV: process.env.NODE_ENV
    };

    return NextResponse.json({
        message: 'Server-side environment variables',
        variables: envVars,
        timestamp: new Date().toISOString()
    });
}
