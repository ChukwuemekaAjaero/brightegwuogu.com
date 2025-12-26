'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useSermons } from '@/hooks/useContentful';
import { modernizFont } from '@/lib/utils';
import { FiArrowDown } from 'react-icons/fi';
import { DateRangePicker } from '@/components/lib/DateRangePicker';

export default function MinistrySermons() {
    const { sermons, loading: sermonsLoading, error: sermonsError } = useSermons();
    const [visibleSermons, setVisibleSermons] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Ref for sermons section animation
    const sermonsRef = useRef(null);
    const sermonsInView = useInView(sermonsRef, { margin: '300px' });

    const loadMoreSermons = () => {
        setVisibleSermons((prev) => prev + 5);
    };

    const checkScrollPosition = (container: HTMLElement) => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    };

    // Extract unique tags from all sermons
    const getAllTags = () => {
        const allTags = sermons.flatMap((sermon) => sermon.sermonTags || []);
        return Array.from(new Set(allTags)).sort();
    };

    const allTags = getAllTags();

    // Filter sermons based on search query, date range, and tags
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
        if (dateRange?.from || dateRange?.to) {
            if (dateRange.from) {
                const from = new Date(dateRange.from);
                from.setHours(0, 0, 0, 0);
                matchesDateRange = matchesDateRange && sermonDate >= from;
            }
            if (dateRange.to) {
                const to = new Date(dateRange.to);
                to.setHours(23, 59, 59, 999);
                matchesDateRange = matchesDateRange && sermonDate <= to;
            }
        }

        // Tag filter
        let matchesTags = true;
        if (selectedTags.length > 0) {
            const sermonTags = sermon.sermonTags || [];
            matchesTags = selectedTags.some((tag) => sermonTags.includes(tag));
        }

        return matchesText && matchesDateRange && matchesTags;
    });

    // Update visible sermons when search changes
    const displaySermons = filteredSermons.slice(0, visibleSermons);

    return (
        <div className="relative scroll-smooth">
            {/* SERMONS LIST SECTION */}
            <section className="wmin-h-screen relative overflow-hidden bg-[#030712] pt-16">
                <div className="py-20">
                    {/* SEARCH COMPONENT */}
                    <div className="mx-auto mb-12 max-w-4xl px-4 sm:px-8">
                        <div className="mb-8 text-center">
                            <h2 className={`mb-4 text-4xl font-bold text-white sm:text-5xl md:text-7xl xl:text-8xl ${modernizFont.className}`}>
                                Sermons
                            </h2>
                            <p className="text-lg text-gray-300 md:text-xl">
                                Explore teachings and messages that will inspire, challenge, and encourage you in your faith journey.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {/* Clear Filters Button - Mobile Only */}
                            {(searchQuery || dateRange?.from || dateRange?.to || selectedTags.length > 0) && (
                                <div className="text-center sm:hidden">
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setDateRange(undefined);
                                            setSelectedTags([]);
                                        }}
                                        className="group inline-flex items-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:bg-red-800 hover:text-white"
                                    >
                                        <svg
                                            className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear filters
                                    </button>

                                    {/* Results Count - Mobile Only */}
                                    <p className="mt-4 text-center text-sm text-gray-400">
                                        {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} found
                                    </p>
                                </div>
                            )}

                            {/* Text Search */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-white">Name</label>
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
                                        className="w-full rounded bg-gray-800 py-3 pr-10 pl-10 text-white placeholder-gray-400 focus:outline-none"
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
                            </div>

                            {/* Date Range Picker */}
                            <DateRangePicker
                                value={dateRange}
                                onChange={setDateRange}
                                placeholder="Select a date range..."
                                label="Dates"
                                id="dateRange"
                                maxDate={new Date()}
                            />

                            {/* Tags Filter */}
                            {allTags.length > 0 && (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-white">Tags</label>
                                    <div className="flex items-center gap-2">
                                        {/* Left Arrow Button */}
                                        <AnimatePresence>
                                            {canScrollLeft && (
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                    onClick={() => {
                                                        const container = document.querySelector('.scrollbar-hide') as HTMLElement;
                                                        if (container) {
                                                            container.scrollBy({ left: -200, behavior: 'smooth' });
                                                        }
                                                    }}
                                                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-900 text-white shadow-lg shadow-red-800/20 transition-all duration-200 hover:bg-red-800"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </motion.button>
                                            )}
                                        </AnimatePresence>

                                        {/* Tags Container */}
                                        <div
                                            ref={(el) => {
                                                if (el) {
                                                    const scrollContainer = el as HTMLElement;

                                                    // Initial check
                                                    checkScrollPosition(scrollContainer);

                                                    // Add scroll event listener
                                                    const handleScroll = () => checkScrollPosition(scrollContainer);
                                                    scrollContainer.addEventListener('scroll', handleScroll);

                                                    // Cleanup function
                                                    return () => {
                                                        scrollContainer.removeEventListener('scroll', handleScroll);
                                                    };
                                                }
                                            }}
                                            className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto"
                                            style={{
                                                scrollbarWidth: 'none',
                                                msOverflowStyle: 'none'
                                            }}
                                        >
                                            {allTags.map((tag) => {
                                                const isSelected = selectedTags.includes(tag);
                                                return (
                                                    <button
                                                        key={tag}
                                                        onClick={() => {
                                                            if (isSelected) {
                                                                setSelectedTags(selectedTags.filter((t) => t !== tag));
                                                            } else {
                                                                setSelectedTags([...selectedTags, tag]);
                                                            }
                                                        }}
                                                        className={`cursor-pointer rounded-full px-3 py-1 text-sm whitespace-nowrap transition-all duration-200 ${
                                                            isSelected
                                                                ? 'bg-red-900 text-white'
                                                                : 'bg-gray-800 text-gray-300 hover:bg-red-900 hover:text-white'
                                                        }`}
                                                    >
                                                        {tag}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Right Arrow Button */}
                                        <AnimatePresence>
                                            {canScrollRight && (
                                                <motion.button
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                    onClick={() => {
                                                        const container = document.querySelector('.scrollbar-hide') as HTMLElement;
                                                        if (container) {
                                                            container.scrollBy({ left: 200, behavior: 'smooth' });
                                                        }
                                                    }}
                                                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-900 text-white shadow-lg shadow-red-800/20 transition-all duration-200 hover:bg-red-800"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {sermonsLoading ? (
                        // Loading state
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <div key={index} className="group relative block overflow-hidden rounded">
                                        {/* Image skeleton */}
                                        <div className="relative aspect-[4/5] overflow-hidden rounded bg-gray-700">
                                            <div className="absolute inset-0 animate-pulse bg-gray-600"></div>
                                        </div>

                                        {/* Text content skeleton */}
                                        <div className="py-4">
                                            {/* Title skeleton */}
                                            <div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-700"></div>
                                            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>

                                            {/* Tags skeleton */}
                                            <div className="mb-2 flex gap-2">
                                                <div className="h-3 w-16 animate-pulse rounded bg-gray-700"></div>
                                                <div className="h-3 w-20 animate-pulse rounded bg-gray-700"></div>
                                            </div>

                                            {/* Date skeleton */}
                                            <div className="h-4 w-24 animate-pulse rounded bg-gray-700"></div>
                                        </div>
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
                            <div ref={sermonsRef} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {displaySermons.map((sermon, index) => {
                                    // Calculate delay based on position within current batch
                                    const batchIndex = index % 5; // Reset every 5 items (batch size)
                                    return (
                                        <motion.a
                                            key={sermon.name}
                                            href={sermon.youTubeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative block cursor-pointer overflow-hidden rounded transition-all duration-300 hover:scale-103"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={sermonsInView ? { opacity: 0 } : { opacity: 1 }}
                                            transition={{ delay: batchIndex * 0.1, duration: 0.8, ease: 'easeOut' }}
                                        >
                                            <div className="relative aspect-[4/5] overflow-hidden rounded">
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
                                                    <div className="flex h-full items-center justify-center p-8">
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
                                                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors duration-300">
                                                    {sermon.name}
                                                </h3>

                                                {/* Sermon Tags */}
                                                {sermon.sermonTags && sermon.sermonTags.length > 0 && (
                                                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-300">
                                                        {sermon.sermonTags.map((tag, index) => (
                                                            <span key={index} className="flex items-center">
                                                                {index > 0 && <span className="mr-2 text-gray-500">•</span>}
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <p className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
                                                    {new Date(sermon.sermonDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* More Button */}
                            {filteredSermons.length > visibleSermons && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={loadMoreSermons}
                                        className="group inline-flex cursor-pointer items-center rounded bg-red-900 px-8 py-4 font-semibold text-white shadow-lg shadow-red-800/20 transition-all duration-300 hover:bg-red-800"
                                    >
                                        More
                                        <FiArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-2" />
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
