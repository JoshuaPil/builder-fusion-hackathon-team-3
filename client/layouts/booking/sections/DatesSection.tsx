import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getMonthGrid,
  isInRange,
  isRangeStart,
  isRangeEnd,
  getFlexibleMonths,
} from "@/lib/calendar-utils";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const FLEXIBLE_MONTHS = getFlexibleMonths(18);

// Group by year once at module level
const GROUPED_FLEXIBLE_MONTHS = FLEXIBLE_MONTHS.reduce<
  { year: number; months: Array<{ year: number; month: number; label: string }> }[]
>((acc, m) => {
  const last = acc[acc.length - 1];
  if (last && last.year === m.year) {
    last.months.push(m);
  } else {
    acc.push({ year: m.year, months: [m] });
  }
  return acc;
}, []);

interface DatesSectionProps {
  dateRange: { start: Date | null; end: Date | null };
  onSelectDate: (date: Date) => void;
  onClear: () => void;
  dateMode: "exact" | "flexible";
  onSetDateMode: (mode: "exact" | "flexible") => void;
  flexibleMonths: string[];
  onToggleFlexibleMonth: (key: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

function monthKey(year: number, month: number) {
  return `${year}-${month}`;
}

export function DatesSection({
  dateRange,
  onSelectDate,
  onClear,
  dateMode,
  onSetDateMode,
  flexibleMonths,
  onToggleFlexibleMonth,
  onNext,
}: DatesSectionProps) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const grid = getMonthGrid(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const hasSelection =
    dateMode === "exact" ? dateRange.start !== null : flexibleMonths.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Segmented control */}
      <div className="px-6 pt-4 pb-4 shrink-0">
        <div className="flex h-[34px] p-[4px] gap-1 rounded-full bg-[#F2F2F2]">
          {(["exact", "flexible"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onSetDateMode(mode)}
              className={cn(
                "flex-1 flex items-center justify-center rounded-full transition-all",
                dateMode === mode
                  ? "bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                  : "",
              )}
            >
              <span className="font-jakarta text-[9px] font-bold tracking-[2px] uppercase text-[#121212]">
                {mode === "exact" ? "Exact" : "Flexible"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {dateMode === "exact" ? (
          <div className="px-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={prevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F2F2F2] transition-all"
              >
                <ChevronLeft size={16} className="text-[#121212]" />
              </button>
              <span className="font-jakarta text-[13px] font-bold tracking-[1.4px] uppercase text-[#121212]">
                {monthLabel}
              </span>
              <button
                onClick={nextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F2F2F2] transition-all"
              >
                <ChevronRight size={16} className="text-[#121212]" />
              </button>
            </div>

            {/* Day-of-week labels */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_LABELS.map((d, i) => (
                <div
                  key={i}
                  className="text-center font-jakarta text-[11px] font-bold text-[#808080] tracking-[2px] uppercase py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            {grid.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7">
                {week.map((cell, ci) => {
                  if (!cell.date) return <div key={ci} className="h-10" />;

                  const d = cell.date;
                  const isStart = isRangeStart(d, dateRange.start);
                  const isEnd = isRangeEnd(d, dateRange.end);
                  const inRange = isInRange(d, dateRange.start, dateRange.end);
                  const isPast = d < today;
                  const isToday = d.toDateString() === today.toDateString();
                  const hasRange = dateRange.start && dateRange.end;

                  return (
                    <button
                      key={ci}
                      onClick={() => !isPast && onSelectDate(d)}
                      disabled={isPast}
                      className={cn(
                        "relative h-10 flex items-center justify-center",
                        // range background strip
                        inRange && "bg-[#FAFAFA]",
                        isStart && hasRange && "bg-[#FAFAFA] rounded-l-full",
                        isEnd && "bg-[#FAFAFA] rounded-r-full",
                      )}
                    >
                      <span
                        className={cn(
                          "w-9 h-9 flex items-center justify-center rounded-full font-jakarta text-[15px] font-semibold transition-all",
                          isPast && "text-[#B3B3B3]",
                          !isPast && !isStart && !isEnd && !isToday && "text-[#121212]",
                          isToday && !isStart && !isEnd && "text-[#86080B]",
                          (isStart || isEnd) && "bg-[#121212] text-white",
                        )}
                      >
                        {cell.dayOfMonth}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* Flexible months grouped by year */
          <div className="px-6 pb-4 flex flex-col gap-5">
            {GROUPED_FLEXIBLE_MONTHS.map(({ year, months }) => (
              <div key={year} className="flex flex-col gap-2">
                <span className="font-jakarta text-[14px] font-bold tracking-[1.4px] uppercase text-[#808080]">
                  {year}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {months.map(({ month, label }) => {
                    const key = monthKey(year, month);
                    const selected = flexibleMonths.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => onToggleFlexibleMonth(key)}
                        className={cn(
                          "h-10 rounded-xl flex items-center justify-center font-jakarta text-[13px] font-semibold text-[#121212] transition-all border",
                          selected
                            ? "bg-white border-[1.5px] border-[#121212]"
                            : "bg-[#F2F2F2] border-transparent",
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 shrink-0 flex gap-3">
        <button
          onClick={onClear}
          className="flex-1 h-[50px] rounded-xl border border-[#E6E6E6] bg-white font-jakarta text-[11px] font-bold tracking-[2.4px] uppercase text-[#121212]"
        >
          Clear
        </button>
        <button
          onClick={hasSelection ? onNext : undefined}
          disabled={!hasSelection}
          className={cn(
            "flex-1 h-[50px] rounded-xl font-jakarta text-[11px] font-bold tracking-[2.4px] uppercase transition-all",
            hasSelection
              ? "bg-[#121212] text-white"
              : "bg-[#F2F2F2] text-[#999]",
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
