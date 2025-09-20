'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
    value?: Date | undefined;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    label?: string;
    id?: string;
    maxDate?: Date;
}

export function DatePicker({ value, onChange, placeholder = 'Select date', label, id = 'date', maxDate }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(value);

    // Update internal state when external value changes
    React.useEffect(() => {
        setDate(value);
    }, [value]);

    const handleSelect = (newDate: Date | undefined) => {
        // Check if the selected date is after maxDate (compare only date parts)
        if (newDate && maxDate) {
            const newDateOnly = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
            const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
            if (newDateOnly > maxDateOnly) {
                return; // Don't select dates after maxDate
            }
        }
        setDate(newDate);
        onChange?.(newDate);
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-3">
            {label && (
                <Label htmlFor={id} className="px-1 text-white">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        id={id}
                        className="flex w-full items-center justify-between border border-gray-600 bg-gray-800 py-3 pr-10 pl-4 text-left text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <span className={date ? 'text-white' : 'text-gray-400'}>
                            {date
                                ? date.toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                  })
                                : placeholder}
                        </span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden rounded-none border-gray-600 bg-gray-800 p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleSelect}
                        className="rounded-none border-gray-600 bg-gray-800 text-white"
                        disabled={(date) => (maxDate ? date > maxDate : false)}
                    />
                    <div className="border-t border-gray-600 p-3">
                        <button
                            type="button"
                            onClick={() => {
                                const today = new Date();
                                if (!maxDate) {
                                    handleSelect(today);
                                } else {
                                    // Compare only date parts
                                    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                    const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
                                    if (todayOnly <= maxDateOnly) {
                                        handleSelect(today);
                                    }
                                }
                            }}
                            className="w-full rounded-none border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Today
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
