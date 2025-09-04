'use client';

import React from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';

export default function SermonsPage() {
    const { sermons, loading, error } = useSermons(6); // Fetch latest 6 sermons

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading sermons...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Content</h2>
                        <p className="text-red-600">{error}</p>
                        <p className="text-sm text-red-500 mt-2">Please check your Contentful configuration and try again.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Bright Egwuogu</h1>
                    <p className="text-xl mb-8 opacity-90">Inspiring sermons and uplifting music to strengthen your faith</p>
                    <div className="flex justify-center space-x-4">
                        <a href="/sermons" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Browse Sermons
                        </a>
                        <a
                            href="/music"
                            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Listen to Music
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Sermons Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Sermons</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Discover the latest messages of hope, faith, and inspiration</p>
                </div>

                {sermons.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sermons Available</h3>
                            <p className="text-gray-600">Check back soon for inspiring messages and teachings.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {sermons.map((sermon, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Thumbnail Image */}
                                {sermon.thumbnailImage?.fields?.file?.url && (
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                            alt={sermon.name}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index < 3} // Prioritize loading first 3 images
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{sermon.name}</h3>

                                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>
                                                <strong>Date:</strong> {new Date(sermon.sermonDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {sermon.youTubeLink && (
                                        <a
                                            href={sermon.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center w-full justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            Watch on YouTube
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {sermons.length > 0 && (
                    <div className="text-center mt-12">
                        <a
                            href="/sermons"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View All Sermons
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
