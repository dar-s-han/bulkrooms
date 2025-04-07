"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import { DateRange } from "react-day-picker";

interface DatePickerDemoProps {
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  required?: boolean;
  error?: string;
  dateType?: 'specific' | 'flexible';
  onDateTypeChange?: (type: 'specific' | 'flexible') => void;
  flexibleMonth?: string;
  onFlexibleMonthChange?: (month: string) => void;
  showMonthPicker?: boolean;
  onShowMonthPickerChange?: (show: boolean) => void;
  nextTwelveMonths?: Array<{ value: string; label: string }>;
}

function DatePicker({ 
  value, 
  onChange, 
  required = false, 
  error,
  dateType = 'specific',
  onDateTypeChange,
  flexibleMonth,
  onFlexibleMonthChange,
  showMonthPicker = false,
  onShowMonthPickerChange,
  nextTwelveMonths = []
}: DatePickerDemoProps) {
  const id = useId();
  const [date, setDate] = useState<DateRange | undefined>(value);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={cn(
                "group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
                !date && !flexibleMonth && "text-muted-foreground",
                error && "border-red-500 focus-visible:border-red-500"
              )}
            >
              <span className={cn("truncate", !date && !flexibleMonth && "text-muted-foreground")}>
                {dateType === 'specific' ? (
                  date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date range"
                  )
                ) : (
                  flexibleMonth ? (
                    nextTwelveMonths.find(m => m.value === flexibleMonth)?.label || "Select a month"
                  ) : (
                    "Select a month"
                  )
                )}
              </span>
              <CalendarIcon
                size={16}
                strokeWidth={2}
                className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-gray-50 p-1 rounded-lg">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => onDateTypeChange?.('specific')}
                      className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                        dateType === 'specific'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Specific
                    </button>
                    <button
                      type="button"
                      onClick={() => onDateTypeChange?.('flexible')}
                      className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                        dateType === 'flexible'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Flexible
                    </button>
                  </div>
                </div>
              </div>

              {dateType === 'specific' ? (
                <Calendar 
                  mode="range" 
                  selected={date} 
                  onSelect={handleDateChange}
                  disabled={{ before: new Date() }}
                />
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {nextTwelveMonths.map((month) => (
                    <button
                      key={month.value}
                      type="button"
                      onClick={() => onFlexibleMonthChange?.(month.value)}
                      className={`group p-3 rounded-lg text-center transition-all duration-200 ${
                        flexibleMonth === month.value
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`text-xs mb-1 ${
                        flexibleMonth === month.value
                          ? 'text-blue-200'
                          : 'text-gray-500'
                      }`}>
                        {month.label.split(' ')[1]}
                      </div>
                      <div className={`font-medium ${
                        flexibleMonth === month.value
                          ? 'text-white'
                          : 'text-gray-900'
                      }`}>
                        {month.label.split(' ')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export { DatePicker }; 