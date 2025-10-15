'use client';

import * as React from 'react';
import { ChevronDownIcon, CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
    value?: { from?: Date; to?: Date } | undefined;
    onChange?: (range: { from?: Date; to?: Date } | undefined) => void;
    placeholder?: string;
    label?: string;
    id?: string;
    maxDate?: Date;
}

export function DateRangePicker({ value, onChange, placeholder = 'Select date range', label, id = 'date-range', maxDate }: DateRangePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date } | undefined>(value);
    const [triggerWidth, setTriggerWidth] = React.useState<number>(0);
    const [isMobile, setIsMobile] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    // Update internal state when external value changes
    React.useEffect(() => {
        setDateRange(value);
    }, [value]);

    // Check screen size for mobile behavior
    React.useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Disable body scroll when mobile dialog is open
    React.useEffect(() => {
        if (open && isMobile) {
            // Store original overflow style
            const originalOverflow = document.body.style.overflow;
            const originalPaddingRight = document.body.style.paddingRight;

            // Calculate scrollbar width to prevent layout shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Disable scroll and add padding to prevent layout shift
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            return () => {
                // Restore original styles
                document.body.style.overflow = originalOverflow;
                document.body.style.paddingRight = originalPaddingRight;
            };
        }
    }, [open, isMobile]);

    // Measure trigger width when component mounts and when popover opens
    React.useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    const handleSelect = (newRange: DateRange | undefined) => {
        // Convert DateRange to our custom type
        const customRange = newRange ? { from: newRange.from, to: newRange.to } : undefined;

        // Check if the selected dates are after maxDate
        if (customRange && maxDate) {
            const fromDateOnly = customRange.from
                ? new Date(customRange.from.getFullYear(), customRange.from.getMonth(), customRange.from.getDate())
                : null;
            const toDateOnly = customRange.to ? new Date(customRange.to.getFullYear(), customRange.to.getMonth(), customRange.to.getDate()) : null;
            const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

            if ((fromDateOnly && fromDateOnly > maxDateOnly) || (toDateOnly && toDateOnly > maxDateOnly)) {
                return; // Don't select dates after maxDate
            }
        }

        setDateRange(customRange);
        onChange?.(customRange);

        // Update current month to stay on the last selected month
        if (customRange?.to) {
            setCurrentMonth(new Date(customRange.to.getFullYear(), customRange.to.getMonth(), 1));
        } else if (customRange?.from) {
            setCurrentMonth(new Date(customRange.from.getFullYear(), customRange.from.getMonth(), 1));
        }

        // Don't auto-close - let user click Done or click outside
    };

    const formatDateRange = () => {
        if (!dateRange?.from) return placeholder;

        const fromStr = dateRange.from.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        if (!dateRange.to) {
            return `${fromStr} - ...`;
        }

        const toStr = dateRange.to.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `${fromStr} - ${toStr}`;
    };

    const clearRange = () => {
        setDateRange(undefined);
        onChange?.(undefined);
        setOpen(false);
    };

    // Mobile dialog component
    const MobileDialog = () => {
        if (!open || !isMobile) return null;

        return (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
                <div className="fixed inset-0 flex items-center justify-center p-0 sm:inset-4 sm:p-0">
                    <div className="relative flex h-full w-full flex-col border border-gray-600 bg-gray-800 sm:h-auto sm:max-w-2xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-4 left-4 z-10 h-8 w-8 bg-white/0 transition-all hover:bg-white/20"
                            aria-label="Close"
                        >
                            <span
                                className="absolute block h-1 w-6 bg-white"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%) rotate(45deg)'
                                }}
                            />
                            <span
                                className="absolute block h-1 w-6 bg-white"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%) rotate(-45deg)'
                                }}
                            />
                        </button>

                        {/* Calendar */}
                        <div className="flex-1 overflow-auto p-4 pt-12">
                            <Calendar
                                mode="range"
                                selected={dateRange as DateRange}
                                captionLayout="dropdown"
                                onSelect={handleSelect}
                                className="w-full rounded-none border-gray-600 bg-gray-800 text-white"
                                disabled={(date) => (maxDate ? date > maxDate : false)}
                                numberOfMonths={1}
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                            />
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                        {/* Buttons - Always visible at bottom */}
                        <div className="flex shrink-0 gap-2 bg-gray-800 p-4">
                            <button
                                type="button"
                                onClick={() => {
                                    const today = new Date();
                                    const thirtyDaysAgo = new Date();
                                    thirtyDaysAgo.setDate(today.getDate() - 30);

                                    if (!maxDate) {
                                        handleSelect({ from: thirtyDaysAgo, to: today });
                                    } else {
                                        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                        const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
                                        const fromDate = todayOnly <= maxDateOnly ? thirtyDaysAgo : maxDate;
                                        handleSelect({ from: fromDate, to: todayOnly <= maxDateOnly ? today : maxDate });
                                    }
                                }}
                                className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Last 30 days
                            </button>
                            <button
                                type="button"
                                onClick={clearRange}
                                className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex-1 rounded border border-red-600 bg-red-700 px-3 py-2 text-sm text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-3">
            {label && (
                <Label htmlFor={id} className="px-1 text-white">
                    {label}
                </Label>
            )}

            {/* Desktop Popover */}
            <Popover open={open && !isMobile} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        ref={triggerRef}
                        type="button"
                        id={id}
                        className="flex w-full items-center justify-between rounded border border-gray-600 bg-gray-800 py-3 pr-10 pl-4 text-left text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                            <span className={dateRange?.from ? 'text-white' : 'text-gray-400'}>{formatDateRange()}</span>
                        </div>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    className="overflow-hidden rounded-none border-gray-600 bg-gray-800 p-0"
                    align="center"
                    style={{ width: triggerWidth > 0 ? `${triggerWidth}px` : 'auto', minWidth: '280px' }}
                >
                    <Calendar
                        mode="range"
                        selected={dateRange as DateRange}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                        className="w-full rounded-none border-gray-600 bg-gray-800 text-white"
                        disabled={(date) => (maxDate ? date > maxDate : false)}
                        numberOfMonths={2}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                    />
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                    <div className="flex gap-2 p-3">
                        <button
                            type="button"
                            onClick={() => {
                                const today = new Date();
                                const thirtyDaysAgo = new Date();
                                thirtyDaysAgo.setDate(today.getDate() - 30);

                                if (!maxDate) {
                                    handleSelect({ from: thirtyDaysAgo, to: today });
                                } else {
                                    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                    const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
                                    const fromDate = todayOnly <= maxDateOnly ? thirtyDaysAgo : maxDate;
                                    handleSelect({ from: fromDate, to: todayOnly <= maxDateOnly ? today : maxDate });
                                }
                            }}
                            className="flex-1 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Last 30 days
                        </button>
                        <button
                            type="button"
                            onClick={clearRange}
                            className="flex-1 rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded border border-red-600 bg-red-700 px-2 py-1 text-xs text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            Done
                        </button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Mobile Dialog */}
            <MobileDialog />
        </div>
    );
}
