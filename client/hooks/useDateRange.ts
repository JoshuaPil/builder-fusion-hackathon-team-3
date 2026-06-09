import { useState } from "react";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  function selectDate(date: Date) {
    setRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date <= prev.start) {
        return { start: date, end: null };
      }
      return { start: prev.start, end: date };
    });
  }

  function clear() {
    setRange({ start: null, end: null });
  }

  return { start: range.start, end: range.end, selectDate, clear };
}
