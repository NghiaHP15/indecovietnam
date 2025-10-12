"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DatePicker({
  value,
  onChange,
  className,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [month, setMonth] = React.useState<Date | undefined>(date);

  // ✅ Convert giá trị từ DB (UTC) → VN để hiển thị
  const displayValue = value ? dayjs(value).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY") : "";

  return (
    <div className={`${className} relative flex gap-2`}>
      <Input
        id="date"
        value={displayValue}
        placeholder="dd-mm-yyyy"
        className="bg-background pr-10"
        onChange={(e) => {
          const parsed = dayjs(e.target.value, "DD-MM-YYYY").toDate();
          if (!isNaN(parsed.getTime())) {
            // ✅ convert sang UTC trước khi lưu
            const utcDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
            setDate(parsed);
            setMonth(parsed);
            onChange(utcDate);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Chọn ngày</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(d) => {
              if (d) {
                // ✅ khi pick: convert sang UTC để lưu
                const utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                setDate(d);
                onChange(utcDate);
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
