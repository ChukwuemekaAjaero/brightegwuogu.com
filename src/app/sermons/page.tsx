'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';
import { FaYoutube } from 'react-icons/fa';

export default function SermonsPage() {
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();
    const [visibleSermons, setVisibleSermons] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Handle loading logic
    useEffect(() => {
        if (!sermonsLoading) {
            setIsLoading(false);
        }
    }, [sermonsLoading]);

    const loadMoreSermons = () => {
        setVisibleSermons((prev) => prev + 5);
    };

    // Filter sermons based on search query and date range
    const filteredSermons = sermons.filter((sermon) => {
        const sermonDate = new Date(sermon.sermonDate + 'T00:00:00');

        // Text search filter
        let matchesText = true;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const sermonName = sermon.name.toLowerCase();
            const formattedDate = sermonDate
                .toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                .toLowerCase();

            matchesText = sermonName.includes(query) || formattedDate.includes(query);
        }

        // Date range filter
        let matchesDateRange = true;
        if (fromDate || toDate) {
            if (fromDate) {
                const from = new Date(fromDate + 'T00:00:00');
                matchesDateRange = matchesDateRange && sermonDate >= from;
            }
            if (toDate) {
                const to = new Date(toDate + 'T23:59:59');
                matchesDateRange = matchesDateRange && sermonDate <= to;
            }
        }

        return matchesText && matchesDateRange;
    });

    // Update visible sermons when search changes
    const displaySermons = filteredSermons.slice(0, visibleSermons);
    return (
        <div className="relative scroll-smooth">
            {/* HERO SECTION */}
            <section id="hero" className="relative bg-black">
                <div className="relative min-h-screen overflow-hidden mask-b-from-50%">
                    {/* Loading Screen */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                            <div className="text-center text-white">
                                <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                                <p className="text-xl">Loading sermons...</p>
                            </div>
                        </div>
                    )}

                    {/* Video Background */}
                    <video
                        className="absolute top-0 left-1/2 h-full w-[177.78vh] -translate-x-1/2 object-cover"
                        style={{ minWidth: '100vw' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/videos/SermonsHeroVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Content */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center">
                        <div className="container mx-auto px-4 text-center text-white sm:px-8">
                            <h1 className={`mb-6 text-5xl font-bold md:text-8xl ${modernizFont.className}`}>Sermons</h1>
                            <p className="mb-8 text-xl">Inspiring messages of hope, faith, and transformation</p>

                            {/* Buttons */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <a
                                    href={sermons[0]?.youTubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex w-full max-w-[300px] items-center justify-center bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                                >
                                    <FaYoutube size={30} className="mr-4" />
                                    Watch on YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERMONS LIST SECTION */}
            <section className="relative min-h-screen overflow-hidden bg-black">
                <div className="py-20">
                    <div className="mb-12 text-center">
                        <h2 className={`text-5xl font-bold text-white md:text-6xl ${modernizFont.className}`}>All Sermons</h2>
                        <p className="mt-4 text-xl text-gray-300">Complete collection of inspiring messages</p>
                    </div>

                    {/* SEARCH COMPONENT */}
                    <div className="mx-auto mb-12 max-w-4xl px-4 sm:px-8">
                        <div className="space-y-6">
                            {/* Text Search */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search sermons by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-600 bg-gray-800 py-3 pr-10 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors duration-200 hover:text-white"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Date Range Picker */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="fromDate" className="mb-2 block text-sm font-medium text-gray-300">
                                        From Date
                                    </label>
                                    <input
                                        id="fromDate"
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        placeholder=""
                                        className="w-full cursor-pointer border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toDate" className="mb-2 block text-sm font-medium text-gray-300">
                                        To Date
                                    </label>
                                    <input
                                        id="toDate"
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        placeholder=""
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full cursor-pointer border border-gray-600 bg-gray-800 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            {(searchQuery || fromDate || toDate) && (
                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setFromDate('');
                                            setToDate('');
                                        }}
                                        className="text-sm text-red-500 underline hover:text-red-300"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}

                            {/* Results Count */}
                            {(searchQuery || fromDate || toDate) && (
                                <p className="text-center text-sm text-gray-400">
                                    {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} found
                                </p>
                            )}
                        </div>
                    </div>

                    {sermonsLoading ? (
                        // Loading state
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <div key={index} className="group relative aspect-[4/5] overflow-hidden bg-gray-700">
                                        <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : sermonsError ? (
                        // Error state
                        <div className="text-center text-red-500">Error loading sermons: {sermonsError}</div>
                    ) : filteredSermons.length === 0 ? (
                        // No results found
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="py-12 text-center">
                                <div className="mx-auto max-w-md bg-gray-800 p-8">
                                    <div className="mb-4 text-gray-400">
                                        <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-white">No Sermons Found</h3>
                                    <p className="text-gray-400">Try adjusting your search terms or browse all sermons.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Sermons grid
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {displaySermons.map((sermon) => (
                                    <a
                                        key={sermon.name}
                                        href={sermon.youTubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative block overflow-hidden transition-all duration-300 hover:scale-105"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            {/* Image with scale and blur effect */}
                                            {sermon.thumbnailImage?.fields?.file?.url && (
                                                <Image
                                                    src={`https:${sermon.thumbnailImage.fields.file.url}`}
                                                    alt={sermon.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
                                                />
                                            )}

                                            {/* Description Overlay */}
                                            <div className="absolute inset-0 bg-black/70 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                                                <div className="flex h-full items-center justify-center p-4">
                                                    {sermon.sermonDescription ? (
                                                        <p className="text-center text-xs whitespace-pre-line text-white">
                                                            {sermon.sermonDescription}
                                                        </p>
                                                    ) : (
                                                        <div className="rounded-full border-4 border-white p-4">
                                                            <svg
                                                                className="h-20 w-20 text-white drop-shadow-lg"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sermon Info Below Thumbnail */}
                                        <div className="py-4">
                                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-300">
                                                {sermon.name}
                                            </h3>
                                            <p className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                                                {new Date(sermon.sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* More Button */}
                            {filteredSermons.length > visibleSermons && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={loadMoreSermons}
                                        className="group inline-flex items-center bg-red-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-800 hover:text-white"
                                    >
                                        More
                                        <svg
                                            className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
