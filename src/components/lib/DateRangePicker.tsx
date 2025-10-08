'use client';

import * as React from 'react';
import { ChevronDownIcon, X } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
    value?: DateRange | undefined;
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    label?: string;
    id?: string;
    maxDate?: Date;
}

export function DateRangePicker({ value, onChange, placeholder = 'Select date range', label, id = 'date-range', maxDate }: DateRangePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(value);
    const [triggerWidth, setTriggerWidth] = React.useState<number>(0);
    const [isMobile, setIsMobile] = React.useState(false);
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

    // Measure trigger width when component mounts and when popover opens
    React.useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    const handleSelect = (newRange: DateRange | undefined) => {
        // Check if the selected dates are after maxDate
        if (newRange && maxDate) {
            const fromDateOnly = newRange.from ? new Date(newRange.from.getFullYear(), newRange.from.getMonth(), newRange.from.getDate()) : null;
            const toDateOnly = newRange.to ? new Date(newRange.to.getFullYear(), newRange.to.getMonth(), newRange.to.getDate()) : null;
            const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

            if ((fromDateOnly && fromDateOnly > maxDateOnly) || (toDateOnly && toDateOnly > maxDateOnly)) {
                return; // Don't select dates after maxDate
            }
        }

        setDateRange(newRange);
        onChange?.(newRange);

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
                    <div className="relative h-full w-full border border-gray-600 bg-gray-800 sm:h-auto sm:max-w-2xl">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Calendar */}
                        <div className="flex h-full flex-col p-4 pt-12">
                            <div className="flex-1 overflow-auto">
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    captionLayout="dropdown"
                                    onSelect={handleSelect}
                                    className="w-full rounded-none border-gray-600 bg-gray-800 text-white"
                                    disabled={(date) => (maxDate ? date > maxDate : false)}
                                    numberOfMonths={window.innerWidth < 640 ? 1 : 2}
                                    defaultMonth={dateRange?.from || new Date()}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-auto flex gap-2 border-t border-gray-600 p-4">
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
                                className="flex-1 rounded-none border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Last 30 days
                            </button>
                            <button
                                type="button"
                                onClick={clearRange}
                                className="flex-1 rounded-none border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex-1 rounded-none border border-red-600 bg-red-700 px-3 py-2 text-sm text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
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
                        className="flex w-full items-center justify-between border border-gray-600 bg-gray-800 py-3 pr-10 pl-4 text-left text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <span className={dateRange?.from ? 'text-white' : 'text-gray-400'}>{formatDateRange()}</span>
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
                        selected={dateRange}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                        className="w-full rounded-none border-gray-600 bg-gray-800 text-white"
                        disabled={(date) => (maxDate ? date > maxDate : false)}
                        numberOfMonths={2}
                        defaultMonth={dateRange?.from || new Date()}
                    />
                    <div className="flex gap-2 border-t border-gray-600 p-3">
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
                            className="flex-1 rounded-none border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Last 30 days
                        </button>
                        <button
                            type="button"
                            onClick={clearRange}
                            className="flex-1 rounded-none border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-none border border-red-600 bg-red-700 px-2 py-1 text-xs text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
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
