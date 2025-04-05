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
}

function DatePicker({ value, onChange, required = false, error }: DatePickerDemoProps) {
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
                !date && "text-muted-foreground",
                error && "border-red-500 focus-visible:border-red-500"
              )}
            >
              <span className={cn("truncate", !date && "text-muted-foreground")}>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Pick a date range"
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
            <Calendar 
              mode="range" 
              selected={date} 
              onSelect={handleDateChange}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export { DatePicker }; 